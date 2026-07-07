import { Material } from "three";
import gsap from "gsap";
import { SLTScene } from "../../..";
import { MaterialPipeWater2 } from "../../../materials/pipe-water/pipe-water2";
import { u3_destoryAll } from "../../../utils";
export class Pipe {
    constructor(mesh, scene) {
        this.state = 0;
        this.length = 1;
        this.material = new MaterialPipeWater2();
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
        if (index <= 7)
            return;
        this.water = this.mesh.clone();
        this.water.renderOrder = 1;
        this.mesh.renderOrder = 2;
        this.mesh.parent.add(this.water);
        this.water.material = this.material;
        this.event = scene;
    }
    getState() {
        return this.state;
    }
    set direction(num) {
        this.material.uniforms.uDirection.value = num;
    }
    onVisible(flag) {
        if (this.mesh)
            this.mesh.visible = flag;
        if (this.water)
            this.water.visible = flag;
    }
    execute(program) {
        const { state, gsap0, gsap_active, material: { uniforms: { uProgress, uProgress: { value } } } } = this;
        if (program == 0) {
            this.progress(value, 0);
        }
        else if (program == 1) {
            this.progress(value, 1);
        }
        else if (program == 2) {
            this.state = 0;
            gsap0?.pause();
            gsap_active?.pause();
            uProgress.value = 0;
            this.nextFrame();
        }
        else if (program == 3) {
            uProgress.value = 1;
            this.state = 1;
            this.active();
            this.nextFrame();
        }
    }
    progress(start = 0, end = 1) {
        const { material: { uniforms: { uProgress } }, length } = this;
        uProgress.value = start;
        this.gsap0?.kill();
        if (start === end) {
            this.nextFrame();
        }
        else
            this.gsap0 = gsap.to(uProgress, {
                value: end,
                duration: length / 10,
                ease: "none",
                onComplete: () => {
                    if (end == 1) {
                        this.state = 1;
                        this.active();
                    }
                    else if (end == 0) {
                        this.state = 0;
                    }
                    this.nextFrame();
                }
            });
    }
    active() {
        const { material: { uniforms: { uOffset } } } = this;
        if (!this.gsap_active) {
            this.gsap_active = gsap.to(uOffset, {
                value: 1,
                duration: 1,
                ease: "none",
                repeat: -1,
                paused: true
            });
        }
        this.gsap_active.resume();
    }
    nextFrame() {
        const { state, mesh: { name } } = this;
        requestAnimationFrame(() => this.event.trigger(`${name}exe`, [state]));
    }
    kill() {
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
const SCENE_PIPE_CONFIG = {
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
};
//# sourceMappingURL=pipe.js.map