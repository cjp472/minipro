require("../../biz/subject.js");

var t = require("../../biz/vipCourse.js"), a = require("../../utils/wxpares.js"), e = require("../../utils/util.js"), o = require("../../config.js"), n = require("../../utils/xnSDK.js"), i = require("../../utils/xnUtils.js"), r = require("../../biz/groupBuy.js"), s = require("../../utils/getSubjectParentName.js"), u = getApp();

Page({
    data: {
        buyState: o.buyState,
        theme: o.UIConfig.Theme,
        navIndex: 0,
        topHeight: 0,
        sectionExplain: !0,
        videoExplain: !0,
        payState: !1,
        foldState: !1,
        scrollTopList: [ 0, 0, 0 ],
        backTopState: !1,
        courseId: 0,
        SupportMinAppPay: !0,
        sharePath: "",
        loading: !1,
        detailDataInfo: {},
        CourseIntroUrls: [],
        SectionList: [],
        TeacherList: [],
        VipVideoList: [],
        XNConfigInfo: {},
        weChatAnimation: !1,
        addrInfo: null,
        isConfirm: "",
        totalPrice: "",
        isShowJoinGroupBtn: !1,
        groups: "",
        timers: [],
        GroupInfoId: "",
        scrollTop: "",
        scrollTops: [],
        tabs: [ "课程", "详情", "大纲", "老师" ],
        isShowModal: !1,
        isScroll: !1,
        isPageScroll: !0,
        animationData: [],
        moveStartPos: 0,
        activeIndex: 1,
        scrollTopNumber: 1,
        userDefaultfAvatar: "http://img02.exam8.com/img2013/wantiku/paihang/default_rank_head.png",
        IOS: u.globalData.SystemInfo.iOS
    },
    _data: {
        options: null,
        OrderNo: "",
        groupPay: !1,
        formId: "",
        GroupInfoId: ""
    },
    onShow: function() {
        var a = this;
        if (this._data.groupPay || this.data.showBuyCourse) {
            var e = this._data.options, o = this;
            u.checkContextWithShareOptions(e, function() {
                t.getVipDetailCourseInfo(o.data.courseId, function(t) {
                    o.setData({
                        detailDataInfo: t.Data,
                        SupportMinAppPay: t.SupportMinAppPay
                    }), o.data.SupportMinAppPay && 0 == o.data.detailDataInfo.TuanUserState && u.globalData.userData.HasLogin && o._data.groupPay && o.groupSubmit(), 
                    o.data.SupportMinAppPay && o.data.showBuyCourse && u.globalData.userData.HasLogin && o.payCourseJs(), 
                    o.data.showBuyCourse = !1, o._data.groupPay = !1;
                });
            }), o.setData({
                isShowJoinGroupBtn: !1
            });
        }
        setTimeout(function() {
            a.setData({
                weChatAnimation: !1
            }), a.setData({
                weChatAnimation: !0
            });
        }, 2e3), this.getSetings();
        var n = this;
        t.GetGroupListInfo(n.data.courseId, function(t) {
            var a = t.GroupList, e = a.length;
            n.setData({
                groups: a,
                showGroups: a
            }), console.log(n.data.groups), n.setInitTimer(), n.initUserRemainNumber(), e > 2 && n.doAnimate();
        });
    },
    onLoad: function(e) {
        var s = this.getUrlParam(e);
        this.data.courseId = s.courseId, this._data.options = s, this.setData({
            homeIcon: e.homeIcon
        }), wx.showLoading({
            title: "正在加载"
        });
        var d = this;
        this.data.XNConfigInfo = i.getXNConfigInfo(), n.callTrail({
            originId: this.data.XNConfigInfo.AppId,
            siteId: "kf_9644"
        }), u.checkContextWithShareOptions(s, function() {
            t.getVipDetailCourseInfo(d.data.courseId, function(t) {
                1 == e.IsShare && t.Data.SaleInfo ? wx.switchTab({
                    url: "/pages/vipCourses/vipCourses"
                }) : (d.getUserAddrInfo(), d.setData({
                    detailDataInfo: t.Data,
                    SupportMinAppPay: t.SupportMinAppPay,
                    totalPrice: t.Data.CoursePrice + t.Data.CourseBookPrice
                }), t.Data.NeedBook ? d.setData({
                    totalPrice: t.Data.CoursePrice + t.Data.CourseBookPrice
                }) : d.setData({
                    totalPrice: t.Data.CoursePrice
                }), setTimeout(function() {
                    d._initScrollHeight();
                }, 200));
            }), t.getVipDetailData(d.data.courseId, function(t) {
                var e = a.getSources(t.CourseIntroUrl);
                e.length > 0 && e[e.length - 1].content && (e[e.length - 1].content = e[e.length - 1].content.replace(/[\r\n;&nbsp]/g, ""), 
                e[0].content = e[0].content.replace(/[\r\n]/g, ""));
                var o = d.initTeacherList(t.TeacherList), n = d.initGetVipVideoList(t.VipVideoList);
                d.setData({
                    CourseIntroUrls: e,
                    SectionList: t.SectionList,
                    TeacherList: o,
                    VipVideoList: n
                }), wx.hideLoading(), setTimeout(function() {
                    wx.createSelectorQuery().selectAll(".scroll-view-item").boundingClientRect(function(t) {
                        d.setData({
                            scrollTops: t
                        });
                    }).exec();
                }, 1e3);
            }), e.isShowJoinGroupBtn && d.setData({
                isShowJoinGroupBtn: e.isShowJoinGroupBtn
            }), d.data.sharePath = d.getSharePageUrl(), e.IsShare && r.getGroupon(function(t) {
                d.setData({
                    ifHongb: t.HasGroupon,
                    openGroupId: t.Groupon.Id,
                    IsShare: e.IsShare
                });
            }), void 0 != s.isCode && t.getSubjectName(s.SubjectId, function(t) {
                console.log(t.Data), u.globalData.subject.SubjectName = t.Data, wx.setStorage({
                    key: o.AppStorage.subject,
                    data: u.globalData.subject
                });
            });
        });
    },
    onReady: function() {},
    onUnload: function() {},
    onHide: function() {
        clearInterval(this.data.intervalNumber), clearInterval(this.data.intervalNumbeTime);
    },
    initGetVipVideoList: function(t) {
        return t.map(function(t) {
            return t.VideoDuration = Math.ceil(t.VideoDuration / 60), t;
        });
    },
    initTeacherList: function(t) {
        for (var a in t) {
            var o = t[a];
            o.StarQuantityList = e.caculateStarCount(o.StarQuantity);
        }
        return t;
    },
    _initScrollHeight: function() {
        var t = this;
        wx.createSelectorQuery().select(".course-detail").boundingClientRect(function(a) {
            t.setData({
                topHeight: a.height,
                initHeight: a.height,
                loading: !0
            });
        }).exec();
    },
    changeSectionExplain: function() {
        this.setData({
            sectionExplain: !this.data.sectionExplain
        });
    },
    changeVideoExplain: function() {
        this.setData({
            videoExplain: !this.data.videoExplain
        });
    },
    payCourseJs: function() {
        var a = this;
        if (u.globalData.SystemInfo.iOS) wx.showModal({
            title: "请下载万题库APP购买",
            content: "基于微信的运营规范，小程序暂不支持当前商品的购买，请下载万题库APP购买",
            showCancel: !1,
            confirmText: "知道了",
            success: function(t) {}
        }); else {
            if (!u.globalData.userData.HasLogin) {
                return u.gotoLogin(""), void (this.data.showBuyCourse = !0);
            }
            0 == this.data.detailDataInfo.BuyState && 0 == this.data.detailDataInfo.IsBuy && (wx.showLoading({
                title: "正在生成订单"
            }), t.WebcastOrderConfirm(this.data.detailDataInfo.WebcastCourseId, this.data.detailDataInfo.NeedBook, function(e) {
                var o = e.OrderNo, n = e.NotifyAsync;
                if (e.OrderPaymentAmount <= 1e-7) return wx.hideToast(), a.data.detailDataInfo.IsBuy = 1, 
                a.setData({
                    payState: !0,
                    detailDataInfo: a.data.detailDataInfo
                }), void setTimeout(function() {
                    a.setData({
                        foldState: !0
                    });
                }.bind(this), 3e3);
                t.getPayWeixinData(u.globalData.userData.OpenId, o, n, function(t) {
                    var e = t.PayPartnerInfoNew.timeStamp, o = t.PayPartnerInfoNew.nonceStr, n = t.PayPartnerInfoNew.package, i = t.PayPartnerInfoNew.paySign, r = t.PayPartnerInfoNew.signType;
                    wx.hideToast(), wx.requestPayment({
                        timeStamp: e,
                        nonceStr: o,
                        package: n,
                        signType: r,
                        paySign: i,
                        success: function(t) {
                            console.log(t), wx.showToast({
                                title: "支付成功",
                                duration: 1500
                            }), a.data.detailDataInfo.IsBuy = 1, a.getUserAddrInfo(), a.setData({
                                payState: !0,
                                detailDataInfo: a.data.detailDataInfo
                            }), setTimeout(function() {
                                a.setData({
                                    foldState: !0
                                });
                            }.bind(this), 3e3);
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
            }));
        }
    },
    groupSubmit: function(a) {
        if (u.globalData.SystemInfo.iOS) wx.showModal({
            title: "请下载万题库APP参团",
            content: "基于微信的运营规范，小程序暂不支持当前商品的购买，请下载万题库APP购买",
            showCancel: !1,
            confirmText: "知道了",
            success: function(t) {}
        }); else {
            var e = this;
            a && (this._data.formId = a.detail.formId);
            var o = this._data.formId, n = u.globalData.userData.OpenId;
            if (!u.globalData.userData.HasLogin) {
                return u.gotoLogin(""), void (this._data.groupPay = !0);
            }
            0 == this.data.detailDataInfo.BuyState && 0 == this.data.detailDataInfo.IsBuy && 0 == this.data.detailDataInfo.TuanUserState && (wx.showLoading({
                title: "正在生成订单"
            }), t.GrouponActivityOrderConfirm(this.data.detailDataInfo.WebcastCourseId, this.data.detailDataInfo.NeedBook, function(a) {
                var i = a.OrderNo, r = a.NotifyAsync, s = a.PrepayId;
                t.getPayWeixinData(n, i, r, function(a) {
                    wx.hideToast(), wx.requestPayment({
                        timeStamp: a.PayPartnerInfoNew.timeStamp,
                        nonceStr: a.PayPartnerInfoNew.nonceStr,
                        package: a.PayPartnerInfoNew.package,
                        signType: a.PayPartnerInfoNew.signType,
                        paySign: a.PayPartnerInfoNew.paySign,
                        success: function(a) {
                            e.data.detailDataInfo.TuanUserState = 1, e.setData({
                                detailDataInfo: e.data.detailDataInfo
                            });
                            var r = u.generateShareOptions(), d = {
                                CommonParams: r,
                                OpenId: n,
                                formId: o
                            };
                            console.log("73bea0a8ca9ebd1193b714810b1029f4", o), t.SetUserFormId(d, function(t) {
                                console.log("FormId=====>", t);
                            });
                            var c = {
                                CommonParams: r,
                                OpenId: n,
                                formId: s
                            };
                            t.SetUserPrePayId(c, function(t) {
                                console.log("PrePayId=====>", t);
                            }), t.vipOpenPintuan(e.data.courseId, i, function(t) {
                                wx.showToast({
                                    title: "开团成功",
                                    duration: 1500
                                }), e._data.GroupInfoId = t.GroupInfoId, wx.navigateTo({
                                    url: "../bulkPurchase/bulkPurchase?groupinfoId=" + t.GroupInfoId + "&courseId=" + e.data.detailDataInfo.WebcastCourseId
                                });
                            });
                        },
                        fail: function(t) {
                            wx.showToast({
                                title: "开团失败",
                                image: "/images/icon/icon_tip.png",
                                duration: 2e3,
                                mask: !0
                            });
                        }
                    });
                });
            }));
        }
    },
    pintuanInfo: function(t) {
        if (!u.globalData.userData.HasLogin) {
            return u.gotoLogin(""), void (this.data.showBuyCourse = !0);
        }
        var a = this.data.detailDataInfo.GroupInfoId || this._data.GroupInfoId, e = this.data.detailDataInfo.WebcastCourseId;
        wx.navigateTo({
            url: "../bulkPurchase/bulkPurchase?groupinfoId=" + a + "&courseId=" + e
        });
    },
    backTop: function() {
        this.setData({
            intoView: "intoView0",
            navIndex: "0"
        });
    },
    selectIndex: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.index, e = t.currentTarget.dataset.intoview;
        console.log("intoview===>" + e), this.setData({
            navIndex: a,
            intoView: e
        });
    },
    getSharePageUrl: function() {
        var t = "/pages/vipCoursesDetail/vipCoursesDetail";
        return t += "?courseId=" + this.data.courseId, t += "&" + u.generateShareOptions(), 
        console.log(t), t;
    },
    onShareAppMessage: function() {
        var t = this, a = this.getSharePageUrl();
        return {
            title: t.data.detailDataInfo.CourseName,
            path: a
        };
    },
    formSubmit: function(t) {
        var a = this;
        console.log("form事件", t), a.setData({
            paySuccess: !0
        });
    },
    openSettings: function(t) {
        var a = this;
        "1" == t.target.dataset.index ? a.setData({
            accredit: !1
        }) : (a.setData({
            accredit: !1
        }), wx.openSetting({
            success: function(t) {}
        }));
    },
    getUserAddrInfo: function() {
        var a = this, e = {
            webcastCourseId: this.data.courseId
        };
        t.getVipDetailAddrInfo(e, function(t) {
            var e = t.ContactPerson, o = t.CellPhoneNumber, n = t.ProvinceName, i = {
                userName: e,
                telNumber: o,
                provinceName: n,
                cityName: t.CityName,
                countyName: t.CountyName ? t.CountyName : "",
                detailInfo: t.AddressDetail
            };
            a._data.OrderNo = t.OrderId, e || o || n || (i = null), a.setData({
                addrInfo: i,
                isConfirm: t.CanModified
            });
        });
    },
    clickAdress: function() {
        var t = this;
        wx.chooseAddress({
            success: function(a) {
                "chooseAddress:ok" === a.errMsg && (console.log(a), t.setData({
                    addrInfo: a
                }));
            },
            fail: function(t) {
                "chooseAddress:fail auth deny" === t.errMsg && wx.showModal({
                    title: "",
                    content: "需要打开小程序的设置重新获授权获取您的收货地址",
                    confirmText: "去设置",
                    confirmColor: o.UIConfig.color,
                    success: function(t) {
                        t.confirm && wx.openSetting({
                            success: function(t) {
                                console.log("wx.openSetting", t);
                            }
                        });
                    }
                });
            }
        });
    },
    confirmAddr: function() {
        var a = this, e = this.data.addrInfo, o = {
            ProvinceName: e.provinceName,
            CityName: e.cityName,
            CountyName: e.countyName,
            DetailInfo: e.detailInfo,
            NationalCode: e.nationalCode,
            PostalCode: e.postalCode,
            UserName: e.userName,
            TelNumber: e.telNumber,
            OrderNo: this._data.OrderNo
        };
        t.confirmAddrInfo(o, function(t) {
            a.setData({
                isConfirm: !1
            });
        });
    },
    getSetings: function() {
        var t = this;
        wx.getSetting({
            success: function(a) {
                var e = a.authSetting["scope.address"];
                e && t.setData({
                    scopeAddress: e
                });
            }
        });
    },
    formSubmitHongBao: function(t) {
        var a = t.detail.formId, e = this.data.openGroupId;
        wx.navigateTo({
            url: "../group/groupBuy/groupBuy?formId=" + a + "&grouponid=" + e
        });
    },
    goBackIndex: function() {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    getUrlParam: function(t) {
        return void 0 != t.isCode ? {
            courseId: t.cId,
            IsShare: t.IsShare,
            SubjectParentId: t.pId,
            SubjectLevel: t.level,
            SubjectId: t.SubId,
            SubjectParentName: s.getSubParentName(t.pId, t.level),
            UserAreaId: t.uId,
            InstitutionAreaId: t.aId,
            isCode: t.isCode
        } : t;
    },
    joinGroupTap: function(t) {
        console.log(t);
        var a = getCurrentPages();
        a[a.length - 2].setData({
            IsButtonState: !0
        }), setTimeout(function() {
            wx.navigateBack();
        }, 1e3);
    },
    joinActivities: function(t) {
        console.log(t);
        var a = t.target.dataset.groupinfoid, e = t.target.dataset.groupstate, o = this.data.courseId;
        if (console.log("courseId=========>" + o), 1 != e) return console.log("此活动已束"), 
        !1;
        wx.navigateTo({
            url: "/pages/bulkPurchase/bulkPurchase?courseId=" + o + "&groupinfoId=" + a
        });
    },
    initUserRemainNumber: function() {
        for (var t = this.data.showGroups, a = [], e = 0; e < t.length; e++) {
            var o = t[e].SuccessCount - t[e].UserList.length;
            a.push(o);
        }
        this.setData({
            remainNumbers: a
        });
    },
    setInitTimer: function() {
        for (var t = this.data.groups, a = [], e = 0; e < t.length; e++) a.push(t[e].ExpireTimeStamp);
        this.countDown(a);
    },
    countDown: function(t) {
        var a = this, e = [], o = setInterval(function() {
            for (var o = 0; o < t.length; o++) {
                var n = "00", i = "00", r = "00", s = "00", u = t[o];
                u < 0 || (n = a.formatNumber(Math.floor(u / 3600 / 24)), i = a.formatNumber(Math.floor((u - 3600 * n * 24) / 3600)), 
                r = a.formatNumber(Math.floor((u - 3600 * n * 24 - 3600 * i) / 60)), s = a.formatNumber(u - 3600 * n * 24 - 3600 * i - 60 * r), 
                t[o]--, e[o] = "剩余" + i + ":" + r + ":" + s, this.setData({
                    timers: e
                }));
            }
        }.bind(this), 1e3);
        this.data.intervalNumber = o;
    },
    formatNumber: function(t) {
        return t.toString().replace(/^(\d)$/, "0$1");
    },
    scrolling: function(t) {
        this.bindscroll({
            scrollTop: t.detail.scrollTop
        });
    },
    bindscroll: function(t) {
        var a = this, e = t.scrollTop, o = this.data.scrollTops, n = e > 80;
        this.setData({
            backTopState: n
        }), e > this.data.moveStartPos ? (this.data.moveStartPos = e, o.forEach(function(t, o) {
            e > t.top - 60 && a.data.navIndex < o && a.setData({
                navIndex: o
            });
        })) : e < this.data.moveStartPos && (this.data.moveStartPos = e, o.forEach(function(t, o) {
            e < t.top - 60 && a.data.navIndex >= o && a.setData({
                navIndex: o ? o - 1 : o
            });
        }));
    },
    showModalTap: function() {
        var t = this.data.isShowModal, a = this.data.isPageScroll;
        this.setData({
            isShowModal: !t,
            isPageScroll: !a
        });
    },
    translate: function(t, a, e) {
        if (e >= 0) {
            var o = wx.createAnimation({
                duration: e,
                timingFunction: "ease-in-out",
                delay: 0,
                transformOrigin: "50% 50%"
            }), n = a ? 1 : 0;
            this.animation = o, o.translateY(t).opacity(n).step(), this.setData({
                animationData: o.export()
            });
        }
    },
    doAnimate: function() {
        var t = this.data.scrollTopNumber, a = this.data.activeIndex, e = 1e3, o = this.data.groups.length, n = setInterval(function() {
            var n = -a++ * (68 * t);
            this.translate(n, 1, e), a == o - 1 ? (e = 0, a = 0) : e = 1e3;
        }.bind(this), 3e3);
        this.data.intervalNumbeTime = n;
    }
});