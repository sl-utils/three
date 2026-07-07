import { Color, DoubleSide, MeshStandardMaterial } from "three";
import { u3_glslAddEnd, u3_glslAddMain, u3_glslAddStart } from "../../utils";
export class MaterialTanks extends MeshStandardMaterial {
    constructor() {
        super({
            transparent: true,
            depthWrite: true,
            depthTest: true,
            side: DoubleSide,
            opacity: 0.5
        });
        this.uniforms = {
            uLevel: { value: 0.5 },
            tImage: { value: null },
            uColor: { value: new Color(0xD5D9F3) },
            uTime: { value: 0 },
        };
    }
    onBeforeCompile(parameters, renderer) {
        this.uniforms = Object.assign(parameters.uniforms, this.uniforms);
        u3_glslAddStart(parameters, 'vertexShader', `varying vec2 vUv;`);
        u3_glslAddMain(parameters, 'vertexShader', `vUv = uv;`);
        u3_glslAddStart(parameters, 'fragmentShader', `varying vec2 vUv;
        uniform sampler2D tImage;
        uniform float uLevel;
        uniform vec3 uColor;
        uniform float uTime;
        `);
        u3_glslAddEnd(parameters, 'fragmentShader', `
        float h = sin( vUv.x * 50.0  ) * fract(rand(vUv * uTime /3.57258))*0.008;
        if(vUv.y > (1.0 - uLevel+h)){
            float x =fract( uTime / 1000.0  ) , y = fract( rand(vUv) );
            vec4 img= texture2D(tImage,vec2(vUv.x , fract(vUv.y + x ) ));
            gl_FragColor = vec4( img.xyz, 0.8);
        }else{
            gl_FragColor= vec4(uColor,0.6);
        }`);
    }
}
//# sourceMappingURL=tanks.js.map