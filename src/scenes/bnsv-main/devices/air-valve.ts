import { Group, Mesh, Vector3 } from 'three';
import { AirParticle } from './air-particle';
import { MaterialValve } from '../../../materials/valve';
import { SLTScene } from 'src/core';

/**空气阀 */
export class AirValves {
	constructor(private scene: SLTScene<BnsvMainEvents>) {
		scene.on('END.AirValves', () => {
			const { meshMaterials, particles } = this;
			// for (const key in meshMaterials) {
			// 	meshMaterials[key].uniforms.ustate1.value = scene.resource.items['TEXTURE_AIR_ENTER'];
			// 	meshMaterials[key].uniforms.ustate2.value = scene.resource.items['TEXTURE_AIR_OUT'];
			// }
			for (const key in particles) {
				particles[key].material.uniforms.usmoke.value = scene.resource.items['TEXTURE_SMOKE']; // 出气贴图
				particles[key].material.uniforms.usmokeIn.value = scene.resource.items['TEXTURE_SMOKE_IN']; // 进气贴图
				this.onSetAirState(key, ((Math.random() * 2) | (0 + 1)) as 0 | 1 | 2);
				// this.gui(key, AIRS[key].position, particles[key]);
			}
			scene.off('end.AirValves');
		});
		scene.on('TICK', (time) => {
			const { meshMaterials, particles } = this;
			for (const key in meshMaterials) {
				meshMaterials[key].uniforms.utime.value += 1;
			}
			for (const key in particles) {
				particles[key].material.uniforms.utime.value += time.delta / 1000;
			}
		});
	}
	/**所有的空气粒子 */
	private readonly particles: { [K: string]: AirParticle } = Object.create(null);
	/**所有的空气阀漏斗 */
	private readonly meshMaterials: { [K: string]: MaterialValve } = Object.create(null);
	/**根据网格数据创建空气阀 */
	public onCreateAir(mesh: Mesh | Group) {
		const name = mesh.name,
			{ position } = AIRS[name] || {};
		if (!position) return;
		const scene = this.scene;
		this.particles[name] = new AirParticle(scene, position);
		mesh.traverse((e) => {
			if (e instanceof Mesh && e.name.includes('漏斗')) {
				this.meshMaterials[name] = e.material = new MaterialValve();
			}
		});
	}
	/**改变空气阀开关皇台 */
	/**空气阀状态修改 */
	public onChangeStatus(status: any[]) {
		const { particles, meshMaterials } = this;
		status.forEach((e) => {
			const { installNode, switch: switch1, pressure } = e,
				name = `设备${installNode}`;
			const particle = particles[name],
				material: MaterialValve = meshMaterials[`${name}`];
			if (!particle || !material) return;
			this.onSetAirState(name, switch1 === 1 ? 0 : switch1 == 0 ? 1 : 2);
			//TODO:预览进气效果
			// this.onSetAirState(name, 2);
		});
	}
	/**设置空气阀状态
	 * @param name 指定的空气阀
	 * @param state 0-静止、1-排气、2-进气
	 */
	public onSetAirState(name: string, state: 0 | 1 | 2) {
		const { meshMaterials, particles } = this;
		if (!meshMaterials[name] || !particles[name]) return;
		meshMaterials[name].uniforms.vstate.value = state;
		particles[name].onSetAirState(state);
	}

	private gui(name: string, position: Vector3, particle: AirParticle) {
		SLTScene.gui.on(position, name + '粒子', [
			{ name: 'x', param: 'x', ifNums: [-100, 200, 0.01], change: () => particle.onSetPosition(position) },
			{ name: 'y', param: 'y', ifNums: [-100, 200, 0.01], change: () => particle.onSetPosition(position) },
			{ name: 'z', param: 'z', ifNums: [-100, 200, 0.01], change: () => particle.onSetPosition(position) },
		]);
	}
}
/**所有的空气阀空气配置 */
const AIRS = {
	设备055: { position: new Vector3(2.45, 6.75, 52.07) },
	设备056: { position: new Vector3(-7.19, 7.24, 59.43) },
	设备057: { position: new Vector3(-20.97, 8.14, 70.05) },
	设备058: { position: new Vector3(-22.94, 6.64, 85.11) },
	设备059: { position: new Vector3(-26.68, 6.94, 84.98) },
	设备060: { position: new Vector3(-29.16, 14.98, 87.7) },
	设备061: { position: new Vector3(-28.38, 14.96, 88.45) },
	设备062: { position: new Vector3(-33.94, 15.46, 92.71) },
	设备063: { position: new Vector3(135.22, 13.11, -19.56) },
	设备064: { position: new Vector3(134.69, 13.16, -19.96) },
	设备065: { position: new Vector3(-19.43, 13.12, -43.84) },
	设备066: { position: new Vector3(-20.04, 13.11, -44.2) },
};
