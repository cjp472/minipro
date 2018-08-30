Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../utils/http.js"), t = (getApp(), {
    getTodayLiveList: function(t) {
        var i = {}, o = {};
        e.Get("/api/vip/GetCourseList", o, function(e) {
            t && t(e);
        }, null, i);
    },
    getLateLiveList: function(t) {
        var i = {}, o = {};
        e.Get("/api/vip/GetYuGaoList", o, function(e) {
            t && t(e);
        }, null, i);
    },
    getTeacherWeChat: function(t, i) {
        var o = {}, r = {
            masterId: t
        };
        e.Get("/api/vip/HeadMaster", r, function(e) {
            i && i(e);
        }, null, o);
    },
    postLiveBookTemplate: function(t, i) {
        var t = {
            livetype: t.livevideotype,
            courseid: t.courseid,
            OpenId: t.OpenId,
            formId: t.formId,
            ReportUrl: t.ReportUrl
        };
        e.Post("/api/Vip/BookZhibo", t, function(e) {
            i && i(e);
        });
    },
    postViewZhiboEvent: function(t, i) {
        var t = {
            OpenId: t.OpenId,
            formId: t.formId,
            ReportUrl: t.ReportUrl
        };
        e.Post("/api/templatemsg/ViewZhiboEvent", t, function(e) {
            i && i(e);
        });
    }
});

exports.default = t;