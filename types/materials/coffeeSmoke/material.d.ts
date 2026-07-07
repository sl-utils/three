import { IUniform, ShaderMaterial } from "three";
/**咖啡热气效果（二维平面） */
export declare class CoffeeSmokeMaterial extends ShaderMaterial {
    constructor();
    uniforms: {
        [uniform: string]: IUniform<any>;
    };
}
