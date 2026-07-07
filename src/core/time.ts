import { TEvent } from "./event";
import { SLTScene } from "./scene";

/**记录时间和调用动画animation */
export class Time {
    constructor(private three: SLTScene) {
        this.tick = this.tick.bind(this);
        this.tick();
    }
    /**开始时间 */
    private start: number = Date.now();
    /**当前时间 */
    private current: number = this.start;
    /**间隔时间(毫秒) */
    public delta: number = 16;
    /**间隔时间(秒) */
    public get deltas(): number {
        return this.delta / 1000;
    }
    /**屏幕刷新标识 */
    private ticker: number = 0;
    /**总共经过时间(毫秒)  */
    public elapsed: number = 0;
    /**总共经过时间(秒) */
    public get elapseds(): number {
        return this.elapsed / 1000;
    }
    /**开始动画*/
    public tick() {
        const that = this;
        that.ticker = window.requestAnimationFrame(that.tick);
        const current = Date.now()
        that.delta = current - that.current;
        if (that.delta > 60) that.delta = 60;
        that.elapsed = current - that.start;
        that.current = current;
        this.three.trigger('TICK', [this])
    }
    /**停止动画*/
    public stop() {
        window.cancelAnimationFrame(this.ticker)
    }
    /**销毁动画以及相关的回调 */
    public kill() {
        this.stop();
        this.three.off('TICK');
    }
}
