import { Material, Mesh } from "three";
import { TEvent, SLTScene } from "../../..";
import { MaterialPipeWater2 } from "../../../materials/pipe-water/pipe-water2";
/**管道
 * 所有管道材质都一模一样，类型为：MeshStandardMaterial
 */
export declare class Pipe {
    constructor(mesh: Mesh, scene: SLTScene<BnsvMainEvents>);
    static basic: Material;
    event: TEvent;
    /**开始的进程 */
    private gsap0;
    /**水在管内流动动画 */
    private gsap_active;
    /**当前水流状态  0表示管内无水 1表示充水完成  2表示充水中  3表示正在退水*/
    private state;
    /**管道长度 */
    private length;
    /**水流材质 */
    readonly material: MaterialPipeWater2;
    /**管道 */
    mesh: Mesh;
    /**水流管道mesh */
    water: Mesh;
    getState(): 0 | 3 | 1 | 2;
    /** */
    set direction(num: -1 | 1);
    /**控制管道和水流显影 */
    onVisible(flag: boolean): void;
    /**执行进程
     * @param program程序代码  0表示排水 1表示充水 2瞬间清空水管 3瞬间完成充水
     */
    execute(program: 0 | 1 | 2 | 3): any;
    /**进程
     * @param start 0 开始点
     * @param end 1 结束点
    */
    private progress;
    /**进行流动动画进程 */
    private active;
    /**下一帧触发事件
     *
    */
    private nextFrame;
    /**销毁管道 */
    kill(): void;
}
