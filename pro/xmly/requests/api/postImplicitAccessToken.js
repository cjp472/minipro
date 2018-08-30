Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
}, t = require("../request"), n = require("../../constants/constants"), o = require("../../utils/util"), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../requests/api/wechatLogin")), s = function(e) {
    wx.setStorage({
        key: "USER_INFO",
        data: Object.assign({}, e, {
            isLogin: !0
        })
    });
}, i = wx.getStorageSync("DEVICE_ID");

exports.default = function a() {
    var c = wx.getStorageSync("USER_INFO"), u = c.uid, _ = c.token;
    if (c.isLogin) {
        var d = {
            client_id: n.APP_KEY,
            device_id: i,
            nonce: (0, o.generateRandom)(),
            response_type: "token",
            client_os_type: 3,
            redirect_uri: n.OPEN_API_BASE,
            timestamp: +new Date(),
            need_normal_response: !0,
            sso_code: u + "&" + _,
            contentType: "application/x-www-form-urlencoded"
        };
        console.log("sso_code", d.sso_code);
        var l = (0, o.calcuSig)(e({}, d), n.APP_SECRET);
        return (0, t.post)(n.OPEN_API_BASE + "/oauth2/authorize", e({}, d, {
            sig: l
        }));
    }
    wx.login({
        success: function(e) {
            wx.getUserInfo({
                success: function(t) {
                    var n = t.encryptedData, o = t.iv;
                    (0, r.default)({
                        js_code: e.code,
                        encryptedData: n,
                        iv: o
                    }).then(function(e) {
                        0 == e.ret && s(e), a();
                    });
                },
                fail: function(e) {
                    wx.setStorage({
                        key: "USER_INFO",
                        data: {
                            isLogin: !1
                        }
                    });
                }
            });
        }
    });
};