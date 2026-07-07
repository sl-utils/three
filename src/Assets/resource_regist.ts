import MODEL_BNSV from './models/bnsw/BNSV.glb';
import MODEL_FACTORY from './models/bnsw/厂房.glb';
import MODEL_PIPE from './models/bnsw/管道内外.glb';
import MODEL_DEVICE from './models/bnsw/设备合集.glb';
import MODEL_WATER from './models/bnsw/水箱.glb';
import MODEL_BODY from './models/bnsw/消除罐.glb';
import MODEL_OTHER from './models/bnsw/周边其他.glb';

import SCENE_A from './models/bnsv_devices/室内消除罐-站立式.glb';
import SCENE_A2 from './models/bnsv_devices/室内消除罐-卧式.glb';
import SCENE_B from './models/bnsv_devices/sys智能空气阀系统.glb';
import SCENE_C from './models/bnsv_devices/sys智能调节阀系统.glb';
import SCENE_D from './models/bnsv_devices/sys反馈式压力控制展车系统.glb';
import SCENE_E from './models/bnsv_devices/sys水锤在线监测展车系统.glb';
import SCENE_BACK from './models/bnsv_devices/sys背景.glb';

import TEXTURE_AIR_ENTER from './textures/air_enter.png';
import TEXTURE_AIR_OUT from './textures/air_out.png';
import TEXTURE_SMOKE from './textures/smoke2.png';
import TEXTURE_SMOKE_IN from './textures/smoke3.png';
import TEXTURE_WATER from './textures/water.png';
import HDR_SKIES from './hdr/Ultimate_Skies_4k_0027.hdr';

/**智能水锤消除罐系统 */
export const RESOURCES_SCENE_A: TResourceInfo[] = [
	{ name: 'SCENE_A', src: SCENE_A, type: 'gltf' },
	{ name: 'SCENE_A2', src: SCENE_A2, type: 'gltf' },
	{ name: 'SCENE_BACK', src: SCENE_BACK, type: 'gltf' },
	{ name: 'HDR_SKIES', src: HDR_SKIES },
	{ name: 'TEXTURE_WATER', src: TEXTURE_WATER },
];
/**智能空气阀系统 */
export const RESOURCES_SCENE_B: TResourceInfo[] = [
	{ name: 'SCENE_B', src: SCENE_B, type: 'gltf' },
	{ name: 'SCENE_BACK', src: SCENE_BACK, type: 'gltf' },
	{ name: 'HDR_SKIES', src: HDR_SKIES },
];
/**智能调节阀系统 */
export const RESOURCES_SCENE_C: TResourceInfo[] = [
	{ name: 'SCENE_C', src: SCENE_C, type: 'gltf' },
	{ name: 'SCENE_BACK', src: SCENE_BACK, type: 'gltf' },
	{ name: 'HDR_SKIES', src: HDR_SKIES },
];
/**反馈式压力控制展车系统 */
export const RESOURCES_SCENE_D: TResourceInfo[] = [
	{ name: 'SCENE_D', src: SCENE_D, type: 'gltf' },
	{ name: 'SCENE_BACK', src: SCENE_BACK, type: 'gltf' },
	{ name: 'HDR_SKIES', src: HDR_SKIES },
];
/**水锤在线监测展车系统 */
export const RESOURCES_SCENE_E: TResourceInfo[] = [
	{ name: 'SCENE_E', src: SCENE_E, type: 'gltf' },
	{ name: 'SCENE_BACK', src: SCENE_BACK, type: 'gltf' },
	{ name: 'HDR_SKIES', src: HDR_SKIES },
];
/**加载动画需要 */
export const RESOURCES_SCENE_LOAD: TResourceInfo[] = [
	{ name: 'LOGO', src: MODEL_BNSV },
	{ name: 'HDR_SKIES', src: HDR_SKIES },
];
/**输水系统 */
export const RESOURCES_SCENE_ALL: TResourceInfo[] = [
	{ name: 'FACTORY', src: MODEL_FACTORY },
	{ name: 'PIPE', src: MODEL_PIPE },
	{ name: 'DEVICE', src: MODEL_DEVICE },
	{ name: 'WATER', src: MODEL_WATER },
	{ name: 'BODY', src: MODEL_BODY },
	{ name: 'OTHER', src: MODEL_OTHER },
	{ name: 'TEXTURE_AIR_OUT', src: TEXTURE_AIR_OUT },
	{ name: 'TEXTURE_SMOKE', src: TEXTURE_SMOKE },
	{ name: 'TEXTURE_SMOKE_IN', src: TEXTURE_SMOKE_IN },
	{ name: 'TEXTURE_AIR_ENTER', src: TEXTURE_AIR_ENTER },
	{ name: 'TEXTURE_WATER', src: TEXTURE_WATER },
	// { name: 'HDR_SKIES', src: HDR_SKIES },
];

