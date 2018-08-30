var e = require("../utils/http.js"), t = getApp(), n = {
    getHodoutUrlContent: function(t, n) {
        var o = {}, a = {
            lectureUrl: t
        };
        e.Get("/api/course/CourseLectureContent", a, function(e) {
            n && n(e);
        }, null, o);
    },
    getCourseSiteTree: function(n) {
        var o = {
            UserClientType: t.globalData.SystemInfo.iOS ? 1 : 2
        }, a = {
            CourseTreeType: 1
        };
        e.Get("/api/course/CourseSiteTree", a, function(e) {
            n && n(e);
        }, null, o);
    },
    saveUserCourseHistory: function(n, o, a, i) {
        var r = {
            UserClientType: t.globalData.SystemInfo.iOS ? 1 : 2
        }, u = {
            ChapterCourseSiteId: n,
            ChapterCourseId: o,
            LearnDurationLen: a,
            HistoryType: 1
        };
        e.Post("/api/Course/SaveUserCourseHistory", u, function(e) {
            i && i();
        }, null, r);
    },
    saveEvaluation: function(n, o, a, i) {
        var r = {
            UserClientType: t.globalData.SystemInfo.iOS ? 1 : 2
        }, u = {
            ChapterCourseId: n,
            EvaluationContent: a,
            ProfessionalStarLevel: o,
            StyleStarLevel: o,
            InformationStarLevel: o
        };
        e.Post("/api/Course/SaveEvaluation", u, function(e) {
            i && i(e);
        }, null, r);
    },
    getEvaluationList: function(n, o) {
        var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 5, r = {
            UserClientType: t.globalData.SystemInfo.iOS ? 1 : 2
        }, u = {
            ChapterCourseId: n,
            pageindex: a,
            pageSize: i
        };
        e.Get("/api/Course/GetEvaluationList", u, function(e) {
            o && o(e);
        }, null, r);
    },
    getCourseInfo: function(t, n) {
        var o = {}, a = {
            courseSiteId: t
        };
        e.Get("/api/Course/CourseSite", a, function(e) {
            n && n(e);
        }, null, o);
    },
    getPredictScore: function(t) {
        var n = {};
        e.Get("/API/Report/UserPredictScore", n, function(e) {
            t && t(e);
        });
    },
    getPriceInfoMsg: function(n, o) {
        var a = {
            UserClientType: t.globalData.SystemInfo.iOS ? 1 : 2
        }, i = {
            ChapterId: n
        };
        e.Get("/API/VIP/PriceInfo", i, function(e) {
            o && o(e);
        }, null, a);
    },
    getPriceInfoBook: function(n, o) {
        t.globalData.SystemInfo.iOS;
        var a = {
            ExamSiteId: n
        };
        e.Get("/api/vip/GetChapterPriceInfo", a, function(e) {
            o && o(e);
        }, null);
    },
    getPriceInfoTest: function(n, o) {
        var a = {
            UserClientType: t.globalData.SystemInfo.iOS ? 1 : 2
        }, i = {
            frequencyId: n
        };
        e.Get("/api/vip/GetFrequencyPriceInfo", i, function(e) {
            o && o(e);
        }, null, a);
    },
    getChapterOrder: function(n, o, a) {
        var i = {
            UserClientType: t.globalData.SystemInfo.iOS ? 1 : 2
        };
        e.Post(n, o, function(e) {
            a && a(e);
        }, null, i);
    },
    getPayWeixinData: function(t, n, o, a) {
        var i = {
            openid: t,
            orderno: n,
            notifyasync: o
        };
        e.Get("/api/vip/WXOderSign", i, function(e) {
            a && a(e);
        });
    },
    getMasterInfo: function(t, n, o) {
        var a = 0 == t ? "/api/vip/HeadMaster" : "/api/question/GetPapersHeadMaster", i = 0 == t ? {
            masterType: n
        } : {};
        e.Get(a, i, function(e) {
            o && o(e);
        });
    },
    updatedUnlockMaster: function(t, n) {
        console.log("HeadMasterId->", t);
        var o = {}, a = {
            HeadMasterId: t
        };
        e.Post("/api/question/SaveUnlockHeadMasterQR", a, function(e) {
            n && n();
        }, null, o);
    },
    getIsUnlockChapter: function(t) {
        var n = {};
        e.Get("/api/vip/IsUnlockChapter", n, function(e) {
            t && t(e);
        });
    },
    lockChapterSuccess: function(t) {
        var n = {};
        e.Get("/api/vip/UnlockChapterNew", n, function(e) {
            t && t(e);
        });
    }
};

module.exports = n;