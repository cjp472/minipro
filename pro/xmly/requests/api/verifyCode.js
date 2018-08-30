Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(c, i, s, p, a) {
    var u = "m_phone=" + c + "&nonce=" + i + "&smsCode=" + s, d = (0, t.RSAEncrypt)(u, o.publicKey);
    return p && a ? (0, e.post)(r + n, {
        code: d,
        checkCode: p,
        checkUUID: a,
        origin: "https://m.ximalaya.com",
        contentType: "application/x-www-form-urlencoded"
    }) : (0, e.post)(r + n, {
        code: d,
        origin: "https://m.ximalaya.com",
        contentType: "application/x-www-form-urlencoded"
    });
};

var e = require("../request"), o = require("../../constants/constants"), t = require("../../utils/util"), n = "/passport-sign-h5/v1/sign/combined/verifyCode", r = o.API_PRODUCT == o.API_DEV ? o.API_M_DEV : o.API_PRODUCT;