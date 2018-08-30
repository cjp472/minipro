Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../requests/request"), t = require("../../constants/constants");

exports.default = function(r, s, u) {
    return (0, e.post)(t.M_PRODUCT + "/wechat/api/queryComments", {
        albumId: r,
        pageId: s,
        pageSize: u
    });
};