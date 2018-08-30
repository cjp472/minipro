Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), t = require("../../constants/constants");

exports.default = function(r, s) {
    var a = wx.getStorageSync("DEVICE_ID");
    return (0, e.post)(t.M_PRODUCT + "/wechat/api/open/subscribe/addOrDelete", {
        deviceId: a,
        operationType: r,
        albumId: s
    });
};