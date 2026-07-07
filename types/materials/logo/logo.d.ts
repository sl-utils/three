import { IUniform, MeshBasicMaterial, WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";
/**一个扩散覆盖过度的材质动画 */
export declare class MaterialLogo extends MeshBasicMaterial {
    constructor();
    uniforms: {
        [uniform: string]: IUniform<any>;
    };
    onBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void;
}
