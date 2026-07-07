import { DoubleSide, ShaderMaterial, Vector3 } from "three"
import FS from './fs.glsl'
import VS from './vs.glsl'
/**空气阀附近空气状态材质 */
export class MaterialValve extends ShaderMaterial {
    constructor() {
        super({
            transparent: true,
            side: DoubleSide,
            depthTest: true,
            depthWrite: true,
            vertexShader: VS,
            fragmentShader: FS,
            defines: {
                USE_UV: true,
            }
        });
    }
    override uniforms = {
        ustate1: { value: null },
        ustate2: { value: null },
        vstate: { value: 0.0 },
        utime: { value: 0.0 }
    }
}