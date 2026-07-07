import { Color, MeshBasicMaterial, Uniform } from "three";
import { u3_glslAddEnd, u3_glslAddMain, u3_glslAddStart } from "../../utils";
export class MaterialLogo extends MeshBasicMaterial {
    constructor() {
        super({
            wireframe: false,
            transparent: false,
            depthTest: true,
            depthWrite: true,
        });
        this.uniforms = {
            uProgress: new Uniform(0.3),
            uColor: new Uniform(new Color(0x89a1ce)),
            uColorWater: new Uniform(new Color(0x88b9e5)),
            uTime: new Uniform(0)
        };
    }
    onBeforeCompile(parameters, renderer) {
        this.uniforms = Object.assign(parameters.uniforms, this.uniforms);
        u3_glslAddStart(parameters, 'vertexShader', `varying vec2 vUv;`);
        u3_glslAddMain(parameters, 'vertexShader', ` vUv = uv;`);
        u3_glslAddStart(parameters, 'fragmentShader', `varying vec2 vUv;
        uniform vec3 uColor;
        uniform vec3 uColorWater;
        uniform float uProgress;
        uniform float uTime;`);
        u3_glslAddEnd(parameters, 'fragmentShader', `float y = vUv.y,x = vUv.x; 
        float progress = 1.0 - uProgress + sin(x*3.1*8.0+uTime)*0.05;
        if( y >= progress){
            gl_FragColor = vec4(uColorWater,1.0);
        }else{
            gl_FragColor = vec4(uColor,1.0);
        }`);
    }
}
//# sourceMappingURL=logo.js.map