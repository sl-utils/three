import { PipeLines } from "./pipe-lines";
import { PipePart } from "./pipe-part";
export declare class PipePart1 extends PipePart {
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
    /**关键节点(出入口)  0和P2管道30的节点(管道17) 1和水槽的节点*/
    readonly nodes: [number, number][];
    /**已经做过入口调用过的节点 */
    entered: [number, number][];
    /**特殊节点处理 */
    protected nodeCompute(site: [number, number], lines: string[][], line: string[], pipes: PipeLines): void;
}
