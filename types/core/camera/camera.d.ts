import { SLTScene, TCameraCtr } from "../..";
import { TCameraPers } from "./camera-pers";
import { TCameraOrth } from "./camera-orth";
/**相机+控制器 */
export declare class TCamera {
    private tscene;
    constructor(tscene: SLTScene, ifOrth?: boolean);
    /**是否采用正交相机 */
    readonly ifOrth: boolean;
    /**相机 */
    get camera(): TCameraPers | TCameraOrth;
    /**透视相机 */
    private _cameraPers;
    /**正交相机 */
    private _cameraOrth;
    /**透视相机 */
    get cameraPers(): TCameraPers;
    /**正交相机 */
    get cameraOrth(): TCameraOrth;
    /**相机控制器 - 初始默认使用轨道控制器 */
    readonly tcameraCtr: TCameraCtr;
}
