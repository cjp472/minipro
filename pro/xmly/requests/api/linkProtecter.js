Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(n) {
    return new e.default(function(e, o) {
        var r = wx.getStorageSync("USER_INFO"), i = r.uid, u = void 0 === i ? 0 : i, a = r.token, s = void 0 === a ? "" : a, c = r.realUid, d = void 0 === c ? 0 : c;
        0 == u && (u = d), wx.request({
            url: t.API_PRODUCT + "/nyx/v1/track/statistic/wxapp",
            data: n,
            header: {
                "content-type": "application/x-www-form-urlencoded",
                cookie: t.TOKEN_ID + "&_token=" + u + "&" + s
            },
            method: "GET",
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