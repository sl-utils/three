import { Vector3 } from "three";
import { CtrFirstPerson } from "./ctr-first-person";
import { CtrOrbit } from "./ctr-orbit";
export class TCameraCtr {
    constructor(tscene) {
        this.tscene = tscene;
    }
    get ctrFirst() {
        if (!this._ctrFirst) {
            this._ctrFirst = new CtrFirstPerson(this.tscene);
        }
        return this._ctrFirst;
    }
    get ctrOrbit() {
        if (!this._ctrOrbit) {
            this._ctrOrbit = new CtrOrbit(this.tscene);
        }
        return this._ctrOrbit;
    }
    onStaged() {
        const { ctrFirst, ctrOrbit } = this;
        this.ctr = ctrOrbit.enabled ? ctrOrbit : ctrFirst.enabled ? ctrFirst : undefined;
    }
    onRestore() {
        const { ctrFirst, ctrOrbit, ctr } = this;
        if (!ctr)
            return;
        ctrOrbit.enabled = false;
        ctrFirst.enabled = false;
        ctr.enabled = true;
    }
    onToggleCamera(ctr) {
        const { ctrFirst, ctrOrbit, tscene } = this;
        ctr = ctr || (ctrOrbit.enabled ? ctrFirst : ctrOrbit);
        const target = new Vector3(0, 0, -10);
        target.applyMatrix4(tscene.camera.matrixWorld);
        ctrOrbit.enabled = false;
        ctrFirst.enabled = false;
        ctr.enabled = true;
        ctr.lookAt(target);
    }
}
//# sourceMappingURL=index.js.map