var e = getApp(), t = e.service, o = e.util, s = "";

Page({
    data: {
        coursePrice: "",
        courseStart: "",
        courseEnd: "",
        timeLimit: "",
        isAdmin: !1,
        courseDetail: {},
        buttonText: "",
        mobileInputVisible: !1,
        bannerType: "banner-three",
        showParticipator: !1,
        showHandPick: !1,
        submitList: [],
        freeToLearn: !1,
        getPhoneFail: !1,
        sessionFrom: "",
        modalVisible: !1,
        customBG: "",
        ifCustom: "",
        payState: 0,
        jumpOptions: {},
        showShareOption: !1,
        currentAudioType: "",
        calling: !1,
        activityFull: !1,
        posterSharing: !1,
        callRemain: ""
    },
    customData: {
        options: {},
        currentPath: "",
        startAt: "",
        endAt: "",
        isBack: !1,
        timerCheckOrder: 0,
        mobile: "",
        isAdmin: !1,
        customBgUrl: "",
        posterUrl: ""
    },
    onLoad: function(e) {
        var s = this, r = this.customData, a = o.getFullPath(this.route, e);
        r.currentPath = a, e.courseId = parseInt(e.courseId), e.needPayAgain = "true" === e.needPayAgain, 
        r.options = e, t.forAllUser(a, function() {
            s._setPageAfterLogin();
        }, function() {
            var t = parseInt(e.shareUser || 0);
            o.setDataImproved(s, {
                notLogin: !0,
                courseId: e.courseId,
                shareUser: t
            }, !0);
        });
    },
    onShow: function() {
        var e = this;
        this.data.notLogin || (this.customData.isBack && (t.submitCheck({
            course_id: parseInt(this.customData.options.courseId)
        }, function(t) {
            o.setDataImproved(e, {
                hasPermission: !t.need_password
            });
        }, function(t) {
            o.setDataImproved(e, {
                hasPermission: !1
            });
        }), this._getCourseDetail()), this.setData({
            showShareOption: !1
        }));
    },
    onHide: function() {
        this.customData.isBack = !0;
    },
    onShareAppMessage: function() {
        var t = this.data.courseDetail, s = t.share_cover, r = t.title;
        return console.log(o.getCourseCover(s, this.customData.options.courseType, e.globalData.loginUser.user_type_login)), 
        {
            title: r,
            desc: "鲸打卡的分享",
            path: this.customData.currentPath + "&shareUser=" + e.globalData.loginUser.user_id,
            imageUrl: o.getCourseCover(s, this.customData.options.courseType, e.globalData.loginUser.user_type_login)
        };
    },
    _setPageAfterLogin: function() {
        var r = this, a = this.customData, i = e.globalData.loginUser.user_type_login;
        o.showShareMenu(), a.isAdmin = 2 === i || 3 === i, wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#ffffff"
        }), t.submitCheck({
            course_id: parseInt(a.options.courseId)
        }, function(e) {
            o.setDataImproved(r, {
                hasPermission: !e.need_password
            });
        }, function(e) {
            o.setDataImproved(r, {
                hasPermission: !1
            });
        }), o.setDataImproved(this, {
            isAdmin: a.isAdmin
        }), s = wx.getSystemInfoSync(), this._getCourseDetail();
    },
    _getCourseDetail: function() {
        var r = this, a = this.customData, i = a.options, n = e.globalData.loginUser, u = {};
        t.fetchCourseDetail(i.courseId, function(c) {
            var l = c.start_at, d = c.ended_at, p = c.permit_type, h = c.pay_after_json, m = c.activity_id, _ = c.is_submited, g = c.title;
            if (wx.setNavigationBarTitle({
                title: g
            }), c.shut_down && 1 === e.globalData.loginUser.user_type_login) r.setData({
                "courseDetail.shut_down": 1
            }); else if (c.shut_down = 0, i.fromPublicRoute && 1 == _) wx.redirectTo({
                url: "/pages/user/unlock/unlock?courseId=" + i.courseId + "&isFromOverview=true"
            }); else {
                if (h) try {
                    u = JSON.parse(h)[0];
                } catch (e) {
                    wx.showToast({
                        title: "解析文本错误"
                    });
                }
                u.showFeatured && t.fetchHandPick(parseInt(r.customData.options.courseId), function(e) {
                    o.setDataImproved(r, {
                        submitList: e.submit_list_by_top
                    });
                }, function(e) {
                    o.showError("精选打卡获取失败（" + e.errMsg + "）");
                }), 3 == u.bannerIndex ? (u.bannerIndex = 2, o.setDataImproved(r, {
                    ifCustom: "is-custom",
                    customBG: u.customBG ? 'background: url("' + u.customBG + '") no-repeat top left; background-size: 690rpx 400rpx;\n  width: 690rpx; height: 400rpx;' : ""
                }), r.customData.customBgUrl = u.customBG || "") : r.customData.customBgUrl = 0 == u.bannerIndex ? "http://static3topen.jingdaka.com/images/course_overview_banner1-1.png" : 1 == u.bannerIndex ? "http://static3topen.jingdaka.com/images/course_overview_banner2-1.png" : "";
                var f = o.toDecimal2(c.total_fee / 100), v = l.split("T")[0].split("-"), D = v[0] + "年" + v[1] + "月" + v[2] + "日", y = d.split("T")[0].split("-"), b = y[0] + "年" + y[1] + "月" + y[2] + "日", I = "", w = "";
                4 !== p || a.isAdmin || 2 === c.join_type ? (I = "进入课程", w = "freeToCourse") : 4 === p && (!c.is_pay || i.toPay ? r._canPay(c) ? c.limit_people > 0 && c.limit_people <= c.pay_people ? (I = s && s.system.toLowerCase().indexOf("ios") > -1 ? "课程名额已满" : "课程名额已满，无法购买", 
                w = "") : (o.setDataImproved(r, {
                    freeToLearn: parseInt(c.trial_count) > 0
                }), I = "支付" + f + "元", w = "payCourse") : (I = s && s.system.toLowerCase().indexOf("ios") > -1 ? "已结束" : "购买已结束", 
                w = "") : i.needPayAgain ? (I = "再次支付" + f + "元", w = "payCourse") : (I = "开始学习", 
                w = "freeToCourse")), a.startAt = l.split("T")[0], a.endAt = d.split("T")[0], console.log("sessionFrom:", "pay_courseid_" + c.course_id + "_userid_" + e.globalData.loginUser.user_id), 
                s && s.system.toLowerCase().indexOf("ios") > -1 || 3 !== n.pay_state || "payCourse" !== w || -1 !== o.compareVersion(s.SDKVersion, "2.0.7") || wx.showModal({
                    title: "提示",
                    content: "无法支付，请更新微信到最新版本。",
                    showCancel: !1
                });
                var P = function() {
                    o.setDataImproved(r, {
                        coursePrice: f,
                        buttonText: I,
                        buttonHandler: w,
                        isIOS: s && s.system.toLowerCase().indexOf("ios") > -1,
                        payState: n.pay_state,
                        jumpOptions: {
                            appId: "wxbd8f35c3256f7f3f",
                            path: "/pages/pay_course/pay_course",
                            extraData: {
                                courseId: a.options.courseId,
                                apsid: n.apsid,
                                initiator: n.app_name
                            },
                            version: "dev" === e.config.env ? "trial" : "release"
                        },
                        courseDetail: c,
                        courseStart: D,
                        courseEnd: b,
                        timeLimit: c.start_clock + "-" + c.end_clock,
                        bannerType: 0 == u.bannerIndex ? "banner-one" : 1 == u.bannerIndex ? "banner-two" : 2 == u.bannerIndex ? "banner-three" : "banner-one",
                        showParticipator: void 0 === u.showPeopleNumber || u.showPeopleNumber,
                        showHandPick: u.showFeatured || !1,
                        sessionFrom: "pay_courseid_" + c.course_id + "_userid_" + e.globalData.loginUser.user_id
                    });
                };
                m ? t.fetchCallDetail({
                    activity_id: m,
                    share_user_id: e.globalData.loginUser.user_id,
                    pagefrom: 0
                }, function(e) {
                    var t = e.publish_status, s = e.free_left;
                    1 === t && o.setDataImproved(r, {
                        calling: 1 === e.type,
                        posterSharing: 2 === e.type,
                        activityFull: 0 === s,
                        callRemain: s
                    }), P();
                }, function(e) {
                    o.showError("获取活动详情失败" + e.errText, r);
                }) : P();
            }
        }, function(e) {
            o.showError("获取课程详情失败" + e.errMsg, r);
        });
    },
    _study: function() {
        var e = this.data.courseDetail, t = (e.title, e.course_type), s = e.unlock_number, r = this.customData, a = r.startAt, i = r.endAt, n = r.options.courseId, u = o.currentBeijingTime(), c = void 0, l = {
            0: "/pages/user/home/home?courseId=" + n + "&witchDay=" + (c = a > u ? a : i < u ? i : u) + "&isFromOverview=true",
            1: "/pages/user_homework/homework_list/homework_list?courseId=" + n + "&isFromOverview=true&type=redirect",
            2: "/pages/user/unlock/unlock?courseId=" + n + "&isFromOverview=true&courseNum=" + (0 == s ? 1 : s)
        };
        wx.redirectTo({
            url: l[t]
        });
    },
    payCourse: function() {
        this._payCourse();
    },
    freeToCourse: function() {
        this._study();
    },
    _payCourse: function() {
        var e = this.data.courseDetail;
        !!e.mobile_require && !e.user_mobile ? o.setDataImproved(this, {
            mobileInputVisible: !0
        }) : this._createPayOrder();
    },
    _createPayOrder: o.debounce(function() {
        var r = this;
        console.log("_createPayOrder");
        var a = this.customData;
        e.globalData.loginUser;
        s && s.system.toLowerCase().indexOf("ios") > -1 ? o.setDataImproved(this, {
            modalVisible: !0
        }, !0) : (o.showToast("支付中"), t.createPayOrder(a.options.courseId, function(e) {
            clearInterval(a.timerCheckOrder), a.timerCheckOrder = setInterval(function() {
                r._checkPayOrder(e);
            }, 1e3);
        }, function(e) {
            420 == e.errMsg ? r._study() : "cancel" !== e.errType && o.showError("创建支付订单失败（" + e.errText + "）", r);
        }));
    }, 500),
    _checkPayOrder: function(e) {
        var s = this;
        t.checkPayOrder(e, function() {
            o.hideToast(), clearInterval(s.customData.timerCheckOrder), t.getShareInfo(function(e) {
                t.joinWXGroup({
                    course_id: s.customData.options.courseId,
                    iv: e.iv,
                    encryptedData: e.encryptedData
                });
            }), s._study();
        }, function(e) {
            o.hideToast(), 419 != e.errMsg && o.showError("获取支付结果失败：" + e.errMsg, s);
        });
    },
    _canPay: function(e) {
        var t = e.course_type, s = e.pay_type, r = e.start_at, a = e.ended_at, i = (e.start_clock, 
        e.end_clock);
        if (2 === t || 1 === t) return !0;
        if (3 === s) return !0;
        var n = Date.now(), u = void 0, c = void 0;
        return 0 === t && (u = o.getTime(o.tTimeFormat(r) + "T00:00:00"), c = o.getTime(o.tTimeFormat(a) + "T" + i + ":00")), 
        console.log(n, u, c), 1 === s ? n <= u : n <= c;
    },
    getFormId: function(e) {
        t.submitFormId(e.detail.formId);
    },
    cancelInputMobile: function() {
        o.setDataImproved(this, {
            mobileInputVisible: !1
        }, !0);
    },
    getPhoneNumber: function(e) {
        var s = this, r = e.detail, a = r.iv, i = r.encryptedData, n = function() {
            o.setDataImproved(s, {
                getPhoneFail: !0
            }, !0);
        };
        a && i ? t.setPhoneNumber({
            iv: a,
            encryptedData: i,
            phone: ""
        }, function(e) {
            o.setDataImproved(s, {
                mobile: e,
                "courseDetail.user_mobile": e
            }, !0);
        }, function(e) {
            n();
        }) : n();
    },
    inputPhone: function(e) {
        this.customData.mobile = e.detail.value;
    },
    sendMobile: function() {
        var e = this, s = this.customData.mobile, r = function(t) {
            o.setDataImproved(e, {
                mobileInputVisible: !1,
                "courseDetail.user_mobile": t
            }, !0), e._createPayOrder();
        };
        this.data.mobile ? r(this.data.mobile) : /^1[3-9][0-9]{9}$/.test(s) ? t.setPhoneNumber({
            iv: "",
            encryptedData: "",
            phone: s
        }, function(e) {
            r(e);
        }, function(t) {
            o.showError("保存手机号失败(" + t.errMsg + ")", e);
        }) : o.showError("请输入正确的手机号", this);
    },
    hideModal: function() {
        o.setDataImproved(this, {
            modalVisible: !1
        }, !0);
    },
    showShareOptions: function() {
        this.setData({
            showShareOption: !0
        });
    },
    inviteShare: function() {
        var e = this.data.courseDetail, t = e.title, o = e.course_type, s = e.course_id;
        this.setData({
            showShareOption: !1
        }), wx.navigateTo({
            url: "/pages/user_sub/invited_share/invited_share?title=" + t + "&course_type=" + o + "&course_id=" + s
        });
    },
    closeWindow: function() {
        this.setData({
            showShareOption: !1
        });
    },
    setAudioType: function(t) {
        this.setData({
            currentAudioType: e.globalData.currentAudioType
        });
    },
    loginSuccess: function() {
        o.setDataImproved(this, {
            notLogin: !1
        }), this._setPageAfterLogin();
    },
    collectCall: function() {
        var t = this.data.courseDetail, o = t.course_id, s = t.activity_id;
        wx.navigateTo({
            url: "/pages/user/call_collect/call_collect?courseId=" + o + "&shareUserId=" + e.globalData.loginUser.user_id + "&activityId=" + s + "&isFrom=overview"
        });
    },
    fetchPoster: function() {
        var s = this;
        if (this.customData.posterUrl) wx.previewImage({
            urls: [ this.customData.posterUrl ]
        }); else {
            var r = this.data.courseDetail, a = r.course_id, i = r.activity_id, n = "t" + a + "z" + e.globalData.loginUser.user_id + "z" + i;
            o.showToast("正在生成...", "loading", 3e3), t.fetchActivityPoster({
                type: 2,
                course_id: a,
                scene: n
            }, function(e) {
                o.hideToast(), s.customData.posterUrl = "data:image/gif;base64," + e, wx.previewImage({
                    urls: [ "data:image/gif;base64," + e ]
                });
            }, function(e) {
                o.hideToast(), o.showError("获取海报失败" + e.errText, s);
            });
        }
    },
    partake: function() {
        o.showModal("提示", "请联系课程老师参加课程", !1, "我知道了");
    }
});