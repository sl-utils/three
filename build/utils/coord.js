import { Quaternion, Vector3 } from "three";
function latlngToPixel(currentLatlng, orginLatlng, boundMeter, boundPixel, offsetX = 0, offsetY = 0) {
    const [orglat, orglng] = orginLatlng;
    const [curlat, curlng] = currentLatlng;
    const { x: ox, z: oy } = latlngToMercator(orglat, orglng);
    const { x: cx, z: cy } = latlngToMercator(curlat, curlng);
    const scale = boundPixel / boundMeter;
    const dx = cx - ox;
    const dy = cy - oy;
    return [scale * dx + offsetX, scale * dy + offsetY];
}
function latlngToMercator(latitude, longitude) {
    const earthRadius = 6371000;
    const latRad = latitude * Math.PI / 180;
    const x = earthRadius * longitude * Math.PI / 180;
    const z = earthRadius * Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
    return new Vector3(x, 0, -z);
}
function latLngToVector3(latitude, longitude) {
    return latlngToMercator(latitude, longitude).multiplyScalar(1 / CONST_SCENE_SCALAR).applyQuaternion(CONST_SCENE_QUATERNION).sub(CONST_CENTER_MERCATOR).add(CONST_CENTER).add(new Vector3(0, 0, 0)).setY(0.2);
}
const CONST_SCENE_SCALAR = 1.29;
const CONST_SCENE_QUATERNION = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), -Math.PI / 180 * 106);
const CONST_CENTER = new Vector3(30, 0, 3.9);
const CONST_CENTER_LATLNG = [39.74736, 117.54801];
const CONST_CENTER_MERCATOR = latlngToMercator(CONST_CENTER_LATLNG[0], CONST_CENTER_LATLNG[1]).multiplyScalar(1 / CONST_SCENE_SCALAR).applyQuaternion(CONST_SCENE_QUATERNION);
const CONST_CAMERA_POSITION_INIT = new Vector3(-155, 55, 20);
const CONST_SCENE_CENTER = new Vector3(-10, -22, 20);
const CONST_RADAR_POSITION = new Vector3(31.29378, 8.0, -12.18323);
const CONST_CAMERA_POSITION = new Vector3(31.29378, 8.5, -11.95508);
export { latlngToPixel, latlngToMercator, latLngToVector3, CONST_SCENE_SCALAR, CONST_CAMERA_POSITION, CONST_CAMERA_POSITION_INIT, CONST_SCENE_CENTER, CONST_RADAR_POSITION, };
//# sourceMappingURL=coord.js.map