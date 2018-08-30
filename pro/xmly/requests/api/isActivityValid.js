Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../request"), e = require("../../constants/constants");

exports.default = function(a) {
    var i = a.activityId, r = a.albumId;
    return (0, t.get)(e.M_PRODUCT + "/wechat/api/assistance/isActivityValid?" + (i ? "activityId=" + i : "albumId=" + r));
};