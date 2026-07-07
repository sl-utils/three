import { findAllPaths } from "./compute";
export class PipePart {
    constructor() { }
    setSwitch(name, flag) {
        const { site_device, lines, entered } = this;
        let [x, y] = site_device[name] || [];
        entered.length = 0;
        if (x == undefined || y == undefined)
            return;
        lines[x][y] = flag ? 0 : 9;
    }
    enterPart(enter, pipes) {
        const { entered, lines, out } = this, flag = entered.some(e => e[0] == enter[0] && e[1] == enter[1]);
        if (flag)
            return [];
        entered.push(enter);
        const path = findAllPaths(lines, [enter], out);
        return this.branchCompute(path, pipes);
    }
    branchCompute(path, pipes) {
        const length = path.length;
        if (length == 0)
            return [];
        const { site_line, entered } = this, lines = [];
        for (let index = 0; index < length; index++) {
            const ele = path[index], len = ele.length, line = [];
            lines.push(line);
            for (let j = 0; j < len; j++) {
                const [x, y] = ele[j], name = site_line[`${x}+${y}`];
                if (name)
                    line.push(name);
                if (!entered.find(e => e[0] == x && e[1] == y))
                    this.nodeCompute(ele[j], lines, line, pipes);
                entered.push(ele[j]);
            }
        }
        return lines;
    }
}
//# sourceMappingURL=pipe-part.js.map