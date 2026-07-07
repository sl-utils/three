import { DirectionalLight, Group, Scene, Vector3 } from 'three';
/**请求帮助添加平行光线 */
declare function addDirectionalLight(scene: Scene | Group, options?: {
    position?: Vector3;
    target?: Vector3;
    shadowCamera?: {
        near: any;
        far: any;
        left: any;
        right: any;
        top: any;
        bottom: any;
        normalBias: any;
        mapSize: any;
    };
    intensity?: number;
}): DirectionalLight;
/**请求帮助添加环境光 */
declare function addAmbientLight(scene: Scene | Group, positions?: Vector3[]): void;
/**请求帮助添加环境光 */
declare function addHDR(scene: Scene, path: string): Promise<void>;
export { addDirectionalLight as u3_addDirectional, addAmbientLight as u3_addAmbient, addHDR as u3_addHDR };
