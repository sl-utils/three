import { findAllPaths, mergePartLines } from "./compute";
import { PipeLines } from "./pipe-lines";
import { PipePart } from "./pipe-part";
/**水箱+管道03部分管道 */
export class PipePart2 extends PipePart {
    constructor() { super() }
    /** 注释X表示固定的手动闸阀，K表示空气阀的开关，？表示可控的阀门 */
    lines: number[][] = [
    /*0*/[1, 0/*X008*/, 1, 1, 1],
    /*1*/[1, 0/*18*/, 1, 1, 1],
    /*2*/[0, 0/*29*/, 0/*X004*/, 0/*28*/, 0/*?009*/],
    /*3*/[0, 1, 1, 1, 0/*27*/],
    /*4*/[0, 1, 0/*38*/, 0/*?010*/, 0/*37-*/],
    /*5*/[0/*X013*/, 1, 0, 1, 1],
    /*6*/[0, 0, 0/*30*/, 0/*?039*/, 0],
    ]
    /**设备和设备控制的点位 */
    site_device: { [k: string]: [number, number] } = {
        '设备008': [0, 1],
        '设备004': [2, 2],
        '设备009': [2, 4],
        '设备010': [4, 3],
        '设备013': [5, 0],
        '设备039': [6, 3],
    }
    /**管道和管道的点位 */
    site_line: { [k: string]: string } = {
        '1+1': '管道18',
        '2+1': '管道29',
        '2+3': '管道28',
        '3+4': '管道27',
        '4+4': '管道37',
        '5+2': '管道38',
        '6+2': '管道30',
    }
    out: [number, number][] = [[0, 1], [6, 4]];
    /**关键节点(出入口) 0管道37和P5管道36、23、P3管道22的节点 1和P5管道31的节点  2管道30和P1管道17的节点 3和水槽的节点*/
    readonly nodes: [number, number][] = [[4, 4], [6, 4], [6, 2], [0, 1]]
    /**已经做过入口调用过的节点 */
    entered: [number, number][] = [];
    /**特殊节点处理 */
    nodeCompute(site: [number, number], lines: string[][], line: string[], pipes: PipeLines) {
        const { part1, part2, part3, part4, part5, part6, part7 } = pipes, [x, y] = site, { nodes, entered } = this;
        if (x == nodes[0][0] && y == nodes[0][1]) {
            mergePartLines(lines, line, part5.enterPart(part5.nodes[1], pipes))
            mergePartLines(lines, line, part5.enterPart(part5.nodes[5], pipes))
            mergePartLines(lines, line, part3.enterPart(part3.nodes[0], pipes));
        } else if (x == nodes[1][0] && y == nodes[1][1]) {
            mergePartLines(lines, line, part5.enterPart(part5.nodes[2], pipes));
        } else if (x == nodes[2][0] && y == nodes[2][1]) {
            mergePartLines(lines, line, part1.enterPart(part1.nodes[0], pipes));
        }
    }
}