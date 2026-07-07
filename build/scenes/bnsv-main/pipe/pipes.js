import { Pipe } from './pipe';
import { PipeLines } from './pipe-lines';
export class HousePipes {
    constructor(tscene) {
        this.tscene = tscene;
        this.lines = new PipeLines();
        this.pipes = Object.create(null);
        this.paths = [];
        tscene.on('END.HousePipes', () => {
            for (const key in this.pipes) {
                this.pipes[key].material.uniforms.tImage.value = tscene.resource.items.TEXTURE_WATER;
            }
            tscene.off('END.HousePipes');
        });
    }
    onHidePipes(names) {
        const pipes = this.pipes;
        for (const key in pipes) {
            pipes[key].onVisible(true);
        }
        names.forEach((e) => {
            const pipe = this.pipes[e];
            if (!pipe)
                return;
            pipe.onVisible(false);
        });
    }
    addPipe(mesh) {
        const { pipes, tscene, tscene: { resource: { items }, }, } = this;
        const pipe = new Pipe(mesh, tscene);
        pipes[mesh.name] = pipe;
    }
    onPipeSwitch(devices, flag = false) {
        const { lines, pipes, paths, tscene } = this, events = Object.create(null), event = tscene;
        lines.setSwitch(devices);
        let curs = lines.compute(), names = this.getNames(curs);
        for (let i = 0; i < paths.length; i++) {
            const name = paths[i];
            event.off(`${name}exe`);
            if (flag || !names.includes(name))
                pipes[name].execute(2);
        }
        this.paths = names;
        for (let i = 0, len = curs.length; i < len; i++) {
            const path = curs[i];
            for (let j = 0, length = path.length; j < length; j++) {
                const name0 = path[j - 1] || '', name = path[j], pipe = pipes[name];
                if (!pipe)
                    continue;
                const key = name0 + name, direction = SCENE_PIPE_DIRECTION[key] || -1;
                pipe.direction = direction;
                if (events[name]) {
                    continue;
                }
                else if (name0) {
                    event.on(`${name0}exe`, (e) => {
                        if (e === 1) {
                            pipe.execute(1);
                            event.off(`${name0}exe`);
                        }
                    });
                }
                else if (pipe.getState() !== 1) {
                    pipe.execute(1);
                }
                events[name] = true;
            }
        }
    }
    kill() {
        for (const key in this.pipes) {
            const pipe = this.pipes[key];
            pipe.kill();
            Reflect.deleteProperty(this.pipes, key);
        }
        this.lines = undefined;
    }
    getNames(paths) {
        const names = [];
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            for (let j = 0; j < path.length; j++) {
                const name = path[j];
                names.includes(name) || names.push(name);
            }
        }
        return names;
    }
}
const SCENE_PIPE_DIRECTION = {
    管道33: 1,
    管道33管道34: 1,
    管道34管道35: 1,
    管道35管道36: 1,
    管道31管道26: 1,
    管道26管道25: 1,
    管道25管道24: 1,
    管道24管道23: 1,
    管道23管道22: 1,
    管道23管道37: 1,
    管道26管道31: 1,
    管道31管道32: 1,
    管道32管道73: 1,
    管道73管道74: 1,
    管道74管道75: 1,
    管道75管道76: 1,
    管道76管道77: 1,
    管道77管道72: 1,
    管道72管道71: 1,
    管道71管道70: 1,
    管道70管道69: 1,
    管道69管道68: 1,
    管道35管道42: 1,
    管道42管道43: 1,
    管道43管道44: 1,
    管道35管道41: 1,
    管道41管道40: 1,
    管道40管道39: 1,
    管道35管道45: 1,
    管道45管道46: 1,
    管道46管道49: 1,
    管道49管道48: 1,
    管道48管道47: 1,
    管道08管道49: 1,
    管道50管道08: 1,
    管道53管道50: 1,
    管道51管道50: 1,
    管道52管道51: 1,
    管道55管道52: 1,
    管道54管道53: 1,
    管道55管道54: 1,
    管道56管道55: 1,
    管道67管道56: 1,
    管道64管道67: 1,
    管道66管道64: 1,
    管道65管道66: 1,
    管道62管道65: 1,
    管道62管道63: 1,
    管道63管道64: 1,
    管道62管道59: 1,
    管道59管道58: 1,
    管道60管道61: 1,
    管道61管道62: 1,
    管道68管道57: 1,
    管道37管道22: 1,
    管道36管道22: 1,
    管道22管道21: 1,
    管道21管道20: 1,
    管道20管道19: 1,
    管道36管道37: 1,
    管道30管道38: 1,
    管道38管道30: 1,
    管道30管道17: 1,
    管道17管道16: 1,
    管道16管道15: 1,
    管道15管道14: 1,
    管道14管道13: 1,
    管道13管道10: 1,
    管道10管道09: 1,
    管道13管道12: 1,
    管道12管道11: 1,
    管道11管道09: 1,
    管道30管道31: 1,
    管道29管道30: 1,
    管道37管道27: 1,
    管道27管道28: 1,
    管道28管道29: 1,
    管道03管道18: 1,
};
//# sourceMappingURL=pipes.js.map