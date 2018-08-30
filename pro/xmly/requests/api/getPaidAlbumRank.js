Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), t = require("../../constants/constants");

exports.default = function(a) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 20;
    return (0, e.post)(t.M_PRODUCT + "/wechat/api/open/openPay/paidAlbumsByTag", {
        tagName: a,
        page: r,
        count: n
    });
};