import { Color, FrontSide, ShaderMaterial } from "three";
import VS from './VS.glsl';
import FS from './FS.glsl';
export class MaterialLight extends ShaderMaterial {
    constructor() {
        super({
            vertexShader: VS,
            fragmentShader: FS,
            side: FrontSide,
            depthWrite: true,
            transparent: true,
        });
        this.uniforms = {
            uColor: { value: new Color('FFFFFF') },
        };
    }
}
//# sourceMappingURL=material.js.map