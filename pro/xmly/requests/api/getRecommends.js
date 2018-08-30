Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(r) {
    return (0, e.get)(t.API_PRODUCT + "/mobile/discovery/v1/focus/list", {
        type: "recommend",
        device: "wx_app",
        version: "6.0.0"
    });
};

var e = require("../request"), t = require("../../constants/constants");