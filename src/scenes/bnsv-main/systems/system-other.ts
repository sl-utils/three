import { Group, Intersection, Mesh, Object3D, Object3DEventMap, Raycaster, Vector3, Euler } from 'three';
import { SLTScene } from '../../../core/scene';
import { SkeletonUtils, TransformControls } from 'three/examples/jsm/Addons.js';
import { u3_addDirectional } from '../../../utils/light';
import { Tanks } from '../devices/tanks';
import { CONST_BNSV_LABEL_DEVICE, CONST_BNSV_VIEW_LABLE } from '../bnsv-const';
import { isClickOnDevicePop } from '../bnsv-event';
import { TResourceInfo } from 'src/types';

/**单个的子系统 */
export class SystemOther {
	constructor(private scene: SLTScene<BnsvMainEvents>) {
		this.tankA = new Tanks(scene);
		this.tankA2 = new Tanks(scene);
		scene.scene.add(this.container);
		scene.container.remove(this.tankA.container);
		scene.container.remove(this.tankA2.container);
		this.container.add(this.tankA.container);
		this.container.add(this.tankA2.container);
		u3_addDirectional(this.container, {
			position: new Vector3(5, 5, 5),
			target: new Vector3(0, 0, 0),
			intensity: 1.0,
			shadowCamera: {
				near: 5,
				far: 12.5,
				left: -5,
				right: 5,
				top: 3,
				bottom: -3,
				normalBias: 0.01,
				mapSize: 1024,
			},
		});
		const transformControls = (this.transformControls = new TransformControls(
			scene.tcamera.camera,
			scene.renderer.instance.domElement
		));
		transformControls.space = 'world';
		transformControls.addEventListener('mouseDown', () => (scene.tcameraCtr.ctrOrbit.enabled = false));
		transformControls.addEventListener('mouseUp', () => (scene.tcameraCtr.ctrOrbit.enabled = true));
		transformControls.setMode('rotate'); // 设置初始模式为旋转
		scene.on('progress', () => this.loadModelProcess());
		this.openEvent();
	}
	private fig = {
		SCENE_A: {
			scale: 1.0,
			position: [0, 0.568, 0],
		},
		SCENE_A2: {
			position: [0, 0.45, 0],
			rotate: [0, -1.56, 0],
		},
		SCENE_B: {
			scale: 1.5,
			position: [0, 0.168, 0],
			rotate: [0, 1.597, 0],
		},
		SCENE_C: {
			scale: 2.25,
			position: [0, -0.1, 0],
			rotate: [0, -3.139, 0],
		},
		SCENE_D: {
			scale: 1.0,
			position: [0, -0.5, 0],
		},
		SCENE_E: {
			scale: 1.0,
			position: [0, -0.5, 0],
			rotate: [0, 1.597, 0],
		},
		SCENE_BACK: {
			scale: 1,
			position: [0, -0.5, 0],
		},
	};
	/**当前显示的A类场景类型 */
	private currentSceneType: 'SCENE_A' | 'SCENE_A2' = 'SCENE_A';
	/**是否启用 */
	public enabled: boolean = true;
	/** */
	private transformControls: TransformControls;
	/**所有物体集合 */
	public container: Group = new Group();
	/**罐体A */
	private tankA: Tanks;
	/**罐体A2 */
	private tankA2: Tanks;
	/**用于标记模型是否已经添加过到集合 */
	private scenes: { [K: string]: Object3D } = Object.create(null);
	/**记录模型的初始状态 */
	private states: {
		[K: string]: {
			position: Vector3;
			scale: Vector3;
			rotation: Euler;
		};
	} = Object.create(null);
	/**系统标识 0水锤消除罐  1调节阀系统  2空气阀系统  3反馈式压力控制展车系统  4水锤在线监测展车系统 */
	private flagSysteam: 'SCENE_A' | 'SCENE_A2' | 'SCENE_B' | 'SCENE_C' | 'SCENE_D' | 'SCENE_E';
	/**要加载或显示的模型名 */
	private names: string[] = [];
	public getScene() {
		return this.scene;
	}
	/**暂停子系统 */
	public onPause(flag: boolean) {
		const {
			transformControls,
			scene
		} = this;
		this.enabled = !flag;
		this.container.visible = !flag;
		if (!flag) this.cameraConfig();
		scene.trigger('camear_orbit', [true]);
		flag && transformControls.detach();
		// scene.scene[flag ? 'remove' : 'add'](transformControls);
		// transformControls.visible = false;
		transformControls.setMode('rotate');
	}
	/**加载指定模型
	 * @param resources 模型资源
	 * @param sysName 系统名称
	 */
	public onLoadModel(resources: TResourceInfo[]) {
		const { scenes, scene } = this;
		for (const key in scenes) scenes[key].visible = false;
		this.names = resources
			.map((e) => {
				if (e.type == 'gltf') {
					return e.name;
				}
				return undefined;
			})
			.filter((e) => !!e);
		this.tankA.onOpenEvent(scene);
		this.tankA.container.visible = this.names.includes('SCENE_A') && this.currentSceneType == 'SCENE_A';
		this.tankA2.onOpenEvent(scene);
		this.tankA2.container.visible = this.names.includes('SCENE_A2') && this.currentSceneType == 'SCENE_A2';
	}

