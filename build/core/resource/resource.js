import { SLTScene } from '../..';
import { Texture } from 'three';
import { IndexDB } from './indexDB';
import { Loaders } from './loaders';
export class TResource {
    constructor(event) {
        this.indexDB = new IndexDB();
        this.loaders = [];
        this.toLoad = 0;
        this.loaded = 0;
        this.items = SLTScene.resources;
        this.event = event;
        this.setLoaders();
    }
    setLoaders() {
        this.loaders.push({
            types: ['texture', 'image'],
            action: async (_resource) => {
                const response = await fetch(_resource.src);
                const blob = await response.blob();
                this.fileLoadEnd(_resource, blob);
            },
        });
        this.loaders.push({
            types: ['drc'],
            action: (_resource) => {
                Loaders.dracoLoader.load(_resource.src, (_data) => {
                    this.fileLoadEnd(_resource, _data);
                });
            },
        });
        this.loaders.push({
            types: ['gltf'],
            action: (_resource) => {
                Loaders.gltfLoader.load(_resource.src, (_data) => {
                    this.fileLoadEnd(_resource, _data);
                });
            },
        });
        this.loaders.push({
            types: ['fbx'],
            action: (_resource) => {
                Loaders.fbxLoader.load(_resource.src, (_data) => {
                    this.fileLoadEnd(_resource, _data);
                });
            },
        });
        this.loaders.push({
            types: ['cube'],
            action: (_resource) => {
                Loaders.cubeTextureLoader.load(_resource.src, (_data) => {
                    this.fileLoadEnd(_resource, _data);
                });
            },
        });
        this.loaders.push({
            types: ['font'],
            action: (_resource) => {
                Loaders.fontLoader.load(_resource.src, (_data) => {
                    this.fileLoadEnd(_resource, _data);
                });
            },
        });
        this.loaders.push({
            types: ['hdr'],
            action: (_resource) => {
                Loaders.rgbeLoader.load(_resource.src, (_data) => {
                    this.fileLoadEnd(_resource, _data);
                });
            },
        });
    }
    load(resources = []) {
        resources.forEach(async (resource) => {
            this.toLoad++;
            if (this.items[resource.name]) {
                this.loaded++;
                return;
            }
            const type = this.getResourceType(resource);
            resource.type = type;
            const loader = this.loaders.find((loader) => loader.types.find((e) => e === type));
            if (loader)
                loader.action(resource);
        });
        this.progress();
    }
    reload(_resources = []) {
        this.toLoad = 0;
        this.loaded = 0;
        _resources = _resources.filter((e) => e);
        return this.load(_resources);
    }
    async fileLoadEnd(_resource, _data) {
        const { items } = this, { name, type, ifDelay } = _resource;
        let data = _data;
        if (type === 'texture') {
            const imageUrl = URL.createObjectURL(_data);
            const img = new Image();
            img.src = imageUrl;
            data = new Texture(img);
            data.needsUpdate = true;
        }
        else if (type === 'image') {
            const imageUrl = URL.createObjectURL(_data);
            data = new Image();
            data.src = imageUrl;
        }
        items[name] = data;
        this.loaded++;
        if (!ifDelay)
            this.progress();
    }
    progress() {
        requestAnimationFrame((e) => {
            const { loaded, toLoad, items } = this;
            if (toLoad == 0)
                return;
            this.event.trigger('PROGRESS', [toLoad == 0 ? 1 : loaded / toLoad]);
            if (loaded === toLoad)
                this.event.trigger('END');
        });
    }
    getResourceType(_resource) {
        const { type, name, src } = _resource;
        if (type)
            return type;
        const types = ['cube', 'texture', 'image', 'drc', 'gltf', 'fbx', 'font', 'hdr'], start = name.toLocaleLowerCase();
        const find = types.find((type) => start.startsWith(type));
        if (find)
            return find;
        const ext = ((typeof src === 'string' && src.match(/\.([a-z]+)$/)) || [])[1];
        switch (ext) {
            case 'glb':
            case 'gltf':
                return 'gltf';
            case 'fbx':
                return 'fbx';
            case 'cube':
                return 'cube';
            case 'font':
                return 'font';
            case 'hdr':
                return 'hdr';
            case 'drc':
                return 'drc';
            case 'png':
            case 'jpg':
                return 'image';
            default:
                return 'image';
        }
    }
}
//# sourceMappingURL=resource.js.map