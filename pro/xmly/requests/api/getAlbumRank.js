Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../requestOpen");

exports.default = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, r = arguments[1], n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 20;
    return (0, e.get)("/v2/ranks/albums", {
        rank_list_id: r,
        page: t,
        count: n
    });
};