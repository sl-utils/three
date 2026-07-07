import { Color, FrontSide, Material, Mesh, MeshBasicMaterial, MeshPhongMaterial, MeshStandardMaterial, RepeatWrapping, SRGBColorSpace, Texture } from "three";
import gsap from "gsap";
import { TEvent,  SLTScene } from "../../..";
import { MaterialPipeWater } from "../../../materials/pipe-water/pipe-water";
import { MaterialPipeWater2 } from "../../../materials/pipe-water/pipe-water2";
import { u3_destoryAll } from "../../../utils";
/**管道
 * 所有管道材质都一模一样，类型为：MeshStandardMaterial 
 */
export class Pipe {
    constructor(mesh: Mesh, scene: SLTScene<BnsvMainEvents>) {
        let { repeat = 10 } = SCENE_PIPE_CONFIG[mesh.name] || {};
        this.material.map = SLTScene.resources.Texturewater;
        this.length = repeat;
        this.material.repeat(repeat, 1);
        this.material.progress = 0;
        this.mesh = mesh;
        if (mesh.material instanceof Material && !Pipe.basic) {
            Pipe.basic = mesh.material;
            mesh.material.transparent = true;
            mesh.material.opacity = 0.3;
            mesh.material.depthWrite = true;
            mesh.material.depthTest = true;
        }
        const index = parseFloat(mesh.name.replace(/[^0-9]/g, ''));
        if (index <= 7) return;
        this.water = this.mesh.clone();
        this.water.renderOrder = 1;
        this.mesh.renderOrder = 2;
        this.mesh.parent.add(this.water)
        this.water.material = this.material;
        this.event = scene;
        // if (parseFloat(mesh.name.replace(/[^0-9]/g, '')) >= 0) {
        //     Helper.gui.on(this.material.uniforms.uRepeat, `${mesh.name}`, [
        //         { param: 'value.x', name: 'repeatX', ifNums: [1, 500, 0.1] },
        //         { param: 'value.y', name: 'repeatY', ifNums: [1, 500, 0.1] },
        //     ])
        //     Helper.gui.on(this.material, `${mesh.name}`, [
        //         { param: 'color', name: '颜色', ifColor: true },
        //     ])
        // }
    }
    static basic: Material;
    public event: TEvent;
    /**开始的进程 */
    private gsap0: gsap.core.Tween;
    /**水在管内流动动画 */
    private gsap_active: gsap.core.Tween;
    /**当前水流状态  0表示管内无水 1表示充水完成  2表示充水中  3表示正在退水*/
    private state: 0 | 1 | 2 | 3 = 0;
    /**管道长度 */
    private length: number = 1;
    /**水流材质 */
    public readonly material = new MaterialPipeWater2();
    /**管道 */
    public mesh: Mesh;
    /**水流管道mesh */
    public water: Mesh;
    public getState() {
        return this.state;
    }

    /** */
    public set direction(num: -1 | 1) {
        this.material.uniforms.uDirection.value = num;
    }
    /**控制管道和水流显影 */
    public onVisible(flag: boolean) {
        if (this.mesh) this.mesh.visible = flag;
        if (this.water) this.water.visible = flag;
    }
    /**执行进程 
     * @param program程序代码  0表示排水 1表示充水 2瞬间清空水管 3瞬间完成充水
     */
    public execute(program: 0 | 1 | 2 | 3): any {
        const { state, gsap0, gsap_active, material: { uniforms: { uProgress, uProgress: { value } } } } = this;
        if (program == 0) {
            this.progress(value, 0)
        } else if (program == 1) {
            this.progress(value, 1)
        } else if (program == 2) {
            this.state = 0;
            gsap0?.pause();
            gsap_active?.pause();
            uProgress.value = 0;
            this.nextFrame();
        } else if (program == 3) {
            uProgress.value = 1;
            this.state = 1;
            this.active();
            this.nextFrame();
        }
    }
    /**进程 
     * @param start 0 开始点
     * @param end 1 结束点
    */
    private progress(start: number = 0, end: number = 1) {
        const { material: { uniforms: { uProgress } }, length } = this;
        uProgress.value = start;
        this.gsap0?.kill();
        if (start === end) {
            this.nextFrame();
        } else
            this.gsap0 = gsap.to(uProgress, {
                value: end,
                duration: length / 10,
                ease: "none",
                onComplete: () => {
                    if (end == 1) {
                        this.state = 1;
                        this.active();
                    } else if (end == 0) {
                        this.state = 0;
                    }
                    this.nextFrame();
                }
            })
    }
    /**进行流动动画进程 */
    private active() {
        const { material: { uniforms: { uOffset } } } = this;
        if (!this.gsap_active) {
            this.gsap_active = gsap.to(uOffset, {
                value: 1,
                duration: 1,
                ease: "none",
                repeat: -1,
                paused: true
            })
        }
        this.gsap_active.resume();
    }
    /**下一帧触发事件 
     * 
    */
    private nextFrame() {
        const { state, mesh: { name } } = this;
        requestAnimationFrame(() => this.event.trigger(`${name}exe`, [state]))
    }
    /**销毁管道 */
    public kill() {
        Pipe.basic = undefined;
        u3_destoryAll(this.mesh);
        u3_destoryAll(this.water);
        this.water = undefined;
        this.mesh = undefined;
        this.gsap0?.kill();
        this.gsap_active?.kill();
    }
}

