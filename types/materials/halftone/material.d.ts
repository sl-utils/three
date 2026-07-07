import { IUniform, ShaderMaterial } from "three";
/**点状云阴影蒙层 */
export declare class MaterialHalftone extends ShaderMaterial {
    constructor();
    uniforms: {
        [uniform: string]: IUniform<any>;
    };
}
