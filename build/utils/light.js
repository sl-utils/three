import { AmbientLight, DirectionalLight, EquirectangularRefractionMapping, Vector3, } from 'three';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
function addDirectionalLight(scene, options = {}) {
    const { position = new Vector3(0, 1, 0), target = new Vector3(0, 0, 0), intensity = 1.0, shadowCamera: { near, far, left, right, top, bottom, mapSize, normalBias } = {}, } = options, directionalLight = new DirectionalLight(0xffffff, intensity), shadow = directionalLight.shadow, camera = shadow.camera;
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
    shadow.normalBias = normalBias || 0.2;
    camera.updateProjectionMatrix();
    scene.add(directionalLight);
    return directionalLight;
}
function addAmbientLight(scene, positions = [new Vector3(-100, 50, 0), new Vector3(100, 50, 0), new Vector3(0, 50, -100), new Vector3(0, 50, 100)]) {
    for (let i = 0, len = positions.length; i < len; i++) {
        let ambient = new AmbientLight(0xffffff, 0.7);
        ambient.position.copy(positions[i]);
        scene.add(ambient);
    }
}
function addHDR(scene, path) {
    return new RGBELoader().loadAsync(path).then((hdr) => {
        hdr.mapping = EquirectangularRefractionMapping;
        scene.environment = hdr;
        scene.background = hdr;
    });
}
export { addDirectionalLight as u3_addDirectional, addAmbientLight as u3_addAmbient, addHDR as u3_addHDR };
//# sourceMappingURL=light.js.map