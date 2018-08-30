var e = require("../../biz/practice.js"), a = require("../../config.js"), t = getApp();

Page({
    data: {
        iPhoneX: t.globalData.SystemInfo.iPhoneX,
        theme: a.UIConfig.Theme,
        answerCardList: [],
        userPapersReport: {
            PaperTotalScore: 100,
            RightAnswerQuestion: 0,
            BeatCount: 0,
            AvgScore: 0,
            RigthRatio: 0
        },
        trainAnswerBtn: {
            0: "",
            1: "success",
            2: "error"
        },
        examType: 0,
        userExamPaperId: 0,
        paperId: 0
    },
    onLoad: function(a) {
        this.data.examType = a.examType, this.data.userExamPaperId = a.userExamPaperId, 
        this.data.paperId = a.paperId, wx.showLoading({
            title: "正在加载报告"
        });
        var t = this;
        e.getPapersReport(t.data.userExamPaperId, function(e) {
            console.log(e);
            var a = e.AnswerCardList, r = {
                PaperTotalScore: e.PaperTotalScore,
                RightAnswerQuestion: e.RightAnswerQuestion,
                BeatCount: Math.floor(100 * e.BeatCount),
                AvgScore: e.AvgScore,
                RigthRatio: Math.floor(100 * e.RigthRatio)
            };
            t.setData({
                answerCardList: a,
                userPapersReport: r
            }), wx.hideLoading();
        });
    },
    onAnswerCartJs: function(e) {
        var a = e.currentTarget.dataset.questionId, t = this.getOptions() + "&questionId=" + a;
        wx.redirectTo({
            url: "../../pages/papersAnalysis/papersAnalysis?" + t
        });
    },
    onAllAnalysisJs: function() {
        var e = this.getOptions();
        wx.redirectTo({
            url: "../../pages/papersAnalysis/papersAnalysis?" + e
        });
    },
    onErrorAnalysisJs: function() {
        var e = this.getOptions() + "&errorAnalysis=1";
        wx.redirectTo({
            url: "../../pages/papersAnalysis/papersAnalysis?" + e
        });
    },
    getOptions: function() {
        return "examType=" + this.data.examType + "&userExamPaperId=" + this.data.userExamPaperId + "&paperId=" + this.data.paperId;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});