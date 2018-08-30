var n = require("../utils/http.js"), e = (getApp(), {
    getCheckInCardInfo: function(e, i) {
        n.Get("/api/checkin/GetCheckInCardInfo", e, function(n) {
            i && i(n);
        });
    },
    JoinCircle: function(e, i) {
        n.Post("/api/checkin/JoinCircle", e, function(n) {
            i && i(n);
        });
    }
});

module.exports = e;