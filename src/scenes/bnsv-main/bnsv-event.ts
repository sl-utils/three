import { Intersection, Raycaster, Vector3 } from 'three';
import { BnsvModel } from './bnsv-model';
import { CONST_BNSV_LABEL_DEVICE, CONST_BNSV_LABORATORY, CONST_BNSV_VIEW_LABLE } from './bnsv-const';
import { SLTScene, TCameraCtr } from 'src/core';

/**
 * 智慧输水、水锤监测、压力管理系统
 * 反引号键( ` ) + 1 : 返回到最初视角
 * 反引号键( ` ) + 2 : 返回到进入实验室视角
 * 反引号键( ` ) + 3 : 切换到查看水箱视角
 * 反引号键( ` ) + 4 : 切换到查看室内消除罐视角
 * 反引号键( ` ) + 5 : 切换到查看室外消除罐视角
 * 反引号键( ` ) + Q : 强制切换控制模式(键盘控制、鼠标控制)
 * 键盘控制模式下
 * W | ArrowUp 镜头前推
 * S | ArrowDown 镜头后退
 * A | ArrowLeft 镜头左移
 * D | ArrowRight 镜头右移
 * R 镜头上移
 * F 镜头下移
 * space+鼠标点击 : 镜头旋转(旋转方向与鼠标点击相对屏幕位置正相关，鼠标持续按住不放，镜头持续旋转)
 *
 * 鼠标控制模式下
 * 鼠标左键按住左右上下拖动 : 镜头围绕单点转动
 * 鼠标右键按住拖动 : 拖动场景
 * 鼠标滚轮滚动 : 前进后退
 *
 * 单设备系统
 * T : 切换控制组件为移动模式
 * R : 切换控制组件为旋转模式
 * S : 切换控制组件为缩放模式
 * Esc : 模型复原
 * 鼠标左键按住左右上下拖动 : 镜头围绕单点转动
 * 鼠标右键按住拖动 : 拖动场景
 * 鼠标滚轮滚动 : 前进后退
 *
 */

