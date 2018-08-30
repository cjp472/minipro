require("../../../utils/util.js");

var t = require("../../../config.js"), e = require("../../../biz/groupBuy.js"), a = getApp(), o = require("../../../biz/vipPractice.js"), i = require("../../../utils/xnSDK.js"), n = require("../../../utils/xnUtils.js");

Page({
    data: {
        buyState: t.buyState,
        theme: t.UIConfig.Theme,
        questionsList: {
            OrderState: 1
        },
        progress: "",
        burningDay: "",
        burningHr: "",
        burningMin: "",
        toUrl: "",
        options: "",
        pdfProgress: "",
        sumSize: "",
        showHId: !1,
        locationSizeCach: 0,
        IOS: a.globalData.SystemInfo.iOS
    },
    onLoad: function(t) {
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 6e3,
            mask: !0
        });
        var s = this;
        s.setData({
            options: t
        }), this.data.XNConfigInfo = n.getXNConfigInfo(), i.callTrail({
            originId: this.data.XNConfigInfo.AppId,
            siteId: "kf_9644"
        }), a.checkContextWithShareOptions(t, function() {
            o.ExercisePapersData("/api/Question/SprintPapers", function(a) {
                wx.hideToast(), s.setData({
                    questionsList: a
                }), t.IsShare && e.getGroupon(function(e) {
                    s.setData({
                        ifHongb: e.HasGroupon,
                        openGroupId: e.Groupon.Id,
                        IsShare: t.IsShare
                    });
                }), console.log("~~~~"), console.log(a), s.countDown(), s.getProgress();
            });
        }), wx.setNavigationBarTitle({
            title: "阅后即焚"
        });
    },
    onReady: function() {},
    onShow: function() {
        console.log("onShow");
        this.data.showBuyCourse && a.globalData.userData.HasLogin && (this.payCourseJs(), 
        this.data.showBuyCourse = !1), wx.setNavigationBarTitle({
            title: "阅后即焚"
        });
    },
    buyBurningPapersRefresh: function() {
        var t = this;
        o.ExercisePapersData("/api/Question/SprintPapers", function(e) {
            t.setData({
                questionsList: e
            }), t.getProgress();
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = "/pages/vipPractice/burningPapers/burningPapers";
        return t += "?" + (a.generateShareOptions() + "&examType=" + a.globalData.ExamType.burningTest), 
        {
            title: a.globalData.subject.SubjectName + "阅后即焚",
            path: t
        };
    },
    getProgress: function() {
        var t = Date.parse(new Date()), e = new Date(t).getTime(), a = this.data.questionsList.Papers[0].ShowDateFormat.replace(new RegExp("-", "gm"), "/"), o = new Date(a).getTime(), i = this.data.questionsList.ExpireDesc.replace(new RegExp("-", "gm"), "/"), n = new Date(i).getTime(), s = -(100 - parseInt((e - o) / (n - o) * 100)) + "%";
        this.setData({
            progress: s
        });
    },
    countDown: function() {
        var t = this, e = this.data.questionsList.ExpireDesc.replace(new RegExp("-", "gm"), "/"), a = new Date(e).getTime() / 1e3 - Date.parse(new Date()) / 1e3;
        this.data.intervalNumber && clearInterval(this.data.intervalNumber);
        var o = setInterval(function() {
            var e = a, i = this.formatNumber(Math.floor(e / 3600 / 24)), n = this.formatNumber(Math.floor((e - 3600 * i * 24) / 3600)), s = this.formatNumber(Math.floor((e - 3600 * i * 24 - 3600 * n) / 60));
            this.formatNumber(e - 3600 * i * 24 - 3600 * n - 60 * s);
            this.setData({
                burningDay: i,
                burningHr: n,
                burningMin: s
            }), t.getProgress(), --a < 0 && clearInterval(o);
        }.bind(this), 1e3);
        this.data.intervalNumber = o;
    },
    formatNumber: function(t) {
        return t.toString().replace(/^(\d)$/, "0$1");
    },
    buyCourse: function() {
        if (!a.globalData.userData.HasLogin) {
            return a.gotoLogin(""), void (this.data.showBuyCourse = !0);
        }
        wx.navigateTo({
            url: "../../user/userLogin"
        });
    },
    formSubmit: function(t) {
        console.log(t);
        var e = a.globalData.ExamType.burningTest, o = t.detail.target.dataset.paperid, i = t.detail.formId;
        a.globalData.ExamSiteId = o;
        var n = "../../../pages/papers/papers?examType=" + e + "&paperId=" + o + "&formId=" + i + "&questionId=" + a.globalData.MockPaperCache.questionId;
        wx.navigateTo({
            url: n
        });
    },
    payCourseJs: function() {
        if (a.globalData.SystemInfo.iOS) wx.showModal({
            title: "请下载万题库APP购买",
            content: "基于微信的运营规范，小程序暂不支持当前商品的购买，请下载万题库APP购买",
            showCancel: !1,
            confirmText: "知道了",
            success: function(t) {}
        }); else {
            var t = this;
            if (!a.globalData.userData.HasLogin) {
                return a.gotoLogin(""), void (this.data.showBuyCourse = !0);
            }
            if (0 == this.data.questionsList.OrderState) {
                wx.showLoading({
                    title: "正在生成订单"
                });
                o.paperOrderConfirm("/api/vip/SprintOrderConfirm", function(e) {
                    var i = e.OrderNo, n = e.NotifyAsync;
                    if (e.OrderPaymentAmount <= 1e-7) return wx.hideToast(), t.data.questionsList.IsBuy = 1, 
                    void t.setData({
                        questionsList: t.data.questionsList
                    });
                    o.getPayWeixinData(a.globalData.userData.OpenId, i, n, function(e) {
                        var a = e.PayPartnerInfoNew.timeStamp, o = e.PayPartnerInfoNew.nonceStr, i = e.PayPartnerInfoNew.package, n = e.PayPartnerInfoNew.paySign, s = e.PayPartnerInfoNew.signType;
                        console.log("timeStamp : " + a), console.log("nonceStr : " + o), console.log("packages : " + i), 
                        console.log("paySign : " + n), console.log("signType : " + s), wx.hideToast(), wx.requestPayment({
                            timeStamp: a,
                            nonceStr: o,
                            package: i,
                            signType: s,
                            paySign: n,
                            success: function(e) {
                                console.log(e), wx.showToast({
                                    title: "支付成功",
                                    duration: 1500
                                }), t.data.questionsList.IsBuy = 1, t.setData({
                                    questionsList: t.data.questionsList
                                }), t.buyBurningPapersRefresh();
                            },
                            fail: function(t) {
                                console.log(t), wx.showToast({
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
    burningVideoOpenApp: function() {
        wx.showModal({
            content: "请下载app查看当前资料",
            confirmText: "知道了",
            showCancel: !1
        });
    },
    downLoadFile: function(t) {
        var e = this, a = this;
        console.log("打开地址"), console.log(t.detail.target.dataset.tiphref);
        var o = t.detail.target.dataset.tiphref, i = t.detail.target.dataset.tiptext;
        o ? (a.setData({
            showHId: !0,
            isdelSize: !0
        }), wx.setNavigationBarTitle({
            title: i.toString()
        }), wx.downloadFile({
            url: o,
            success: function(t) {
                wx.openDocument({
                    filePath: t.tempFilePath,
                    success: function() {
                        a.setData({
                            showHId: !1
                        });
                    },
                    fail: function() {
                        wx.showModal({
                            title: "提示",
                            showCancel: !1,
                            content: "文件打开失败，请重试！",
                            success: function(t) {}
                        });
                    }
                });
            }
        }).onProgressUpdate(function(t) {
            var o = t.totalBytesExpectedToWrite, i = Math.floor(o / 1024);
            if (e.data.isdelSize && (e.data.isdelSize = !1, e.data.locationSizeCach = e.data.locationSizeCach + o, 
            console.log("----- this.data.locationSizeCach------"), console.log(e.data.locationSizeCach)), 
            i >= 1024) {
                i = (i / 1024).toFixed(1);
                a.setData({
                    unit: "M",
                    sumSize: i
                });
            } else a.setData({
                unit: "KB"
            });
            a.setData({
                pdfProgress: t.progress,
                sumSize: i
            });
        })) : a.burningVideoOpenApp();
    },
    goBackIndex: function() {
        wx.reLaunch({
            url: "../../index/index"
        });
    },
    formSubmitHongBao: function(t) {
        var e = t.detail.formId, a = this.data.openGroupId;
        wx.navigateTo({
            url: "../../group/groupBuy/groupBuy?formId=" + e + "&grouponid=" + a
        });
    }
});