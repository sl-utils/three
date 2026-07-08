import {
	BoxGeometry,
	CanvasTexture,
	FileLoader,
	LinearFilter,
	Mesh,
	MeshBasicMaterial,
	Object3D,
	Object3DEventMap,
	Raycaster,
	Sprite,
	SpriteMaterial,
	SRGBColorSpace,
	TextureLoader,
	Vector2,
	Vector3,
} from 'three';
import lottie from '../../../Assets/js/lottie/lottie513.js';
import { SLTScene } from 'src/core/scene.js';

export interface BurstPipeMarkerConfig {
	id: string;
	position: Vector3;
	node1: string;
	node2: string;
	L1: number;
	L: number;
	content?: string;
	direction: 'horizontal' | 'vertical' | 'unknown';
	adjacentPoints?: Vector3[];
	segmentIndex?: number;
}

export class BurstPipeMarkerManager {
	constructor(scene: SLTScene<any>) {
		this.scene = scene;
		// 创建纹理加载器
		this.textureLoader = new TextureLoader();

		// 添加鼠标事件监听
		this.setupMouseEvents();
	}

	markerConfigs: BurstPipeMarkerConfig[] = [];
	textureLoader: TextureLoader;
	private scene: SLTScene<any>;
	private markers: Map<string, any> = new Map();
	private hoveredMarker: any = null;

	/**更新爆管点标注 */
	public updateMarkers(markerConfigs: BurstPipeMarkerConfig[]): void {
		this.clearMarkers();

		this.markerConfigs = markerConfigs;
		markerConfigs.forEach((config) => {
			this.addMarker(config);
		});
	}

	/**添加单个爆管点3D标注 */
	private async addMarker(config: BurstPipeMarkerConfig) {
		const markerId = `burst_pipe_${config.id}`;
		const markerGroup = new Object3D();
		markerGroup.position.copy(config.position);

		const loader = new FileLoader();
		loader.setResponseType('json');
		loader.load('../../../resource/textures/burst/data.json', (data: any) => {
			if (data.assets) {
				data.assets.forEach((asset: any) => {
					if (asset.u) {
						asset.u = '../../../resource/textures/burst/images/';
					}
				});
			}

			const container = document.createElement('div');
			const dpr = window.devicePixelRatio;
			container.style.width = data.w * dpr + 'px';
			container.style.height = data.h * dpr + 'px';
			document.body.appendChild(container);

			const animation = lottie.loadAnimation({
				container: container,
				animType: 'canvas',
				loop: true,
				autoplay: true,
				animationData: data,
				rendererSettings: { dpr: dpr },
			});

			const texture = new CanvasTexture(animation.container);
			texture.minFilter = LinearFilter;
			texture.generateMipmaps = false;
			texture.colorSpace = SRGBColorSpace;

			animation.addEventListener('enterFrame', function () {
				texture.needsUpdate = true;
			});

			container.style.display = 'none';

			const material = new SpriteMaterial({
				map: texture,
				transparent: true,
				depthTest: true,
				depthWrite: false,
				toneMapped: false,
			});
			const sprite = new Sprite(material);
			const { direction } = config;
			if (direction === 'horizontal') {
				sprite.position.set(0, 0.08, 0);
			} else if (direction === 'vertical') {
				sprite.position.set(-0.08, 0, -0.08);
			}

			sprite.scale.set(0.2, 0.2, 1);
			sprite.renderOrder = 5;

			markerGroup.add(sprite);
			markerGroup.renderOrder = 5;

			this.scene.container.add(markerGroup);
		});

		// 存储配置信息
		markerGroup.userData = {
			isBurstPipe: true,
			config: config,
			markerId: markerId,
		};

		// 添加到场景
		this.markers.set(markerId, markerGroup);
	}

