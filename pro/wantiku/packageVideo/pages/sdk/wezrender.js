var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(t, e) {
    for (var i in e) t[i] = e[i];
}(exports, function(t) {
    function e(r) {
        if (i[r]) return i[r].exports;
        var n = i[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return t[r].call(n.exports, n, n.exports, e), n.loaded = !0, n.exports;
    }
    var i = {};
    return e.m = t, e.c = i, e.p = "", e(0);
}([ function(t, e, i) {
    var r = {
        bbox: i(1)
    }, n = {
        Group: i(4)
    }, a = {
        shape: {
            Arc: i(19),
            BezierCurve: i(34),
            Circle: i(35),
            Droplet: i(36),
            Ellipse: i(37),
            Heart: i(38),
            Isogon: i(39),
            Line: i(40),
            Polyline: i(41),
            Polygon: i(45),
            Rect: i(46),
            Ring: i(48),
            Rose: i(49),
            Sector: i(50),
            Star: i(51),
            Trochoid: i(52)
        },
        Path: i(20),
        Gradient: i(53),
        LinearGradient: i(54),
        RadialGradient: i(55),
        Text: i(56),
        Image: i(57)
    };
    i(58), t.exports = {
        zrender: i(61),
        core: r,
        container: n,
        graphic: a
    };
}, function(t, e, i) {
    var r = i(2), n = i(3), a = {}, o = Math.min, s = Math.max, h = Math.sin, l = Math.cos, u = r.create(), c = r.create(), f = r.create(), d = 2 * Math.PI;
    a.fromPoints = function(t, e, i) {
        if (0 !== t.length) {
            var r, n = t[0], a = n[0], h = n[0], l = n[1], u = n[1];
            for (r = 1; r < t.length; r++) n = t[r], a = o(a, n[0]), h = s(h, n[0]), l = o(l, n[1]), 
            u = s(u, n[1]);
            e[0] = a, e[1] = l, i[0] = h, i[1] = u;
        }
    }, a.fromLine = function(t, e, i, r, n, a) {
        n[0] = o(t, i), n[1] = o(e, r), a[0] = s(t, i), a[1] = s(e, r);
    };
    var p = [], v = [];
    a.fromCubic = function(t, e, i, r, a, h, l, u, c, f) {
        var d, g = n.cubicExtrema, y = n.cubicAt, _ = g(t, i, a, l, p);
        for (c[0] = 1 / 0, c[1] = 1 / 0, f[0] = -1 / 0, f[1] = -1 / 0, d = 0; d < _; d++) {
            var m = y(t, i, a, l, p[d]);
            c[0] = o(m, c[0]), f[0] = s(m, f[0]);
        }
        for (_ = g(e, r, h, u, v), d = 0; d < _; d++) {
            var x = y(e, r, h, u, v[d]);
            c[1] = o(x, c[1]), f[1] = s(x, f[1]);
        }
        c[0] = o(t, c[0]), f[0] = s(t, f[0]), c[0] = o(l, c[0]), f[0] = s(l, f[0]), c[1] = o(e, c[1]), 
        f[1] = s(e, f[1]), c[1] = o(u, c[1]), f[1] = s(u, f[1]);
    }, a.fromQuadratic = function(t, e, i, r, a, h, l, u) {
        var c = n.quadraticExtremum, f = n.quadraticAt, d = s(o(c(t, i, a), 1), 0), p = s(o(c(e, r, h), 1), 0), v = f(t, i, a, d), g = f(e, r, h, p);
        l[0] = o(t, a, v), l[1] = o(e, h, g), u[0] = s(t, a, v), u[1] = s(e, h, g);
    }, a.fromArc = function(t, e, i, n, a, o, s, p, v) {
        var g = r.min, y = r.max, _ = Math.abs(a - o);
        if (_ % d < 1e-4 && _ > 1e-4) return p[0] = t - i, p[1] = e - n, v[0] = t + i, void (v[1] = e + n);
        if (u[0] = l(a) * i + t, u[1] = h(a) * n + e, c[0] = l(o) * i + t, c[1] = h(o) * n + e, 
        g(p, u, c), y(v, u, c), (a %= d) < 0 && (a += d), (o %= d) < 0 && (o += d), a > o && !s ? o += d : a < o && s && (a += d), 
        s) {
            var m = o;
            o = a, a = m;
        }
        for (var x = 0; x < o; x += Math.PI / 2) x > a && (f[0] = l(x) * i + t, f[1] = h(x) * n + e, 
        g(p, f, p), y(v, f, v));
    }, t.exports = a;
}, function(t, e) {
    var i = "undefined" == typeof Float32Array ? Array : Float32Array, r = {
        create: function(t, e) {
            var r = new i(2);
            return null == t && (t = 0), null == e && (e = 0), r[0] = t, r[1] = e, r;
        },
        copy: function(t, e) {
            return t[0] = e[0], t[1] = e[1], t;
        },
        clone: function(t) {
            var e = new i(2);
            return e[0] = t[0], e[1] = t[1], e;
        },
        set: function(t, e, i) {
            return t[0] = e, t[1] = i, t;
        },
        add: function(t, e, i) {
            return t[0] = e[0] + i[0], t[1] = e[1] + i[1], t;
        },
        scaleAndAdd: function(t, e, i, r) {
            return t[0] = e[0] + i[0] * r, t[1] = e[1] + i[1] * r, t;
        },
        sub: function(t, e, i) {
            return t[0] = e[0] - i[0], t[1] = e[1] - i[1], t;
        },
        len: function(t) {
            return Math.sqrt(this.lenSquare(t));
        },
        lenSquare: function(t) {
            return t[0] * t[0] + t[1] * t[1];
        },
        mul: function(t, e, i) {
            return t[0] = e[0] * i[0], t[1] = e[1] * i[1], t;
        },
        div: function(t, e, i) {
            return t[0] = e[0] / i[0], t[1] = e[1] / i[1], t;
        },
        dot: function(t, e) {
            return t[0] * e[0] + t[1] * e[1];
        },
        scale: function(t, e, i) {
            return t[0] = e[0] * i, t[1] = e[1] * i, t;
        },
        normalize: function(t, e) {
            var i = r.len(e);
            return 0 === i ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / i, t[1] = e[1] / i), t;
        },
        distance: function(t, e) {
            return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]));
        },
        distanceSquare: function(t, e) {
            return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]);
        },
        negate: function(t, e) {
            return t[0] = -e[0], t[1] = -e[1], t;
        },
        lerp: function(t, e, i, r) {
            return t[0] = e[0] + r * (i[0] - e[0]), t[1] = e[1] + r * (i[1] - e[1]), t;
        },
        applyTransform: function(t, e, i) {
            var r = e[0], n = e[1];
            return t[0] = i[0] * r + i[2] * n + i[4], t[1] = i[1] * r + i[3] * n + i[5], t;
        },
        min: function(t, e, i) {
            return t[0] = Math.min(e[0], i[0]), t[1] = Math.min(e[1], i[1]), t;
        },
        max: function(t, e, i) {
            return t[0] = Math.max(e[0], i[0]), t[1] = Math.max(e[1], i[1]), t;
        }
    };
    r.length = r.len, r.lengthSquare = r.lenSquare, r.dist = r.distance, r.distSquare = r.distanceSquare, 
    t.exports = r;
}, function(t, e, i) {
    function r(t) {
        return t > -f && t < f;
    }
    function n(t) {
        return t > f || t < -f;
    }
    function a(t, e, i, r, n) {
        var a = 1 - n;
        return a * a * (a * t + 3 * n * e) + n * n * (n * r + 3 * a * i);
    }
    function o(t, e, i, r) {
        var n = 1 - r;
        return n * (n * t + 2 * r * e) + r * r * i;
    }
    var s = i(2), h = s.create, l = s.distSquare, u = Math.pow, c = Math.sqrt, f = 1e-8, d = 1e-4, p = c(3), v = 1 / 3, g = h(), y = h(), _ = h();
    t.exports = {
        cubicAt: a,
        cubicDerivativeAt: function(t, e, i, r, n) {
            var a = 1 - n;
            return 3 * (((e - t) * a + 2 * (i - e) * n) * a + (r - i) * n * n);
        },
        cubicRootAt: function(t, e, i, n, a, o) {
            var s = n + 3 * (e - i) - t, h = 3 * (i - 2 * e + t), l = 3 * (e - t), f = t - a, d = h * h - 3 * s * l, g = h * l - 9 * s * f, y = l * l - 3 * h * f, _ = 0;
            if (r(d) && r(g)) r(h) ? o[0] = 0 : (C = -l / h) >= 0 && C <= 1 && (o[_++] = C); else {
                var m = g * g - 4 * d * y;
                if (r(m)) {
                    var x = g / d, b = -x / 2;
                    (C = -h / s + x) >= 0 && C <= 1 && (o[_++] = C), b >= 0 && b <= 1 && (o[_++] = b);
                } else if (m > 0) {
                    var w = c(m), T = d * h + 1.5 * s * (-g + w), k = d * h + 1.5 * s * (-g - w);
                    (C = (-h - ((T = T < 0 ? -u(-T, v) : u(T, v)) + (k = k < 0 ? -u(-k, v) : u(k, v)))) / (3 * s)) >= 0 && C <= 1 && (o[_++] = C);
                } else {
                    var M = (2 * d * h - 3 * s * g) / (2 * c(d * d * d)), P = Math.acos(M) / 3, S = c(d), A = Math.cos(P), C = (-h - 2 * S * A) / (3 * s), b = (-h + S * (A + p * Math.sin(P))) / (3 * s), L = (-h + S * (A - p * Math.sin(P))) / (3 * s);
                    C >= 0 && C <= 1 && (o[_++] = C), b >= 0 && b <= 1 && (o[_++] = b), L >= 0 && L <= 1 && (o[_++] = L);
                }
            }
            return _;
        },
        cubicExtrema: function(t, e, i, a, o) {
            var s = 6 * i - 12 * e + 6 * t, h = 9 * e + 3 * a - 3 * t - 9 * i, l = 3 * e - 3 * t, u = 0;
            if (r(h)) n(s) && (p = -l / s) >= 0 && p <= 1 && (o[u++] = p); else {
                var f = s * s - 4 * h * l;
                if (r(f)) o[0] = -s / (2 * h); else if (f > 0) {
                    var d = c(f), p = (-s + d) / (2 * h), v = (-s - d) / (2 * h);
                    p >= 0 && p <= 1 && (o[u++] = p), v >= 0 && v <= 1 && (o[u++] = v);
                }
            }
            return u;
        },
        cubicSubdivide: function(t, e, i, r, n, a) {
            var o = (e - t) * n + t, s = (i - e) * n + e, h = (r - i) * n + i, l = (s - o) * n + o, u = (h - s) * n + s, c = (u - l) * n + l;
            a[0] = t, a[1] = o, a[2] = l, a[3] = c, a[4] = c, a[5] = u, a[6] = h, a[7] = r;
        },
        cubicProjectPoint: function(t, e, i, r, n, o, s, h, u, f, p) {
            var v, m, x, b, w, T = .005, k = 1 / 0;
            g[0] = u, g[1] = f;
            for (var M = 0; M < 1; M += .05) y[0] = a(t, i, n, s, M), y[1] = a(e, r, o, h, M), 
            (b = l(g, y)) < k && (v = M, k = b);
            k = 1 / 0;
            for (var P = 0; P < 32 && !(T < d); P++) m = v - T, x = v + T, y[0] = a(t, i, n, s, m), 
            y[1] = a(e, r, o, h, m), b = l(y, g), m >= 0 && b < k ? (v = m, k = b) : (_[0] = a(t, i, n, s, x), 
            _[1] = a(e, r, o, h, x), w = l(_, g), x <= 1 && w < k ? (v = x, k = w) : T *= .5);
            return p && (p[0] = a(t, i, n, s, v), p[1] = a(e, r, o, h, v)), c(k);
        },
        quadraticAt: o,
        quadraticDerivativeAt: function(t, e, i, r) {
            return 2 * ((1 - r) * (e - t) + r * (i - e));
        },
        quadraticRootAt: function(t, e, i, a, o) {
            var s = t - 2 * e + i, h = 2 * (e - t), l = t - a, u = 0;
            if (r(s)) n(h) && (p = -l / h) >= 0 && p <= 1 && (o[u++] = p); else {
                var f = h * h - 4 * s * l;
                if (r(f)) (p = -h / (2 * s)) >= 0 && p <= 1 && (o[u++] = p); else if (f > 0) {
                    var d = c(f), p = (-h + d) / (2 * s), v = (-h - d) / (2 * s);
                    p >= 0 && p <= 1 && (o[u++] = p), v >= 0 && v <= 1 && (o[u++] = v);
                }
            }
            return u;
        },
        quadraticExtremum: function(t, e, i) {
            var r = t + i - 2 * e;
            return 0 === r ? .5 : (t - e) / r;
        },
        quadraticSubdivide: function(t, e, i, r, n) {
            var a = (e - t) * r + t, o = (i - e) * r + e, s = (o - a) * r + a;
            n[0] = t, n[1] = a, n[2] = s, n[3] = s, n[4] = o, n[5] = i;
        },
        quadraticProjectPoint: function(t, e, i, r, n, a, s, h, u) {
            var f, p = .005, v = 1 / 0;
            g[0] = s, g[1] = h;
            for (var m = 0; m < 1; m += .05) y[0] = o(t, i, n, m), y[1] = o(e, r, a, m), (T = l(g, y)) < v && (f = m, 
            v = T);
            v = 1 / 0;
            for (var x = 0; x < 32 && !(p < d); x++) {
                var b = f - p, w = f + p;
                y[0] = o(t, i, n, b), y[1] = o(e, r, a, b);
                var T = l(y, g);
                if (b >= 0 && T < v) f = b, v = T; else {
                    _[0] = o(t, i, n, w), _[1] = o(e, r, a, w);
                    var k = l(_, g);
                    w <= 1 && k < v ? (f = w, v = k) : p *= .5;
                }
            }
            return u && (u[0] = o(t, i, n, f), u[1] = o(e, r, a, f)), c(v);
        }
    };
}, function(t, e, i) {
    var r = i(5), n = i(6), a = i(18), o = function(t) {
        t = t || {}, n.call(this, t);
        for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
        this._children = [], this.__storage = null, this.__dirty = !0;
    };
    o.prototype = {
        constructor: o,
        isGroup: !0,
        type: "group",
        silent: !1,
        children: function() {
            return this._children.slice();
        },
        childAt: function(t) {
            return this._children[t];
        },
        childOfName: function(t) {
            for (var e = this._children, i = 0; i < e.length; i++) if (e[i].name === t) return e[i];
        },
        childCount: function() {
            return this._children.length;
        },
        add: function(t) {
            return t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), 
            this;
        },
        addBefore: function(t, e) {
            if (t && t !== this && t.parent !== this && e && e.parent === this) {
                var i = this._children, r = i.indexOf(e);
                r >= 0 && (i.splice(r, 0, t), this._doAdd(t));
            }
            return this;
        },
        _doAdd: function(t) {
            t.parent && t.parent.remove(t), t.parent = this;
            var e = this.__storage, i = this.__zr;
            e && e !== t.__storage && (e.addToMap(t), t instanceof o && t.addChildrenToStorage(e)), 
            i && i.refresh();
        },
        remove: function(t) {
            var e = this.__zr, i = this.__storage, n = this._children, a = r.indexOf(n, t);
            return a < 0 ? this : (n.splice(a, 1), t.parent = null, i && (i.delFromMap(t.id), 
            t instanceof o && t.delChildrenFromStorage(i)), e && e.refresh(), this);
        },
        removeAll: function() {
            var t, e, i = this._children, r = this.__storage;
            for (e = 0; e < i.length; e++) t = i[e], r && (r.delFromMap(t.id), t instanceof o && t.delChildrenFromStorage(r)), 
            t.parent = null;
            return i.length = 0, this;
        },
        eachChild: function(t, e) {
            for (var i = this._children, r = 0; r < i.length; r++) {
                var n = i[r];
                t.call(e, n, r);
            }
            return this;
        },
        traverse: function(t, e) {
            for (var i = 0; i < this._children.length; i++) {
                var r = this._children[i];
                t.call(e, r), "group" === r.type && r.traverse(t, e);
            }
            return this;
        },
        addChildrenToStorage: function(t) {
            for (var e = 0; e < this._children.length; e++) {
                var i = this._children[e];
                t.addToMap(i), i instanceof o && i.addChildrenToStorage(t);
            }
        },
        delChildrenFromStorage: function(t) {
            for (var e = 0; e < this._children.length; e++) {
                var i = this._children[e];
                t.delFromMap(i.id), i instanceof o && i.delChildrenFromStorage(t);
            }
        },
        dirty: function() {
            return this.__dirty = !0, this.__zr && this.__zr.refresh(), this;
        },
        getBoundingRect: function(t) {
            for (var e = null, i = new a(0, 0, 0, 0), r = t || this._children, n = [], o = 0; o < r.length; o++) {
                var s = r[o];
                if (!s.ignore && !s.invisible) {
                    var h = s.getBoundingRect(), l = s.getLocalTransform(n);
                    l ? (i.copy(h), i.applyTransform(l), (e = e || i.clone()).union(i)) : (e = e || h.clone()).union(h);
                }
            }
            return e || i;
        }
    }, r.inherits(o, n), t.exports = o;
}, function(e, i) {
    function r(e) {
        if (null == e || "object" != (void 0 === e ? "undefined" : t(e))) return e;
        var i = e, n = f.call(e);
        if ("[object Array]" === n) {
            i = [];
            for (var a = 0, o = e.length; a < o; a++) i[a] = r(e[a]);
        } else if (c[n]) i = e.constructor.from(e); else if (!u[n] && !l(e)) {
            i = {};
            for (var s in e) e.hasOwnProperty(s) && (i[s] = r(e[s]));
        }
        return i;
    }
    function n(t, e, i) {
        if (!s(e) || !s(t)) return i ? r(e) : t;
        for (var a in e) if (e.hasOwnProperty(a)) {
            var u = t[a], c = e[a];
            !s(c) || !s(u) || o(c) || o(u) || l(c) || l(u) || h(c) || h(u) ? !i && a in t || (t[a] = r(e[a], !0)) : n(u, c, i);
        }
        return t;
    }
    function a(t, e, i) {
        for (var r in e) e.hasOwnProperty(r) && (i ? null != e[r] : null == t[r]) && (t[r] = e[r]);
        return t;
    }
    function o(t) {
        return "[object Array]" === f.call(t);
    }
    function s(e) {
        var i = void 0 === e ? "undefined" : t(e);
        return "function" === i || !!e && "object" == i;
    }
    function h(t) {
        return !!u[f.call(t)];
    }
    function l(e) {
        return "object" == (void 0 === e ? "undefined" : t(e)) && "number" == typeof e.nodeType && "object" == t(e.ownerDocument);
    }
    var u = {
        "[object Function]": 1,
        "[object RegExp]": 1,
        "[object Date]": 1,
        "[object Error]": 1,
        "[object CanvasGradient]": 1,
        "[object CanvasPattern]": 1,
        "[object Image]": 1,
        "[object Canvas]": 1
    }, c = {
        "[object Int8Array]": 1,
        "[object Uint8Array]": 1,
        "[object Uint8ClampedArray]": 1,
        "[object Int16Array]": 1,
        "[object Uint16Array]": 1,
        "[object Int32Array]": 1,
        "[object Uint32Array]": 1,
        "[object Float32Array]": 1,
        "[object Float64Array]": 1
    }, f = Object.prototype.toString, d = Array.prototype, p = d.forEach, v = d.filter, g = d.slice, y = d.map, _ = d.reduce, m = {
        inherits: function(t, e) {
            function i() {}
            var r = t.prototype;
            i.prototype = e.prototype, t.prototype = new i();
            for (var n in r) t.prototype[n] = r[n];
            t.prototype.constructor = t, t.superClass = e;
        },
        mixin: function(t, e, i) {
            a(t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, i);
        },
        clone: r,
        merge: n,
        mergeAll: function(t, e) {
            for (var i = t[0], r = 1, a = t.length; r < a; r++) i = n(i, t[r], e);
            return i;
        },
        extend: function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            return t;
        },
        defaults: a,
        indexOf: function(t, e) {
            if (t) {
                if (t.indexOf) return t.indexOf(e);
                for (var i = 0, r = t.length; i < r; i++) if (t[i] === e) return i;
            }
            return -1;
        },
        slice: function() {
            return Function.call.apply(g, arguments);
        },
        find: function(t, e, i) {
            if (t && e) for (var r = 0, n = t.length; r < n; r++) if (e.call(i, t[r], r, t)) return t[r];
        },
        isArrayLike: function(t) {
            if (t) return "string" != typeof t && "number" == typeof t.length;
        },
        each: function(t, e, i) {
            if (t && e) if (t.forEach && t.forEach === p) t.forEach(e, i); else if (t.length === +t.length) for (var r = 0, n = t.length; r < n; r++) e.call(i, t[r], r, t); else for (var a in t) t.hasOwnProperty(a) && e.call(i, t[a], a, t);
        },
        map: function(t, e, i) {
            if (t && e) {
                if (t.map && t.map === y) return t.map(e, i);
                for (var r = [], n = 0, a = t.length; n < a; n++) r.push(e.call(i, t[n], n, t));
                return r;
            }
        },
        reduce: function(t, e, i, r) {
            if (t && e) {
                if (t.reduce && t.reduce === _) return t.reduce(e, i, r);
                for (var n = 0, a = t.length; n < a; n++) i = e.call(r, i, t[n], n, t);
                return i;
            }
        },
        filter: function(t, e, i) {
            if (t && e) {
                if (t.filter && t.filter === v) return t.filter(e, i);
                for (var r = [], n = 0, a = t.length; n < a; n++) e.call(i, t[n], n, t) && r.push(t[n]);
                return r;
            }
        },
        bind: function(t, e) {
            var i = g.call(arguments, 2);
            return function() {
                return t.apply(e, i.concat(g.call(arguments)));
            };
        },
        curry: function(t) {
            var e = g.call(arguments, 1);
            return function() {
                return t.apply(this, e.concat(g.call(arguments)));
            };
        },
        isArray: o,
        isString: function(t) {
            return "[object String]" === f.call(t);
        },
        isObject: s,
        isFunction: function(t) {
            return "function" == typeof t;
        },
        isBuildInObject: h,
        isDom: l,
        retrieve: function(t) {
            for (var e = 0, i = arguments.length; e < i; e++) if (null != arguments[e]) return arguments[e];
        },
        assert: function(t, e) {
            if (!t) throw new Error(e);
        },
        noop: function() {}
    };
    e.exports = m;
}, function(t, e, i) {
    var r = i(7), n = i(8), a = i(9), o = i(11), s = i(5), h = function(t) {
        a.call(this, t), n.call(this, t), o.call(this, t), this.id = t.id || r();
    };
    h.prototype = {
        type: "element",
        name: "",
        __zr: null,
        ignore: !1,
        clipPath: null,
        drift: function(t, e) {
            switch (this.draggable) {
              case "horizontal":
                e = 0;
                break;

              case "vertical":
                t = 0;
            }
            var i = this.transform;
            i || (i = this.transform = [ 1, 0, 0, 1, 0, 0 ]), i[4] += t, i[5] += e, this.decomposeTransform(), 
            this.dirty(!1);
        },
        beforeUpdate: function() {},
        afterUpdate: function() {},
        update: function() {
            this.updateTransform();
        },
        traverse: function(t, e) {},
        attrKV: function(t, e) {
            if ("position" === t || "scale" === t || "origin" === t) {
                if (e) {
                    var i = this[t];
                    i || (i = this[t] = []), i[0] = e[0], i[1] = e[1];
                }
            } else this[t] = e;
        },
        hide: function() {
            this.ignore = !0, this.__zr && this.__zr.refresh();
        },
        show: function() {
            this.ignore = !1, this.__zr && this.__zr.refresh();
        },
        attr: function(t, e) {
            if ("string" == typeof t) this.attrKV(t, e); else if (s.isObject(t)) for (var i in t) t.hasOwnProperty(i) && this.attrKV(i, t[i]);
            return this.dirty(!1), this;
        },
        setClipPath: function(t) {
            var e = this.__zr;
            e && t.addSelfToZr(e), this.clipPath && this.clipPath !== t && this.removeClipPath(), 
            this.clipPath = t, t.__zr = e, t.__clipTarget = this, this.dirty(!1);
        },
        removeClipPath: function() {
            var t = this.clipPath;
            t && (t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__clipTarget = null, 
            this.clipPath = null, this.dirty(!1));
        },
        addSelfToZr: function(t) {
            this.__zr = t;
            var e = this.animators;
            if (e) for (var i = 0; i < e.length; i++) t.animation.addAnimator(e[i]);
            this.clipPath && this.clipPath.addSelfToZr(t);
        },
        removeSelfFromZr: function(t) {
            this.__zr = null;
            var e = this.animators;
            if (e) for (var i = 0; i < e.length; i++) t.animation.removeAnimator(e[i]);
            this.clipPath && this.clipPath.removeSelfFromZr(t);
        }
    }, s.mixin(h, o), s.mixin(h, a), s.mixin(h, n), t.exports = h;
}, function(t, e) {
    var i = 2311;
    t.exports = function() {
        return i++;
    };
}, function(t, e) {
    var i = Array.prototype.slice, r = function() {
        this._$handlers = {};
    };
    r.prototype = {
        constructor: r,
        one: function(t, e, i) {
            var r = this._$handlers;
            if (!e || !t) return this;
            r[t] || (r[t] = []);
            for (var n = 0; n < r[t].length; n++) if (r[t][n].h === e) return this;
            return r[t].push({
                h: e,
                one: !0,
                ctx: i || this
            }), this;
        },
        on: function(t, e, i) {
            var r = this._$handlers;
            if (!e || !t) return this;
            r[t] || (r[t] = []);
            for (var n = 0; n < r[t].length; n++) if (r[t][n].h === e) return this;
            return r[t].push({
                h: e,
                one: !1,
                ctx: i || this
            }), this;
        },
        isSilent: function(t) {
            var e = this._$handlers;
            return e[t] && e[t].length;
        },
        off: function(t, e) {
            var i = this._$handlers;
            if (!t) return this._$handlers = {}, this;
            if (e) {
                if (i[t]) {
                    for (var r = [], n = 0, a = i[t].length; n < a; n++) i[t][n].h != e && r.push(i[t][n]);
                    i[t] = r;
                }
                i[t] && 0 === i[t].length && delete i[t];
            } else delete i[t];
            return this;
        },
        trigger: function(t) {
            if (this._$handlers[t]) {
                var e = arguments, r = e.length;
                r > 3 && (e = i.call(e, 1));
                for (var n = this._$handlers[t], a = n.length, o = 0; o < a; ) {
                    switch (r) {
                      case 1:
                        n[o].h.call(n[o].ctx);
                        break;

                      case 2:
                        n[o].h.call(n[o].ctx, e[1]);
                        break;

                      case 3:
                        n[o].h.call(n[o].ctx, e[1], e[2]);
                        break;

                      default:
                        n[o].h.apply(n[o].ctx, e);
                    }
                    n[o].one ? (n.splice(o, 1), a--) : o++;
                }
            }
            return this;
        },
        triggerWithContext: function(t) {
            if (this._$handlers[t]) {
                var e = arguments, r = e.length;
                r > 4 && (e = i.call(e, 1, e.length - 1));
                for (var n = e[e.length - 1], a = this._$handlers[t], o = a.length, s = 0; s < o; ) {
                    switch (r) {
                      case 1:
                        a[s].h.call(n);
                        break;

                      case 2:
                        a[s].h.call(n, e[1]);
                        break;

                      case 3:
                        a[s].h.call(n, e[1], e[2]);
                        break;

                      default:
                        a[s].h.apply(n, e);
                    }
                    a[s].one ? (a.splice(s, 1), o--) : s++;
                }
            }
            return this;
        }
    }, t.exports = r;
}, function(t, e, i) {
    function r(t) {
        return t > s || t < -s;
    }
    var n = i(10), a = i(2), o = n.identity, s = 5e-5, h = function(t) {
        (t = t || {}).position || (this.position = [ 0, 0 ]), null == t.rotation && (this.rotation = 0), 
        t.scale || (this.scale = [ 1, 1 ]), this.origin = this.origin || null;
    }, l = h.prototype;
    l.transform = null, l.needLocalTransform = function() {
        return r(this.rotation) || r(this.position[0]) || r(this.position[1]) || r(this.scale[0] - 1) || r(this.scale[1] - 1);
    }, l.updateTransform = function() {
        var t = this.parent, e = t && t.transform, i = this.needLocalTransform(), r = this.transform;
        return i || e ? (r = r || n.create(), i ? this.getLocalTransform(r) : o(r), e && (i ? n.mul(r, t.transform, r) : n.copy(r, t.transform)), 
        this.transform = r, this.invTransform = this.invTransform || n.create(), void n.invert(this.invTransform, r)) : void (r && o(r));
    }, l.getLocalTransform = function(t) {
        o(t = t || []);
        var e = this.origin, i = this.scale, r = this.rotation, a = this.position;
        return e && (t[4] -= e[0], t[5] -= e[1]), n.scale(t, t, i), r && n.rotate(t, t, r), 
        e && (t[4] += e[0], t[5] += e[1]), t[4] += a[0], t[5] += a[1], t;
    }, l.setTransform = function(t) {
        var e = this.transform, i = t.dpr || 1;
        e ? t.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : t.setTransform(i, 0, 0, i, 0, 0);
    }, l.restoreTransform = function(t) {
        var e = (this.transform, t.dpr || 1);
        t.setTransform(e, 0, 0, e, 0, 0);
    };
    var u = [];
    l.decomposeTransform = function() {
        if (this.transform) {
            var t = this.parent, e = this.transform;
            t && t.transform && (n.mul(u, t.invTransform, e), e = u);
            var i = e[0] * e[0] + e[1] * e[1], a = e[2] * e[2] + e[3] * e[3], o = this.position, s = this.scale;
            r(i - 1) && (i = Math.sqrt(i)), r(a - 1) && (a = Math.sqrt(a)), e[0] < 0 && (i = -i), 
            e[3] < 0 && (a = -a), o[0] = e[4], o[1] = e[5], s[0] = i, s[1] = a, this.rotation = Math.atan2(-e[1] / a, e[0] / i);
        }
    }, l.getGlobalScale = function() {
        var t = this.transform;
        if (!t) return [ 1, 1 ];
        var e = Math.sqrt(t[0] * t[0] + t[1] * t[1]), i = Math.sqrt(t[2] * t[2] + t[3] * t[3]);
        return t[0] < 0 && (e = -e), t[3] < 0 && (i = -i), [ e, i ];
    }, l.transformCoordToLocal = function(t, e) {
        var i = [ t, e ], r = this.invTransform;
        return r && a.applyTransform(i, i, r), i;
    }, l.transformCoordToGlobal = function(t, e) {
        var i = [ t, e ], r = this.transform;
        return r && a.applyTransform(i, i, r), i;
    }, t.exports = h;
}, function(t, e) {
    var i = "undefined" == typeof Float32Array ? Array : Float32Array, r = {
        create: function() {
            var t = new i(6);
            return r.identity(t), t;
        },
        identity: function(t) {
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
        },
        copy: function(t, e) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], 
            t;
        },
        mul: function(t, e, i) {
            var r = e[0] * i[0] + e[2] * i[1], n = e[1] * i[0] + e[3] * i[1], a = e[0] * i[2] + e[2] * i[3], o = e[1] * i[2] + e[3] * i[3], s = e[0] * i[4] + e[2] * i[5] + e[4], h = e[1] * i[4] + e[3] * i[5] + e[5];
            return t[0] = r, t[1] = n, t[2] = a, t[3] = o, t[4] = s, t[5] = h, t;
        },
        translate: function(t, e, i) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + i[0], t[5] = e[5] + i[1], 
            t;
        },
        rotate: function(t, e, i) {
            var r = e[0], n = e[2], a = e[4], o = e[1], s = e[3], h = e[5], l = Math.sin(i), u = Math.cos(i);
            return t[0] = r * u + o * l, t[1] = -r * l + o * u, t[2] = n * u + s * l, t[3] = -n * l + u * s, 
            t[4] = u * a + l * h, t[5] = u * h - l * a, t;
        },
        scale: function(t, e, i) {
            var r = i[0], n = i[1];
            return t[0] = e[0] * r, t[1] = e[1] * n, t[2] = e[2] * r, t[3] = e[3] * n, t[4] = e[4] * r, 
            t[5] = e[5] * n, t;
        },
        invert: function(t, e) {
            var i = e[0], r = e[2], n = e[4], a = e[1], o = e[3], s = e[5], h = i * o - a * r;
            return h ? (h = 1 / h, t[0] = o * h, t[1] = -a * h, t[2] = -r * h, t[3] = i * h, 
            t[4] = (r * s - o * n) * h, t[5] = (a * n - i * s) * h, t) : null;
        }
    };
    t.exports = r;
}, function(t, e, i) {
    var r = i(12), n = i(5), a = n.isString, o = n.isFunction, s = n.isObject, h = i(16), l = function() {
        this.animators = [];
    };
    l.prototype = {
        constructor: l,
        animate: function(t, e) {
            var i, a = !1, o = this, s = this.__zr;
            if (t) {
                var l = t.split("."), u = o;
                a = "shape" === l[0];
                for (var c = 0, f = l.length; c < f; c++) u && (u = u[l[c]]);
                u && (i = u);
            } else i = o;
            {
                if (i) {
                    var d = o.animators, p = new r(i, e);
                    return p.during(function(t) {
                        o.dirty(a);
                    }).done(function() {
                        d.splice(n.indexOf(d, p), 1);
                    }), d.push(p), s && s.animation.addAnimator(p), p;
                }
                h('Property "' + t + '" is not existed in element ' + o.id);
            }
        },
        stopAnimation: function(t) {
            for (var e = this.animators, i = e.length, r = 0; r < i; r++) e[r].stop(t);
            return e.length = 0, this;
        },
        animateTo: function(t, e, i, r, n) {
            a(i) ? (n = r, r = i, i = 0) : o(r) ? (n = r, r = "linear", i = 0) : o(i) ? (n = i, 
            i = 0) : o(e) ? (n = e, e = 500) : e || (e = 500), this.stopAnimation(), this._animateToShallow("", this, t, e, i, r, n);
            var s = this.animators.slice(), h = s.length;
            h || n && n();
            for (var l = 0; l < s.length; l++) s[l].done(function() {
                --h || n && n();
            }).start(r);
        },
        _animateToShallow: function(t, e, i, r, a) {
            var o = {}, h = 0;
            for (var l in i) if (i.hasOwnProperty(l)) if (null != e[l]) s(i[l]) && !n.isArrayLike(i[l]) ? this._animateToShallow(t ? t + "." + l : l, e[l], i[l], r, a) : (o[l] = i[l], 
            h++); else if (null != i[l]) if (t) {
                var u = {};
                u[t] = {}, u[t][l] = i[l], this.attr(u);
            } else this.attr(l, i[l]);
            return h > 0 && this.animate(t, !1).when(null == r ? 500 : r, o).delay(a || 0), 
            this;
        }
    }, t.exports = l;
}, function(t, e, i) {
    function r(t, e) {
        return t[e];
    }
    function n(t, e, i) {
        t[e] = i;
    }
    function a(t, e, i) {
        return (e - t) * i + t;
    }
    function o(t, e, i) {
        return i > .5 ? e : t;
    }
    function s(t, e, i, r, n) {
        var o = t.length;
        if (1 == n) for (h = 0; h < o; h++) r[h] = a(t[h], e[h], i); else for (var s = t[0].length, h = 0; h < o; h++) for (var l = 0; l < s; l++) r[h][l] = a(t[h][l], e[h][l], i);
    }
    function h(t, e, i) {
        var r = t.length, n = e.length;
        if (r !== n) if (r > n) t.length = n; else for (o = r; o < n; o++) t.push(1 === i ? e[o] : _.call(e[o]));
        for (var a = t[0] && t[0].length, o = 0; o < t.length; o++) if (1 === i) isNaN(t[o]) && (t[o] = e[o]); else for (var s = 0; s < a; s++) isNaN(t[o][s]) && (t[o][s] = e[o][s]);
    }
    function l(t, e, i) {
        if (t === e) return !0;
        var r = t.length;
        if (r !== e.length) return !1;
        if (1 === i) {
            for (a = 0; a < r; a++) if (t[a] !== e[a]) return !1;
        } else for (var n = t[0].length, a = 0; a < r; a++) for (var o = 0; o < n; o++) if (t[a][o] !== e[a][o]) return !1;
        return !0;
    }
    function u(t, e, i, r, n, a, o, s, h) {
        var l = t.length;
        if (1 == h) for (f = 0; f < l; f++) s[f] = c(t[f], e[f], i[f], r[f], n, a, o); else for (var u = t[0].length, f = 0; f < l; f++) for (var d = 0; d < u; d++) s[f][d] = c(t[f][d], e[f][d], i[f][d], r[f][d], n, a, o);
    }
    function c(t, e, i, r, n, a, o) {
        var s = .5 * (i - t), h = .5 * (r - e);
        return (2 * (e - i) + s + h) * o + (-3 * (e - i) - 2 * s - h) * a + s * n + e;
    }
    function f(t) {
        if (y(t)) {
            var e = t.length;
            if (y(t[0])) {
                for (var i = [], r = 0; r < e; r++) i.push(_.call(t[r]));
                return i;
            }
            return _.call(t);
        }
        return t;
    }
    function d(t) {
        return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), 
        "rgba(" + t.join(",") + ")";
    }
    function p(t, e, i, r, n) {
        var f = t._getter, p = t._setter, _ = "spline" === e, m = r.length;
        if (m) {
            var x, b = r[0].value, w = y(b), T = !1, k = !1, M = w && y(b[0]) ? 2 : 1;
            r.sort(function(t, e) {
                return t.time - e.time;
            }), x = r[m - 1].time;
            for (var P = [], S = [], A = r[0].value, C = !0, L = 0; L < m; L++) {
                P.push(r[L].time / x);
                var O = r[L].value;
                if (w && l(O, A, M) || !w && O === A || (C = !1), A = O, "string" == typeof O) {
                    var z = g.parse(O);
                    z ? (O = z, T = !0) : k = !0;
                }
                S.push(O);
            }
            if (!C) {
                for (var R = S[m - 1], L = 0; L < m - 1; L++) w ? h(S[L], R, M) : !isNaN(S[L]) || isNaN(R) || k || T || (S[L] = R);
                w && h(f(t._target, n), R, M);
                var I, q, D, F, B, E, j = 0, G = 0;
                if (T) var H = [ 0, 0, 0, 0 ];
                var X = new v({
                    target: t._target,
                    life: x,
                    loop: t._loop,
                    delay: t._delay,
                    onframe: function(t, e) {
                        var i;
                        if (e < 0) i = 0; else if (e < G) {
                            for (i = I = Math.min(j + 1, m - 1); i >= 0 && !(P[i] <= e); i--) ;
                            i = Math.min(i, m - 2);
                        } else {
                            for (i = j; i < m && !(P[i] > e); i++) ;
                            i = Math.min(i - 1, m - 2);
                        }
                        j = i, G = e;
                        var r = P[i + 1] - P[i];
                        if (0 !== r) if (q = (e - P[i]) / r, _) if (F = S[i], D = S[0 === i ? i : i - 1], 
                        B = S[i > m - 2 ? m - 1 : i + 1], E = S[i > m - 3 ? m - 1 : i + 2], w) u(D, F, B, E, q, q * q, q * q * q, f(t, n), M); else {
                            if (T) h = u(D, F, B, E, q, q * q, q * q * q, H, 1), h = d(H); else {
                                if (k) return o(F, B, q);
                                h = c(D, F, B, E, q, q * q, q * q * q);
                            }
                            p(t, n, h);
                        } else if (w) s(S[i], S[i + 1], q, f(t, n), M); else {
                            var h;
                            if (T) s(S[i], S[i + 1], q, H, 1), h = d(H); else {
                                if (k) return o(S[i], S[i + 1], q);
                                h = a(S[i], S[i + 1], q);
                            }
                            p(t, n, h);
                        }
                    },
                    ondestroy: i
                });
                return e && "spline" !== e && (X.easing = e), X;
            }
        }
    }
    var v = i(13), g = i(15), y = i(5).isArrayLike, _ = Array.prototype.slice, m = function(t, e, i, a) {
        this._tracks = {}, this._target = t, this._loop = e || !1, this._getter = i || r, 
        this._setter = a || n, this._clipCount = 0, this._delay = 0, this._doneList = [], 
        this._onframeList = [], this._clipList = [];
    };
    m.prototype = {
        when: function(t, e) {
            var i = this._tracks;
            for (var r in e) if (e.hasOwnProperty(r)) {
                if (!i[r]) {
                    i[r] = [];
                    var n = this._getter(this._target, r);
                    if (null == n) continue;
                    0 !== t && i[r].push({
                        time: 0,
                        value: f(n)
                    });
                }
                i[r].push({
                    time: t,
                    value: e[r]
                });
            }
            return this;
        },
        during: function(t) {
            return this._onframeList.push(t), this;
        },
        _doneCallback: function() {
            this._tracks = {}, this._clipList.length = 0;
            for (var t = this._doneList, e = t.length, i = 0; i < e; i++) t[i].call(this);
        },
        start: function(t) {
            var e, i = this, r = 0;
            for (var n in this._tracks) if (this._tracks.hasOwnProperty(n)) {
                var a = p(this, t, function() {
                    --r || i._doneCallback();
                }, this._tracks[n], n);
                a && (this._clipList.push(a), r++, this.animation && this.animation.addClip(a), 
                e = a);
            }
            if (e) {
                var o = e.onframe;
                e.onframe = function(t, e) {
                    o(t, e);
                    for (var r = 0; r < i._onframeList.length; r++) i._onframeList[r](t, e);
                };
            }
            return r || this._doneCallback(), this;
        },
        stop: function(t) {
            for (var e = this._clipList, i = this.animation, r = 0; r < e.length; r++) {
                var n = e[r];
                t && n.onframe(this._target, 1), i && i.removeClip(n);
            }
            e.length = 0;
        },
        delay: function(t) {
            return this._delay = t, this;
        },
        done: function(t) {
            return t && this._doneList.push(t), this;
        },
        getClips: function() {
            return this._clipList;
        }
    }, t.exports = m;
}, function(t, e, i) {
    function r(t) {
        this._target = t.target, this._life = t.life || 1e3, this._delay = t.delay || 0, 
        this._initialized = !1, this.loop = null != t.loop && t.loop, this.gap = t.gap || 0, 
        this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, 
        this.onrestart = t.onrestart;
    }
    var n = i(14);
    r.prototype = {
        constructor: r,
        step: function(t) {
            this._initialized || (this._startTime = t + this._delay, this._initialized = !0);
            var e = (t - this._startTime) / this._life;
            if (!(e < 0)) {
                e = Math.min(e, 1);
                var i = this.easing, r = "string" == typeof i ? n[i] : i, a = "function" == typeof r ? r(e) : e;
                return this.fire("frame", a), 1 == e ? this.loop ? (this.restart(t), "restart") : (this._needsRemove = !0, 
                "destroy") : null;
            }
        },
        restart: function(t) {
            var e = (t - this._startTime) % this._life;
            this._startTime = t - e + this.gap, this._needsRemove = !1;
        },
        fire: function(t, e) {
            this[t = "on" + t] && this[t](this._target, e);
        }
    }, t.exports = r;
}, function(t, e) {
    var i = {
        linear: function(t) {
            return t;
        },
        quadraticIn: function(t) {
            return t * t;
        },
        quadraticOut: function(t) {
            return t * (2 - t);
        },
        quadraticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
        },
        cubicIn: function(t) {
            return t * t * t;
        },
        cubicOut: function(t) {
            return --t * t * t + 1;
        },
        cubicInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
        },
        quarticIn: function(t) {
            return t * t * t * t;
        },
        quarticOut: function(t) {
            return 1 - --t * t * t * t;
        },
        quarticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
        },
        quinticIn: function(t) {
            return t * t * t * t * t;
        },
        quinticOut: function(t) {
            return --t * t * t * t * t + 1;
        },
        quinticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
        },
        sinusoidalIn: function(t) {
            return 1 - Math.cos(t * Math.PI / 2);
        },
        sinusoidalOut: function(t) {
            return Math.sin(t * Math.PI / 2);
        },
        sinusoidalInOut: function(t) {
            return .5 * (1 - Math.cos(Math.PI * t));
        },
        exponentialIn: function(t) {
            return 0 === t ? 0 : Math.pow(1024, t - 1);
        },
        exponentialOut: function(t) {
            return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
        },
        exponentialInOut: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)));
        },
        circularIn: function(t) {
            return 1 - Math.sqrt(1 - t * t);
        },
        circularOut: function(t) {
            return Math.sqrt(1 - --t * t);
        },
        circularInOut: function(t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        elasticIn: function(t) {
            var e, i = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!i || i < 1 ? (i = 1, e = .1) : e = .4 * Math.asin(1 / i) / (2 * Math.PI), 
            -i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4));
        },
        elasticOut: function(t) {
            var e, i = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!i || i < 1 ? (i = 1, e = .1) : e = .4 * Math.asin(1 / i) / (2 * Math.PI), 
            i * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / .4) + 1);
        },
        elasticInOut: function(t) {
            var e, i = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!i || i < 1 ? (i = 1, e = .1) : e = .4 * Math.asin(1 / i) / (2 * Math.PI), 
            (t *= 2) < 1 ? i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * -.5 : i * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * .5 + 1);
        },
        backIn: function(t) {
            var e = 1.70158;
            return t * t * ((e + 1) * t - e);
        },
        backOut: function(t) {
            var e = 1.70158;
            return --t * t * ((e + 1) * t + e) + 1;
        },
        backInOut: function(t) {
            var e = 2.5949095;
            return (t *= 2) < 1 ? t * t * ((e + 1) * t - e) * .5 : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
        },
        bounceIn: function(t) {
            return 1 - i.bounceOut(1 - t);
        },
        bounceOut: function(t) {
            return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
        },
        bounceInOut: function(t) {
            return t < .5 ? .5 * i.bounceIn(2 * t) : .5 * i.bounceOut(2 * t - 1) + .5;
        }
    };
    t.exports = i;
}, function(t, e) {
    function i(t) {
        return (t = Math.round(t)) < 0 ? 0 : t > 255 ? 255 : t;
    }
    function r(t) {
        return (t = Math.round(t)) < 0 ? 0 : t > 360 ? 360 : t;
    }
    function n(t) {
        return t < 0 ? 0 : t > 1 ? 1 : t;
    }
    function a(t) {
        return i(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 * 255 : parseInt(t, 10));
    }
    function o(t) {
        return n(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 : parseFloat(t));
    }
    function s(t, e, i) {
        return i < 0 ? i += 1 : i > 1 && (i -= 1), 6 * i < 1 ? t + (e - t) * i * 6 : 2 * i < 1 ? e : 3 * i < 2 ? t + (e - t) * (2 / 3 - i) * 6 : t;
    }
    function h(t, e, i) {
        return t + (e - t) * i;
    }
    function l(t) {
        if (t) {
            var e = (t += "").replace(/ /g, "").toLowerCase();
            if (e in d) return d[e].slice();
            if ("#" !== e.charAt(0)) {
                var i = e.indexOf("("), r = e.indexOf(")");
                if (-1 !== i && r + 1 === e.length) {
                    var n = e.substr(0, i), s = e.substr(i + 1, r - (i + 1)).split(","), h = 1;
                    switch (n) {
                      case "rgba":
                        if (4 !== s.length) return;
                        h = o(s.pop());

                      case "rgb":
                        if (3 !== s.length) return;
                        return [ a(s[0]), a(s[1]), a(s[2]), h ];

                      case "hsla":
                        if (4 !== s.length) return;
                        return s[3] = o(s[3]), u(s);

                      case "hsl":
                        if (3 !== s.length) return;
                        return u(s);

                      default:
                        return;
                    }
                }
            } else {
                if (4 === e.length) {
                    if (!((l = parseInt(e.substr(1), 16)) >= 0 && l <= 4095)) return;
                    return [ (3840 & l) >> 4 | (3840 & l) >> 8, 240 & l | (240 & l) >> 4, 15 & l | (15 & l) << 4, 1 ];
                }
                if (7 === e.length) {
                    var l = parseInt(e.substr(1), 16);
                    if (!(l >= 0 && l <= 16777215)) return;
                    return [ (16711680 & l) >> 16, (65280 & l) >> 8, 255 & l, 1 ];
                }
            }
        }
    }
    function u(t) {
        var e = (parseFloat(t[0]) % 360 + 360) % 360 / 360, r = o(t[1]), n = o(t[2]), a = n <= .5 ? n * (r + 1) : n + r - n * r, h = 2 * n - a, l = [ i(255 * s(h, a, e + 1 / 3)), i(255 * s(h, a, e)), i(255 * s(h, a, e - 1 / 3)) ];
        return 4 === t.length && (l[3] = t[3]), l;
    }
    function c(t) {
        if (t) {
            var e, i, r = t[0] / 255, n = t[1] / 255, a = t[2] / 255, o = Math.min(r, n, a), s = Math.max(r, n, a), h = s - o, l = (s + o) / 2;
            if (0 === h) e = 0, i = 0; else {
                i = l < .5 ? h / (s + o) : h / (2 - s - o);
                var u = ((s - r) / 6 + h / 2) / h, c = ((s - n) / 6 + h / 2) / h, f = ((s - a) / 6 + h / 2) / h;
                r === s ? e = f - c : n === s ? e = 1 / 3 + u - f : a === s && (e = 2 / 3 + c - u), 
                e < 0 && (e += 1), e > 1 && (e -= 1);
            }
            var d = [ 360 * e, i, l ];
            return null != t[3] && d.push(t[3]), d;
        }
    }
    function f(t, e) {
        var i = t[0] + "," + t[1] + "," + t[2];
        return "rgba" !== e && "hsva" !== e && "hsla" !== e || (i += "," + t[3]), e + "(" + i + ")";
    }
    var d = {
        transparent: [ 0, 0, 0, 0 ],
        aliceblue: [ 240, 248, 255, 1 ],
        antiquewhite: [ 250, 235, 215, 1 ],
        aqua: [ 0, 255, 255, 1 ],
        aquamarine: [ 127, 255, 212, 1 ],
        azure: [ 240, 255, 255, 1 ],
        beige: [ 245, 245, 220, 1 ],
        bisque: [ 255, 228, 196, 1 ],
        black: [ 0, 0, 0, 1 ],
        blanchedalmond: [ 255, 235, 205, 1 ],
        blue: [ 0, 0, 255, 1 ],
        blueviolet: [ 138, 43, 226, 1 ],
        brown: [ 165, 42, 42, 1 ],
        burlywood: [ 222, 184, 135, 1 ],
        cadetblue: [ 95, 158, 160, 1 ],
        chartreuse: [ 127, 255, 0, 1 ],
        chocolate: [ 210, 105, 30, 1 ],
        coral: [ 255, 127, 80, 1 ],
        cornflowerblue: [ 100, 149, 237, 1 ],
        cornsilk: [ 255, 248, 220, 1 ],
        crimson: [ 220, 20, 60, 1 ],
        cyan: [ 0, 255, 255, 1 ],
        darkblue: [ 0, 0, 139, 1 ],
        darkcyan: [ 0, 139, 139, 1 ],
        darkgoldenrod: [ 184, 134, 11, 1 ],
        darkgray: [ 169, 169, 169, 1 ],
        darkgreen: [ 0, 100, 0, 1 ],
        darkgrey: [ 169, 169, 169, 1 ],
        darkkhaki: [ 189, 183, 107, 1 ],
        darkmagenta: [ 139, 0, 139, 1 ],
        darkolivegreen: [ 85, 107, 47, 1 ],
        darkorange: [ 255, 140, 0, 1 ],
        darkorchid: [ 153, 50, 204, 1 ],
        darkred: [ 139, 0, 0, 1 ],
        darksalmon: [ 233, 150, 122, 1 ],
        darkseagreen: [ 143, 188, 143, 1 ],
        darkslateblue: [ 72, 61, 139, 1 ],
        darkslategray: [ 47, 79, 79, 1 ],
        darkslategrey: [ 47, 79, 79, 1 ],
        darkturquoise: [ 0, 206, 209, 1 ],
        darkviolet: [ 148, 0, 211, 1 ],
        deeppink: [ 255, 20, 147, 1 ],
        deepskyblue: [ 0, 191, 255, 1 ],
        dimgray: [ 105, 105, 105, 1 ],
        dimgrey: [ 105, 105, 105, 1 ],
        dodgerblue: [ 30, 144, 255, 1 ],
        firebrick: [ 178, 34, 34, 1 ],
        floralwhite: [ 255, 250, 240, 1 ],
        forestgreen: [ 34, 139, 34, 1 ],
        fuchsia: [ 255, 0, 255, 1 ],
        gainsboro: [ 220, 220, 220, 1 ],
        ghostwhite: [ 248, 248, 255, 1 ],
        gold: [ 255, 215, 0, 1 ],
        goldenrod: [ 218, 165, 32, 1 ],
        gray: [ 128, 128, 128, 1 ],
        green: [ 0, 128, 0, 1 ],
        greenyellow: [ 173, 255, 47, 1 ],
        grey: [ 128, 128, 128, 1 ],
        honeydew: [ 240, 255, 240, 1 ],
        hotpink: [ 255, 105, 180, 1 ],
        indianred: [ 205, 92, 92, 1 ],
        indigo: [ 75, 0, 130, 1 ],
        ivory: [ 255, 255, 240, 1 ],
        khaki: [ 240, 230, 140, 1 ],
        lavender: [ 230, 230, 250, 1 ],
        lavenderblush: [ 255, 240, 245, 1 ],
        lawngreen: [ 124, 252, 0, 1 ],
        lemonchiffon: [ 255, 250, 205, 1 ],
        lightblue: [ 173, 216, 230, 1 ],
        lightcoral: [ 240, 128, 128, 1 ],
        lightcyan: [ 224, 255, 255, 1 ],
        lightgoldenrodyellow: [ 250, 250, 210, 1 ],
        lightgray: [ 211, 211, 211, 1 ],
        lightgreen: [ 144, 238, 144, 1 ],
        lightgrey: [ 211, 211, 211, 1 ],
        lightpink: [ 255, 182, 193, 1 ],
        lightsalmon: [ 255, 160, 122, 1 ],
        lightseagreen: [ 32, 178, 170, 1 ],
        lightskyblue: [ 135, 206, 250, 1 ],
        lightslategray: [ 119, 136, 153, 1 ],
        lightslategrey: [ 119, 136, 153, 1 ],
        lightsteelblue: [ 176, 196, 222, 1 ],
        lightyellow: [ 255, 255, 224, 1 ],
        lime: [ 0, 255, 0, 1 ],
        limegreen: [ 50, 205, 50, 1 ],
        linen: [ 250, 240, 230, 1 ],
        magenta: [ 255, 0, 255, 1 ],
        maroon: [ 128, 0, 0, 1 ],
        mediumaquamarine: [ 102, 205, 170, 1 ],
        mediumblue: [ 0, 0, 205, 1 ],
        mediumorchid: [ 186, 85, 211, 1 ],
        mediumpurple: [ 147, 112, 219, 1 ],
        mediumseagreen: [ 60, 179, 113, 1 ],
        mediumslateblue: [ 123, 104, 238, 1 ],
        mediumspringgreen: [ 0, 250, 154, 1 ],
        mediumturquoise: [ 72, 209, 204, 1 ],
        mediumvioletred: [ 199, 21, 133, 1 ],
        midnightblue: [ 25, 25, 112, 1 ],
        mintcream: [ 245, 255, 250, 1 ],
        mistyrose: [ 255, 228, 225, 1 ],
        moccasin: [ 255, 228, 181, 1 ],
        navajowhite: [ 255, 222, 173, 1 ],
        navy: [ 0, 0, 128, 1 ],
        oldlace: [ 253, 245, 230, 1 ],
        olive: [ 128, 128, 0, 1 ],
        olivedrab: [ 107, 142, 35, 1 ],
        orange: [ 255, 165, 0, 1 ],
        orangered: [ 255, 69, 0, 1 ],
        orchid: [ 218, 112, 214, 1 ],
        palegoldenrod: [ 238, 232, 170, 1 ],
        palegreen: [ 152, 251, 152, 1 ],
        paleturquoise: [ 175, 238, 238, 1 ],
        palevioletred: [ 219, 112, 147, 1 ],
        papayawhip: [ 255, 239, 213, 1 ],
        peachpuff: [ 255, 218, 185, 1 ],
        peru: [ 205, 133, 63, 1 ],
        pink: [ 255, 192, 203, 1 ],
        plum: [ 221, 160, 221, 1 ],
        powderblue: [ 176, 224, 230, 1 ],
        purple: [ 128, 0, 128, 1 ],
        red: [ 255, 0, 0, 1 ],
        rosybrown: [ 188, 143, 143, 1 ],
        royalblue: [ 65, 105, 225, 1 ],
        saddlebrown: [ 139, 69, 19, 1 ],
        salmon: [ 250, 128, 114, 1 ],
        sandybrown: [ 244, 164, 96, 1 ],
        seagreen: [ 46, 139, 87, 1 ],
        seashell: [ 255, 245, 238, 1 ],
        sienna: [ 160, 82, 45, 1 ],
        silver: [ 192, 192, 192, 1 ],
        skyblue: [ 135, 206, 235, 1 ],
        slateblue: [ 106, 90, 205, 1 ],
        slategray: [ 112, 128, 144, 1 ],
        slategrey: [ 112, 128, 144, 1 ],
        snow: [ 255, 250, 250, 1 ],
        springgreen: [ 0, 255, 127, 1 ],
        steelblue: [ 70, 130, 180, 1 ],
        tan: [ 210, 180, 140, 1 ],
        teal: [ 0, 128, 128, 1 ],
        thistle: [ 216, 191, 216, 1 ],
        tomato: [ 255, 99, 71, 1 ],
        turquoise: [ 64, 224, 208, 1 ],
        violet: [ 238, 130, 238, 1 ],
        wheat: [ 245, 222, 179, 1 ],
        white: [ 255, 255, 255, 1 ],
        whitesmoke: [ 245, 245, 245, 1 ],
        yellow: [ 255, 255, 0, 1 ],
        yellowgreen: [ 154, 205, 50, 1 ]
    };
    t.exports = {
        parse: l,
        lift: function(t, e) {
            var i = l(t);
            if (i) {
                for (var r = 0; r < 3; r++) i[r] = e < 0 ? i[r] * (1 - e) | 0 : (255 - i[r]) * e + i[r] | 0;
                return f(i, 4 === i.length ? "rgba" : "rgb");
            }
        },
        toHex: function(t, e) {
            var i = l(t);
            if (i) return ((1 << 24) + (i[0] << 16) + (i[1] << 8) + +i[2]).toString(16).slice(1);
        },
        fastMapToColor: function(t, e, r) {
            if (e && e.length && t >= 0 && t <= 1) {
                r = r || [ 0, 0, 0, 0 ];
                var n = t * (e.length - 1), a = Math.floor(n), o = Math.ceil(n), s = e[a], l = e[o], u = n - a;
                return r[0] = i(h(s[0], l[0], u)), r[1] = i(h(s[1], l[1], u)), r[2] = i(h(s[2], l[2], u)), 
                r[3] = i(h(s[3], l[3], u)), r;
            }
        },
        mapToColor: function(t, e, r) {
            if (e && e.length && t >= 0 && t <= 1) {
                var a = t * (e.length - 1), o = Math.floor(a), s = Math.ceil(a), u = l(e[o]), c = l(e[s]), d = a - o, p = f([ i(h(u[0], c[0], d)), i(h(u[1], c[1], d)), i(h(u[2], c[2], d)), n(h(u[3], c[3], d)) ], "rgba");
                return r ? {
                    color: p,
                    leftIndex: o,
                    rightIndex: s,
                    value: a
                } : p;
            }
        },
        modifyHSL: function(t, e, i, n) {
            if (t = l(t)) return t = c(t), null != e && (t[0] = r(e)), null != i && (t[1] = o(i)), 
            null != n && (t[2] = o(n)), f(u(t), "rgba");
        },
        modifyAlpha: function(t, e) {
            if ((t = l(t)) && null != e) return t[3] = n(e), f(t, "rgba");
        },
        stringify: f
    };
}, function(t, e, i) {
    var r = i(17);
    t.exports = function() {
        if (0 !== r.debugMode) if (1 == r.debugMode) for (var t in arguments) throw new Error(arguments[t]); else if (r.debugMode > 1) for (var t in arguments) console.log(arguments[t]);
    };
}, function(t, e) {
    var i = {
        debugMode: 2,
        devicePixelRatio: 1
    };
    t.exports = i;
}, function(t, e, i) {
    function r(t, e, i, r) {
        i < 0 && (t += i, i = -i), r < 0 && (e += r, r = -r), this.x = t, this.y = e, this.width = i, 
        this.height = r;
    }
    var n = i(2), a = i(10), o = n.applyTransform, s = Math.min, h = Math.max;
    r.prototype = {
        constructor: r,
        union: function(t) {
            var e = s(t.x, this.x), i = s(t.y, this.y);
            this.width = h(t.x + t.width, this.x + this.width) - e, this.height = h(t.y + t.height, this.y + this.height) - i, 
            this.x = e, this.y = i;
        },
        applyTransform: function() {
            var t = [], e = [], i = [], r = [];
            return function(n) {
                if (n) {
                    t[0] = i[0] = this.x, t[1] = r[1] = this.y, e[0] = r[0] = this.x + this.width, e[1] = i[1] = this.y + this.height, 
                    o(t, t, n), o(e, e, n), o(i, i, n), o(r, r, n), this.x = s(t[0], e[0], i[0], r[0]), 
                    this.y = s(t[1], e[1], i[1], r[1]);
                    var a = h(t[0], e[0], i[0], r[0]), l = h(t[1], e[1], i[1], r[1]);
                    this.width = a - this.x, this.height = l - this.y;
                }
            };
        }(),
        calculateTransform: function(t) {
            var e = this, i = t.width / e.width, r = t.height / e.height, n = a.create();
            return a.translate(n, n, [ -e.x, -e.y ]), a.scale(n, n, [ i, r ]), a.translate(n, n, [ t.x, t.y ]), 
            n;
        },
        intersect: function(t) {
            if (!t) return !1;
            t instanceof r || (t = r.create(t));
            var e = this, i = e.x, n = e.x + e.width, a = e.y, o = e.y + e.height, s = t.x, h = t.x + t.width, l = t.y, u = t.y + t.height;
            return !(n < s || h < i || o < l || u < a);
        },
        contain: function(t, e) {
            var i = this;
            return t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height;
        },
        clone: function() {
            return new r(this.x, this.y, this.width, this.height);
        },
        copy: function(t) {
            this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height;
        },
        plain: function() {
            return {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            };
        }
    }, r.create = function(t) {
        return new r(t.x, t.y, t.width, t.height);
    }, t.exports = r;
}, function(t, e, i) {
    t.exports = i(20).extend({
        type: "arc",
        shape: {
            cx: 0,
            cy: 0,
            r: 0,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            clockwise: !0
        },
        style: {
            stroke: "#000000",
            fill: null
        },
        buildPath: function(t, e) {
            var i = e.cx, r = e.cy, n = Math.max(e.r, 0), a = e.startAngle, o = e.endAngle, s = e.clockwise, h = Math.cos(a), l = Math.sin(a);
            t.moveTo(h * n + i, l * n + r), t.arc(i, r, n, a, o, !s);
        }
    });
}, function(t, e, i) {
    function r(t) {
        n.call(this, t), this.path = new o();
    }
    var n = (i(16), i(21)), a = i(5), o = i(25), s = i(26), h = i(33).prototype.getCanvasPattern, l = Math.abs;
    r.prototype = {
        constructor: r,
        type: "path",
        __dirtyPath: !0,
        strokeContainThreshold: 5,
        brush: function(t, e) {
            var i = this.style, r = this.path, n = i.hasStroke(), a = i.hasFill(), o = i.fill, s = i.stroke, l = a && !!o.colorStops, u = n && !!s.colorStops, c = a && !!o.image, f = n && !!s.image;
            if (i.bind(t, this, e), this.setTransform(t), this.__dirty) {
                var d = this.getBoundingRect();
                l && (this._fillGradient = i.getGradient(t, o, d)), u && (this._strokeGradient = i.getGradient(t, s, d));
            }
            l ? t.setFillStyle(this._fillGradient) : c && t.setFillStyle(h.call(o, t)), u ? t.setStrokeStyle(this._strokeGradient) : f && t.setStrokeStyle(h.call(s, t));
            var p = i.lineDash, v = i.lineDashOffset, g = !!t.setLineDash, y = this.getGlobalScale();
            r.setScale(y[0], y[1]), this.__dirtyPath || p && !g && n ? (r = this.path.beginPath(t), 
            p && !g && (r.setLineDash(p), r.setLineDashOffset(v)), this.buildPath(r, this.shape, !1), 
            this.__dirtyPath = !1) : (t.beginPath(), this.path.rebuildPath(t)), a && r.fill(t), 
            p && g && (t.setLineDash(p), t.lineDashOffset = v);
            var _ = i.lineWidth;
            n && t.setLineWidth(_);
            var m = i.shadowBlur, x = i.shadowOffsetX || 0, b = i.shadowOffsetY || 0, w = i.shadowColor || "#000000";
            m && t.setShadow(m, x, b, w);
            var T = i.lineCap;
            T && t.setLineCap(T);
            var k = i.lineJoin;
            k && t.setLineJoin(k);
            var M = i.miterLimit;
            M && t.setMiterLimit(M), n && r.stroke(t), p && g && t.setLineDash([]), this.restoreTransform(t), 
            null != i.text && this.drawRectText(t, this.getBoundingRect());
        },
        buildPath: function(t, e, i) {},
        getBoundingRect: function() {
            var t = this._rect, e = this.style, i = !t;
            if (i) {
                var r = this.path;
                this.__dirtyPath && (r.beginPath(), this.buildPath(r, this.shape, !1)), t = r.getBoundingRect();
            }
            if (this._rect = t, e.hasStroke()) {
                var n = this._rectWithStroke || (this._rectWithStroke = t.clone());
                if (this.__dirty || i) {
                    n.copy(t);
                    var a = e.lineWidth, o = e.strokeNoScale ? this.getLineScale() : 1;
                    e.hasFill() || (a = Math.max(a, this.strokeContainThreshold || 4)), o > 1e-10 && (n.width += a / o, 
                    n.height += a / o, n.x -= a / o / 2, n.y -= a / o / 2);
                }
                return n;
            }
            return t;
        },
        contain: function(t, e) {
            var i = this.transformCoordToLocal(t, e), r = this.getBoundingRect(), n = this.style;
            if (t = i[0], e = i[1], r.contain(t, e)) {
                var a = this.path.data;
                if (n.hasStroke()) {
                    var o = n.lineWidth, h = n.strokeNoScale ? this.getLineScale() : 1;
                    if (h > 1e-10 && (n.hasFill() || (o = Math.max(o, this.strokeContainThreshold)), 
                    s.containStroke(a, o / h, t, e))) return !0;
                }
                if (n.hasFill()) return s.contain(a, t, e);
            }
            return !1;
        },
        dirty: function(t) {
            null == t && (t = !0), t && (this.__dirtyPath = t, this._rect = null), this.__dirty = !0, 
            this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty();
        },
        animateShape: function(t) {
            return this.animate("shape", t);
        },
        attrKV: function(t, e) {
            "shape" === t ? (this.setShape(e), this.__dirtyPath = !0, this._rect = null) : n.prototype.attrKV.call(this, t, e);
        },
        setShape: function(t, e) {
            var i = this.shape;
            if (i) {
                if (a.isObject(t)) for (var r in t) t.hasOwnProperty(r) && (i[r] = t[r]); else i[t] = e;
                this.dirty(!0);
            }
            return this;
        },
        getLineScale: function() {
            var t = this.transform;
            return t && l(t[0] - 1) > 1e-10 && l(t[3] - 1) > 1e-10 ? Math.sqrt(l(t[0] * t[3] - t[2] * t[1])) : 1;
        }
    }, r.extend = function(t) {
        var e = function(e) {
            r.call(this, e), t.style && this.style.extendFrom(t.style, !1);
            var i = t.shape;
            if (i) {
                this.shape = this.shape || {};
                var n = this.shape;
                for (var a in i) !n.hasOwnProperty(a) && i.hasOwnProperty(a) && (n[a] = i[a]);
            }
            t.init && t.init.call(this, e);
        };
        a.inherits(e, r);
        for (var i in t) "style" !== i && "shape" !== i && (e.prototype[i] = t[i]);
        return e;
    }, a.inherits(r, n), t.exports = r;
}, function(t, e, i) {
    function r(t) {
        t = t || {}, o.call(this, t);
        for (var e in t) t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);
        this.style = new a(t.style), this._rect = null, this.__clipPaths = [];
    }
    var n = i(5), a = i(22), o = i(6), s = i(23);
    r.prototype = {
        constructor: r,
        type: "displayable",
        __dirty: !0,
        invisible: !1,
        z: 0,
        z2: 0,
        zlevel: 0,
        draggable: !1,
        dragging: !1,
        silent: !1,
        culling: !1,
        cursor: "pointer",
        rectHover: !1,
        progressive: -1,
        beforeBrush: function(t) {},
        afterBrush: function(t) {},
        brush: function(t, e) {},
        getBoundingRect: function() {},
        contain: function(t, e) {
            return this.rectContain(t, e);
        },
        traverse: function(t, e) {
            t.call(e, this);
        },
        rectContain: function(t, e) {
            var i = this.transformCoordToLocal(t, e);
            return this.getBoundingRect().contain(i[0], i[1]);
        },
        dirty: function() {
            this.__dirty = !0, this._rect = null, this.__zr && this.__zr.refresh();
        },
        animateStyle: function(t) {
            return this.animate("style", t);
        },
        attrKV: function(t, e) {
            "style" !== t ? o.prototype.attrKV.call(this, t, e) : this.style.set(e);
        },
        setStyle: function(t, e) {
            return this.style.set(t, e), this.dirty(!1), this;
        },
        useStyle: function(t) {
            return this.style = new a(t), this.dirty(!1), this;
        }
    }, n.inherits(r, o), n.mixin(r, s), t.exports = r;
}, function(t, e, i) {
    function r(t, e, i) {
        var r = e.x, n = e.x2, a = e.y, o = e.y2;
        return e.global || (r = r * i.width + i.x, n = n * i.width + i.x, a = a * i.height + i.y, 
        o = o * i.height + i.y), t.createLinearGradient(r, a, n, o);
    }
    function n(t, e, i) {
        var r = i.width, n = i.height, a = Math.min(r, n), o = e.x, s = e.y, h = e.r;
        return e.global || (o = o * r + i.x, s = s * n + i.y, h *= a), t.createRadialGradient(o, s, 0, o, s, h);
    }
    for (var a = (i(16), [ [ "shadowBlur", 0 ], [ "shadowOffsetX", 0 ], [ "shadowOffsetY", 0 ], [ "shadowColor", "#000000" ], [ "lineCap", "butt" ], [ "lineJoin", "miter" ], [ "miterLimit", 10 ] ]), o = function(t) {
        this.extendFrom(t);
    }, s = o.prototype = {
        constructor: o,
        fill: "#000000",
        stroke: null,
        opacity: 1,
        lineDash: null,
        lineDashOffset: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        lineWidth: 1,
        strokeNoScale: !1,
        text: null,
        textFill: "#000000",
        textStroke: null,
        textPosition: "inside",
        textBaseline: null,
        textAlign: null,
        textVerticalAlign: null,
        textDistance: 5,
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        textTransform: !1,
        textRotation: 0,
        blend: null,
        bind: function(t, e, i) {
            for (var r = this, n = i && i.style, o = !n, s = 0; s < a.length; s++) {
                var h = a[s], l = h[0];
                (o || r[l] !== n[l]) && (t[l] = r[l] || h[1]);
            }
            if ((o || r.fill !== n.fill) && t.setFillStyle(r.fill), (o || r.stroke !== n.stroke) && t.setStrokeStyle(r.stroke), 
            (o || r.opacity !== n.opacity) && t.setGlobalAlpha(null == r.opacity ? 1 : r.opacity), 
            (o || r.blend !== n.blend) && (t.globalCompositeOperation = r.blend || "source-over"), 
            this.hasStroke()) {
                var u = r.lineWidth;
                t.lineWidth = u / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1);
            }
        },
        hasFill: function() {
            var t = this.fill;
            return null != t && "none" !== t;
        },
        hasStroke: function() {
            var t = this.stroke;
            return null != t && "none" !== t && this.lineWidth > 0;
        },
        extendFrom: function(t, e) {
            if (t) {
                var i = this;
                for (var r in t) !t.hasOwnProperty(r) || !e && i.hasOwnProperty(r) || (i[r] = t[r]);
            }
        },
        set: function(t, e) {
            "string" == typeof t ? this[t] = e : this.extendFrom(t, !0);
        },
        clone: function() {
            var t = new this.constructor();
            return t.extendFrom(this, !0), t;
        },
        getGradient: function(t, e, i) {
            for (var a = ("radial" === e.type ? n : r)(t, e, i), o = e.colorStops, s = 0; s < o.length; s++) a.addColorStop(o[s].offset, o[s].color);
            return a;
        }
    }, h = 0; h < a.length; h++) {
        var l = a[h];
        l[0] in s || (s[l[0]] = l[1]);
    }
    o.getGradient = s.getGradient, t.exports = o;
}, function(t, e, i) {
    function r(t, e) {
        return "string" == typeof t ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t;
    }
    var n = (i(16), i(24)), a = new (i(18))(), o = function() {};
    o.prototype = {
        constructor: o,
        drawRectText: function(t, e, i) {
            var o = this.style, s = o.text;
            if (null != s && (s += ""), s) {
                t.save();
                var h, l, u = o.textPosition, c = o.textDistance, f = o.textAlign, d = o.textFont || o.font, p = o.textBaseline, v = o.textVerticalAlign;
                i = i || n.getBoundingRect(s, d, f, p);
                var g = this.transform;
                if (o.textTransform ? this.setTransform(t) : g && (a.copy(e), a.applyTransform(g), 
                e = a), u instanceof Array) {
                    if (h = e.x + r(u[0], e.width), l = e.y + r(u[1], e.height), f = f || "left", p = p || "top", 
                    v) {
                        switch (v) {
                          case "middle":
                            l -= i.height / 2 - i.lineHeight / 2;
                            break;

                          case "bottom":
                            l -= i.height - i.lineHeight / 2;
                            break;

                          default:
                            l += i.lineHeight / 2;
                        }
                        p = "middle";
                    }
                } else {
                    var y = n.adjustTextPositionOnRect(u, e, i, c);
                    h = y.x, l = y.y, f = f || y.textAlign, p = p || y.textBaseline;
                }
                t.textAlign = f || "left", t.textBaseline = p || "alphabetic";
                var _ = o.textFill, m = o.textStroke;
                _ && t.setFillStyle(_), m && t.setStrokeStyle(m);
                var x = parseInt((d || "18 simsun").split(" ")[0].replace("px", ""));
                t.setFontSize(x), t.setShadow(o.textShadowOffsetX, o.textShadowOffsetY, o.textShadowBlur, o.textShadowColor || "rgba(0, 0, 0, 1)");
                var b = s.split("\n");
                o.textRotation && (g && t.translate(g[4], g[5]), t.rotate(o.textRotation), g && t.translate(-g[4], -g[5]));
                for (var w = 0; w < b.length; w++) _ && t.fillText(b[w], h, l), m && t.strokeText(b[w], h, l), 
                l += i.lineHeight;
                t.restore();
            }
        }
    }, t.exports = o;
}, function(t, e, i) {
    function r(t, e) {
        var i = t + ":" + e;
        if (a[i]) return a[i];
        for (var r = (t + "").split("\n"), n = 0, h = parseInt((e || "18 simsun").split(" ")[0].replace("px", "")), l = 0, u = r.length; l < u; l++) n = Math.max(c.measureText(r[l], h).width, n);
        return o > s && (o = 0, a = {}), o++, a[i] = n, n;
    }
    function n(t, e, i, r) {
        for (var n = 0, a = 0, o = t.length; a < o && n < e; a++) {
            var s = t.charCodeAt(a);
            n += 0 <= s && s <= 127 ? i : r;
        }
        return a;
    }
    var a = {}, o = 0, s = 5e3, h = i(5), l = i(18), u = h.retrieve, c = {
        getWidth: r,
        getBoundingRect: function(t, e, i, n) {
            var a = ((t || "") + "").split("\n").length, o = r(t, e), s = r("国", e), h = new l(0, 0, o, a * s);
            switch (h.lineHeight = s, n) {
              case "bottom":
              case "alphabetic":
                h.y -= s;
                break;

              case "middle":
                h.y -= s / 2;
            }
            switch (i) {
              case "end":
              case "right":
                h.x -= h.width;
                break;

              case "center":
                h.x -= h.width / 2;
            }
            return h;
        },
        adjustTextPositionOnRect: function(t, e, i, r) {
            var n = e.x, a = e.y, o = e.height, s = e.width, h = i.height, l = o / 2 - h / 2, u = "left";
            switch (t) {
              case "left":
                n -= r, a += l, u = "right";
                break;

              case "right":
                n += r + s, a += l, u = "left";
                break;

              case "top":
                n += s / 2, a -= r + h, u = "center";
                break;

              case "bottom":
                n += s / 2, a += o + r, u = "center";
                break;

              case "inside":
                n += s / 2, a += l, u = "center";
                break;

              case "insideLeft":
                n += r, a += l, u = "left";
                break;

              case "insideRight":
                n += s - r, a += l, u = "right";
                break;

              case "insideTop":
                n += s / 2, a += r, u = "center";
                break;

              case "insideBottom":
                n += s / 2, a += o - h - r, u = "center";
                break;

              case "insideTopLeft":
                n += r, a += r, u = "left";
                break;

              case "insideTopRight":
                n += s - r, a += r, u = "right";
                break;

              case "insideBottomLeft":
                n += r, a += o - h - r;
                break;

              case "insideBottomRight":
                n += s - r, a += o - h - r, u = "right";
            }
            return {
                x: n,
                y: a,
                textAlign: u,
                textBaseline: "top"
            };
        },
        truncateText: function(t, e, i, a, o) {
            if (!e) return "";
            o = o || {}, a = u(a, "...");
            for (var s = u(o.maxIterations, 2), h = u(o.minChar, 0), l = r("国", i), c = r("a", i), f = u(o.placeholder, ""), d = e = Math.max(0, e - 1), p = 0; p < h && d >= c; p++) d -= c;
            var v = r(a);
            v > d && (a = "", v = 0), d = e - v;
            for (var g = (t + "").split("\n"), p = 0, y = g.length; p < y; p++) {
                var _ = g[p], m = r(_, i);
                if (!(m <= e)) {
                    for (var x = 0; ;x++) {
                        if (m <= d || x >= s) {
                            _ += a;
                            break;
                        }
                        var b = 0 === x ? n(_, d, c, l) : m > 0 ? Math.floor(_.length * d / m) : 0;
                        m = r(_ = _.substr(0, b), i);
                    }
                    "" === _ && (_ = f), g[p] = _;
                }
            }
            return g.join("\n");
        },
        measureText: function(t, e) {
            return {
                width: 18
            };
        }
    };
    t.exports = c;
}, function(t, e, i) {
    var r = i(3), n = i(2), a = i(1), o = i(18), s = i(17).devicePixelRatio, h = {
        M: 1,
        L: 2,
        C: 3,
        Q: 4,
        A: 5,
        Z: 6,
        R: 7
    }, l = [], u = [], c = [], f = [], d = Math.min, p = Math.max, v = Math.cos, g = Math.sin, y = Math.sqrt, _ = Math.abs, m = "undefined" != typeof Float32Array, x = function() {
        this.data = [], this._len = 0, this._ctx = null, this._xi = 0, this._yi = 0, this._x0 = 0, 
        this._y0 = 0, this._ux = 0, this._uy = 0;
    };
    x.prototype = {
        constructor: x,
        _lineDash: null,
        _dashOffset: 0,
        _dashIdx: 0,
        _dashSum: 0,
        setScale: function(t, e) {
            this._ux = _(1 / s / t) || 0, this._uy = _(1 / s / e) || 0;
        },
        getContext: function() {
            return this._ctx;
        },
        beginPath: function(t) {
            return this._ctx = t, t && t.beginPath(), t && (this.dpr = t.dpr), this._len = 0, 
            this._lineDash && (this._lineDash = null, this._dashOffset = 0), this;
        },
        moveTo: function(t, e) {
            return this.addData(h.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, 
            this._y0 = e, this._xi = t, this._yi = e, this;
        },
        lineTo: function(t, e) {
            var i = _(t - this._xi) > this._ux || _(e - this._yi) > this._uy || this._len < 5;
            return this.addData(h.L, t, e), this._ctx && i && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)), 
            i && (this._xi = t, this._yi = e), this;
        },
        bezierCurveTo: function(t, e, i, r, n, a) {
            return this.addData(h.C, t, e, i, r, n, a), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, i, r, n, a) : this._ctx.bezierCurveTo(t, e, i, r, n, a)), 
            this._xi = n, this._yi = a, this;
        },
        quadraticCurveTo: function(t, e, i, r) {
            return this.addData(h.Q, t, e, i, r), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, i, r) : this._ctx.quadraticCurveTo(t, e, i, r)), 
            this._xi = i, this._yi = r, this;
        },
        arc: function(t, e, i, r, n, a) {
            return this.addData(h.A, t, e, i, i, r, n - r, 0, a ? 0 : 1), this._ctx && this._ctx.arc(t, e, i, r, n, a), 
            this._xi = v(n) * i + t, this._xi = g(n) * i + t, this;
        },
        arcTo: function(t, e, i, r, n) {
            return this._ctx && this._ctx.arcTo(t, e, i, r, n), this;
        },
        rect: function(t, e, i, r) {
            return this._ctx && this._ctx.rect(t, e, i, r), this.addData(h.R, t, e, i, r), this;
        },
        closePath: function() {
            this.addData(h.Z);
            var t = this._ctx, e = this._x0, i = this._y0;
            return t && (this._needsDash() && this._dashedLineTo(e, i), t.closePath()), this._xi = e, 
            this._yi = i, this;
        },
        fill: function(t) {
            t && t.fill(), this.toStatic();
        },
        stroke: function(t) {
            t && t.stroke(), this.toStatic();
        },
        setLineDash: function(t) {
            if (t instanceof Array) {
                this._lineDash = t, this._dashIdx = 0;
                for (var e = 0, i = 0; i < t.length; i++) e += t[i];
                this._dashSum = e;
            }
            return this;
        },
        setLineDashOffset: function(t) {
            return this._dashOffset = t, this;
        },
        len: function() {
            return this._len;
        },
        setData: function(t) {
            var e = t.length;
            this.data && this.data.length == e || !m || (this.data = new Float32Array(e));
            for (var i = 0; i < e; i++) this.data[i] = t[i];
            this._len = e;
        },
        appendPath: function(t) {
            t instanceof Array || (t = [ t ]);
            for (var e = t.length, i = 0, r = this._len, n = 0; n < e; n++) i += t[n].len();
            m && this.data instanceof Float32Array && (this.data = new Float32Array(r + i));
            for (n = 0; n < e; n++) for (var a = t[n].data, o = 0; o < a.length; o++) this.data[r++] = a[o];
            this._len = r;
        },
        addData: function(t) {
            var e = this.data;
            this._len + arguments.length > e.length && (this._expandData(), e = this.data);
            for (var i = 0; i < arguments.length; i++) e[this._len++] = arguments[i];
            this._prevCmd = t;
        },
        _expandData: function() {
            if (!(this.data instanceof Array)) {
                for (var t = [], e = 0; e < this._len; e++) t[e] = this.data[e];
                this.data = t;
            }
        },
        _needsDash: function() {
            return this._lineDash;
        },
        _dashedLineTo: function(t, e) {
            var i, r, n = this._dashSum, a = this._dashOffset, o = this._lineDash, s = this._ctx, h = this._xi, l = this._yi, u = t - h, c = e - l, f = y(u * u + c * c), v = h, g = l, _ = o.length;
            for (u /= f, c /= f, a < 0 && (a = n + a), v -= (a %= n) * u, g -= a * c; u > 0 && v <= t || u < 0 && v >= t || 0 == u && (c > 0 && g <= e || c < 0 && g >= e); ) v += u * (i = o[r = this._dashIdx]), 
            g += c * i, this._dashIdx = (r + 1) % _, u > 0 && v < h || u < 0 && v > h || c > 0 && g < l || c < 0 && g > l || s[r % 2 ? "moveTo" : "lineTo"](u >= 0 ? d(v, t) : p(v, t), c >= 0 ? d(g, e) : p(g, e));
            u = v - t, c = g - e, this._dashOffset = -y(u * u + c * c);
        },
        _dashedBezierTo: function(t, e, i, n, a, o) {
            var s, h, l, u, c, f = this._dashSum, d = this._dashOffset, p = this._lineDash, v = this._ctx, g = this._xi, _ = this._yi, m = r.cubicAt, x = 0, b = this._dashIdx, w = p.length, T = 0;
            for (d < 0 && (d = f + d), d %= f, s = 0; s < 1; s += .1) h = m(g, t, i, a, s + .1) - m(g, t, i, a, s), 
            l = m(_, e, n, o, s + .1) - m(_, e, n, o, s), x += y(h * h + l * l);
            for (;b < w && !((T += p[b]) > d); b++) ;
            for (s = (T - d) / x; s <= 1; ) u = m(g, t, i, a, s), c = m(_, e, n, o, s), b % 2 ? v.moveTo(u, c) : v.lineTo(u, c), 
            s += p[b] / x, b = (b + 1) % w;
            b % 2 != 0 && v.lineTo(a, o), h = a - u, l = o - c, this._dashOffset = -y(h * h + l * l);
        },
        _dashedQuadraticTo: function(t, e, i, r) {
            var n = i, a = r;
            i = (i + 2 * t) / 3, r = (r + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, 
            this._dashedBezierTo(t, e, i, r, n, a);
        },
        toStatic: function() {
            var t = this.data;
            t instanceof Array && (t.length = this._len, m && (this.data = new Float32Array(t)));
        },
        getBoundingRect: function() {
            l[0] = l[1] = c[0] = c[1] = Number.MAX_VALUE, u[0] = u[1] = f[0] = f[1] = -Number.MAX_VALUE;
            for (var t = this.data, e = 0, i = 0, r = 0, s = 0, d = 0; d < t.length; ) {
                var p = t[d++];
                switch (1 == d && (e = t[d], i = t[d + 1], r = e, s = i), p) {
                  case h.M:
                    e = r = t[d++], i = s = t[d++], c[0] = r, c[1] = s, f[0] = r, f[1] = s;
                    break;

                  case h.L:
                    a.fromLine(e, i, t[d], t[d + 1], c, f), e = t[d++], i = t[d++];
                    break;

                  case h.C:
                    a.fromCubic(e, i, t[d++], t[d++], t[d++], t[d++], t[d], t[d + 1], c, f), e = t[d++], 
                    i = t[d++];
                    break;

                  case h.Q:
                    a.fromQuadratic(e, i, t[d++], t[d++], t[d], t[d + 1], c, f), e = t[d++], i = t[d++];
                    break;

                  case h.A:
                    var y = t[d++], _ = t[d++], m = t[d++], x = t[d++], b = t[d++], w = t[d++] + b, T = (t[d++], 
                    1 - t[d++]);
                    1 == d && (r = v(b) * m + y, s = g(b) * x + _), a.fromArc(y, _, m, x, b, w, T, c, f), 
                    e = v(w) * m + y, i = g(w) * x + _;
                    break;

                  case h.R:
                    r = e = t[d++], s = i = t[d++];
                    var k = t[d++], M = t[d++];
                    a.fromLine(r, s, r + k, s + M, c, f);
                    break;

                  case h.Z:
                    e = r, i = s;
                }
                n.min(l, l, c), n.max(u, u, f);
            }
            return 0 === d && (l[0] = l[1] = u[0] = u[1] = 0), new o(l[0], l[1], u[0] - l[0], u[1] - l[1]);
        },
        rebuildPath: function(t) {
            for (var e, i, r, n, a, o, s = this.data, l = this._ux, u = this._uy, c = this._len, f = 0; f < c; ) {
                var d = s[f++];
                switch (1 == f && (r = s[f], n = s[f + 1], e = r, i = n), d) {
                  case h.M:
                    e = r = s[f++], i = n = s[f++], t.moveTo(r, n);
                    break;

                  case h.L:
                    a = s[f++], o = s[f++], (_(a - r) > l || _(o - n) > u || f === c - 1) && (t.lineTo(a, o), 
                    r = a, n = o);
                    break;

                  case h.C:
                    t.bezierCurveTo(s[f++], s[f++], s[f++], s[f++], s[f++], s[f++]), r = s[f - 2], n = s[f - 1];
                    break;

                  case h.Q:
                    t.quadraticCurveTo(s[f++], s[f++], s[f++], s[f++]), r = s[f - 2], n = s[f - 1];
                    break;

                  case h.A:
                    var p = s[f++], y = s[f++], m = s[f++], x = s[f++], b = s[f++], w = s[f++], T = s[f++], k = s[f++], M = m > x ? m : x, P = m > x ? 1 : m / x, S = m > x ? x / m : 1, A = b + w;
                    Math.abs(m - x) > .001 ? (t.translate(p, y), t.rotate(T), t.scale(P, S), t.arc(0, 0, M, b, A, 1 - k), 
                    t.scale(1 / P, 1 / S), t.rotate(-T), t.translate(-p, -y)) : t.arc(p, y, M, b, A, 1 - k), 
                    1 == f && (e = v(b) * m + p, i = g(b) * x + y), r = v(A) * m + p, n = g(A) * x + y;
                    break;

                  case h.R:
                    e = r = s[f], i = n = s[f + 1], t.rect(s[f++], s[f++], s[f++], s[f++]);
                    break;

                  case h.Z:
                    t.closePath(), r = e, n = i;
                }
            }
        }
    }, x.CMD = h, t.exports = x;
}, function(t, e, i) {
    function r(t, e) {
        return Math.abs(t - e) < m;
    }
    function n() {
        var t = b[0];
        b[0] = b[1], b[1] = t;
    }
    function a(t, e, i, r, a, o, s, h, l, u) {
        if (u > e && u > r && u > o && u > h || u < e && u < r && u < o && u < h) return 0;
        var c = v.cubicRootAt(e, r, o, h, u, x);
        if (0 === c) return 0;
        for (var f, d, p = 0, g = -1, y = 0; y < c; y++) {
            var _ = x[y], m = 0 === _ || 1 === _ ? .5 : 1;
            v.cubicAt(t, i, a, s, _) < l || (g < 0 && (g = v.cubicExtrema(e, r, o, h, b), b[1] < b[0] && g > 1 && n(), 
            f = v.cubicAt(e, r, o, h, b[0]), g > 1 && (d = v.cubicAt(e, r, o, h, b[1]))), p += 2 == g ? _ < b[0] ? f < e ? m : -m : _ < b[1] ? d < f ? m : -m : h < d ? m : -m : _ < b[0] ? f < e ? m : -m : h < f ? m : -m);
        }
        return p;
    }
    function o(t, e, i, r, n, a, o, s) {
        if (s > e && s > r && s > a || s < e && s < r && s < a) return 0;
        var h = v.quadraticRootAt(e, r, a, s, x);
        if (0 === h) return 0;
        var l = v.quadraticExtremum(e, r, a);
        if (l >= 0 && l <= 1) {
            for (var u = 0, c = v.quadraticAt(e, r, a, l), f = 0; f < h; f++) {
                d = 0 === x[f] || 1 === x[f] ? .5 : 1;
                (p = v.quadraticAt(t, i, n, x[f])) < o || (u += x[f] < l ? c < e ? d : -d : a < c ? d : -d);
            }
            return u;
        }
        var d = 0 === x[0] || 1 === x[0] ? .5 : 1, p = v.quadraticAt(t, i, n, x[0]);
        return p < o ? 0 : a < e ? d : -d;
    }
    function s(t, e, i, r, n, a, o, s) {
        if ((s -= e) > i || s < -i) return 0;
        l = Math.sqrt(i * i - s * s);
        x[0] = -l, x[1] = l;
        var h = Math.abs(r - n);
        if (h < 1e-4) return 0;
        if (h % _ < 1e-4) {
            r = 0, n = _;
            v = a ? 1 : -1;
            return o >= x[0] + t && o <= x[1] + t ? v : 0;
        }
        if (a) {
            var l = r;
            r = p(n), n = p(l);
        } else r = p(r), n = p(n);
        r > n && (n += _);
        for (var u = 0, c = 0; c < 2; c++) {
            var f = x[c];
            if (f + t > o) {
                var d = Math.atan2(s, f), v = a ? 1 : -1;
                d < 0 && (d = _ + d), (d >= r && d <= n || d + _ >= r && d + _ <= n) && (d > Math.PI / 2 && d < 1.5 * Math.PI && (v = -v), 
                u += v);
            }
        }
        return u;
    }
    function h(t, e, i, n, h) {
        for (var u = 0, p = 0, v = 0, _ = 0, m = 0, x = 0; x < t.length; ) {
            var b = t[x++];
            switch (b === l.M && x > 1 && (i || (u += g(p, v, _, m, n, h))), 1 == x && (p = t[x], 
            v = t[x + 1], _ = p, m = v), b) {
              case l.M:
                p = _ = t[x++], v = m = t[x++];
                break;

              case l.L:
                if (i) {
                    if (y(p, v, t[x], t[x + 1], e, n, h)) return !0;
                } else u += g(p, v, t[x], t[x + 1], n, h) || 0;
                p = t[x++], v = t[x++];
                break;

              case l.C:
                if (i) {
                    if (c.containStroke(p, v, t[x++], t[x++], t[x++], t[x++], t[x], t[x + 1], e, n, h)) return !0;
                } else u += a(p, v, t[x++], t[x++], t[x++], t[x++], t[x], t[x + 1], n, h) || 0;
                p = t[x++], v = t[x++];
                break;

              case l.Q:
                if (i) {
                    if (f.containStroke(p, v, t[x++], t[x++], t[x], t[x + 1], e, n, h)) return !0;
                } else u += o(p, v, t[x++], t[x++], t[x], t[x + 1], n, h) || 0;
                p = t[x++], v = t[x++];
                break;

              case l.A:
                var w = t[x++], T = t[x++], k = t[x++], M = t[x++], P = t[x++], S = t[x++], A = (t[x++], 
                1 - t[x++]), C = Math.cos(P) * k + w, L = Math.sin(P) * M + T;
                x > 1 ? u += g(p, v, C, L, n, h) : (_ = C, m = L);
                var O = (n - w) * M / k + w;
                if (i) {
                    if (d.containStroke(w, T, M, P, P + S, A, e, O, h)) return !0;
                } else u += s(w, T, M, P, P + S, A, O, h);
                p = Math.cos(P + S) * k + w, v = Math.sin(P + S) * M + T;
                break;

              case l.R:
                _ = p = t[x++], m = v = t[x++];
                var C = _ + t[x++], L = m + t[x++];
                if (i) {
                    if (y(_, m, C, m, e, n, h) || y(C, m, C, L, e, n, h) || y(C, L, _, L, e, n, h) || y(_, L, _, m, e, n, h)) return !0;
                } else u += g(C, m, C, L, n, h), u += g(_, L, _, m, n, h);
                break;

              case l.Z:
                if (i) {
                    if (y(p, v, _, m, e, n, h)) return !0;
                } else u += g(p, v, _, m, n, h);
                p = _, v = m;
            }
        }
        return i || r(v, m) || (u += g(p, v, _, m, n, h) || 0), 0 !== u;
    }
    var l = i(25).CMD, u = i(27), c = i(28), f = i(29), d = i(30), p = i(31).normalizeRadian, v = i(3), g = i(32), y = u.containStroke, _ = 2 * Math.PI, m = 1e-4, x = [ -1, -1, -1 ], b = [ -1, -1 ];
    t.exports = {
        contain: function(t, e, i) {
            return h(t, 0, !1, e, i);
        },
        containStroke: function(t, e, i, r) {
            return h(t, e, !0, i, r);
        }
    };
}, function(t, e) {
    t.exports = {
        containStroke: function(t, e, i, r, n, a, o) {
            if (0 === n) return !1;
            var s = n, h = 0, l = t;
            if (o > e + s && o > r + s || o < e - s && o < r - s || a > t + s && a > i + s || a < t - s && a < i - s) return !1;
            if (t === i) return Math.abs(a - t) <= s / 2;
            var u = (h = (e - r) / (t - i)) * a - o + (l = (t * r - i * e) / (t - i));
            return u * u / (h * h + 1) <= s / 2 * s / 2;
        }
    };
}, function(t, e, i) {
    var r = i(3);
    t.exports = {
        containStroke: function(t, e, i, n, a, o, s, h, l, u, c) {
            if (0 === l) return !1;
            var f = l;
            return !(c > e + f && c > n + f && c > o + f && c > h + f || c < e - f && c < n - f && c < o - f && c < h - f || u > t + f && u > i + f && u > a + f && u > s + f || u < t - f && u < i - f && u < a - f && u < s - f) && r.cubicProjectPoint(t, e, i, n, a, o, s, h, u, c, null) <= f / 2;
        }
    };
}, function(t, e, i) {
    var r = i(3);
    t.exports = {
        containStroke: function(t, e, i, n, a, o, s, h, l) {
            if (0 === s) return !1;
            var u = s;
            return !(l > e + u && l > n + u && l > o + u || l < e - u && l < n - u && l < o - u || h > t + u && h > i + u && h > a + u || h < t - u && h < i - u && h < a - u) && r.quadraticProjectPoint(t, e, i, n, a, o, h, l, null) <= u / 2;
        }
    };
}, function(t, e, i) {
    var r = i(31).normalizeRadian, n = 2 * Math.PI;
    t.exports = {
        containStroke: function(t, e, i, a, o, s, h, l, u) {
            if (0 === h) return !1;
            var c = h;
            l -= t, u -= e;
            var f = Math.sqrt(l * l + u * u);
            if (f - c > i || f + c < i) return !1;
            if (Math.abs(a - o) % n < 1e-4) return !0;
            if (s) {
                var d = a;
                a = r(o), o = r(d);
            } else a = r(a), o = r(o);
            a > o && (o += n);
            var p = Math.atan2(u, l);
            return p < 0 && (p += n), p >= a && p <= o || p + n >= a && p + n <= o;
        }
    };
}, function(t, e) {
    var i = 2 * Math.PI;
    t.exports = {
        normalizeRadian: function(t) {
            return (t %= i) < 0 && (t += i), t;
        }
    };
}, function(t, e) {
    t.exports = function(t, e, i, r, n, a) {
        if (a > e && a > r || a < e && a < r) return 0;
        if (r === e) return 0;
        var o = r < e ? 1 : -1, s = (a - e) / (r - e);
        return 1 !== s && 0 !== s || (o = r < e ? .5 : -.5), s * (i - t) + t > n ? o : 0;
    };
}, function(t, e) {
    var i = function(t, e) {
        this.image = t, this.repeat = e, this.type = "pattern";
    };
    i.prototype.getCanvasPattern = function(t) {
        return this._canvasPattern || (this._canvasPattern = t.createPattern(this.image, this.repeat));
    }, t.exports = i;
}, function(t, e, i) {
    function r(t, e, i) {
        var r = t.cpx2, n = t.cpy2;
        return null === r || null === n ? [ (i ? c : l)(t.x1, t.cpx1, t.cpx2, t.x2, e), (i ? c : l)(t.y1, t.cpy1, t.cpy2, t.y2, e) ] : [ (i ? u : h)(t.x1, t.cpx1, t.x2, e), (i ? u : h)(t.y1, t.cpy1, t.y2, e) ];
    }
    var n = i(3), a = i(2), o = n.quadraticSubdivide, s = n.cubicSubdivide, h = n.quadraticAt, l = n.cubicAt, u = n.quadraticDerivativeAt, c = n.cubicDerivativeAt, f = [];
    t.exports = i(20).extend({
        type: "bezier-curve",
        shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            cpx1: 0,
            cpy1: 0,
            percent: 1
        },
        style: {
            stroke: "#000000",
            fill: null
        },
        buildPath: function(t, e) {
            var i = e.x1, r = e.y1, n = e.x2, a = e.y2, h = e.cpx1, l = e.cpy1, u = e.cpx2, c = e.cpy2, d = e.percent;
            0 !== d && (t.moveTo(i, r), null == u || null == c ? (d < 1 && (o(i, h, n, d, f), 
            h = f[1], n = f[2], o(r, l, a, d, f), l = f[1], a = f[2]), t.quadraticCurveTo(h, l, n, a)) : (d < 1 && (s(i, h, u, n, d, f), 
            h = f[1], u = f[2], n = f[3], s(r, l, c, a, d, f), l = f[1], c = f[2], a = f[3]), 
            t.bezierCurveTo(h, l, u, c, n, a)));
        },
        pointAt: function(t) {
            return r(this.shape, t, !1);
        },
        tangentAt: function(t) {
            var e = r(this.shape, t, !0);
            return a.normalize(e, e);
        }
    });
}, function(t, e, i) {
    t.exports = i(20).extend({
        type: "circle",
        shape: {
            cx: 0,
            cy: 0,
            r: 0
        },
        buildPath: function(t, e, i) {
            i && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0);
        }
    });
}, function(t, e, i) {
    t.exports = i(20).extend({
        type: "droplet",
        shape: {
            cx: 0,
            cy: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var i = e.cx, r = e.cy, n = e.width, a = e.height;
            t.moveTo(i, r + n), t.bezierCurveTo(i + n, r + n, i + 3 * n / 2, r - n / 3, i, r - a), 
            t.bezierCurveTo(i - 3 * n / 2, r - n / 3, i - n, r + n, i, r + n), t.closePath();
        }
    });
}, function(t, e, i) {
    t.exports = i(20).extend({
        type: "ellipse",
        shape: {
            cx: 0,
            cy: 0,
            rx: 0,
            ry: 0
        },
        buildPath: function(t, e) {
            var i = .5522848, r = e.cx, n = e.cy, a = e.rx, o = e.ry, s = a * i, h = o * i;
            t.moveTo(r - a, n), t.bezierCurveTo(r - a, n - h, r - s, n - o, r, n - o), t.bezierCurveTo(r + s, n - o, r + a, n - h, r + a, n), 
            t.bezierCurveTo(r + a, n + h, r + s, n + o, r, n + o), t.bezierCurveTo(r - s, n + o, r - a, n + h, r - a, n), 
            t.closePath();
        }
    });
}, function(t, e, i) {
    t.exports = i(20).extend({
        type: "heart",
        shape: {
            cx: 0,
            cy: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var i = e.cx, r = e.cy, n = e.width, a = e.height;
            t.moveTo(i, r), t.bezierCurveTo(i + n / 2, r - 2 * a / 3, i + 2 * n, r + a / 3, i, r + a), 
            t.bezierCurveTo(i - 2 * n, r + a / 3, i - n / 2, r - 2 * a / 3, i, r);
        }
    });
}, function(t, e, i) {
    var r = Math.PI, n = Math.sin, a = Math.cos;
    t.exports = i(20).extend({
        type: "isogon",
        shape: {
            x: 0,
            y: 0,
            r: 0,
            n: 0
        },
        buildPath: function(t, e) {
            var i = e.n;
            if (i && !(i < 2)) {
                var o = e.x, s = e.y, h = e.r, l = 2 * r / i, u = -r / 2;
                t.moveTo(o + h * a(u), s + h * n(u));
                for (var c = 0, f = i - 1; c < f; c++) u += l, t.lineTo(o + h * a(u), s + h * n(u));
                t.closePath();
            }
        }
    });
}, function(t, e, i) {
    t.exports = i(20).extend({
        type: "line",
        shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            percent: 1
        },
        style: {
            stroke: "#000000",
            fill: null
        },
        buildPath: function(t, e) {
            var i = e.x1, r = e.y1, n = e.x2, a = e.y2, o = e.percent;
            0 !== o && (t.moveTo(i, r), o < 1 && (n = i * (1 - o) + n * o, a = r * (1 - o) + a * o), 
            t.lineTo(n, a));
        },
        pointAt: function(t) {
            var e = this.shape;
            return [ e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t ];
        }
    });
}, function(t, e, i) {
    var r = i(42);
    t.exports = i(20).extend({
        type: "polyline",
        shape: {
            points: null,
            smooth: !1,
            smoothConstraint: null
        },
        style: {
            stroke: "#000000",
            fill: null
        },
        buildPath: function(t, e) {
            r.buildPath(t, e, !1);
        }
    });
}, function(t, e, i) {
    var r = i(43), n = i(44);
    t.exports = {
        buildPath: function(t, e, i) {
            var a = e.points, o = e.smooth;
            if (a && a.length >= 2) {
                if (o && "spline" !== o) {
                    var s = n(a, o, i, e.smoothConstraint);
                    t.moveTo(a[0][0], a[0][1]);
                    for (var h = a.length, l = 0; l < (i ? h : h - 1); l++) {
                        var u = s[2 * l], c = s[2 * l + 1], f = a[(l + 1) % h];
                        t.bezierCurveTo(u[0], u[1], c[0], c[1], f[0], f[1]);
                    }
                } else {
                    "spline" === o && (a = r(a, i)), t.moveTo(a[0][0], a[0][1]);
                    for (var l = 1, d = a.length; l < d; l++) t.lineTo(a[l][0], a[l][1]);
                }
                i && t.closePath();
            }
        }
    };
}, function(t, e, i) {
    function r(t, e, i, r, n, a, o) {
        var s = .5 * (i - t), h = .5 * (r - e);
        return (2 * (e - i) + s + h) * o + (-3 * (e - i) - 2 * s - h) * a + s * n + e;
    }
    var n = i(2);
    t.exports = function(t, e) {
        for (var i = t.length, a = [], o = 0, s = 1; s < i; s++) o += n.distance(t[s - 1], t[s]);
        var h = o / 2;
        h = h < i ? i : h;
        for (s = 0; s < h; s++) {
            var l, u, c, f = s / (h - 1) * (e ? i : i - 1), d = Math.floor(f), p = f - d, v = t[d % i];
            e ? (l = t[(d - 1 + i) % i], u = t[(d + 1) % i], c = t[(d + 2) % i]) : (l = t[0 === d ? d : d - 1], 
            u = t[d > i - 2 ? i - 1 : d + 1], c = t[d > i - 3 ? i - 1 : d + 2]);
            var g = p * p, y = p * g;
            a.push([ r(l[0], v[0], u[0], c[0], p, g, y), r(l[1], v[1], u[1], c[1], p, g, y) ]);
        }
        return a;
    };
}, function(t, e, i) {
    var r = i(2), n = r.min, a = r.max, o = r.scale, s = r.distance, h = r.add;
    t.exports = function(t, e, i, l) {
        var u, c, f, d, p = [], v = [], g = [], y = [];
        if (l) {
            f = [ 1 / 0, 1 / 0 ], d = [ -1 / 0, -1 / 0 ];
            for (var _ = 0, m = t.length; _ < m; _++) n(f, f, t[_]), a(d, d, t[_]);
            n(f, f, l[0]), a(d, d, l[1]);
        }
        for (var _ = 0, m = t.length; _ < m; _++) {
            var x = t[_];
            if (i) u = t[_ ? _ - 1 : m - 1], c = t[(_ + 1) % m]; else {
                if (0 === _ || _ === m - 1) {
                    p.push(r.clone(t[_]));
                    continue;
                }
                u = t[_ - 1], c = t[_ + 1];
            }
            r.sub(v, c, u), o(v, v, e);
            var b = s(x, u), w = s(x, c), T = b + w;
            0 !== T && (b /= T, w /= T), o(g, v, -b), o(y, v, w);
            var k = h([], x, g), M = h([], x, y);
            l && (a(k, k, f), n(k, k, d), a(M, M, f), n(M, M, d)), p.push(k), p.push(M);
        }
        return i && p.push(p.shift()), p;
    };
}, function(t, e, i) {
    var r = i(42);
    t.exports = i(20).extend({
        type: "polygon",
        shape: {
            points: null,
            smooth: !1,
            smoothConstraint: null
        },
        buildPath: function(t, e) {
            r.buildPath(t, e, !0);
        }
    });
}, function(t, e, i) {
    var r = i(47);
    t.exports = i(20).extend({
        type: "rect",
        shape: {
            r: 0,
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var i = e.x, n = e.y, a = e.width, o = e.height;
            e.r ? r.buildPath(t, e) : t.rect(i, n, a, o), t.closePath();
        }
    });
}, function(t, e) {
    t.exports = {
        buildPath: function(t, e) {
            var i, r, n, a, o = e.x, s = e.y, h = e.width, l = e.height, u = e.r;
            h < 0 && (o += h, h = -h), l < 0 && (s += l, l = -l), "number" == typeof u ? i = r = n = a = u : u instanceof Array ? 1 === u.length ? i = r = n = a = u[0] : 2 === u.length ? (i = n = u[0], 
            r = a = u[1]) : 3 === u.length ? (i = u[0], r = a = u[1], n = u[2]) : (i = u[0], 
            r = u[1], n = u[2], a = u[3]) : i = r = n = a = 0;
            var c;
            i + r > h && (c = i + r, i *= h / c, r *= h / c), n + a > h && (c = n + a, n *= h / c, 
            a *= h / c), r + n > l && (c = r + n, r *= l / c, n *= l / c), i + a > l && (c = i + a, 
            i *= l / c, a *= l / c), t.moveTo(o + i, s), t.lineTo(o + h - r, s), 0 !== r && t.quadraticCurveTo(o + h, s, o + h, s + r), 
            t.lineTo(o + h, s + l - n), 0 !== n && t.quadraticCurveTo(o + h, s + l, o + h - n, s + l), 
            t.lineTo(o + a, s + l), 0 !== a && t.quadraticCurveTo(o, s + l, o, s + l - a), t.lineTo(o, s + i), 
            0 !== i && t.quadraticCurveTo(o, s, o + i, s);
        }
    };
}, function(t, e, i) {
    t.exports = i(20).extend({
        type: "ring",
        shape: {
            cx: 0,
            cy: 0,
            r: 0,
            r0: 0
        },
        buildPath: function(t, e) {
            var i = e.cx, r = e.cy, n = 2 * Math.PI;
            t.moveTo(i + e.r, r), t.arc(i, r, e.r, 0, n, !1), t.moveTo(i + e.r0, r), t.arc(i, r, e.r0, 0, n, !0);
        }
    });
}, function(t, e, i) {
    var r = Math.sin, n = Math.cos, a = Math.PI / 180;
    t.exports = i(20).extend({
        type: "rose",
        shape: {
            cx: 0,
            cy: 0,
            r: [],
            k: 0,
            n: 1
        },
        style: {
            stroke: "#000000",
            fill: null
        },
        buildPath: function(t, e) {
            var i, o, s, h = e.r, l = e.k, u = e.n, c = e.cx, f = e.cy;
            t.moveTo(c, f);
            for (var d = 0, p = h.length; d < p; d++) {
                s = h[d];
                for (var v = 0; v <= 360 * u; v++) i = s * r(l / u * v % 360 * a) * n(v * a) + c, 
                o = s * r(l / u * v % 360 * a) * r(v * a) + f, t.lineTo(i, o);
            }
        }
    });
}, function(t, e, i) {
    var r = i(20);
    t.exports = r.extend({
        type: "sector",
        shape: {
            cx: 0,
            cy: 0,
            r0: 0,
            r: 0,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            clockwise: !0
        },
        buildPath: function(t, e) {
            var i = e.cx, r = e.cy, n = Math.max(e.r0 || 0, 0), a = Math.max(e.r, 0), o = e.startAngle, s = e.endAngle, h = e.clockwise, l = Math.cos(o), u = Math.sin(o);
            t.moveTo(l * n + i, u * n + r), t.lineTo(l * a + i, u * a + r), t.arc(i, r, a, o, s, !h), 
            t.lineTo(Math.cos(s) * n + i, Math.sin(s) * n + r), 0 !== n && t.arc(i, r, n, s, o, h), 
            t.closePath();
        }
    });
}, function(t, e, i) {
    var r = Math.PI, n = Math.cos, a = Math.sin;
    t.exports = i(20).extend({
        type: "star",
        shape: {
            cx: 0,
            cy: 0,
            n: 3,
            r0: null,
            r: 0
        },
        buildPath: function(t, e) {
            var i = e.n;
            if (i && !(i < 2)) {
                var o = e.cx, s = e.cy, h = e.r, l = e.r0;
                null == l && (l = i > 4 ? h * n(2 * r / i) / n(r / i) : h / 3);
                var u = r / i, c = -r / 2, f = o + h * n(c), d = s + h * a(c);
                c += u, t.moveTo(f, d);
                for (var p, v = 0, g = 2 * i - 1; v < g; v++) p = v % 2 == 0 ? l : h, t.lineTo(o + p * n(c), s + p * a(c)), 
                c += u;
                t.closePath();
            }
        }
    });
}, function(t, e, i) {
    var r = Math.cos, n = Math.sin;
    t.exports = i(20).extend({
        type: "trochoid",
        shape: {
            cx: 0,
            cy: 0,
            r: 0,
            r0: 0,
            d: 0,
            location: "out"
        },
        style: {
            stroke: "#000000",
            fill: null
        },
        buildPath: function(t, e) {
            var i, a, o, s, h = e.r, l = e.r0, u = e.d, c = e.cx, f = e.cy, d = "out" == e.location ? 1 : -1;
            if (!(e.location && h <= l)) {
                var p, v = 0, g = 1;
                i = (h + d * l) * r(0) - d * u * r(0) + c, a = (h + d * l) * n(0) - u * n(0) + f, 
                t.moveTo(i, a);
                do {
                    v++;
                } while (l * v % (h + d * l) != 0);
                do {
                    p = Math.PI / 180 * g, o = (h + d * l) * r(p) - d * u * r((h / l + d) * p) + c, 
                    s = (h + d * l) * n(p) - u * n((h / l + d) * p) + f, t.lineTo(o, s), g++;
                } while (g <= l * v / (h + d * l) * 360);
            }
        }
    });
}, function(t, e) {
    var i = function(t) {
        this.colorStops = t || [];
    };
    i.prototype = {
        constructor: i,
        addColorStop: function(t, e) {
            this.colorStops.push({
                offset: t,
                color: e
            });
        }
    }, t.exports = i;
}, function(t, e, i) {
    var r = i(5), n = i(53), a = function(t, e, i, r, a, o) {
        this.x = null == t ? 0 : t, this.y = null == e ? 0 : e, this.x2 = null == i ? 1 : i, 
        this.y2 = null == r ? 0 : r, this.type = "linear", this.global = o || !1, n.call(this, a);
    };
    a.prototype = {
        constructor: a
    }, r.inherits(a, n), t.exports = a;
}, function(t, e, i) {
    var r = i(5), n = i(53), a = function(t, e, i, r, a) {
        this.x = null == t ? .5 : t, this.y = null == e ? .5 : e, this.r = null == i ? .5 : i, 
        this.type = "radial", this.global = a || !1, n.call(this, r);
    };
    a.prototype = {
        constructor: a
    }, r.inherits(a, n), t.exports = a;
}, function(t, e, i) {
    var r = i(21), n = i(5), a = i(24), o = function(t) {
        r.call(this, t);
    };
    o.prototype = {
        constructor: o,
        type: "text",
        brush: function(t, e) {
            var i = this.style, r = i.x || 0, n = i.y || 0, o = i.text;
            if (null != o && (o += ""), i.bind(t, this, e), o) {
                this.setTransform(t);
                var s, h = i.textAlign, l = i.textFont || i.font;
                if (i.textVerticalAlign) {
                    var u = a.getBoundingRect(o, l, i.textAlign, "top");
                    switch (s = "middle", i.textVerticalAlign) {
                      case "middle":
                        n -= u.height / 2 - u.lineHeight / 2;
                        break;

                      case "bottom":
                        n -= u.height - u.lineHeight / 2;
                        break;

                      default:
                        n += u.lineHeight / 2;
                    }
                } else s = i.textBaseline;
                var c = parseInt((l || "18 simsun").split(" ")[0].replace("px", ""));
                t.setFontSize(c), t.textAlign = h || "left", t.textAlign !== h && (t.textAlign = "left"), 
                t.textBaseline = s || "alphabetic", t.textBaseline !== s && (t.textBaseline = "alphabetic");
                for (var f = a.measureText("国", c).width, d = o.split("\n"), p = 0; p < d.length; p++) i.hasFill() && t.fillText(d[p], r, n), 
                i.hasStroke() && t.strokeText(d[p], r, n), n += f;
                this.restoreTransform(t);
            }
        },
        getBoundingRect: function() {
            if (!this._rect) {
                var t = this.style, e = t.textVerticalAlign, i = a.getBoundingRect(t.text + "", t.textFont || t.font, t.textAlign, e ? "top" : t.textBaseline);
                switch (e) {
                  case "middle":
                    i.y -= i.height / 2;
                    break;

                  case "bottom":
                    i.y -= i.height;
                }
                i.x += t.x || 0, i.y += t.y || 0, this._rect = i;
            }
            return this._rect;
        }
    }, n.inherits(o, r), t.exports = o;
}, function(t, e, i) {
    function r(t) {
        n.call(this, t);
    }
    var n = i(21), a = i(18), o = i(5);
    r.prototype = {
        constructor: r,
        type: "image",
        brush: function(t, e) {
            var i = this.style, r = i.image;
            i.bind(t, this, e);
            var n = i.width, a = i.height, o = i.x || 0, s = i.y || 0;
            this.setTransform(t), t.drawImage(r, o, s, n, a), null != i.text && this.drawRectText(t, this.getBoundingRect());
        },
        getBoundingRect: function() {
            var t = this.style;
            return this._rect || (this._rect = new a(t.x || 0, t.y || 0, t.width || 0, t.height || 0)), 
            this._rect;
        }
    }, o.inherits(r, n), t.exports = r;
}, function(t, e, i) {
    var r = i(5), n = i(59).Dispatcher, a = i(60), o = i(12), s = function(t) {
        t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function() {}, 
        this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, 
        this._paused = !1, n.call(this);
    };
    s.prototype = {
        constructor: s,
        addClip: function(t) {
            this._clips.push(t);
        },
        addAnimator: function(t) {
            t.animation = this;
            for (var e = t.getClips(), i = 0; i < e.length; i++) this.addClip(e[i]);
        },
        removeClip: function(t) {
            var e = r.indexOf(this._clips, t);
            e >= 0 && this._clips.splice(e, 1);
        },
        removeAnimator: function(t) {
            for (var e = t.getClips(), i = 0; i < e.length; i++) this.removeClip(e[i]);
            t.animation = null;
        },
        _update: function() {
            for (var t = new Date().getTime() - this._pausedTime, e = t - this._time, i = this._clips, r = i.length, n = [], a = [], o = 0; o < r; o++) {
                var s = i[o], h = s.step(t);
                h && (n.push(h), a.push(s));
            }
            for (o = 0; o < r; ) i[o]._needsRemove ? (i[o] = i[r - 1], i.pop(), r--) : o++;
            r = n.length;
            for (o = 0; o < r; o++) a[o].fire(n[o]);
            this._time = t, this.onframe(e), this.trigger("frame", e), this.stage.update && this.stage.update();
        },
        _startLoop: function() {
            function t() {
                e._running && (a(t), !e._paused && e._update());
            }
            var e = this;
            this._running = !0, a(t);
        },
        start: function() {
            this._time = new Date().getTime(), this._pausedTime = 0, this._startLoop();
        },
        stop: function() {
            this._running = !1;
        },
        pause: function() {
            this._paused || (this._pauseStart = new Date().getTime(), this._paused = !0);
        },
        resume: function() {
            this._paused && (this._pausedTime += new Date().getTime() - this._pauseStart, this._paused = !1);
        },
        clear: function() {
            this._clips = [];
        },
        animate: function(t, e) {
            return new o(t, (e = e || {}).loop, e.getter, e.setter);
        }
    }, r.mixin(s, n), t.exports = s;
}, function(t, e, i) {
    function r(t) {
        return t.getBoundingClientRect ? t.getBoundingClientRect() : {
            left: 0,
            top: 0
        };
    }
    function n(t, e, i, r) {
        return i = i || {}, a(t, e, i), i;
    }
    function a(t, e, i) {
        var n = r(t);
        i.zrX = e.clientX - n.left, i.zrY = e.clientY - n.top;
    }
    var o = i(8);
    t.exports = {
        clientToLocal: n,
        normalizeEvent: function(t, e, i) {
            if (null != e.zrX) return e;
            var r = e.type;
            if (r && r.indexOf("touch") >= 0) {
                var a = "touchend" != r ? e.targetTouches[0] : e.changedTouches[0];
                a && n(t, a, e, i);
            } else n(t, e, e, i), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
            return e;
        },
        addEventListener: function(t, e, i) {
            t.attachEvent("on" + e, i);
        },
        removeEventListener: function(t, e, i) {
            t.detachEvent("on" + e, i);
        },
        stop: function(t) {
            t.returnValue = !1, t.cancelBubble = !0;
        },
        Dispatcher: o
    };
}, function(t, e) {
    t.exports = function(t) {
        setTimeout(t, 16);
    };
}, function(t, e, i) {
    function r(t) {
        delete u[t];
    }
    var n = i(7), a = i(5), o = i(62), s = i(64), h = i(58), l = (i(16), {
        canvas: i(66)
    }), u = {}, c = {};
    c.version = "WeZRender", c.init = function(t, e, i) {
        var r = {
            id: t,
            width: e,
            height: i,
            context: null,
            getContext: function() {
                if (!this.context) {
                    var t = wx.createCanvasContext(this.id);
                    t.id = this.id, t.setTransform || (t.setTransform = function() {}), t.setTransform || (t.measureText = {}), 
                    this.context = t;
                }
                return this.context;
            }
        }, a = {}, o = new f(n(), r, a);
        return u[o.id] = o, o;
    }, c.dispose = function(t) {
        if (t) t.dispose(); else {
            for (var e in u) u.hasOwnProperty(e) && u[e].dispose();
            u = {};
        }
        return c;
    }, c.getInstance = function(t) {
        return u[t];
    }, c.registerPainter = function(t, e) {
        l[t] = e;
    };
    var f = function(t, e, i) {
        i = i || {}, this.dom = e, this.id = t;
        var r = this, n = new s(), u = new l.canvas(e, n, i);
        this.storage = n, this.painter = u;
        this.handler = new o(n, u, null, u.root), this.animation = new h({
            stage: {
                update: a.bind(this.flush, this)
            }
        }), this.animation.start(), this._needsRefresh;
        var c = n.delFromMap, f = n.addToMap;
        n.delFromMap = function(t) {
            var e = n.get(t);
            c.call(n, t), e && e.removeSelfFromZr(r);
        }, n.addToMap = function(t) {
            f.call(n, t), t.addSelfToZr(r);
        };
    };
    f.prototype = {
        constructor: f,
        getId: function() {
            return this.id;
        },
        add: function(t) {
            this.storage.addRoot(t), this._needsRefresh = !0;
        },
        remove: function(t) {
            this.storage.delRoot(t), this._needsRefresh = !0;
        },
        configLayer: function(t, e) {
            this.painter.configLayer(t, e), this._needsRefresh = !0;
        },
        refreshImmediately: function() {
            this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1;
        },
        refresh: function() {
            this._needsRefresh = !0;
        },
        flush: function() {
            this._needsRefresh && this.refreshImmediately();
        },
        clearAnimation: function() {
            this.animation.clear();
        },
        getWidth: function() {
            return this.painter.getWidth();
        },
        getHeight: function() {
            return this.painter.getHeight();
        },
        on: function(t, e, i) {
            this.handler.on(t, e, i);
        },
        off: function(t, e) {
            this.handler.off(t, e);
        },
        trigger: function(t, e) {
            this.handler.trigger(t, e);
        },
        clear: function() {
            this.storage.delRoot(), this.painter.clear();
        },
        dispose: function() {
            this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), 
            this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, 
            r(this.id);
        }
    }, t.exports = c;
}, function(t, e, i) {
    function r(t, e, i) {
        return {
            type: t,
            event: i,
            target: e,
            cancelBubble: !1,
            offsetX: i.zrX,
            offsetY: i.zrY,
            gestureEvent: i.gestureEvent,
            pinchX: i.pinchX,
            pinchY: i.pinchY,
            pinchScale: i.pinchScale,
            wheelDelta: i.zrDelta,
            zrByTouch: i.zrByTouch
        };
    }
    function n() {}
    function a(t, e, i) {
        if (t[t.rectHover ? "rectContain" : "contain"](e, i)) {
            for (var r = t; r; ) {
                if (r.silent || r.clipPath && !r.clipPath.contain(e, i)) return !1;
                r = r.parent;
            }
            return !0;
        }
        return !1;
    }
    var o = i(5), s = i(63), h = i(8);
    n.prototype.dispose = function() {};
    var l = [ "click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu" ], u = function(t, e, i, r) {
        h.call(this), this.storage = t, this.painter = e, this.painterRoot = r, i = i || new n(), 
        this.proxy = i, i.handler = this, this._hovered, this._lastTouchMoment, this._lastX, 
        this._lastY, s.call(this), o.each(l, function(t) {
            i.on && i.on(t, this[t], this);
        }, this);
    };
    u.prototype = {
        constructor: u,
        mousemove: function(t) {
            var e = t.zrX, i = t.zrY, r = this.findHover(e, i, null), n = this._hovered, a = this.proxy;
            this._hovered = r, a.setCursor && a.setCursor(r ? r.cursor : "default"), n && r !== n && n.__zr && this.dispatchToElement(n, "mouseout", t), 
            this.dispatchToElement(r, "mousemove", t), r && r !== n && this.dispatchToElement(r, "mouseover", t);
        },
        mouseout: function(t) {
            this.dispatchToElement(this._hovered, "mouseout", t);
            var e, i = t.toElement || t.relatedTarget;
            do {
                i = i && i.parentNode;
            } while (i && 9 != i.nodeType && !(e = i === this.painterRoot));
            !e && this.trigger("globalout", {
                event: t
            });
        },
        dispatch: function(t, e) {
            var i = this[t];
            i && i.call(this, e);
        },
        dispose: function() {
            this.proxy.dispose(), this.storage = this.proxy = this.painter = null;
        },
        dispatchToElement: function(t, e, i) {
            for (var n = "on" + e, a = r(e, t, i), o = t; o && (o[n] && (a.cancelBubble = o[n].call(o, a)), 
            o.trigger(e, a), o = o.parent, !a.cancelBubble); ) ;
            a.cancelBubble || (this.trigger(e, a), this.painter && this.painter.eachOtherLayer(function(t) {
                "function" == typeof t[n] && t[n].call(t, a), t.trigger && t.trigger(e, a);
            }));
        },
        findHover: function(t, e, i) {
            for (var r = this.storage.getDisplayList(), n = r.length - 1; n >= 0; n--) if (!r[n].silent && r[n] !== i && !r[n].ignore && a(r[n], t, e)) return r[n];
        }
    }, o.each([ "click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu" ], function(t) {
        u.prototype[t] = function(e) {
            var i = this.findHover(e.zrX, e.zrY, null);
            if ("mousedown" === t) this._downel = i, this._upel = i; else if ("mosueup" === t) this._upel = i; else if ("click" === t && this._downel !== this._upel) return;
            this.dispatchToElement(i, t, e);
        };
    }), o.mixin(u, h), o.mixin(u, s), t.exports = u;
}, function(t, e) {
    function i() {
        this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), 
        this.on("mouseup", this._dragEnd, this), this.on("globalout", this._dragEnd, this);
    }
    i.prototype = {
        constructor: i,
        _dragStart: function(t) {
            var e = t.target;
            e && e.draggable && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, 
            this._y = t.offsetY, this.dispatchToElement(e, "dragstart", t.event));
        },
        _drag: function(t) {
            var e = this._draggingTarget;
            if (e) {
                var i = t.offsetX, r = t.offsetY, n = i - this._x, a = r - this._y;
                this._x = i, this._y = r, e.drift(n, a, t), this.dispatchToElement(e, "drag", t.event);
                var o = this.findHover(i, r, e), s = this._dropTarget;
                this._dropTarget = o, e !== o && (s && o !== s && this.dispatchToElement(s, "dragleave", t.event), 
                o && o !== s && this.dispatchToElement(o, "dragenter", t.event));
            }
        },
        _dragEnd: function(t) {
            var e = this._draggingTarget;
            e && (e.dragging = !1), this.dispatchToElement(e, "dragend", t.event), this._dropTarget && this.dispatchToElement(this._dropTarget, "drop", t.event), 
            this._draggingTarget = null, this._dropTarget = null;
        }
    }, t.exports = i;
}, function(t, e, i) {
    var r = i(5), n = i(4), a = (i(65), function() {
        this._elements = {}, this._roots = [], this._displayList = [], this._displayListLen = 0;
    });
    a.prototype = {
        constructor: a,
        traverse: function(t, e) {
            for (var i = 0; i < this._roots.length; i++) this._roots[i].traverse(t, e);
        },
        getDisplayList: function(t, e) {
            return e = e || !1, t && this.updateDisplayList(e), this._displayList;
        },
        updateDisplayList: function(t) {
            this._displayListLen = 0;
            for (var e = this._roots, i = this._displayList, r = 0, n = e.length; r < n; r++) this._updateAndAddDisplayable(e[r], null, t);
            i.length = this._displayListLen;
        },
        _updateAndAddDisplayable: function(t, e, i) {
            if (!t.ignore || i) {
                t.beforeUpdate(), t.__dirty && t.update(), t.afterUpdate();
                var r = t.clipPath;
                if (r) {
                    e = e ? e.slice() : [];
                    for (var n = r, a = t; n; ) n.parent = a, n.updateTransform(), e.push(n), a = n, 
                    n = n.clipPath;
                }
                if (t.isGroup) {
                    for (var o = t._children, s = 0; s < o.length; s++) {
                        var h = o[s];
                        t.__dirty && (h.__dirty = !0), this._updateAndAddDisplayable(h, e, i);
                    }
                    t.__dirty = !1;
                } else t.__clipPaths = e, this._displayList[this._displayListLen++] = t;
            }
        },
        addRoot: function(t) {
            this._elements[t.id] || (t instanceof n && t.addChildrenToStorage(this), this.addToMap(t), 
            this._roots.push(t));
        },
        delRoot: function(t) {
            if (null == t) {
                for (i = 0; i < this._roots.length; i++) {
                    var e = this._roots[i];
                    e instanceof n && e.delChildrenFromStorage(this);
                }
                return this._elements = {}, this._roots = [], this._displayList = [], void (this._displayListLen = 0);
            }
            if (t instanceof Array) for (var i = 0, a = t.length; i < a; i++) this.delRoot(t[i]); else {
                var o;
                o = "string" == typeof t ? this._elements[t] : t;
                var s = r.indexOf(this._roots, o);
                s >= 0 && (this.delFromMap(o.id), this._roots.splice(s, 1), o instanceof n && o.delChildrenFromStorage(this));
            }
        },
        addToMap: function(t) {
            return t instanceof n && (t.__storage = this), t.dirty(!1), this._elements[t.id] = t, 
            this;
        },
        get: function(t) {
            return this._elements[t];
        },
        delFromMap: function(t) {
            var e = this._elements, i = e[t];
            return i && (delete e[t], i instanceof n && (i.__storage = null)), this;
        },
        dispose: function() {
            this._elements = this._renderList = this._roots = null;
        },
        displayableSortFunc: function(t, e) {
            return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel;
        }
    }, t.exports = a;
}, function(t, e) {
    function i(t) {
        for (var e = 0; t >= l; ) e |= 1 & t, t >>= 1;
        return t + e;
    }
    function r(t, e, i, r) {
        var a = e + 1;
        if (a === i) return 1;
        if (r(t[a++], t[e]) < 0) {
            for (;a < i && r(t[a], t[a - 1]) < 0; ) a++;
            n(t, e, a);
        } else for (;a < i && r(t[a], t[a - 1]) >= 0; ) a++;
        return a - e;
    }
    function n(t, e, i) {
        for (i--; e < i; ) {
            var r = t[e];
            t[e++] = t[i], t[i--] = r;
        }
    }
    function a(t, e, i, r, n) {
        for (r === e && r++; r < i; r++) {
            for (var a, o = t[r], s = e, h = r; s < h; ) n(o, t[a = s + h >>> 1]) < 0 ? h = a : s = a + 1;
            var l = r - s;
            switch (l) {
              case 3:
                t[s + 3] = t[s + 2];

              case 2:
                t[s + 2] = t[s + 1];

              case 1:
                t[s + 1] = t[s];
                break;

              default:
                for (;l > 0; ) t[s + l] = t[s + l - 1], l--;
            }
            t[s] = o;
        }
    }
    function o(t, e, i, r, n, a) {
        var o = 0, s = 0, h = 1;
        if (a(t, e[i + n]) > 0) {
            for (s = r - n; h < s && a(t, e[i + n + h]) > 0; ) o = h, (h = 1 + (h << 1)) <= 0 && (h = s);
            h > s && (h = s), o += n, h += n;
        } else {
            for (s = n + 1; h < s && a(t, e[i + n - h]) <= 0; ) o = h, (h = 1 + (h << 1)) <= 0 && (h = s);
            h > s && (h = s);
            var l = o;
            o = n - h, h = n - l;
        }
        for (o++; o < h; ) {
            var u = o + (h - o >>> 1);
            a(t, e[i + u]) > 0 ? o = u + 1 : h = u;
        }
        return h;
    }
    function s(t, e, i, r, n, a) {
        var o = 0, s = 0, h = 1;
        if (a(t, e[i + n]) < 0) {
            for (s = n + 1; h < s && a(t, e[i + n - h]) < 0; ) o = h, (h = 1 + (h << 1)) <= 0 && (h = s);
            h > s && (h = s);
            var l = o;
            o = n - h, h = n - l;
        } else {
            for (s = r - n; h < s && a(t, e[i + n + h]) >= 0; ) o = h, (h = 1 + (h << 1)) <= 0 && (h = s);
            h > s && (h = s), o += n, h += n;
        }
        for (o++; o < h; ) {
            var u = o + (h - o >>> 1);
            a(t, e[i + u]) < 0 ? h = u : o = u + 1;
        }
        return h;
    }
    function h(t, e) {
        function i(i) {
            var l = a[i], u = h[i], c = a[i + 1], d = h[i + 1];
            h[i] = u + d, i === f - 3 && (a[i + 1] = a[i + 2], h[i + 1] = h[i + 2]), f--;
            var p = s(t[c], t, l, u, 0, e);
            l += p, 0 != (u -= p) && 0 !== (d = o(t[l + u - 1], t, c, d, d - 1, e)) && (u <= d ? r(l, u, c, d) : n(l, u, c, d));
        }
        function r(i, r, n, a) {
            var h = 0;
            for (h = 0; h < r; h++) d[h] = t[i + h];
            var c = 0, f = n, p = i;
            if (t[p++] = t[f++], 0 != --a) {
                if (1 === r) {
                    for (h = 0; h < a; h++) t[p + h] = t[f + h];
                    return void (t[p + a] = d[c]);
                }
                for (var v, g, y, _ = l; ;) {
                    v = 0, g = 0, y = !1;
                    do {
                        if (e(t[f], d[c]) < 0) {
                            if (t[p++] = t[f++], g++, v = 0, 0 == --a) {
                                y = !0;
                                break;
                            }
                        } else if (t[p++] = d[c++], v++, g = 0, 1 == --r) {
                            y = !0;
                            break;
                        }
                    } while ((v | g) < _);
                    if (y) break;
                    do {
                        if (0 !== (v = s(t[f], d, c, r, 0, e))) {
                            for (h = 0; h < v; h++) t[p + h] = d[c + h];
                            if (p += v, c += v, (r -= v) <= 1) {
                                y = !0;
                                break;
                            }
                        }
                        if (t[p++] = t[f++], 0 == --a) {
                            y = !0;
                            break;
                        }
                        if (0 !== (g = o(d[c], t, f, a, 0, e))) {
                            for (h = 0; h < g; h++) t[p + h] = t[f + h];
                            if (p += g, f += g, 0 === (a -= g)) {
                                y = !0;
                                break;
                            }
                        }
                        if (t[p++] = d[c++], 1 == --r) {
                            y = !0;
                            break;
                        }
                        _--;
                    } while (v >= u || g >= u);
                    if (y) break;
                    _ < 0 && (_ = 0), _ += 2;
                }
                if ((l = _) < 1 && (l = 1), 1 === r) {
                    for (h = 0; h < a; h++) t[p + h] = t[f + h];
                    t[p + a] = d[c];
                } else {
                    if (0 === r) throw new Error();
                    for (h = 0; h < r; h++) t[p + h] = d[c + h];
                }
            } else for (h = 0; h < r; h++) t[p + h] = d[c + h];
        }
        function n(i, r, n, a) {
            var h = 0;
            for (h = 0; h < a; h++) d[h] = t[n + h];
            var c = i + r - 1, f = a - 1, p = n + a - 1, v = 0, g = 0;
            if (t[p--] = t[c--], 0 != --r) {
                if (1 === a) {
                    for (g = (p -= r) + 1, v = (c -= r) + 1, h = r - 1; h >= 0; h--) t[g + h] = t[v + h];
                    return void (t[p] = d[f]);
                }
                for (var y = l; ;) {
                    var _ = 0, m = 0, x = !1;
                    do {
                        if (e(d[f], t[c]) < 0) {
                            if (t[p--] = t[c--], _++, m = 0, 0 == --r) {
                                x = !0;
                                break;
                            }
                        } else if (t[p--] = d[f--], m++, _ = 0, 1 == --a) {
                            x = !0;
                            break;
                        }
                    } while ((_ | m) < y);
                    if (x) break;
                    do {
                        if (0 != (_ = r - s(d[f], t, i, r, r - 1, e))) {
                            for (r -= _, g = (p -= _) + 1, v = (c -= _) + 1, h = _ - 1; h >= 0; h--) t[g + h] = t[v + h];
                            if (0 === r) {
                                x = !0;
                                break;
                            }
                        }
                        if (t[p--] = d[f--], 1 == --a) {
                            x = !0;
                            break;
                        }
                        if (0 != (m = a - o(t[c], d, 0, a, a - 1, e))) {
                            for (a -= m, g = (p -= m) + 1, v = (f -= m) + 1, h = 0; h < m; h++) t[g + h] = d[v + h];
                            if (a <= 1) {
                                x = !0;
                                break;
                            }
                        }
                        if (t[p--] = t[c--], 0 == --r) {
                            x = !0;
                            break;
                        }
                        y--;
                    } while (_ >= u || m >= u);
                    if (x) break;
                    y < 0 && (y = 0), y += 2;
                }
                if ((l = y) < 1 && (l = 1), 1 === a) {
                    for (g = (p -= r) + 1, v = (c -= r) + 1, h = r - 1; h >= 0; h--) t[g + h] = t[v + h];
                    t[p] = d[f];
                } else {
                    if (0 === a) throw new Error();
                    for (v = p - (a - 1), h = 0; h < a; h++) t[v + h] = d[h];
                }
            } else for (v = p - (a - 1), h = 0; h < a; h++) t[v + h] = d[h];
        }
        var a, h, l = u, c = 0, f = 0;
        c = t.length;
        var d = [];
        a = [], h = [], this.mergeRuns = function() {
            for (;f > 1; ) {
                var t = f - 2;
                if (t >= 1 && h[t - 1] <= h[t] + h[t + 1] || t >= 2 && h[t - 2] <= h[t] + h[t - 1]) h[t - 1] < h[t + 1] && t--; else if (h[t] > h[t + 1]) break;
                i(t);
            }
        }, this.forceMergeRuns = function() {
            for (;f > 1; ) {
                var t = f - 2;
                t > 0 && h[t - 1] < h[t + 1] && t--, i(t);
            }
        }, this.pushRun = function(t, e) {
            a[f] = t, h[f] = e, f += 1;
        };
    }
    var l = 32, u = 7;
    t.exports = function(t, e, n, o) {
        n || (n = 0), o || (o = t.length);
        var s = o - n;
        if (!(s < 2)) {
            var u = 0;
            if (s < l) return u = r(t, n, o, e), void a(t, n, o, n + u, e);
            var c = new h(t, e), f = i(s);
            do {
                if ((u = r(t, n, o, e)) < f) {
                    var d = s;
                    d > f && (d = f), a(t, n, n + d, n + u, e), u = d;
                }
                c.pushRun(n, u), c.mergeRuns(), s -= u, n += u;
            } while (0 !== s);
            c.forceMergeRuns();
        }
    };
}, function(t, e, i) {
    function r(t, e, i) {
        return u.copy(t.getBoundingRect()), t.transform && u.applyTransform(t.transform), 
        c.width = e, c.height = i, !u.intersect(c);
    }
    function n(t, e) {
        if (t == e) return !1;
        if (!t || !e || t.length !== e.length) return !0;
        for (var i = 0; i < t.length; i++) if (t[i] !== e[i]) return !0;
    }
    function a(t, e) {}
    var o = i(17), s = i(5), h = (i(16), i(18)), l = (i(65), i(67)), u = new h(0, 0, 0, 0), c = new h(0, 0, 0, 0), f = function(t, e, i) {
        this._opts = i = s.extend({}, i || {}), this.dpr = i.devicePixelRatio || o.devicePixelRatio, 
        this.root = t, this.storage = e;
        var r = this._zlevelList = [], n = this._layers = {};
        this._layerConfig = {};
        var a = t.width, h = t.height;
        this._width = a, this._height = h;
        var u = new l(t, this, 1);
        u.initContext(), n[0] = u, r.push(0);
    };
    f.prototype = {
        constructor: f,
        getViewportRoot: function() {
            return this._layers[0].dom;
        },
        refresh: function(t) {
            var e = this.storage.getDisplayList(!0);
            return this._paintList(e, t), this;
        },
        _paintList: function(t, e) {
            null == e && (e = !1), this._doPaintList(t, e);
        },
        _doPaintList: function(t, e) {
            for (var i, r, n, a, o = (this._width, this._height, 0), s = t.length; o < s; o++) {
                var h = t[o], l = h.__frame;
                0 !== r && (n && n.restore(), a = {}, r = 0, i = this.getLayer(r), (n = i.ctx).save(), 
                i.__unusedCount = 0, (i.__dirty || e) && i.clear()), (i.__dirty || e) && (l >= 0 || this._doPaintEl(h, i, e, a), 
                h.__dirty = !1);
            }
            n && n.restore();
        },
        _doPaintEl: function(t, e, i, o) {
            var s = e.ctx, h = t.transform;
            if ((e.__dirty || i) && !t.invisible && 0 !== t.style.opacity && (!h || h[0] || h[3]) && (!t.culling || !r(t, this._width, this._height))) {
                var l = t.__clipPaths;
                (o.prevClipLayer !== e || n(l, o.prevElClipPaths)) && (o.prevElClipPaths && (o.prevClipLayer.ctx.restore(), 
                o.prevClipLayer = o.prevElClipPaths = null, o.prevEl = null), l && (s.save(), a(), 
                o.prevClipLayer = e, o.prevElClipPaths = l)), t.beforeBrush && t.beforeBrush(s), 
                t.brush(s, o.prevEl || null), o.prevEl = t, s.draw(!0), t.afterBrush && t.afterBrush(s);
            }
        },
        getLayer: function(t) {
            return this._layers[0];
        },
        eachLayer: function(t, e) {
            var i, r, n = this._zlevelList;
            for (r = 0; r < n.length; r++) i = n[r], t.call(e, this._layers[i], i);
        },
        eachBuildinLayer: function(t, e) {
            var i, r, n, a = this._zlevelList;
            for (n = 0; n < a.length; n++) r = a[n], (i = this._layers[r]).isBuildin && t.call(e, i, r);
        },
        eachOtherLayer: function(t, e) {
            var i, r, n, a = this._zlevelList;
            for (n = 0; n < a.length; n++) r = a[n], (i = this._layers[r]).isBuildin || t.call(e, i, r);
        },
        getLayers: function() {
            return this._layers;
        },
        clear: function() {
            return this.eachBuildinLayer(this._clearLayer), this;
        },
        _clearLayer: function(t) {
            t.clear();
        },
        configLayer: function(t, e) {
            if (e) {
                var i = this._layerConfig;
                i[t] ? s.merge(i[t], e, !0) : i[t] = e;
                var r = this._layers[t];
                r && s.merge(r, i[t], !0);
            }
        },
        dispose: function() {
            this.root = this.storage = this._domRoot = this._layers = null;
        },
        getWidth: function() {
            return this._width;
        },
        getHeight: function() {
            return this._height;
        }
    }, t.exports = f;
}, function(t, e, i) {
    var r = (i(5), i(17), i(22)), n = i(33), a = (i(16), function(t, e, i) {
        this.id = t.id, this.dom = t, this.ctxBack = null, this.painter = e, this.config = null, 
        this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.dpr = i;
    });
    a.prototype = {
        constructor: a,
        elCount: 0,
        __dirty: !0,
        initContext: function() {
            this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
        },
        clear: function(t) {
            var e = this.dom, i = this.ctx, a = e.width, o = e.height, s = this.clearColor;
            if (this.lastFrameAlpha, this.dpr, i.clearRect(0, 0, a, o), s) {
                var h;
                s.colorStops ? (h = s.__canvasGradient || r.getGradient(i, s, {
                    x: 0,
                    y: 0,
                    width: a,
                    height: o
                }), s.__canvasGradient = h) : s.image && (h = n.prototype.getCanvasPattern.call(s, i)), 
                i.save(), i.setFillStyle(h || s), i.fillRect(0, 0, a, o), i.restore();
            }
        }
    }, t.exports = a;
} ]));