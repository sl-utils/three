import { Color, Group, Mesh, Object3D, Object3DEventMap } from 'three';
import { TResource } from '../../../core/resource/resource';
import { RESOURCES_SCENE_LOAD } from '../../../Assets/resource_regist';
import { MaterialLogo } from '../../../materials/logo/logo';
import { SLTScene, TCameraOrth, TEvent, Time } from '../../..';
import { SkeletonUtils } from 'three/examples/jsm/Addons.js';

export class Load {
	constructor(private tscene: SLTScene, isH5: boolean) {
		this.isH5 = isH5;
		const { scene } = tscene,
			{ container, resource, event } = this;
		this.orth = new TCameraOrth(tscene);
		scene.add(container);
		// container.add(new MeshEarth(helper, resource).container);
		this.logoMaterial = new MaterialLogo();
		resource.load(RESOURCES_SCENE_LOAD);
		event.on('progress', this.loadModelProcess);
	}
	public readonly container: Group = new Group();
	/**用于区分手机端/PC端的加载动画表现 */
	private isH5: boolean = false;
	/**正交相机 */
	private orth: TCameraOrth;
	/**本身的加载事件 */
	public event: TEvent = new TEvent();
	/**资源加载器 */
	private resource = new TResource(this.event);
	/**字体材质 */
	private logoMaterial: MaterialLogo;
	/**模型是否已经加载标志 */
	private ifAdded: { [K: string]: boolean } = Object.create(null);
	/**按进度处理模型 */
	private loadModelProcess = () => {
		const { tscene } = this;
		this.onModelLoad('LOGO', (scene) => {
			// 竖屏手机端正交相机横向视野更窄：缩小 LOGO 避免被裁切
			if (this.isH5) {
				scene.scale.setScalar(0.58);
			}
			scene.traverse((mesh) => {
				if (mesh instanceof Mesh) {
					mesh.position.set(0, 0, 0.5);
					mesh.material = this.logoMaterial;
					tscene.on('TICK.load', (e: Time) => {
						mesh.material.uniforms.uTime.value = e.elapseds * 2;
						// circle.rotation.z = e.elapseds * 0.1
					});
				}
			});
		});
	};
	/**加载指定模型
	 * @param name 模型的关键key
	 */
	private onModelLoad(name: string, cb?: (child: Object3D<Object3DEventMap>) => any) {
		const {
			ifAdded,
			tscene: {
				resource: { items },
			},
			container,
		} = this,
			model = items[name];
		if (model && !ifAdded[name]) {
			ifAdded[name] = true;
			const scene = SkeletonUtils.clone(model.scene);
			scene.traverse((child: any) => {
				if (child.isMesh && child instanceof Mesh) {
					child.material.depthTest = true; // 启用深度检测
					child.material.depthWrite = true; // 启用深度写入（重要！）
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});
			if (cb) cb(scene);
			container.add(scene);
		}
	}
	/**开启加载动画 */
	public show() {
		const {
			tscene,
			tscene: { tcameraCtr: {
				ctrOrbit,
				ctrFirst,
			}, },
			orth,
			resource,
			container,
			logoMaterial,
		} = this;
		ctrOrbit.enabled = false;
		ctrFirst.enabled = false;
		container.visible = true;
		logoMaterial.uniforms.uProgress.value = 0;
		orth.position.set(0, -0.03, 1);
		orth.lookAt(0, -0.03, 0);
		resource.load(RESOURCES_SCENE_LOAD);
		tscene.renderer.instance.setClearColor(new Color(0xffffff), 0.0);
		tscene.renderFn = () => {
			tscene.renderer.instance.render(tscene.scene, orth);
		};
	}
	/**加载完成后隐藏 */
	public hide() {
		const {
			tscene,
			container,
			orth,
			resource,
		} = this;
		container.visible = false;
		tscene.renderFn = undefined;
	}
	/**设置加载进度 */
	public setProgress = (progress: number) => {
		const material = this.logoMaterial;
		if (!material) return;
		SLTScene.gsap.to(material.uniforms.uProgress, {
			value: progress,
			transition: 1,
			onComplete: () => {
				if (progress >= 1) {
					this.hide();
					this.event.trigger('gsapend');
				}
			},
		});
	};
}
