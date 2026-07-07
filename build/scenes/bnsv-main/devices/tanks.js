import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { MaterialTanks } from '../../../materials/tanks/tanks';
import { MaterialLevel } from '../../../materials/level/level';
import { SLTScene } from 'src/core';
export class Tanks {
    constructor(scene) {
        this.scene = scene;
        this.container = new Group();
        this.meshs = Object.create(null);
        this.materials = Object.create(null);
        this.positions = {
            设备091: new Vector3(-1.375, 4.19, 63.76),
            设备092: new Vector3(-49.37, 7.11, 99.2),
            室内消除罐: new Vector3(0, 0.569, 0),
            '室内消除罐-卧式': new Vector3(0.01, 0.346, 0.03),
        };
        this.config = {
            水箱: { min: -0.663, max: 2.99 },
            设备091: { min: -0.563, max: 1.339 },
            设备092: { min: 0.833, max: 5.063 },
            室内消除罐: { min: -0.758, max: 0.869 },
        };
        this.scene = scene;
        scene.container.add(this.container);
        scene.on('TICK', () => {
            for (const key in this.materials) {
                const material = this.materials[key];
                material.uniforms.uTime.value += 1;
            }
        });
        this.onOpenEvent(scene);
    }
    addTanks(scene) {
        const { meshs, materials, positions, container } = this;
        let name;
        console.log(scene);
        scene?.traverse((e) => {
            if (['设备091', '设备092', '室内消除罐', '室内消除罐-卧式'].includes(e.name))
                name = e.name;
            if (e instanceof Mesh) {
                e.renderOrder = 10;
                const meshName = e.name;
                if (meshName.includes('警戒线01'))
                    meshs[`${name}警戒线01`] = e;
                if (meshName.includes('警戒线02'))
                    meshs[`${name}警戒线02`] = e;
                if (meshName.includes('水位线')) {
                    meshs[`${name}水位线`] = e;
                    e.material = new MaterialLevel();
                }
                if (meshName.includes('外层'))
                    e.material = new MeshStandardMaterial({ color: '#11e', transparent: true, opacity: 0.3, depthWrite: true });
                if (meshName.includes('内层') && !this.meshs[`${name}内层`]) {
                    const material = (materials[name] = new MaterialTanks());
                    const mesh = (meshs[`${name}内层`] = new Mesh(e.geometry, material));
                    e.visible = false;
                    mesh.position.copy(positions[name]);
                    if (name == '室内消除罐-卧式') {
                        mesh.scale.set(0.3, 0.3, 0.3);
                        mesh.rotation.y = -1.56;
                    }
                    SLTScene.gui.on(mesh, `${name}消除罐`, [
                        { name: 'X', param: 'position.x', ifNums: [-100, 100, 0.001] },
                        { name: 'Y', param: 'position.y', ifNums: [0, 10, 0.001] },
                        { name: 'Z', param: 'position.z', ifNums: [50, 200, 0.001] },
                    ]);
                    mesh.renderOrder = 50;
                    container.add(mesh);
                    mesh.material = material;
                }
            }
        });
    }
    onChangeStatus(status) {
        const { meshs, config } = this;
        status.forEach((e) => {
            const { installNode, switch: switch1, liquidLevelHeight, statusUp, statusDown } = e, name = `设备${installNode}`;
            const opt = config[name], mesh = meshs[`${name}水位线`];
            if (!opt || !mesh)
                return;
            const material = mesh.material;
            const { min, max } = opt, parcentage = liquidLevelHeight / 1300;
            meshs[`${name}警戒线01`].position.y = min + ((max - min) * statusDown) / 1300;
            meshs[`${name}警戒线02`].position.y = min + ((max - min) * statusUp) / 1300;
            meshs[`${name}内层`].material.uniforms.uLevel.value = parcentage;
            material.uniforms.uProgress.value = parcentage;
        });
    }
    onOpenEvent(scene) {
        scene.on('END.Tanks', () => {
            for (const key in this.materials) {
                const material = this.materials[key];
                material.uniforms.tImage.value = this.scene.resource.items.TEXTURE_WATER;
            }
            scene.off('END.Tanks');
        });
    }
    gui() {
        const { meshs, materials } = this, material093 = meshs[`室内消除罐水位线`].material;
        SLTScene.gui.on(material093.uniforms.uProgress, '设备092', [{ name: '水位线', param: 'value', ifNums: [0, 1, 0.001] }]);
        SLTScene.gui.on(meshs, '室内消除罐', [
            { name: '警戒线01', param: '室内消除罐警戒线01.position.y', ifNums: [-10, 20, 0.001] },
            { name: '警戒线02', param: '室内消除罐警戒线02.position.y', ifNums: [-10, 20, 0.001] },
        ]);
    }
}
//# sourceMappingURL=tanks.js.map