function t(a, o) {
    var i = a.data.type, n = o ? "most" == i ? a.data.mostNoticesPage : a.data.latestNoticesPage : 1, c = "most" == i ? a.data.mostNotices : a.data.latestNotices;
    null == c && e.showLoading("加载中"), wx.request({
        url: s.globalData.host + "/notice/list",
        data: {
            type: "most" == i ? 2 : 3,
            page: n,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(s) {
            if (null == c && e.hideLoading(), -500 != s.data.sta) if (0 == s.data.sta) {
                if (s.data.data) {
                    var d = s.data.data;
                    a.setData({
                        canLoadMore: d.length > 0
                    });
                    for (var l = 0; l < d.length; l++) {
                        var u = d[l];
                        u.create_time = e.formatDate(new Date(1e3 * u.create_time), "yyyy-MM-dd HH:mm"), 
                        e.isTextEmpty(u.bg_img) && (u.bg_img = "/images/default_cover.jpg");
                    }
                    "most" == i ? a.setData({
                        mostNotices: 1 == n ? d : c.concat(d),
                        mostNoticesPage: 0 == d.length ? n : n + 1
                    }) : a.setData({
                        latestNotices: 1 == n ? d : c.concat(d),
                        latestNoticesPage: 0 == d.length ? n : n + 1
                    });
                }
            } else e.showFailedToast("加载失败，请重试", s.data.msg); else e.login(function() {
                t(a, o);
            });
        },
        fail: function(t) {
            null == c && e.hideLoading(), e.showFailedToast("加载失败，请重试");
        }
    });
}

function a(t, o) {
    e.showLoading("加载中");
    var i = t.data.status ? 0 : 1;
    wx.request({
        url: s.globalData.host + "/notice/censor",
        data: {
            nid: t.data.nid,
            status: i,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(s) {
            if (e.hideLoading(), -500 != s.data.sta) if (0 == s.data.sta) if (e.showToast("操作成功~"), 
            "most" == t.data.type) {
                var n = t.data.mostNotices;
                n[o].status = i, t.setData({
                    mostNotices: n
                });
            } else {
                var c = t.data.latestNotices;
                c[o].status = i, t.setData({
                    latestNotices: c
                });
            } else e.showFailedToast("加载失败，请重试", s.data.msg); else e.login(function() {
                a(t, o);
            });
        },
        fail: function(t) {
            e.hideLoading(), null == oldNotices && e.hideLoading(), e.showFailedToast("加载失败，请重试");
        }
    });
}

var e = require("../../utils/util.js"), s = getApp();

Page({
    data: {
        type: "most",
        mostNoticesPage: 1,
        latestNoticesPage: 1,
        mostNotices: null,
        latestNotices: null,
        canLoadMore: !1,
        buttonClicked: !1
    },
    onLoad: function(a) {
        a.type && this.setData({
            type: a.type
        }), t(this, !1);
    },
    onReachBottom: function() {
        this.data.canLoadMore && t(this, !0);
    },
    changeType: function(a) {
        this.setData({
            type: a.currentTarget.dataset.type
        }), t(this, !1);
    },
    toDetail: function(t) {
        e.buttonClicked(this), wx.navigateTo({
            url: "../detail/detail?nid=" + t.currentTarget.dataset.nid
        });
    },
    setStatus: function(t) {
        var e = t.currentTarget.dataset.nid, s = t.currentTarget.dataset.status, o = t.currentTarget.dataset.index;
        this.setData({
            nid: e,
            status: s
        });
        var i = this;
        wx.showModal({
            title: "提示",
            content: "确认要修改通知的状态嘛？",
            success: function(t) {
                t.confirm ? a(i, o) : t.cancel && console.log("用户点击取消");
            }
        });
    }
});