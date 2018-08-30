Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), t = require("../../constants/constants");

exports.default = function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20;
    return (0, e.post)(t.M_PRODUCT + "/wechat/api/open/subscribe/getAlbumsByUid", {
        page: r,
        count: s
    });
};