import {
	AmbientLight,
	CameraHelper,
	DirectionalLight,
	EquirectangularRefractionMapping,
	Group,
	OrthographicCamera,
	Scene,
	Vector3,
} from 'three';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
/**请求帮助添加平行光线 */
function addDirectionalLight(
	scene: Scene | Group,
	options: {
		position?: Vector3;
		target?: Vector3;
		shadowCamera?: { near; far; left; right; top; bottom; normalBias; mapSize };
		intensity?: number;
	} = {}
): DirectionalLight {
	const {
			position = new Vector3(0, 1, 0),
			target = new Vector3(0, 0, 0),
			intensity = 1.0,
			shadowCamera: { near, far, left, right, top, bottom, mapSize, normalBias } = {},
		} = options,
		directionalLight = new DirectionalLight(0xffffff, intensity),
		shadow = directionalLight.shadow,
		camera = shadow.camera;
	console.log(near, far, left, right, top, bottom);
	directionalLight.position.copy(position);
	directionalLight.target.position.copy(target);
	scene.add(directionalLight.target);
	directionalLight.castShadow = true;
	shadow.mapSize.width = mapSize || 5096;
	shadow.mapSize.height = mapSize || 5096;
	camera.near = near || -37.7;
	camera.far = far || 320;
	camera.left = left || -80;
	camera.right = right || 280;
	camera.top = top || 39.9;
	camera.bottom = bottom || -70;
	/**防止出现伪影(由于像素问题导致投射自身阴影到自己表面) */
	shadow.normalBias = normalBias || 0.2;
	camera.updateProjectionMatrix();
	scene.add(directionalLight);
	/**castShadow = true时查看阴影生成范围 */
	// const directionalLightCameraHelper = new CameraHelper(directionalLight.shadow.camera);
	// scene.add(directionalLightCameraHelper);
	// const update = () => {
	//     camera.updateProjectionMatrix();
	//     directionalLightCameraHelper.update()
	// }
	// Helper.gui.on(camera, '阴影相机', [
	//     { name: "near", param: 'near', ifNums: [-1000, 1000, 0.1], change: update },
	//     { name: "far", param: 'far', ifNums: [-1000, 1000, 0.1], change: update },
	//     { name: "left", param: 'left', ifNums: [-1000, 1000, 0.1], change: update },
	//     { name: "right", param: 'right', ifNums: [-1000, 1000, 0.1], change: update },
	//     { name: "top", param: 'top', ifNums: [-1000, 1000, 0.1], change: update },
	//     { name: "bottom", param: 'bottom', ifNums: [-1000, 1000, 0.1], change: update }
	// ])
	// Helper.gui.on({ color: directionalLight.color }, '平行光', [{
	//     name: '颜色', param: 'color', ifColor: true, change: (color: any) => {
	//         directionalLight.color.set(color)
	//     },
	// }])
	// Helper.gui.on(directionalLight.position, '平行光', [
	//     { name: '位置', param: 'x', ifNums: [-300, 300, 0.1], },
	//     { name: '位置', param: 'y', ifNums: [-300, 300, 0.1], },
	//     { name: '位置', param: 'z', ifNums: [-300, 300, 0.1], },
	// ])
	return directionalLight;
}
/**请求帮助添加环境光 */
function addAmbientLight(
	scene: Scene | Group,
	positions: Vector3[] = [new Vector3(-100, 50, 0), new Vector3(100, 50, 0), new Vector3(0, 50, -100), new Vector3(0, 50, 100)]
) {
	for (let i = 0, len = positions.length; i < len; i++) {
		let ambient = new AmbientLight(0xffffff, 0.7);
		ambient.position.copy(positions[i]);
		scene.add(ambient);
	}
}
/**请求帮助添加环境光 */
function addHDR(scene: Scene, path: string) {
	return new RGBELoader().loadAsync(path).then((hdr) => {
		hdr.mapping = EquirectangularRefractionMapping;
		scene.environment = hdr;
		scene.background = hdr;
	});
}

export { addDirectionalLight as u3_addDirectional, addAmbientLight as u3_addAmbient, addHDR as u3_addHDR };
