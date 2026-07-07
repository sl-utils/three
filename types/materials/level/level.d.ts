import { IUniform, ShaderMaterial } from "three";
/**水位线的材质 */
export declare class MaterialLevel extends ShaderMaterial {
    constructor();
    uniforms: {
        [uniform: string]: IUniform<any>;
    };
}
