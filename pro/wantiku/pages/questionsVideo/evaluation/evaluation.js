var t = require("../../../config.js"), a = require("../../../biz/practice.js");

getApp();

Page({
    data: {
        theme: t.UIConfig.Theme,
        star: 0,
        questionId: 0
    },
    onLoad: function(t) {
        var a = t.starts;
        this.data.questionId = t.questionId, this.setData({
            star: a
        });
    },
    chooseStar: function(t) {
        console.log(t);
        var a = t.target.dataset.id;
        this.setData({
            star: a
        });
    },
    formsubmit: function(t) {
        var n = t.detail.value.evaluation, e = this;
        a.saveEvaluation(e.data.questionId, e.data.star, n, function(t) {
            console.log(t);
            var a = getCurrentPages();
            a[a.length - 2].setData({
                refresh: 1
            }), wx.navigateBack({});
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});