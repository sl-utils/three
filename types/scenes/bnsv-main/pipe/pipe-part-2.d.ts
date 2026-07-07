import { PipeLines } from "./pipe-lines";
import { PipePart } from "./pipe-part";
/**水箱+管道03部分管道 */
export declare class PipePart2 extends PipePart {
    constructor();
    /** 注释X表示固定的手动闸阀，K表示空气阀的开关，？表示可控的阀门 */
    lines: number[][];
    /**设备和设备控制的点位 */
    site_device: {
        [k: string]: [number, number];
    };
    /**管道和管道的点位 */
    site_line: {
        [k: string]: string;
    };
    out: [number, number][];
    /**关键节点(出入口) 0管道37和P5管道36、23、P3管道22的节点 1和P5管道31的节点  2管道30和P1管道17的节点 3和水槽的节点*/
    readonly nodes: [number, number][];
    /**已经做过入口调用过的节点 */
    entered: [number, number][];
    /**特殊节点处理 */
    nodeCompute(site: [number, number], lines: string[][], line: string[], pipes: PipeLines): void;
}
