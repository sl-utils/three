import { AnimationClip, BufferGeometry, Camera, CubeTexture, DataTexture, Group, NormalBufferAttributes, Object3DEventMap } from "three";
import { Font, GLTF } from "three/examples/jsm/Addons.js";
import { TResourceInfo } from "src/types";
/**数据库--3D相关 */
interface DBThree {
    instance: IDBDatabase | undefined;
    name: string;
    version: number;
    isReady: boolean;
    /**Store表明 */
    storeName: string;
    /**Store表 */
    store: IDBObjectStore | undefined;
}
/**数据库相关配置*/
export declare const DB: DBThree;
export declare class IndexDB {
    constructor();
    /** 初始化数据库 */
    onInitDatabase(): Promise<DBThree>;
    /**存储资源到数据库
     * @param name 资源名称
     * @param resource 资源内容
     * @param type 资源类型
     */
    onSaveResoure(resource: TResourceInfo, _data: Blob | GLTF | Group<Object3DEventMap> | CubeTexture | DataTexture | Font | BufferGeometry<NormalBufferAttributes> | string | ArrayBuffer): Promise<unknown>;
    /**存储资源到数据库
     * @param name 资源名称
     * @param resource 资源内容
     * @param type 资源类型
     */
    onGetResoure(name: string, type?: string): Promise<DBStore>;
    /**存储GLTF解析后的数据 */
    private storeGLTF;
    private serializeObject;
}
type DBStore = {
    /**资源名称 */
    name: string;
} & (StoreGLTF | StoreBlob | StoreHDR);
interface StoreHDR {
    type: 'hdr';
    blob: Blob;
}
interface StoreBlob {
    type: 'image' | 'texture' | 'cube';
    blob: Blob;
}
/**数据库存储的资源 */
type StoreGLTF = {
    /**资源类型 */
    type: 'gltf';
    scene: string;
    scenes: string[];
    cameras: Camera[];
    animations: AnimationClip[];
    asset: {
        copyright?: string;
        generator?: string;
        version?: string;
        minVersion?: string;
        extensions?: any;
        extras?: any;
    };
};
export {};
