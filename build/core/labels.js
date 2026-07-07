import { Object3D } from "three";
import { CSS2DObject, CSS2DRenderer, CSS3DObject, CSS3DRenderer } from "three/examples/jsm/Addons.js";
export class TLabels {
    constructor(tscene) {
        this.tscene = tscene;
        this._renderer2D = null;
        this._renderer3D = null;
        this.if3DAdded = false;
        this.if2DAdded = false;
        this.cssobjects = Object.create(null);
        this.container = new Object3D();
        this.stagedIds = [];
        this.tscene.container.add(this.container);
    }
    get renderer2D() {
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
    get renderer3D() {
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
    onStaged() {
        this.stagedIds = this.onGetShowIds();
    }
    onRestore() {
        this.onLabelsCtr(this.stagedIds);
    }
    onShowStagedIds(ids) {
        const arr = Array.isArray(ids) ? ids : [ids], shows = this.onGetShowIds(), stageds = this.stagedIds, curs = arr.filter(e => stageds.includes(e));
        if (curs.length === 0)
            return;
        this.onLabelsCtr([...shows, ...curs]);
    }
    onGetShowIds() {
        const ids = [];
        for (const key in this.cssobjects) {
            const cssobject = this.cssobjects[key];
            if (cssobject.visible)
                ids.push(key);
        }
        return ids;
    }
    onSetLabelPosition(ids, position) {
        const keys = Array.isArray(ids) ? ids : [ids];
        keys.forEach(e => {
            this.cssobjects[e]?.position.copy(position);
        });
    }
    onLabelsCtr(shows, hides) {
        if (hides)
            this.visible(hides, false);
        if (shows)
            this.visible(shows, true);
    }
    visible(ids = [], visible) {
        const { cssobjects } = this;
        for (const key in cssobjects) {
            const cssobject = cssobjects[key];
            cssobject.visible = ids.length > 0 ? cssobject.visible : visible;
            if (ids.includes(key))
                cssobject.visible = visible;
        }
    }
    onAddLabel(opt) {
        const { container, cssobjects } = this, { id, type = 'div', content, position, className, src, width, height, ifVisible = true, onClick, ele = document.createElement(type), transform = 'translate(0px,0px)', if3D = false } = opt, style = ele.style;
        ele.classList.remove('hide');
        if (className)
            ele.classList.add(className);
        if (content)
            ele.textContent = content;
        if (width)
            style.width = `${width}px`;
        if (height)
            style.height = `${height}px`;
        if (src instanceof Image) {
            ele.appendChild(src);
        }
        else if (ele instanceof HTMLImageElement && src) {
            ele.src = src;
        }
        else if (src) {
            style.backgroundImage = `url(${src})`;
        }
        if (onClick)
            ele.addEventListener('click', () => { console.log('click'); onClick(); });
        if (if3D) {
            this.if3DAdded = true;
        }
        else {
            this.if2DAdded = true;
        }
        ;
        const lable = if3D ? new CSS3DObject(ele) : new CSS2DObject(ele);
        if (lable instanceof CSS2DObject)
            lable.center.set(0.5, 1);
        lable.visible = !!ifVisible;
        lable.position.copy(position);
        lable.onAfterRender = () => {
            style.transform = style.transform + `${transform}`;
            if (onClick)
                style.userSelect = 'all';
            style.pointerEvents = 'all';
        };
        container.add(lable);
        cssobjects[id] = lable;
        return lable;
    }
    render() {
        const { tscene: { scene, tcamera: { camera } } } = this;
        this.renderer2D?.render(scene, camera);
        this.renderer3D?.render(scene, camera);
    }
    resize() {
        const { tscene: { scene, tele: { width, height } } } = this;
        this.renderer2D?.setSize(width, height);
        this.renderer3D?.setSize(width, height);
    }
    onDestroyAll() {
        const { cssobjects } = this;
        for (const key in cssobjects) {
            const cssobject = cssobjects[key];
            cssobject.remove();
        }
    }
}
//# sourceMappingURL=labels.js.map