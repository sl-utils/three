/**事件类 */
export class TEvent<T extends string = string> {
   constructor() {
        this.cbs._core = Object.create(null);
    }
    /**注册回调事件 
     * key: 事件名.空间名,/事件名.空间名,/事件名.空间名
    */
    public cb = new Proxy(Object.create(null), {
        get: (target, key: T | `${T}.${string}`, receiver) => {
            return (arg: any[]) => {
                this.trigger(key as T, arg)
            };
        },
        set: (target, key: T | `${T}.${string}`, value, receiver) => {
            this.on(key as T, value)
            return true;
        }
    })
    /**事件回调函数集合 */
    private cbs: TEventCallback = Object.create(null);
    /**执行后注销事件 */
    private onces: Function[] = [];
    /**销毁方法 */
    public kill() {
        this.cbs = Object.create(null)
        this.cbs._core = Object.create(null)
    }
    /**注册事件
     * @param name 事件名(申明特殊的事件空间用'事件名.事件空间',多个事件'事件名[.事件空间],/'分割),
     * @param callback 事件回调函数
     * @return @type Array<事件名[.事件空间]> 
     */
    public on(name: T | `${T}.${string}`, callback: Function, once: boolean = false): string[] {
        if (typeof name === 'undefined' || name === '') {
            console.warn('事件注册异常: 事件名未设置');
            return;
        }
        if (typeof callback === 'undefined') {
            console.warn('事件注册异常: 回调事件未设置')
            return;
        }
        const that = this, { cbs, onces } = that, names = that.resolveNames(name);
        if (once) onces.push(callback);
        //注册事件
        names.forEach((_name) => {
            const res = that.resolveName(_name), { space, name } = res;
            // Object.create(null) instanceof Object == false
            if (!cbs[space])
                cbs[space] = Object.create(null)
            if (!(cbs[space][name] instanceof Array))
                cbs[space][name] = []
            cbs[space][name].push(callback)
        })
        return names;
    }
    /**关闭注销事件
     * @param name 事件名(申明特殊的事件空间用'事件名.事件空间',多个事件'事件名[.事件空间],/'分割),
     */
    public off(_names: T | `${T}.${string}` | `.${string}`) {
        if (typeof _names === 'undefined' || _names === '') {
            console.warn('事件注销异常: 事件名未设置');
            return false
        }
        const that = this, names = that.resolveNames(_names);
        //注销事件
        names.forEach((_name) => {
            const res = that.resolveName(_name), { space, name } = res, { cbs } = that;
            if (space !== '_core' && name === '') {
                Reflect.deleteProperty(cbs, space)
            } else {
                if (space === '_core') {
                    for (const space in cbs) {
                        if (cbs[space] instanceof Object) {
                            Reflect.deleteProperty(cbs[space], name)
                            if (Object.keys(cbs[space]).length === 0) Reflect.deleteProperty(cbs, space)
                        }
                    }
                } else if (cbs[space] instanceof Object) {
                    Reflect.deleteProperty(cbs[space], name)
                    if (Object.keys(cbs[space]).length === 0) Reflect.deleteProperty(cbs, space)
                }
            }
        })
        return this
    }
    /**触发指定事件
    * Trigger
    */
    public trigger(_name: T, _args: any[] = []): void {
        if (typeof _name === 'undefined' || _name === '') {
            console.warn('事件触发异常: 事件名未设置');
            return
        }
        const that = this, { cbs } = that;
        const args = !(_args instanceof Array) ? [_args] : _args;
        const names = that.resolveNames(_name), { space, name } = that.resolveName(names[0])
        //未指定事件名
        if (name === '') {
            console.warn('事件触发异常: 事件名未设置')
            return
        }
        //未指定命名空间，触发所有该事件
        if (space === '_core') {
            for (const space in cbs) {
                if (typeof cbs[space] == 'object' && cbs[space][name] instanceof Array) {
                    const callbacks = cbs[space][name];
                    callbacks.forEach((callback) => {
                        callback.apply(this, args)
                    })
                }
            }
        } else if (typeof cbs[space] == 'object' && cbs[space][name] instanceof Array) {
            //只触发指定命名空间的事件
            cbs[space][name].forEach((callback) => {
                callback.apply(this, args)
            })
        }
    }
    /**
     * 解析事件名
     */
    private resolveNames(_names: string): string[] {
        _names = _names.replace(/[^a-zA-Z0-9 ,/.]/g, '')
        _names = _names.replace(/[,/]+/g, ' ')
        return _names.split(' ')
    }
    /**
     * 解析事件名和事件空间
     */
    private resolveName(name: string): TEventSpace {
        const parts = name.split('.'), res = Object.create(null);
        res.original = name;
        res.name = parts[0];
        res.space = parts[1] || '_core';
        return res;
    }
}
/**事件空间 */
interface TEventSpace {
    /**原始事件名 */
    original: string;
    /**事件名 */
    name: string;
    /**事件存放的空间(未申明时存放于_core) */
    space: string;
}
/**事件回调函数 */
interface TEventCallback {
    /**最基础的事件空间 */
    _core: { [key: string]: Function[] }
    /**特殊申明的事件空间 */
    [key: string]: { [key: string]: Function[] };
}