Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), t = require("../../constants/constants");

exports.default = function(s) {
    var r = s.activityId;
    return (0, e.get)(t.M_PRODUCT + "/wechat/api/assistance/getAssistedInfo", {
        activityId: r
    });
};