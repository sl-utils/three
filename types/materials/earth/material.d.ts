import { IUniform, ShaderMaterial } from "three";
/**地球效果 + atmosphere 大气层效果 */
export declare class MaterialEarth extends ShaderMaterial {
    constructor();
    uniforms: {
        [uniform: string]: IUniform<any>;
    };
}
