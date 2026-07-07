import { CtrFirstPerson } from "./ctr-first-person";
import { CtrOrbit } from "./ctr-orbit";
import { SLTScene } from "../..";
/**相机的控制器部分-初始默认使用轨道控制器 */
export declare class TCameraCtr {
    private tscene;
    constructor(tscene: SLTScene);
    /**当前控制器 */
    private ctr;
    /**透视相机 */
    private _ctrOrbit;
    /**正交相机 */
    private _ctrFirst;
    /**第一人视角 */
    get ctrFirst(): CtrFirstPerson;
    /**轨道控制器 */
    get ctrOrbit(): CtrOrbit;
    /**暂存控制状态 */
    onStaged(): void;
    /**恢复之前的暂存控制器 */
    onRestore(): void;
    /**切换相机
     * @param ctr 切换到指定的相机控制器
    */
    onToggleCamera(ctr?: CtrOrbit | CtrFirstPerson): void;
}
