Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(r) {
    return new e.default(function(e, u) {
        var n = wx.getStorageSync("USER_INFO"), o = n.uid, i = void 0 === o ? 0 : o, s = n.token, a = void 0 === s ? "" : s, c = n.realUid, d = void 0 === c ? 0 : c;
        0 == i && (i = d), wx.request({
            url: t.API_PRODUCT + "/subscribe/v1/subscribe/create",
            data: {
                albumId: r
            },
            header: {
                "content-type": "application/x-www-form-urlencoded",
                cookie: t.TOKEN_ID + "&_token=" + i + "&" + a
            },
            method: "POST",
            success: function(t) {
                e(t.data);
            },
            fail: function(e) {
                u(e);
            }
        });
    });
};

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/es6-promise.min")), t = (require("../request"), require("../../constants/constants"));