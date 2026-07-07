import { Raycaster } from 'three';
import { CONST_BNSV_LABEL_DEVICE, CONST_BNSV_LABORATORY, CONST_BNSV_VIEW_LABLE } from './bnsv-const';
import { SLTScene } from 'src/core';
export class BnsvEvent {
    constructor(scene, models) {
        this.scene = scene;
        this.enabled = true;
        this.openEvent = () => {
            const { scene, models } = this, { keyStates, tele: { mouse }, renderer: { instance: { domElement: { classList }, }, }, container, camera, tcameraCtr, tcameraCtr: { ctrOrbit, ctrFirst }, } = scene, raycaster = new Raycaster(), {} = models;
            scene.off('END.BnsvEvent');
            let caster, name, visible, intersects;
            scene.on('TICK', () => {
                if (!this.enabled)
                    return;
                if ((keyStates.KeyW ||
                    keyStates.KeyA ||
                    keyStates.KeyS ||
                    keyStates.KeyD ||
                    keyStates.KeyR ||
                    keyStates.KeyF ||
                    keyStates.ArrowUp ||
                    keyStates.ArrowDown ||
                    keyStates.ArrowLeft ||
                    keyStates.ArrowRight) &&
                    models.ifEnter &&
                    ctrFirst.enabled) {
                    this.computeDistance();
                }
                raycaster.setFromCamera(mouse, camera);
                intersects = raycaster.intersectObjects(container.children);
                intersects = intersects.filter((e) => e.object.type !== 'Points');
                visible = intersects.find((e) => e.object.visible == true && (!e.object.parent || e.object.parent.visible == true));
                caster = visible?.object;
                name = caster?.name || '';
                name = name.includes('罐体01') ? '设备091' : name.includes('罐体02') ? '设备092' : name.includes('水箱') ? '设备090' : name;
                if (name.includes(CONST_BNSV_LABORATORY) && !models.ifEnter) {
                    classList.add('has-cursor-pointer');
                }
                else if (name.includes('设备')) {
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
                if (name.includes(CONST_BNSV_LABORATORY) && !models.ifEnter) {
                    scene.trigger('enter_lable');
                }
                else if (name.includes('设备')) {
                    const { x, y, z } = intersects[0].point;
                    console.log(`position: new Vector3(${x}, ${y}, ${z}),`);
                    this.onViewSwitch(name);
                    this.scene.trigger('select_device', [name.slice(2, 5)]);
                }
            });
            scene.on('DOUBLE_CLICK', () => {
                if (!this.enabled)
                    return;
                if (keyStates.Escape && models.ifEnter) {
                    this.onViewSwitch('初始视角', true);
                }
            });
            scene.on('KEY_DOWN', () => {
                if (!this.enabled)
                    return;
                if (keyStates.Backquote) {
                    if (keyStates.Digit1) {
                        this.onViewSwitch('初始视角', true);
                    }
                    else if (keyStates.Digit2) {
                        this.onViewSwitch('进入实验室', true);
                    }
                    else if (keyStates.Digit3) {
                        this.onViewSwitch('设备090', true);
                    }
                    else if (keyStates.Digit4) {
                        this.onViewSwitch('设备091', true);
                    }
                    else if (keyStates.Digit5) {
                        this.onViewSwitch('设备092', true);
                    }
                    else if (keyStates.KeyQ) {
                        tcameraCtr.onToggleCamera();
                        scene.trigger('camear_orbit', [ctrOrbit.enabled]);
                    }
                }
            });
        };
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
            const { scene, scene: { tlabels }, models, } = this, { camera, tcameraCtr: { ctrFirst, ctrOrbit }, } = scene, { position, target, ifOrbit, label_shows = default_label, label_position = target } = info;
            if (['初始视角', '设备092'].includes(id))
                models.onLeaveHouse();
            else
                models.onEnterHouse();
            this.view_target_name = id;
            ctrOrbit.pause();
            ctrFirst.resume();
            tlabels.onLabelsCtr([''], []);
            SLTScene.gsap.to(camera.position, {
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
                        camera.position.copy(position);
                    }
                    tlabels.onLabelsCtr(label_shows, []);
                    tlabels.onSetLabelPosition(label_shows, label_position);
                    scene.trigger('camear_orbit', [ctrOrbit.enabled]);
                },
            });
        };
        this.models = models;
        scene.on('end.BnsvEvent', this.openEvent);
        scene.on('enter_lable', () => this.onViewSwitch('进入实验室', true));
    }
    computeDistance() {
        const { scene, view_name, models: { meshs }, } = this, { tlabels, camera } = scene;
        let v1 = camera.position, min = Infinity, name;
        for (const key in CONST_BNSV_VIEW_LABLE) {
            const { target, label_position, type } = CONST_BNSV_VIEW_LABLE[key];
            if (!key.includes('设备') || !type)
                continue;
            const mesh = meshs && meshs[key];
            if (!mesh || !mesh.visible)
                continue;
            const position = label_position || target, distance = v1.distanceTo(position);
            if (distance < min) {
                if (this.isPointInViewport(position)) {
                    min = distance;
                    name = key;
                }
            }
        }
        if (name !== view_name) {
            this.view_name = name;
            scene.trigger('select_device', [name.slice(2, 5)]);
            if (!CONST_BNSV_VIEW_LABLE[name])
                return;
            const { label_shows = [CONST_BNSV_LABEL_DEVICE], target, label_position = target } = CONST_BNSV_VIEW_LABLE[name];
            tlabels.onSetLabelPosition(label_shows, label_position);
            tlabels.onLabelsCtr(label_shows);
        }
    }
    isPointInViewport(point) {
        const { camera } = this.scene;
        const { x, y, z } = point.clone().project(camera);
        return x >= -1 && x <= 1 && y >= -1 && y <= 1 && z >= -1 && z <= 1;
    }
}
export function isClickOnDevicePop(event) {
    const devicePopElements = document.querySelectorAll('device-pop, .device, .single');
    for (const element of devicePopElements) {
        if (element.contains(event.target)) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=bnsv-event.js.map