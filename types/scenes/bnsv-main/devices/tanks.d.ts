import { Group, Object3D } from 'three';
import { SLTScene } from 'src/core';
/**所有的罐体 */
export declare class Tanks {
    private scene;
    constructor(scene: SLTScene);
    /**集合体 */
    readonly container: Group<import("three").Object3DEventMap>;
    /**相关mesh */
    private meshs;
    /**两个罐体材质 */
    private materials;
    /**两个罐体配置 */
    private positions;
    /**水位线最低和最高配置 */
    private config;
    /**添加罐体*/
    addTanks(scene: Object3D): void;
    /**改变罐体透明度显示水位 */
    onChangeStatus(status: any[]): void;
    /**从多系统跳转过来时需要添加监听 */
    onOpenEvent(scene: SLTScene): void;
    private gui;
}
