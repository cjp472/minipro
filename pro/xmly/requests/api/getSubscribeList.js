Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(r) {
    r.pageId, r.pageSize;
    return (0, e.get)(t.API_PRODUCT + "/v1/subscribe/list", {
        pageId: 1,
        pageSize: 15
    });
};

var e = require("../request"), t = require("../../constants/constants");