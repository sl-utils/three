import { ACESFilmicToneMapping, CineonToneMapping, Group, LinearToneMapping, NoToneMapping, ReinhardToneMapping, Scene } from 'three';
import gsap from 'gsap';
import { Gui } from '../plugins/gui';
import { TEvent } from './event';
import { TElement } from './element';
import { TRenderer } from './renderer';
import { Time } from './time';
import { TCamera, TCameraPers } from './camera';
import { Cannon } from './physice/cannon';
import { TResource } from './resource';
import { TLabels } from './labels';
export const SLTScenes = Object.create(null);
const ALL_RESOURCES = new Object(null);
export class SLTScene extends TEvent {
    constructor(html, opt = { id: 'CORE' }) {
        super();
        this.resources = ALL_RESOURCES;
        this.container = new Group();
        this.uuid = this.container.uuid;
        const { id, optRender = {} } = opt, dom = html instanceof HTMLElement ? html : document.getElementById(html);
        if (!dom) {
            throw new Error('dom is null');
        }
        this.options = opt;
        if (SLTScenes[id]) {
            return SLTScenes[id];
        }
        SLTScenes[id] = this;
        this.scene = new Scene();
        this.tele = new TElement(dom, this);
        this.time = new Time(this);
        this.tcamera = new TCamera(this);
        this.renderer = new TRenderer(dom, optRender);
        this.physice = new Cannon();
        this.resource = new TResource(this);
        this.scene.add(this.container);
        this.openListener();
    }
    get tcameraCtr() {
        return this.tcamera.tcameraCtr;
    }
    get camera() {
        return this.tcamera.camera;
    }
    get tlabels() {
        if (!this._labels)
            this._labels = new TLabels(this);
        return this._labels;
    }
    ;
    get keyStates() {
        return this.tele.keyStates;
    }
    kill() {
        const { tele, time, scene, renderer, options } = this;
        super.kill();
        tele.kill();
        time.kill();
        scene.clear();
        renderer.kill();
        Reflect.deleteProperty(SLTScenes, options.id);
    }
    openListener() {
        const { ifCannon } = this.options, { renderer, scene, tcamera, tele, tlabels } = this;
        this.on('TICK', (time) => {
            renderer.render(scene, tcamera.camera, this.renderFn);
            tlabels.render();
            if (ifCannon) {
            }
        });
        this.on('RESIZE', () => {
            const { width, height } = tele;
            if (tcamera.camera instanceof TCameraPers) {
                tcamera.camera.aspect = width / height;
            }
            tcamera.camera.updateProjectionMatrix();
            tlabels.resize();
            renderer.instance.setSize(width, height);
            renderer.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
        Gui.on(renderer.instance, '渲染器', [
            {
                param: 'toneMapping',
                name: '色调映射',
                items: {
                    NoToneMapping: NoToneMapping,
                    ACESFilmicToneMapping: ACESFilmicToneMapping,
                    LinearToneMapping: LinearToneMapping,
                    ReinhardToneMapping: ReinhardToneMapping,
                    CineonToneMapping: CineonToneMapping
                }
            }, {
                param: 'toneMappingExposure', name: '曝光度', ifNums: [0, 10, 0.001]
            }, {
                param: 'shadowMap.enabled', name: '阴影'
            }
        ]);
    }
}
SLTScene.resources = ALL_RESOURCES;
SLTScene.gsap = gsap;
SLTScene.gui = Gui;
//# sourceMappingURL=scene.js.map