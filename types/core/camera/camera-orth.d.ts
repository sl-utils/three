import { OrthographicCamera } from "three";
import { SLTScene } from "../scene";
/**正交相机控制 */
export declare class TCameraOrth extends OrthographicCamera {
    private tScene;
    constructor(tScene: SLTScene);
    /**相机实例 */
    camera: TCameraOrth;
}
