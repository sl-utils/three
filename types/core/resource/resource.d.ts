import { TEvent } from '../..';
import { TResourceInfo, TResourceItems } from 'src/types';
/**资源管理类（内置资源加载器） */
export declare class TResource {
    constructor(event: TEvent);
    /**事件触发器 */
    readonly event: TEvent;
    /**本地数据库 */
    private indexDB;
    /**资源加载器 */
    private readonly loaders;
    /**将要加载资源的数目 */
    private toLoad;
    /**已经加载资源的数目 */
    private loaded;
    /**加载好的资源(key值是资源的name) */
    readonly items: TResourceItems;
    /**
     * 设置资源加载器
     */
    private setLoaders;
    /**
     * 加载资源
     * @param resources  要加载的资源数组
     * @param flag 是否是加载延迟资源
     */
    load(resources?: TResourceInfo[]): void;
    /**重置计数并进行资源加载
     * @param resources  要加载的资源数组
     * @param flag 是否是加载延迟资源
     */
    reload(_resources?: TResourceInfo[]): void;
    /**单个资源文件加载完成*/
    private fileLoadEnd;
    /**资源加载进度计算*/
    private progress;
    /**根据资源信息确定类型 */
    private getResourceType;
}
