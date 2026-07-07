import { mergePartLines } from "./compute";
import { PipePart } from "./pipe-part";
export class PipePart7 extends PipePart {
    constructor() {
        super();
        this.lines = [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0],
            [1, 0, 1],
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0],
            [1, 0, 1],
            [0, 0, 1],
        ];
        this.site_device = {
            '设备020': [0, 0], '设备015': [1, 2], '设备061': [2, 0], '设备016': [4, 0], '设备017': [5, 2],
            '设备062': [6, 0], '设备044': [7, 1], '设备019': [8, 0],
        };
        this.site_line = {
            '0+1': '管道57', '0+2': '管道60', '1+0': '管道58', '2+1': '管道59', '2+2': '管道61',
            '3+1': '管道62', '4+2': '管道65', '5+0': '管道63', '6+1': '管道64', '6+2': '管道66',
            '8+1': '管道67',
        };
        this.out = [[8, 0], [0, 1]];
        this.nodes = [[0, 1], [8, 0]];
        this.entered = [];
    }
    nodeCompute(site, lines, line, pipes) {
        const { part1, part2, part3, part4, part5, part6, part7 } = pipes, [x, y] = site, { nodes, entered } = this;
        if (x == nodes[0][0] && y == nodes[0][1]) {
            mergePartLines(lines, line, part5.enterPart(part5.nodes[3], pipes));
        }
        else if (x == nodes[1][0] && y == nodes[1][1]) {
            mergePartLines(lines, line, part6.enterPart(part6.nodes[2], pipes));
        }
    }
}
//# sourceMappingURL=pipe-part-7.js.map