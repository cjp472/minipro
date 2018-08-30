Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(t, u) {
    var a = t.albumId, s = (t.pageSize, t.source);
    t.trackId, t.newTrackCount;
    return (0, e.get)(r.API_PRODUCT + "/mobile/v1/album", {
        albumId: a,
        pageSize: 20,
        source: s
    }, u);
};

var e = require("../request"), r = require("../../constants/constants");