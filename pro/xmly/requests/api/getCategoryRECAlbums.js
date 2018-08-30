Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../requestOpen");

exports.default = function(r) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
    return (0, e.get)("/albums/category_recommend_albums", {
        category_id: r,
        display_count: t
    });
};