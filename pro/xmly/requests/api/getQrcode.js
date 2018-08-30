Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), t = require("../../constants/constants");

exports.default = function(r) {
    r.littleProgramCode;
    var a = r.page, o = r.scene;
    return (0, e.post)(t.M_PRODUCT + "/wechat/api/login/generateQRCode", {
        littleProgramCode: "pay",
        page: a,
        scene: o
    });
};