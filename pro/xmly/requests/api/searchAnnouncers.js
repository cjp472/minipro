Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), i = require("../../constants/constants");

exports.default = function(o) {
    var r = o.kw, t = o.condition, d = void 0 === t ? "relation" : t, s = o.page, c = void 0 === s ? 1 : s, v = o.rows, n = void 0 === v ? 20 : v, a = o.core, l = void 0 === a ? "user" : a, u = o.device, p = void 0 === u ? "iPhone" : u, h = o.spellchecker, k = void 0 === h || h, w = o.live, f = void 0 !== w && w, g = o.paidFilter, q = void 0 !== g && g;
    return (0, e.get)(i.SEARCH_PRODUCT + "/revision/search", {
        kw: r,
        condition: d,
        page: c,
        rows: n,
        core: l,
        device: p,
        spellchecker: k,
        live: f,
        paidFilter: q
    });
};