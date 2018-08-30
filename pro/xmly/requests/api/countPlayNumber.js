Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(n) {
    return new e.default(function(e, o) {
        var r = wx.getStorageSync("USER_INFO"), u = r.uid, i = void 0 === u ? 0 : u, a = r.token, c = void 0 === a ? "" : a, d = r.realUid, s = void 0 === d ? 0 : d;
        0 == i && (i = s), wx.request({
            url: t.API_PRODUCT + "/nyx/v1/track/count/wxapp",
            data: n,
            header: {
                "content-type": "application/x-www-form-urlencoded",
                cookie: t.TOKEN_ID + "&_token=" + i + "&" + c
            },
            method: "POST",
            success: function(t) {
                e(t.data);
            },
            fail: function(e) {
                o(e);
            }
        });
    });
};

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/es6-promise.min")), t = require("../../constants/constants");