Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), t = require("../../constants/constants");

exports.default = function(a) {
    var r = a.id, o = a.headImage, s = a.nickName, c = a.code, d = void 0 === c ? 1 : c;
    return (0, e.post)(t.M_PRODUCT + "/wechat/api/updateWechatUserInfo", {
        id: r,
        headImage: o,
        nickName: s,
        code: d
    });
};