Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../requestOpen");

exports.default = function(t) {
    return (0, e.get)("/announcers/get_batch", {
        ids: t
    });
};