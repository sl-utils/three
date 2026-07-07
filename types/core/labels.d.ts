import { Object3D, Vector3 } from "three";
import { CSS2DObject, CSS3DObject } from "three/examples/jsm/Addons.js";
import { SLTScene } from "./scene";
import { TOptLabel } from "src/types";
/**2D、3D标签 */
export declare class TLabels {
    private tscene;
    constructor(tscene: SLTScene);
    /**2D渲染器 */
    private _renderer2D;
    /**3D渲染器 */
    private _renderer3D;
    /**2D标签渲染器 */
    private get renderer2D();
    /**3D标签渲染器 */
    private get renderer3D();
    /**用于标识是否添加过3D标签 */
    private if3DAdded;
    /**用于标识是否添加过2D标签 */
    private if2DAdded;
    /**存储标签的对象 */
    private readonly cssobjects;
    /**标签容器 */
    readonly container: Object3D;
    /**暂存显示的id */
    private stagedIds;
    /**暂存当前显示的label数组 */
    onStaged(): void;
    /**暂存当前显示的label数组 */
    onRestore(): void;
    /**如果暂存中存在该id则再次显示此id */
    onShowStagedIds(ids: string | string[]): void;
    /**获取当前显示的label数组 */
    onGetShowIds(): string[];
    /**设置指定lable的位置
     * @param ids 指定的id或id组
     * @param position 指定位置
    */
    onSetLabelPosition(ids: string | string[], position: Vector3): void;
    /**控制label的显示和隐藏
     * @param shows 显示的label的id(为undefined时不改变当前状态,为[]时显示所有,特定值时显示特定项)
     * @param hides 隐藏的label的id(为undefined时不改变当前状态,为[]时隐藏所有,特定值时隐藏特定项)
    */
    onLabelsCtr(shows?: string[], hides?: string[]): void;
    /**改变指定的label的可视状态
     * @param id 指定的label,不传则所有的label的都会变更
     * @param visible true为显示 false为隐藏
    */
    private visible;
    /**添加2D标签或3D标签 （标签默认会底部中心位置和指定的三维点一直保持对其） */
    onAddLabel(opt: TOptLabel): CSS2DObject | CSS3DObject;
    /**渲染所有的标签 */
    render(): void;
    /**调整所有的标签的大小 */
    resize(): void;
    /**销毁所有的标签 */
    onDestroyAll(): void;
}
