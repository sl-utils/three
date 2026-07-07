import { Quaternion, Vector3 } from "three";

/**
 * 经纬度转 像素坐标
 * @param currentLatlng 当前经纬度 坐标
 * @param orginLatlng 原点所在经纬度 默认左上角
 * @param boundMeter  原点到边界距离多少m
 * @param boundPixel  原点到边界距离多少像素
 * @param offsetX 原点左上角pixel 偏移到某个位置
 * @param offsetY 原点左上角pixel 偏移到某个位置（比如 圆心距离左上角偏移
 * 计算 像素和经纬度之间的比例
 */
function latlngToPixel(currentLatlng: [number, number], orginLatlng: [number, number], boundMeter: number, boundPixel: number, offsetX: number = 0, offsetY: number = 0) {
    const [orglat, orglng] = orginLatlng;
    const [curlat, curlng] = currentLatlng;
    const { x: ox, z: oy } = latlngToMercator(orglat, orglng);
    const { x: cx, z: cy } = latlngToMercator(curlat, curlng);
    const scale = boundPixel / boundMeter;// 每米对应多少像素;
    const dx = cx - ox; const dy = cy - oy;
    return [scale * dx + offsetX, scale * dy + offsetY];
}
// 将经纬度转换为墨卡托投影坐标
function latlngToMercator(latitude: number, longitude: number): Vector3 {
    const earthRadius = 6371000; // 地球半径（米）
    // 将纬度从度转换为弧度
    const latRad = latitude * Math.PI / 180;
    // 计算墨卡托坐标的X、Y值
    const x = earthRadius * longitude * Math.PI / 180;
    const z = earthRadius * Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
    return new Vector3(x, 0, - z);
}
// 将经纬度转换为场景坐标
function latLngToVector3(latitude: number, longitude: number): Vector3 {
    return latlngToMercator(latitude, longitude).multiplyScalar(1 / CONST_SCENE_SCALAR).applyQuaternion(CONST_SCENE_QUATERNION).sub(CONST_CENTER_MERCATOR).add(CONST_CENTER).add(new Vector3(0, 0, 0)).setY(0.2);
}
/**1米对应场景中单位为1.2666 */
const CONST_SCENE_SCALAR: number = 1.29;
/**场景旋转的欧拉角量(东方E表示X正方向) */
const CONST_SCENE_QUATERNION: Quaternion = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), - Math.PI / 180 * 106)
/**比对点的3D坐标(无参照物) */
const CONST_CENTER = new Vector3(30, 0, 3.9);
/**比对点的纬经度(厂区A左上角) */
const CONST_CENTER_LATLNG = [39.74736, 117.54801]
/**用于比对的中心点,该经纬度为坐标系 CONST_RADAR_POSITION 的坐标 */
const CONST_CENTER_MERCATOR: Vector3 = latlngToMercator(CONST_CENTER_LATLNG[0], CONST_CENTER_LATLNG[1]).multiplyScalar(1 / CONST_SCENE_SCALAR).applyQuaternion(CONST_SCENE_QUATERNION);
/**初始相机位置 */
const CONST_CAMERA_POSITION_INIT = new Vector3(-155, 55, 20)
/**看场景中心点 */
const CONST_SCENE_CENTER: Vector3 = new Vector3(-10, -22, 20);
/**雷达位置 */
const CONST_RADAR_POSITION: Vector3 = new Vector3(31.29378, 8.0, -12.18323);
/**摄像机位置 */
const CONST_CAMERA_POSITION: Vector3 = new Vector3(31.29378, 8.5, -11.95508);
export {
    latlngToPixel,
    latlngToMercator,
    latLngToVector3,
    CONST_SCENE_SCALAR,
    CONST_CAMERA_POSITION,
    CONST_CAMERA_POSITION_INIT,
    CONST_SCENE_CENTER,
    CONST_RADAR_POSITION,
}