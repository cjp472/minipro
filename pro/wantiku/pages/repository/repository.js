var o = getApp();

Page({
    data: {},
    onLoad: function(o) {},
    onReady: function() {},
    onShow: function() {
        o.globalData.goToRespository ? (o.globalData.goToRespository = !1, wx.navigateTo({
            url: "../group/groupBuy/groupBuy?formId=0&grouponid=0"
        })) : wx.switchTab({
            url: o.globalData.goToRespositoryBackRoute
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});