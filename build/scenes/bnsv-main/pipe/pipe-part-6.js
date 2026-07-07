import { mergePartLines } from "./compute";
import { PipePart } from "./pipe-part";
export class PipePart6 extends PipePart {
    constructor() {
        super();
        this.lines = [
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [1, 1, 0, 1],
            [1, 0, 0, 1],
        ];
        this.site_device = {
            '设备034': [0, 2], '设备038': [1, 0], '设备042': [1, 3], '设备027': [2, 2], '设备058': [4, 0],
            '设备014': [5, 3], '设备021': [7, 0], '设备060': [7, 3], '设备045': [8, 2], '设备018': [9, 1],
        };
        this.site_line = {
            '0+0': '管道45', '0+3': '管道47', '2+0': '管道46', '2+1': '管道49', '2+3': '管道48', '3+0': '管道08',
            '6+0': '管道51', '5+0': '管道50', '5+2': '管道53', '6+3': '管道54', '7+1': '管道52',
            '7+2': '管道55', '9+2': '管道56',
        };
        this.out = [[0, 2], [9, 1]];
        this.nodes = [[0, 0], [0, 2], [9, 1]];
        this.entered = [];
    }
    nodeCompute(site, lines, line, pipes) {
        const { part1, part2, part3, part4, part5, part6, part7 } = pipes, [x, y] = site, { nodes, entered } = this;
        if (x == nodes[0][0] && y == nodes[0][1]) {
            mergePartLines(lines, line, part5.enterPart(part5.nodes[0], pipes));
        }
        else if (x == nodes[2][0] && y == nodes[2][1]) {
            mergePartLines(lines, line, part7.enterPart(part7.nodes[1], pipes));
        }
    }
}
//# sourceMappingURL=pipe-part-6.js.map