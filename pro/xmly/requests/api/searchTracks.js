Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), i = require("../../constants/constants");

exports.default = function(o) {
    var r = o.kw, t = o.condition, c = void 0 === t ? "relation" : t, d = o.page, s = void 0 === d ? 1 : d, v = o.rows, n = void 0 === v ? 20 : v, a = o.core, l = void 0 === a ? "track" : a, p = o.device, u = void 0 === p ? "iPhone" : p, k = o.spellchecker, h = void 0 === k || k, w = o.live, f = void 0 !== w && w, g = o.paidFilter, q = void 0 !== g && g;
    return (0, e.get)(i.SEARCH_PRODUCT + "/revision/search", {
        kw: r,
        condition: c,
        page: s,
        rows: n,
        core: l,
        device: u,
        spellchecker: h,
        live: f,
        paidFilter: q
    });
};