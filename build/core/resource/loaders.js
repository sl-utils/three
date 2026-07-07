import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { CubeTextureLoader, ObjectLoader } from 'three';
import { FontLoader, RGBELoader } from 'three/examples/jsm/Addons.js';
export class Loaders {
    static get dracoLoader() {
        if (!this._dracoLoader) {
            this._dracoLoader = new DRACOLoader();
            this._dracoLoader.setDecoderPath('../../Assets/js/draco/');
        }
        return this._dracoLoader;
    }
    static get gltfLoader() {
        if (!this._gltfLoader) {
            this._gltfLoader = new GLTFLoader();
            this._gltfLoader.setDRACOLoader(this.dracoLoader);
        }
        return this._gltfLoader;
    }
    static get fbxLoader() {
        if (!this._fbxLoader) {
            this._fbxLoader = new FBXLoader();
        }
        return this._fbxLoader;
    }
    static get cubeTextureLoader() {
        if (!this._cubeTextureLoader) {
            this._cubeTextureLoader = new CubeTextureLoader();
        }
        return this._cubeTextureLoader;
    }
    static get fontLoader() {
        if (!this._fontLoader) {
            this._fontLoader = new FontLoader();
        }
        return this._fontLoader;
    }
    static get rgbeLoader() {
        if (!this._rgbeLoader) {
            this._rgbeLoader = new RGBELoader();
        }
        return this._rgbeLoader;
    }
    static get objLoader() {
        if (!this._objLoader) {
            this._objLoader = new ObjectLoader();
        }
        return this._objLoader;
    }
}
//# sourceMappingURL=loaders.js.map