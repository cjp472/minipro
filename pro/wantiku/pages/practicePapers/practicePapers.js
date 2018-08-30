var t = require("../../biz/practice.js"), a = getApp(), o = require("../../config.js"), e = require("../../utils/tourist.js"), n = require("../../biz/groupBuy.js"), s = require("../../utils/getSetStorage.js");

Page({
    data: {
        IsUnlock: "",
        showModal: !1,
        showModalUnlock: !1,
        isUnlockingState: !1,
        buyState: o.buyState,
        theme: o.UIConfig.Theme,
        paperEntityList: [],
        sharePractice: !1,
        ztShareSuccess: !1,
        shareCallBack: !1,
        toUrl: "",
        courseShareName: "真题模考"
    },
    onLoad: function(o) {
        var e = this;
        wx.showLoading({
            title: "正在加载"
        }), a.checkContextWithShareOptions(o, function() {
            t.getPracticePaperData(function(t) {
                console.log(t);
                var a = e.getPaperEntityList(t);
                e.setData({
                    paperEntityList: a,
                    IsUnlock: t.IsUnLock
                }), wx.hideLoading();
            });
            o.IsShare && n.getGroupon(function(t) {
                e.setData({
                    ifHongb: t.HasGroupon,
                    openGroupId: t.Groupon.Id,
                    IsShare: o.IsShare
                });
            });
        });
        var i = s.getStorageSync(a.globalData.ExamType.zhentiTest);
        e.setData({
            ztShareSuccess: i
        });
    },
    getPaperEntityList: function(t) {
        return t.EntityList;
    },
    formSubmit: function(t) {
        console.log(t);
        var o = this, n = t.detail.formId, s = t.detail.target.dataset, i = s.paperId, r = s.islock, c = a.globalData.ExamType.zhentiTest;
        if (!r || o.data.IsUnlock || a.globalData.userData.HasLogin) {
            var l = r && !this.data.IsUnlock ? "../../pages/couresUnlock/couresUnlock?courseType=1" : "../../pages/papers/papers?examType=" + c + "&paperId=" + i + "&formId=" + n + '"&questionId=' + a.globalData.MockPaperCache.questionId;
            o.setData({
                toUrl: l
            }), 0 == e.availabilityQuantity(c) ? a.gotoLogin(l, 1) : wx.navigateTo({
                url: l
            });
        } else {
            wx.showModal({
                content: "请登陆后解锁免费课程",
                cancelColor: "#7a7a7a",
                confirmColor: "#6fce29",
                success: function(t) {
                    t.confirm ? a.gotoLogin("", 4) : t.cancel && console.log("用户点击取消");
                }
            });
        }
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        this.data.isUnlockingState ? wx.showToast({
            title: "解锁成功",
            image: "/images/papers/success.png",
            duration: 2e3,
            mask: !0,
            success: function(o) {
                console.log("刷新接口"), t.updatedUnlockMaster(function(t) {
                    a.setData({
                        IsUnlock: t.MsgCode,
                        isUnlockingState: !1
                    });
                });
            }
        }) : a.setData({
            modalData: {
                title: "解锁失败",
                content: "成功添加后即可解锁，请再试一次"
            },
            showModal: a.data.showModalUnlock
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this, o = "/pages/practicePapers/practicePapers";
        return o += "?" + a.generateShareOptions(), console.log(o), s.setStorage(a.globalData.ExamType.zhentiTest), 
        t.setData({
            ztShareSuccess: !0,
            shareCallBack: !0
        }), {
            title: a.globalData.subject.SubjectName + "真题模考",
            path: o,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    formSubmitHongBao: function(t) {
        var a = t.detail.formId, o = this.data.openGroupId;
        wx.navigateTo({
            url: "../group/groupBuy/groupBuy?formId=" + a + "&grouponid=" + o
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
    },
    hideModal: function() {
        this.setData({
            showModal: !1,
            showModalUnlock: !1
        });
    }
});