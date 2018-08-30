var t = require("../../utils/cc.js"), e = require("../../biz/practice.js"), a = require("../../utils/util.js"), i = require("../../config.js");

getApp();

Page({
    data: {
        theme: i.UIConfig.Theme,
        viewData: {},
        playUrl: "",
        starLevelList: [ {
            id: 1,
            state: 0
        }, {
            id: 2,
            state: 0
        }, {
            id: 3,
            state: 0
        }, {
            id: 4,
            state: 0
        }, {
            id: 5,
            state: 0
        } ],
        videoCommentList: [],
        realQuestionId: 0,
        totalSum: 0,
        starLevel: 0,
        refresh: 0
    },
    onLoad: function(e) {
        console.log(e), this.data.realQuestionId = e.realQuestionId;
        var a = this;
        e.videoId && t(e.videoId, function(t) {
            a.data.viewData.playUrl = t, a.setData({
                viewData: a.data.viewData,
                playUrl: t
            });
        }, !0), wx.showLoading({
            title: "正在加载"
        }), this.initVideoData();
    },
    initVideoData: function() {
        var t = this;
        e.getQuestionsVideoData(t.data.realQuestionId, function(e) {
            console.log(e);
            var a = parseFloat(2 * e.VideoParsing.StarLevel).toFixed(1), i = e.VideoParsing.Pager.TotalSum, o = t.getVideoCommentList(e);
            t.setData({
                videoCommentList: o,
                starLevel: a,
                totalSum: i
            }), wx.hideLoading();
        });
    },
    getVideoCommentList: function(t) {
        var e = t.VideoParsing.VideoCommentList;
        for (var i in e) {
            var o = e[i];
            o.starLevel = a.caculateStarCount(o.StarLevel ? o.StarLevel : 0);
        }
        return e;
    },
    onStartLevelJs: function(t) {
        var e = t.currentTarget.dataset.stars;
        this.data.starLevelList = this.caculateStarCount(e), this.setData({
            starLevelList: this.data.starLevelList
        }), wx.navigateTo({
            url: "../questionsVideo/evaluation/evaluation?starts=" + e + "&questionId=" + this.data.realQuestionId
        });
    },
    caculateStarCount: function(t) {
        t = t > 5 ? 5 : t;
        for (var e = [ {
            id: 1,
            state: 0
        }, {
            id: 2,
            state: 0
        }, {
            id: 3,
            state: 0
        }, {
            id: 4,
            state: 0
        }, {
            id: 5,
            state: 0
        } ], a = 0; a < t; a++) e[a].state = 1;
        return e;
    },
    onReady: function() {},
    onShow: function() {
        1 == this.data.refresh && this.initVideoData();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});