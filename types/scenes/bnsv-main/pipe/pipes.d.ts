import { Mesh } from 'three';
import { Pipe } from './pipe';
import { SLTScene } from '../../..';
export declare class HousePipes {
    private tscene;
    constructor(tscene: SLTScene<BnsvMainEvents>);
    /**管道线路计算器，负责路径查找 */
    private lines;
    /**所有的管道 */
    readonly pipes: {
        [K: string]: Pipe;
    };
    /**有水流的管道 */
    private paths;
    /**隐藏管道 */
    onHidePipes(names: string[]): void;
    /**添加管道到管道组进行控制 */
    addPipe(mesh: Mesh): void;
    /**开关变化、管道控制
     * @param devices 所有控制设备状态
     * @param flag  false 是否重新流动
     */
    onPipeSwitch(devices: {
        [K: string]: boolean;
    }, flag?: boolean): void;
    /**销毁 */
    kill(): void;
    /**获取所有的管道名称 */
    private getNames;
}
