var t = [];

Page({
    data: {
        currentTab: 0,
        scroll_height: "",
        top_height: "",
        contentHeights: []
    },
    switchNav: function(t) {
        var e = this;
        if (this.data.currentTab === t.target.dataset.current) return !1;
        e.setData({
            currentTab: t.target.dataset.current
        });
    },
    swiperChange: function(t) {
        this.setData({
            currentTab: t.detail.current
        });
    },
    getTopHeight: function(t) {
        var e = this, n = wx.createSelectorQuery();
        n.select("#top").boundingClientRect(), n.exec(function(t) {
            e.setData({
                top_height: t[0].height
            });
        });
    },
    scroll: function(t) {
        this.setData({
            scroll_height: t.detail.scrollTop
        });
    },
    content1: function(e) {
        var n = this, o = wx.createSelectorQuery();
        o.select(".content1").boundingClientRect(), o.exec(function(e) {
            console.log(e[0].height), t[0] = e[0].height, n.setData({
                contentHeights: t
            });
        });
    },
    content2: function(e) {
        var n = this, o = wx.createSelectorQuery();
        o.select(".content2").boundingClientRect(), o.exec(function(e) {
            console.log(e[0].height), t[1] = e[0].height, n.setData({
                contentHeights: t
            });
        });
    },
    setContentHeight: function(t) {
        this.content1(), this.content2(), console.log(this.data);
    },
    contentLoad: function(t) {},
    onLoad: function(t) {
        this.getTopHeight(), this.setContentHeight();
        var e = this;
        console.log(e.data.top_height), console.log(e.data.contentHeights);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});