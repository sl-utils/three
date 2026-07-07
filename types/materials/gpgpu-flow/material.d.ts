import { IUniform, ShaderMaterial } from "three";
/**采用GPGPU生成贴图绘制粒子流体效果 */
export declare class MaterialGpgpuFlow extends ShaderMaterial {
    constructor();
    uniforms: {
        [uniform: string]: IUniform<any>;
    };
}
