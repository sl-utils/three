import { Vector2, Vector4 } from 'three';
import { TEvent } from '..';
type KeyCode = 'Escape' | 'Backquote' | 'Minus' | 'Equal' | 'Backspace' | 'Tab' | 'Backslash' | 'CapsLock' | 'Semicolon' | 'Quote' | 'Enter' | 'Comma' | 'Period' | 'Slash' | 'MetaLeft' | 'Space' | 'ContextMenu' | `${'Alt' | 'Bracket' | 'Control' | 'Shift'}${'Left' | 'Right'}` | `Key${'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'}`
/**Digit 主键盘上方数字表 Numpad 数字键盘*/
 | `${'Digit' | 'Numpad' | 'F'}${'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'}` | 'F10' | 'F11' | 'F12' | `Numpad${'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Enter' | 'Decimal'}` | 'NumLock' | `Arrow${'Down' | 'Left' | 'Right' | 'Up'}`;
/**3D视图HTML节点管理类*/
export declare class TElement {
    constructor(dom: HTMLElement, event: TEvent);
    /**节点大小变化的观察对象 */
    private resizeObserver;
    /**所有的监听事件 */
    private listeners;
    /**视口 */
    private rect;
    /**宽 */
    private _width;
    /**高 */
    private _height;
    /**挂载的节点 */
    private _ele;
    get ele(): HTMLElement;
    /**鼠标相对节点坐标(射线专用百分比) */
    readonly mouse: Vector2;
    /**shadertoy中的输入变量
      * x,y 鼠标位置
      * z 鼠标按下时大于 1
      * w 按下那一帧值大于 1
      */
    readonly iMouse: Vector4;
    /**宽 */
    get width(): number;
    /**高 */
    get height(): number;
    /**键盘按键状态 */
    readonly keyStates: {
        readonly [K in KeyCode]: boolean;
    } & {
        mousedown: boolean;
        movementX: number;
        movementY: number;
    };
    /**销毁 */
    kill(): void;
    /**生成观察者，观察节点大小 */
    private genObserver;
    /**监听节点一系列事件并触发 */
    private openListener;
    /**设置鼠标坐标 */
    private setMouse;
}
export {};
