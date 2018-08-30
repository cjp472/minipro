Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(r, s, u) {
    return (0, e.get)(t.API_PRODUCT + "/mobile/playlist/album/new?albumId=" + r + "&trackId=" + s + "&asc=" + u.toString());
};

var e = require("../request"), t = require("../../constants/constants");