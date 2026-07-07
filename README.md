# cesium
cesium

# 注意事项
1、将静态资源文件夹`Assets` 所有文件放到项目静态文件夹目录中；

2、`@sl-utils/three/styles.css` 通过@import导入到项目样式文件中(暂无特殊样式 )；

3、

# 项目说明
本项目是基于three的3D视图HTML节点管理类，核心控制类为`SLTScene`。推荐所有使用者的场景类都继承`SLTScene`。
```js
    import { SLTScene } from '@sl-utils/three';
    class Scene extends SLTScene {
        constructor(html: string | HTMLElement) {
            super(html)
        }
    }
```

# 源码解读
核心文件存放于`src/core/`，其中包含了`TElement`、`TEvent`、`CClock`、`SLTScene`等类的实现.
`SLTScene`类是核心类，继承自`TEvent`类，不仅包含了`three`原生的`Scene`实例，还创建了`TElement`、`TEvent`、`CClock`、`TScene`等类的实例。并将这些实例类的部分属性挂载到自身属性上。通过前缀`t`来确认为扩展属性，如要使用原生属性直接调用即可。
`SLTScene`类的属性
--`tscene`属性挂载了`TScene`类的实例,`scene`属性挂载了`three`原生的`Scene`实例。
--`tvents`属性挂载了`TScene`类中的`TEvents`类的实例,用于管理场景事件总线。
--`tprimitives`属性挂载了`TScene`类中的`TPrimitives`类的实例,用于管理场景中的图元集合。
--`...`

# 关于场景TScene
## TScene类由场景事件总线[TEvents] + 相机[CCamera] + 地球[CGlobe] + 图层[CLayer] + 地形[CTerrain] + 图元集合[TPrimitives] + 实体集合[TEntity] + 相机[CCamera] 组成

# 关于图元TPrimitives
## 图元集合由广告牌集合(图元集合) + 基元集合(图元集合)



