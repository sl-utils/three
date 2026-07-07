import { Camera, Vector3 } from "three";
import { CtrFirstPerson } from "./ctr-first-person";
import { CtrOrbit } from "./ctr-orbit";
import { SLTScene } from "../..";

/**相机的控制器部分-初始默认使用轨道控制器 */
export class TCameraCtr {
    constructor(private tscene: SLTScene) { }
    /**当前控制器 */
    private ctr: CtrOrbit | CtrFirstPerson;
    /**透视相机 */
    private _ctrOrbit: CtrOrbit | undefined;
    /**正交相机 */
    private _ctrFirst: CtrFirstPerson | undefined;
    /**第一人视角 */
    public get ctrFirst() {
        if (!this._ctrFirst) {
            this._ctrFirst = new CtrFirstPerson(this.tscene);
        }
        return this._ctrFirst;
    }
    /**轨道控制器 */
    public get ctrOrbit() {
        if (!this._ctrOrbit) {
            this._ctrOrbit = new CtrOrbit(this.tscene);
        }
        return this._ctrOrbit;
    }
    /**暂存控制状态 */
    public onStaged() {
        const { ctrFirst, ctrOrbit } = this;
        this.ctr = ctrOrbit.enabled ? ctrOrbit : ctrFirst.enabled ? ctrFirst : undefined;
    }
    /**恢复之前的暂存控制器 */
    public onRestore() {
        const { ctrFirst, ctrOrbit, ctr } = this
        if (!ctr) return;
        ctrOrbit.enabled = false;
        ctrFirst.enabled = false;
        ctr.enabled = true
    }
    /**切换相机 
     * @param ctr 切换到指定的相机控制器
    */
    public onToggleCamera(ctr?: CtrOrbit | CtrFirstPerson) {
        const { ctrFirst, ctrOrbit, tscene } = this;
        ctr = ctr || (ctrOrbit.enabled ? ctrFirst : ctrOrbit);
        const target = new Vector3(0, 0, -10);
        target.applyMatrix4(tscene.camera.matrixWorld)
        ctrOrbit.enabled = false;
        ctrFirst.enabled = false;
        ctr.enabled = true;
        ctr.lookAt(target);
    }
}