import { EquirectangularRefractionMapping, Vector3 } from 'three';
import { u3_addDirectional } from '../../utils/light';
import { BnsvModel } from './bnsv-model';
import { BnsvEvent } from './bnsv-event';
import { SCENE_DEVICE_CLOSE_SCJC, SCENE_DEVICE_CLOSE_YLGL, SCENE_HIDES_SCJC, SCENE_HIDES_YLGL } from './bnsv-const';
import {
	RESOURCES_SCENE_ALL,
	RESOURCES_SCENE_A,
	RESOURCES_SCENE_B,
	RESOURCES_SCENE_C,
	RESOURCES_SCENE_D,
	RESOURCES_SCENE_E,
} from '../../Assets/resource_regist';
import { SystemOther } from './systems/system-other';
import { Load } from './load/load';
import IMGEB from '../../resource/label/2.png';
import { SLTScene } from 'src/core';
/**场景博纳斯威与页面交互类 */
export class SceneBnsvMain extends SLTScene<BnsvMainEvents> {
	constructor(html: HTMLElement | string, isH5?: boolean) {
		super(html, { id: 'SYS' });
		this.container.visible = false;
		this.load = new Load(this, isH5);
		this.systemOther = new SystemOther(this);
		this.tlabels.onAddLabel({
			id: '实验室',
			position: new Vector3(-23, 23, 57),
			type: 'div',
			content: '',
			ifVisible: false,
			className: 'scene_house_name',
			src: IMGEB,
			transform: 'translate(20px,0px) scale(0.8)',
			onClick: () => this.trigger('enter_lable'),
		});
		this.onDebug();
	}
	/**加载3D动画 */
	private load: Load;
	/**模型加载类 */
	private models: BnsvModel;
	/**场景事件类 */
	private events: BnsvEvent;
	/**其余子系统 */
	private systemOther: SystemOther;
	/**当前场景是否是主场景 */
	private sceneId: '0' | '1';
	/**加载完成标识 */
	private flagLoaded: boolean = false;
	/** */
	protected init() { }
	/**确定场景根据系统名称 */
	public onSceneBySysName(name: string) {
		// return;
		this.flagLoaded = false;
		this.stage();
		this.clearHDR();
		this.systemOther.onPause(true);
		this.load.show();
		this.load.event.on('end', () => {
			if (!['智能水锤消除罐系统', '智能空气阀系统', '智能调节阀系统', '反馈式压力控制展车系统', '水锤在线监测展车系统'].includes(name))
				this.addMainSys(name);
			else this.addOtherSys(name);
			this.load.event.off('end');
		});
	}
	/**相机移动 */
	public onSceneMove(dir: 'Forward' | 'Backward' | 'Left' | 'Right' | 'Up' | 'Down' | 'Close', flag: boolean = true) {
		const {
			tcameraCtr: { ctrOrbit, ctrFirst },
		} = this;
		if (ctrOrbit.enabled) return;
		ctrFirst.move(dir, flag);
	}
	/** */
	public onCameraChange() {
		const {
			tcameraCtr,
			tcameraCtr: { ctrOrbit },
		} = this;
		tcameraCtr.onToggleCamera();
		this.trigger('camear_orbit', [ctrOrbit.enabled]);
	}
	/**设置节点数据 */
	public onInstallNodeDate(status: any[]) {
		if (!status) return;
		this.models?.onInstallNodeDate(status);
	}
	/**设备状态变化
	 * @param name 设备名称
	 * @param 状态
	 */
	public onDeviceChange(name: string, state: boolean) {
		const {
			models: { statusSwitch },
		} = this;
		statusSwitch[name] = state;
		// pipes.onPipeSwitch(statusSwitch);
	}
	/**切换场景相机到指定位置
	 * @param installNode 安装节点
	 */
	public onCameraByName(name: string) {
		if (this.flagLoaded) {
			if (this.sceneId === '0') {
				this.events?.onViewSwitch(name, true);
			} else {
				this.systemOther?.onViewSwitch(name, true);
			}
		}
	}
	public kill(): void {
		console.log('场景销毁流程');
		super.kill();
		const items = this.resource.items;
		items.FACTORY = undefined;
		items.PIPE = undefined;
		items.DEVICE = undefined;
		items.WATER = undefined;
		items.BODY = undefined;
		items.OTHER = undefined;
		this.models?.kill();
		this.models = undefined;
		this.events = undefined;
	}

