import { findAllPaths, mergePartLines } from "./compute";
import { PipeLines } from "./pipe-lines";
import { PipePart } from "./pipe-part";

/**水锤消除管部分+上方部分 */
export class PipePart4 extends PipePart {
    constructor() { super() }
    /** 注释X表示固定的手动闸阀，K表示空气阀的开关，？表示可控的阀门 */
    lines: number[][] = [
    /*0*/[0/*X035 */, 1, 0],
    /*1*/[0/*39 */, 1, 0/*44 */],
    /*2*/[0/*X003 */, 1, 0/*X033 */],
    /*3*/[0/*40 */, 1, 0/*43 */],
    /*4*/[0/*X031 */, 1, 0/*X032 */],
    /*5*/[0/*41 */, 0/**-*/, 0/*42 */],
    /*6*/[1, 1, 1],
    ]
    /**设备和设备控制的点位 */
    site_device: { [k: string]: [number, number] } = {
        '设备035': [0, 0],
        '设备003': [0, 2],
        '设备031': [4, 2],
        '设备032': [4, 2],
        '设备033': [2, 2],
    }
    /**管道和管道的点位 */
    site_line: { [k: string]: string } = {
        '1+0': '管道39',
        '3+0': '管道40',
        '5+0': '管道41',
        '5+2': '管道42',
        '3+2': '管道43',
        '1+2': '管道44',
    }
    out: [number, number][] = [[0, 0], [0, 2]];
    /**关键节点(出入口)    0和P5管道35的节点  1水箱节点   2消除罐体*/
    readonly nodes: [number, number][] = [[5, 1], [0, 0], [0, 2]]
    /**已经做过入口调用过的节点 */
    entered: [number, number][] = [];
    /**特殊节点处理 */
    nodeCompute(site: [number, number], lines: string[][], line: string[], pipes: PipeLines) {
        const { part5 } = pipes, [x, y] = site, { nodes, entered } = this;
        /**特殊节点 */
        if (x == nodes[0][0] && y == nodes[0][1]) {
            mergePartLines(lines, line, part5.enterPart(part5.nodes[0], pipes))
        }
    }
}