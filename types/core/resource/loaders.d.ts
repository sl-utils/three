import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { CubeTextureLoader, ObjectLoader } from 'three';
import { FontLoader, RGBELoader } from 'three/examples/jsm/Addons.js';
/**资源加载管理器
 * @description 防止重复构建多个同类型加载器
 * */
export declare class Loaders {
    private static _dracoLoader;
    private static _gltfLoader;
    private static _objLoader;
    private static _fbxLoader;
    private static _cubeTextureLoader;
    private static _fontLoader;
    /** */
    private static _rgbeLoader;
    /**获取draco */
    static get dracoLoader(): DRACOLoader;
    /**获取gltf模型加载器 */
    static get gltfLoader(): GLTFLoader;
    /**获取FBX加载器 */
    static get fbxLoader(): FBXLoader;
    /**CubeTextureLoader */
    static get cubeTextureLoader(): CubeTextureLoader;
    /**获取FontLoader */
    static get fontLoader(): FontLoader;
    /**获取RGBELoader */
    static get rgbeLoader(): RGBELoader;
    /**获取ObjectLoader */
    static get objLoader(): ObjectLoader;
}
