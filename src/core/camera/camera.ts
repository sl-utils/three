import { PerspectiveCamera } from "three";
import { SLTScene, TCameraCtr } from "../..";
import { TCameraPers } from "./camera-pers";
import { TCameraOrth } from "./camera-orth";
/**相机+控制器 */
export class TCamera {
    constructor(private tscene: SLTScene, ifOrth: boolean = false) {
        this.ifOrth = ifOrth;
        this.tcameraCtr = new TCameraCtr(tscene);
    }
    /**是否采用正交相机 */
    public readonly ifOrth: boolean = false;
    /**相机 */
    public get camera(): TCameraPers | TCameraOrth {
        return this.ifOrth ? this.cameraOrth : this.cameraPers;
    }
    /**透视相机 */
    private _cameraPers: TCameraPers | undefined;
    /**正交相机 */
    private _cameraOrth: TCameraOrth | undefined;
    /**透视相机 */
    public get cameraPers(): TCameraPers {
        if (!this._cameraPers) {
            this._cameraPers = new TCameraPers(this.tscene);
        }
        return this._cameraPers;
    }
    /**正交相机 */
    public get cameraOrth(): TCameraOrth {
        if (!this._cameraOrth) {
            this._cameraOrth = new TCameraOrth(this.tscene);
        }
        return this._cameraOrth;
    }
    /**相机控制器 - 初始默认使用轨道控制器 */
    public readonly tcameraCtr!: TCameraCtr;
}

