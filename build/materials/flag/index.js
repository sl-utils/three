import { DoubleSide, MeshStandardMaterial, Uniform } from "three";
import { u3_glslAddEnd, u3_glslAddStart } from "../../utils";
export class MaterialFlag extends MeshStandardMaterial {
    constructor(material) {
        super({
            transparent: true,
            depthWrite: true,
            depthTest: true,
            side: DoubleSide,
            map: material.map,
            opacity: 1.0,
        });
        this.uniforms = {
            uTime: new Uniform(0),
            uLevel: new Uniform(Math.sqrt(Math.random() * 500 % 1)),
            umap: new Uniform(null)
        };
        this.uniforms.umap.value = material.map;
    }
    onBeforeCompile(parameters, renderer) {
        this.uniforms = Object.assign(parameters.uniforms, this.uniforms);
        u3_glslAddStart(parameters, 'vertexShader', `uniform float uTime;
        uniform float uLevel;`);
        u3_glslAddEnd(parameters, 'vertexShader', `
        float uvx = uv.x,uvy = uv.y,t = 1.0 + fract(uTime) ;
        float vx = gl_Position.x + log2( uvx + 1.0 ) * sin(uvx * PI * 2.0 + uTime * (uLevel+1.0)) * 0.3;
        float vy = gl_Position.y - pow(log2( uvx * uLevel + 1.0 ) , 2.0) * pow(cos(uTime * 0.1 * PI * 2.0), 2.0) * 3.0;
        float vz = gl_Position.z;
        vec4 u_position = vec4( vx, vy, vz, gl_Position.w) ;
        gl_Position = u_position;
        `);
    }
}
//# sourceMappingURL=index.js.map