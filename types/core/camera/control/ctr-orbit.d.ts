import { Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SLTScene } from "../..";
/**轨道控制器（OrbitControls） three.js/docs/index.html#examples/zh/controls/OrbitControls*/
export declare class CtrOrbit extends OrbitControls {
    private tscene;
    constructor(tscene: SLTScene);
    /**暂停轨道控制器 */
    pause(): void;
    /**恢复轨道控制器 */
    resume(): void;
    /**看向目标 */
    lookAt(x: Vector3): void;
    lookAt(x: number, y: number, z: number): void;
}
