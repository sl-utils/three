import { Color, Group, Mesh } from 'three';
import { TResource } from '../../../core/resource/resource';
import { RESOURCES_SCENE_LOAD } from '../../../Assets/resource_regist';
import { MaterialLogo } from '../../../materials/logo/logo';
import { SLTScene, TCameraOrth, TEvent } from '../../..';
import { SkeletonUtils } from 'three/examples/jsm/Addons.js';
export class Load {
    constructor(tscene, isH5) {
        this.tscene = tscene;
        this.container = new Group();
        this.isH5 = false;
        this.event = new TEvent();
        this.resource = new TResource(this.event);
        this.ifAdded = Object.create(null);
        this.loadModelProcess = () => {
            const { tscene } = this;
            this.onModelLoad('LOGO', (scene) => {
                if (this.isH5) {
                    scene.scale.setScalar(0.58);
                }
                scene.traverse((mesh) => {
                    if (mesh instanceof Mesh) {
                        mesh.position.set(0, 0, 0.5);
                        mesh.material = this.logoMaterial;
                        tscene.on('TICK.load', (e) => {
                            mesh.material.uniforms.uTime.value = e.elapseds * 2;
                        });
                    }
                });
            });
        };
        this.setProgress = (progress) => {
            const material = this.logoMaterial;
            if (!material)
                return;
            SLTScene.gsap.to(material.uniforms.uProgress, {
                value: progress,
                transition: 1,
                onComplete: () => {
                    if (progress >= 1) {
                        this.hide();
                        this.event.trigger('gsapend');
                    }
                },
            });
        };
        this.isH5 = isH5;
        const { scene } = tscene, { container, resource, event } = this;
        this.orth = new TCameraOrth(tscene);
        scene.add(container);
        this.logoMaterial = new MaterialLogo();
        resource.load(RESOURCES_SCENE_LOAD);
        event.on('progress', this.loadModelProcess);
    }
    onModelLoad(name, cb) {
        const { ifAdded, tscene: { resource: { items }, }, container, } = this, model = items[name];
        if (model && !ifAdded[name]) {
            ifAdded[name] = true;
            const scene = SkeletonUtils.clone(model.scene);
            scene.traverse((child) => {
                if (child.isMesh && child instanceof Mesh) {
                    child.material.depthTest = true;
                    child.material.depthWrite = true;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            if (cb)
                cb(scene);
            container.add(scene);
        }
    }
    show() {
        const { tscene, tscene: { tcameraCtr: { ctrOrbit, ctrFirst, }, }, orth, resource, container, logoMaterial, } = this;
        ctrOrbit.enabled = false;
        ctrFirst.enabled = false;
        container.visible = true;
        logoMaterial.uniforms.uProgress.value = 0;
        orth.position.set(0, -0.03, 1);
        orth.lookAt(0, -0.03, 0);
        resource.load(RESOURCES_SCENE_LOAD);
        tscene.renderer.instance.setClearColor(new Color(0xffffff), 0.0);
        tscene.renderFn = () => {
            tscene.renderer.instance.render(tscene.scene, orth);
        };
    }
    hide() {
        const { tscene, container, orth, resource, } = this;
        container.visible = false;
        tscene.renderFn = undefined;
    }
}
//# sourceMappingURL=load.js.map