function o(o, e, t) {
    return e in o ? Object.defineProperty(o, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[e] = t, o;
}

var e, t, n = require("../../../biz/groupBuy.js"), a = require("../../../config.js"), r = getApp();

Page({
    data: (t = {
        ReceivePageTextForIos: "",
        grouponid: 0,
        groupInfoId: 0,
        ExpireTimeStamp: 0,
        GoodsList: [],
        UserList: [],
        GroupInfoState: 0,
        GrouponState: 0,
        UserState: 0,
        ShareImageUrl: "",
        RemaindCouponer: 0,
        GrouponSuccessPrice: .01,
        GrouponPrice: 0,
        GoodsName: "",
        IsShowCouponPopup: !0,
        grouponStyleKeyState: "",
        times: "00:00:00"
    }, o(t, "ExpireTimeStamp", 0), o(t, "showBuyCourse", !1), o(t, "loading", !0), o(t, "buyState", a.buyState), 
    o(t, "isHongb", !0), o(t, "isIos", !1), o(t, "GrouponStyle112", {
        "1-1-2": !0
    }), o(t, "GrouponStyle121", {
        "1-2-1": !0
    }), o(t, "GrouponStyle111", {
        "1-1-1": !0
    }), o(t, "GrouponStyle122", {
        "1-2-2": !0,
        "2-2-2": !0
    }), o(t, "GrouponStyle134", (e = {
        "1-1-3": !0,
        "1-2-3": !0,
        "1-1-4": !0,
        "1-2-4": !0,
        "1-3-4": !0,
        "1-3-3": !0,
        "2-3-3": !0,
        "2-3-4": !0,
        "2-2-3": !0,
        "2-2-4": !0
    }, o(e, "1-3-3", !0), o(e, "1-3-4", !0), e)), o(t, "GrouponStyle132", {
        "1-3-2": !0,
        "1-3-1": !0
    }), o(t, "GrouponStyle232", {
        "2-3-1": !0,
        "2-3-2": !0
    }), o(t, "ShareText", ""), o(t, "ReceivePageText", ""), o(t, "ReceivePageGoodsName", ""), 
    o(t, "ifGrouponRule", !1), o(t, "grouponRule", []), o(t, "backgroundImageUrl", ""), 
    o(t, "loadSuccess", !1), o(t, "refundDesc", ""), o(t, "systemIos", !1), t),
    onLoad: function(o) {
        this.setData({
            systemIos: r.globalData.SystemInfo.iOS
        }), o.IsShare && this.setData({
            IsShare: o.IsShare
        });
        var e = this;
        o.formId && this.postCopounTemplate(o.formId);
        var t = o.grouponid, a = 0;
        o.groupInfoId && (a = o.groupInfoId), this.setData({
            grouponid: t,
            groupInfoId: a
        }), wx.showLoading({
            title: "正在加载"
        }), r.checkContextWithShareOptions(o, function() {
            e.activityStatus(), wx.getUserInfo({
                success: function(t) {
                    n.updateWXUserInfo(t.userInfo, function(t) {
                        e.initOptions(o);
                    });
                },
                fail: function(t) {
                    e.initOptions(o);
                }
            });
        });
    },
    postCopounTemplate: function(o) {
        var e = this.getCopounTemplatepUrl();
        n.postCopounTemplate(e, r.globalData.userData.OpenId, o, function(o) {
            console.log(o);
        });
    },
    initOptions: function(o) {
        var e = this;
        console.log(o), console.log("入团1："), 1 == o.IsShare && 0 != e.data.groupInfoId ? (console.log("入团："), 
        console.log(e.data.groupInfoId), console.log(r.globalData.header), e.getUserGroupInfo(e.data.groupInfoId)) : (console.log("header:"), 
        console.log(r.globalData.header), console.log("that.data.grouponid:" + e.data.grouponid), 
        console.log("that.data.groupInfoId:" + e.data.groupInfoId), n.joinGroup(e.data.grouponid, e.data.groupInfoId, function(o) {
            console.log(o);
            var t = o.GroupInfoId;
            o.JoinState;
            e.getUserGroupInfo(t);
        }));
    },
    getUserGroupInfo: function(o) {
        var e = this;
        console.log("groupInfoId的值是：" + o), n.getUserGroupInfo(o, function(o) {
            console.log("信息", o), e.initUserGroupInfo(o), e.startTimer(), e.setData({
                loading: !1
            }), wx.hideLoading();
        }, function(o) {
            wx.hideLoading();
        });
    },
    onAddGrouponJs: function(o) {
        var e = o.detail.formId;
        console.log(e), this.postCopounTemplate(e);
        var t = this;
        wx.showLoading({
            title: "正在提交"
        }), console.log("参团groupInfoId:"), console.log(t.data.groupInfoId), n.joinGroup(t.data.grouponid, t.data.groupInfoId, function(o) {
            console.log(o);
            var e = o.GroupInfoId;
            o.JoinState;
            t.getUserGroupInfo(e);
        });
    },
    onOppenGrouponJs: function(o) {
        var e = o.detail.formId;
        console.log(e), this.postCopounTemplate(e);
        var t = this;
        wx.showLoading({
            title: "正在提交"
        }), n.joinGroup(t.data.grouponid, 0, function(o) {
            console.log(o);
            var e = o.GroupInfoId;
            o.JoinState;
            t.getUserGroupInfo(e);
        });
    },
    onCheckMaterialJs: function() {
        wx.navigateTo({
            url: "../../group/groupDocList/groupDocList"
        });
    },
    initUserGroupInfo: function(o) {
        console.log(o);
        var e = o.GroupInfoId, t = o.GrouponId, n = o.ExpireTimeStamp, a = o.GoodsList, r = 4 - o.UserList.length, i = this.getUserList(o.UserList), u = o.GroupInfoState, s = o.GrouponState, p = o.UserState, g = o.ShareImageUrl, l = o.GrouponSuccessPrice, d = o.GrouponPrice, c = o.GoodsName, f = o.ShareText, I = o.ReceivePageText, h = o.ReceivePageGoodsName, m = s + "-" + u + "-" + p;
        console.log(o);
        var S = o.BackgroundImageUrl, G = o.GrouponRule;
        G && this.setData({
            ifGrouponRule: !0
        }), this.setData({
            groupInfoId: e,
            grouponid: t,
            ExpireTimeStamp: n,
            GoodsList: a,
            UserList: i,
            GroupInfoState: u,
            GrouponState: s,
            UserState: p,
            ShareImageUrl: g,
            GrouponSuccessPrice: l,
            GrouponPrice: d,
            GoodsName: c,
            RemaindCouponer: r,
            grouponStyleKeyState: m,
            ShareText: f,
            ReceivePageText: I,
            ReceivePageGoodsName: h,
            backgroundImageUrl: S,
            grouponRule: G,
            loadSuccess: !0
        });
    },
    startTimer: function() {
        var o = this, e = this;
        this.data.intervalNumber && clearInterval(this.data.intervalNumber);
        var t = setInterval(function() {
            o.data.ExpireTimeStamp <= 1 ? (clearInterval(o.data.intervalNumber), n.getUserGroupInfo(e.data.groupInfoId, function(o) {
                console.log(o), e.initUserGroupInfo(o);
            })) : o.setData({
                times: o.myExpiredTimeCountDown()
            });
        }, 1e3);
        this.data.intervalNumber = t;
    },
    getUserList: function(o) {
        var e = [];
        for (var t in o) {
            if (t > 4) break;
            e.push(o[t]);
        }
        if (e.length < 4) for (var n = {
            IsWaitingUser: !0
        }, a = e.length, r = 0; r < 4 - a; r++) e.push(n);
        return e;
    },
    onGroupEmptyJs: function() {
        this.setData({
            IsShowCouponPopup: !1
        });
    },
    onGroupOthers: function() {
        console.log("onGroupOthers");
    },
    timeMove: function(o) {
        if (!o) return clearInterval(this.data.intervalNumber), !1;
        var e = "00:00:00";
        if (o > -1) {
            var t = Math.floor(o / 3600), n = Math.floor(o / 60) % 60, a = o % 60;
            e = t < 10 ? "0" + t + ":" : t + ":", n < 10 && (e += "0"), e += n + ":", a < 10 && (e += "0"), 
            e += a.toFixed();
        }
        return e;
    },
    myExpiredTimeCountDown: function() {
        return this.data.times = this.timeMove(this.data.ExpireTimeStamp -= 1);
    },
    onReady: function() {},
    onConponBuyJs: function(o) {
        var e = this;
        if (!r.globalData.userData.HasLogin) {
            return r.gotoLogin(""), void (this.data.showBuyCourse = !0);
        }
        wx.showLoading({
            title: "正在生成订单"
        }), this.setData({
            IsShowCouponPopup: !1
        }), n.getGrouponOrderConfirm(this.data.groupInfoId, function(o) {
            console.log(o);
            var t = o.OrderNo, a = o.NotifyAsync;
            if (o.OrderPaymentAmount < 1e-7) return wx.hideLoading(), wx.showLoading({
                title: "正在同步数据"
            }), void e.getUserGroupInfo(e.data.groupInfoId);
            n.getPayWeixinData(r.globalData.userData.OpenId, t, a, function(o) {
                var t = o.PayPartnerInfoNew.timeStamp, n = o.PayPartnerInfoNew.nonceStr, a = o.PayPartnerInfoNew.package, r = o.PayPartnerInfoNew.paySign, i = o.PayPartnerInfoNew.signType;
                wx.hideLoading(), wx.requestPayment({
                    timeStamp: t,
                    nonceStr: n,
                    package: a,
                    signType: i,
                    paySign: r,
                    success: function(o) {
                        console.log(o), wx.showToast({
                            title: "支付成功",
                            duration: 1500
                        }), wx.showLoading({
                            title: "正在同步数据"
                        }), e.getUserGroupInfo(e.data.groupInfoId);
                    },
                    fail: function(o) {
                        console.log(o), wx.showToast({
                            title: "支付失败",
                            image: "/images/icon/icon_tip.png",
                            duration: 2e3,
                            mask: !0
                        });
                    }
                });
            }), wx.hideLoading();
        });
    },
    onShow: function() {
        var o = this;
        this.data.showBuyCourse && r.globalData.userData.HasLogin && (this.data.showBuyCourse = !1, 
        n.GetGroupInfoId(o.data.grouponid, function(e) {
            var t = e.GroupInfoId;
            console.log(t + "----" + o.data.groupInfoId), t == o.data.groupInfoId ? o.onConponBuyJs() : (o.data.groupInfoId = e.GroupInfoId, 
            n.getUserGroupInfo(o.data.groupInfoId, function(e) {
                console.log(e), o.initUserGroupInfo(e);
            }));
        }));
    },
    onHide: function() {},
    onUnload: function() {
        clearInterval(this.data.intervalNumber);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    getCopounTemplatepUrl: function() {
        var o = "pages/group/groupBuy/groupBuy";
        return o += "?" + r.generateShareOptions();
    },
    getShareAppUrl: function() {
        var o = this, e = "/pages/group/groupBuy/groupBuy";
        return e += "?grouponid=" + o.data.grouponid, e += "&groupInfoId=" + o.data.groupInfoId, 
        e += "&" + r.generateShareOptions();
    },
    onShareAppMessage: function() {
        this.setData({
            IsShowCouponPopup: !1
        });
        var o = this.getShareAppUrl();
        console.log(o);
        var e = "送你一份" + r.globalData.subject.SubjectParentName + "资料包，点击领取>";
        return "" != this.data.ShareText && (e = this.data.ShareText), {
            title: e,
            imageUrl: this.data.ShareImageUrl,
            path: o
        };
    },
    goBackIndex: function() {
        wx.reLaunch({
            url: "../../index/index"
        });
    },
    activityStatus: function() {
        var o = this;
        n.getGroupon(function(e) {
            o.data.hongBaoLaoding = !0;
            var t = e.HasGroupon;
            o.data.buyState && o.setData({
                isHongb: t
            }), console.log(e, "getGroupongetGroupongetGroupongetGroupongetGroupon"), console.log(e.Groupon.ReceivePageTextForIos, "44444444"), 
            o.setData({
                ReceivePageTextForIos: e.Groupon.ReceivePageTextForIos,
                isIos: !!r.globalData.SystemInfo.iOS
            });
        });
    }
});