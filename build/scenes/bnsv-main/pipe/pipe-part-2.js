import { mergePartLines } from "./compute";
import { PipePart } from "./pipe-part";
export class PipePart2 extends PipePart {
    constructor() {
        super();
        this.lines = [
            [1, 0, 1, 1, 1],
            [1, 0, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 0, 0],
            [0, 1, 0, 1, 1],
            [0, 0, 0, 0, 0],
        ];
        this.site_device = {
            '设备008': [0, 1],
            '设备004': [2, 2],
            '设备009': [2, 4],
            '设备010': [4, 3],
            '设备013': [5, 0],
            '设备039': [6, 3],
        };
        this.site_line = {
            '1+1': '管道18',
            '2+1': '管道29',
            '2+3': '管道28',
            '3+4': '管道27',
            '4+4': '管道37',
            '5+2': '管道38',
            '6+2': '管道30',
        };
        this.out = [[0, 1], [6, 4]];
        this.nodes = [[4, 4], [6, 4], [6, 2], [0, 1]];
        this.entered = [];
    }
    nodeCompute(site, lines, line, pipes) {
        const { part1, part2, part3, part4, part5, part6, part7 } = pipes, [x, y] = site, { nodes, entered } = this;
        if (x == nodes[0][0] && y == nodes[0][1]) {
            mergePartLines(lines, line, part5.enterPart(part5.nodes[1], pipes));
            mergePartLines(lines, line, part5.enterPart(part5.nodes[5], pipes));
            mergePartLines(lines, line, part3.enterPart(part3.nodes[0], pipes));
        }
        else if (x == nodes[1][0] && y == nodes[1][1]) {
            mergePartLines(lines, line, part5.enterPart(part5.nodes[2], pipes));
        }
        else if (x == nodes[2][0] && y == nodes[2][1]) {
            mergePartLines(lines, line, part1.enterPart(part1.nodes[0], pipes));
        }
    }
}
//# sourceMappingURL=pipe-part-2.js.map