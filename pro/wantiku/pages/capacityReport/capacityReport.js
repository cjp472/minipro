var e = require("../../biz/practice.js"), t = require("../../config.js"), a = getApp();

Page({
    data: {
        iPhoneX: a.globalData.SystemInfo.iPhoneX,
        theme: t.UIConfig.Theme,
        PaperName: "",
        AnswerCardList: [],
        CorrectRate: 0,
        trainAnswerBtn: {
            0: "",
            1: "success",
            2: "error"
        },
        examType: 0,
        userExamPaperId: 0,
        paperId: 0,
        highFreType: 0,
        examFrequency: 0
    },
    onLoad: function(t) {
        console.log(t), this.data.examType = t.examType, this.data.userExamPaperId = t.userExamPaperId, 
        this.data.paperId = t.paperId, this.data.highFreType = t.highFreType, this.data.examFrequency = t.examFrequency, 
        wx.showLoading({
            title: "正在加载报告"
        });
        var a = this;
        e.getCapacityReport(a.data.userExamPaperId, function(e) {
            console.log(e);
            var t = Math.round(e.RightAnswerQuestion / e.TotalQuestions * 100), r = e.PaperName, s = e.AnswerCardList;
            a.setData({
                PaperName: r,
                AnswerCardList: s,
                CorrectRate: t
            }), a.onDraw(), wx.hideLoading();
        });
    },
    onDraw: function() {
        var e = wx.createCanvasContext("myCanvas");
        e.beginPath(), e.arc(70, 70, 67, 0, 2 * Math.PI), e.setStrokeStyle("#cccccc"), e.setFillStyle("#ffffff"), 
        e.setLineWidth(1), e.stroke(), e.fill(), e.beginPath(), e.arc(70, 70, 66, .5 * Math.PI, .5 * Math.PI + this.data.CorrectRate / 100 * 2 * Math.PI), 
        e.setStrokeStyle(t.UIConfig.color), e.setFillStyle("#ffffff"), e.setLineWidth(5), 
        e.stroke(), e.fill(), e.beginPath(), e.arc(70, 70, 66, 0, 2 * Math.PI), e.setFillStyle("#ffffff"), 
        e.fill(), e.setFontSize(12), e.setFillStyle("#9a9a9a"), e.setTextAlign("center"), 
        e.fillText("正确率", 70, 45), e.setFontSize(36), e.setFillStyle("#4e4e4e"), e.setTextAlign("center"), 
        e.fillText(this.data.CorrectRate, 70, 92), e.setFontSize(14), e.setFillStyle("#7a7a7a"), 
        e.setTextAlign("center"), 100 == this.data.CorrectRate ? e.fillText("%", 110, 90) : this.data.CorrectRate < 10 ? e.fillText("%", 90, 90) : e.fillText("%", 100, 90), 
        e.draw();
    },
    onAnswerCartJs: function(e) {
        var t = e.currentTarget.dataset.questionId, a = this.getOptions() + "&questionId=" + t;
        console.log(a), wx.redirectTo({
            url: "../../pages/papersAnalysis/papersAnalysis?" + a
        });
    },
    onAllAnalysisJs: function() {
        var e = this.getOptions();
        console.log("../../pages/papersAnalysis/papersAnalysis?" + e), wx.redirectTo({
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
        return "examType=" + this.data.examType + "&userExamPaperId=" + this.data.userExamPaperId + "&paperId=" + this.data.paperId + "&highFreType=" + this.data.highFreType + "&examFrequency=" + this.data.examFrequency;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});