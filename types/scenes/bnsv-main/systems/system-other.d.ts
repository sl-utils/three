import { Group } from 'three';
import { SLTScene } from '../../../core/scene';
import { TResourceInfo } from 'src/types';
/**单个的子系统 */
export declare class SystemOther {
    private scene;
    constructor(scene: SLTScene<BnsvMainEvents>);
    private fig;
    /**当前显示的A类场景类型 */
    private currentSceneType;
    /**是否启用 */
    enabled: boolean;
    /** */
    private transformControls;
    /**所有物体集合 */
    container: Group;
    /**罐体A */
    private tankA;
    /**罐体A2 */
    private tankA2;
    /**用于标记模型是否已经添加过到集合 */
    private scenes;
    /**记录模型的初始状态 */
    private states;
    /**系统标识 0水锤消除罐  1调节阀系统  2空气阀系统  3反馈式压力控制展车系统  4水锤在线监测展车系统 */
    private flagSysteam;
    /**要加载或显示的模型名 */
    private names;
    getScene(): SLTScene<BnsvMainEvents>;
    /**暂停子系统 */
    onPause(flag: boolean): void;
    /**加载指定模型
     * @param resources 模型资源
     * @param sysName 系统名称
     */
    onLoadModel(resources: TResourceInfo[]): void;
    /**注册设备监听事件 */
    onDeviceEvent(): void;
    view_target_name: string;
    /**根据id切换视角并展示指定的label
     * @param id 要切换到的视角id
     * @param force 是否强制切换
     */
    onViewSwitch: (id: string, force?: boolean) => void;
    /**
     * 切换A类场景显示
     * @param sceneType 要显示的场景类型
     */
    switchSceneA(sceneType: 'SCENE_A' | 'SCENE_A2'): void;
    /**按进度处理模型 */
    private loadModelProcess;
    /**加载指定模型
     * @param name 模型的关键key
     */
    private onModelLoad;
    /**场景相机和目标配置 */
    private cameraConfig;
    private openEvent;
}
