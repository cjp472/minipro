Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), d = require("../../constants/constants");

exports.default = function(r) {
    var t = r.categoryId, o = r.keywordId, s = void 0 === o ? 0 : o, u = r.pageId, a = void 0 === u ? 1 : u, c = r.pageSize, i = void 0 === c ? 20 : c, l = r.excludedOffset, v = void 0 === l ? 0 : l, g = r.excludedAlbumIds, n = void 0 === g ? "" : g;
    return (0, e.get)(d.M_PRODUCT + "/discovery-category/keyword/albums", {
        categoryId: t,
        keywordId: s,
        pageId: a,
        pageSize: i,
        excludedOffset: v,
        excludedAlbumIds: n
    });
};