Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), t = require("../../constants/constants");

exports.default = function() {
    return (0, e.post)(t.M_PRODUCT + "/wechat/api/open/categories/list");
};