import { resolve } from "path";
import { Loaders } from "./loaders";
import { AnimationClip, BufferGeometry, Camera, CubeTexture, DataTexture, Group, NormalBufferAttributes, Object3DEventMap } from "three";
import { Font, GLTF } from "three/examples/jsm/Addons.js";
import { TResourceInfo } from "src/types";


type DBThreeType = 'Image' | ''

/**数据库存储的资源 */
interface DBStoreGLTF {
    /**资源名称 */
    sourceName: string,
    /**资源类型 */
    type: 'gltf'
    scene: string,
    scenes: string[],
    cameras: Camera[],
    animations: AnimationClip[],
    asset: {
        copyright?: string;
        generator?: string;
        version?: string;
        minVersion?: string;
        extensions?: any;
        extras?: any;
    },
}

/**数据库--3D相关 */
interface DBThree {
    instance: IDBDatabase | undefined,
    name: string,
    version: number,
    isReady: boolean,
    /**Store表明 */
    storeName: string,
    /**Store表 */
    store: IDBObjectStore | undefined,
}
/**数据库相关配置*/
export const DB: DBThree = {
    instance: undefined, // 数据库实例
    name: 'DatabaseThree',
    storeName: 'resource',
    // 数据库表
    store: undefined,
    version: 1,
    isReady: false
}

export class IndexDB {
    constructor() { }
    /** 初始化数据库 */
    public async onInitDatabase(): Promise<DBThree> {
        if (DB.isReady) return DB;
        await new Promise((resolve, _) => {
            const request = indexedDB.open(DB.name, DB.version);
            request.onerror = () => {
                DB.isReady = false;
            };
            request.onsuccess = () => {
                DB.instance = request.result;
                DB.isReady = true;
                resolve(DB);
            };
            request.onupgradeneeded = () => {
                const db = DB.instance = request.result;
                // 检查messages表是否存在
                if (!db.objectStoreNames.contains('resource')) {
                    // 创建messages表，使用自增ID作为主键
                    const store = db.createObjectStore('resource', { keyPath: 'name', autoIncrement: false });
                    // 创建索引
                    // store.createIndex('sourceName', 'sourceName', { unique: false });
                } else {
                    // 检查是否需要添加provider索引
                    const transaction = request.transaction!;
                    const store = transaction.objectStore('resource');
                    // 检查provider索引是否存在
                    // if (!store.indexNames.contains('sourceName')) {
                    // 添加provider索引
                    // store.createIndex('sourceName', 'sourceName', { unique: false });
                    // }
                }
            };
        })
        return DB;
    }
    /**存储资源到数据库
     * @param name 资源名称
     * @param resource 资源内容
     * @param type 资源类型
     */
    public async onSaveResoure(resource: TResourceInfo, _data: Blob | GLTF | Group<Object3DEventMap> | CubeTexture | DataTexture | Font | BufferGeometry<NormalBufferAttributes> | string | ArrayBuffer) {
        const { src, type } = resource, name: string = Array.isArray(src) ? src[0] : src;
        const save = await this.onGetResoure(name)
        if (save) return '';
        let storeDB: DBStore;
        if (type == 'image' || type == 'texture') {
            storeDB = { name, type, blob: _data as Blob }
        } else if (type == 'gltf') {
            const gltf = this.storeGLTF(_data as GLTF)
            storeDB = { name, ...gltf }
        } if (type == 'hdr') {
            console.log(_data as DataTexture)
            storeDB = { name, type, blob: _data as Blob }
        }
        if (!DB.isReady || !DB.instance) await this.onInitDatabase();
        const result = await new Promise((resolve, reject) => {
            try {
                const transaction = DB.instance!.transaction(['resource'], 'readwrite');
                const store = transaction.objectStore('resource');
                // 添加到消息存储
                const request = store.add(storeDB);
                request.onsuccess = () => {
                    console.log('消息已保存到数据库');
                    resolve(resource);
                };
                request.onerror = (event) => {
                    console.error('保存消息到数据库失败:', event.target);
                    reject(event.target);
                };
            } catch (error) {
                console.error('保存消息到数据库时出错:', error);
                reject(error);
            }
        });
        console.log(result)
        return result;
    }
    /**存储资源到数据库
     * @param name 资源名称
     * @param resource 资源内容
     * @param type 资源类型
     */
    public async onGetResoure(name: string, type?: string): Promise<DBStore> {
        if (!DB.isReady || !DB.instance) await this.onInitDatabase();
        const result: DBStore = await new Promise((resolve, reject) => {
            try {
                const store = DB.instance!.transaction(['resource'], 'readwrite').objectStore('resource');
                const request = store.get(name);
                request.onsuccess = () => {
                    const result: DBStore = request.result;
                    // if (result) this.parserAll(result)
                    resolve(result);
                };
            } catch (error) {
                console.error('保存消息到数据库时出错:', error);
                reject(error);
            }
        });
        return result;
    }




    /**存储GLTF解析后的数据 */
    private storeGLTF(gltf: GLTF): StoreGLTF {
        // 对于GLTF，我们存储其原始解析数据而非完全序列化的对象
        // 这包括scene, scenes, cameras, animations等核心属性
        return {
            type: 'gltf',
            scene: this.serializeObject(gltf.scene),
            scenes: gltf.scenes.map(scene => this.serializeObject(scene)),
            cameras: gltf.cameras || [],
            animations: gltf.animations || [],
            asset: gltf.asset || {},
        };
    }
    // 辅助方法：序列化Three.js对象
    private serializeObject(object): string {
        const serializer = Loaders.objLoader;
        return JSON.stringify(serializer.parse(object));
    }
}

type DBStore = {
    /**资源名称 */
    name: string,
} & (
        StoreGLTF | StoreBlob | StoreHDR
    )

interface StoreHDR {
    type: 'hdr'
    blob: Blob
}
interface StoreBlob {
    type: 'image' | 'texture' | 'cube'
    blob: Blob
}
/**数据库存储的资源 */
type StoreGLTF = {
    /**资源类型 */
    type: 'gltf'
    scene: string,
    scenes: string[],
    cameras: Camera[],
    animations: AnimationClip[],
    asset: {
        copyright?: string;
        generator?: string;
        version?: string;
        minVersion?: string;
        extensions?: any;
        extras?: any;
    },
}