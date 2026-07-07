import { Group, Material, Object3D, Scene, ShaderMaterial, Texture } from "three";

/**该mesh对象是否在Group中  */
function isInGroup(mesh: Object3D, group: Group | Object3D): boolean {
    if (!(group instanceof Group || group instanceof Object3D)) return false;
    let children = group.children;
    if (children.includes(mesh)) return true;
    for (let i = 0; i < children.length; i++) {
        let item = children[i];
        if (item instanceof Group || item instanceof Object3D) {
            if (isInGroup(mesh, item)) return true;
        }
    }
    return false;
}
/**完全移除 */
function removeAll(obj: Object3D) {
    if (obj instanceof Scene) {

    }
    let children = obj.children || [];
    obj.parent?.remove(obj);
    console.log('已移除：' + obj.name)
    children.forEach(item => removeAll(item));
    obj.clear?.();
    obj.children = [];
}
/**销毁、停止跟踪相关资源 */
function destoryAll(obj: Object3D) {
    if (!obj) return;
    if (obj instanceof Group || obj instanceof Object3D) {
        let children = obj.children;
        for (let i = 0; i < children.length; i++) {
            let item = children[i];
            destoryAll(item);
        }
        obj.clear();
    }
    obj.clear();
    obj.visible = false;
    obj['geometry']?.dispose();
    disposeMaterial(obj['material']);
}
/**销毁材质贴图的办法 */
function disposeMaterial(material: Material | ShaderMaterial | any) {
    if (material instanceof Material) {
        for (const value of Object.values(material)) {
            if (value instanceof Texture) {
                (value as Texture).dispose();
            }
        }
        if (material['uniforms']) {
            for (const value of Object.values(material['uniforms'])) {
                if (value) {
                    const uniformValue = (value as any).value;
                    if (uniformValue instanceof Texture) {
                        uniformValue.dispose();
                    }
                    if (Array.isArray(uniformValue)) {
                        uniformValue.length = 0;
                    }
                }
            }
        }
        material.dispose();
    }
}
/**获得一个uuid */
function UUID() {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); // use high-precision timer if available
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

export {
    isInGroup as u3_isInGroup,
    removeAll as u3_removeAll,
    destoryAll as u3_destoryAll,
    disposeMaterial as u3_disposeMaterial,
    UUID as u3_UUID,
}