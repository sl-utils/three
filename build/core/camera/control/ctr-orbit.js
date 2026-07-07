import { Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export class CtrOrbit extends OrbitControls {
    constructor(tscene) {
        const { tcamera: tcamera, renderer: { instance: renderer } } = tscene;
        super(tcamera.camera, renderer.domElement);
        this.tscene = tscene;
        this.zoomSpeed = 0.5;
        this.autoRotate = false;
        this.maxDistance = 512;
        this.minDistance = 0.01;
        this.minPolarAngle = 0;
        tscene.on('TICK', (time) => {
            if (!this.enabled)
                return;
            this.update(time.delta);
        });
    }
    pause() {
        this.enabled = false;
    }
    resume() {
        this.enabled = true;
    }
    lookAt(x, y, z) {
        if (x instanceof Vector3) {
            this.target.copy(x);
        }
        else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
            this.target.copy(new Vector3(x, y, z));
        }
    }
}
//# sourceMappingURL=ctr-orbit.js.map