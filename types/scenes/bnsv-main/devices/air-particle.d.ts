import { Points, Vector3 } from 'three';
import { MaterialParticle } from '../../../materials/particle/particle';
import { SLTScene } from 'src/core';
/**空气粒子效果 */
export declare class AirParticle {
    private scene;
    constructor(scene: SLTScene<BnsvMainEvents>, start: Vector3, num?: number);
    /** 粒子个数 */
    private num;
    /**空气粒子的开始位置 */
    private start;
    /**空气粒子要移动到的目标位置 */
    private uposition;
    private position;
    /**旋转的角度 */
    private arotate;
    /**几何信息 */
    private bufferGeometry;
    readonly material: MaterialParticle;
    particle: Points;
    /**设置空气阀状态 0-静止、1-排气、2-进气 */
    onSetAirState(state: 0 | 1 | 2): void;
    /**更新设置粒子位置 */
    onSetPosition(start: Vector3, state?: 0 | 1 | 2): void;
}
