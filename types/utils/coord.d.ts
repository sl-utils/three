import { Vector3 } from "three";
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
declare function latlngToPixel(currentLatlng: [number, number], orginLatlng: [number, number], boundMeter: number, boundPixel: number, offsetX?: number, offsetY?: number): number[];
declare function latlngToMercator(latitude: number, longitude: number): Vector3;
declare function latLngToVector3(latitude: number, longitude: number): Vector3;
/**1米对应场景中单位为1.2666 */
declare const CONST_SCENE_SCALAR: number;
/**初始相机位置 */
declare const CONST_CAMERA_POSITION_INIT: Vector3;
/**看场景中心点 */
declare const CONST_SCENE_CENTER: Vector3;
/**雷达位置 */
declare const CONST_RADAR_POSITION: Vector3;
/**摄像机位置 */
declare const CONST_CAMERA_POSITION: Vector3;
export { latlngToPixel, latlngToMercator, latLngToVector3, CONST_SCENE_SCALAR, CONST_CAMERA_POSITION, CONST_CAMERA_POSITION_INIT, CONST_SCENE_CENTER, CONST_RADAR_POSITION, };
