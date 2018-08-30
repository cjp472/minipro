function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

function r(t) {
    return "[object Array]" === Object.prototype.toString.call(t);
}

function n() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e = parseInt(t % 60) >= 10 ? parseInt(t % 60) : "0" + parseInt(t % 60), r = parseInt(t / 60 % 60) >= 10 ? parseInt(t / 60 % 60) : "0" + parseInt(t / 60 % 60), n = parseInt(t / 3600 % 24);
    return 0 != n ? n + ":" + r + ":" + e : r + ":" + e;
}

function o() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
    return t < 1e4 ? t : t >= 1e4 && t < 1e8 ? (t / 1e4).toFixed(1) + "万" : (t / 1e8).toFixed(1) + "亿";
}

var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, i = t(require("moment.min")), a = t(require("es6-promise.min")), c = t(require("./crypto-js/crypto-js")), f = t(require("./crypto-js/md5")), l = t(require("./crypto-js/enc-base64")), s = t(require("./crypto-js/hmac-sha1")), p = t(require("./jsencrypt/wxmp.jsencrypt"));

Object.defineProperty(Object, "assign", {
    enumerable: !1,
    configurable: !0,
    writable: !0,
    value: function(t) {
        if (void 0 === t || null === t) throw new TypeError("Cannot convert first argument to object");
        for (var e = Object(t), r = 1; r < arguments.length; r++) {
            var n = arguments[r];
            if (void 0 !== n && null !== n) {
                n = Object(n);
                for (var o = Object.keys(n), u = 0, i = o.length; u < i; u++) {
                    var a = o[u], c = Object.getOwnPropertyDescriptor(n, a);
                    void 0 !== c && c.enumerable && (e[a] = n[a]);
                }
            }
        }
        return e;
    }
}), Object.entries || (Object.entries = function(t) {
    for (var e = Object.keys(t), r = e.length, n = new Array(r); r--; ) n[r] = [ e[r], t[e[r]] ];
    return n;
}), module.exports = {
    moment: i.default,
    formatTime: function(t) {
        var r = t.getFullYear(), n = t.getMonth() + 1, o = t.getDate(), u = t.getHours(), i = t.getMinutes(), a = t.getSeconds();
        return [ r, n, o ].map(e).join("/") + " " + [ u, i, a ].map(e).join(":");
    },
    isFunction: function(t) {
        return "function" == typeof t;
    },
    isString: function(t) {
        return "string" == typeof t;
    },
    isUndefined: function(t) {
        return void 0 === t;
    },
    isNull: function(t) {
        return "object" === (void 0 === t ? "undefined" : u(t)) && !t;
    },
    isNumber: function(t) {
        return "number" == typeof t;
    },
    isBoolean: function(t) {
        return "boolean" == typeof t;
    },
    isObject: function(t) {
        return "object" === (void 0 === t ? "undefined" : u(t)) && t;
    },
    isArray: r,
    formatDuration: n,
    format: function(t, e) {
        var r = e.createdAt, o = e.duration, u = e.lastUpdateAt, a = e.updatedAt;
        return t.forEach(function(t) {
            t[r] = t[r] ? (0, i.default)(t[r]).fromNow() : t[r], t.calcDuration = n(t[o]), t[u] = t[u] ? (0, 
            i.default)(t[u]).fromNow() : t[u], t[a] = t[a] ? (0, i.default)(t[a]).fromNow() : t[a];
        }), t;
    },
    inherits: function(t, e) {
        if (void 0 === t || null === t) throw new TypeError('The constructor to "inherits" must not be null or undefined');
        if (void 0 === e || null === e) throw new TypeError('The super constructor to "inherits" must not be null or undefined');
        if (void 0 === e.prototype) throw new TypeError('The super constructor to "inherits" must have a prototype');
        t.super_ = e, Object.setPrototypeOf(t.prototype, e.prototype);
    },
    wrapFn: function(t, e, r) {
        var n = t[e] || function() {};
        t[e] = function() {
            n.call(t, arguments), r.call(t, arguments);
        };
    },
    promiseAll: function(t) {
        return a.default.all(t);
    },
    numToString: o,
    multNumToString: function(t, e) {
        return t.forEach(function(t) {
            e.forEach(function(e) {
                "playtimes" == e ? t.calcPlaytimes = o(t[e]) : "playsCounts" == e ? t.calcPlaytimes = o(t[e]) : t[e] = o(t[e]);
            });
        }), t;
    },
    jumpTo: function(t) {
        for (var e = t.url || "", r = (e.match(/.+\/(\w+)/i) || [ "index", "index" ])[1], n = getCurrentPages(), o = 0; n[o] && n[o].type !== r; ) o++;
        if (o < n.length - 2 && "albumDetail" !== r) {
            var u = n.length - 1 - o;
            wx.navigateBack({
                delta: u
            });
        } else o !== n.length - 1 ? n.length >= 5 ? wx.redirectTo({
            url: e
        }) : wx.navigateTo({
            url: e
        }) : wx.redirectTo({
            url: e
        });
    },
    generateRandom: function() {
        for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 32, e = "", r = 0; r < t; r += 1) e += "0123456789abcdefghijklmnopqrstuvwxyz"[Math.ceil(35 * Math.random())];
        return e;
    },
    calcuSig: function(t, e) {
        var r = [];
        Object.entries(t).sort().map(function(t) {
            return r.push(t[0] + "=" + t[1]);
        });
        var n = l.default.stringify(c.default.enc.Utf8.parse(r.join("&"))), o = (0, s.default)(n, e);
        return (0, f.default)(o).toString();
    },
    debounce: function(t) {
        var e, r, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500;
        return function() {
            var o = this, u = arguments;
            return e && clearTimeout(e), e = setTimeout(function() {
                r = t.apply(o, u);
            }, n), r;
        };
    },
    generateUUID: function() {
        var t = new Date().getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var r = (t + 16 * Math.random()) % 16 | 0;
            return t = Math.floor(t / 16), ("x" == e ? r : 7 & r | 8).toString(16);
        });
    },
    RSAEncrypt: function(t, e) {
        if (t) {
            var r = "-----BEGIN PUBLIC KEY-----" + e + "-----END PUBLIC KEY-----", n = new p.default.RSAKey(), o = (n = p.default.KEYUTIL.getKey(r)).encrypt(t);
            return o = p.default.hex2b64(o);
        }
        return t;
    },
    getCurrentPageUrl: function() {
        var t = getCurrentPages();
        return t[t.length - 1].route;
    },
    getCurrentPageUrlWithArgs: function() {
        var t = getCurrentPages(), e = t[t.length - 1], r = e.route, n = e.options, o = r + "?";
        for (var u in n) o += u + "=" + n[u] + "&";
        return o = o.substring(0, o.length - 1);
    },
    standardizeFields: function(t, e) {
        if (r(t) && r(e) && t.length == e.length) {
            var n = {};
            return t.forEach(function(t, r) {
                n[t] = e[r];
            }), n;
        }
        throw "paras must be array and length must be equal!";
    }
};