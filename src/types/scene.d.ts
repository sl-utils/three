import { BufferGeometry, ColorRepresentation, Group, NormalBufferAttributes, Object3DEventMap, Texture, Vector3, WebGLRendererParameters, WebGLShadowMap } from "three";
import { GLTF, OrbitControls } from "three/examples/jsm/Addons.js";
/**场景中的资源项目 */
export interface TOptScene {
    /**设置帮助器id(推荐全大写)-当同页面存在多个渲染节点时需要 */
    id: string,
    /**场景加载的资源项目 */
    resources?: TResourceInfo[];
    /**场景是否涉及lable */
    ifLabels?: boolean;
    /**启用物理系统 */
    ifCannon?: boolean,
    optRender?: TOptRenderer,
    optCamera?: TOptCamera,
    optCameraCtrOrb?: OrbitControls,
}
/**渲染器的相关配置*/
export interface TOptRenderer extends WebGLRendererParameters {
    /**设置渲染器类型-当无法采用GPU时使用WebGL */
    isGPU?: boolean;
    /**自动清除缓冲区 */
    autoClear?: boolean;
    /**整体背景色 */
    clearColor?: ColorRepresentation;
    /**整体背景色透明度 */
    clearAlpha?: number;
    /**像素比 */
    pixelRatio?: number;
    /**阴影配置 */
    shadowMap?: Partial<WebGLShadowMap>;
    /**开启物理材质裁剪 */
    localClippingEnabled?: boolean;
}
/**相机配置 */
export interface TOptCamera {
    /**相机的类型 */
    type: 'perspective' | 'orthographic';
    /**相机的参数 */
    params: {
        /**相机的参数 */
        [key: string]: any;
    };
}
/**场景中的label */
export interface TOptLabel {
    /**label的标识 */
    id: string;
    /**是否是3D标签 */
    if3D?: boolean;
    /**label的类型 */
    type?: 'div' | 'img';
    /**label的元素 */
    ele?: HTMLElement;
    /**label的位置 */
    position: Vector3;
    /**是否显示 @default true*/
    ifVisible?: boolean;
    /**label的内容 */
    content?: string;
    /**lable的类名(应用样式表的样式) */
    className?: string;
    /**资源路径 */
    src?: string | HTMLImageElement;
    /**宽 */
    width?: number;
    /**高 */
    height?: number;
    /**指定节点的偏移 */
    transform?: string;
    /**点击回调 */
    onClick?: () => void;
}


/**加载器信息 */
interface Tloader {
    /**能加载的资源类型 */
    types: TResourceType[]
    /**加载资源的方法 */
    action: (_resource: TResourceInfo) => void
}

type TResourceType = 'texture' | 'image' | 'drc' | 'gltf' | 'fbx' | 'drc' | 'font' | 'hdr' | 'cube'
type TResourceCube = {
    /**资源名称 */
    name: string,
    src: string[],
    /**环境贴图Cube */
    type: 'cube',
}
type TResourceOther = {
    name: string,
    src: string,
    /**资源类型,根据类型指定加载器*/
    type?: 'texture' | 'image' | 'drc' | 'gltf' | 'fbx' | 'drc' | 'font' | 'hdr';
}
/**资源信息 */
type TResourceInfo = {
    /**是否延迟加载（同一个场景点击切换才需加载） */
    ifDelay?: boolean,
    /**是否加载过 */
    _loaded?: boolean,
} & (
        TResourceCube |
        TResourceOther
    );
/**加载完成后得到的资源信息 */
interface TResourceItems {
    [K: `Cube${string}`]: string,
    // [K: `Image${string}`]: Image,
    [K: `Texture${string}`]: Texture,
    [K: `Gltf${string}`]: GLTF,
    [K: `Glb${string}`]: GLTF,
    [K: `Fbx${string}`]: Group<Object3DEventMap>,
    [K: `Drc${string}`]: BufferGeometry<NormalBufferAttributes>,
    [K: string]: any,
}