const value = 0.5;
/**管道贴图重复次数配置 */
const SCENE_PIPE_CONFIG: { [K: string]: { repeat: number } } = {
    '管道01': { repeat: value * 1 },
    '管道02': { repeat: value * 1 },
    '管道03': { repeat: value * 1 },
    '管道04': { repeat: value * 1 },
    '管道05': { repeat: value * 1 },
    '管道06': { repeat: value * 1 },
    '管道07': { repeat: value * 1 },
    '管道08': { repeat: value * 28 },
    '管道09': { repeat: value * 10 },
    '管道10': { repeat: value * 22 },
    '管道11': { repeat: value * 10 },
    '管道12': { repeat: value * 5 },
    '管道13': { repeat: value * 18 },
    '管道14': { repeat: value * 16 },
    '管道15': { repeat: value * 16 },
    '管道16': { repeat: value * 30 },
    '管道17': { repeat: value * 2 },
    '管道18': { repeat: value * 50 },
    '管道19': { repeat: value * 2.5 },
    '管道20': { repeat: value * 2 },
    '管道21': { repeat: value * 16 },
    '管道22': { repeat: value * 10 },
    '管道23': { repeat: value * 3 },
    '管道24': { repeat: value * 5 },
    '管道25': { repeat: value * 12 },
    '管道26': { repeat: value * 3 },
    '管道27': { repeat: value * 3 },
    '管道28': { repeat: value * 3 },
    '管道29': { repeat: value * 10 },
    '管道30': { repeat: value * 5 },
    '管道31': { repeat: value * 7 },
    '管道32': { repeat: value * 25 },
    '管道33': { repeat: value * 6 },
    '管道34': { repeat: value * 3 },
    '管道35': { repeat: value * 12 },
    '管道36': { repeat: value * 9 },
    '管道37': { repeat: value * 3 },
    '管道38': { repeat: value * 10 },
    '管道39': { repeat: value * 10 },
    '管道40': { repeat: value * 13 },
    '管道41': { repeat: value * 3 },
    '管道42': { repeat: value * 3 },
    '管道43': { repeat: value * 5 },
    '管道44': { repeat: value * 5 },
    '管道45': { repeat: value * 3 },
    '管道46': { repeat: value * 3 },
    '管道47': { repeat: value * 3 },
    '管道48': { repeat: value * 2 },
    '管道49': { repeat: value * 15 },
    '管道50': { repeat: value * 10 },
    '管道51': { repeat: value * 1 },
    '管道52': { repeat: value * 2 },
    '管道53': { repeat: value * 2 },
    '管道54': { repeat: value * 1 },
    '管道55': { repeat: value * 10 },
    '管道56': { repeat: value * 20 },
    '管道57': { repeat: value * 8 },
    '管道58': { repeat: value * 1 },
    '管道59': { repeat: value * 2 },
    '管道60': { repeat: value * 1 },
    '管道61': { repeat: value * 1 },
    '管道62': { repeat: value * 7 },
    '管道63': { repeat: value * 1 },
    '管道64': { repeat: value * 3 },
    '管道65': { repeat: value * 1 },
    '管道66': { repeat: value * 1 },
    '管道67': { repeat: value * 20 },
    '管道68': { repeat: value * 80 },
    '管道69': { repeat: value * 1 },
    '管道70': { repeat: value * 105 },
    '管道71': { repeat: value * 1 },
    '管道72': { repeat: value * 80 },
    '管道73': { repeat: value * 150 },
    '管道74': { repeat: value * 1 },
    '管道75': { repeat: value * 80 },
    '管道76': { repeat: value * 1 },
    '管道77': { repeat: value * 80 },
    '管道78': { repeat: value * 10 },
    '管道79': { repeat: value * 20 },
    '管道80': { repeat: value * 5 },
}