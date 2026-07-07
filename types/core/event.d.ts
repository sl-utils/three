/**事件类 */
export declare class TEvent<T extends string = string> {
    constructor();
    /**注册回调事件
     * key: 事件名.空间名,/事件名.空间名,/事件名.空间名
    */
    cb: any;
    /**事件回调函数集合 */
    private cbs;
    /**执行后注销事件 */
    private onces;
    /**销毁方法 */
    kill(): void;
    /**注册事件
     * @param name 事件名(申明特殊的事件空间用'事件名.事件空间',多个事件'事件名[.事件空间],/'分割),
     * @param callback 事件回调函数
     * @return @type Array<事件名[.事件空间]>
     */
    on(name: T | `${T}.${string}`, callback: Function, once?: boolean): string[];
    /**关闭注销事件
     * @param name 事件名(申明特殊的事件空间用'事件名.事件空间',多个事件'事件名[.事件空间],/'分割),
     */
    off(_names: T | `${T}.${string}` | `.${string}`): false | this;
    /**触发指定事件
    * Trigger
    */
    trigger(_name: T, _args?: any[]): void;
    /**
     * 解析事件名
     */
    private resolveNames;
    /**
     * 解析事件名和事件空间
     */
    private resolveName;
}
