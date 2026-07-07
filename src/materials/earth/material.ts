import { AdditiveBlending, BackSide, Color, DoubleSide, FrontSide, IUniform, ShaderMaterial, Uniform, Vector2, Vector3 } from "three";
import VS from './VS.glsl'
import FS from './FS.glsl'

/**地球效果 + atmosphere 大气层效果 */
export class MaterialEarth extends ShaderMaterial {
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
        /**太阳的方向 */
        uSunDirection: { value: null },
        /**白天黑夜和高光贴图 */
        uDaymap: { value: null },
        uNightmap: { value: null },
        uSpecularClouds: { value: null },
        //辉光颜色
        uColorAtmosphere1: { value: new Color('#006eff') },
        uColorAtmosphere2: { value: new Color('red') },
    };
}