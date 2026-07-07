import { ShaderMaterial, Vector3 } from 'three';
/**空气阀附近空气状态材质 */
export declare class MaterialParticle extends ShaderMaterial {
    constructor(start: Vector3);
    uniforms: {
        usmoke: {
            value: any;
        };
        usmokeIn: {
            value: any;
        };
        utime: {
            value: number;
        };
        ustart: {
            value: any;
        };
        ustate: {
            value: number;
        };
    };
}
