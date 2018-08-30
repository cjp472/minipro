Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), t = require("../../constants/constants");

exports.default = function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 8;
    return (0, e.get)(t.SEARCH_PRODUCT + "/revision/hotSearchKey", {
        size: r
    });
};