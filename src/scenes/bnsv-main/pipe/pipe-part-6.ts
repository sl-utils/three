import { findAllPaths, mergePartLines } from "./compute";
import { PipeLines } from "./pipe-lines";
import { PipePart } from "./pipe-part";
/**最上侧管道 */
export class PipePart6 extends PipePart {
    constructor() { super() }
    /** 注释X表示固定的手动闸阀，K表示空气阀的开关，？表示可控的阀门 */
    lines: number[][] = [
    /*0*/[0/*45 */, 1, 0/*X034*/, 0/**47 */],
    /*1*/[0/*?038*/, 1, 1, 0/*?042*/],
    /*2*/[0/*46*/, 0/*49 */, 0/*?027*/, 0/*48 */],
    /*3*/[0/**08 */, 1, 1, 1],
    /*4*/[0/*K058 */, 1, 1, 1],
    /*5*/[0/*50 */, 0, 0/*53*/, 0/*?014*/],
    /*6*/[0/*51*/, 1, 1, 0/*54*/],
    /*7*/[0/*?021*/, 0/*52*/, 0/*55 */, 0/*K060*/],
    /*8*/[1, 1, 0/*?045*/, 1],
    /*9*/[1, 0/*?018*/, 0/*56*/, 1],
    ]
    /**设备和设备控制的点位 */
    site_device: { [k: string]: [number, number] } = {
        '设备034': [0, 2], '设备038': [1, 0], '设备042': [1, 3], '设备027': [2, 2], '设备058': [4, 0],
        '设备014': [5, 3], '设备021': [7, 0], '设备060': [7, 3], '设备045': [8, 2], '设备018': [9, 1],
    }
    /**管道和管道的点位 */
    site_line: { [k: string]: string } = {
        '0+0': '管道45', '0+3': '管道47', '2+0': '管道46', '2+1': '管道49', '2+3': '管道48', '3+0': '管道08',
        '6+0': '管道51', '5+0': '管道50', '5+2': '管道53', '6+3': '管道54', '7+1': '管道52',
        '7+2': '管道55', '9+2': '管道56',
    }
    out: [number, number][] = [[0, 2], [9, 1]];
    /**关键节点(出入口)  0管道45和P5管道35交接 1和水槽的节点 2设备018和消除罐体链接*/
    readonly nodes: [number, number][] = [[0, 0], [0, 2], [9, 1]]
    /**已经做过入口调用过的节点 */
    entered: [number, number][] = [];
    /**特殊节点处理 */
    nodeCompute(site: [number, number], lines: string[][], line: string[], pipes: PipeLines) {
        const { part1, part2, part3, part4, part5, part6, part7 } = pipes, [x, y] = site, { nodes, entered } = this;
        /**特殊节点 */
        if (x == nodes[0][0] && y == nodes[0][1]) {
            mergePartLines(lines, line, part5.enterPart(part5.nodes[0], pipes))
        }else if(x == nodes[2][0] && y == nodes[2][1]){
            mergePartLines(lines, line, part7.enterPart(part7.nodes[1], pipes))
        }
    }
}