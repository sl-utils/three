import { OrthographicCamera } from "three";
export class TCameraOrth extends OrthographicCamera {
    constructor(tScene) {
        const { tele: { width, height }, scene } = tScene, aspect = width / height, frustumSize = 0.39;
        const near = 0.1, far = 5;
        super(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, near, far);
        this.tScene = tScene;
        scene.add(this);
        this.camera = this;
        this.position.set(0, -0.03, 1);
        this.lookAt(0, -0.03, 0);
    }
}
//# sourceMappingURL=camera-orth.js.map