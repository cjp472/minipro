Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(r) {
    var a = r.albumId, s = r.pageId, i = r.pageSize, u = void 0 === i ? 20 : i, o = r.isAsc, d = void 0 === o || o;
    return (0, e.get)(t.API_PRODUCT + "/mobile/v1/album/track", {
        albumId: a,
        pageId: s,
        pageSize: u,
        isAsc: d
    });
};

var e = require("../request"), t = require("../../constants/constants");