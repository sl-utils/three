import { IUniform, ShaderMaterial } from "three";
/**地球的大气层效果 */
export declare class MaterialPointsTexture extends ShaderMaterial {
    constructor();
    uniforms: {
        [uniform: string]: IUniform<any>;
    };
}
