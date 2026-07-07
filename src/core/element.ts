import { Vector2, Vector4 } from 'three';
import { TEvent } from '..';
type KeyCode = 'Escape'
    | 'Backquote' | 'Minus' | 'Equal' | 'Backspace'
    | 'Tab' | 'Backslash'
    | 'CapsLock' | 'Semicolon' | 'Quote' | 'Enter'
    | 'Comma' | 'Period' | 'Slash'
    | 'MetaLeft' | 'Space' | 'ContextMenu'
    | `${'Alt' | 'Bracket' | 'Control' | 'Shift'}${'Left' | 'Right'}`
    | `Key${'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'}`
    /**Digit 主键盘上方数字表 Numpad 数字键盘*/
    | `${'Digit' | 'Numpad' | 'F'}${'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'}` | 'F10' | 'F11' | 'F12'
    | `Numpad${'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Enter' | 'Decimal'}` | 'NumLock'
    | `Arrow${'Down' | 'Left' | 'Right' | 'Up'}`;
/**3D视图HTML节点管理类*/
export class TElement {
    constructor(dom: HTMLElement = document.body, event: TEvent) {
        this._ele = dom;
        this._width = dom.clientWidth;
        this._height = dom.clientHeight;
        this.rect = dom.getBoundingClientRect();
        this.genObserver(event);
        this.openListener(event)
    }
    /**节点大小变化的观察对象 */
    private resizeObserver: ResizeObserver;
    /**所有的监听事件 */
    private listeners: {
        /**被监听的节点 */
        ele: HTMLElement,
        /**监听的事件类型 */
        type: keyof HTMLElementEventMap,
        /**回调函数 */
        cb: (this: HTMLElement, ev: any) => any,
        /**参数 */
        param?: any
    }[] = [];
    /**视口 */
    private rect: DOMRect;
    /**宽 */
    private _width: number = 0;
    /**高 */
    private _height: number = 0;
    /**挂载的节点 */
    private _ele: HTMLElement;
    public get ele() {
        if (!this._ele) console.error('TElement没有初始化！')
        return this._ele;
    }
    /**鼠标相对节点坐标(射线专用百分比) */
    public readonly mouse: Vector2 = new Vector2(9999, 9999);
    /**shadertoy中的输入变量
      * x,y 鼠标位置
      * z 鼠标按下时大于 1
      * w 按下那一帧值大于 1
      */
    public readonly iMouse: Vector4 = new Vector4();
    /**宽 */
    public get width() {
        return this._width
    };
    /**高 */
    public get height() {
        return this._height
    };
    /**键盘按键状态 */
    public readonly keyStates: {
        readonly [K in KeyCode]: boolean
    } & {
        mousedown: boolean,
        movementX: number,
        movementY: number,
    } = Object.create(null);
    /**销毁 */
    public kill() {
        this.resizeObserver.unobserve(this.ele);
        this.listeners.forEach(e => {
            const { ele, type, cb, param = {} } = e;
            ele.removeEventListener(type, cb, param)
        })
    }
    /**生成观察者，观察节点大小 */
    private genObserver(event: TEvent) {
        // 创建 ResizeObserver 实例
        const resizeObserver = this.resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const target = entry.target, that = this;
                // 获取目标元素的新宽度和高度
                that._width = target.clientWidth;
                that._height = target.clientHeight;
                that.rect = target.getBoundingClientRect();
                // 在这里执行相应的操作，如更新布局、重新渲染等
                console.log(`Element size changed: ${that.width}px x ${that.height}px`);
                event.trigger('resize', [that])
            }
        });
        // 开始观察元素大小变化
        resizeObserver.observe(this.ele);
    }
    /**监听节点一系列事件并触发 */
    private openListener(event: TEvent) {
        let { ele, keyStates, iMouse, listeners } = this;
        listeners.push({
            ele, type: 'click', cb: (ev: MouseEvent) => {
                event.trigger('CLICK', [ev])
            }
        }, {
            ele, type: 'dblclick', cb: (ev: MouseEvent) => {
                event.trigger('DOUBLE_CLICK', [ev])
            }
        }, {
            ele, type: 'wheel', cb: (ev) => {
                event.trigger('WHEEL', [ev])
            }, param: { passive: true }
        }, {
            ele, type: 'mousemove', cb: (ev: MouseEvent) => {
                this.setMouse(ev)
                keyStates.movementX = ev.movementX;
                keyStates.movementY = ev.movementY;
                event.trigger('MOUSE_MOVE', [ev])
            }
        }, {
            ele, type: 'mousedown', cb: (ev: MouseEvent) => {
                this.setMouse(ev);
                iMouse.z = 2.0;
                iMouse.w = 3.0;
                keyStates.mousedown = true;
                event.trigger('MOUSE_DOWN', [ev]);
            }
        }, {
            ele: document.body, type: 'mouseup', cb: (ev: MouseEvent) => {
                this.setMouse(ev)
                iMouse.z = 0.0;
                keyStates.mousedown = false;
                event.trigger('MOUSE_UP', [ev])
            }
        }, {
            ele: document.body, type: 'keydown', cb: (ev: KeyboardEvent) => {
                keyStates[ev.code] = true;
                event.trigger('KEY_DOWN', [ev])
            }
        }, {
            ele: document.body, type: 'keyup', cb: (ev: KeyboardEvent) => {
                keyStates[ev.code] = false;
                event.trigger('KEY_UP', [ev])
            }
        })
        event.on('TICK', () => {
            if (iMouse.w >= 1.0) iMouse.w--;
        })
        listeners.forEach(e => {
            const { ele, type, cb, param = {} } = e;
            ele.addEventListener(type, cb, param)
        })
    }
    /**设置鼠标坐标 */
    private setMouse(ev: MouseEvent) {
        const { ele, mouse, rect, iMouse } = this, x = ev.clientX - rect.left, y = ev.clientY - rect.top;
        mouse.x = (x / ele.clientWidth) * 2 - 1;
        mouse.y = - (y / ele.clientHeight) * 2 + 1;
        iMouse.x = ev.pageX - rect.left;
        iMouse.y = ele.clientHeight - ev.pageY + rect.top - 1;
    }
}


