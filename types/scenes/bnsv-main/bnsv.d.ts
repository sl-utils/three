import { Vector3 } from 'three';
import { SLTScene } from 'src/core';
/**场景博纳斯威与页面交互类 */
export declare class SceneBnsvMain extends SLTScene<BnsvMainEvents> {
    constructor(html: HTMLElement | string, isH5?: boolean);
    /**加载3D动画 */
    private load;
    /**模型加载类 */
    private models;
    /**场景事件类 */
    private events;
    /**其余子系统 */
    private systemOther;
    /**当前场景是否是主场景 */
    private sceneId;
    /**加载完成标识 */
    private flagLoaded;
    /** */
    protected init(): void;
    /**确定场景根据系统名称 */
    onSceneBySysName(name: string): void;
    /**相机移动 */
    onSceneMove(dir: 'Forward' | 'Backward' | 'Left' | 'Right' | 'Up' | 'Down' | 'Close', flag?: boolean): void;
    /** */
    onCameraChange(): void;
    /**设置节点数据 */
    onInstallNodeDate(status: any[]): void;
    /**设备状态变化
     * @param name 设备名称
     * @param 状态
     */
    onDeviceChange(name: string, state: boolean): void;
    /**切换场景相机到指定位置
     * @param installNode 安装节点
     */
    onCameraByName(name: string): void;
    kill(): void;
    switchSceneA(type: 'A' | 'A2'): void;
    ToBurstPipe(position: Vector3): void;
    /** 让相机看向指定位置 */
    lookAtPosition(position: Vector3, duration?: number): void;
    /**调试帮助器 */
    private onDebug;
    /**状态暂存并清空labels并隐藏所有container */
    private stage;
    /**主系统 */
    private addMainSys;
    private ifNeedRotateHDR;
    /**添加另外的子系统 */
    private addOtherSys;
    /**通过子系统名称获取应加载资源 */
    private getResBySysName;
    /**主场景准备好后触发 */
    private readyMainScene;
    /**单设备场景准备好后触发 */
    private readySigleScene;
    /**主场景初始视角 */
    private initCamera;
    private clearHDR;
    private addHDR;
    /**旋转环境贴图 */
    private rotateHDR;
}
