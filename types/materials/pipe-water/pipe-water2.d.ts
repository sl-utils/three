import { Color, MeshStandardMaterial, Texture, Uniform, Vector2, WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";
/**一个扩散覆盖过度的材质动画 */
export declare class MaterialPipeWater2 extends MeshStandardMaterial {
    constructor();
    uniforms: {
        uColor: Uniform<Color>;
        tImage: {
            value: any;
        };
        uRepeat: {
            value: Vector2;
        };
        uProgress: {
            value: number;
        };
        uOffset: {
            value: any;
        };
        uDirection: {
            value: number;
        };
    };
    /**水流贴图 */
    set image(img: Texture);
    /**贴图重复次数 */
    repeat(x: number, y: number): void;
    /**水流在管道内的进度 */
    set progress(num: number);
    /**偏移map实现动画 */
    set offset(num: number);
    onBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void;
}
