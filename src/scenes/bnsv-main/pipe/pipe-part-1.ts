import { mergePartLines } from "./compute";
import { PipeLines } from "./pipe-lines";
import { PipePart } from "./pipe-part";
export class PipePart1 extends PipePart {
    constructor() { super() }
    /** 注释X表示固定的手动闸阀，K表示空气阀的开关，？表示可控的阀门 */
    lines: number[][] = [
    /*0*/[1, 0/*X041*/, 1],
    /*1*/[0/*10*/, 0/*09*/, 0/*11*/],
    /*2*/[0/*?047*/, 1, 0/*?046*/],
    /*3*/[0, 1, 0/*12*/],
    /*4*/[0, 1, 0/*K055*/],
    /*5*/[0, 0, 0/*13*/],
    /*6*/[1, 1, 0/*K056*/],
    /*7*/[0/*15*/, 0/*?048*/, 0/*14*/],
    /*8*/[0/*K057*/, 1, 1],
    /*9*/[0/*16*/, 0/*X040*/, 0/*17*/],
    ]
    /**设备和设备控制的点位 */
    site_device: { [k: string]: [number, number] } = {
        '设备041': [0, 1],
        '设备047': [2, 0],
        '设备046': [2, 2],
        '设备055': [4, 2],
        '设备056': [6, 2],
        '设备048': [7, 1],
        '设备057': [8, 0],
        '设备040': [9, 1],
    }
    /**管道和管道的点位 */
    site_line: { [k: string]: string } = {
        '1+0': '管道10',
        '1+1': '管道09',
        '1+2': '管道11',
        '3+2': '管道12',
        '5+2': '管道13',
        '7+2': '管道14',
        '7+0': '管道15',
        '9+0': '管道16',
        '9+2': '管道17',
    }
    out: [number, number][] = [[0, 1]];
    /**关键节点(出入口)  0和P2管道30的节点(管道17) 1和水槽的节点*/
    readonly nodes: [number, number][] = [[9, 2], [0, 1]]
    /**已经做过入口调用过的节点 */
    entered: [number, number][] = [];
    /**特殊节点处理 */
    protected nodeCompute(site: [number, number], lines: string[][], line: string[], pipes: PipeLines) {
        const { part1, part2, part3, part4, part6, part7 } = pipes, [x, y] = site, { nodes } = this;
        /**特殊节点 */
        if (x == nodes[0][0] && y == nodes[0][1]) {
            mergePartLines(lines, line, part2.enterPart(part2.nodes[2], pipes))
        }
    }
}