import { SLTScene, TEvent } from '../..';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { BufferGeometry, CubeTexture, DataTexture, Group, NormalBufferAttributes, Object3DEventMap, Texture } from 'three';
import { IndexDB } from './indexDB';
import { Loaders } from './loaders';
import type { Font } from 'three/examples/jsm/Addons.js';
import { Tloader, TResourceCube, TResourceInfo, TResourceItems, TResourceOther, TResourceType } from 'src/types';
/**资源管理类（内置资源加载器） */
export class TResource {
	constructor(event: TEvent) {
		this.event = event;
		this.setLoaders();
	}
	/**事件触发器 */
	public readonly event: TEvent;
	/**本地数据库 */
	private indexDB: IndexDB = new IndexDB();
	/**资源加载器 */
	private readonly loaders: Tloader[] = [];
	/**将要加载资源的数目 */
	private toLoad: number = 0;
	/**已经加载资源的数目 */
	private loaded: number = 0;
	/**加载好的资源(key值是资源的name) */
	public readonly items: TResourceItems = SLTScene.resources;
	/**
	 * 设置资源加载器
	 */
	private setLoaders() {
		// Images
		this.loaders.push({
			types: ['texture', 'image'],
			action: async (_resource: TResourceOther) => {
				const response = await fetch(_resource.src);
				const blob = await response.blob();
				this.fileLoadEnd(_resource, blob);
			},
		});
		// Draco
		this.loaders.push({
			types: ['drc'],
			action: (_resource: TResourceOther) => {
				Loaders.dracoLoader.load(_resource.src, (_data) => {
					this.fileLoadEnd(_resource, _data);
				});
			},
		});
		// GLTF
		this.loaders.push({
			types: ['gltf'],
			action: (_resource: TResourceOther) => {
				Loaders.gltfLoader.load(_resource.src, (_data) => {
					this.fileLoadEnd(_resource, _data);
				});
			},
		});
		// FBX
		this.loaders.push({
			types: ['fbx'],
			action: (_resource: TResourceOther) => {
				Loaders.fbxLoader.load(_resource.src, (_data) => {
					this.fileLoadEnd(_resource, _data);
				});
			},
		});
		this.loaders.push({
			types: ['cube'],
			action: (_resource: TResourceCube) => {
				Loaders.cubeTextureLoader.load(_resource.src, (_data) => {
					this.fileLoadEnd(_resource, _data);
				});
			},
		});
		this.loaders.push({
			types: ['font'],
			action: (_resource: TResourceOther) => {
				Loaders.fontLoader.load(_resource.src, (_data) => {
					this.fileLoadEnd(_resource, _data);
				});
			},
		});
		/**HDR */
		this.loaders.push({
			types: ['hdr'],
			action: (_resource: TResourceOther) => {
				Loaders.rgbeLoader.load(_resource.src, (_data) => {
					this.fileLoadEnd(_resource, _data);
				});
			},
		});
	}
	/**
	 * 加载资源
	 * @param resources  要加载的资源数组
	 * @param flag 是否是加载延迟资源
	 */
	public load(resources: TResourceInfo[] = []): void {
		resources.forEach(async (resource) => {
			this.toLoad++;
			if (this.items[resource.name]) {
				this.loaded++;
				return;
			}
			// const result = await IndexDB.onGetResoure(resource.name)
			// if (result) {
			//     this.fileLoadEnd(resource, result.data)
			//     return
			// }
			const type = this.getResourceType(resource);
			resource.type = type;
			const loader = this.loaders.find((loader) => loader.types.find((e) => e === type));
			if (loader) loader.action(resource);
		});
		this.progress();
	}
	/**重置计数并进行资源加载
	 * @param resources  要加载的资源数组
	 * @param flag 是否是加载延迟资源
	 */
	public reload(_resources: TResourceInfo[] = []) {
		this.toLoad = 0;
		this.loaded = 0;
		_resources = _resources.filter((e) => e);
		return this.load(_resources);
	}
	/**单个资源文件加载完成*/
	private async fileLoadEnd(
		_resource: TResourceInfo,
		_data:
			| Blob
			| GLTF
			| Group<Object3DEventMap>
			| CubeTexture
			| DataTexture
			| Font
			| BufferGeometry<NormalBufferAttributes>
			| string
			| ArrayBuffer
	) {
		// this.indexDB.onSaveResoure(_resource, _data);
		// console.log(_resource)
		const { items } = this,
			{ name, type, ifDelay } = _resource;
		let data: any = _data;
		if (type === 'texture') {
			const imageUrl = URL.createObjectURL(_data as Blob);
			const img = new Image();
			img.src = imageUrl;
			data = new Texture(img);
			data.needsUpdate = true;
		} else if (type === 'image') {
			const imageUrl = URL.createObjectURL(_data as Blob);
			data = new Image();
			data.src = imageUrl;
		}
		items[name] = data;
		this.loaded++;
		/**延迟加载不要触发事件 */
		if (!ifDelay) this.progress();
	}
	/**资源加载进度计算*/
	private progress() {
		/**防止后续注册的事件无法正确监听触发 */
		requestAnimationFrame((e) => {
			const { loaded, toLoad, items } = this;
			if (toLoad == 0) return;
			/**资源加载进度 */
			this.event.trigger('PROGRESS', [toLoad == 0 ? 1 : loaded / toLoad]);
			if (loaded === toLoad)
				/**资源加载完成 */
				this.event.trigger('END');
		});
	}
	/**根据资源信息确定类型 */
	private getResourceType(_resource: TResourceInfo): TResourceType {
		const { type, name, src } = _resource;
		if (type) return type;
		const types: TResourceType[] = ['cube', 'texture', 'image', 'drc', 'gltf', 'fbx', 'font', 'hdr'],
			start = name.toLocaleLowerCase();
		const find = types.find((type) => start.startsWith(type));
		if (find) return find;
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
