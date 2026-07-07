import { Group, Material, Mesh } from 'three';
import { HousePipes } from './pipe/pipes';
import { CONST_BNSV_LABORATORY } from './bnsv-const';
import { Tanks } from './devices/tanks';
import { u3_destoryAll } from '../../utils';
import { AirValves } from './devices/air-valve';
import { MaterialFlag } from '../../materials/flag';
import { SkeletonUtils } from 'three/examples/jsm/Addons.js';
function u_strPadStart(str, length, char = '0') {
    return (str + '').padStart(length, char);
}
export class BnsvModel {
    constructor(tscene) {
        this.flags = [];
        this._ifEnter = false;
        this.ifAdded = Object.create(null);
        this.meshs = Object.create(null);
        this.statusSwitch = Object.create(null);
        this.loadModelProcess = () => {
            this.onModelLoad('BODY', (body) => {
                body.traverse((obj) => {
                    const name = obj.name || '';
                    if (['设备091', '设备092'].includes(name) && !name.includes('-')) {
                        this.tanks.addTanks(obj);
                    }
                });
            });
            this.onModelLoad('PIPE', (scene) => {
                scene.traverse((child) => {
                    if (child.isMesh && child.name.includes('管道')) {
                        this.pipes.addPipe(child);
                    }
                });
            });
            this.onModelLoad('DEVICE', (scene) => {
                scene.traverse((mesh) => {
                    const { name } = mesh;
                    if ((mesh.isMesh || mesh instanceof Group) && name.includes('设备')) {
                        this.airs.onCreateAir(mesh);
                    }
                    if (mesh.isMesh && !name.includes('设备')) {
                        mesh.name = mesh.parent?.name || '';
                    }
                });
            });
            this.onModelLoad('WATER');
            this.onModelLoad('FACTORY', (scene) => {
                scene.traverse((mesh) => {
                    const { name } = mesh;
                    if ((mesh.isMesh || mesh instanceof Group) && name.includes('旗')) {
                        mesh.material = new MaterialFlag(mesh.material);
                        this.flags.push(mesh.material);
                    }
                });
            });
            this.onModelLoad('OTHER');
        };
        this.scene = tscene;
        this.pipes = new HousePipes(tscene);
        this.airs = new AirValves(tscene);
        this.tanks = new Tanks(tscene);
        tscene.on('progress.BnsvModel', this.loadModelProcess);
        tscene.on('end.BnsvModel', () => tscene.off('.BnsvModel'));
        tscene.on('TICK', (time) => {
            this.flags.forEach((e) => {
                e.uniforms.uTime.value = time.elapseds;
            });
        });
    }
    get ifEnter() {
        return this._ifEnter;
    }
    onHides(names) {
        const { meshs, airs } = this;
        for (const key in meshs) {
            meshs[key].visible = true;
        }
        names.forEach((e) => {
            const mesh = meshs[e];
            airs.onSetAirState(e, 0);
            if (!mesh)
                return;
            mesh.visible = false;
        });
    }
    onInstallNodeDate(status) {
        if (!status || !status.length)
            return;
        const { tanks, airs, pipes, statusSwitch } = this;
        status.forEach((e) => {
            const { installNode, switch: switch1 } = e;
            const node = u_strPadStart(installNode, 3);
            statusSwitch[`设备${node}`] = switch1 === 0;
        });
        tanks.onChangeStatus(status);
        airs.onChangeStatus(status);
        pipes.onPipeSwitch(statusSwitch, false);
    }
    onCloseDevices(names) {
        for (const key in this.statusSwitch) {
            this.statusSwitch[key] = true;
        }
        names.forEach((e) => (this.statusSwitch[e] = false));
    }
    onEnterHouse() {
        const names = [CONST_BNSV_LABORATORY, '门口屋檐002009'];
        names.forEach((e) => {
            let mesh = this.meshs[e];
            if (mesh && mesh instanceof Mesh && mesh.material instanceof Material) {
                mesh.material.transparent = true;
                mesh.material.opacity = 0.1;
            }
        });
        this._ifEnter = true;
    }
    onLeaveHouse() {
        const names = [CONST_BNSV_LABORATORY, '门口屋檐002009'];
        names.forEach((e) => {
            let mesh = this.meshs[e];
            if (mesh && mesh instanceof Mesh && mesh.material instanceof Material) {
                mesh.material.transparent = false;
                mesh.material.opacity = 1.0;
            }
        });
        this._ifEnter = false;
    }
    kill() {
        this.pipes.kill();
        for (const key in this.meshs) {
            const mesh = this.meshs[key];
            u3_destoryAll(mesh);
        }
    }
    onModelLoad(name, cb) {
        const { ifAdded, scene: { resource: { items }, container, }, meshs, } = this, model = items[name];
        if (model && !ifAdded[name]) {
            ifAdded[name] = true;
            const scene = SkeletonUtils.clone(model.scene);
            if (cb)
                cb(scene);
            scene.traverse((child) => {
                if (child instanceof Group || (child instanceof Mesh && !meshs[child.name]))
                    meshs[child.name] = child;
                if (child.isMesh && child instanceof Mesh) {
                    child.material.depthTest = true;
                    child.material.depthWrite = true;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            container.add(scene);
        }
    }
}
//# sourceMappingURL=bnsv-model.js.map