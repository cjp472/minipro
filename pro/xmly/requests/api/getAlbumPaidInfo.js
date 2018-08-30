Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(r) {
    return (0, e.get)(t.API_PRODUCT + "/mobile/album/paid/info", {
        albumId: r
    });
};

var e = require("../request"), t = require("../../constants/constants");