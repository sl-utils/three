export class TEvent {
    constructor() {
        this.cb = new Proxy(Object.create(null), {
            get: (target, key, receiver) => {
                return (arg) => {
                    this.trigger(key, arg);
                };
            },
            set: (target, key, value, receiver) => {
                this.on(key, value);
                return true;
            }
        });
        this.cbs = Object.create(null);
        this.onces = [];
        this.cbs._core = Object.create(null);
    }
    kill() {
        this.cbs = Object.create(null);
        this.cbs._core = Object.create(null);
    }
    on(name, callback, once = false) {
        if (typeof name === 'undefined' || name === '') {
            console.warn('事件注册异常: 事件名未设置');
            return;
        }
        if (typeof callback === 'undefined') {
            console.warn('事件注册异常: 回调事件未设置');
            return;
        }
        const that = this, { cbs, onces } = that, names = that.resolveNames(name);
        if (once)
            onces.push(callback);
        names.forEach((_name) => {
            const res = that.resolveName(_name), { space, name } = res;
            if (!cbs[space])
                cbs[space] = Object.create(null);
            if (!(cbs[space][name] instanceof Array))
                cbs[space][name] = [];
            cbs[space][name].push(callback);
        });
        return names;
    }
    off(_names) {
        if (typeof _names === 'undefined' || _names === '') {
            console.warn('事件注销异常: 事件名未设置');
            return false;
        }
        const that = this, names = that.resolveNames(_names);
        names.forEach((_name) => {
            const res = that.resolveName(_name), { space, name } = res, { cbs } = that;
            if (space !== '_core' && name === '') {
                Reflect.deleteProperty(cbs, space);
            }
            else {
                if (space === '_core') {
                    for (const space in cbs) {
                        if (cbs[space] instanceof Object) {
                            Reflect.deleteProperty(cbs[space], name);
                            if (Object.keys(cbs[space]).length === 0)
                                Reflect.deleteProperty(cbs, space);
                        }
                    }
                }
                else if (cbs[space] instanceof Object) {
                    Reflect.deleteProperty(cbs[space], name);
                    if (Object.keys(cbs[space]).length === 0)
                        Reflect.deleteProperty(cbs, space);
                }
            }
        });
        return this;
    }
    trigger(_name, _args = []) {
        if (typeof _name === 'undefined' || _name === '') {
            console.warn('事件触发异常: 事件名未设置');
            return;
        }
        const that = this, { cbs } = that;
        const args = !(_args instanceof Array) ? [_args] : _args;
        const names = that.resolveNames(_name), { space, name } = that.resolveName(names[0]);
        if (name === '') {
            console.warn('事件触发异常: 事件名未设置');
            return;
        }
        if (space === '_core') {
            for (const space in cbs) {
                if (typeof cbs[space] == 'object' && cbs[space][name] instanceof Array) {
                    const callbacks = cbs[space][name];
                    callbacks.forEach((callback) => {
                        callback.apply(this, args);
                    });
                }
            }
        }
        else if (typeof cbs[space] == 'object' && cbs[space][name] instanceof Array) {
            cbs[space][name].forEach((callback) => {
                callback.apply(this, args);
            });
        }
    }
    resolveNames(_names) {
        _names = _names.replace(/[^a-zA-Z0-9 ,/.]/g, '');
        _names = _names.replace(/[,/]+/g, ' ');
        return _names.split(' ');
    }
    resolveName(name) {
        const parts = name.split('.'), res = Object.create(null);
        res.original = name;
        res.name = parts[0];
        res.space = parts[1] || '_core';
        return res;
    }
}
//# sourceMappingURL=event.js.map