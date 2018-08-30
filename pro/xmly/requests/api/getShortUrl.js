Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../request");

exports.default = function(t) {
    return (0, e.get)("https://cms.9nali.com/admin/tiny_urls/convert_to_tiny_url", {
        url: t
    });
};