Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
}, e = require("../request"), n = require("../../constants/constants"), o = n.API_TEST;

1 === n.TOKEN_ID && (o = n.API_M_DEV);

var a = "ios" == wx.getSystemInfoSync().platform || "devtools" == wx.getSystemInfoSync().platform, r = function(t) {
    return console.log("payParmas", t), a ? "isIOS" : new Promise(function(e, n) {
        var o = t.data.data.paymentResult, a = o.timestamp, r = o.noncestr, i = o.packageInfo, c = o.signType, s = o.paySign;
        console.log(a), wx.requestPayment({
            timeStamp: a,
            nonceStr: r,
            package: i,
            signType: c,
            paySign: s,
            success: function(t) {
                e(t);
            },
            fail: function(t) {
                n(t);
            }
        });
    });
}, i = function(t) {
    return (0, e.get)(o + "/wechat/api/login/getSession", {
        code: t,
        littleProgramCode: n.littleProgramCode
    });
}, c = function(e, a) {
    return new Promise(function(r, i) {
        var c = wx.getStorageSync("USER_INFO"), s = c.uid, u = void 0 === s ? 0 : s, l = c.token, f = void 0 === l ? "" : l, d = c.realUid, g = void 0 === d ? 0 : d;
        0 == u && (u = g);
        var p = {
            "content-type": "application/json",
            cookie: n.TOKEN_ID + "&_token=" + u + "&" + f + ";" + n.TOKEN_ID + "&_pay_weixin_token=" + e + ";domain=.m.ximalaya.com;"
        };
        wx.request({
            url: o + "/wechat/api/order/placeOrder",
            data: t({}, a, {
                littleProgramCode: n.littleProgramCode
            }),
            method: "POST",
            header: p,
            success: function(t) {
                t.data.data && t.data.data.paymentResult ? r(t) : i(t.data.msg);
            },
            fail: function(t) {
                i(t);
            }
        });
    });
};

exports.default = function(t) {
    return new Promise(function(e, n) {
        wx.getStorageSync("USER_INFO").isLogin || n("未登录"), wx.login({
            success: function(o) {
                var a = o.code;
                i(a).then(function(e) {
                    return c(e.data, t);
                }).then(function(t) {
                    return r(t);
                }).then(function(t) {
                    return e(t);
                }).catch(function(t) {
                    n(t);
                });
            },
            fail: function(t) {
                n(t);
            }
        });
    });
};