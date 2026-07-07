import { PipePart1 } from "./pipe-part-1";
import { PipePart2 } from "./pipe-part-2";
import { PipePart3 } from "./pipe-part-3";
import { PipePart4 } from "./pipe-part-4";
import { PipePart5 } from "./pipe-part-5";
import { PipePart6 } from "./pipe-part-6";
import { PipePart7 } from "./pipe-part-7";
/**所有的管道线路
 * 在最坏情况下，需要遍历迷宫中的所有可能路径，时间复杂度为O(4^(m*n)) ，其中 m 和 n 分别是迷宫的行数和列数。
 */
export class PipeLines {
    constructor() { }
    /** 注释X表示固定的手动闸阀，K表示空气阀的开关，？表示可控的阀门，阀门关闭用9标识，开启用0，空气阀关闭用8标识 */
    /**最下侧管道 */
    public readonly part1: PipePart1 = new PipePart1();
    /**水箱+管道03部分管道 */
    public readonly part2: PipePart2 = new PipePart2();
    /**水箱+管道04部分管道 */
    public readonly part3: PipePart3 = new PipePart3();
    /**水锤消除管部分+上方部分 */
    public readonly part4: PipePart4 = new PipePart4();
    /**主水泵管道部分 */
    public readonly part5: PipePart5 = new PipePart5();
    /**最上侧管道 */
    public readonly part6: PipePart6 = new PipePart6();
    /**外部+室外消除罐部分管道 */
    public readonly part7: PipePart7 = new PipePart7();
    /**格局设备状态设置数组数据 
     * @param devices 所有的设备及其开关状态
    */
    public setSwitch(devices: { [K: string]: boolean }) {
        const { part1, part2, part3, part4, part5, part6, part7 } = this;
        for (const key in devices) {
            const ele = devices[key];
            part1.setSwitch(key, ele);
            part2.setSwitch(key, ele);
            part3.setSwitch(key, ele);
            part4.setSwitch(key, ele);
            part5.setSwitch(key, ele);
            part6.setSwitch(key, ele);
            part7.setSwitch(key, ele);
        }
    }
    /**计算管道水流结果 */
    public compute(): string[][] {
        const { part1, part2, part3, part4, part5, part6, part7 } = this;
        const allPaths = part5.enterPart(part5.nodes[4], this);
        return allPaths;
    }
}