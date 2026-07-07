import { findAllPaths, mergePartLines } from "./compute";
import { PipeLines } from "./pipe-lines";
import { PipePart } from "./pipe-part";

export class PipePart7 extends PipePart {
    constructor() { super() }
    /** 注释X表示固定的手动闸阀，K表示空气阀的开关，？表示可控的阀门 */
    lines: number[][] = [
    /*0*/[0, 0, 0],
    /*1*/[0, 1, 0],
    /*2*/[0, 0, 0],
    /*3*/[1, 0, 1],
    /*4*/[0, 0, 0],
    /*5*/[0, 1, 0],
    /*6*/[0, 0, 0],
    /*7*/[1, 0, 1],
    /*8*/[0, 0, 1],
    ]
    /**设备和设备控制的点位 */
    site_device: { [k: string]: [number, number] } = {
        '设备020': [0, 0], '设备015': [1, 2], '设备061': [2, 0], '设备016': [4, 0], '设备017': [5, 2],
        '设备062': [6, 0], '设备044': [7, 1], '设备019': [8, 0],
    }
    /**管道和管道的点位 */
    site_line: { [k: string]: string } = {
        '0+1': '管道57', '0+2': '管道60', '1+0': '管道58', '2+1': '管道59', '2+2': '管道61',
        '3+1': '管道62', '4+2': '管道65', '5+0': '管道63', '6+1': '管道64', '6+2': '管道66',
        '8+1': '管道67',
    }
    out: [number, number][] = [[8, 0], [0, 1]];
    /**关键节点(出入口)  0管道57和P5管道68交接 1和消除罐节点*/
    readonly nodes: [number, number][] = [[0, 1], [8, 0]]
    /**已经做过入口调用过的节点 */
    entered: [number, number][] = [];
    /**特殊节点处理 */
    nodeCompute(site: [number, number], lines: string[][], line: string[], pipes: PipeLines) {
        const { part1, part2, part3, part4, part5, part6, part7 } = pipes, [x, y] = site, { nodes, entered } = this;
        /**特殊节点 */
        if (x == nodes[0][0] && y == nodes[0][1]) {
            mergePartLines(lines, line, part5.enterPart(part5.nodes[3], pipes))
        }else if(x == nodes[1][0] && y == nodes[1][1]){
            mergePartLines(lines, line, part6.enterPart(part6.nodes[2], pipes))
        }
    }
}