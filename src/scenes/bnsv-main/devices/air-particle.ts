import { BufferAttribute, BufferGeometry, Points, Vector3 } from 'three';
import { MaterialParticle } from '../../../materials/particle/particle';
import { SLTScene } from 'src/core';

/**空气粒子效果 */
export class AirParticle {
	constructor(private scene: SLTScene<BnsvMainEvents>, start: Vector3, num: number = 90) {
		this.start = start;
		this.num = num;
		this.position = new Float32Array(num * 3);
		this.uposition = new Float32Array(num * 4);
		this.arotate = new Float32Array(num);
		this.bufferGeometry.setAttribute('position', new BufferAttribute(this.position, 3));
		this.bufferGeometry.setAttribute('uposition', new BufferAttribute(this.uposition, 4));
		this.bufferGeometry.setAttribute('arotate', new BufferAttribute(this.arotate, 1));
		this.material = new MaterialParticle(start);
		this.particle = new Points(this.bufferGeometry, this.material);
		scene.container.add(this.particle);
	}
	/** 粒子个数 */
	private num: number;
	/**空气粒子的开始位置 */
	private start: Vector3;
	/**空气粒子要移动到的目标位置 */
	private uposition: Float32Array;
	private position: Float32Array;
	/**旋转的角度 */
	private arotate: Float32Array;

	/**几何信息 */
	private bufferGeometry: BufferGeometry = new BufferGeometry();
	public readonly material: MaterialParticle;
	particle: Points;
	/**设置空气阀状态 0-静止、1-排气、2-进气 */
	public onSetAirState(state: 0 | 1 | 2) {
		if (state === 0) {
			this.scene.container.remove(this.particle);
			return;
		}
		const { material, start } = this;
		material.uniforms.ustate.value = state;
		material.uniforms.utime.value = (100 + Math.random() * 100) | 0.5;
		this.onSetPosition(start, state);
	}
	/**更新设置粒子位置 */
	public onSetPosition(start: Vector3, state?: 0 | 1 | 2) {
		const { num, position, uposition, arotate, bufferGeometry } = this;
		const { x, y, z } = start;
		for (let i = 0, all = num * 3; i < all; i += 3) {
			position[i] = x;
			position[i + 1] = y;
			position[i + 2] = z;
			arotate[i / 3] = 0;
		}
		for (let i = 0, all = num * 4; i < all; i += 4) {
			if (state === 2) {
				// 进气
				uposition[i] = x + (Math.random() - 0.5) * 0.1; // 减小随机范围
				uposition[i + 1] = y + (Math.random() - 0.2) * 0.2;
				uposition[i + 2] = z + (Math.random() - 0.5) * 0.1;
				uposition[i + 3] = Math.random() * 0.5 + 0.2; // 进气速度更快
			} else {
				// 出气
				uposition[i] = x + (Math.random() - 0.5) * 0.17;
				uposition[i + 1] = y + (Math.random() - 0.2) * 0.25;
				uposition[i + 2] = z + (Math.random() - 0.5) * 0.17;
				uposition[i + 3] = Math.random() * 0.5 + 1.2;
			}
		}
		bufferGeometry.attributes.position.needsUpdate = true;
		bufferGeometry.attributes.arotate.needsUpdate = true;
		bufferGeometry.attributes.uposition.needsUpdate = true;
	}
}
