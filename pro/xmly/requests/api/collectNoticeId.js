Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), t = require("../../constants/constants"), o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/md5")), n = function(o) {
    return (0, e.get)(t.M_PRODUCT + "/wechat/api/login/getSession", {
        code: o,
        littleProgramCode: t.littleProgramCode
    });
};

exports.default = function(e) {
    return new Promise(function(i, a) {
        var c = wx.getStorageSync("USER_INFO"), r = c.uid, u = void 0 === r ? 0 : r, d = c.token, s = void 0 === d ? "" : d, l = c.realUid, f = void 0 === l ? 0 : l;
        0 == u && (u = f), wx.login({
            success: function(c) {
                var r = c.code;
                n(r).then(function(n) {
                    var c = n.data, r = c + "xmly@2018!", d = {
                        "content-type": "application/json",
                        cookie: t.TOKEN_ID + "&_token=" + u + "&" + s + ";" + t.TOKEN_ID + "&_wechat_token=" + c + "&" + (0, 
                        o.default)(r) + ";"
                    };
                    wx.request({
                        url: t.M_PRODUCT + "/wechat/api/addWechatNoticeId",
                        data: {
                            noticeId: e
                        },
                        method: "POST",
                        header: d,
                        success: function(e) {
                            1 == e.data.ret ? i(e) : a(e);
                        },
                        fail: function(e) {
                            a(e);
                        }
                    });
                }).catch(function(e) {
                    console.log(e);
                });
            },
            fail: function(e) {
                a(e);
            }
        });
    });
};