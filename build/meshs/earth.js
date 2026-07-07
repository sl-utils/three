import { Group, IcosahedronGeometry, Mesh, MeshBasicMaterial, SRGBColorSpace, SphereGeometry, Spherical, Vector3 } from "three";
import { MaterialEarth } from "../materials/earth/material";
import EarthDaymap from '../resource/assets/earth/8k_earth_daymap.jpg';
import EarthNightmap from '../resource/assets/earth/8k_earth_nightmap.jpg';
import EarthSpecularClouds from '../resource/assets/earth/earth_specular_clouds.jpg';
import { MaterialAtmosphere } from "../materials/atmosphere/material";
import { SLTScene, TEvent } from "src/core";
export class MeshEarth extends TEvent {
    constructor(tscene, resource) {
        super();
        this.container = new Group();
        const material = new MaterialEarth();
        const earthGeometry = new SphereGeometry(0.1, 128, 128);
        const earth = new Mesh(earthGeometry, material);
        earth.position.set(0.0, 0, -1);
        const load = resource, resources = load.items;
        const atmosphere = new Mesh(earthGeometry, new MaterialAtmosphere());
        atmosphere.scale.set(1.05, 1.05, 1.05);
        atmosphere.position.set(0.0, 0, 0);
        atmosphere.material.uniforms.uColorAtmosphere1 = material.uniforms.uColorAtmosphere1;
        atmosphere.material.uniforms.uColorAtmosphere2 = material.uniforms.uColorAtmosphere2;
        const debugSun = new Mesh(new IcosahedronGeometry(5.0, 2), new MeshBasicMaterial());
        const sunSpherical = new Spherical(1, Math.PI * 0.5, 0.5);
        sunSpherical.theta = -0.4066;
        sunSpherical.phi = 1.10653;
        const sunDirection = new Vector3();
        const updateSun = () => {
            sunDirection.setFromSpherical(sunSpherical);
            debugSun.position.copy(sunDirection).multiplyScalar(256);
        };
        updateSun();
        SLTScene.gui.on(material.uniforms, 'uniforms', [
            { name: '辉光亮处', param: 'uColorAtmosphere1.value', ifColor: true },
            { name: '辉光暗处', param: 'uColorAtmosphere2.value', ifColor: true },
        ]);
        SLTScene.gui.on(sunSpherical, 'sun', [
            { name: 'phi', param: 'phi', ifNums: [0, Math.PI, Math.PI / 1800], change: updateSun },
            { name: 'theta', param: 'theta', ifNums: [-Math.PI, Math.PI, Math.PI / 1800], change: updateSun },
        ]);
        tscene.on('TICK', () => { earth.rotateY(Math.PI / 1800); });
        tscene.on('RESIZE', (size) => {
            material.uniforms.uSunDirection.value = sunDirection;
            atmosphere.material.uniforms.uSunDirection.value = sunDirection;
        });
        load.load([
            { name: 'EarthDaymap', src: EarthDaymap, type: 'texture' },
            { name: 'EarthNightmap', src: EarthNightmap, type: 'texture' },
            { name: 'EarthSpecularClouds', src: EarthSpecularClouds, type: 'texture' },
        ]);
        load.event.on('end', () => {
            const texture1 = resources['EarthDaymap'], texture2 = resources['EarthNightmap'], texture3 = resources['EarthSpecularClouds'];
            texture1.colorSpace = texture2.colorSpace = SRGBColorSpace;
            texture1.anisotropy = texture2.anisotropy = texture3.anisotropy = 8;
            material.uniforms.uDaymap.value = texture1;
            material.uniforms.uNightmap.value = texture2;
            material.uniforms.uSpecularClouds.value = texture3;
            this.container.add(earth);
            this.container.add(atmosphere);
            this.container.add(debugSun);
        });
    }
}
//# sourceMappingURL=earth.js.map