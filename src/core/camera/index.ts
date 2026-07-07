import { Vector3 } from "three";

export * from "./camera"
export * from "./control"
export * from "./camera-orth"
export * from "./camera-pers"

    /**相机视角切换配置 */
    interface CameraView {
        /**相机位置 */
        position: Vector3,
        /**相机目标 */
        target: Vector3,
        /**如果不启动轨道控制器一定要设置为false */
        ifOrbit?: boolean,
    }