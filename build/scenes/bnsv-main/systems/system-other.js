import { Group, Mesh, Raycaster, Vector3 } from 'three';
import { SLTScene } from '../../../core/scene';
import { SkeletonUtils, TransformControls } from 'three/examples/jsm/Addons.js';
import { u3_addDirectional } from '../../../utils/light';
import { Tanks } from '../devices/tanks';
import { CONST_BNSV_LABEL_DEVICE, CONST_BNSV_VIEW_LABLE } from '../bnsv-const';
import { isClickOnDevicePop } from '../bnsv-event';
export class SystemOther {
    constructor(scene) {
        this.scene = scene;
        this.fig = {
            SCENE_A: {
                scale: 1.0,
                position: [0, 0.568, 0],
            },
            SCENE_A2: {
                position: [0, 0.45, 0],
                rotate: [0, -1.56, 0],
            },
            SCENE_B: {
                scale: 1.5,
                position: [0, 0.168, 0],
                rotate: [0, 1.597, 0],
            },
            SCENE_C: {
                scale: 2.25,
                position: [0, -0.1, 0],
                rotate: [0, -3.139, 0],
            },
            SCENE_D: {
                scale: 1.0,
                position: [0, -0.5, 0],
            },
            SCENE_E: {
                scale: 1.0,
                position: [0, -0.5, 0],
                rotate: [0, 1.597, 0],
            },
            SCENE_BACK: {
                scale: 1,
                position: [0, -0.5, 0],
            },
        };
        this.currentSceneType = 'SCENE_A';
        this.enabled = true;
        this.container = new Group();
        this.scenes = Object.create(null);
        this.states = Object.create(null);
        this.names = [];
        this.onViewSwitch = (id, force = false) => {
            if (!this.enabled)
                return;
            if (id === this.view_target_name && !force)
                return;
            const info = CONST_BNSV_VIEW_LABLE[id];
            if (!info) {
                console.warn('此id未配置视角和label');
                return;
            }
            const default_label = id.includes('设备') ? (info.type ? [CONST_BNSV_LABEL_DEVICE] : []) : undefined;
            const { scene, scene: { tlabels }, } = this, { tcamera, tcameraCtr: { ctrFirst, ctrOrbit }, } = scene, { position, target, ifOrbit, label_shows = default_label, label_position = target } = info;
            this.view_target_name = id;
            ctrOrbit.pause();
            ctrFirst.resume();
            tlabels.onLabelsCtr([''], []);
            SLTScene.gsap.to(tcamera.camera.position, {
                x: position.x,
                y: position.y,
                z: position.z,
                duration: 1,
                ease: 'power1.in',
                onUpdate: () => {
                    ctrFirst.lookAt(target);
                },
                onComplete: () => {
                    if (ifOrbit !== false) {
                        ctrFirst.pause();
                        ctrOrbit.enabled = true;
                        ctrOrbit.target.copy(target);
                        tcamera.camera.position.copy(position);
                    }
                    tlabels.onLabelsCtr(label_shows, []);
                    tlabels.onSetLabelPosition(label_shows, label_position);
                    scene.trigger('camear_orbit', [ctrOrbit.enabled]);
                },
            });
        };
        this.openEvent = () => {
            const { scene, scenes, states, transformControls } = this, { keyStates } = scene;
            scene.on('KEY_DOWN', () => {
                if (keyStates.KeyQ && this.flagSysteam !== 'SCENE_A' && this.flagSysteam !== 'SCENE_A2')
                    if (keyStates.KeyR)
                        transformControls.setMode('rotate');
                if (keyStates.KeyT)
                    transformControls.setMode('translate');
                if (keyStates.KeyS)
                    transformControls.setMode('scale');
                if (keyStates.Escape) {
                    for (const key in scenes) {
                        if (!states[key])
                            continue;
                        scenes[key].position.copy(states[key].position);
                        scenes[key].scale.copy(states[key].scale);
                        scenes[key].rotation.copy(states[key].rotation);
                    }
                }
            });
        };
        this.tankA = new Tanks(scene);
        this.tankA2 = new Tanks(scene);
        scene.scene.add(this.container);
        scene.container.remove(this.tankA.container);
        scene.container.remove(this.tankA2.container);
        this.container.add(this.tankA.container);
        this.container.add(this.tankA2.container);
        u3_addDirectional(this.container, {
            position: new Vector3(5, 5, 5),
            target: new Vector3(0, 0, 0),
            intensity: 1.0,
            shadowCamera: {
                near: 5,
                far: 12.5,
                left: -5,
                right: 5,
                top: 3,
                bottom: -3,
                normalBias: 0.01,
                mapSize: 1024,
            },
        });
        const transformControls = (this.transformControls = new TransformControls(scene.tcamera.camera, scene.renderer.instance.domElement));
        transformControls.space = 'world';
        transformControls.addEventListener('mouseDown', () => (scene.tcameraCtr.ctrOrbit.enabled = false));
        transformControls.addEventListener('mouseUp', () => (scene.tcameraCtr.ctrOrbit.enabled = true));
        transformControls.setMode('rotate');
        scene.on('progress', () => this.loadModelProcess());
        this.openEvent();
    }
    getScene() {
        return this.scene;
    }
    onPause(flag) {
        const { transformControls, scene } = this;
        this.enabled = !flag;
        this.container.visible = !flag;
        if (!flag)
            this.cameraConfig();
        scene.trigger('camear_orbit', [true]);
        flag && transformControls.detach();
        transformControls.setMode('rotate');
    }
    onLoadModel(resources) {
        const { scenes, scene } = this;
        for (const key in scenes)
            scenes[key].visible = false;
        this.names = resources
            .map((e) => {
            if (e.type == 'gltf') {
                return e.name;
            }
            return undefined;
        })
            .filter((e) => !!e);
        this.tankA.onOpenEvent(scene);
        this.tankA.container.visible = this.names.includes('SCENE_A') && this.currentSceneType == 'SCENE_A';
        this.tankA2.onOpenEvent(scene);
        this.tankA2.container.visible = this.names.includes('SCENE_A2') && this.currentSceneType == 'SCENE_A2';
    }
    onDeviceEvent() {
        const { scene } = this, { tele: { mouse }, renderer: { instance: { domElement: { classList }, }, }, tcamera, } = scene, raycaster = new Raycaster();
        let caster, name, intersects;
        scene.on('TICK', () => {
            if (!this.enabled)
                return;
            raycaster.setFromCamera(mouse, tcamera.camera);
            intersects = raycaster.intersectObjects(this.container.children);
            const visible = intersects.find((e) => e.object.visible == true && (!e.object.parent || e.object.parent.visible == true));
            caster = visible?.object;
            name = caster?.name || '';
            if (name.includes('设备')) {
                classList.add('has-cursor-pointer');
            }
            else {
                classList.remove('has-cursor-pointer');
            }
        });
        scene.on('MOUSE_DOWN', (e) => {
            if (!name || !this.enabled)
                return;
            if (isClickOnDevicePop(e)) {
                return;
            }
            if (name.includes('设备')) {
                const { x, y, z } = intersects[0].point;
                console.log(`${name} position: new Vector3(${x}, ${y}, ${z}),`);
                this.onViewSwitch(name);
                this.scene.trigger('select_device', [name.slice(2, 5)]);
            }
        });
    }
    switchSceneA(sceneType) {
        if (this.currentSceneType === sceneType)
            return;
        const currentScene = this.scenes[this.currentSceneType];
        if (currentScene) {
            currentScene.visible = false;
        }
        const newScene = this.scenes[sceneType];
        if (newScene) {
            newScene.visible = true;
        }
        this.currentSceneType = sceneType;
        this.tankA.container.visible = sceneType === 'SCENE_A';
        this.tankA2.container.visible = sceneType === 'SCENE_A2';
    }
    loadModelProcess() {
        this.names.forEach((e) => this.onModelLoad(e));
    }
    onModelLoad(name, cb) {
        const { scenes, states, scene: { resource: { items }, }, container, fig, currentSceneType, } = this, model = items[name];
        let scene = scenes[name];
        if (model && !scene) {
            scene = scenes[name] = SkeletonUtils.clone(model.scene);
            const { scale = 1, position = [0, 0, 0], rotate = [0, 0, 0] } = fig[name] || {};
            scene.traverse((child) => {
                if (child.isMesh && child instanceof Mesh) {
                    child.material.depthTest = true;
                    child.material.depthWrite = true;
                    if (name !== 'SCENE_BACK')
                        child.castShadow = true;
                    if (name == 'SCENE_BACK')
                        child.receiveShadow = true;
                }
            });
            if (cb)
                cb(scene);
            container.add(scene);
            scene.scale.set(scale, scale, scale);
            scene.position.set(position[0], position[1], position[2]);
            scene.rotation.set(rotate[0], rotate[1], rotate[2]);
            SLTScene.gui.onGuiFolderBase(scene, `${name}`);
            if (['SCENE_A', 'SCENE_A2'].includes(name)) {
                scene.visible = name === currentSceneType;
                name === 'SCENE_A' ? this.tankA.addTanks(scene) : this.tankA2.addTanks(scene);
            }
        }
        if (scene) {
            if (['SCENE_A', 'SCENE_A2'].includes(name)) {
                scene.visible = name === currentSceneType;
            }
            else {
                scene.visible = true;
            }
            if (['SCENE_A', 'SCENE_A2', 'SCENE_B', 'SCENE_C', 'SCENE_D', 'SCENE_E'].includes(name)) {
                this.flagSysteam = name;
                const state = (states[name] = Object.create(null));
                state.position = scene.position.clone();
                state.scale = scene.scale.clone();
                state.rotation = scene.rotation.clone();
            }
            if (['SCENE_B', 'SCENE_C'].includes(name)) {
                this.transformControls.attach(scene);
            }
        }
    }
    cameraConfig() {
        const { scene: { tcamera, tcameraCtr: { ctrOrbit, ctrFirst }, }, } = this;
        tcamera.camera.position.set(3.57, -0.1, -0.08);
        ctrOrbit.target.set(0, 0.2, 0);
        ctrOrbit.maxPolarAngle = Math.PI / 1.9;
        ctrOrbit.minPolarAngle = 0;
        ctrOrbit.maxDistance = 3.9;
        ctrOrbit.minDistance = 0.5;
        ctrOrbit.enabled = true;
        ctrFirst.enabled = false;
    }
}
//# sourceMappingURL=system-other.js.map