export class BnsvEvent {
	constructor(private scene: SLTScene<BnsvMainEvents>, models: BnsvModel) {
		this.models = models;
		scene.on('end.BnsvEvent', this.openEvent);
		scene.on('enter_lable', () => this.onViewSwitch('进入实验室', true));
	}
	/**事件类是否能用 */
	public enabled: boolean = true;
	/**所有的模型 */
	private models: BnsvModel;
	/**记录用户浏览时最近的设备名 */
	private view_name: string;
	/**事件导致切换视角的目标名称 */
	private view_target_name: string;
	/**注册监听事件 */
	private openEvent = () => {
		const { scene, models } = this,
			{
				keyStates,
				tele: { mouse },
				trenderer: {
					renderer: {
						domElement: { classList },
					},
				},
				container,
				camera,
				tcameraCtr,
				tcameraCtr: { ctrOrbit, ctrFirst },
			} = scene,
			raycaster = new Raycaster(),
			{ } = models;
		scene.off('END.BnsvEvent');
		let caster, name: string, visible, intersects: Array<Intersection>;
		scene.on('TICK', () => {
			if (!this.enabled) return;
			/**漫游查看设备 */
			if (
				(keyStates.KeyW ||
					keyStates.KeyA ||
					keyStates.KeyS ||
					keyStates.KeyD ||
					keyStates.KeyR ||
					keyStates.KeyF ||
					keyStates.ArrowUp ||
					keyStates.ArrowDown ||
					keyStates.ArrowLeft ||
					keyStates.ArrowRight) &&
				models.ifEnter &&
				ctrFirst.enabled
			) {
				this.computeDistance();
			}
			/**模型选择 */
			raycaster.setFromCamera(mouse, camera);
			intersects = raycaster.intersectObjects(container.children);
			/**解决空气粒子遮挡模型事件问题 */
			intersects = intersects.filter((e) => e.object.type !== 'Points');
			/**查找没有被隐藏的最近的模型 */
			visible = intersects.find((e) => e.object.visible == true && (!e.object.parent || e.object.parent.visible == true));
			caster = visible?.object;
			name = caster?.name || '';
			name = name.includes('罐体01') ? '设备091' : name.includes('罐体02') ? '设备092' : name.includes('水箱') ? '设备090' : name;
			if (name.includes(CONST_BNSV_LABORATORY) && !models.ifEnter) {
				classList.add('has-cursor-pointer');
			} else if (name.includes('设备')) {
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

			if (name.includes(CONST_BNSV_LABORATORY) && !models.ifEnter) {
				scene.trigger('enter_lable');
			} else if (name.includes('设备')) {
				const { x, y, z } = intersects[0].point;
				console.log(`position: new Vector3(${x}, ${y}, ${z}),`);
				this.onViewSwitch(name);
				this.scene.trigger('select_device', [name.slice(2, 5)]);
			}
		});
		scene.on('DOUBLE_CLICK', () => {
			if (!this.enabled) return;
			/**强制离开实验室 */
			if (keyStates.Escape && models.ifEnter) {
				this.onViewSwitch('初始视角', true);
			}
		});
		scene.on('KEY_DOWN', () => {
			if (!this.enabled) return;
			if (keyStates.Backquote) {
				if (keyStates.Digit1) {
					this.onViewSwitch('初始视角', true);
				} else if (keyStates.Digit2) {
					this.onViewSwitch('进入实验室', true);
				} else if (keyStates.Digit3) {
					this.onViewSwitch('设备090', true);
				} else if (keyStates.Digit4) {
					this.onViewSwitch('设备091', true);
				} else if (keyStates.Digit5) {
					this.onViewSwitch('设备092', true);
				} else if (keyStates.KeyQ) {
					tcameraCtr.onToggleCamera();
					scene.trigger('camear_orbit', [ctrOrbit.enabled]);
				}
			}
		});
	};
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
			models,
		} = this,
			{
				camera,
				tcameraCtr: { ctrFirst, ctrOrbit },
			} = scene,
			{ position, target, ifOrbit, label_shows = default_label, label_position = target } = info;
		if (['初始视角', '设备092'].includes(id)) models.onLeaveHouse();
		else models.onEnterHouse();
		this.view_target_name = id;
		ctrOrbit.pause();
		ctrFirst.resume();
		tlabels.onLabelsCtr([''], []);
		SLTScene.gsap.to(camera.position, {
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
					camera.position.copy(position);
				}
				tlabels.onLabelsCtr(label_shows, []);
				tlabels.onSetLabelPosition(label_shows, label_position);
				scene.trigger('camear_orbit', [ctrOrbit.enabled]);
			},
		});
	};
	/**计算距离 */
	private computeDistance() {
		const {
			scene,
			view_name,
			models: { meshs },
		} = this,
			{ tlabels, camera } = scene;
		let v1 = camera.position,
			min: number = Infinity,
			name: string;
		for (const key in CONST_BNSV_VIEW_LABLE) {
			const { target, label_position, type } = CONST_BNSV_VIEW_LABLE[key];
			if (!key.includes('设备') || !type) continue;
			const mesh = meshs && meshs[key];
			if (!mesh || !mesh.visible) continue;
			const position = label_position || target,
				distance = v1.distanceTo(position);
			if (distance < min) {
				/**该点在视角内 */
				if (this.isPointInViewport(position)) {
					min = distance;
					name = key;
				}
			}
		}
		if (name !== view_name) {
			this.view_name = name;
			scene.trigger('select_device', [name.slice(2, 5)]);
			if (!CONST_BNSV_VIEW_LABLE[name]) return;
			const { label_shows = [CONST_BNSV_LABEL_DEVICE], target, label_position = target } = CONST_BNSV_VIEW_LABLE[name];
			tlabels.onSetLabelPosition(label_shows, label_position);
			tlabels.onLabelsCtr(label_shows);
		}
	}
	/**点是否在可视范围 */
	private isPointInViewport(point: Vector3) {
		const { camera } = this.scene;
		const { x, y, z } = point.clone().project(camera);
		return x >= -1 && x <= 1 && y >= -1 && y <= 1 && z >= -1 && z <= 1;
	}
}

/**检查事件目标是否是device-pop或其子元素 */
export function isClickOnDevicePop(event: MouseEvent): boolean {
	const devicePopElements: any = document.querySelectorAll('device-pop, .device, .single');

	for (const element of devicePopElements) {
		if (element.contains(event.target as Node)) {
			return true;
		}
	}
	return false;
}
