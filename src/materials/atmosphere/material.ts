import { AdditiveBlending, BackSide, Color, DoubleSide, FrontSide, IUniform, ShaderMaterial, Uniform, Vector2 } from "three";
import VS from './VS.glsl'
import FS from './FS.glsl'

/**地球的大气层效果 */
export class MaterialAtmosphere extends ShaderMaterial {
    constructor() {
        super({
            vertexShader: VS,
            fragmentShader: FS,
            /**双面渲染 */
            side: BackSide,
            depthWrite: true,
            transparent: true,
            /**叠加部分怎亮 */
            // blending: AdditiveBlending,
        });
    }

    override uniforms: { [uniform: string]: IUniform<any>; } = {
        uSunDirection: { value: null },
        //辉光颜色
        uColorAtmosphere1: { value:  new Color('#006eff') },
        uColorAtmosphere2: { value:  new Color('red') },
    };
}