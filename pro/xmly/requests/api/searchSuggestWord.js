Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), t = require("../../constants/constants");

exports.default = function(r) {
    return (0, e.get)(t.SEARCH_SUGGEST_PRODUCT + "/suggest", {
        kw: r
    });
};