import { SLTScene } from "./scene";
/**记录时间和调用动画animation */
export declare class Time {
    private three;
    constructor(three: SLTScene);
    /**开始时间 */
    private start;
    /**当前时间 */
    private current;
    /**间隔时间(毫秒) */
    delta: number;
    /**间隔时间(秒) */
    get deltas(): number;
    /**屏幕刷新标识 */
    private ticker;
    /**总共经过时间(毫秒)  */
    elapsed: number;
    /**总共经过时间(秒) */
    get elapseds(): number;
    /**开始动画*/
    tick(): void;
    /**停止动画*/
    stop(): void;
    /**销毁动画以及相关的回调 */
    kill(): void;
}
