Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.post = exports.get = void 0;

var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
}, t = require("../constants/constants"), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("././api/postImplicitAccessToken")), o = require("../utils/util"), i = wx.getStorageSync("DEVICE_ID"), a = function() {
    return new Promise(function(a, r) {
        var c = wx.getStorageSync("USER_INFO").isLogin, s = void 0;
        if ((s = c ? wx.getStorageSync("implicitToken") : wx.getStorageSync("token")) && +new Date() < s.deadline) a(s); else {
            if (c) return (0, n.default)().then(function(e) {
                var t = e;
                t.deadline = +new Date() + 1e3 * t.expires_in, wx.removeStorageSync("implicitToken"), 
                wx.setStorageSync("implicitToken", t), a(t);
            });
            var u = {
                client_id: t.APP_KEY,
                device_id: i,
                nonce: (0, o.generateRandom)(),
                grant_type: "client_credentials",
                timestamp: +new Date()
            }, d = (0, o.calcuSig)(u, t.APP_SECRET);
            wx.request({
                url: "https://api.ximalaya.com/oauth2/secure_access_token",
                method: "POST",
                data: e({}, u, {
                    sig: d
                }),
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(e) {
                    var t = e.data;
                    t.deadline = +new Date() + 1e3 * t.expires_in, wx.setStorageSync("token", t), a(e.data);
                },
                fail: function(e) {
                    console.log(e), r(e);
                }
            });
        }
    });
}, r = function(n) {
    return function(r) {
        var c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, s = arguments[2];
        return a().then(function(a) {
            var u = {
                app_key: t.APP_KEY,
                device_id: i,
                client_os_type: 3,
                access_token: a.access_token
            }, d = (0, o.calcuSig)(e({}, u, c), t.APP_SECRET);
            return new Promise(function(i, a) {
                var l = wx.getStorageSync("USER_INFO"), p = l.uid, _ = void 0 === p ? 0 : p, g = l.token, S = void 0 === g ? "" : g, f = l.realUid, w = void 0 === f ? 0 : f;
                0 == _ && (_ = w), wx.request({
                    url: t.OPEN_API_BASE + r,
                    data: e({}, u, c, {
                        sig: d
                    }),
                    method: n,
                    header: {
                        "content-type": "POST" == n ? "application/x-www-form-urlencoded" : "application/json",
                        cookie: t.TOKEN_ID + "&_token=" + _ + "&" + S.access_token
                    },
                    success: function(e) {
                        200 === e.statusCode ? i(e.data) : (206 === e.data.error_no && wx.removeStorage({
                            key: "token"
                        }), a(e.data));
                    },
                    fail: function(e) {
                        console.log(e), a(e);
                    },
                    complete: function() {
                        (0, o.isFunction)(s) && s();
                    }
                });
            });
        });
    };
};

exports.get = r("GET"), exports.post = r("POST");