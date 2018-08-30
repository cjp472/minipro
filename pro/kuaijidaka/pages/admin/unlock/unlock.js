function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var a, s = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (t[s] = a[s]);
    }
    return t;
}, i = getApp(), o = i.service, n = i.util, r = i.mixins;

Page({
    data: (a = {
        noMore: !1,
        calendarId: null,
        isBottom: !1,
        selfMsg: 0,
        voiceType: null,
        netWorkStatus: !0,
        canUseShareButton: !!wx.canIUse && wx.canIUse("button.open-type.share"),
        shareHidden: !0,
        sortOptionsHidden: !0,
        canIUseRichtext: !!wx.canIUse && wx.canIUse("rich-text"),
        naviList: [],
        courseDetail: {},
        topic: {},
        submitListObj: {}
    }, e(a, "naviList", []), e(a, "isLoadingMore", !1), e(a, "URLCalendar", ""), e(a, "selectReset", !1), 
    e(a, "notLogin", !1), e(a, "currentAudioType", ""), a),
    customData: {
        options: {},
        submit_ids: "",
        offset: 0,
        limit: 10,
        order_type: 0,
        search_user_name: "",
        no_remark: 0,
        loadedSubmitMap: {},
        hasAllSubmitsFetched: !1,
        hasInited: !1,
        afterPreviewingImage: !1,
        isLoadingHomeWorkList: !1,
        invite_code: ""
    },
    onLoad: function(t) {
        var e = this;
        t.courseId = parseInt(t.courseId), this.customData.options = t;
        var a = n.getFullPath(this.route, t);
        this.customData.currentPath = a;
        var s = function() {
            o.forAdminOnly(a, function() {
                var a = i.globalData.collection;
                a && a.courseId == t.courseId ? o.addInviteePointData({
                    course_id: a.courseId,
                    share_type: a.submitId ? 1 : 2,
                    action_type: 1,
                    inviter_id: a.inviterId ? a.inviterId : 0,
                    submit_id: a.submitId ? a.submitId : 0
                }, function() {
                    i.globalData.collection = null, e._setPageAfterLogin();
                }, function() {
                    e._setPageAfterLogin();
                }) : e._setPageAfterLogin();
            }, function() {
                n.setDataImproved(e, {
                    notLogin: !0,
                    courseId: t.courseId
                }, !0);
            });
        };
        t.calendarId ? (t.calendarId = parseInt(t.calendarId), s()) : o.fetchSevenUnlockCalendar(t.courseId, 1, function(e) {
            t.calendarId = e.unlock_sequence_data[0].calendar_id, s();
        }, function(t) {
            n.showError("获取课时表失败：" + t.errMsg, e);
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        this.data.notLogin || (this.customData.order_type = 0, this.customData.search_user_name = "", 
        this.customData.offset = 0, this.customData.hasAllSubmitsFetched = !1, this._refreshCourseDetail(function() {
            t._setupMainData();
        }));
    },
    onReachBottom: function() {
        if (this.customData.hasAllSubmitsFetched || this.data.isLoadingMore) this.setData({
            noMore: this.customData.hasAllSubmitsFetched
        }); else {
            n.setDataImproved(this, {
                isLoadingMore: !0
            }, !0);
            this._getSubmitList(!0);
        }
    },
    onReady: function() {},
    onShow: function() {
        var t = this, e = this.customData, a = this.data.submitListObj.submit_list;
        if (e.hasInited && !e.afterPreviewingImage) {
            var s = i.globalData.onshowData;
            if (s[this.route] && s[this.route]["pages/admin_sub/comments/comments"]) {
                var o = s[this.route]["pages/admin_sub/comments/comments"], r = a.findIndex(function(t) {
                    return t.submit_id === parseInt(o.submitId);
                }), u = a[r];
                return u.avg_score = u.avg_score ? (u.avg_score + o.data.score) / 2 : o.data.score, 
                u.remarks = a[r].remarks || [], u.remarks.push(o.data), void n.setDataImproved(this, {
                    submitListObj: this.data.submitListObj
                }, !0, function() {
                    s[t.route] = null;
                });
            }
            e.offset = 0, a && a.length && a.length > e.limit ? this._setupMainData({
                limit: a.length
            }) : this._setupMainData();
        }
    },
    onHide: function() {
        i.util.stopVoicePlay(), i.globalData.calendar_data = {}, i.globalData.comments_data = {}, 
        i.globalData.detail_priase = {};
    },
    onUnload: function() {
        i.globalData.backgroundAudioManager && i.globalData.backgroundAudioManager.src && (i.globalData.backgroundAudioManager.stop(), 
        i.globalData.backgroundAudioManager = null), i.globalData.calendar_data = {}, i.globalData.comments_data = {}, 
        i.globalData.detail_priase = {};
    },
    onShareAppMessage: function(t) {
        var e = this, a = this.customData, s = a.options, r = a.invite_code, u = t.from, c = t.target, d = this.data.courseDetail, l = d.title, h = d.share_cover, m = d.course_type, g = "/pages/user/unlock/unlock?courseId=" + s.courseId + "&calendarId=" + s.calendarId + "&courseNum=" + this.data.topic.sequence;
        return "button" === u && "invitation" === c.dataset.sharetype && (g = "/pages/user_sub/course_invitation/course_invitation?invite_code=" + r, 
        l = "邀请你参加“" + l + "”", console.log("onShareAppMessage", g), this._createCourseInvitation()), 
        {
            title: l,
            path: g,
            desc: "",
            imageUrl: n.getCourseCover(h, m, i.globalData.loginUser.user_type_login),
            complete: function(t) {
                var a;
                t.errMsg.split(":").indexOf("ok") <= -1 || 3 === e.data.courseDetail.permit_type && (a = t.shareTickets[0], 
                o.setCourseGroup(a, s.courseId, function() {}, function(t) {
                    o.forceUpdateSession(), wx.showModal({
                        title: "失败",
                        content: "设置微信群课程失败，请重新分享",
                        showCancel: !1,
                        confirmText: "我知道了"
                    });
                }));
            }
        };
    },
    _setPageAfterLogin: function() {
        var t = this;
        o.checkAuthority(this.customData.options.courseId, this.customData.currentPath, function(e) {
            var a = i.globalData.loginUser, s = a.user_type, o = a.user_id;
            "wx1e2aca7da9c1652b" === a.extAppID && 3 === e.permit_type && 3 !== s && o !== e.holded_by_user_id && (t.customData.hideShareMenu = !0, 
            n.setDataImproved(t, {
                hideShareMenu: !0
            }), wx.hideShareMenu({
                success: function(t) {
                    console.log("hideShareMenu success", t);
                },
                fail: function(t) {},
                complete: function(t) {}
            })), n.showToast("加载中", "loading", 5e3), t._createCourseInvitation(), r.setWXGroupAndName(i, t, e), 
            t._setupCourseDetail(e), t._initPage();
        });
    },
    _initPage: function() {
        wx.showShareMenu && !this.customData.hideShareMenu && wx.showShareMenu({
            withShareTicket: !0,
            fail: function(t) {}
        });
        this.customData.options;
        var t = this.data.courseDetail;
        n.setDataImproved(this, {
            naviList: [ {
                name: "home",
                cName: "首页",
                url: "/pages/admin/operation/operation",
                jumpType: "redirect"
            }, {
                name: "rank",
                cName: "排行榜",
                url: "/pages/user/weekly/weekly?course_id=" + t.course_id + "&fromWhich=navi",
                jumpType: "navigate"
            } ]
        }), this._setupMainData();
    },
    _setupMainData: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this._getTopic(), this._getMessages();
        this._getSubmitList(!1, t);
    },
    _getTopic: function() {
        var t = this;
        o.fetchTopic(this.customData.options.calendarId, function(e) {
            var a = e.category ? "exam" : e.eval_state ? "eval" : "normal";
            n.setDataImproved(t, {
                topic: e,
                topicType: a
            }, !0);
        });
    },
    _getMessages: function() {
        var t = this;
        o.fetchMessages(this.customData.options.courseId, function(e) {
            t.customData.submit_ids = e.submit_ids.join(","), n.setDataImproved(t, {
                selfMsg: e.msg_cnt
            });
        });
    },
    _getSubmitList: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = this, r = (arguments[2], 
        arguments[3], this.customData), u = r.options, c = r.offset, d = r.limit, l = r.order_type, h = r.search_user_name, m = r.loadedSubmitMap, g = r.no_remark;
        o.fetchSubmitList(s({
            offset: c,
            no_remark: g,
            limit: d,
            order_type: l,
            search_user_name: h,
            course_id: u.courseId,
            course_calendar_id: this.customData.options.calendarId
        }, a), function(a) {
            a.submit_list = a.submit_list || [];
            var s = a.submit_list, o = a.limit, r = a.course_type, c = a.eval_state, d = a.category, l = a.result_effect, h = i.data.submitListObj.submit_list || [], g = function(t) {
                t.course_type = r, t.is_hide = !1, t.eval_state = c, t.category = d, t.result_effect = l, 
                t.answer_score = Math.floor(t.answer_score);
            };
            if (i.customData.hasAllSubmitsFetched = s.length < o, e) {
                var f = [];
                s.forEach(function(t) {
                    g(t), m[t.submit_id] || (f.push(t), m[t.submit_id] = !0);
                }), a.submit_list = [].concat(t(h), f);
            } else {
                var _ = {};
                s.forEach(function(t) {
                    g(t), _[t.submit_id] = !0;
                }), i.customData.loadedSubmitMap = _;
            }
            i.customData.offset = a.submit_list.length;
            var p = "/pages/admin_sub/unlock_level/unlock_level?courseId=" + u.courseId + "&totalPeople=" + i.data.courseDetail.people_submit_count;
            n.setDataImproved(i, {
                submitListObj: a,
                URLCalendar: p
            });
        }, function(t) {
            var e = t.errType, a = t.errMsg;
            "code" === e && 409 === a ? wx.showModal({
                title: "提示",
                content: "此打卡已被管理员删除",
                showCancel: !1,
                success: function(t) {
                    t.confirm && wx.redirectTo({
                        url: "/pages/user/my/my"
                    });
                }
            }) : n.showError("获取数据失败：" + a, i);
        }, function() {
            wx.hideNavigationBarLoading(), n.hideToast(), wx.stopPullDownRefresh(), i.customData.hasInited = !0, 
            n.setDataImproved(i, {
                isLoadingMore: !1
            });
        });
    },
    _refreshCourseDetail: function(t) {
        var e = this;
        o.fetchCourseDetail(this.customData.options.courseId, function(a) {
            e._setupCourseDetail(a), "function" == typeof t && t(a);
        });
    },
    _setupCourseDetail: function(t) {
        wx.setNavigationBarTitle({
            title: t.title
        }), n.setDataImproved(this, {
            courseDetail: t
        }, !0);
    },
    setTheme: function(t) {
        n.showError("解锁课程的主题暂时只能在电脑端编辑", this);
    },
    toHome: function(t) {
        wx.redirectTo({
            url: "/pages/user/my/my"
        });
    },
    toMsg: function() {
        wx.navigateTo({
            url: "/pages/admin_sub/message/message?submit_ids=" + this.customData.submit_ids
        });
    },
    shareClick: function() {
        this.setData({
            shareHidden: !1
        });
    },
    shareClickclose: function() {
        this.setData({
            shareHidden: !0
        });
    },
    changeSort: function(t) {
        Object.assign(this.customData, t.detail), this.customData.offset = 0, this._getSubmitList(!1, t.detail);
    },
    markPreview: function() {
        this.customData.afterPreviewingImage = !0;
    },
    toggleClass: function(t) {
        var e = this.customData;
        n.showToast("加载中...", "loading", 3e3), n.stopVideoPlay(), e.options.calendarId = "last" === t.currentTarget.dataset.order ? this.data.topic.calendar_left : this.data.topic.calendar_right, 
        e.offset = 0, e.order_type = 0, e.search_user_name = "", e.no_remark = 0, this.setData({
            selectReset: !0
        }, function() {}), this._initPage();
    },
    loginSuccess: function() {
        n.setDataImproved(this, {
            notLogin: !1
        }), this._setPageAfterLogin();
    },
    sendCourseInvitation: function(t) {
        console.log("event sendCourseInvitation");
    },
    _createCourseInvitation: function() {
        var t = this;
        o.createCourseInvitation(this.customData.options.courseId, function(e) {
            t.customData.invite_code = e.invite_code;
        });
    },
    cancelNaming: function(t) {
        n.setDataImproved(this, {
            namingInputVisible: !1
        });
    },
    nameWXGroup: function(t) {
        var e = this, a = t.detail.value;
        a ? a.length > 12 ? n.showError("请输入12个字符以内的名称", this) : o.nameWXGroup({
            course_id: this.data.courseDetail.course_id,
            open_gid: this.customData.open_gid,
            name: a
        }, function() {
            n.showToast("命名成功", "success", 2e3);
        }, function(t) {
            n.showError("命名失败：" + t.errText, e);
        }, function() {
            n.setDataImproved(e, {
                namingInputVisible: !1
            });
        }) : n.showError("请输入名称", this);
    },
    setAudioType: function(t) {
        this.setData({
            currentAudioType: i.globalData.currentAudioType
        });
    }
});