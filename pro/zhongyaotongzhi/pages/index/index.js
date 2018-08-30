function t(e, o) {
    var s = e.data.type, c = o ? "owner" == s ? e.data.ownerNoticesPage : e.data.joinNoticesPage : 1, r = "owner" == s ? e.data.ownerNotices : e.data.joinNotices;
    null == r && (n.showLoading("加载中"), e.setData({
        showLoadError: 0
    })), wx.request({
        url: i.globalData.host + "/notice/list",
        data: {
            type: "owner" == s ? 0 : 1,
            page: c,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(i) {
            if (null == r && n.hideLoading(), -500 != i.data.sta) if (0 == i.data.sta) if (i.data.data) {
                var d = i.data.data;
                e.setData({
                    canLoadMore: d.length > 0
                });
                for (var u = 0; u < d.length; u++) {
                    var g = d[u];
                    g.create_time = n.formatDate(new Date(1e3 * g.create_time), "yyyy-MM-dd HH:mm"), 
                    n.isTextEmpty(g.bg_img) && (g.bg_img = "/images/default_cover.jpg");
                }
                "owner" == s ? e.setData({
                    ownerNotices: 1 == c ? d : r.concat(d),
                    ownerNoticesPage: 0 == d.length ? c : c + 1
                }) : e.setData({
                    joinNotices: 1 == c ? d : r.concat(d),
                    joinNoticesPage: 0 == d.length ? c : c + 1
                }), a(e);
            } else null == r ? e.setData({
                showLoadError: 1
            }) : n.showFailedToast("加载失败，请重试", i.data.msg); else null == r ? e.setData({
                showLoadError: 1
            }) : n.showFailedToast("加载失败，请重试", i.data.msg); else n.login(function() {
                t(e, o);
            });
        },
        fail: function(t) {
            null == r ? (n.hideLoading(), e.setData({
                showLoadError: 1
            })) : n.showFailedToast("加载失败，请重试");
        }
    });
}

function a(t) {
    wx.request({
        url: i.globalData.host + "/notice/vip",
        data: {
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(e) {
            -500 != e.data.sta ? 0 == e.data.sta && e.data.data && t.setData({
                showDev: e.data.data
            }) : n.login(function() {
                a(t);
            });
        }
    });
}

function e(a, o) {
    n.showLoading("正在删除"), wx.request({
        url: i.globalData.host + "/notice/remove",
        data: {
            nid: o,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(i) {
            n.hideLoading(), -500 != i.data.sta ? 0 == i.data.sta ? t(a, !1) : n.showFailedToast("删除失败，请重试", i.data.msg) : n.login(function() {
                e(a, o);
            });
        },
        fail: function(t) {
            n.hideLoading(), n.showFailedToast("删除失败，请重试");
        }
    });
}

function o(a, e) {
    n.showLoading("正在清除"), wx.request({
        url: i.globalData.host + "/notice/exit",
        data: {
            nid: e,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(i) {
            n.hideLoading(), -500 != i.data.sta ? 0 == i.data.sta ? t(a, !1) : n.showFailedToast("清除失败，请重试", i.data.msg) : n.login(function() {
                o(a, e);
            });
        },
        fail: function(t) {
            n.hideLoading(), n.showFailedToast("清除失败，请重试");
        }
    });
}

var n = require("../../utils/util.js"), i = getApp();

Page({
    data: {
        showLoadError: 0,
        showDev: 0,
        isFirstJoin: "v1.1.0",
        type: "owner",
        ownerNoticesPage: 1,
        joinNoticesPage: 1,
        ownerNotices: null,
        joinNotices: null,
        canLoadMore: !1,
        buttonClicked: !1,
        contactUserInfo: '{ "nickName": "' + n.getStorage("userInfo").nickName + '", "avatarUrl": "' + n.getStorage("userInfo").avatarUrl + '" }'
    },
    onLoad: function(t) {
        t.type && this.setData({
            type: t.type
        });
        var a = wx.getStorageSync("isFirstJoin_110");
        a && this.setData({
            isFirstJoin: a
        });
    },
    onShow: function() {
        t(this, !1), this.setData({
            contactUserInfo: '{ "nickName": "' + n.getStorage("userInfo").nickName + '", "avatarUrl": "' + n.getStorage("userInfo").avatarUrl + '" }'
        });
    },
    onReachBottom: function() {
        this.data.canLoadMore && t(this, !0);
    },
    refresh: function() {
        t(this, !1);
    },
    changeType: function(a) {
        this.setData({
            type: a.currentTarget.dataset.type
        }), t(this, !1);
    },
    toDev: function() {
        n.buttonClicked(this), wx.navigateTo({
            url: "../dev/dev"
        });
    },
    toDetail: function(t) {
        n.buttonClicked(this), wx.navigateTo({
            url: "../detail/detail?nid=" + t.currentTarget.dataset.nid
        });
    },
    toCreate: function() {
        n.buttonClicked(this), wx.navigateTo({
            url: "../edit/edit"
        });
    },
    deleteNotice: function(t) {
        var a = this;
        wx.showModal({
            title: "提示",
            content: "删除后，不能恢复，数据也会丢失。确定要删除吗？",
            confirmColor: "#1677d2",
            success: function(o) {
                o.confirm && e(a, t.currentTarget.dataset.nid);
            }
        });
    },
    exitNotice: function(t) {
        var a = this;
        wx.showModal({
            title: "提示",
            content: "清除后，这条记录不再展示，数据保留，确定要清除吗？",
            confirmColor: "#1677d2",
            success: function(e) {
                e.confirm && o(a, t.currentTarget.dataset.nid);
            }
        });
    },
    toRecommend: function() {
        n.buttonClicked(this), this.data.isFirstJoin && (this.setData({
            isFirstJoin: ""
        }), wx.setStorageSync("isFirstJoin_110", "no")), wx.navigateTo({
            url: "../recommend/recommend"
        });
    },
    postFormId: function(t) {
        n.postFormId(t.detail.formId);
    },
    bannerError: function(t) {
        var a = parseInt(t.currentTarget.dataset.index);
        if ("owner" == t.currentTarget.dataset.type) {
            var e = this.data.ownerNotices;
            e[a].bg_img = "https://cdn-xcx-qunsou.weiyoubot.cn/notice_bg/41.jpg", this.setData({
                ownerNotices: e
            });
        } else {
            var o = this.data.joinNotices;
            o[a].bg_img = "https://cdn-xcx-qunsou.weiyoubot.cn/notice_bg/41.jpg", this.setData({
                joinNotices: o
            });
        }
    }
});