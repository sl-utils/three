import { AnimationMixer } from "three";
export class Animation {
    constructor() {
        this.mixers = Object.create(null);
        this.actions = Object.create(null);
        this.currents = Object.create(null);
    }
    onAddMixer(key, root) {
        const mixer = this.mixers[key] = new AnimationMixer(root), actions = this.actions[key] = this.actions[key] || Object.create(null);
        const animations = root.animations;
        animations.forEach((clip, i) => {
            const action = mixer.clipAction(clip);
            actions[i] = action;
        });
    }
    play(key, index, loop = true) {
        const mixer = this.mixers[key], current = this.currents[key], actions = this.actions[key], action = actions[index];
        action.reset();
        action.play();
        if (current)
            action.crossFadeFrom(current, 1, true);
        this.currents[key] = action;
    }
}
//# sourceMappingURL=animation.js.map