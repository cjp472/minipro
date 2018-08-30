Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(c, i, s, p) {
    var a = "m_phone=" + c + "&nonce=" + i, u = (0, o.RSAEncrypt)(a, t.publicKey);
    return s && p ? (0, e.post)(r + n, {
        code: u,
        checkCode: s,
        checkUUID: p,
        origin: "https://m.ximalaya.com",
        contentType: "application/x-www-form-urlencoded"
    }) : (0, e.post)(r + n, {
        code: u,
        origin: "https://m.ximalaya.com",
        contentType: "application/x-www-form-urlencoded"
    });
};

var e = require("../request"), t = require("../../constants/constants"), o = require("../../utils/util"), n = "/passport-sign-h5/v1/sign/combined/getVerifyCode", r = t.API_PRODUCT == t.API_DEV ? t.API_M_DEV : t.API_PRODUCT;