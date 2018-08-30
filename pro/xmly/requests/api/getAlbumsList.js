Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../requestOpen");

exports.default = function(t) {
    var a = t.category_id, i = t.tag_name, o = void 0 === i ? " " : i, r = t.calc_dimension, n = void 0 === r ? 1 : r, c = t.page, d = void 0 === c ? 1 : c, u = t.count, s = void 0 === u ? 20 : u;
    return (0, e.get)("/v2/albums/list", {
        category_id: a,
        tag_name: o,
        calc_dimension: n,
        page: d,
        count: s
    });
};