import { Color, ShaderMaterial, Vector2 } from "three";
import VS from './VS.glsl';
import FS from './FS.glsl';
export class MaterialPipeWater extends ShaderMaterial {
    constructor() {
        super({
            wireframe: false,
            transparent: true,
            vertexShader: VS,
            fragmentShader: FS,
            depthTest: true,
            depthWrite: true,
        });
        this.v2Repeat = new Vector2(1, 1);
        this.uniforms = {
            uColor: { value: new Color(0xD5D9F3) },
            tImage: { value: null },
            uRepeat: { value: this.v2Repeat },
            uProgress: { value: null },
            uOffset: { value: null },
            uDirection: { value: 1 }
        };
    }
    set map(img) {
        this.uniforms.tImage.value = img;
    }
    repeat(x, y) {
        this.v2Repeat.set(x, y);
        this.uniforms.uRepeat.value = this.v2Repeat;
    }
    set progress(num) {
        this.uniforms.uProgress.value = num % 1;
    }
    set offset(num) {
        this.uniforms.uOffset.value = num % 1;
    }
}
//# sourceMappingURL=pipe-water.js.map