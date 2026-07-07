import { AdditiveBlending, BackSide, Color, DoubleSide, FrontSide, IUniform, ShaderMaterial, Uniform, Vector2 } from "three";
import VS from './VS.glsl'
import FS from './FS.glsl'

/**点状云阴影蒙层 */
export class MaterialHalftone extends ShaderMaterial {
    constructor() {
        super({
            vertexShader: VS,
            fragmentShader: FS,
            /**双面渲染 */
            side: FrontSide,
            depthWrite: true,
            transparent: true,
            /**叠加部分怎亮 */
            // blending: AdditiveBlending,
        });
    }

    override uniforms: { [uniform: string]: IUniform<any>; } = {
        uColor: { value: new Color('#FF794D') },
        /**屏幕分辨率 */
        uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
        uRepetitions: new Uniform(100),
        uLightRepets:new Uniform(100),
        uShadowColor:{value :new Color('red')},
        uLightColor:{value :new Color('blue')},
    };
}