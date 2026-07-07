import { Color, FrontSide, IUniform, MeshPhongMaterial, ShaderMaterial, Texture, Vector2 } from "three";
import VS from './VS.glsl';
import FS from './FS.glsl';

/**一个扩散覆盖过度的材质动画 */
export class MaterialPipeWater extends ShaderMaterial {
    constructor() {
        super({
            wireframe: false,
            transparent: true,
            vertexShader: VS,
            fragmentShader: FS,
            depthTest: true,
            depthWrite: true,
        })
    }
    private v2Repeat = new Vector2(1, 1);

    override uniforms: { [uniform: string]: IUniform<any>; } = {
        uColor: { value: new Color(0xD5D9F3) },
        tImage: { value: null },
        uRepeat: { value: this.v2Repeat },
        uProgress: { value: null },
        uOffset: { value: null },
        uDirection: { value: 1 }
    }
    /**水流贴图 */
    public set map(img: Texture) {
        this.uniforms.tImage.value = img;
    }
    /**贴图重复次数 */
    public repeat(x: number, y: number) {
        this.v2Repeat.set(x, y);
        this.uniforms.uRepeat.value = this.v2Repeat;
    }
    /**水流在管道内的进度 */
    public set progress(num: number) {
        this.uniforms.uProgress.value = num % 1;
    }
    /**偏移map实现动画 */
    public set offset(num: number) {
        this.uniforms.uOffset.value = num % 1;
    }
}