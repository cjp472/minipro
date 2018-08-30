Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.del = exports.put = exports.post = exports.get = exports.request = void 0;

var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
    return e;
}, t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/es6-promise.min")), o = require("../utils/util"), r = require("../constants/constants"), n = exports.request = function() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "GET";
    return function(i) {
        var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, u = arguments[2];
        return new t.default(function(t, p) {
            var a = wx.getStorageSync("USER_INFO"), c = a.uid, l = void 0 === c ? 0 : c, d = a.token, v = void 0 === d ? "" : d, f = a.realUid, x = void 0 === f ? 0 : f, g = s.contentType ? s.contentType : "application/json", y = s.origin ? s.origin : "";
            0 == l && (l = x);
            var T = {};
            T = y ? {
                origin: y,
                "content-type": g
            } : {
                "content-type": g
            }, v && (T = e({}, T, {
                cookie: r.TOKEN_ID + "&_token=" + l + "&" + v
            })), wx.request({
                url: i,
                data: s,
                method: n,
                header: T,
                success: function(e) {
                    t(e.data);
                },
                fail: function(e) {
                    p(e);
                },
                complete: function() {
                    (0, o.isFunction)(u) && u();
                }
            });
        });
    };
};

exports.get = n("GET"), exports.post = n("POST"), exports.put = n("PUT"), exports.del = n("DELETE");