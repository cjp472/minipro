require("../../../helper/practiceTreeHelper.js");

var e = getApp(), a = (require("../../../biz/practice.js"), require("../../../config.js")), t = (require("../../../utils/tourist.js"), 
require("../../../biz/groupBuy.js")), o = (require("../../../utils/getSetStorage.js"), 
require("../../../biz/chapter.js"), require("../../../helper/treeHelper.js"), require("../../../biz/vipPractice.js")), n = require("../../../utils/xnSDK.js"), i = require("../../../utils/xnUtils.js");

Page({
    data: {
        buyState: a.buyState,
        theme: a.UIConfig.Theme,
        progress: {
            ExamSiteId: 0
        },
        iPhoneX: e.globalData.SystemInfo.iPhoneX,
        toUrl: "",
        courseRefresh: !1,
        fineInfoData: {
            OrderState: 1
        },
        fineCourseInfo: [],
        expireexpireTime: "",
        remainingDays: "",
        examType: "",
        SaleDiscount: "",
        PaperOrderConfirm: "",
        options: [],
        subTitle: "",
        CourseInfoUrl: "",
        IsShare: "",
        IOS: e.globalData.SystemInfo.iOS
    },
    onLoad: function(a) {
        var r = this;
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 6e3,
            mask: !0
        }), this.data.XNConfigInfo = i.getXNConfigInfo(), n.callTrail({
            originId: this.data.XNConfigInfo.AppId,
            siteId: "kf_9644"
        }), e.checkContextWithShareOptions(a, function() {
            if (r.data.examType = a.examType, 9 == a.examType) {
                var n = e.globalData.ExamType.fineTest;
                o.ExercisePapersData("/api/Question/LastNPapers", function(e) {
                    wx.hideToast(), r.setData({
                        fineInfoData: e,
                        examType: n,
                        CourseInfoUrl: "/api/Question/LastNPapers"
                    }), r.finePaperInfo();
                    var o = (10 * r.data.fineInfoData.SaleDiscount).toFixed(1);
                    r.setData({
                        SaleDiscount: o,
                        orderConfirmUrl: "/api/vip/LastNOrderConfirm",
                        options: a,
                        subTitle: "精品3套卷"
                    }), a.IsShare && t.getGroupon(function(e) {
                        r.setData({
                            ifHongb: e.HasGroupon,
                            openGroupId: e.Groupon.Id,
                            IsShare: a.IsShare
                        });
                    });
                }), wx.setNavigationBarTitle({
                    title: "精品3套卷"
                });
            } else if (10 == a.examType) {
                var i = e.globalData.ExamType.denseTest;
                o.ExercisePapersData("/api/Question/TopicPapers", function(e) {
                    wx.hideToast(), a.IsShare && t.getGroupon(function(e) {
                        r.setData({
                            ifHongb: e.HasGroupon,
                            openGroupId: e.Groupon.Id,
                            IsShare: a.IsShare
                        });
                    }), r.setData({
                        fineInfoData: e,
                        examType: i,
                        CourseInfoUrl: "/api/Question/TopicPapers"
                    }), r.finePaperInfo();
                    var o = 10 * r.data.fineInfoData.SaleDiscount;
                    r.setData({
                        SaleDiscount: o,
                        orderConfirmUrl: "/api/vip/TopicPaperOrderConfirm",
                        options: a,
                        subTitle: "提分密卷"
                    });
                }), wx.setNavigationBarTitle({
                    title: "提分密卷"
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    finePaperInfo: function() {
        var e = this, a = e.data.fineInfoData.Papers, t = e.data.fineInfoData.ExpireDesc, o = t.substring(0, 10), n = e.DateMinus(t);
        e.setData({
            fineCourseInfo: a,
            expireexpireTime: o,
            remainingDays: n
        });
    },
    formSubmit: function(a) {
        var t = this.data.examType, o = a.detail.target.dataset.paperid, n = a.detail.formId;
        e.globalData.ExamSiteId = o;
        var i = "../../../pages/papers/papers?examType=" + t + "&paperId=" + o + "&formId=" + n + "&questionId=" + e.globalData.MockPaperCache.questionId;
        wx.navigateTo({
            url: i
        });
    },
    DateMinus: function(e) {
        var e = new Date(e.replace(/-/g, "/")), a = new Date(), t = e.getTime() - a.getTime();
        return parseInt(t / 864e5);
    },
    buyPapersRefresh: function() {
        var e = this, a = e.data.CourseInfoUrl;
        o.ExercisePapersData(a, function(a) {
            e.setData({
                fineInfoData: a,
                CourseInfoUrl: ""
            });
        });
    },
    payCourseJs: function() {
        if (e.globalData.SystemInfo.iOS) wx.showModal({
            title: "请下载万题库APP购买",
            content: "基于微信的运营规范，小程序暂不支持当前商品的购买，请下载万题库APP购买",
            showCancel: !1,
            confirmText: "知道了",
            success: function(e) {}
        }); else {
            var a = this;
            if (!e.globalData.userData.HasLogin) {
                return e.gotoLogin(""), void (this.data.showBuyCourse = !0);
            }
            if (0 == this.data.fineInfoData.OrderState) {
                wx.showLoading({
                    title: "正在生成订单"
                });
                var t = a.data.PaperOrderConfirm;
                console.log("PaperOrderConfirm~~"), console.log(t), console.log(o.PaperOrderConfirm);
                var n = a.data.orderConfirmUrl;
                o.paperOrderConfirm(n, function(t) {
                    var n = t.OrderNo, i = t.NotifyAsync;
                    if (t.OrderPaymentAmount <= 1e-7) return wx.hideToast(), a.data.fineInfoData.IsBuy = 1, 
                    void a.setData({
                        fineInfoData: a.data.fineInfoData
                    });
                    o.getPayWeixinData(e.globalData.userData.OpenId, n, i, function(e) {
                        var t = e.PayPartnerInfoNew.timeStamp, o = e.PayPartnerInfoNew.nonceStr, n = e.PayPartnerInfoNew.package, i = e.PayPartnerInfoNew.paySign, r = e.PayPartnerInfoNew.signType;
                        console.log("timeStamp : " + t), console.log("nonceStr : " + o), console.log("packages : " + n), 
                        console.log("paySign : " + i), console.log("signType : " + r), wx.hideToast(), wx.requestPayment({
                            timeStamp: t,
                            nonceStr: o,
                            package: n,
                            signType: r,
                            paySign: i,
                            success: function(e) {
                                console.log(e), wx.showToast({
                                    title: "支付成功",
                                    duration: 1500
                                }), a.data.fineInfoData.IsBuy = 1, a.setData({
                                    fineCourseInfo: a.data.fineCourseInfo
                                }), a.buyPapersRefresh();
                            },
                            fail: function(e) {
                                console.log(e), wx.showToast({
                                    title: "支付失败",
                                    image: "/images/icon/icon_tip.png",
                                    duration: 2e3,
                                    mask: !0
                                });
                            }
                        });
                    });
                });
            }
        }
    },
    onShareAppMessage: function() {
        var a = this, t = "/pages/vipPractice/finePapers/finePapers", o = e.generateShareOptions() + "&examType=" + this.data.examType;
        return t += "?" + o, console.log(o), {
            title: e.globalData.subject.SubjectName + a.data.subTitle,
            path: t
        };
    },
    goBackIndex: function() {
        wx.reLaunch({
            url: "../../index/index"
        });
    },
    formSubmitHongBao: function(e) {
        var a = e.detail.formId, t = this.data.openGroupId;
        wx.navigateTo({
            url: "../../group/groupBuy/groupBuy?formId=" + a + "&grouponid=" + t
        });
    }
});