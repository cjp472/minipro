Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../requestOpen");

exports.default = function(r, t) {
    var u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 20;
    return (0, e.get)("/announcers/albums", {
        aid: r,
        page: t,
        count: u
    });
};