	/**设置鼠标事件 */
	private setupMouseEvents(): void {
		const { scene, scene: {  tcamera } } = this;
		const raycaster = new Raycaster();
		const mouse = new Vector2();

		const rendererDom = this.scene.trenderer.renderer.domElement;

		// 监听鼠标移动
		scene.on('MOUSE_MOVE', (event: MouseEvent) => {
			const rect = rendererDom.getBoundingClientRect();
			mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
			mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

			raycaster.setFromCamera(mouse, tcamera.camera);

			const markerObjects: Object3D[] = [];
			this.markers.forEach((marker) => {
				markerObjects.push(marker);
			});

			const intersects = raycaster.intersectObjects(markerObjects, true);

			if (intersects.length > 0) {
				let burstPipeObject: Object3D | null = null;
				for (const intersect of intersects) {
					let object = intersect.object;
					while (object && !object.userData.isBurstPipe) {
						object = object.parent;
					}
					if (object && object.userData.isBurstPipe) {
						burstPipeObject = object;
						break;
					}
				}

				if (burstPipeObject && burstPipeObject !== this.hoveredMarker) {
					rendererDom.style.cursor = 'pointer';
					this.onMarkerHover(burstPipeObject, event.clientX, event.clientY);
				} else if (!burstPipeObject && this.hoveredMarker) {
					rendererDom.style.cursor = 'default';
					this.onMarkerLeave();
				}
			} else {
				if (this.hoveredMarker) {
					rendererDom.style.cursor = 'default';
					this.onMarkerLeave();
				}
			}
		});

		// 添加点击事件监听
		scene.on('CLICK', (event: MouseEvent) => {
			const rect = rendererDom.getBoundingClientRect();
			mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
			mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

			raycaster.setFromCamera(mouse, tcamera.camera);

			const markerObjects: Object3D[] = [];
			this.markers.forEach((marker) => {
				markerObjects.push(marker);
			});

			const intersects = raycaster.intersectObjects(markerObjects, true);

			if (intersects.length > 0) {
				let burstPipeObject: Object3D | null = null;
				for (const intersect of intersects) {
					let object = intersect.object;
					while (object && !object.userData.isBurstPipe) {
						object = object.parent;
					}
					if (object && object.userData.isBurstPipe) {
						burstPipeObject = object;
						break;
					}
				}

				if (burstPipeObject) {
					this.onMarkerClick(burstPipeObject);
				}
			}
		});
	}

	/** 点击爆管点标记 */
	private onMarkerClick(marker: Object3D): void {
		const config = marker.userData.config;

		// 触发点击事件，传递爆管点配置信息
		this.scene.trigger('burst_pipe_marker_click', [
			{
				config: config,
				position: marker.position.clone(),
			},
		]);
	}

	/**鼠标移入爆管点标记 */
	private onMarkerHover(marker: Object3D, mouseX: number, mouseY: number): void {
		this.hoveredMarker = marker;
		const config = marker.userData.config;

		this.scene.trigger('burst_pipe_marker_hover', [
			{
				config: config,
				mouseX: mouseX,
				mouseY: mouseY,
			},
		]);
	}

	/**鼠标移出爆管点标记 */
	private onMarkerLeave(): void {
		if (this.hoveredMarker) {
			this.hoveredMarker = null;
		}

		this.scene.trigger('burst_pipe_marker_leave');
	}

	/**清除所有爆管点标注 */
	public clearMarkers(): void {
		this.onMarkerLeave();

		this.markers.forEach((marker, id) => {
			this.scene.container.remove(marker);

			// 停止动画并移除容器
			if (marker.userData.animation) {
				marker.userData.animation.destroy();
			}
			if (marker.userData.container && marker.userData.container.parentNode) {
				marker.userData.container.parentNode.removeChild(marker.userData.container);
			}

			marker.traverse((child) => {
				if (child instanceof Sprite) {
					if (child.material instanceof SpriteMaterial) {
						if (child.material.map instanceof CanvasTexture) {
							child.material.map.dispose();
						}
						child.material.dispose();
					}
				}
			});
		});
		this.markers.clear();
		this.markerConfigs = [];
	}

	/**显示/隐藏所有爆管点标注 */
	public setMarkersVisible(visible: boolean): void {
		this.markers.forEach((marker, id) => {
			marker.visible = visible;
		});
	}

	/**获取所有爆管点标注的ID */
	public getMarkerIds(): string[] {
		return Array.from(this.markers.keys());
	}

	/**
	 * 获取爆管点标注的世界位置
	 */
	public getMarkerWorldPosition(id: string): Vector3 | null {
		const marker = this.markers.get(id);
		if (marker) {
			const worldPosition = new Vector3();
			marker.getWorldPosition(worldPosition);
			return worldPosition;
		}
		return null;
	}

	/**
	 * 销毁管理器
	 */
	public destroy(): void {
		this.clearMarkers();
		this.markerConfigs = [];
	}
}
