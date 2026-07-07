import { Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SLTScene, Time } from "../..";

/**轨道控制器（OrbitControls） three.js/docs/index.html#examples/zh/controls/OrbitControls*/
export class CtrOrbit extends OrbitControls {
    constructor(private tscene: SLTScene) {
        const { tcamera: tcamera, renderer: { instance: renderer } } = tscene;
        super(tcamera.camera, renderer.domElement);
        this.zoomSpeed = 0.5
        this.autoRotate = false;
        this.maxDistance = 512;
        this.minDistance = 0.01;
        this.minPolarAngle = 0;
        tscene.on('TICK', (time: Time) => {
            if (!this.enabled) return
            /**启用轨道控制器时 */
            this.update(time.delta)
        })
    }
    /**暂停轨道控制器 */
    public pause() {
        this.enabled = false;
    }
    /**恢复轨道控制器 */
    public resume() {
        this.enabled = true;
    }
    /**看向目标 */
    lookAt(x: Vector3): void;
    lookAt(x: number, y: number, z: number): void;
    public lookAt(x: Vector3 | number, y?: number, z?: number): void {
        if (x instanceof Vector3) {
            this.target.copy(x);
        } else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
            this.target.copy(new Vector3(x, y, z));
        }
    }
}