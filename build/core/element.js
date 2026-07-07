import { Vector2, Vector4 } from 'three';
export class TElement {
    constructor(dom = document.body, event) {
        this.listeners = [];
        this._width = 0;
        this._height = 0;
        this.mouse = new Vector2(9999, 9999);
        this.iMouse = new Vector4();
        this.keyStates = Object.create(null);
        this._ele = dom;
        this._width = dom.clientWidth;
        this._height = dom.clientHeight;
        this.rect = dom.getBoundingClientRect();
        this.genObserver(event);
        this.openListener(event);
    }
    get ele() {
        if (!this._ele)
            console.error('TElement没有初始化！');
        return this._ele;
    }
    get width() {
        return this._width;
    }
    ;
    get height() {
        return this._height;
    }
    ;
    kill() {
        this.resizeObserver.unobserve(this.ele);
        this.listeners.forEach(e => {
            const { ele, type, cb, param = {} } = e;
            ele.removeEventListener(type, cb, param);
        });
    }
    genObserver(event) {
        const resizeObserver = this.resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const target = entry.target, that = this;
                that._width = target.clientWidth;
                that._height = target.clientHeight;
                that.rect = target.getBoundingClientRect();
                console.log(`Element size changed: ${that.width}px x ${that.height}px`);
                event.trigger('resize', [that]);
            }
        });
        resizeObserver.observe(this.ele);
    }
    openListener(event) {
        let { ele, keyStates, iMouse, listeners } = this;
        listeners.push({
            ele, type: 'click', cb: (ev) => {
                event.trigger('CLICK', [ev]);
            }
        }, {
            ele, type: 'dblclick', cb: (ev) => {
                event.trigger('DOUBLE_CLICK', [ev]);
            }
        }, {
            ele, type: 'wheel', cb: (ev) => {
                event.trigger('WHEEL', [ev]);
            }, param: { passive: true }
        }, {
            ele, type: 'mousemove', cb: (ev) => {
                this.setMouse(ev);
                keyStates.movementX = ev.movementX;
                keyStates.movementY = ev.movementY;
                event.trigger('MOUSE_MOVE', [ev]);
            }
        }, {
            ele, type: 'mousedown', cb: (ev) => {
                this.setMouse(ev);
                iMouse.z = 2.0;
                iMouse.w = 3.0;
                keyStates.mousedown = true;
                event.trigger('MOUSE_DOWN', [ev]);
            }
        }, {
            ele: document.body, type: 'mouseup', cb: (ev) => {
                this.setMouse(ev);
                iMouse.z = 0.0;
                keyStates.mousedown = false;
                event.trigger('MOUSE_UP', [ev]);
            }
        }, {
            ele: document.body, type: 'keydown', cb: (ev) => {
                keyStates[ev.code] = true;
                event.trigger('KEY_DOWN', [ev]);
            }
        }, {
            ele: document.body, type: 'keyup', cb: (ev) => {
                keyStates[ev.code] = false;
                event.trigger('KEY_UP', [ev]);
            }
        });
        event.on('TICK', () => {
            if (iMouse.w >= 1.0)
                iMouse.w--;
        });
        listeners.forEach(e => {
            const { ele, type, cb, param = {} } = e;
            ele.addEventListener(type, cb, param);
        });
    }
    setMouse(ev) {
        const { ele, mouse, rect, iMouse } = this, x = ev.clientX - rect.left, y = ev.clientY - rect.top;
        mouse.x = (x / ele.clientWidth) * 2 - 1;
        mouse.y = -(y / ele.clientHeight) * 2 + 1;
        iMouse.x = ev.pageX - rect.left;
        iMouse.y = ele.clientHeight - ev.pageY + rect.top - 1;
    }
}
//# sourceMappingURL=element.js.map