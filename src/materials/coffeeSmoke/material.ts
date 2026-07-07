import { DoubleSide, IUniform, ShaderMaterial } from "three";
import VS from './VS.glsl'
import FS from './FS.glsl'

/**咖啡热气效果（二维平面） */
export class CoffeeSmokeMaterial extends ShaderMaterial {
    constructor() {
        super({
            vertexShader: VS,
            fragmentShader: FS,
            side: DoubleSide,
            depthWrite: false,
            transparent: true,
        });
    }

    override uniforms: { [uniform: string]: IUniform<any>; } = {
        uTime: { value: 0 },
        uPerlinTexture: { value: null },
    };
}