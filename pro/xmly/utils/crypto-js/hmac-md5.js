var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(o, t, r) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = t(require("./core"), require("./md5"), require("./hmac")) : "function" == typeof define && define.amd ? define([ "./core", "./md5", "./hmac" ], t) : t(o.CryptoJS);
}(void 0, function(e) {
    return e.HmacMD5;
});