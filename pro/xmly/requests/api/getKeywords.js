Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request"), r = require("../../constants/constants");

exports.default = function(t) {
    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 9;
    return (0, e.get)(r.M_PRODUCT + "/discovery-category/keyword/all/" + +new Date(), {
        categoryId: t,
        gender: o
    });
};