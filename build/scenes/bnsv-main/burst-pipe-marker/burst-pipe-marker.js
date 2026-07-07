import { CanvasTexture, FileLoader, LinearFilter, Object3D, Raycaster, Sprite, SpriteMaterial, SRGBColorSpace, TextureLoader, Vector2, Vector3, } from 'three';
import lottie from '../../../Assets/js/lottie/lottie513.js';
export class BurstPipeMarkerManager {
    constructor(scene) {
        this.markerConfigs = [];
        this.markers = new Map();
        this.hoveredMarker = null;
        this.scene = scene;
        this.textureLoader = new TextureLoader();
        this.setupMouseEvents();
    }
    updateMarkers(markerConfigs) {
        this.clearMarkers();
        this.markerConfigs = markerConfigs;
        markerConfigs.forEach((config) => {
            this.addMarker(config);
        });
    }
    async addMarker(config) {
        const markerId = `burst_pipe_${config.id}`;
        const markerGroup = new Object3D();
        markerGroup.position.copy(config.position);
        const loader = new FileLoader();
        loader.setResponseType('json');
        loader.load('../../../resource/textures/burst/data.json', (data) => {
            if (data.assets) {
                data.assets.forEach((asset) => {
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
            }
            else if (direction === 'vertical') {
                sprite.position.set(-0.08, 0, -0.08);
            }
            sprite.scale.set(0.2, 0.2, 1);
            sprite.renderOrder = 5;
            markerGroup.add(sprite);
            markerGroup.renderOrder = 5;
            this.scene.container.add(markerGroup);
        });
        markerGroup.userData = {
            isBurstPipe: true,
            config: config,
            markerId: markerId,
        };
        this.markers.set(markerId, markerGroup);
    }
    setupMouseEvents() {
        const { scene, scene: { tcamera } } = this;
        const raycaster = new Raycaster();
        const mouse = new Vector2();
        const rendererDom = this.scene.renderer.instance.domElement;
        scene.on('MOUSE_MOVE', (event) => {
            const rect = rendererDom.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, tcamera.camera);
            const markerObjects = [];
            this.markers.forEach((marker) => {
                markerObjects.push(marker);
            });
            const intersects = raycaster.intersectObjects(markerObjects, true);
            if (intersects.length > 0) {
                let burstPipeObject = null;
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
                }
                else if (!burstPipeObject && this.hoveredMarker) {
                    rendererDom.style.cursor = 'default';
                    this.onMarkerLeave();
                }
            }
            else {
                if (this.hoveredMarker) {
                    rendererDom.style.cursor = 'default';
                    this.onMarkerLeave();
                }
            }
        });
        scene.on('CLICK', (event) => {
            const rect = rendererDom.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, tcamera.camera);
            const markerObjects = [];
            this.markers.forEach((marker) => {
                markerObjects.push(marker);
            });
            const intersects = raycaster.intersectObjects(markerObjects, true);
            if (intersects.length > 0) {
                let burstPipeObject = null;
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
    onMarkerClick(marker) {
        const config = marker.userData.config;
        this.scene.trigger('burst_pipe_marker_click', [
            {
                config: config,
                position: marker.position.clone(),
            },
        ]);
    }
    onMarkerHover(marker, mouseX, mouseY) {
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
    onMarkerLeave() {
        if (this.hoveredMarker) {
            this.hoveredMarker = null;
        }
        this.scene.trigger('burst_pipe_marker_leave');
    }
    clearMarkers() {
        this.onMarkerLeave();
        this.markers.forEach((marker, id) => {
            this.scene.container.remove(marker);
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
    setMarkersVisible(visible) {
        this.markers.forEach((marker, id) => {
            marker.visible = visible;
        });
    }
    getMarkerIds() {
        return Array.from(this.markers.keys());
    }
    getMarkerWorldPosition(id) {
        const marker = this.markers.get(id);
        if (marker) {
            const worldPosition = new Vector3();
            marker.getWorldPosition(worldPosition);
            return worldPosition;
        }
        return null;
    }
    destroy() {
        this.clearMarkers();
        this.markerConfigs = [];
    }
}
//# sourceMappingURL=burst-pipe-marker.js.map