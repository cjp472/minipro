var a = require("../../biz/chapter.js"), t = require("../../config.js"), e = getApp();

Page({
    data: {
        theme: t.UIConfig.Theme,
        star: 0,
        courseId: 0
    },
    onLoad: function(a) {
        a.star;
        this.setData({
            star: a.star,
            courseId: a.courseId
        });
        a.courseId, a.star;
    },
    onShow: function(a) {},
    chooseStar: function(a) {
        console.log(a);
        var t = a.target.dataset.id;
        this.setData({
            star: t
        });
    },
    formsubmit: function(t) {
        var s = t.detail.value.evaluation;
        console.log(s);
        var o = this;
        a.saveEvaluation(o.data.courseId, o.data.star, s, function() {
            e.globalData.tempData.star = o.data.star, wx.navigateBack({
                delta: 1
            });
        });
    }
});