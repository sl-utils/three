import { findAllPaths, mergePartLines } from "./compute";
import { PipeLines } from "./pipe-lines";
import { PipePart } from "./pipe-part";
/**水箱+管道04部分管道 */
export class PipePart3 extends PipePart {
    constructor() { super() }

    /** 注释X表示固定的手动闸阀，K表示空气阀的开关，？表示可控的阀门 */
    lines: number[][] = [
    /*0*/[0/*X037 */],
    /*1*/[0/*19 */],
    /*2*/[0/*?043 */],
    /*3*/[0/*20 */],
    /*4*/[0/*?029 */],
    /*5*/[0/*21 */],
    /*6*/[0/*?030 */],
    /*7*/[0/*22 */],
    ]
    /**设备和设备控制的点位 */
    site_device: {
        [k: string]: [number, number]
    } = {
            '设备037': [0, 0],
            '设备043': [2, 0],
            '设备029': [4, 0],
            '设备030': [6, 0],
        }
    /**管道和管道的点位 */
    site_line: { [k: string]: string } = {
        '1+0': '管道19',
        '3+0': '管道20',
        '5+0': '管道21',
        '7+0': '管道22',
    }
    out: [number, number][] = [[0, 0]];
    /**关键节点(出入口) 0和P5管道36的节点(管道22) 1 和水箱节点*/
    readonly nodes: [number, number][] = [[7, 0], [0, 0]]
    /**已经做过入口调用过的节点 */
    entered: [number, number][] = [];
    /**特殊节点处理 */
    nodeCompute(site: [number, number], lines: string[][], line: string[], pipes: PipeLines) {
        const { part1, part2, part3, part4, part5, part6, part7 } = pipes, [x, y] = site, { nodes, entered } = this;
        /**特殊节点 */
        if (x == nodes[0][0] && y == nodes[0][1]) {
            mergePartLines(lines, line, part5.enterPart(part5.nodes[1], pipes))
            mergePartLines(lines, line, part5.enterPart(part5.nodes[5], pipes))
        }
    }
}