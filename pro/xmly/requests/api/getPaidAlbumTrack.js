Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(t) {
    var a = t.albumId, o = t.sort, s = void 0 === o ? "asc" : o, u = t.page, n = void 0 === u ? 1 : u, i = t.count, c = void 0 === i ? 20 : i, d = t.realCategory, p = void 0 !== d && d;
    return (0, e.post)(r.M_PRODUCT + "/wechat/api/open/openPay/browsePaidAlbumTracks", {
        albumId: parseInt(a, 10),
        sort: s,
        page: n,
        count: c,
        realCategory: p
    });
};

var e = require("../request"), r = require("../../constants/constants");