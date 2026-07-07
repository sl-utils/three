import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { BufferGeometry, CubeTexture, CubeTextureLoader, DataTexture, Group, NormalBufferAttributes, Object3DEventMap, ObjectLoader, Texture } from 'three'
import { FontLoader, RGBELoader } from 'three/examples/jsm/Addons.js';


/**资源加载管理器 
 * @description 防止重复构建多个同类型加载器
 * */
export class Loaders {
    // draco
    private static _dracoLoader: DRACOLoader;
    // gltf
    private static _gltfLoader: GLTFLoader;
    // gltf
    private static _objLoader: ObjectLoader;
    // FBX
    private static _fbxLoader: FBXLoader;
    //cube
    private static _cubeTextureLoader: CubeTextureLoader;
    //fone
    private static _fontLoader: FontLoader;
    /** */
    private static _rgbeLoader: RGBELoader;
    /**获取draco */
    public static get dracoLoader() {
        if (!this._dracoLoader) {
            this._dracoLoader = new DRACOLoader()
            this._dracoLoader.setDecoderPath('../../Assets/js/draco/')
        }
        return this._dracoLoader
    }
    /**获取gltf模型加载器 */
    public static get gltfLoader() {
        if (!this._gltfLoader) {
            this._gltfLoader = new GLTFLoader()
            this._gltfLoader.setDRACOLoader(this.dracoLoader)
        }
        return this._gltfLoader
    }
    /**获取FBX加载器 */
    public static get fbxLoader() {
        if (!this._fbxLoader) {
            this._fbxLoader = new FBXLoader()
        }
        return this._fbxLoader
    }
    /**CubeTextureLoader */
    public static get cubeTextureLoader() {
        if (!this._cubeTextureLoader) {
            this._cubeTextureLoader = new CubeTextureLoader();
        }
        return this._cubeTextureLoader
    }
    /**获取FontLoader */
    public static get fontLoader() {
        if (!this._fontLoader) {
            this._fontLoader = new FontLoader()
        }
        return this._fontLoader
    }
    /**获取RGBELoader */
    public static get rgbeLoader() {
        if (!this._rgbeLoader) {
            this._rgbeLoader = new RGBELoader()
        }
        return this._rgbeLoader
    }
    /**获取ObjectLoader */
    public static get objLoader() {
        if (!this._objLoader) {
            this._objLoader = new ObjectLoader()
        }
        return this._objLoader
    }
}