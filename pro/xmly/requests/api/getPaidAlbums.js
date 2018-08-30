Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../requests/requestOpen");

exports.default = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "热卖新品";
    return (0, e.get)("/open_pay/paid_albums_by_tag", {
        tag_name: t,
        count: 3
    });
};