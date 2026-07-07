import { Color, FrontSide, ShaderMaterial } from "three";
import VS from './VS.glsl';
import FS from './FS.glsl';
export class MaterialEarth extends ShaderMaterial {
    constructor() {
        super({
            vertexShader: VS,
            fragmentShader: FS,
            side: FrontSide,
            depthWrite: true,
            transparent: true,
        });
        this.uniforms = {
            uSunDirection: { value: null },
            uDaymap: { value: null },
            uNightmap: { value: null },
            uSpecularClouds: { value: null },
            uColorAtmosphere1: { value: new Color('#006eff') },
            uColorAtmosphere2: { value: new Color('red') },
        };
    }
}
//# sourceMappingURL=material.js.map