var a = require("../../biz/practice.js"), t = getApp(), e = require("../../config.js"), o = require("../../utils/tourist.js");

Page({
    data: {
        theme: e.UIConfig.Theme,
        statisticsData: {},
        historyData: [],
        empty: !1,
        pageIndex: 1,
        loading: !0,
        isLoadMore: !0
    },
    onLoad: function(t) {
        wx.showToast({
            title: "正在加载",
            icon: "loading",
            duration: 6e3
        });
        var e = this;
        a.getPracticeHistoryStatisticsData(function(a) {
            console.log(a);
            var a = e.initStatisticsData(a);
            e.setData({
                statisticsData: a
            });
        }), this.loadPracticeHistoryData(1, !1);
    },
    loadPracticeHistoryData: function(t, e) {
        var o = this;
        console.log(t), a.getPracticeHistoryData(t, function(a) {
            console.log(a);
            var t = o.initHistoryPracticeData(a.Data), i = a.PageIndex, r = a.PageCount;
            console.log(r);
            var n = !0;
            i < r && (n = !1), o.setData({
                isLoadMore: n
            });
            var s = [];
            s = e ? o.data.historyData.concat(t) : t, o.setData({
                loading: !1,
                pageIndex: i,
                historyData: s,
                empty: 0 == t.length
            }), wx.hideToast();
        });
    },
    initHistoryPracticeData: function(a) {
        for (var t in a) {
            var e = a[t];
            0 == e.UserExamPaper.IsGenerate ? (e.progressColor = "#ffae05", e.LabelColor = "orange") : (e.progressColor = "#41d497", 
            e.LabelColor = "green"), e.progressPercent = 100 * e.Progress;
        }
        return a;
    },
    initStatisticsData: function(a) {
        console.log(a.TotalCount);
        var t = {};
        return t.totalCount = a.TotalCount, t.duration = this.calculaDuration(a.DurationLen), 
        t.examCount = a.ExamCount, t;
    },
    calculaDuration: function(a) {
        var t = {};
        return t.hour = parseInt(a / 60 / 60), t.minute = parseInt(a % 60), t;
    },
    onPracticeItemJs: function(a) {
        console.log(a);
        var e = a.currentTarget.dataset.paperId, i = a.currentTarget.dataset.userexampaperid, r = a.currentTarget.dataset.isgenerate, n = a.currentTarget.dataset.exampapertype, s = "", c = t.globalData.ExamType.zhentiTest;
        30 == n ? c = t.globalData.ExamType.solidifyTest : 45 == n ? c = t.globalData.ExamType.fineTest : 40 == n ? c = t.globalData.ExamType.denseTest : 20 == n && (c = t.globalData.ExamType.burningTest);
        var l = "examType=" + c + "&paperId=" + e + "&userExamPaperId=" + i;
        s = 3 == r || 2 == r ? "../../pages/capacityReport/capacityReport?" + l : "../../pages/papersReport/papersReport?" + l, 
        0 == o.availabilityQuantity(t.globalData.ExamType.historySee) ? t.gotoLogin("", 1) : (o.addTouristQuantity(t.globalData.ExamType.historySee), 
        wx.navigateTo({
            url: s
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        console.log(this.data.loading), console.log(this.data.isLoadMore), this.data.loading || this.data.isLoadMore || (console.log("loading"), 
        this.loadPracticeHistoryData(this.data.pageIndex + 1, !0));
    }
});