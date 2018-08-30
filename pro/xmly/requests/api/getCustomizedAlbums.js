Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../requests/requestOpen");

exports.default = function() {
    return (0, e.get)("/v2/customized/album_column_detail", {
        id: 911
    });
};