import { findAllPaths, mergePartLines } from "./compute";
import { PipeLines } from "./pipe-lines";
import { PipePart } from "./pipe-part";
import { PipePart1 } from "./pipe-part-1";
import { PipePart2 } from "./pipe-part-2";
import { PipePart3 } from "./pipe-part-3";
import { PipePart4 } from "./pipe-part-4";
/**主水泵管道部分 */
export class PipePart5 extends PipePart {
    constructor() { super() }
    /** 注释X表示固定的手动闸阀，K表示空气阀的开关，？表示可控的阀门，阀门关闭用9标识，开启用0，空气阀关闭用8标识 */
    lines: number[][] = [
    /*0*/[0/**X036 */],/*1*/[0/**33 */],/*2*/[0/**X002 */],/*3*/[0/**34 */],/*4*/[0/**X028 */],
    /*5*/[0/**35 */],/*6*/[0/**X026 */],/*7*/[0/**36 */],/*8*/[0/**23 */],/*9*/[0/**?011 */],
    /*0*/[0/**24 */],/*1*/[0/**?049 */],/*2*/[0/**25 */],/*3*/[0/**?012 */],/*4*/[0/**26 */],
    /*5*/[0/**31 */],/*6*/[0/**K059 */],/*7*/[0/**32 */],/*8*/[0/**73 */],/*9*/[0/**?022 */],
    /*0*/[0/**74 */],/*1*/[0/**K064 */],/*2*/[0/**75 */],/*3*/[0/**?025 */],/*4*/[0/**76 */],
    /*5*/[0/**K066 */],/*6*/[0/**77 */],/*7*/[0/**72 */],/*8*/[0/**?024 */],/*9*/[0/**71 */],
    /*0*/[0/**K065 */],/*1*/[0/**70 */],/*2*/[0/**?023 */],/*3*/[0/**69 */],/*4*/[0/**K063 */],
    /*5*/[0/**68 */]
    ]
    /**设备和设备控制的点位 */
    site_device: { [k: string]: [number, number] } = {
        '设备036': [0, 0], '设备002': [2, 0], '设备028': [4, 0], '设备026': [6, 0], '设备011': [9, 0],
        '设备049': [11, 0], '设备012': [13, 0], '设备059': [16, 0], '设备022': [19, 0],
        '设备064': [21, 0], '设备025': [23, 0], '设备066': [25, 0], '设备024': [28, 0],
        '设备065': [30, 0], '设备023': [32, 0], '设备063': [34, 0],
    }
    /**管道和管道的点位 */
    site_line: { [k: string]: string } = {
        '1+0': '管道33', '3+0': '管道34', '5+0': '管道35', '7+0': '管道36', '8+0': '管道23',
        '10+0': '管道24', '12+0': '管道25', '14+0': '管道26', '15+0': '管道31', '17+0': '管道32', '18+0': '管道73',
        '20+0': '管道74', '22+0': '管道75', '24+0': '管道76', '26+0': '管道77', '27+0': '管道72', '29+0': '管道71',
        '31+0': '管道70', '33+0': '管道69', '35+0': '管道68',
    }
    enter: [number, number][] = [[0, 0]];
    out: [number, number][] = [[35, 0]];
    /**关键节点(出入口)  
     * 0管道35和P4、P6的节点  
     * 1管道36和P3管道22、P2管道37的节点
     * 2管道31和P2的节点 
     * 3管道68和P7交接 
     * 4水箱
     * 5管道23
     * */
    readonly nodes: [number, number][] = [[5, 0], [7, 0], [15, 0], [35, 0], [0, 0], [8, 0]]
    /**已经做过入口调用过的节点 */
    entered: [number, number][] = [];
    /**特殊节点处理 */
    nodeCompute(site: [number, number], lines: string[][], line: string[], pipes: PipeLines) {
        const { part1, part2, part3, part4, part6, part7 } = pipes, [x, y] = site, { nodes } = this;
        if (x == nodes[0][0] && y == nodes[0][1]) {
            mergePartLines(lines, line, part4.enterPart(part4.nodes[0], pipes))
            mergePartLines(lines, line, part6.enterPart(part6.nodes[0], pipes))
        } else if (x == nodes[1][0] && y == nodes[1][1]) {
            mergePartLines(lines, line, part3.enterPart(part3.nodes[0], pipes));
            mergePartLines(lines, line, part2.enterPart(part2.nodes[0], pipes));
        } else if (x == nodes[2][0] && y == nodes[2][1]) {
            mergePartLines(lines, line, part2.enterPart(part2.nodes[1], pipes));
        } else if (x == nodes[3][0] && y == nodes[3][1]) {
            mergePartLines(lines, line, part7.enterPart(part7.nodes[0], pipes));
        } else if (x == nodes[5][0] && y == nodes[5][1]) {
            mergePartLines(lines, line, part3.enterPart(part3.nodes[0], pipes));
            mergePartLines(lines, line, part2.enterPart(part2.nodes[0], pipes));
        }
    }

}