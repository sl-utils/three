import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { SLTScene } from '../..';
import { Vector3 } from 'three';

export class CtrFirstPerson extends FirstPersonControls {
	constructor(private tscene: SLTScene) {
		const {
			tcamera,
			renderer: { instance: renderer }
		} = tscene;
		super(tcamera.camera, renderer.domElement);
		this.enabled = false;
		this.lookSpeed = 0;
		this.movementSpeed = 0.1;
		this.autoForward = false;
		this.openListener(tscene);
	}
	/**禁止源码鼠标左键前进右键后退 */
	public activeLook: boolean = false;
	/**是否是手机模式 */
	public phone: boolean = false;
	/**相机移动方向
	 * @param dir 前后左右上下关闭所有
	 * @param flag true:开始移动 false:停止移动
	 */
	public move(dir: 'Forward' | 'Backward' | 'Left' | 'Right' | 'Up' | 'Down' | 'Close', flag: boolean) {
		if (dir === 'Close') {
			['Forward', 'Backward', 'Left', 'Right', 'Up', 'Down'].forEach((e) => (this[`move${e}`] = false));
			this.movementSpeed = 0;
		} else {
			this[`move${dir}`] = flag;
		}
	}
	/**暂停第一视角控制器 */
	public pause() {
		this.enabled = false;
	}
	/**恢复第一视角控制器 */
	public resume() {
		this.enabled = true;
	}
	private openListener(tscene: SLTScene) {
		const { keyStates } = tscene;
		tscene.on('TICK.first', () => {
			if (!this.enabled) return;
			if (
				this.phone ||
				keyStates.KeyA ||
				keyStates.KeyS ||
				keyStates.KeyD ||
				keyStates.KeyW ||
				keyStates.KeyR ||
				keyStates.KeyF ||
				keyStates.ArrowUp ||
				keyStates.ArrowDown ||
				keyStates.ArrowLeft ||
				keyStates.ArrowRight
			) {
				this.movementSpeed += 0.01;
			} else {
				this.movementSpeed = 0;
			}
			if (keyStates.Space && keyStates.mousedown) {
				this.activeLook = true;
				this.lookSpeed = 0.001;
			} else {
				this.lookSpeed = 0;
			}
			/**启用轨道控制器时 */
			this.update(1);
		});
	}
	/**销毁 */
	public kill() {
		this.tscene.off('.first');
		this.dispose();
	}
}
