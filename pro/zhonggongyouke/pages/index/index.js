getApp();

var t = require("../../utils/common.js"), a = require("../../utils/login.js");

Page({
    data: {
        bannerList: [],
        bannerset: {
            indicatorDots: !0,
            color: "#fff",
            autoplay: !0,
            circular: !0,
            interval: 3e3,
            duration: 500,
            previousMargin: 0,
            nextMargin: 0
        },
        lessonList: [],
        page: {
            hasNext: !0,
            pageNow: 1
        },
        showLoading: !0
    },
    onLoad: function(t) {
        this.checkLogin(), this.loadBanner(), this.loadList(), this.getPlatForm();
    },
    onShow: function(t) {
        this.checkLivePay();
        var a = new Date(), e = Date.parse(new Date()) / 1e3;
        this.setData({
            date: a,
            time: e
        });
    },
    getPlatForm: function() {
        var t = this, a = wx.getSystemInfoSync().system, e = /android/i;
        /ios/i.test(a) ? t.setData({
            platform: 1
        }) : e.test(a) ? t.setData({
            platform: 2
        }) : t.setData({
            platform: 1
        });
    },
    onPullDownRefresh: function() {
        this.loadBanner(), this.setData({
            lessonList: [],
            page: {
                hasNext: !0,
                pageNow: 1
            },
            showLoading: !0
        }), this.loadList(), wx.stopPullDownRefresh();
    },
    onReachBottom: function(t) {
        var a = this;
        if (!a.data.page.hasNext) return a.setData({
            showLoading: !0,
            page: {
                hasNext: !1,
                pageNow: a.data.page.pageNow
            }
        }), !1;
        setTimeout(function() {
            var t = a.data.page.pageNow;
            t += 1, a.setData({
                page: {
                    hasNext: !0,
                    pageNow: t
                },
                showLoading: !1
            }), a.loadList();
        }, 300);
    },
    checkLivePay: function() {
        1 == wx.getStorageSync("liveBuy") && this.loadList();
    },
    onShareAppMessage: function() {
        return {
            title: "中公优课，名师授课，更适合公职考试备考！",
            path: "pages/index/index"
        };
    },
    checkLogin: function(t) {
        a.checkLogin();
    },
    loadBanner: function() {
        var a = this, e = {
            banner_type: "live"
        };
        t.globalRequest(e, "index/live/bannerlist", function(e) {
            200 == e.statusCode ? 0 == e.data.retcode ? (a.setData({
                bannerList: e.data.data
            }), 1 == e.data.data.length && a.setData({
                bannerset: {
                    indicatorDots: !1
                }
            })) : t.tip(e.data.message) : t.tip(e.errMsg);
        }, function(a) {
            console.log(a), t.tip("服务器错误！");
        });
    },
    clickBanner: function(a) {
        var e = {
            banner_id: a.currentTarget.dataset.banner_id
        };
        t.globalRequest(e, "index/util/bannerclick", function(a) {
            200 == a.statusCode ? 0 == a.data.retcode || t.tip(a.data.message) : t.tip(a.errMsg);
        });
        var s = a.currentTarget.dataset.url;
        if ("" == s) return !1;
        wx.setStorageSync("url", s);
        wx.navigateTo({
            url: s
        });
    },
    loadList: function() {
        var e = this;
        e.setData({
            showLoading: !0
        });
        var s = e.data.page.pageNow, n = 0;
        a.hasStudentID() && (n = wx.getStorageSync("student_id"));
        var i = e.data.lessonList;
        if (1 == wx.getStorageSync("liveBuy")) {
            i = [], wx.setStorageSync("liveBuy", !1);
            s = 1;
            console.log("当前页数：1");
        }
        var o = {
            page: s,
            size: 10,
            student_id: n
        };
        t.globalRequest(o, "index/live/courselist", function(a) {
            if (200 == a.statusCode) if (0 == a.data.retcode) if (e.setData({
                showLoading: !1
            }), a.data.data.length > 0) {
                for (var n = 0; n < a.data.data.length; n++) i.push(a.data.data[n]);
                e.setData({
                    lessonList: i
                }), a.data.data.length < 10 && e.setData({
                    showLoading: !0,
                    page: {
                        hasNext: !1,
                        pageNow: s
                    }
                });
            } else e.setData({
                page: {
                    hasNext: !1,
                    pageNow: s
                }
            }); else t.tip(a.data.message); else t.tip(a.errMsg);
        });
    },
    toDetail: function(t) {
        var a = "../livedetail/livedetail?goods_id=" + t.currentTarget.dataset.goods_id;
        wx.navigateTo({
            url: a
        });
    }
});