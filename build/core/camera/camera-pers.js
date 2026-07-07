import { PerspectiveCamera } from "three";
export class TCameraPers extends PerspectiveCamera {
    constructor(tScene) {
        const fov = 50, near = 0.1, far = 5000;
        const { tele: { width, height }, scene } = tScene;
        super(fov, width / height, near, far);
        this.tScene = tScene;
        scene.add(this);
        this.camera = this;
        this.position.set(10, 10, 10);
        this.lookAt(0, 0, 0);
    }
}
//# sourceMappingURL=camera-pers.js.map