Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(r) {
    return (0, e.post)(t.API_PRODUCT + "/feed/v1/feed/top/create", {
        albumId: r
    });
};

var e = require("../request"), t = require("../../constants/constants");