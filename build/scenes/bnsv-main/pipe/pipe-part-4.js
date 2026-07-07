import { mergePartLines } from "./compute";
import { PipePart } from "./pipe-part";
export class PipePart4 extends PipePart {
    constructor() {
        super();
        this.lines = [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 0, 0],
            [1, 1, 1],
        ];
        this.site_device = {
            '设备035': [0, 0],
            '设备003': [0, 2],
            '设备031': [4, 2],
            '设备032': [4, 2],
            '设备033': [2, 2],
        };
        this.site_line = {
            '1+0': '管道39',
            '3+0': '管道40',
            '5+0': '管道41',
            '5+2': '管道42',
            '3+2': '管道43',
            '1+2': '管道44',
        };
        this.out = [[0, 0], [0, 2]];
        this.nodes = [[5, 1], [0, 0], [0, 2]];
        this.entered = [];
    }
    nodeCompute(site, lines, line, pipes) {
        const { part5 } = pipes, [x, y] = site, { nodes, entered } = this;
        if (x == nodes[0][0] && y == nodes[0][1]) {
            mergePartLines(lines, line, part5.enterPart(part5.nodes[0], pipes));
        }
    }
}
//# sourceMappingURL=pipe-part-4.js.map