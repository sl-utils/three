import { IUniform, ShaderMaterial } from "three";
/**烟花 */
export declare class MaterialFireworks extends ShaderMaterial {
    constructor();
    uniforms: {
        [uniform: string]: IUniform<any>;
    };
}
