import { DoubleSide, ShaderMaterial } from 'three';
import FS from './fs.glsl';
import VS from './vs.glsl';
export class MaterialParticle extends ShaderMaterial {
    constructor(start) {
        super({
            wireframe: false,
            transparent: true,
            side: DoubleSide,
            depthTest: true,
            depthWrite: true,
            vertexShader: VS,
            fragmentShader: FS,
        });
        this.uniforms = {
            usmoke: { value: null },
            usmokeIn: { value: null },
            utime: { value: 0 },
            ustart: { value: null },
            ustate: { value: 0 },
        };
        this.uniforms.ustart.value = start;
    }
}
//# sourceMappingURL=particle.js.map