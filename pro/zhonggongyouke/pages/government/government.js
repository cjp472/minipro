getApp();

var a = require("../../utils/common.js"), t = require("../../utils/login.js");

Page({
    data: {
        lessonList: [],
        page: {
            hasNext: !0,
            pageNow: 1
        },
        showLoading: !0
    },
    onLoad: function(a) {
        var t = this;
        1 == a.share && t.setData({
            share: !0
        }), t.setData({
            mername: a.mername,
            category_id: a.category_id,
            shareText: "中公名师公开课栏目【" + a.mername + "】上线，限时免费！"
        }), wx.setNavigationBarTitle({
            title: t.data.mername
        }), this.loadList();
    },
    onShow: function() {
        this.checkPublicListBuy();
    },
    checkPublicListBuy: function() {
        1 == wx.getStorageSync("publicListBuy") && this.loadList();
    },
    onPullDownRefresh: function() {},
    scroll: function(a) {
        var t = this;
        if (!t.data.page.hasNext) return t.setData({
            showLoading: !0,
            page: {
                hasNext: !1,
                pageNow: t.data.page.pageNow
            }
        }), !1;
        setTimeout(function() {
            var a = t.data.page.pageNow;
            a += 1, t.setData({
                page: {
                    hasNext: !0,
                    pageNow: a
                },
                showLoading: !1
            }), t.loadList();
        }, 300);
    },
    loadList: function() {
        var e = this;
        e.setData({
            showLoading: !0
        });
        var s = e.data.category_id, i = e.data.page.pageNow, o = 0;
        t.hasStudentID() && (o = wx.getStorageSync("student_id"));
        var n = e.data.lessonList;
        1 == wx.getStorageSync("publicListBuy") && (n = [], wx.setStorageSync("publicListBuy", !1));
        var g = {
            page: i,
            size: 10,
            student_id: o,
            category_id: s
        };
        a.globalRequest(g, "index/public/categorylist", function(t) {
            if (200 == t.statusCode) if (0 == t.data.retcode) if (e.setData({
                showLoading: !1
            }), t.data.data.length > 0) {
                for (var s = 0; s < t.data.data.length; s++) n.push(t.data.data[s]);
                e.setData({
                    lessonList: n
                }), t.data.data.length < 10 && e.setData({
                    showLoading: !0,
                    page: {
                        hasNext: !1,
                        pageNow: i
                    }
                });
            } else e.setData({
                page: {
                    hasNext: !1,
                    pageNow: i
                }
            }); else a.tip(t.data.message); else a.tip(t.errMsg);
        });
    },
    toDetail: function(a) {
        var t = "../publicdetail/publicdetail?goods_id=" + a.currentTarget.dataset.goods_id;
        wx.navigateTo({
            url: t
        });
    },
    onShareAppMessage: function() {
        return {
            title: this.data.shareText,
            path: "/pages/government/government?share=1&category_id=" + this.data.category_id + "&mername=" + this.data.mername
        };
    },
    goIndex: function() {
        wx.switchTab({
            url: "../index/index"
        });
    }
});