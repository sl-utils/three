import { TOptRenderer } from "src/types";
import { Camera, Scene, WebGLRenderer } from "three";
import { WebGPURenderer } from "three/webgpu";
/**渲染器 */
export declare class TRenderer {
    constructor(ele: HTMLElement, opt: TOptRenderer);
    instance: WebGLRenderer | WebGPURenderer;
    /**渲染 */
    render(scene: Scene, camera: Camera, renderFn?: Function): void;
    /**销毁 */
    kill(): void;
    /**渲染器配置 */
    private setRenderOpt;
}
