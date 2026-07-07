import { OrthographicCamera } from "three";
import { SLTScene } from "../scene";
/**正交相机控制 */
export class TCameraOrth extends OrthographicCamera {
    constructor(private tScene: SLTScene) {
        const { tele: { width, height }, scene } = tScene, aspect = width / height, frustumSize = 0.39;
        const near = 0.1, far = 5;
        super(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, near, far);
        scene.add(this);
        this.camera = this;
        this.position.set(0, -0.03, 1);
        this.lookAt(0, -0.03, 0);
    }
    /**相机实例 */
    public camera!: TCameraOrth;
}