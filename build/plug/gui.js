import { GUI } from "dat.gui";
import { Color } from "three";
export class Gui {
    static on(obj, name, ctrs) {
        if (!this.gui)
            return;
        let floder = this.folders[name] = this.folders[name] || this.gui.addFolder(`${name}`);
        for (let i = 0, len = ctrs.length; i < len; i++) {
            const { name, param, listen, ifColor, ifNums, ifNums: [min, max, step] = [], callback, items, change } = ctrs[i];
            let data = obj, ctr;
            let parmas = param.split('.') || [], last = parmas[parmas.length - 1];
            for (let i = 0, len = parmas.length - 1; i < len; i++) {
                data = data[parmas[i]];
            }
            if (ifColor) {
                const info = data[last];
                if (info instanceof Color) {
                    let obj = { color: info.getHex() };
                    ctr = floder.addColor(obj, 'color');
                    ctr.onChange(e => {
                        info.setHex(e);
                    });
                }
                else {
                    ctr = floder.addColor(obj, last);
                }
            }
            else if (callback)
                ctr = floder.add({ [last]: callback }, last);
            else if (ifNums)
                ctr = floder.add(data, last).step(step).min(min).max(max);
            else
                ctr = floder.add(data, last, items);
            if (listen)
                ctr.listen();
            if (change)
                ctr.onChange(change);
            ctr.name(name);
        }
    }
    static onGuiFolderBase(mesh, name, min = -100, max = 100) {
        if (!this.gui)
            return;
        let floder = this.folders[name] = this.folders[name] || this.gui.addFolder(`${name}`);
        floder.add(mesh.rotation, 'x').step(0.001).min(-5).max(5).name('rotationX').listen();
        floder.add(mesh.rotation, 'y').step(0.001).min(-5).max(5).name('rotationY').listen();
        floder.add(mesh.rotation, 'z').step(0.001).min(-5).max(5).name('rotationZ').listen();
        floder.add(mesh.position, 'x').step(0.001).min(min).max(max).name('positionX').listen();
        floder.add(mesh.position, 'y').step(0.001).min(min).max(max).name('positionY').listen();
        floder.add(mesh.position, 'z').step(0.001).min(min).max(max).name('positionZ').listen();
    }
}
Gui.gui = new GUI({ width: 320, });
Gui.folders = {};
//# sourceMappingURL=gui.js.map