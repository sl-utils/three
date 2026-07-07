import { Color, FrontSide, ShaderMaterial, Uniform, Vector2 } from "three";
import VS from './VS.glsl';
import FS from './FS.glsl';
export class MaterialHalftone extends ShaderMaterial {
    constructor() {
        super({
            vertexShader: VS,
            fragmentShader: FS,
            side: FrontSide,
            depthWrite: true,
            transparent: true,
        });
        this.uniforms = {
            uColor: { value: new Color('#FF794D') },
            uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
            uRepetitions: new Uniform(100),
            uLightRepets: new Uniform(100),
            uShadowColor: { value: new Color('red') },
            uLightColor: { value: new Color('blue') },
        };
    }
}
//# sourceMappingURL=material.js.map