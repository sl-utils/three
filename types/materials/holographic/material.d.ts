import { IUniform, ShaderMaterial } from "three";
/**模型系统故障感觉 */
export declare class HolographicMaterial extends ShaderMaterial {
    constructor();
    uniforms: {
        [uniform: string]: IUniform<any>;
    };
}
