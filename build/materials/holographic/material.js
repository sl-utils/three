import { AdditiveBlending, Color, DoubleSide, ShaderMaterial } from "three";
import VS from './VS.glsl';
import FS from './FS.glsl';
export class HolographicMaterial extends ShaderMaterial {
    constructor() {
        super({
            vertexShader: VS,
            fragmentShader: FS,
            side: DoubleSide,
            depthWrite: false,
            transparent: true,
            blending: AdditiveBlending,
        });
        this.uniforms = {
            uTime: { value: 0 },
            uColor: { value: new Color('70c1ff') },
        };
    }
}
//# sourceMappingURL=material.js.map