import { IUniform, MeshStandardMaterial, WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";
/**飘动的旗 */
export declare class MaterialFlag extends MeshStandardMaterial {
    constructor(material: MeshStandardMaterial);
    uniforms: {
        [uniform: string]: IUniform<any>;
    };
    onBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void;
}
