Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../requestOpen");

exports.default = function(t) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "album";
    arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    return (0, e.get)("/banners/category_banners", {
        category_id: t,
        content_type: r
    });
};