import { Group, Material, Mesh, Object3D, Object3DEventMap, Vector3 } from 'three';
import { HousePipes } from './pipe/pipes';
import { CONST_BNSV_LABORATORY } from './bnsv-const';
import { Tanks } from './devices/tanks';
import { u3_destoryAll } from '../../utils';
import { AirValves } from './devices/air-valve';
import { MaterialFlag } from '../../materials/flag';
import { SLTScene, Time } from 'src/core';
import { SkeletonUtils } from 'three/examples/jsm/Addons.js';
/**将给定字符串或数字填充指定长度
 * @param str 要填充的字符串或数字
 * @param length 填充后的长度
 * @param char 填充的字符，默认为 '0'
 */
function u_strPadStart(str: string | number, length: number, char: string = '0'): string {
    return (str + '').padStart(length, char)
}
/**模型加载玩后进行处理类 */
export class BnsvModel {
	constructor(tscene: SLTScene<BnsvMainEvents>) {
		this.scene = tscene;
		this.pipes = new HousePipes(tscene);
		this.airs = new AirValves(tscene);
		this.tanks = new Tanks(tscene);
		tscene.on('progress.BnsvModel', this.loadModelProcess);
		tscene.on('end.BnsvModel', () => tscene.off('.BnsvModel'));
		tscene.on('TICK', (time: Time) => {
			this.flags.forEach((e) => {
				// console.log(e.uniforms.uTime.value)
				e.uniforms.uTime.value = time.elapseds;
			});
		});
	}
	private scene: SLTScene<BnsvMainEvents>;
	/**管道 */
	public readonly pipes: HousePipes;
	/**旗帜材质 */
	public readonly flags: MaterialFlag[] = [];
	/**进入了实验室 */
	private _ifEnter: boolean = false;
	public get ifEnter(): boolean {
		return this._ifEnter;
	}
	/**空气阀设备 */
	public airs: AirValves;
	private tanks: Tanks;
	/**模型是否已经加载标志 */
	private ifAdded: { [K: string]: boolean } = Object.create(null);
	/**所有模型 */
	public readonly meshs: { [K: string]: Mesh | Group } = Object.create(null);
	/**记录所有设备开关状态(为false时为关) */
	public readonly statusSwitch: { [K: string]: boolean } = Object.create(null);
	/**隐藏特定的设备
	 * @param names 设备组名称
	 * @param falg
	 */
	public onHides(names: string[]) {
		const { meshs, airs } = this;
		for (const key in meshs) {
			meshs[key].visible = true;
		}
		names.forEach((e) => {
			const mesh = meshs[e];
			airs.onSetAirState(e, 0);
			if (!mesh) return;
			mesh.visible = false;
		});
	}
	/**根据节点设置模型状态 */
	public onInstallNodeDate(status: any[]) {
		if (!status || !status.length) return;
		const { tanks, airs, pipes, statusSwitch } = this;
		status.forEach((e) => {
			const { installNode, switch: switch1 } = e;
			const node = u_strPadStart(installNode, 3);
			statusSwitch[`设备${node}`] = switch1 === 0;
		});
		tanks.onChangeStatus(status);
		airs.onChangeStatus(status);
		pipes.onPipeSwitch(statusSwitch, false);
	}
	/**关闭特定的设备组
	 * @param names 设备组名称
	 */
	public onCloseDevices(names: string[]) {
		for (const key in this.statusSwitch) {
			this.statusSwitch[key] = true;
		}
		names.forEach((e) => (this.statusSwitch[e] = false));
	}
	/**进入实验室 */
	public onEnterHouse() {
		const names = [CONST_BNSV_LABORATORY, '门口屋檐002009'];
		names.forEach((e) => {
			let mesh = this.meshs[e];
			if (mesh && mesh instanceof Mesh && mesh.material instanceof Material) {
				mesh.material.transparent = true;
				mesh.material.opacity = 0.1;
			}
		});
		this._ifEnter = true;
	}
	/**离开实验室 */
	public onLeaveHouse() {
		const names = [CONST_BNSV_LABORATORY, '门口屋檐002009'];
		names.forEach((e) => {
			let mesh = this.meshs[e];
			if (mesh && mesh instanceof Mesh && mesh.material instanceof Material) {
				mesh.material.transparent = false;
				mesh.material.opacity = 1.0;
			}
		});
		this._ifEnter = false;
	}
	/**销毁 */
	public kill() {
		this.pipes.kill();
		for (const key in this.meshs) {
			const mesh = this.meshs[key];
			u3_destoryAll(mesh);
		}
	}
	/**按进度处理模型 */
	private loadModelProcess = () => {
		this.onModelLoad('BODY', (body: any) => {
			body.traverse((obj) => {
				const name = obj.name || '';
				if (['设备091', '设备092'].includes(name) && !name.includes('-')) {
					this.tanks.addTanks(obj);
				}
			});
		});
		this.onModelLoad('PIPE', (scene) => {
			scene.traverse((child: any) => {
				if (child.isMesh && child.name.includes('管道')) {
					this.pipes.addPipe(child);
				}
			});
		});
		this.onModelLoad('DEVICE', (scene: any) => {
			scene.traverse((mesh: any) => {
				const { name } = mesh;
				if ((mesh.isMesh || mesh instanceof Group) && name.includes('设备')) {
					// mesh.getWorldPosition(v3);
					// console.log(` ${mesh.name}: {
					//     position: new Vector3(${v3.x + 1}, ${v3.y + 1}, ${v3.z + 1}),
					//     target: new Vector3(${v3.x}, ${v3.y}, ${v3.z})
					// },`)
					this.airs.onCreateAir(mesh);
				}
				if (mesh.isMesh && !name.includes('设备')) {
					mesh.name = mesh.parent?.name || '';
				}
			});
		});
		this.onModelLoad('WATER');
		this.onModelLoad('FACTORY', (scene: any) => {
			scene.traverse((mesh: any) => {
				const { name } = mesh;
				if ((mesh.isMesh || mesh instanceof Group) && name.includes('旗')) {
					mesh.material = new MaterialFlag(mesh.material);
					this.flags.push(mesh.material);
				}
			});
		});
		this.onModelLoad('OTHER');
	};
	/**加载指定模型
	 * @param name 模型的关键key
	 */
	private onModelLoad(name: string, cb?: (child: Object3D<Object3DEventMap>) => any) {
		const {
				ifAdded,
				scene: {
					resource: { items },
					container,
				},
				meshs,
			} = this,
			model = items[name];

		if (model && !ifAdded[name]) {
			ifAdded[name] = true;
			const scene = SkeletonUtils.clone(model.scene);
			if (cb) cb(scene);
			scene.traverse((child: any) => {
				if (child instanceof Group || (child instanceof Mesh && !meshs[child.name])) meshs[child.name] = child;
				if (child.isMesh && child instanceof Mesh) {
					child.material.depthTest = true; // 启用深度检测
					child.material.depthWrite = true; // 启用深度写入（重要！）
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});
			container.add(scene);
		}
	}
}
