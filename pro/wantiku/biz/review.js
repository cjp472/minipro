var t = require("../utils/http.js"), e = {
    versionState: function(e) {
        var s = {};
        t.Get("/api/sys/VersionState", s, function(t) {
            e && e(t);
        });
    }
};

module.exports = e;