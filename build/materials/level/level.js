import { ShaderMaterial } from "three";
import VS from './vs.glsl';
import FS from './fs.glsl';
export class MaterialLevel extends ShaderMaterial {
    constructor() {
        super({
            transparent: false,
            vertexShader: VS,
            fragmentShader: FS,
        });
        this.uniforms = {
            uProgress: { value: 0 },
        };
    }
}
//# sourceMappingURL=level.js.map