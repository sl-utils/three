import { Vector3 } from 'three';
/**场景常量 */
/**相机视角切换后切换label配置 */
interface CameraLabelView {
    /**相机位置 */
    position: Vector3;
    /**相机目标也就是物体位置 @alias 如果未申明label_position则该值也为label的位置 */
    target: Vector3;
    /**如果不启动轨道控制器一定要设置为false */
    ifOrbit?: boolean;
    /**设备类型 */
    type?: string;
    /**指定显示的弹窗id */
    label_shows?: string[];
    /**label的位置 @default target */
    label_position?: Vector3;
}
/**实验室模型名称 */
export declare const CONST_BNSV_LABORATORY = "1\u680B\u623F5";
/**默认的设备弹窗id */
export declare const CONST_BNSV_LABEL_DEVICE = "device";
/**场景中某些特定的相机视角和Label显示的配置文件 */
export declare const CONST_BNSV_VIEW_LABLE: {
    [K in string]: CameraLabelView;
};
/**水锤监测要被隐藏的管道和设备 */
export declare const SCENE_HIDES_SCJC: string[];
/**压力管理要被隐藏的管道和设备 */
export declare const SCENE_HIDES_YLGL: string[];
/**水锤监测默认要被关闭的设备 */
export declare const SCENE_DEVICE_CLOSE_SCJC: string[];
/**压力管理默认要被关闭的设备 */
export declare const SCENE_DEVICE_CLOSE_YLGL: string[];
export {};
