import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
export class CtrFirstPerson extends FirstPersonControls {
    constructor(tscene) {
        const { tcamera, renderer: { instance: renderer } } = tscene;
        super(tcamera.camera, renderer.domElement);
        this.tscene = tscene;
        this.activeLook = false;
        this.phone = false;
        this.enabled = false;
        this.lookSpeed = 0;
        this.movementSpeed = 0.1;
        this.autoForward = false;
        this.openListener(tscene);
    }
    move(dir, flag) {
        if (dir === 'Close') {
            ['Forward', 'Backward', 'Left', 'Right', 'Up', 'Down'].forEach((e) => (this[`move${e}`] = false));
            this.movementSpeed = 0;
        }
        else {
            this[`move${dir}`] = flag;
        }
    }
    pause() {
        this.enabled = false;
    }
    resume() {
        this.enabled = true;
    }
    openListener(tscene) {
        const { keyStates } = tscene;
        tscene.on('TICK.first', () => {
            if (!this.enabled)
                return;
            if (this.phone ||
                keyStates.KeyA ||
                keyStates.KeyS ||
                keyStates.KeyD ||
                keyStates.KeyW ||
                keyStates.KeyR ||
                keyStates.KeyF ||
                keyStates.ArrowUp ||
                keyStates.ArrowDown ||
                keyStates.ArrowLeft ||
                keyStates.ArrowRight) {
                this.movementSpeed += 0.01;
            }
            else {
                this.movementSpeed = 0;
            }
            if (keyStates.Space && keyStates.mousedown) {
                this.activeLook = true;
                this.lookSpeed = 0.001;
            }
            else {
                this.lookSpeed = 0;
            }
            this.update(1);
        });
    }
    kill() {
        this.tscene.off('.first');
        this.dispose();
    }
}
//# sourceMappingURL=ctr-first-person.js.map