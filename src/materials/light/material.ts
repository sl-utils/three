import { AdditiveBlending, BackSide, Color, DoubleSide, FrontSide, IUniform, ShaderMaterial } from "three";
import VS from './VS.glsl'
import FS from './FS.glsl'

/**自定义光源 */
export class MaterialLight extends ShaderMaterial {
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
        uColor: { value: new Color('FFFFFF') },
    };
}