import { Group } from 'three';
import { SLTScene, TEvent } from '../../..';
export declare class Load {
    private tscene;
    constructor(tscene: SLTScene, isH5: boolean);
    readonly container: Group;
    /**用于区分手机端/PC端的加载动画表现 */
    private isH5;
    /**正交相机 */
    private orth;
    /**本身的加载事件 */
    event: TEvent;
    /**资源加载器 */
    private resource;
    /**字体材质 */
    private logoMaterial;
    /**模型是否已经加载标志 */
    private ifAdded;
    /**按进度处理模型 */
    private loadModelProcess;
    /**加载指定模型
     * @param name 模型的关键key
     */
    private onModelLoad;
    /**开启加载动画 */
    show(): void;
    /**加载完成后隐藏 */
    hide(): void;
    /**设置加载进度 */
    setProgress: (progress: number) => void;
}
