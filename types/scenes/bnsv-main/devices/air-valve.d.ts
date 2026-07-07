import { Group, Mesh } from 'three';
import { SLTScene } from 'src/core';
/**空气阀 */
export declare class AirValves {
    private scene;
    constructor(scene: SLTScene<BnsvMainEvents>);
    /**所有的空气粒子 */
    private readonly particles;
    /**所有的空气阀漏斗 */
    private readonly meshMaterials;
    /**根据网格数据创建空气阀 */
    onCreateAir(mesh: Mesh | Group): void;
    /**改变空气阀开关皇台 */
    /**空气阀状态修改 */
    onChangeStatus(status: any[]): void;
    /**设置空气阀状态
     * @param name 指定的空气阀
     * @param state 0-静止、1-排气、2-进气
     */
    onSetAirState(name: string, state: 0 | 1 | 2): void;
    private gui;
}
