function e() {}

function t() {
    t.init.call(this);
}

function n(e) {
    return void 0 === e._maxListeners ? t.defaultMaxListeners : e._maxListeners;
}

function r(e, t, n) {
    if (t) e.call(n); else for (var r = e.length, i = c(e, r), s = 0; s < r; ++s) i[s].call(n);
}

function i(e, t, n, r) {
    if (t) e.call(n, r); else for (var i = e.length, s = c(e, i), o = 0; o < i; ++o) s[o].call(n, r);
}

function s(e, t, n, r, i) {
    if (t) e.call(n, r, i); else for (var s = e.length, o = c(e, s), u = 0; u < s; ++u) o[u].call(n, r, i);
}

function o(e, t, n, r, i, s) {
    if (t) e.call(n, r, i, s); else for (var o = e.length, u = c(e, o), f = 0; f < o; ++f) u[f].call(n, r, i, s);
}

function u(e, t, n, r) {
    if (t) e.apply(n, r); else for (var i = e.length, s = c(e, i), o = 0; o < i; ++o) s[o].apply(n, r);
}

function f(t, r, i, s) {
    var o, u, f;
    if ("function" != typeof i) throw new TypeError('"listener" argument must be a function');
    if ((u = t._events) ? (u.newListener && (t.emit("newListener", r, i.listener ? i.listener : i), 
    u = t._events), f = u[r]) : (u = t._events = new e(), t._eventsCount = 0), f) {
        if ("function" == typeof f ? f = u[r] = s ? [ i, f ] : [ f, i ] : s ? f.unshift(i) : f.push(i), 
        !f.warned && (o = n(t)) && o > 0 && f.length > o) {
            f.warned = !0;
            var a = new Error("Possible EventEmitter memory leak detected. " + f.length + " " + r + " listeners added. Use emitter.setMaxListeners() to increase limit");
            a.name = "MaxListenersExceededWarning", a.emitter = t, a.type = r, a.count = f.length, 
            process && process.emitWarning(a);
        }
    } else f = u[r] = i, ++t._eventsCount;
    return t;
}

function a(e, t, n) {
    function r() {
        e.removeListener(t, r), i || (i = !0, n.apply(e, arguments));
    }
    var i = !1;
    return r.listener = n, r;
}

function l(e) {
    var t = this._events;
    if (t) {
        var n = t[e];
        if ("function" == typeof n) return 1;
        if (n) return n.length;
    }
    return 0;
}

function h(e, t) {
    for (var n = t, r = n + 1, i = e.length; r < i; n += 1, r += 1) e[n] = e[r];
    e.pop();
}

function c(e, t) {
    for (var n = new Array(t); t--; ) n[t] = e[t];
    return n;
}

function p(e) {
    for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
    return t;
}

var v;

e.prototype = Object.create(null), module.exports = t, t.EventEmitter = t, t.usingDomains = !1, 
t.prototype.domain = void 0, t.prototype._events = void 0, t.prototype._maxListeners = void 0;

var m = 10;

Object.defineProperty(t, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
        return m;
    },
    set: function(e) {
        console, m = e;
    }
}), t.init = function() {
    this.domain = null, t.usingDomains && (!(v = v || require("domain")).active || this instanceof v.Domain || (this.domain = v.active)), 
    this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = new e(), 
    this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
}, t.prototype.setMaxListeners = function(e) {
    if ("number" != typeof e || e < 0 || isNaN(e)) throw new TypeError('"n" argument must be a positive number');
    return this._maxListeners = e, this;
}, t.prototype.getMaxListeners = function() {
    return n(this);
}, t.prototype.emit = function(e) {
    var t, n, f, a, l, h, c, p = !1, v = "error" === e;
    if (h = this._events) v = v && null == h.error; else if (!v) return !1;
    if (c = this.domain, v) {
        if (t = arguments[1], !c) {
            if (t instanceof Error) throw t;
            var m = new Error('Uncaught, unspecified "error" event. (' + t + ")");
            throw m.context = t, m;
        }
        return t || (t = new Error('Uncaught, unspecified "error" event')), t.domainEmitter = this, 
        t.domain = c, t.domainThrown = !1, c.emit("error", t), !1;
    }
    if (!(n = h[e])) return !1;
    c && this !== process && (c.enter(), p = !0);
    var y = "function" == typeof n;
    switch (f = arguments.length) {
      case 1:
        r(n, y, this);
        break;

      case 2:
        i(n, y, this, arguments[1]);
        break;

      case 3:
        s(n, y, this, arguments[1], arguments[2]);
        break;

      case 4:
        o(n, y, this, arguments[1], arguments[2], arguments[3]);
        break;

      default:
        for (a = new Array(f - 1), l = 1; l < f; l++) a[l - 1] = arguments[l];
        u(n, y, this, a);
    }
    return p && c.exit(), !0;
}, t.prototype.addListener = function(e, t) {
    return f(this, e, t, !1);
}, t.prototype.on = t.prototype.addListener, t.prototype.prependListener = function(e, t) {
    return f(this, e, t, !0);
}, t.prototype.once = function(e, t) {
    if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
    return this.on(e, a(this, e, t)), this;
}, t.prototype.prependOnceListener = function(e, t) {
    if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
    return this.prependListener(e, a(this, e, t)), this;
}, t.prototype.removeListener = function(t, n) {
    var r, i, s, o, u;
    if ("function" != typeof n) throw new TypeError('"listener" argument must be a function');
    if (!(i = this._events)) return this;
    if (!(r = i[t])) return this;
    if (r === n || r.listener && r.listener === n) 0 == --this._eventsCount ? this._events = new e() : (delete i[t], 
    i.removeListener && this.emit("removeListener", t, r.listener || n)); else if ("function" != typeof r) {
        for (s = -1, o = r.length; o-- > 0; ) if (r[o] === n || r[o].listener && r[o].listener === n) {
            u = r[o].listener, s = o;
            break;
        }
        if (s < 0) return this;
        if (1 === r.length) {
            if (r[0] = void 0, 0 == --this._eventsCount) return this._events = new e(), this;
            delete i[t];
        } else h(r, s);
        i.removeListener && this.emit("removeListener", t, u || n);
    }
    return this;
}, t.prototype.removeAllListeners = function(t) {
    var n, r;
    if (!(r = this._events)) return this;
    if (!r.removeListener) return 0 === arguments.length ? (this._events = new e(), 
    this._eventsCount = 0) : r[t] && (0 == --this._eventsCount ? this._events = new e() : delete r[t]), 
    this;
    if (0 === arguments.length) {
        for (var i, s = Object.keys(r), o = 0; o < s.length; ++o) "removeListener" !== (i = s[o]) && this.removeAllListeners(i);
        return this.removeAllListeners("removeListener"), this._events = new e(), this._eventsCount = 0, 
        this;
    }
    if ("function" == typeof (n = r[t])) this.removeListener(t, n); else if (n) do {
        this.removeListener(t, n[n.length - 1]);
    } while (n[0]);
    return this;
}, t.prototype.listeners = function(e) {
    var t, n = this._events;
    return n && (t = n[e]) ? "function" == typeof t ? [ t.listener || t ] : p(t) : [];
}, t.listenerCount = function(e, t) {
    return "function" == typeof e.listenerCount ? e.listenerCount(t) : l.call(e, t);
}, t.prototype.listenerCount = l, t.prototype.eventNames = function() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};