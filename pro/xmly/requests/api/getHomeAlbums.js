Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), t = require("../../constants/constants");

exports.default = function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3, o = wx.getStorageSync("DEVICE_ID");
    return (0, e.post)(t.M_PRODUCT + "/wechat/api/open/album/discoveryRecommendAlbums", {
        deviceId: o || "",
        count: r
    });
};