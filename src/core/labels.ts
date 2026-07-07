import { Object3D, Vector3 } from "three"
import { CSS2DObject, CSS2DRenderer, CSS3DObject, CSS3DRenderer } from "three/examples/jsm/Addons.js";
import { SLTScene } from "./scene";
import { TOptLabel } from "src/types";
/**2D、3D标签 */
export class TLabels {
    constructor(private tscene: SLTScene) {
        this.tscene.container.add(this.container);
    }
    /**2D渲染器 */
    private _renderer2D: CSS2DRenderer | null = null;
    /**3D渲染器 */
    private _renderer3D: CSS3DRenderer | null = null;
    /**2D标签渲染器 */
    private get renderer2D(): CSS2DRenderer | null {
        if (this.if2DAdded && !this._renderer2D) {
            const renderer = this._renderer2D = new CSS2DRenderer();
            const { domElement, domElement: { style } } = renderer;
            style.position = 'absolute';
            style.top = '0px';
            style.pointerEvents = 'none';
            this.tscene.tele.ele.appendChild(domElement);
        }
        return this._renderer2D;
    }
    /**3D标签渲染器 */
    private get renderer3D(): CSS3DRenderer | null {
        if (this.if3DAdded && !this._renderer3D) {
            const renderer = this._renderer3D = new CSS3DRenderer();
            const { domElement, domElement: { style } } = renderer;
            style.position = 'absolute';
            style.top = '0px';
            style.pointerEvents = 'none';
            this.tscene.tele.ele.appendChild(domElement);
        }
        return this._renderer3D;
    }
    /**用于标识是否添加过3D标签 */
    private if3DAdded: boolean = false;
    /**用于标识是否添加过2D标签 */
    private if2DAdded: boolean = false;
    /**存储标签的对象 */
    private readonly cssobjects: { [K: string]: CSS2DObject | CSS3DObject } = Object.create(null);
    /**标签容器 */
    public readonly container: Object3D = new Object3D();
    /**暂存显示的id */
    private stagedIds: string[] = [];
    /**暂存当前显示的label数组 */
    public onStaged(): void {
        this.stagedIds = this.onGetShowIds()
    }
    /**暂存当前显示的label数组 */
    public onRestore(): void {
        this.onLabelsCtr(this.stagedIds)
    }
    /**如果暂存中存在该id则再次显示此id */
    public onShowStagedIds(ids: string | string[]): void {
        const arr = Array.isArray(ids) ? ids : [ids],
            shows = this.onGetShowIds(),
            stageds = this.stagedIds,
            curs = arr.filter(e => stageds.includes(e))
        if (curs.length === 0) return;
        this.onLabelsCtr([...shows, ...curs])
    }
    /**获取当前显示的label数组 */
    public onGetShowIds(): string[] {
        const ids: string[] = [];
        for (const key in this.cssobjects) {
            const cssobject = this.cssobjects[key];
            if (cssobject.visible) ids.push(key)
        }
        return ids;
    }
    /**设置指定lable的位置 
     * @param ids 指定的id或id组
     * @param position 指定位置
    */
    public onSetLabelPosition(ids: string | string[], position: Vector3) {
        const keys: string[] = Array.isArray(ids) ? ids : [ids];
        keys.forEach(e => {
            this.cssobjects[e]?.position.copy(position);
        })
    }
    /**控制label的显示和隐藏 
     * @param shows 显示的label的id(为undefined时不改变当前状态,为[]时显示所有,特定值时显示特定项)
     * @param hides 隐藏的label的id(为undefined时不改变当前状态,为[]时隐藏所有,特定值时隐藏特定项)
    */
    public onLabelsCtr(shows?: string[], hides?: string[]) {
        if (hides) this.visible(hides, false);
        if (shows) this.visible(shows, true);
    }
    /**改变指定的label的可视状态 
     * @param id 指定的label,不传则所有的label的都会变更
     * @param visible true为显示 false为隐藏
    */
    private visible(ids: string[] = [], visible: boolean) {
        const { cssobjects } = this;
        for (const key in cssobjects) {
            const cssobject = cssobjects[key];
            cssobject.visible = ids.length > 0 ? cssobject.visible : visible;
            if (ids.includes(key)) cssobject.visible = visible
        }
    }
    /**添加2D标签或3D标签 （标签默认会底部中心位置和指定的三维点一直保持对其） */
    public onAddLabel(opt: TOptLabel) {
        const { container, cssobjects } = this, {
            id,
            type = 'div',
            content,
            position,
            className,
            src,
            width,
            height,
            ifVisible = true,
            onClick,
            ele = document.createElement(type),
            transform = 'translate(0px,0px)',
            if3D = false } = opt, style = ele.style;
        ele.classList.remove('hide');
        if (className) ele.classList.add(className);
        if (content) ele.textContent = content;
        if (width) style.width = `${width}px`;
        if (height) style.height = `${height}px`;
        if (src instanceof Image) {
            ele.appendChild(src)
        } else if (ele instanceof HTMLImageElement && src) {
            ele.src = src
        } else if (src) {
            style.backgroundImage = `url(${src})`
        }
        if (onClick) ele.addEventListener('click', () => { console.log('click'); onClick() });
        if (if3D) { this.if3DAdded = true } else { this.if2DAdded = true };
        const lable = if3D ? new CSS3DObject(ele) : new CSS2DObject(ele);
        if (lable instanceof CSS2DObject) lable.center.set(0.5, 1);
        lable.visible = !!ifVisible;
        lable.position.copy(position);
        lable.onAfterRender = () => {
            style.transform = style.transform + `${transform}`
            if (onClick) style.userSelect = 'all';
            style.pointerEvents = 'all'
        }
        container.add(lable);
        cssobjects[id] = lable;
        return lable;
    }
    /**渲染所有的标签 */
    public render() {
        const { tscene: { scene, tcamera: { camera } } } = this;
        this.renderer2D?.render(scene, camera);
        this.renderer3D?.render(scene, camera);
    }
    /**调整所有的标签的大小 */
    public resize() {
        const { tscene: { scene, tele: { width, height } } } = this;
        this.renderer2D?.setSize(width, height);
        this.renderer3D?.setSize(width, height);
    }
    /**销毁所有的标签 */
    public onDestroyAll() {
        const { cssobjects } = this;
        for (const key in cssobjects) {
            const cssobject = cssobjects[key];
            cssobject.remove();
        }
    }
}