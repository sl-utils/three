import { Group, Material, Object3D, ShaderMaterial } from "three";
/**该mesh对象是否在Group中  */
declare function isInGroup(mesh: Object3D, group: Group | Object3D): boolean;
/**完全移除 */
declare function removeAll(obj: Object3D): void;
/**销毁、停止跟踪相关资源 */
declare function destoryAll(obj: Object3D): void;
/**销毁材质贴图的办法 */
declare function disposeMaterial(material: Material | ShaderMaterial | any): void;
/**获得一个uuid */
declare function UUID(): string;
export { isInGroup as u3_isInGroup, removeAll as u3_removeAll, destoryAll as u3_destoryAll, disposeMaterial as u3_disposeMaterial, UUID as u3_UUID, };