import DEVICE_0101 from './models/bnsv_devices/水箱.glb';
import DEVICE_0102 from './models/bnsv_devices/高位水箱.glb';
import DEVICE_0103 from './models/bnsv_devices/低位水箱.glb';
import DEVICE_0201 from './models/bnsv_devices/手动蝶阀.glb';
import DEVICE_0202 from './models/bnsv_devices/电动蝶阀.glb';
import DEVICE_0203 from './models/bnsv_devices/电动蝶阀+伸缩节.glb';
import DEVICE_0301 from './models/bnsv_devices/水泵.glb';
import DEVICE_0401 from './models/bnsv_devices/智能调节阀.glb';
import DEVICE_0501 from './models/bnsv_devices/电动活塞式调节阀+伸缩节.glb';
import DEVICE_0601 from './models/bnsv_devices/止回阀.glb';
import DEVICE_0602 from './models/bnsv_devices/止回阀+伸缩节.glb';
import DEVICE_0701 from './models/bnsv_devices/手动球阀.glb';
import DEVICE_0702 from './models/bnsv_devices/电动球阀.glb';
import DEVICE_0801 from './models/bnsv_devices/手动闸阀.glb';
import DEVICE_0802 from './models/bnsv_devices/手动闸阀+伸缩节.glb';
import DEVICE_0901 from './models/bnsv_devices/电磁流量计.glb';
import DEVICE_0902 from './models/bnsv_devices/电磁流量计+伸缩节.glb';
import DEVICE_1001 from './models/bnsv_devices/爆管阀+伸缩节.glb';
import DEVICE_1101 from './models/bnsv_devices/表盘式压力表.glb';
import DEVICE_1201 from './models/bnsv_devices/高频压力传感器.glb';
import DEVICE_1301 from './models/bnsv_devices/DN50泄放阀+伸缩节.glb';
import DEVICE_1401 from './models/bnsv_devices/DN80空气阀组件、异径接头.glb';
import DEVICE_1402 from './models/bnsv_devices/DN80空气阀组件、异径接头、异径法兰.glb';
import DEVICE_1403 from './models/bnsv_devices/DN50空气阀组件、异径三通、手动蝶阀.glb';
import DEVICE_1404 from './models/bnsv_devices/DN80空气阀组件带闸阀、异径接头.glb';
import DEVICE_1501_A from './models/bnsv_devices/室内消除罐-站立式.glb';
import DEVICE_1501_A2 from './models/bnsv_devices/室内消除罐-卧式.glb';
import DEVICE_1502 from './models/bnsv_devices/室外消除罐.glb';
import DEVICE_1601 from './models/bnsv_devices/末端开关阀.glb';
import DEVICE_1701 from './models/bnsv_devices/电磁阀.glb';
import { TResourceInfo } from '../types';

/**各设备 */
export const RESOURCES_DEVICE_ALL: TResourceInfo[] = [
	{ name: '0101', src: DEVICE_0101, ifDelay: true },
	{ name: '0102', src: DEVICE_0102, ifDelay: true },
	{ name: '0103', src: DEVICE_0103, ifDelay: true },
	{ name: '0201', src: DEVICE_0201, ifDelay: true },
	{ name: '0202', src: DEVICE_0202, ifDelay: true },
	{ name: '0203', src: DEVICE_0203, ifDelay: true },
	{ name: '0301', src: DEVICE_0301, ifDelay: true },
	{ name: '0401', src: DEVICE_0401, ifDelay: true },
	{ name: '0501', src: DEVICE_0501, ifDelay: true },
	{ name: '0601', src: DEVICE_0601, ifDelay: true },
	{ name: '0602', src: DEVICE_0602, ifDelay: true },
	{ name: '0701', src: DEVICE_0701, ifDelay: true },
	{ name: '0702', src: DEVICE_0702, ifDelay: true },
	{ name: '0801', src: DEVICE_0801, ifDelay: true },
	{ name: '0802', src: DEVICE_0802, ifDelay: true },
	{ name: '0901', src: DEVICE_0901, ifDelay: true },
	{ name: '0902', src: DEVICE_0902, ifDelay: true },
	{ name: '1001', src: DEVICE_1001, ifDelay: true },
	{ name: '1101', src: DEVICE_1101, ifDelay: true },
	{ name: '1201', src: DEVICE_1201, ifDelay: true },
	{ name: '1301', src: DEVICE_1301, ifDelay: true },
	{ name: '1401', src: DEVICE_1401, ifDelay: true },
	{ name: '1402', src: DEVICE_1402, ifDelay: true },
	{ name: '1403', src: DEVICE_1403, ifDelay: true },
	{ name: '1404', src: DEVICE_1404, ifDelay: true },
	{ name: '1501-A', src: DEVICE_1501_A, ifDelay: true },
	{ name: '1501-A2', src: DEVICE_1501_A2, ifDelay: true },
	{ name: '1502', src: DEVICE_1502, ifDelay: true },
	{ name: '1601', src: DEVICE_1601, ifDelay: true },
	{ name: '1701', src: DEVICE_1701, ifDelay: true },
	{ name: '9001', src: SCENE_B, ifDelay: true },
	{ name: '9002', src: SCENE_C, ifDelay: true },
];
