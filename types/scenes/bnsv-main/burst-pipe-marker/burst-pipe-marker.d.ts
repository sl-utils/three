import { TextureLoader, Vector3 } from 'three';
import { SLTScene } from 'src/core/scene.js';
export interface BurstPipeMarkerConfig {
    id: string;
    position: Vector3;
    node1: string;
    node2: string;
    L1: number;
    L: number;
    content?: string;
    direction: 'horizontal' | 'vertical' | 'unknown';
    adjacentPoints?: Vector3[];
    segmentIndex?: number;
}
export declare class BurstPipeMarkerManager {
    constructor(scene: SLTScene<any>);
    markerConfigs: BurstPipeMarkerConfig[];
    textureLoader: TextureLoader;
    private scene;
    private markers;
    private hoveredMarker;
    /**更新爆管点标注 */
    updateMarkers(markerConfigs: BurstPipeMarkerConfig[]): void;
    /**添加单个爆管点3D标注 */
    private addMarker;
    /**设置鼠标事件 */
    private setupMouseEvents;
    /** 点击爆管点标记 */
    private onMarkerClick;
    /**鼠标移入爆管点标记 */
    private onMarkerHover;
    /**鼠标移出爆管点标记 */
    private onMarkerLeave;
    /**清除所有爆管点标注 */
    clearMarkers(): void;
    /**显示/隐藏所有爆管点标注 */
    setMarkersVisible(visible: boolean): void;
    /**获取所有爆管点标注的ID */
    getMarkerIds(): string[];
    /**
     * 获取爆管点标注的世界位置
     */
    getMarkerWorldPosition(id: string): Vector3 | null;
    /**
     * 销毁管理器
     */
    destroy(): void;
}
