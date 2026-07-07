import { AdditiveBlending, BackSide, Color, DoubleSide, FrontSide, IUniform, ShaderMaterial } from "three";
import VS from './VS.glsl'
import FS from './FS.glsl'

/**模型系统故障感觉 */
export class HolographicMaterial extends ShaderMaterial {
    constructor() {
        super({
            vertexShader: VS,
            fragmentShader: FS,
            /**双面渲染 */
            side: DoubleSide,
            depthWrite: false,
            transparent: true,
            /**叠加部分怎亮 */
            blending: AdditiveBlending,
        });
    }

    override uniforms: { [uniform: string]: IUniform<any>; } = {
        uTime: { value: 0 },
        uColor: { value: new Color('70c1ff') },
    };
}