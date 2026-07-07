import { Group, Mesh } from 'three';
import { HousePipes } from './pipe/pipes';
import { AirValves } from './devices/air-valve';
import { MaterialFlag } from '../../materials/flag';
import { SLTScene } from 'src/core';
/**模型加载玩后进行处理类 */
export declare class BnsvModel {
    constructor(tscene: SLTScene<BnsvMainEvents>);
    private scene;
    /**管道 */
    readonly pipes: HousePipes;
    /**旗帜材质 */
    readonly flags: MaterialFlag[];
    /**进入了实验室 */
    private _ifEnter;
    get ifEnter(): boolean;
    /**空气阀设备 */
    airs: AirValves;
    private tanks;
    /**模型是否已经加载标志 */
    private ifAdded;
    /**所有模型 */
    readonly meshs: {
        [K: string]: Mesh | Group;
    };
    /**记录所有设备开关状态(为false时为关) */
    readonly statusSwitch: {
        [K: string]: boolean;
    };
    /**隐藏特定的设备
     * @param names 设备组名称
     * @param falg
     */
    onHides(names: string[]): void;
    /**根据节点设置模型状态 */
    onInstallNodeDate(status: any[]): void;
    /**关闭特定的设备组
     * @param names 设备组名称
     */
    onCloseDevices(names: string[]): void;
    /**进入实验室 */
    onEnterHouse(): void;
    /**离开实验室 */
    onLeaveHouse(): void;
    /**销毁 */
    kill(): void;
    /**按进度处理模型 */
    private loadModelProcess;
    /**加载指定模型
     * @param name 模型的关键key
     */
    private onModelLoad;
}