	public switchSceneA(type: 'A' | 'A2') {
		this.systemOther.switchSceneA(`SCENE_${type}`);
	}

	public ToBurstPipe(position: Vector3) {
		this.lookAtPosition(position, 1);
	}

	/** 让相机看向指定位置 */
	public lookAtPosition(position: Vector3, duration: number = 1) {
		const {
			tcamera,
			tcamera: { camera },
			tcameraCtr: { ctrOrbit, ctrFirst },
		} = this;

		// 计算相机应该移动到的位置（在目标点后方一定距离）
		const direction = new Vector3().subVectors(camera.position, position).normalize();
		const cameraTargetPosition = position.clone().add(direction.multiplyScalar(1)); // 距离目标点x个单位

		// 暂停当前控制模式
		ctrOrbit.pause();
		ctrFirst.resume();

		// 使用动画平滑移动相机
		SLTScene.gsap.to(camera.position, {
			x: cameraTargetPosition.x,
			y: cameraTargetPosition.y,
			z: cameraTargetPosition.z,
			duration: duration,
			ease: 'power1.inOut',
			onUpdate: () => {
				ctrFirst.lookAt(position);
			},
			onComplete: () => {
				// 切换到轨道控制模式，让用户可以自由观察
				ctrFirst.pause();
				ctrOrbit.enabled = true;
				ctrOrbit.target.copy(position);
				this.trigger('camear_orbit', [ctrOrbit.enabled]);
			},
		});
	}

