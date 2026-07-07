import { mergePartLines } from "./compute";
import { PipePart } from "./pipe-part";
export class PipePart1 extends PipePart {
    constructor() {
        super();
        this.lines = [
            [1, 0, 1],
            [0, 0, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 0, 0],
            [1, 1, 0],
            [0, 0, 0],
            [0, 1, 1],
            [0, 0, 0],
        ];
        this.site_device = {
            '设备041': [0, 1],
            '设备047': [2, 0],
            '设备046': [2, 2],
            '设备055': [4, 2],
            '设备056': [6, 2],
            '设备048': [7, 1],
            '设备057': [8, 0],
            '设备040': [9, 1],
        };
        this.site_line = {
            '1+0': '管道10',
            '1+1': '管道09',
            '1+2': '管道11',
            '3+2': '管道12',
            '5+2': '管道13',
            '7+2': '管道14',
            '7+0': '管道15',
            '9+0': '管道16',
            '9+2': '管道17',
        };
        this.out = [[0, 1]];
        this.nodes = [[9, 2], [0, 1]];
        this.entered = [];
    }
    nodeCompute(site, lines, line, pipes) {
        const { part1, part2, part3, part4, part6, part7 } = pipes, [x, y] = site, { nodes } = this;
        if (x == nodes[0][0] && y == nodes[0][1]) {
            mergePartLines(lines, line, part2.enterPart(part2.nodes[2], pipes));
        }
    }
}
//# sourceMappingURL=pipe-part-1.js.map