	/**注册设备监听事件 */
	public onDeviceEvent() {
		const { scene } = this,
			{
				tele: { mouse },
				renderer: {
					instance: {
						domElement: { classList },
					},
				},
				tcamera,
			} = scene,
			raycaster = new Raycaster();
		let caster, name: string, intersects: Array<Intersection>;
		scene.on('TICK', () => {
			if (!this.enabled) return;
			/**模型选择 */
			raycaster.setFromCamera(mouse, tcamera.camera);
			intersects = raycaster.intersectObjects(this.container.children);
			/**查找没有被隐藏的最近的模型 */
			const visible = intersects.find((e) => e.object.visible == true && (!e.object.parent || e.object.parent.visible == true));
			caster = visible?.object;
			name = caster?.name || '';
			if (name.includes('设备')) {
				classList.add('has-cursor-pointer');
			} else {
				classList.remove('has-cursor-pointer');
			}
		});
		scene.on('MOUSE_DOWN', (e: MouseEvent) => {
			if (!name || !this.enabled) return;

			if (isClickOnDevicePop(e)) {
				return; // 如果是，则不执行后续的逻辑
			}

			if (name.includes('设备')) {
				const { x, y, z } = intersects[0].point;
				console.log(`${name} position: new Vector3(${x}, ${y}, ${z}),`);
				this.onViewSwitch(name);
				this.scene.trigger('select_device', [name.slice(2, 5)]);
			}
		});
	}
	view_target_name: string;
	/**根据id切换视角并展示指定的label
	 * @param id 要切换到的视角id
	 * @param force 是否强制切换
	 */
	public onViewSwitch = (id: string, force: boolean = false) => {
		if (!this.enabled) return;
		if (id === this.view_target_name && !force) return;
		const info = CONST_BNSV_VIEW_LABLE[id];
		if (!info) {
			console.warn('此id未配置视角和label');
			return;
		}
		const default_label = id.includes('设备') ? (info.type ? [CONST_BNSV_LABEL_DEVICE] : []) : undefined;
		const {
			scene,
			scene: { tlabels },
		} = this,
			{
				tcamera,
				tcameraCtr: { ctrFirst, ctrOrbit },
			} = scene,
			{ position, target, ifOrbit, label_shows = default_label, label_position = target } = info;
		this.view_target_name = id;
		ctrOrbit.pause();
		ctrFirst.resume();
		tlabels.onLabelsCtr([''], []);
		SLTScene.gsap.to(tcamera.camera.position, {
			x: position.x,
			y: position.y,
			z: position.z,
			duration: 1,
			ease: 'power1.in',
			onUpdate: () => {
				ctrFirst.lookAt(target);
			},
			onComplete: () => {
				if (ifOrbit !== false) {
					ctrFirst.pause();
					ctrOrbit.enabled = true;
					ctrOrbit.target.copy(target);
					tcamera.camera.position.copy(position);
				}
				tlabels.onLabelsCtr(label_shows, []);
				tlabels.onSetLabelPosition(label_shows, label_position);
				scene.trigger('camear_orbit', [ctrOrbit.enabled]);
			},
		});
	};

