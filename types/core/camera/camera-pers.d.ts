import { PerspectiveCamera } from "three";
import { SLTScene } from "..";
/**透视相机控制 */
export declare class TCameraPers extends PerspectiveCamera {
    private tScene;
    constructor(tScene: SLTScene);
    /**相机实例 */
    camera: TCameraPers;
}
