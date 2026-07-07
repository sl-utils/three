import { TOptRenderer } from "src/types";
import { ACESFilmicToneMapping, Camera, CineonToneMapping, ColorRepresentation, LinearToneMapping, NoToneMapping, PCFSoftShadowMap, SRGBColorSpace, Scene, WebGLRenderer, WebGLRendererParameters, WebGLShadowMap } from "three";
import { WebGL } from "three/examples/jsm/Addons.js";
import WebGPU from "three/examples/jsm/capabilities/WebGPU.js";
import { WebGPURenderer } from "three/webgpu";
/**渲染器 */
export class TRenderer {
    constructor(ele: HTMLElement, opt: TOptRenderer) {
        let { isGPU = false } = opt;
        if (isGPU && WebGPU.isAvailable() === false && WebGL.isWebGL2Available() === false) {
            isGPU = false;
            console.warn("No WebGPU support , try to use WebGL");
        }
        const renderer = this.instance = isGPU ? new WebGPURenderer({ antialias: true }) : new WebGLRenderer({
            antialias: true,
            depth: true,
            alpha: true,
            /**出现面闪烁问题时改为true */
            logarithmicDepthBuffer: false,
        });
        renderer.setSize(ele.clientWidth, ele.clientHeight);
        ele.appendChild(renderer.domElement);
        this.setRenderOpt(opt);
    }
    public instance: WebGLRenderer | WebGPURenderer;
    /**渲染 */
    public render(scene: Scene, camera: Camera, renderFn?: Function) {
        const { instance: renderer } = this;
        if (renderer instanceof WebGPURenderer) {
            renderer.renderAsync(scene, camera)
        } else {
            renderFn ? renderFn() : renderer.render(scene, camera);
        }
    }
    /**销毁 */
    public kill() {
        const renderer = this.instance, { domElement } = renderer;
        domElement.innerHTML = '';
        domElement.remove()
        renderer.dispose();
        this.instance = null;
    }
    /**渲染器配置 */
    private setRenderOpt(opt: TOptRenderer = {}) {
        const { instance: renderer } = this, {
            clearColor = 0xFFFFFF,
            clearAlpha = 1,
            pixelRatio = 1,
            localClippingEnabled = false,
            autoClear = true,
            shadowMap = {
                enabled: true,
                autoUpdate: false,
                needsUpdate: false,
            }
        } = opt;
        renderer.setPixelRatio(pixelRatio)
        renderer.outputColorSpace = SRGBColorSpace;
        renderer.autoClear = autoClear;
        renderer.sortObjects = false;
        /**开启阴影渲染 */
        renderer.shadowMap.enabled = !!shadowMap.enabled;
        /**指定阴影的渲染模式 */
        renderer.shadowMap.type = PCFSoftShadowMap;
        // instance.shadowMap.autoUpdate = !!shadowMap.autoUpdate;
        // instance.shadowMap.needsUpdate = !!shadowMap.needsUpdate;
        /**调整渲染器的色调映射和曝光 */
        renderer.toneMapping = NoToneMapping;
        renderer.toneMappingExposure = 1.12;
        if (renderer instanceof WebGPURenderer) {
            // renderer.clearColor(clearColor, clearAlpha)
        } else {
            renderer.localClippingEnabled = localClippingEnabled;
            //默认使用基于物理的光照模型发展,所以被移除？ renderer.physicallyCorrectLights = true;  
            renderer.setClearColor(clearColor, clearAlpha)
        }
    }
}


