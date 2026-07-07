import { Group, OrthographicCamera, PerspectiveCamera, Scene } from 'three';
import { Gui } from '../plugins/gui';
import { TEvent } from './event';
import { TElement } from './element';
import { TRenderer } from './renderer';
import { Time } from './time';
import { TCamera, TCameraCtr } from './camera';
import { Cannon } from './physice/cannon';
import { TResource } from './resource';
import { TLabels } from './labels';
import { SLTEvents, TOptScene, TResourceItems } from '../types';
/**同页面多实例多场景 */
export declare const SLTScenes: {
    [K: string]: SLTScene<any>;
};
/**场景基础
 * ①当模型等异步资源加载完成后会调用init方法，在init中布置场景
 * ②开场加载动画完成后调用showScene调整相机位置并将场景添加到Scene
 * @param html 场景的Dom节点
 * @param opt 场景的配置
 */
export declare class SLTScene<T extends string | null = null> extends TEvent<SLTEvents | T> {
    constructor(html: HTMLElement | string, opt?: TOptScene);
    /**资源管理器-所有加载过的资源都在这里 */
    static readonly resources: TResourceItems;
    /**gsap动画控件 */
    static gsap: typeof globalThis.gsap;
    static gui: typeof Gui;
    readonly resources: TResourceItems;
    readonly tele: TElement;
    readonly time: Time;
    readonly scene: Scene;
    readonly renderer: TRenderer;
    readonly physice: Cannon;
    /**相机 */
    readonly tcamera: TCamera;
    /**相机控制器 */
    get tcameraCtr(): TCameraCtr;
    /**原始相机 */
    get camera(): PerspectiveCamera | OrthographicCamera;
    /**设置值后将会替换默认的render并执行 */
    renderFn: Function | undefined;
    /**资源管理器 */
    readonly resource: TResource;
    /**3D物体集合 */
    readonly container: Group<import("three").Object3DEventMap>;
    /**用于注销事件的id */
    protected uuid: string;
    /**2D标签 */
    private _labels?;
    get tlabels(): TLabels;
    /**当前所有按键状态 */
    get keyStates(): {
        readonly AltLeft: boolean;
        readonly AltRight: boolean;
        readonly BracketLeft: boolean;
        readonly BracketRight: boolean;
        readonly ControlLeft: boolean;
        readonly ControlRight: boolean;
        readonly ShiftLeft: boolean;
        readonly ShiftRight: boolean;
        readonly KeyA: boolean;
        readonly KeyB: boolean;
        readonly KeyC: boolean;
        readonly KeyD: boolean;
        readonly KeyE: boolean;
        readonly KeyF: boolean;
        readonly KeyG: boolean;
        readonly KeyH: boolean;
        readonly KeyI: boolean;
        readonly KeyJ: boolean;
        readonly KeyK: boolean;
        readonly KeyL: boolean;
        readonly KeyM: boolean;
        readonly KeyN: boolean;
        readonly KeyO: boolean;
        readonly KeyP: boolean;
        readonly KeyQ: boolean;
        readonly KeyR: boolean;
        readonly KeyS: boolean;
        readonly KeyT: boolean;
        readonly KeyU: boolean;
        readonly KeyV: boolean;
        readonly KeyW: boolean;
        readonly KeyX: boolean;
        readonly KeyY: boolean;
        readonly KeyZ: boolean;
        readonly F0: boolean;
        readonly F1: boolean;
        readonly F2: boolean;
        readonly F3: boolean;
        readonly F4: boolean;
        readonly F5: boolean;
        readonly F6: boolean;
        readonly F7: boolean;
        readonly F8: boolean;
        readonly F9: boolean;
        readonly Digit0: boolean;
        readonly Digit1: boolean;
        readonly Digit2: boolean;
        readonly Digit3: boolean;
        readonly Digit4: boolean;
        readonly Digit5: boolean;
        readonly Digit6: boolean;
        readonly Digit7: boolean;
        readonly Digit8: boolean;
        readonly Digit9: boolean;
        readonly Numpad0: boolean;
        readonly Numpad1: boolean;
        readonly Numpad2: boolean;
        readonly Numpad3: boolean;
        readonly Numpad4: boolean;
        readonly Numpad5: boolean;
        readonly Numpad6: boolean;
        readonly Numpad7: boolean;
        readonly Numpad8: boolean;
        readonly Numpad9: boolean;
        readonly Enter: boolean;
        readonly NumpadAdd: boolean;
        readonly NumpadSubtract: boolean;
        readonly NumpadMultiply: boolean;
        readonly NumpadDivide: boolean;
        readonly NumpadEnter: boolean;
        readonly NumpadDecimal: boolean;
        readonly ArrowLeft: boolean;
        readonly ArrowRight: boolean;
        readonly ArrowDown: boolean;
        readonly ArrowUp: boolean;
        readonly Escape: boolean;
        readonly Backquote: boolean;
        readonly Minus: boolean;
        readonly Equal: boolean;
        readonly Backspace: boolean;
        readonly Tab: boolean;
        readonly Backslash: boolean;
        readonly CapsLock: boolean;
        readonly Semicolon: boolean;
        readonly Quote: boolean;
        readonly Comma: boolean;
        readonly Period: boolean;
        readonly Slash: boolean;
        readonly MetaLeft: boolean;
        readonly Space: boolean;
        readonly ContextMenu: boolean;
        readonly F10: boolean;
        readonly F11: boolean;
        readonly F12: boolean;
        readonly NumLock: boolean;
    } & {
        mousedown: boolean;
        movementX: number;
        movementY: number;
    };
    /**helper的配置参数 */
    private readonly options;
    /**销毁自身所有3D对象  */
    kill(): void;
    /**开启所有的事件监听 */
    private openListener;
}
