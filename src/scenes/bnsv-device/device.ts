
import { u3_addAmbient, u3_addDirectional } from '../../utils/light';
import { Box3, Mesh, Vector3 } from 'three';
import { SkeletonUtils } from 'three/examples/jsm/Addons.js';
import { SLTScene } from '../../core';
import { TOptScene } from '../../types';
import { RESOURCES_DEVICE_ALL } from '../../Assets/resource_regist';
export class BnsvDevice extends SLTScene {
	constructor(ele: HTMLElement | string, options?: TOptScene) {
		super(ele, options);
		u3_addDirectional(this.scene);
		u3_addAmbient(this.scene);
	}
	private name: string;
	private box3: Box3 = new Box3();
	private v3: Vector3 = new Vector3();
	private positions: { [K: string]: Vector3 } = {
		'0101': new Vector3(-0.03, 5.55, -11.8),
		'1502': new Vector3(-5.68, 1.89, 1.79),
		'1501-A': new Vector3(0.67, 0.7, -2.29),
	};
	private modelConfig = {
		'9001': {
			scale: 0.7,
			position: [0, -0.13, 0],
			rotate: [0, 0.87, 0],
		},
		'9002': {
			rotate: [0, 2.36, 0],
		},
		'0102': {
			rotate: [0, 0.7, 0],
		},
		'0103': {
			position: [0.2, -0.13, 0],
			rotate: [-0.46, 0.7, 0.35],
		},
		'0201': {
			scale: 2.2,
		},
		'0202': {
			scale: 2.0,
			position: [0, -0.33, 0],
		},
		'0203': {
			scale: 1.3,
			position: [0.15, -0.1, 0],
			rotate: [0, 0.7, 0],
		},
		'0301': {
			rotate: [0, -3.95, 0],
		},
		'0401': {
			scale: 1.3,
			position: [0, -0.14, 0],
			rotate: [0, 2.28, 0],
		},
		'0501': {
			position: [0, -0.13, 0],
		},
		'0601': {
			scale: 1.3,
			rotate: [0, 0.71, 0],
		},
		'0602': {
			position: [-0.13, -0.13, 0],
			rotate: [0, 0.7, 0],
		},
		'0701': {
			scale: 2.5,
			rotate: [0, 1.53, 0],
		},
		'0702': {
			scale: 2,
			position: [0, -0.11, 0],
			rotate: [0, 0.87, 0],
		},
		'0801': {
			scale: 2,
		},
		'0802': {
			scale: 1.3,
			position: [0.22, 0, 0],
			rotate: [0, 0.7, 0],
		},
		'0901': {
			scale: 2.2,
			position: [0.04, -0.13, 0],
			rotate: [0, 0.7, 0],
		},
		'0902': {
			scale: 1.3,
			position: [0.04, -0.13, 0],
			rotate: [0, 0.7, 0],
		},
		'1001': {
			scale: 0.9,
			position: [0.16, 0, 0],
			rotate: [0, 0.87, 0],
		},
		'1101': {
			scale: 3.5,
			position: [0, -0.2, 0],
			rotate: [0, 0.7, 0],
		},
		'1201': {
			scale: 12,
			position: [0, 0.15, 0],
		},
		'1301': {
			scale: 2,
			position: [-0.13, 0, 0],
		},
		'1401': {
			scale: 3,
			position: [0, -0.13, 0],
		},
		'1402': {
			scale: 2.2,
			position: [0, -0.13, 0],
			rotate: [0, 2.03, 0],
		},
		'1403': {
			scale: 2,
			position: [0, -0.06, -0.11],
		},
		'1404': {
			scale: 1.8,
			position: [0.1, 0, 0],
			rotate: [0, 0.2, 0],
		},
		'1501-A2': {
			scale: 0.5,
		},
		'1502': {
			scale: 0.95,
			position: [0, -0.15, 0],
		},
		'1601': {
			scale: 2.5,
			position: [0, -0.15, 0],
		},
		'1701': {
			scale: 3,
			position: [-0.04, 0, 0],
		},
	};

	/**显示指定模型 */
	public onShowDevice(name: string) {
		/**根据名称决定加载哪个资源 */
		const resourecs = RESOURCES_DEVICE_ALL;
		this.name = name;
		const resourec = resourecs.find((e) => e.name == name);
		resourec && (resourec.ifDelay = false);
		this.resource.reload([resourec]);
		this.container.clear();
		this.on('END.BnsvDevice', this.onResourceEnd);
	}

	protected onResourceEnd(): void {
		const items = this.resource.items,
			{ name, box3, v3, container, tcameraCtr, camera, positions, modelConfig } = this;
		const scene = SkeletonUtils.clone(items[name].scene);
		scene.traverse((child: any) => {
			if (child.isMesh && child instanceof Mesh) {
				child.material.depthTest = true; // 启用深度检测
				child.material.depthWrite = true; // 启用深度写入（重要！）
			}
		});
		const { scale = 1, rotate = [0, 0, 0], position = [0, 0, 0] } = modelConfig[name] || {};
		scene.position.set(position[0], position[1], position[2]);
		scene.rotation.set(rotate[0], rotate[1], rotate[2]);
		scene.scale.set(scale, scale, scale);
		container.add(scene);
		if (positions[name]) {
			v3.copy(positions[name]);
		} else {
			box3.setFromObject(container);
			box3.getSize(v3);
			v3.setScalar(1);
		}
		camera.position.copy(v3);
		tcameraCtr.ctrOrbit.update();
		SLTScene.gui.on(camera, '相机', [
			{ name: 'X', param: 'position.x', ifNums: [100, 100, 0.01], listen: true },
			{ name: 'Y', param: 'position.y', ifNums: [100, 100, 0.01], listen: true },
			{ name: 'Z', param: 'position.z', ifNums: [100, 100, 0.01], listen: true },
		]);
		SLTScene.gui.on(scene, `设备${name}`, [
			{ name: 'positionX', param: 'position.x', ifNums: [-10, 10, 0.01], listen: true },
			{ name: 'positionY', param: 'position.y', ifNums: [-10, 10, 0.01], listen: true },
			{ name: 'positionZ', param: 'position.z', ifNums: [-10, 10, 0.01], listen: true },
			{ name: 'rotationX', param: 'rotation.x', ifNums: [-10, 10, 0.01], listen: true },
			{ name: 'rotationY', param: 'rotation.y', ifNums: [-10, 10, 0.01], listen: true },
			{ name: 'rotationZ', param: 'rotation.z', ifNums: [-10, 10, 0.01], listen: true },
		]);
		items[name] = undefined;
		this.off('END.BnsvDevice');
	}
}
