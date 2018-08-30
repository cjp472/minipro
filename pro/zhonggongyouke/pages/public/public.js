var t = getApp(), a = require("../../utils/common.js"), e = require("../../utils/login.js");

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
        }
    },
    onLoad: function() {
        this.loadBanner(), this.loadList();
    },
    onShow: function() {
        this.checkPublicBuy();
    },
    onPullDownRefresh: function() {
        this.loadBanner(), this.loadList(), wx.stopPullDownRefresh();
    },
    onReachBottom: function(t) {},
    checkPublicBuy: function() {
        t.globalData.publicBuyNum;
        1 == wx.getStorageSync("publicBuy") && (1, this.loadList());
    },
    loadBanner: function() {
        var t = this, e = {
            banner_type: "public"
        };
        a.globalRequest(e, "index/live/bannerlist", function(e) {
            200 == e.statusCode ? 0 == e.data.retcode ? (t.setData({
                bannerList: e.data.data
            }), 1 == e.data.data.length && t.setData({
                bannerset: {
                    indicatorDots: !1
                }
            })) : a.tip(e.data.message) : a.tip(e.errMsg);
        });
    },
    clickBanner: function(t) {
        var e = {
            banner_id: t.currentTarget.dataset.banner_id
        };
        a.globalRequest(e, "index/util/bannerclick", function(t) {
            200 == t.statusCode ? 0 == t.data.retcode || a.tip(t.data.message) : a.tip(t.errMsg);
        });
        var n = t.currentTarget.dataset.url;
        if ("" == n) return !1;
        wx.setStorageSync("url", n);
        wx.navigateTo({
            url: n
        });
    },
    loadList: function() {
        wx.setStorageSync("publicBuy", !1);
        var t = this, n = 0;
        e.hasStudentID() && (n = wx.getStorageSync("student_id"));
        var i = {
            student_id: n
        };
        a.globalRequest(i, "index/public/courselist", function(e) {
            200 == e.statusCode ? 0 == e.data.retcode ? t.setData({
                courselist: e.data.data
            }) : a.tip(e.data.message) : a.tip(e.errMsg);
        });
    },
    goList: function(t) {
        var a = "../government/government?category_id=" + t.currentTarget.dataset.category_id + "&mername=" + t.currentTarget.dataset.mername;
        wx.navigateTo({
            url: a
        });
    },
    toDetail: function(t) {
        var a = "../publicdetail/publicdetail?goods_id=" + t.currentTarget.dataset.goods_id;
        wx.navigateTo({
            url: a
        });
    },
    onShareAppMessage: function() {
        return {
            title: "中公名师公开课，课程好免费看！推荐给你！",
            path: "pages/public/public"
        };
    }
});