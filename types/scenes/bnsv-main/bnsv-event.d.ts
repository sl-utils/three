import { BnsvModel } from './bnsv-model';
import { SLTScene } from 'src/core';
/**
 * 智慧输水、水锤监测、压力管理系统
 * 反引号键( ` ) + 1 : 返回到最初视角
 * 反引号键( ` ) + 2 : 返回到进入实验室视角
 * 反引号键( ` ) + 3 : 切换到查看水箱视角
 * 反引号键( ` ) + 4 : 切换到查看室内消除罐视角
 * 反引号键( ` ) + 5 : 切换到查看室外消除罐视角
 * 反引号键( ` ) + Q : 强制切换控制模式(键盘控制、鼠标控制)
 * 键盘控制模式下
 * W | ArrowUp 镜头前推
 * S | ArrowDown 镜头后退
 * A | ArrowLeft 镜头左移
 * D | ArrowRight 镜头右移
 * R 镜头上移
 * F 镜头下移
 * space+鼠标点击 : 镜头旋转(旋转方向与鼠标点击相对屏幕位置正相关，鼠标持续按住不放，镜头持续旋转)
 *
 * 鼠标控制模式下
 * 鼠标左键按住左右上下拖动 : 镜头围绕单点转动
 * 鼠标右键按住拖动 : 拖动场景
 * 鼠标滚轮滚动 : 前进后退
 *
 * 单设备系统
 * T : 切换控制组件为移动模式
 * R : 切换控制组件为旋转模式
 * S : 切换控制组件为缩放模式
 * Esc : 模型复原
 * 鼠标左键按住左右上下拖动 : 镜头围绕单点转动
 * 鼠标右键按住拖动 : 拖动场景
 * 鼠标滚轮滚动 : 前进后退
 *
 */
export declare class BnsvEvent {
    private scene;
    constructor(scene: SLTScene<BnsvMainEvents>, models: BnsvModel);
    /**事件类是否能用 */
    enabled: boolean;
    /**所有的模型 */
    private models;
    /**记录用户浏览时最近的设备名 */
    private view_name;
    /**事件导致切换视角的目标名称 */
    private view_target_name;
    /**注册监听事件 */
    private openEvent;
    /**根据id切换视角并展示指定的label
     * @param id 要切换到的视角id
     * @param force 是否强制切换
     */
    onViewSwitch: (id: string, force?: boolean) => void;
    /**计算距离 */
    private computeDistance;
    /**点是否在可视范围 */
    private isPointInViewport;
}
/**检查事件目标是否是device-pop或其子元素 */
export declare function isClickOnDevicePop(event: MouseEvent): boolean;
