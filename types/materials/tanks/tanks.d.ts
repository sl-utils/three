import { IUniform, MeshStandardMaterial, WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";
export declare class MaterialTanks extends MeshStandardMaterial {
    constructor();
    uniforms: {
        [uniform: string]: IUniform<any>;
    };
    onBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void;
}
