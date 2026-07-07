import { Loaders } from "./loaders";
export const DB = {
    instance: undefined,
    name: 'DatabaseThree',
    storeName: 'resource',
    store: undefined,
    version: 1,
    isReady: false
};
export class IndexDB {
    constructor() { }
    async onInitDatabase() {
        if (DB.isReady)
            return DB;
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
                if (!db.objectStoreNames.contains('resource')) {
                    const store = db.createObjectStore('resource', { keyPath: 'name', autoIncrement: false });
                }
                else {
                    const transaction = request.transaction;
                    const store = transaction.objectStore('resource');
                }
            };
        });
        return DB;
    }
    async onSaveResoure(resource, _data) {
        const { src, type } = resource, name = Array.isArray(src) ? src[0] : src;
        const save = await this.onGetResoure(name);
        if (save)
            return '';
        let storeDB;
        if (type == 'image' || type == 'texture') {
            storeDB = { name, type, blob: _data };
        }
        else if (type == 'gltf') {
            const gltf = this.storeGLTF(_data);
            storeDB = { name, ...gltf };
        }
        if (type == 'hdr') {
            console.log(_data);
            storeDB = { name, type, blob: _data };
        }
        if (!DB.isReady || !DB.instance)
            await this.onInitDatabase();
        const result = await new Promise((resolve, reject) => {
            try {
                const transaction = DB.instance.transaction(['resource'], 'readwrite');
                const store = transaction.objectStore('resource');
                const request = store.add(storeDB);
                request.onsuccess = () => {
                    console.log('消息已保存到数据库');
                    resolve(resource);
                };
                request.onerror = (event) => {
                    console.error('保存消息到数据库失败:', event.target);
                    reject(event.target);
                };
            }
            catch (error) {
                console.error('保存消息到数据库时出错:', error);
                reject(error);
            }
        });
        console.log(result);
        return result;
    }
    async onGetResoure(name, type) {
        if (!DB.isReady || !DB.instance)
            await this.onInitDatabase();
        const result = await new Promise((resolve, reject) => {
            try {
                const store = DB.instance.transaction(['resource'], 'readwrite').objectStore('resource');
                const request = store.get(name);
                request.onsuccess = () => {
                    const result = request.result;
                    resolve(result);
                };
            }
            catch (error) {
                console.error('保存消息到数据库时出错:', error);
                reject(error);
            }
        });
        return result;
    }
    storeGLTF(gltf) {
        return {
            type: 'gltf',
            scene: this.serializeObject(gltf.scene),
            scenes: gltf.scenes.map(scene => this.serializeObject(scene)),
            cameras: gltf.cameras || [],
            animations: gltf.animations || [],
            asset: gltf.asset || {},
        };
    }
    serializeObject(object) {
        const serializer = Loaders.objLoader;
        return JSON.stringify(serializer.parse(object));
    }
}
//# sourceMappingURL=indexDB.js.map