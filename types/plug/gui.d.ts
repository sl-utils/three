export interface GUICtrParam<T> {
    /**此调试项的名称 */
    name: string;
    /**被控制的属性名(可通过 . 获取更深层级) */
    param: string;
    /**选项数据(增设选择项) */
    items?: Object;
    /**颜色采样(增设颜色配置) */
    ifColor?: boolean;
    /**数值设置 [最小值,最大值,单步大小] */
    ifNums?: [number | undefined, number | undefined, number | undefined];
    /**点击回调 */
    callback?: Function;
    /**是否监听 */
    listen?: boolean;
    /**变更回调事件 */
    change?: Function;
}
export declare class Gui {
    private static gui;
    /**已经添加的控制 */
    private static folders;
    /**添加GUI文件夹控制
     * @param obj 要控制的对象
     * @param name 文件夹名称
     */
    static on<T>(obj: T, name: string, ctrs: GUICtrParam<T>[]): void;
    /**添加GUI文件夹基础控制
     * @param obj 要控制的对象
     * @param name 文件夹名称
     */
    static onGuiFolderBase(mesh: any, name: string, min?: number, max?: number): void;
}
