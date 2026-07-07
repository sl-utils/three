import { AdditiveBlending, BackSide, Color, DoubleSide, FrontSide, IUniform, ShaderMaterial, Uniform, Vector2 } from "three";
import VS from './VS.glsl'
import FS from './FS.glsl'

/**采用GPGPU生成贴图绘制粒子流体效果 */
export class MaterialGpgpuFlow extends ShaderMaterial {
    constructor() {
        super({
            vertexShader: VS,
            fragmentShader: FS,
            /**双面渲染 */
            side: DoubleSide,
            depthWrite: true,
            transparent: true,
            /**叠加部分怎亮 */
            blending: AdditiveBlending,
        });
    }

    override uniforms: { [uniform: string]: IUniform<any>; } = {
        uResolution: { value: new Vector2(1, 1) },
        uMouseUV: new Uniform(new Vector2(0, 0)),
        uParticlesTexture: new Uniform(null),
    };
}