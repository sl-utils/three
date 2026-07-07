import { IUniform, ShaderMaterial } from "three";
/**自定义光源 */
export declare class MaterialLight extends ShaderMaterial {
    constructor();
    uniforms: {
        [uniform: string]: IUniform<any>;
    };
}
