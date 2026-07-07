import { SLTScene } from '../../core';
import { TOptScene } from '../../types';
export declare class BnsvDevice extends SLTScene {
    constructor(ele: HTMLElement | string, options?: TOptScene);
    private name;
    private box3;
    private v3;
    private positions;
    private modelConfig;
    /**显示指定模型 */
    onShowDevice(name: string): void;
    protected onResourceEnd(): void;
}
