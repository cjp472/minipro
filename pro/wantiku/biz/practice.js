var e = require("../utils/http.js"), t = {
    getFastTestData: function(t) {
        var a = {};
        e.Get("/api/question/FastIntelligentPaper", a, function(e) {
            t && t(e);
        });
    },
    getZhentiTestData: function(t, a, n) {
        var i = {
            paperId: t,
            userExamPaperId: a
        };
        e.Get("/api/question/Paper", i, function(e) {
            n && n(e);
        });
    },
    getMockTestAnalysisData: function(t, a, n) {
        var i = {
            paperId: t,
            examFightId: a
        };
        e.Get("/api/mockexam/Paper", i, function(e) {
            n && n(e);
        });
    },
    getMockTestData: function(t, a) {
        var n = {
            paperId: t
        };
        e.Get("/api/mockexam/GetUserPaper", n, function(e) {
            a && a(e);
        });
    },
    getSolidifyTestData: function(t, a, n) {
        var i = {
            paperId: t,
            userExamPaperId: a
        };
        e.Get("/api/question/ImitateExam", i, function(e) {
            n && n(e);
        });
    },
    getChapterTestData: function(t, a) {
        var n = {
            examSiteId: t
        };
        e.Get("/api/question/SpecialExercisePaper", n, function(e) {
            a && a(e);
        });
    },
    getErroTestData: function(t, a, n) {
        var i = {
            examPaperType: a,
            siteId: t
        };
        e.Get("/api/question/GetErrorBySite", i, function(e) {
            n && n(e);
        });
    },
    getFavorOverviewData: function(t, a) {
        var n = {
            paperId: t
        };
        e.Get("/api/question/GetFavorQuestions", n, function(e) {
            a && a(e);
        });
    },
    GetErrorOverviewData: function(t, a) {
        var n = {
            paperId: t
        };
        e.Get("/api/question/GetErrorQuestions", n, function(e) {
            a && a(e);
        });
    },
    getAllErroTestData: function(t, a) {
        var n = {
            examPaperType: t
        };
        e.Get("/api/question/GetAllErrorQuestions", n, function(e) {
            a && a(e);
        });
    },
    getFavorTestData: function(t, a, n) {
        var i = {
            examPaperType: a,
            siteId: t
        };
        e.Get("/api/question/GetFavorBySite", i, function(e) {
            n && n(e);
        });
    },
    getAllFavorTestData: function(t, a) {
        var n = {
            examPaperType: t
        };
        e.Get("/api/question/GetAllFavorQuestions", n, function(e) {
            a && a(e);
        });
    },
    favorByRealQuestionId: function(t, a, n) {
        var i = {
            RealQuestionId: t,
            IsFavor: a
        };
        e.Get("/API/User/SaveFavor", i, function(e) {
            n && n(e);
        });
    },
    getPapersReport: function(t, a) {
        var n = {
            UserExamPaperId: t
        };
        e.Get("/API/Report/GetPaperReport", n, function(e) {
            a && a(e);
        });
    },
    getCapacityReport: function(t, a) {
        var n = {
            UserExamPaperId: t
        };
        e.Get("/API/Report/GetFastReport", n, function(e) {
            a && a(e);
        });
    },
    getPracticeChapper: function(t) {
        var a = {};
        e.Get("/api/question/GetSpecialIntelligenceTree", a, function(e) {
            t && t(e);
        });
    },
    getPracticePaperData: function(t) {
        var a = {
            pageIndex: 1
        };
        e.Get("/api/question/GetPapers", a, function(e) {
            t && t(e);
        });
    },
    getPracticeSolidifyData: function(t) {
        var a = {
            pageIndex: 1
        };
        e.Get("/api/question/Papers", a, function(e) {
            t && t(e);
        });
    },
    getPracticeErroData: function(t) {
        var a = {};
        e.Get("/api/question/errorlist", a, function(e) {
            t && t(e);
        });
    },
    getPracticeFavorData: function(t) {
        var a = {};
        e.Get("/api/question/GetFavor", a, function(e) {
            t && t(e);
        });
    },
    getPracticeHistoryStatisticsData: function(t) {
        var a = {};
        e.Get("/API/Report/ExeciseReport", a, function(e) {
            t && t(e);
        });
    },
    getPracticeHistoryData: function(t, a) {
        var n = {
            pageIndex: t,
            pageSize: 10
        };
        e.Get("/API/Report/GetMyExecise", n, function(e) {
            a && a(e);
        });
    },
    getShareTestData: function(t, a) {
        var n = {
            questionId: t
        };
        e.Get("/api/question/GetSearchInfo", n, function(e) {
            a && a(e);
        });
    },
    getHomeIconData: function(t) {
        var a = {};
        e.Get("/api/sys/homemenu", a, function(e) {
            t && t(e);
        });
    },
    submitMockPapers: function(t, a, n, i) {
        var r = {
            "content-type": "application/json"
        }, o = {
            Answers: a,
            paperId: t,
            fightId: n
        };
        e.Post("/api/mockexam/SaveUserPaper", o, i, null, r);
    },
    submitPapers: function(t, a, n) {
        var i = {
            "content-type": "application/json"
        }, r = {
            Answers: a,
            paperid: t,
            isSavePaper: 1
        };
        e.Post("/API/Report/SaveUserPaper", r, n, null, i);
    },
    getQuestionsVideoData: function(t, a) {
        var n = {
            questionid: t,
            pageindex: 1,
            pagesize: 50
        };
        e.Get("/API/Video/VideoParsing", n, function(e) {
            a && a(e);
        });
    },
    saveEvaluation: function(t, a, n, i) {
        var r = {
            QuestionId: t,
            StarLevel: a,
            MsgContent: n
        };
        e.Post("/API/Video/VideoReview", r, function(e) {
            i && i(e);
        });
    },
    practiceEvent: function(t, a, n, i, r, o, u) {
        var c = {
            EventType: t,
            OpenId: a,
            FormId: n,
            ReportUrl: i,
            SubjectParentName: r,
            SubjectName: o
        };
        e.Post("/api/templatemsg/PracticeEvent", c, function(e) {
            u && u(e);
        });
    },
    chapterEvent: function(t, a, n, i, r, o, u) {
        var c = {
            ChapterCourseSiteId: t,
            OpenId: a,
            FormId: n,
            ReportUrl: i,
            SubjectParentName: r,
            CourseName: o
        };
        e.Post("/api/templatemsg/ViewChapterCourseEvent", c, function(e) {
            u && u(e);
        });
    },
    practiceMenuFrequency: function(t) {
        var a = {};
        e.Get("/api/sys/MenuFrequency", a, function(e) {
            t && t(e);
        });
    },
    removeErrorQustions: function(t, a) {
        var n = {
            RealQuestionId: t
        };
        e.Get("/api/user/RemoveError", n, function(e) {
            a && a(e);
        });
    },
    getTags: function(t) {
        var a = {};
        e.Get("/api/sys/ErrorFavorTags", a, function(e) {
            t && t(e);
        });
    },
    getTextbookTestData: function(t, a) {
        var n = {
            examSiteId: t
        };
        e.Get("/api/question/AutoIntel", n, function(e) {
            a && a(e);
        });
    },
    getFavorTree: function(t, a) {
        var n = {
            examPaperType: t
        };
        e.Get("/api/question/GetFavor", n, function(e) {
            a && a(e);
        });
    },
    getFavorPaper: function(t, a) {
        var n = {
            examPaperType: t
        };
        e.Get("/api/question/GetFavorPapers", n, function(e) {
            a && a(e);
        });
    },
    getBurningTestData: function(t, a, n) {
        var i = {
            paperId: t,
            userExamPaperId: a
        };
        e.Get("/api/Question/ImitateExam", i, function(e) {
            n && n(e);
        });
    },
    getErrorTree: function(t, a) {
        var n = {
            examPaperType: t
        };
        e.Get("/api/question/errorlist", n, function(e) {
            a && a(e);
        });
    },
    getHighFreData: function(t, a, n) {
        var i = {
            ExamFrequency: t,
            IsReset: a
        };
        e.Get("/api/question/FreqRealQuestions", i, function(e) {
            n && n(e);
        });
    },
    getErroFreData: function(t, a, n) {
        var i = {
            ErrorType: t,
            IsReset: a
        };
        e.Get("/api/question/GetFreqQuestions", i, function(e) {
            n && n(e);
        });
    },
    getErrorPaper: function(t, a) {
        var n = {
            examPaperType: t
        };
        e.Get("/api/question/ErrorPapers", n, function(e) {
            a && a(e);
        });
    },
    getExamFightBySubject: function(t, a) {
        var n = {};
        e.Get("/api/mockexam/GetExamFightBySubject", n, function(e) {
            t && t(e);
        }, function(e) {
            a && t(e);
        });
    },
    mockReport: function(t, a) {
        var n = {
            fightId: t
        };
        e.Get("/api/mockexam/GetFightAnalysisReport", n, function(e) {
            a && a(e);
        });
    },
    updatedUnlockMaster: function(t) {
        var a = {}, n = {};
        e.Post("/api/question/UnlockPapers", n, function(e) {
            t && t(e);
        }, null, a);
    }
};

module.exports = t;