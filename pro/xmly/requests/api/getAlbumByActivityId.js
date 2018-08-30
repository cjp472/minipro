Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), t = require("../../constants/constants");

exports.default = function(r) {
    return (0, e.get)(t.M_PRODUCT + "/wechat/api/assistance/getAlbumByActivityId", {
        activityId: r
    });
};