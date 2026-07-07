import { ACESFilmicToneMapping, CameraHelper, CineonToneMapping, DirectionalLight, DirectionalLightHelper, Group, LinearToneMapping, NoToneMapping, OrthographicCamera, PerspectiveCamera, ReinhardToneMapping, Scene } from 'three';
import gsap from 'gsap';
import { Gui } from '../plugins/gui';
import { TEvent } from './event';
import { TElement } from './element';
import { TRenderer } from './renderer';
import { Time } from './time';
import { TCamera, TCameraCtr, TCameraPers } from './camera';
import { Cannon } from './physice/cannon';
import { TResource } from './resource';
import { TLabels } from './labels';
import { SLTEvents, TOptScene, TResourceItems } from '../types';
/**同页面多实例多场景 */
export const SLTScenes: { [K: string]: SLTScene<any> } = Object.create(null);
/**所有的资源都会加载到此 */
const ALL_RESOURCES: TResourceItems = new Object(null) as TResourceItems;
/**场景基础
 * ①当模型等异步资源加载完成后会调用init方法，在init中布置场景
 * ②开场加载动画完成后调用showScene调整相机位置并将场景添加到Scene
 * @param html 场景的Dom节点
 * @param opt 场景的配置
 */
export class SLTScene<T extends string | null = null> extends TEvent<SLTEvents | T> {
    constructor(html: HTMLElement | string, opt: TOptScene = { id: 'CORE' }) {
        super();
        const { id, optRender = {} } = opt, dom = html instanceof HTMLElement ? html : document.getElementById(html) as HTMLElement;
        if (!dom) { throw new Error('dom is null'); }
        this.options = opt;
        if (SLTScenes[id]) { return SLTScenes[id]; }
        SLTScenes[id] = this;
        this.scene = new Scene();
        this.tele = new TElement(dom, this);
        this.time = new Time(this);
        this.tcamera = new TCamera(this);
        this.renderer = new TRenderer(dom, optRender);
        this.physice = new Cannon();
        this.resource = new TResource(this);
        this.scene.add(this.container);
        this.openListener()
    }
    /**资源管理器-所有加载过的资源都在这里 */
    public static readonly resources: TResourceItems = ALL_RESOURCES;
    /**gsap动画控件 */
    public static gsap = gsap;
    public static gui = Gui;
    public readonly resources: TResourceItems = ALL_RESOURCES;
    public readonly tele: TElement
    public readonly time: Time
    public readonly scene: Scene
    public readonly renderer: TRenderer
    public readonly physice: Cannon
    /**相机 */
    public readonly tcamera: TCamera
    /**相机控制器 */
    public get tcameraCtr(): TCameraCtr {
        return this.tcamera.tcameraCtr;
    }
    /**原始相机 */
    public get camera(): PerspectiveCamera | OrthographicCamera {
        return this.tcamera.camera;
    }
    /**设置值后将会替换默认的render并执行 */
    public renderFn: Function | undefined;
    /**资源管理器 */
    public readonly resource: TResource;
    /**3D物体集合 */
    public readonly container = new Group();
    /**用于注销事件的id */
    protected uuid: string = this.container.uuid;
    /**2D标签 */
    private _labels?: TLabels
    public get tlabels(): TLabels {
        if (!this._labels) this._labels = new TLabels(this);
        return this._labels
    };
    /**当前所有按键状态 */
    public get keyStates() {
        return this.tele.keyStates;
    }
    /**helper的配置参数 */
    private readonly options: TOptScene;
    /**销毁自身所有3D对象  */
    public kill() {
        const { tele, time, scene, renderer, options } = this;
        super.kill();
        tele.kill();
        time.kill();
        scene.clear();
        renderer.kill();
        Reflect.deleteProperty(SLTScenes, options.id)
    }
    /**开启所有的事件监听 */
    private openListener() {
        const { ifCannon } = this.options, { renderer, scene, tcamera, tele, tlabels } = this;
        this.on('TICK', (time: Time) => {
            renderer.render(scene, tcamera.camera, this.renderFn);
            tlabels.render();
            if (ifCannon) {
                // physice.world.step(1 / 60, time.delta, 3);
            }
        });
        this.on('RESIZE', () => {
            const { width, height } = tele;
            /**相机调整 */
            if (tcamera.camera instanceof TCameraPers) {
                tcamera.camera.aspect = width / height;
            }
            tcamera.camera.updateProjectionMatrix();
            /**标签调整 */
            tlabels.resize();
            /**渲染器调整 */
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
        ])
    }
}