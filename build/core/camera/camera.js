import { TCameraCtr } from "../..";
import { TCameraPers } from "./camera-pers";
import { TCameraOrth } from "./camera-orth";
export class TCamera {
    constructor(tscene, ifOrth = false) {
        this.tscene = tscene;
        this.ifOrth = false;
        this.ifOrth = ifOrth;
        this.tcameraCtr = new TCameraCtr(tscene);
    }
    get camera() {
        return this.ifOrth ? this.cameraOrth : this.cameraPers;
    }
    get cameraPers() {
        if (!this._cameraPers) {
            this._cameraPers = new TCameraPers(this.tscene);
        }
        return this._cameraPers;
    }
    get cameraOrth() {
        if (!this._cameraOrth) {
            this._cameraOrth = new TCameraOrth(this.tscene);
        }
        return this._cameraOrth;
    }
}
//# sourceMappingURL=camera.js.map