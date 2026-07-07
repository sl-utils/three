import { Color, DoubleSide, MeshStandardMaterial, Uniform, Vector2 } from "three";
import { u3_glslAddEnd, u3_glslAddStart } from "../../utils";
export class MaterialPipeWater2 extends MeshStandardMaterial {
    constructor() {
        super({
            depthTest: true,
            depthWrite: true,
            transparent: false,
            side: DoubleSide,
            color: 0xFFFFFF,
        });
        this.uniforms = {
            uColor: new Uniform(new Color(0x00FF00)),
            tImage: { value: null },
            uRepeat: { value: new Vector2(1, 1) },
            uProgress: { value: 0.3 },
            uOffset: { value: null },
            uDirection: { value: 1 }
        };
    }
    set image(img) {
        this.uniforms.tImage.value = img;
    }
    repeat(x, y) {
        this.uniforms.uRepeat.value.set(x, y);
    }
    set progress(num) {
        this.uniforms.uProgress.value = num % 1;
    }
    set offset(num) {
        this.uniforms.uOffset.value = num % 1;
    }
    onBeforeCompile(parameters, renderer) {
        this.uniforms = Object.assign(parameters.uniforms, this.uniforms);
        u3_glslAddStart(parameters, 'vertexShader', `varying vec2 vUv;`);
        u3_glslAddEnd(parameters, 'vertexShader', `vUv=uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position - 0.02 * normal, 1.0);`);
        u3_glslAddStart(parameters, 'fragmentShader', `
varying vec2 vUv;
uniform vec2 uRepeat;
uniform vec3 uColor;
uniform float uProgress;
/** 0 - 1 保证和progress动画方向一致*/
uniform float uOffset;
/**水流的方向*/
uniform float uDirection;
uniform sampler2D tImage;`);
        u3_glslAddEnd(parameters, 'fragmentShader', ` 
vec4 color=vec4 (mix(uColor,vec3(1.0,1.0,1.0),0.8) ,1.0);
if(uDirection < .0 && vUv.x < (1.0 - uProgress)){
    discard;
} else if(uDirection > .0 && vUv.x > uProgress ) {
    discard;
}else{
    /** 使用 -uOffset 保证和 progress 动画方向一致*/
    vec2 p = fract(vUv * uRepeat - vec2(uDirection * uOffset,0.0));
    vec4 tcolor = texture2D(tImage, p);
    //确定颜色
    gl_FragColor = mix(color,tcolor,1.0);
}`);
    }
}
//# sourceMappingURL=pipe-water2.js.map