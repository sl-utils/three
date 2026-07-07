import { ShaderMaterial } from "three";
/**空气阀附近空气状态材质 */
export declare class MaterialValve extends ShaderMaterial {
    constructor();
    uniforms: {
        ustate1: {
            value: any;
        };
        ustate2: {
            value: any;
        };
        vstate: {
            value: number;
        };
        utime: {
            value: number;
        };
    };
}
