Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../requests/request"), t = require("../../constants/constants");

exports.default = function() {
    return (0, e.get)(t.M_PRODUCT + "/wechat/api/assistance/getAlbumList");
};