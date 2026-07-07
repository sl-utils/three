import { AdditiveBlending, DoubleSide, ShaderMaterial, Uniform, Vector2 } from "three";
import VS from './VS.glsl';
import FS from './FS.glsl';
export class MaterialGpgpuFlow extends ShaderMaterial {
    constructor() {
        super({
            vertexShader: VS,
            fragmentShader: FS,
            side: DoubleSide,
            depthWrite: true,
            transparent: true,
            blending: AdditiveBlending,
        });
        this.uniforms = {
            uResolution: { value: new Vector2(1, 1) },
            uMouseUV: new Uniform(new Vector2(0, 0)),
            uParticlesTexture: new Uniform(null),
        };
    }
}
//# sourceMappingURL=material.js.map