Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(s) {
    var r = s.encryptedData, a = s.iv, c = s.js_code;
    return (0, e.get)(t.API_PRODUCT + "/passport-sign-mobile/ws/access", {
        appid: t.APPID,
        encryptedData: r,
        iv: a,
        js_code: c
    });
};

var e = require("../request"), t = require("../../constants/constants");