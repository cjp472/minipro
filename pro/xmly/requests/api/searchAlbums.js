Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), i = require("../../constants/constants");

exports.default = function(o) {
    var r = o.kw, t = o.condition, d = void 0 === t ? "relation" : t, c = o.page, s = void 0 === c ? 1 : c, v = o.rows, n = void 0 === v ? 20 : v, a = o.core, l = void 0 === a ? "album" : a, u = o.device, p = void 0 === u ? "iPhone" : u, h = o.spellchecker, k = void 0 === h || h, w = o.live, f = void 0 !== w && w, g = o.paidFilter, q = void 0 !== g && g;
    return (0, e.get)(i.SEARCH_PRODUCT + "/revision/search", {
        kw: r,
        condition: d,
        page: s,
        rows: n,
        core: l,
        device: p,
        spellchecker: k,
        live: f,
        paidFilter: q
    });
};