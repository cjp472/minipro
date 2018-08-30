Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../request"), e = require("../../constants/constants");

exports.default = function(s) {
    var r = s.activityId;
    return (0, t.get)(e.M_PRODUCT + "/wechat/api/assistance/assist", {
        activityId: r
    });
};