	/**
	 * 切换A类场景显示
	 * @param sceneType 要显示的场景类型
	 */
	public switchSceneA(sceneType: 'SCENE_A' | 'SCENE_A2') {
		if (this.currentSceneType === sceneType) return;

		// 隐藏当前显示的A类场景
		const currentScene = this.scenes[this.currentSceneType];
		if (currentScene) {
			currentScene.visible = false;
		}

		// 显示新的A类场景
		const newScene = this.scenes[sceneType];
		if (newScene) {
			newScene.visible = true;
		}

		this.currentSceneType = sceneType;

		// 更新罐体显示状态
		this.tankA.container.visible = sceneType === 'SCENE_A';
		this.tankA2.container.visible = sceneType === 'SCENE_A2';
	}

	/**按进度处理模型 */
	private loadModelProcess() {
		this.names.forEach((e) => this.onModelLoad(e));
	}
	/**加载指定模型
	 * @param name 模型的关键key
	 */
	private onModelLoad(name: string, cb?: (child: Object3D<Object3DEventMap>) => any) {
		const {
			scenes,
			states,
			scene: {
				resource: { items },
			},
			container,
			fig,
			currentSceneType,
		} = this,
			model = items[name];
		let scene = scenes[name];
		if (model && !scene) {
			scene = scenes[name] = SkeletonUtils.clone(model.scene);
			const { scale = 1, position = [0, 0, 0], rotate = [0, 0, 0] } = fig[name] || {};
			scene.traverse((child: any) => {
				if (child.isMesh && child instanceof Mesh) {
					child.material.depthTest = true; // 启用深度检测
					child.material.depthWrite = true; // 启用深度写入（重要！）
					if (name !== 'SCENE_BACK') child.castShadow = true;
					if (name == 'SCENE_BACK') child.receiveShadow = true;
				}
			});
			if (cb) cb(scene);
			container.add(scene);
			scene.scale.set(scale, scale, scale);
			scene.position.set(position[0], position[1], position[2]);
			scene.rotation.set(rotate[0], rotate[1], rotate[2]);
			SLTScene.gui.onGuiFolderBase(scene, `${name}`);

			if (['SCENE_A', 'SCENE_A2'].includes(name)) {
				// 设置A类场景的初始可见性
				scene.visible = name === currentSceneType;
				name === 'SCENE_A' ? this.tankA.addTanks(scene) : this.tankA2.addTanks(scene);
			}
		}
		if (scene) {
			// 对于A类场景，根据当前类型设置可见性
			if (['SCENE_A', 'SCENE_A2'].includes(name)) {
				scene.visible = name === currentSceneType;
			} else {
				scene.visible = true;
			}

			if (['SCENE_A', 'SCENE_A2', 'SCENE_B', 'SCENE_C', 'SCENE_D', 'SCENE_E'].includes(name)) {
				this.flagSysteam = name as any;
				const state = (states[name] = Object.create(null));
				state.position = scene.position.clone();
				state.scale = scene.scale.clone();
				state.rotation = scene.rotation.clone();
			}
			if (['SCENE_B', 'SCENE_C'].includes(name)) {
				this.transformControls.attach(scene);
			}
		}
	}
	/**场景相机和目标配置 */
	private cameraConfig() {
		const {
			scene: {
				tcamera,
				tcameraCtr: { ctrOrbit, ctrFirst },
			},
		} = this;
		tcamera.camera.position.set(3.57, -0.1, -0.08);
		ctrOrbit.target.set(0, 0.2, 0);
		ctrOrbit.maxPolarAngle = Math.PI / 1.9;
		ctrOrbit.minPolarAngle = 0;
		ctrOrbit.maxDistance = 3.9;
		ctrOrbit.minDistance = 0.5;
		ctrOrbit.enabled = true;
		ctrFirst.enabled = false;
	}

	private openEvent = () => {
		const { scene, scenes, states, transformControls } = this,
			{
				keyStates
			} = scene;
		scene.on('KEY_DOWN', () => {
			if (keyStates.KeyQ && this.flagSysteam !== 'SCENE_A' && this.flagSysteam !== 'SCENE_A2')
				// transformControls.visible = !transformControls.visible;
				if (keyStates.KeyR) transformControls.setMode('rotate');
			if (keyStates.KeyT) transformControls.setMode('translate');
			if (keyStates.KeyS) transformControls.setMode('scale');
			if (keyStates.Escape) {
				for (const key in scenes) {
					if (!states[key]) continue;
					scenes[key].position.copy(states[key].position);
					scenes[key].scale.copy(states[key].scale);
					scenes[key].rotation.copy(states[key].rotation);
				}
			}
		});
	};
}
