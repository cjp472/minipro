var t = Object.assign || function(t) {
    for (var o = 1; o < arguments.length; o++) {
        var e = arguments[o];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    }
    return t;
}, o = require("../../config.js"), e = require("../../biz/groupVip.js"), n = getApp();

Page({
    data: {
        loaded: !1,
        theme: o.UIConfig.Theme,
        courseInfo: {},
        groupInfo: {},
        IsButtonState: !1,
        userDefaultfAvatar: "http://img02.exam8.com/img2013/wantiku/paihang/default_rank_head.png",
        times: "00:00:00",
        grounpStates11: {
            "1-1": !0
        },
        grounpStates13: {
            "1-2": !0,
            "1-3": !0,
            "2-3": !0
        },
        grounpStates21: {
            "2-1": !0
        },
        grounpStates22: {
            "2-2": !0
        },
        grounpStates3: {
            "3-1": !0,
            "3-2": !0,
            "3-3": !0
        },
        grounpStates31: {
            "3-1": !0
        },
        grounpStates32: {
            "3-2": !0
        },
        grounpStates33: {
            "3-3": !0
        },
        grounpStates4: {
            "4-4": !0
        },
        showBuyCourse: !1,
        isJoinGroup: !1,
        refundDesc: ""
    },
    onLoad: function(t) {
        var o = this;
        console.log(o.data.systemIos), n.checkContextWithShareOptions(t, function() {
            o.setData({
                options: t
            }), o.initPage(), t.bulkPurchase && o.joinGroup();
        }), t.IsShare && o.setData({
            IsShare: t.IsShare
        });
    },
    initPage: function() {
        var t = this, o = this.data.options.courseId;
        this.GetCourseInfo(o).then(function(o) {
            t.initCourseInfo(o), t.GetGroupInfo().then(function(o) {
                t.initGroupInfo(o);
            });
        }).catch(function() {
            wx.switchTab({
                url: "/pages/vipCourses/vipCourses"
            });
        });
    },
    GetCourseInfo: function(t) {
        return new Promise(function(o, n) {
            e.GetCourseInfo({
                courseId: t
            }, function(t) {
                "1" == t.MsgCode ? o(t) : n();
            }, function() {
                n();
            });
        });
    },
    initCourseInfo: function(o) {
        if ("" == o.Data.SaleInfo) {
            var e = parseInt((o.Data.CoursePrice - o.Data.TuanVipPrice) / o.Data.CoursePrice * 100), n = o.Data.CourseName;
            wx.setNavigationBarTitle({
                title: n
            }), this.setData({
                courseInfo: t({}, o.Data, {
                    Discount: e
                })
            });
        } else wx.switchTab({
            url: "/pages/vipCourses/vipCourses"
        });
    },
    GetGroupInfo: function() {
        var t = this.data.options.groupinfoId;
        return new Promise(function(o, n) {
            e.GetGroupInfo({
                groupinfoId: t
            }, function(t) {
                1 === t.MsgCode && (o(t), wx.hideLoading());
            }, function() {});
        });
    },
    initGroupInfo: function(o) {
        var e = this.data.isJoinGroup, n = this.data.grounpStates13, a = this.data.courseInfo, r = o.UserList.length, i = "";
        if (this.startTimer(), o.RefundDesc && this.setData({
            refundDesc: o.RefundDesc
        }), o.SuccessCount > o.UserList.length && o.UserList.length > 0) {
            o.remainNumber = o.SuccessCount - o.UserList.length;
            for (var s = r; s < o.SuccessCount; s++) o.UserList.push({
                UserId: null
            });
        }
        return i = a && "1" == a.IsBuy && "1" == o.UserState ? "3-" + o.GroupInfoState : o.UserState + "-" + o.GroupInfoState, 
        e && (i = "4-4"), this.setData({
            groupInfo: o,
            grouponStyleKeyState: i,
            options: t({}, this.data.options, {
                groupinfoId: o.GroupInfoId
            })
        }), n[i];
    },
    userJoinGrop: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, e = this.data.groupInfo, a = this.data.options.courseId;
        n.globalData.userData.HasLogin;
        this.setData({
            showBuyCourse: !1,
            IsButtonState: !1
        }), 2 != e.UserState && (1 == e.UserState && 1 == e.GroupInfoState && this.joinGroup(o), 
        (1 != e.GroupInfoState || t) && wx.showModal({
            showCancel: !1,
            confirmText: "我知道了",
            content: "当前拼团已结束，请重新开团后购买",
            success: function(t) {
                t.confirm && wx.redirectTo({
                    url: "/pages/vipCoursesDetail/vipCoursesDetail?courseId=" + a + "&homeIcon=1"
                });
            }
        }));
    },
    startTimer: function() {
        var t = this;
        this.data.intervalNumber && clearInterval(this.data.intervalNumber);
        var o = setInterval(function() {
            t.data.ExpireTimeStamp <= 1 ? (t.GetGroupInfo().then(function(o) {
                t.initGroupInfo(o);
            }), clearInterval(t.data.intervalNumber)) : t.setData({
                times: t.myExpiredTimeCountDown()
            });
        }, 1e3);
        this.data.intervalNumber = o;
    },
    timeMove: function(t) {
        if (!t) return clearInterval(this.data.intervalNumber), !1;
        var o = "00:00:00";
        if (t > -1) {
            var e = Math.floor(t / 3600), n = Math.floor(t / 60) % 60, a = t % 60;
            o = e < 10 ? "0" + e + ":" : e + ":", n < 10 && (o += "0"), o += n + ":", a < 10 && (o += "0"), 
            o += a.toFixed();
        }
        return o;
    },
    joinGroupCache: function() {
        var t = this, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        1 == this.data.options.IsShare ? this.GetGroupInfo().then(function(e) {
            var n = t.initGroupInfo(e);
            t.userJoinGrop(n, o);
        }) : this.joinGroup(o);
    },
    joinGroup: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        if (n.globalData.SystemInfo.iOS) wx.showModal({
            title: "请前往Android端参团",
            content: "基于微信小程序的运营规范，iOS端暂不支持当前商品的购买，请前往Android端购买",
            showCancel: !1,
            confirmText: "知道了",
            success: function(t) {}
        }); else {
            var o = this, a = t ? t.detail.formId : this.data.options.formId, r = n.generateShareOptions(), i = this.data.options.courseId, s = this.data.options.groupinfoId, u = n.globalData.userData.OpenId;
            if (!n.globalData.userData.HasLogin) {
                return n.gotoLogin(""), void (this.data.showBuyCourse = !0);
            }
            wx.showLoading({
                title: "正在生成订单"
            }), e.SetUserFormId({
                openId: u,
                formId: a,
                commonParams: r
            }, function(t) {
                console.log("SetUserFormId", t);
            }), e.GrouponActivityOrderConfirm({
                webcastCourseID: i
            }, function(t) {
                if ("1" == t.MsgCode) {
                    console.log(t);
                    var n = t.NotifyAsync, a = t.OrderNo;
                    e.WXOderSign({
                        NotifyAsync: n,
                        OrderNo: a,
                        openId: u
                    }, function(t) {
                        if ("1" == t.MsgCode) {
                            var n = t.PayPartnerInfoNew.prepayId;
                            wx.hideLoading(), wx.requestPayment({
                                timeStamp: t.PayPartnerInfoNew.timeStamp,
                                nonceStr: t.PayPartnerInfoNew.nonceStr,
                                package: t.PayPartnerInfoNew.package,
                                signType: t.PayPartnerInfoNew.signType,
                                paySign: t.PayPartnerInfoNew.paySign,
                                success: function() {
                                    e.joinGroup({
                                        groupinfoId: s,
                                        OrderNo: a
                                    }, function(t) {
                                        var e = t.JoinState;
                                        (0 == t.MsgCode || 0 != e && 5 != e) && o.setData({
                                            isJoinGroup: !0
                                        }), o.GetGroupInfo().then(function(t) {
                                            o.initGroupInfo(t);
                                        });
                                    }), e.PostTemplateSetUserPrePayId({
                                        openId: u,
                                        formId: n,
                                        commonParams: r
                                    }, function(t) {
                                        console.log("postTemplateprepayIdRes", t);
                                    });
                                },
                                complete: function() {}
                            });
                        }
                    });
                }
            });
        }
    },
    myExpiredTimeCountDown: function() {
        return this.data.times = this.timeMove(this.data.groupInfo.ExpireTimeStamp -= 1);
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        (this.data.showBuyCourse || this.data.IsButtonState) && n.globalData.userData.HasLogin && this.GetGroupInfo().then(function(o) {
            var e = t.initGroupInfo(o);
            t.userJoinGrop(e);
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this.getShareAppUrl();
        return {
            title: "一起拼好课，立省" + Math.ceil(this.data.courseInfo.CourseBookPrice + this.data.courseInfo.CoursePrice - this.data.courseInfo.TuanVipPrice) + "元",
            path: t,
            success: function(o) {
                console.log("转发路径", t);
            },
            fail: function(t) {}
        };
    },
    getShareAppUrl: function() {
        var t = "/pages/bulkPurchase/bulkPurchase?groupinfoId=" + this.data.options.groupinfoId + "&courseId=" + this.data.options.courseId;
        return t += "&" + n.generateShareOptions(), console.log(t), t;
    },
    lookVipCourse: function() {
        var t = this.data.options.courseId;
        wx.redirectTo({
            url: "/pages/vipCoursesDetail/vipCoursesDetail?courseId=" + t + "&homeIcon=1"
        });
    },
    goBackIndex: function() {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    goVipCoursesDetails: function(t) {
        console.log(t);
        var o = "";
        o = !this.data.IsShare && t.currentTarget.dataset.iscollection ? "../../pages/vipCourseDetailsList/vipCourseDetailsList?courseId=" + t.currentTarget.dataset.courseId + "&coursename=" + t.currentTarget.dataset.coursename : "../../pages/vipCoursesDetail/vipCoursesDetail?courseId=" + t.currentTarget.dataset.courseId + "&groupinfoId=" + t.currentTarget.dataset.groupinfoId + "&isShowJoinGroupBtn=true", 
        wx.navigateTo({
            url: o
        });
    }
});