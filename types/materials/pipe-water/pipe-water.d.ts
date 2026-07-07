import { IUniform, ShaderMaterial, Texture } from "three";
/**一个扩散覆盖过度的材质动画 */
export declare class MaterialPipeWater extends ShaderMaterial {
    constructor();
    private v2Repeat;
    uniforms: {
        [uniform: string]: IUniform<any>;
    };
    /**水流贴图 */
    set map(img: Texture);
    /**贴图重复次数 */
    repeat(x: number, y: number): void;
    /**水流在管道内的进度 */
    set progress(num: number);
    /**偏移map实现动画 */
    set offset(num: number);
}
