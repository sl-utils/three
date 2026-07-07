import { AnimationAction, AnimationClip, AnimationMixer, AnimationObjectGroup, Object3D, Object3DEventMap } from "three";

export class Animation {
    constructor() { }
    /**所有的动画混合器 */
    public mixers: { [K in string]: AnimationMixer } = Object.create(null);
    /**所有的动画动作 */
    public actions: { [K in string]: { [I in string]: AnimationAction } } = Object.create(null);
    /**所有的正在播放的动画 */
    public currents: { [K in string]: AnimationAction } = Object.create(null);

    /**将模型动画添加到动画类
     * @param key 模型动画组的id
     * @param root  模型
     */
    public onAddMixer(key: string, root: Object3D<Object3DEventMap>) {
        const mixer = this.mixers[key] = new AnimationMixer(root),
            actions = this.actions[key] = this.actions[key] || Object.create(null);
        const animations: AnimationClip[] = root.animations;
        animations.forEach((clip, i) => {
            const action = mixer.clipAction(clip);
            actions[i] = action;
        });
    }

    /**播放动画
     * @param key 模型动画组的id
     * @param index 动画的索引
     * @param loop 是否循环
     */
    public play(key: string, index: number, loop = true) {
        const mixer = this.mixers[key], current = this.currents[key],
            actions = this.actions[key],
            action = actions[index];
        action.reset()
        action.play();
        if (current) action.crossFadeFrom(current, 1, true);
        this.currents[key] = action;
    }
}