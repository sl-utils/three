import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { SLTScene } from '../..';
export declare class CtrFirstPerson extends FirstPersonControls {
    private tscene;
    constructor(tscene: SLTScene);
    /**禁止源码鼠标左键前进右键后退 */
    activeLook: boolean;
    /**是否是手机模式 */
    phone: boolean;
    /**相机移动方向
     * @param dir 前后左右上下关闭所有
     * @param flag true:开始移动 false:停止移动
     */
    move(dir: 'Forward' | 'Backward' | 'Left' | 'Right' | 'Up' | 'Down' | 'Close', flag: boolean): void;
    /**暂停第一视角控制器 */
    pause(): void;
    /**恢复第一视角控制器 */
    resume(): void;
    private openListener;
    /**销毁 */
    kill(): void;
}
