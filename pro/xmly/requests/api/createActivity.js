Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), t = require("../../constants/constants");

exports.default = function(i) {
    var r = i.albumId, s = i.isOrigin, a = i.noticeId;
    return (0, e.get)(t.M_PRODUCT + "/wechat/api/assistance/createActivity", {
        albumId: r,
        isOrigin: s,
        noticeId: a
    });
};