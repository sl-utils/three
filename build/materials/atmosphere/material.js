import { BackSide, Color, ShaderMaterial } from "three";
import VS from './VS.glsl';
import FS from './FS.glsl';
export class MaterialAtmosphere extends ShaderMaterial {
    constructor() {
        super({
            vertexShader: VS,
            fragmentShader: FS,
            side: BackSide,
            depthWrite: true,
            transparent: true,
        });
        this.uniforms = {
            uSunDirection: { value: null },
            uColorAtmosphere1: { value: new Color('#006eff') },
            uColorAtmosphere2: { value: new Color('red') },
        };
    }
}
//# sourceMappingURL=material.js.map