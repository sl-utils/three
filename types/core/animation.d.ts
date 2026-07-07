import { AnimationAction, AnimationMixer, Object3D, Object3DEventMap } from "three";
export declare class Animation {
    constructor();
    /**所有的动画混合器 */
    mixers: {
        [K in string]: AnimationMixer;
    };
    /**所有的动画动作 */
    actions: {
        [K in string]: {
            [I in string]: AnimationAction;
        };
    };
    /**所有的正在播放的动画 */
    currents: {
        [K in string]: AnimationAction;
    };
    /**将模型动画添加到动画类
     * @param key 模型动画组的id
     * @param root  模型
     */
    onAddMixer(key: string, root: Object3D<Object3DEventMap>): void;
    /**播放动画
     * @param key 模型动画组的id
     * @param index 动画的索引
     * @param loop 是否循环
     */
    play(key: string, index: number, loop?: boolean): void;
}
