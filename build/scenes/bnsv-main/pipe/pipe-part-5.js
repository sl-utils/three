import { mergePartLines } from "./compute";
import { PipePart } from "./pipe-part";
export class PipePart5 extends PipePart {
    constructor() {
        super();
        this.lines = [
            [0], [0], [0], [0], [0],
            [0], [0], [0], [0], [0],
            [0], [0], [0], [0], [0],
            [0], [0], [0], [0], [0],
            [0], [0], [0], [0], [0],
            [0], [0], [0], [0], [0],
            [0], [0], [0], [0], [0],
            [0]
        ];
        this.site_device = {
            '设备036': [0, 0], '设备002': [2, 0], '设备028': [4, 0], '设备026': [6, 0], '设备011': [9, 0],
            '设备049': [11, 0], '设备012': [13, 0], '设备059': [16, 0], '设备022': [19, 0],
            '设备064': [21, 0], '设备025': [23, 0], '设备066': [25, 0], '设备024': [28, 0],
            '设备065': [30, 0], '设备023': [32, 0], '设备063': [34, 0],
        };
        this.site_line = {
            '1+0': '管道33', '3+0': '管道34', '5+0': '管道35', '7+0': '管道36', '8+0': '管道23',
            '10+0': '管道24', '12+0': '管道25', '14+0': '管道26', '15+0': '管道31', '17+0': '管道32', '18+0': '管道73',
            '20+0': '管道74', '22+0': '管道75', '24+0': '管道76', '26+0': '管道77', '27+0': '管道72', '29+0': '管道71',
            '31+0': '管道70', '33+0': '管道69', '35+0': '管道68',
        };
        this.enter = [[0, 0]];
        this.out = [[35, 0]];
        this.nodes = [[5, 0], [7, 0], [15, 0], [35, 0], [0, 0], [8, 0]];
        this.entered = [];
    }
    nodeCompute(site, lines, line, pipes) {
        const { part1, part2, part3, part4, part6, part7 } = pipes, [x, y] = site, { nodes } = this;
        if (x == nodes[0][0] && y == nodes[0][1]) {
            mergePartLines(lines, line, part4.enterPart(part4.nodes[0], pipes));
            mergePartLines(lines, line, part6.enterPart(part6.nodes[0], pipes));
        }
        else if (x == nodes[1][0] && y == nodes[1][1]) {
            mergePartLines(lines, line, part3.enterPart(part3.nodes[0], pipes));
            mergePartLines(lines, line, part2.enterPart(part2.nodes[0], pipes));
        }
        else if (x == nodes[2][0] && y == nodes[2][1]) {
            mergePartLines(lines, line, part2.enterPart(part2.nodes[1], pipes));
        }
        else if (x == nodes[3][0] && y == nodes[3][1]) {
            mergePartLines(lines, line, part7.enterPart(part7.nodes[0], pipes));
        }
        else if (x == nodes[5][0] && y == nodes[5][1]) {
            mergePartLines(lines, line, part3.enterPart(part3.nodes[0], pipes));
            mergePartLines(lines, line, part2.enterPart(part2.nodes[0], pipes));
        }
    }
}
//# sourceMappingURL=pipe-part-5.js.map