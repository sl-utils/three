import { PipeLines } from "./pipe-lines";
export declare abstract class PipePart {
    constructor();
    /** 注释X表示固定的手动闸阀，K表示空气阀的开关，？表示可控的阀门 */
    protected lines: number[][];
    /**设备和设备控制的点位 */
    protected abstract site_device: {
        [k: string]: [number, number];
    };
    /**管道和管道的点位 */
    protected abstract site_line: {
        [k: string]: string;
    };
    protected abstract out: [number, number][];
    /**关键节点(出入口) */
    protected abstract nodes: [number, number][];
    /**已经做过入口调用过的节点 */
    protected abstract entered: [number, number][];
    /**根据设备及状态设置路径状态 */
    setSwitch(name: string, flag: boolean): void;
    /**进入该分区部分查找路径
     * @param enter 分区入口
     * @param pipes 管网所有分区
    */
    enterPart(enter: [number, number], pipes: PipeLines): string[][];
    /**分支处理
     * @param path 所有的路径
     * @param pipes 管网所有分区
    */
    private branchCompute;
    /**特殊节点处理,进入其他管网的分区 */
    protected abstract nodeCompute(site: [number, number], lines: string[][], line: string[], pipes: PipeLines): any;
}
