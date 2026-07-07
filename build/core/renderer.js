import { NoToneMapping, PCFSoftShadowMap, SRGBColorSpace, WebGLRenderer } from "three";
import { WebGL } from "three/examples/jsm/Addons.js";
import WebGPU from "three/examples/jsm/capabilities/WebGPU.js";
import { WebGPURenderer } from "three/webgpu";
export class TRenderer {
    constructor(ele, opt) {
        let { isGPU = false } = opt;
        if (isGPU && WebGPU.isAvailable() === false && WebGL.isWebGL2Available() === false) {
            isGPU = false;
            console.warn("No WebGPU support , try to use WebGL");
        }
        const renderer = this.instance = isGPU ? new WebGPURenderer({ antialias: true }) : new WebGLRenderer({
            antialias: true,
            depth: true,
            alpha: true,
            logarithmicDepthBuffer: false,
        });
        renderer.setSize(ele.clientWidth, ele.clientHeight);
        ele.appendChild(renderer.domElement);
        this.setRenderOpt(opt);
    }
    render(scene, camera, renderFn) {
        const { instance: renderer } = this;
        if (renderer instanceof WebGPURenderer) {
            renderer.renderAsync(scene, camera);
        }
        else {
            renderFn ? renderFn() : renderer.render(scene, camera);
        }
    }
    kill() {
        const renderer = this.instance, { domElement } = renderer;
        domElement.innerHTML = '';
        domElement.remove();
        renderer.dispose();
        this.instance = null;
    }
    setRenderOpt(opt = {}) {
        const { instance: renderer } = this, { clearColor = 0xFFFFFF, clearAlpha = 1, pixelRatio = 1, localClippingEnabled = false, autoClear = true, shadowMap = {
            enabled: true,
            autoUpdate: false,
            needsUpdate: false,
        } } = opt;
        renderer.setPixelRatio(pixelRatio);
        renderer.outputColorSpace = SRGBColorSpace;
        renderer.autoClear = autoClear;
        renderer.sortObjects = false;
        renderer.shadowMap.enabled = !!shadowMap.enabled;
        renderer.shadowMap.type = PCFSoftShadowMap;
        renderer.toneMapping = NoToneMapping;
        renderer.toneMappingExposure = 1.12;
        if (renderer instanceof WebGPURenderer) {
        }
        else {
            renderer.localClippingEnabled = localClippingEnabled;
            renderer.setClearColor(clearColor, clearAlpha);
        }
    }
}
//# sourceMappingURL=renderer.js.map