import { mergePartLines } from "./compute";
import { PipePart } from "./pipe-part";
export class PipePart3 extends PipePart {
    constructor() {
        super();
        this.lines = [
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
        ];
        this.site_device = {
            '设备037': [0, 0],
            '设备043': [2, 0],
            '设备029': [4, 0],
            '设备030': [6, 0],
        };
        this.site_line = {
            '1+0': '管道19',
            '3+0': '管道20',
            '5+0': '管道21',
            '7+0': '管道22',
        };
        this.out = [[0, 0]];
        this.nodes = [[7, 0], [0, 0]];
        this.entered = [];
    }
    nodeCompute(site, lines, line, pipes) {
        const { part1, part2, part3, part4, part5, part6, part7 } = pipes, [x, y] = site, { nodes, entered } = this;
        if (x == nodes[0][0] && y == nodes[0][1]) {
            mergePartLines(lines, line, part5.enterPart(part5.nodes[1], pipes));
            mergePartLines(lines, line, part5.enterPart(part5.nodes[5], pipes));
        }
    }
}
//# sourceMappingURL=pipe-part-3.js.map