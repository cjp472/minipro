var e = require("../utils/http.js"), t = (getApp(), {
    getExamArea: function(t) {
        var a = {};
        e.Get("/api/user/GetAreas", a, function(e) {
            t && t(e);
        });
    },
    saveExamArea: function(t, a) {
        var r = {
            areaId: t
        };
        e.Get("/api/user/EditUserArea", r, function(e) {
            a && a(e);
        });
    },
    getExamAreaName: function(t) {
        var a = {};
        e.Get("/api/user/GetUserArea", a, function(e) {
            t && t(e);
        });
    },
    remindMsg: function(t) {
        var a = {};
        e.Get("/api/Question/ReplyCount", a, function(e) {
            t && t(e);
        });
    }
});

module.exports = t;