import { IUniform, Matrix4, ShaderMaterial } from "three";
import VS from './vs.glsl'
import FS from './fs.glsl'
/**水位线的材质 */
export class MaterialLevel extends ShaderMaterial {
    constructor() {
        super({
            transparent: false,
            vertexShader: VS,
            fragmentShader: FS,
        })
    }

    override uniforms: { [uniform: string]: IUniform<any>; } = {
        uProgress: { value: 0 },
    };
}