var e = require("../../../config.js"), t = require("../../../biz/vipPractice.js"), a = require("../../../biz/groupBuy.js"), o = require("../../../utils/xnSDK.js"), r = require("../../../utils/xnUtils.js"), i = getApp();

Page({
    data: {
        buyState: e.buyState,
        configColor: e.UIConfig.color,
        theme: e.UIConfig.Theme,
        FrequencyTest: "",
        FrequencyWrong: "",
        IsSaleSuccessRefresh: !1,
        BuyState: 0,
        ifHongb: "",
        openGroupId: "",
        IsShare: "",
        color: e.UIConfig.color,
        isIos: i.globalData.SystemInfo.iOS,
        XNConfigInfo: r.getXNConfigInfo()
    },
    _data: {
        userClick: !1
    },
    onLoad: function(e) {
        var r = this;
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 6e3,
            mask: !0
        }), o.callTrail({
            originId: this.data.XNConfigInfo.AppId,
            siteId: "kf_9644"
        }), i.checkContextWithShareOptions(e, function() {
            t.highFrequencyTest(function(e) {
                r.BuyState(e), r.setData({
                    FrequencyTest: e
                });
            }), t.highFrequencyWrong(function(e) {
                r.BuyState(e), r.setData({
                    FrequencyWrong: e
                }), wx.hideToast();
            }), e.IsShare && a.getGroupon(function(t) {
                r.setData({
                    ifHongb: t.HasGroupon,
                    openGroupId: t.Groupon.Id,
                    IsShare: e.IsShare
                });
            });
        });
    },
    BuyState: function(e) {
        if (e && 1 == e.BuyState) return this.data.BuyState = 1;
    },
    onShow: function() {
        var e = this, a = this._data.userClick, i = this.data.IsSaleSuccessRefresh;
        (i || a) && (t.highFrequencyTest(function(t) {
            e.BuyState(t), e.setData({
                FrequencyTest: t
            });
        }), t.highFrequencyWrong(function(t) {
            e.BuyState(t), e.setData({
                FrequencyWrong: t
            }), wx.hideToast();
        }), i || a || e.buyCourse()), e.data.XNConfigInfo = r.getXNConfigInfo(), o.callTrail({
            originId: e.data.XNConfigInfo.AppId,
            siteId: "kf_9644"
        });
    },
    buyCourse: function(e) {
        if (!this.data.isIos) {
            var t = e.currentTarget.dataset.id, a = i.globalData.userData.HasLogin, o = "../../chaterVideoOrder/chaterVideoOrder?type=Frequency&frequencyId=" + t + "&BuyState=" + this.data.BuyState;
            if (!a) return this._data.userClick = !0, void i.gotoLogin(o, 1);
            wx.navigateTo({
                url: o
            });
        }
    },
    formSubmit: function(t) {
        var a = t.target.dataset.id, o = t.detail.target.dataset, r = o.buyState, n = o.examFrequency, s = o.userTotalCount, u = o.totalCount;
        if (1 === r) if (this._data.userClick = !0, u == s) wx.showModal({
            title: "",
            content: "恭喜您：本部分已经做完，距离成功又近了一步！",
            confirmText: "再刷一次",
            cancelColor: "#cccccc",
            confirmColor: e.UIConfig.color,
            success: function(e) {
                if (e.confirm) {
                    var t = i.globalData.ExamType.highFreTest;
                    i.globalData.HightFreMode.userCount = 0, i.globalData.HightFreMode.TotalCount = u;
                    var o = "../../papers/papers?examFrequency=" + n + "&highFreType=" + a + "&examType=" + t + "&isReset=1";
                    console.log(o), wx.navigateTo({
                        url: o
                    });
                }
            },
            fail: function(e) {
                console.log(e);
            }
        }); else {
            var c = i.globalData.ExamType.highFreTest;
            i.globalData.HightFreMode.userCount = s, i.globalData.HightFreMode.TotalCount = u;
            var g = "../../papers/papers?examFrequency=" + n + "&highFreType=" + a + "&examType=" + c + "&isReset=0";
            console.log(g), wx.navigateTo({
                url: g
            });
        }
    },
    goBackIndex: function() {
        wx.reLaunch({
            url: "../../index/index"
        });
    },
    formSubmitHongBao: function(e) {
        var t = e.detail.formId, a = this.data.openGroupId;
        wx.navigateTo({
            url: "../../group/groupBuy/groupBuy?formId=" + t + "&grouponid=" + a
        });
    },
    onShareAppMessage: function() {
        var e = this, t = "/pages/vipPractice/highFrePapers/highFrePapers";
        return t += "?" + i.generateShareOptions(), console.log(t), {
            title: i.globalData.subject.SubjectName + "高频数据",
            path: t,
            success: function(t) {
                getSetStorage.setStorage(i.globalData.ExamType.chapterTest), e.setData({
                    zjShareSuccess: !0
                }), e.data.sharePractice && (e.setData({
                    sharePractice: !1
                }), wx.navigateTo({
                    url: e.data.toUrl
                }));
            },
            fail: function(e) {}
        };
    }
});