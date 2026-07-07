import { PipePart1 } from "./pipe-part-1";
import { PipePart2 } from "./pipe-part-2";
import { PipePart3 } from "./pipe-part-3";
import { PipePart4 } from "./pipe-part-4";
import { PipePart5 } from "./pipe-part-5";
import { PipePart6 } from "./pipe-part-6";
import { PipePart7 } from "./pipe-part-7";
export class PipeLines {
    constructor() {
        this.part1 = new PipePart1();
        this.part2 = new PipePart2();
        this.part3 = new PipePart3();
        this.part4 = new PipePart4();
        this.part5 = new PipePart5();
        this.part6 = new PipePart6();
        this.part7 = new PipePart7();
    }
    setSwitch(devices) {
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
    compute() {
        const { part1, part2, part3, part4, part5, part6, part7 } = this;
        const allPaths = part5.enterPart(part5.nodes[4], this);
        return allPaths;
    }
}
//# sourceMappingURL=pipe-lines.js.map