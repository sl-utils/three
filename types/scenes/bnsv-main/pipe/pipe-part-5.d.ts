import { PipeLines } from "./pipe-lines";
import { PipePart } from "./pipe-part";
/**主水泵管道部分 */
export declare class PipePart5 extends PipePart {
    constructor();
    /** 注释X表示固定的手动闸阀，K表示空气阀的开关，？表示可控的阀门，阀门关闭用9标识，开启用0，空气阀关闭用8标识 */
    lines: number[][];
    /**设备和设备控制的点位 */
    site_device: {
        [k: string]: [number, number];
    };
    /**管道和管道的点位 */
    site_line: {
        [k: string]: string;
    };
    enter: [number, number][];
    out: [number, number][];
    /**关键节点(出入口)
     * 0管道35和P4、P6的节点
     * 1管道36和P3管道22、P2管道37的节点
     * 2管道31和P2的节点
     * 3管道68和P7交接
     * 4水箱
     * 5管道23
     * */
    readonly nodes: [number, number][];
    /**已经做过入口调用过的节点 */
    entered: [number, number][];
    /**特殊节点处理 */
    nodeCompute(site: [number, number], lines: string[][], line: string[], pipes: PipeLines): void;
}
