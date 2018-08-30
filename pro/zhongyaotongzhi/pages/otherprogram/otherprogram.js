var a = require("../../utils/util.js"), t = getApp();

Page({
    data: {
        toProgram: !1
    },
    onLoad: function(a) {
        var t = a.wid;
        this.toOtherProgram(t);
    },
    onShow: function() {
        this.data.toProgram && a.toIndex();
    },
    onHide: function() {
        this.setData({
            toProgram: !0
        });
    },
    toOtherProgram: function(o) {
        var i = t.globalData.recommend;
        wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
            appId: i.appid,
            path: "/pages/detail/detail?wid=" + o
        }) : a.toIndex();
    }
});