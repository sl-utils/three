import { PerspectiveCamera } from "three";
import { SLTScene } from "..";
/**透视相机控制 */
export class TCameraPers extends PerspectiveCamera {
    constructor(private tScene: SLTScene) {
        const fov = 50, near = 0.1, far = 5000;
        const { tele: { width, height },scene } = tScene;
        super(fov, width / height, near, far);
        scene.add(this);
        this.camera = this; 
        this.position.set(10, 10, 10);
        this.lookAt(0, 0, 0);
    }
    /**相机实例 */
    public camera!: TCameraPers;
}
