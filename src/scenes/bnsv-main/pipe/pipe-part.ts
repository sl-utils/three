import { findAllPaths, mergePartLines } from "./compute";
import { PipeLines } from "./pipe-lines";

export abstract class PipePart {
    constructor() { }
    /** 注释X表示固定的手动闸阀，K表示空气阀的开关，？表示可控的阀门 */
    protected lines: number[][];
    /**设备和设备控制的点位 */
    protected abstract site_device: { [k: string]: [number, number] };
    /**管道和管道的点位 */
    protected abstract site_line: { [k: string]: string };
    protected abstract out: [number, number][];
    /**关键节点(出入口) */
    protected abstract nodes: [number, number][];
    /**已经做过入口调用过的节点 */
    protected abstract entered: [number, number][];
    /**根据设备及状态设置路径状态 */
    public setSwitch(name: string, flag: boolean) {
        const { site_device, lines, entered } = this;
        let [x, y] = site_device[name] || [];
        entered.length = 0;
        if (x == undefined || y == undefined) return;
        lines[x][y] = flag ? 0 : 9;
    }
    /**进入该分区部分查找路径 
     * @param enter 分区入口
     * @param pipes 管网所有分区
    */
    public enterPart(enter: [number, number], pipes: PipeLines): string[][] {
        const { entered, lines, out } = this, flag = entered.some(e => e[0] == enter[0] && e[1] == enter[1]);
        /**该入口已经计算过则跳过 */
        if (flag) return [];
        entered.push(enter);
        const path: [number, number][][] = findAllPaths(lines, [enter], out);
        return this.branchCompute(path, pipes);
    }
    /**分支处理 
     * @param path 所有的路径
     * @param pipes 管网所有分区
    */
    private branchCompute(path: [number, number][][], pipes: PipeLines): string[][] {
        const length = path.length;
        if (length == 0) return [];
        const { site_line, entered } = this, lines: string[][] = [];
        for (let index = 0; index < length; index++) {
            const ele = path[index], len = ele.length, line = [];
            lines.push(line);
            for (let j = 0; j < len; j++) {
                const [x, y] = ele[j], name = site_line[`${x}+${y}`];
                if (name) line.push(name);
                if (!entered.find(e => e[0] == x && e[1] == y)) this.nodeCompute(ele[j], lines, line, pipes);
                entered.push(ele[j]);
            }
        }
        return lines
    }
    /**特殊节点处理,进入其他管网的分区 */
    protected abstract nodeCompute(site: [number, number], lines: string[][], line: string[], pipes: PipeLines);
}