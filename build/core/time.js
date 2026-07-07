export class Time {
    constructor(three) {
        this.three = three;
        this.start = Date.now();
        this.current = this.start;
        this.delta = 16;
        this.ticker = 0;
        this.elapsed = 0;
        this.tick = this.tick.bind(this);
        this.tick();
    }
    get deltas() {
        return this.delta / 1000;
    }
    get elapseds() {
        return this.elapsed / 1000;
    }
    tick() {
        const that = this;
        that.ticker = window.requestAnimationFrame(that.tick);
        const current = Date.now();
        that.delta = current - that.current;
        if (that.delta > 60)
            that.delta = 60;
        that.elapsed = current - that.start;
        that.current = current;
        this.three.trigger('TICK', [this]);
    }
    stop() {
        window.cancelAnimationFrame(this.ticker);
    }
    kill() {
        this.stop();
        this.three.off('TICK');
    }
}
//# sourceMappingURL=time.js.map