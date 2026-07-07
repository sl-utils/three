import { DoubleSide, ShaderMaterial } from "three";
import VS from './VS.glsl';
import FS from './FS.glsl';
export class CoffeeSmokeMaterial extends ShaderMaterial {
    constructor() {
        super({
            vertexShader: VS,
            fragmentShader: FS,
            side: DoubleSide,
            depthWrite: false,
            transparent: true,
        });
        this.uniforms = {
            uTime: { value: 0 },
            uPerlinTexture: { value: null },
        };
    }
}
//# sourceMappingURL=material.js.map