	/**调试帮助器 */
	private onDebug() {
		const gui = SLTScene.gui;
		/**协助定位物体 */
		gui.onGuiFolderBase(this.tcamera, '相机', -500, 500);
		gui.on(this.tcameraCtr.ctrOrbit.target, '相机目标', [
			{
				name: 'X',
				param: 'x',
				ifNums: [-500, 500, 0.001],
			},
			{
				name: 'Y',
				param: 'y',
				ifNums: [-500, 500, 0.001],
			},
			{
				name: 'Z',
				param: 'z',
				ifNums: [-500, 500, 0.001],
			},
		]);
	}
	/**状态暂存并清空labels并隐藏所有container */
	private stage() {
		const { tlabels, tcameraCtr, container } = this;
		tlabels.onStaged();
		tcameraCtr.onStaged();
		tlabels.onLabelsCtr(undefined, []);
		container.visible = false;
	}
	/**主系统 */
	private addMainSys(name: string) {
		const {
			tcameraCtr: { ctrOrbit },
			systemOther,
			load,
			resource,
		} = this;
		systemOther.onPause(true);
		ctrOrbit.maxPolarAngle = Math.PI / 2.05;
		ctrOrbit.minPolarAngle = -Math.PI / 10;
		ctrOrbit.maxDistance = 500;
		ctrOrbit.minDistance = 0;
		if (!this.events) {
			this.models = new BnsvModel(this);
			this.events = new BnsvEvent(this, this.models);
			u3_addDirectional(this.container, {
				position: new Vector3(87.8, 58.1, 138.7),
				target: new Vector3(-100, 0, 110),
			});
		}
		this.on('progress', this.load.setProgress);
		load.event.on('gsapend', () => this.readyMainScene(name));
		resource.reload(RESOURCES_SCENE_ALL);
	}
	private ifNeedRotateHDR: boolean = false;
	/**添加另外的子系统 */
	private addOtherSys(name: string) {
		const { container, events, systemOther, load, resource } = this;
		container.visible = false;
		this.ifNeedRotateHDR = false;
		if (!['反馈式压力控制展车系统', '水锤在线监测展车系统'].includes(name)) {
			events && (events.enabled = false);
		}
		const resources = this.getResBySysName(name);
		systemOther.onLoadModel(resources);
		if (['反馈式压力控制展车系统', '水锤在线监测展车系统'].includes(name) && !this.events) {
			this.systemOther.onDeviceEvent();
		}
		if (['智能调节阀系统', '智能空气阀系统'].includes(name)) {
			this.ifNeedRotateHDR = true;
		}
		this.on('progress', (e) => load.setProgress(e));
		load.event.on('gsapend', this.readySigleScene);
		resource.reload(resources);
	}
	/**通过子系统名称获取应加载资源 */
	private getResBySysName(name: string) {
		const resources = [];
		switch (name) {
			case '智能水锤消除罐系统':
				resources.push(...RESOURCES_SCENE_A);
				break;
			case '智能空气阀系统':
				resources.push(...RESOURCES_SCENE_B);
				break;
			case '智能调节阀系统':
				resources.push(...RESOURCES_SCENE_C);
				break;
			case '反馈式压力控制展车系统':
				resources.push(...RESOURCES_SCENE_D);
				break;
			case '水锤在线监测展车系统':
				resources.push(...RESOURCES_SCENE_E);
				break;
			default:
				break;
		}
		return resources;
	}
	/**主场景准备好后触发 */
	private readyMainScene(name: string) {
		const {
			models,
			models: { pipes },
			load,
			events,
			container,
			sceneId,
			tlabels,
		} = this;
		const [hides, close] =
			name === '水锤监测系统'
				? [SCENE_HIDES_SCJC, SCENE_DEVICE_CLOSE_SCJC]
				: name === '压力管理系统'
					? [SCENE_HIDES_YLGL, SCENE_DEVICE_CLOSE_YLGL]
					: [[], []];
		events.enabled = true;
		models.onHides(hides);
		models.onCloseDevices(close);
		pipes.onHidePipes(hides);
		pipes.onPipeSwitch(models.statusSwitch, true);
		container.visible = true;
		this.addHDR();
		this.tcameraCtr.onRestore();
		/**由子场景切换到主场景 */
		if (sceneId !== '0') {
			tlabels.onRestore();
			this.initCamera();
			this.sceneId = '0';
			events.onViewSwitch('初始视角', true);
		}
		tlabels.onShowStagedIds('实验室');
		this.flagLoaded = true;
		load.event.off('gsapend');
	}
	/**单设备场景准备好后触发 */
	private readySigleScene = () => {
		const { systemOther, load } = this;
		systemOther.onPause(false);
		this.addHDR();
		this.ifNeedRotateHDR && this.rotateHDR(Math.PI / 3);
		this.sceneId = '1';
		this.flagLoaded = true;
		load.event.off('gsapend');
	};
	/**主场景初始视角 */
	private initCamera() {
		this.tcamera.camera.position.set(16.156, 89.659, 152.59);
		this.tcameraCtr.ctrOrbit.target.copy(new Vector3(-37.816, 3.03, 79.951));
	}
	private clearHDR() {
		const {
			scene,
		} = this;
		scene.environment = undefined;
		scene.background = undefined;
		scene.environmentRotation.y = 0;
	}
	private addHDR() {
		const {
			resource: { items },
			scene,
		} = this;
		if (!items.HDR_SKIES) return;
		items.HDR_SKIES.mapping = EquirectangularRefractionMapping;
		scene.environment = items.HDR_SKIES;
		scene.background = items.HDR_SKIES;
	}

	/**旋转环境贴图 */
	private rotateHDR(radian) {
		const {
			scene,
		} = this;
		scene.environmentRotation.y = radian;
	}
}
