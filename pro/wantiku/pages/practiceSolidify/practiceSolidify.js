var e = require("../../biz/practice.js"), t = getApp(), a = require("../../config.js"), o = require("../../utils/tourist.js"), i = require("../../biz/groupBuy.js"), n = require("../../utils/getSetStorage.js");

Page({
    data: {
        buyState: a.buyState,
        theme: a.UIConfig.Theme,
        paperEntityList: [],
        sharePractice: !1,
        mkShareSuccess: !1,
        shareCallBack: !1,
        toUrl: "",
        courseShareName: "巩固模考"
    },
    onLoad: function(a) {
        var o = this;
        wx.showLoading({
            title: "正在加载"
        }), t.checkContextWithShareOptions(a, function() {
            e.getPracticeSolidifyData(function(e) {
                console.log(e);
                var t = o.getPaperEntityList(e);
                o.setData({
                    paperEntityList: t
                }), wx.hideLoading();
            });
            1 == a.IsShare && i.getGroupon(function(e) {
                o.setData({
                    ifHongb: e.HasGroupon,
                    openGroupId: e.Groupon.Id,
                    IsShare: a.IsShare
                });
            });
        });
        var r = n.getStorageSync(t.globalData.ExamType.solidifyTest);
        console.log(r), o.setData({
            mkShareSuccess: r
        });
    },
    getPaperEntityList: function(e) {
        return e.Papers;
    },
    formSubmit: function(e) {
        console.log(e);
        var a = e.detail.target.dataset.paperId, i = t.globalData.ExamType.solidifyTest, n = "../../pages/papers/papers?examType=" + i + "&paperId=" + a + "&formId=" + e.detail.formId + "&questionId=" + t.globalData.MockPaperCache.questionId;
        0 == o.availabilityQuantity(i) ? t.gotoLogin(n, 1) : wx.navigateTo({
            url: n
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var e = this, a = "/pages/practiceSolidify/practiceSolidify";
        return a += "?" + t.generateShareOptions(), console.log(a), n.setStorage(t.globalData.ExamType.solidifyTest), 
        e.setData({
            mkShareSuccess: !0,
            shareCallBack: !0
        }), {
            title: t.globalData.subject.SubjectName + "巩固模考",
            path: a,
            success: function(e) {},
            fail: function(e) {}
        };
    },
    formSubmitHongBao: function(e) {
        var t = e.detail.formId, a = this.data.openGroupId;
        wx.navigateTo({
            url: "../group/groupBuy/groupBuy?formId=" + t + "&grouponid=" + a
        });
    },
    goBackIndex: function() {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    onbtnShera: function() {},
    shareBoxBackground: function() {
        console.log("点击背景"), this.setData({
            sharePractice: !1
        });
    }
});