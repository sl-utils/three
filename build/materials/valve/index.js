import { DoubleSide, ShaderMaterial } from "three";
import FS from './fs.glsl';
import VS from './vs.glsl';
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
        this.uniforms = {
            ustate1: { value: null },
            ustate2: { value: null },
            vstate: { value: 0.0 },
            utime: { value: 0.0 }
        };
    }
}
//# sourceMappingURL=index.js.map