Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), t = require("../../constants/constants");

exports.default = function(r) {
    var o = r.code, s = r.littleProgramCode, a = void 0 === s ? "pay" : s;
    return (0, e.get)(t.M_PRODUCT + "/wechat/api/login/getSession", {
        code: o,
        littleProgramCode: a
    });
};