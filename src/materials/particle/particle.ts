import { DoubleSide, ShaderMaterial, Vector3 } from 'three';
import FS from './fs.glsl';
import VS from './vs.glsl';
/**空气阀附近空气状态材质 */
export class MaterialParticle extends ShaderMaterial {
	constructor(start: Vector3) {
		super({
			wireframe: false,
			transparent: true,
			side: DoubleSide,
			depthTest: true,
			depthWrite: true,
			vertexShader: VS,
			fragmentShader: FS,
		});
		this.uniforms.ustart.value = start;
	}
	override uniforms = {
		usmoke: { value: null }, //出气贴图
		usmokeIn: { value: null }, //进气贴图
		utime: { value: 0 },
		ustart: { value: null },
		ustate: { value: 0 },
	};
}
