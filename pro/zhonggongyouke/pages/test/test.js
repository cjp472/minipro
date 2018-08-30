Page({
    data: {},
    onLoad: function(n) {
        var o = wx.getStorageSync("url") + "#wechat_redirect";
        this.setData({
            url: o
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