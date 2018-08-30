var e = require("../utils/http.js"), n = (getApp(), {
    chapterCourseInfo: function(n, t, u) {
        var s = {}, o = {
            subjectParentID: n,
            subjectLevel: t
        };
        e.Get("/api/business/ChapterCourseInfo", o, function(e) {
            u && u(e);
        }, null, s);
    },
    tikuInfo: function(n, t, u) {
        var s = {}, o = {
            subjectParentID: n,
            subjectLevel: t
        };
        e.Get("/api/business/TikuInfo", o, function(e) {
            u && u(e);
        }, null, s);
    },
    zhentiInfo: function(n, t, u, s) {
        var o = {}, i = {
            subjectParentID: n,
            type: t,
            subjectLevel: u
        };
        e.Get("/api/business/ZhentiInfo", i, function(e) {
            s && s(e);
        }, null, o);
    },
    mokaoInfo: function(n, t, u) {
        var s = {}, o = {
            subjectParentID: n,
            subjectLevel: t
        };
        e.Get("/api/business/MokaoInfo", o, function(e) {
            u && u(e);
        }, null, s);
    }
});

module.exports = n;