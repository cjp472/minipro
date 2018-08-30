function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (t[s] = a[s]);
    }
    return t;
}, a = getApp(), s = a.service, i = a.util;

Page({
    data: {
        startReading: !1,
        noMore: !1,
        pcTheme: "",
        appTheme: "",
        showInform: !1,
        informDataPc: "",
        informDataApp: "",
        backShade: !1,
        courseStartTime: "",
        courseEndTime: "",
        countDown: null,
        remindAlready: 0,
        newRemind: "",
        noPermissionTip: "",
        isBottom: !1,
        loadCompelete: !1,
        calendar_list: [],
        URLFullCalendar: "",
        selfMsg: 0,
        pwdStyle: "display:none",
        netWorkStatus: !0,
        sortOptionsHidden: !0,
        searchBoxData: {
            isShowSearchBox: !1,
            isPreventTriggerReachBottom: !1,
            cancelSearch: "cancelSearch",
            completeSearch: "completeSearch",
            searchedString: ""
        },
        pwdtip: "",
        courseDetail: {},
        topic: {},
        courseHasStarted: !0,
        canSubmit: !1,
        submitListObj: {},
        orderType: 0,
        orderTypes: {
            DEFAULT: 0,
            PRAISE: 1,
            SCORE: 2,
            TIME: 3,
            EVAL: 4
        },
        orderTypeText: {
            0: "默认",
            1: "按点赞",
            2: "按评分",
            3: "按时间",
            4: "按评测分"
        },
        isLoadingMore: !1,
        hasNotification: !1,
        hasNotificationUnread: !1,
        URLNotification: "",
        offDay: !1,
        notLogin: !1,
        courseId: 0,
        currentAudioType: "",
        namingInputVisible: !1
    },
    customData: {
        options: {},
        currentPath: "",
        loginUser: {},
        submit_ids: [],
        offset: 0,
        limit: 10,
        order_type: 0,
        search_user_name: "",
        loadedSubmitMap: {},
        hasAllSubmitsFetched: !1,
        hasInited: !1,
        afterPreviewingImage: !1,
        notInformObj: !1
    },
    onLoad: function(t) {
        var e = this;
        t.courseId = parseInt(t.courseId), t.witchDay = t.witchDay || i.currentBeijingTime(), 
        this.customData.options = t, this.customData.currentPath = i.getFullPath(this.route, {
            courseId: t.courseId,
            witchDay: t.witchDay
        }), s.forUserOnly(this.customData.currentPath, function() {
            var i = a.globalData.collection;
            i && i.courseId == t.courseId ? s.addInviteePointData({
                course_id: i.courseId,
                share_type: i.submitId ? 1 : 2,
                action_type: 1,
                inviter_id: i.inviterId ? i.inviterId : 0,
                submit_id: i.submitId ? i.submitId : 0
            }, function() {
                a.globalData.collection = null, e._setPageAfterLogin();
            }, function() {
                e._setPageAfterLogin();
            }) : e._setPageAfterLogin();
        }, function() {
            var a = parseInt(t.shareUser || 0);
            i.setDataImproved(e, {
                notLogin: !0,
                courseId: t.courseId,
                shareUser: a
            }, !0);
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        this.customData.hasInited && !this.data.notLogin && (this.setData({
            "searchBoxData.isShowSearchBox": !1,
            "searchBoxData.isPreventTriggerReachBottom": !1
        }), this.customData.search_user_name = "", this.customData.offset = 0, this.customData.hasAllSubmitsFetched = !1, 
        this._refreshCourseDetail(function() {
            t._setupMainData();
        }));
    },
    onReachBottom: function() {
        if (this.data.searchBoxData.isPreventTriggerReachBottom || this.customData.hasAllSubmitsFetched || this.data.isLoadingMore) this.setData({
            noMore: this.customData.hasAllSubmitsFetched
        }); else {
            this.setData({
                isLoadingMore: !0
            });
            this._getSubmitList(!0);
        }
    },
    onReady: function() {
        a.globalData.justPunched = !1;
    },
    onShow: function() {
        var t = this, e = this.customData, s = this.data.submitListObj.submit_list;
        if (this.data.hasNotificationUnread && i.setDataImproved(this, {
            hasNotificationUnread: !1
        }), e.hasInited && !e.afterPreviewingImage) if (a.globalData.justPunched) a.globalData.justPunched = !1, 
        e.offset = 0, this.hideSortOptions(), this._refreshCourseDetail(function() {
            s && s.length && s.length > e.limit ? t._setupMainData({
                limit: s.length
            }) : t._setupMainData();
        }); else {
            var o = i.getSubmitListObj();
            o && i.setDataImproved(this, {
                submitListObj: o
            }, !0);
        } else e.afterPreviewingImage = !1;
    },
    onHide: function() {
        a.util.stopVoicePlay(), a.globalData.calendar_data = {}, a.globalData.comment_data = {}, 
        a.globalData.detail_priase = {}, a.globalData.msg_data = {};
    },
    onUnload: function() {
        a.globalData.backgroundAudioManager && a.globalData.backgroundAudioManager.src && (a.globalData.backgroundAudioManager.stop(), 
        a.globalData.backgroundAudioManager = null), a.globalData.calendar_data = {}, a.globalData.comment_data = {}, 
        a.globalData.detail_priase = {}, a.globalData.msg_data = {}, i.clearSubmitListObj();
    },
    onShareAppMessage: function(t) {
        var e = this, o = this.customData, r = o.options, n = (o.invite_code, t.from, t.target, 
        this.data.courseDetail), c = n.title, u = n.share_cover, d = n.course_type;
        return {
            title: c,
            path: i.getFullPath(this.route, {
                courseId: r.courseId,
                witchDay: r.witchDay,
                shareUser: a.globalData.loginUser.user_id
            }),
            desc: "",
            imageUrl: i.getCourseCover(u, d, a.globalData.loginUser.user_type_login),
            complete: function(t) {
                var a;
                t.errMsg.split(":").indexOf("ok") <= -1 || 3 === e.data.courseDetail.permit_type && (a = t.shareTickets[0], 
                s.setCourseGroup(a, r.courseId, function() {}, function(t) {
                    s.forceUpdateSession(), wx.showModal({
                        title: "失败",
                        content: "设置微信群课程失败，请重新分享",
                        showCancel: !1,
                        confirmText: "我知道了"
                    });
                }));
            }
        };
    },
    _getSevenDaysCalendar: function(t, e, a) {
        for (var o = this, r = [], n = -3; n < 3; n++) r.push(i.getDateFromCurrentDate(t, n).yymmdd);
        s.fetchSevenDaysCalenadr(this.customData.options.courseId, r, function(a) {
            var s = o.customData.today;
            a.seven_data.forEach(function(e) {
                e.dd = parseInt(e.submit_date.split("-")[2]), e.isToday = e.submit_date > s ? "later-than-today" : e.submit_date === s ? "today" : "", 
                e.grid = e.calendar_id > 0 ? "grid" : "", e.weekSelect = e.submit_date === t ? "select-date-bg" : "", 
                e.state = e.submit_status ? "ok-bg" : "not-bg";
                var a = {
                    0: "日",
                    1: "一",
                    2: "二",
                    3: "三",
                    4: "四",
                    5: "五",
                    6: "六"
                };
                e.week = a[e.weekday];
            }), i.setDataImproved(o, {
                calendar: a,
                canSubmit: t === s || o.data.courseDetail.remedy_submit_count > 0
            }), "function" == typeof e && e();
        }, function(t) {
            i.showError("获取日历失败：" + t.errMsg, o), "function" == typeof a && a();
        });
    },
    _setPageAfterLogin: function() {
        var t = this, e = this.customData;
        e.loginUser = a.globalData.loginUser, this._refreshCourseDetail(function(a) {
            s.permissionChecker({
                that: t,
                courseID: e.options.courseId,
                hasPermission: e.options.hasPermission
            }, function() {
                t._initPage();
            });
        });
    },
    _initPage: function() {
        i.showToast("加载中", "loading");
        var t = this.customData.options, e = t.courseId, a = t.isFromOverview, s = t.isFromCalendar, o = this.data.courseDetail;
        if (2 !== o.sold_out_status || o.is_submited) {
            wx.showShareMenu && wx.showShareMenu({
                withShareTicket: !0,
                fail: function(t) {
                    console.log("showShareMenu failed: " + JSON.stringify(t));
                }
            });
            var r = this.customData;
            r.options, r.startAt, r.endAt;
            o.is_submited || !o.summary_enabled || a || s ? (this._getSevenDaysCalendar(this.customData.options.witchDay), 
            this._setupMainData(), this.customData.hasInited = !0) : wx.redirectTo({
                url: "/pages/user/course_overview/course_overview?courseId=" + e + "&courseType=0"
            });
        }
    },
    _refreshCourseDetail: function(t) {
        var e = this, a = this.customData, o = a.options, r = o.courseId, n = o.witchDay;
        s.fetchCourseDetail(r, function(s) {
            wx.setNavigationBarTitle({
                title: s.title
            });
            var o = i.currentBeijingTime(), r = i.tTimeFormat(s.start_at), c = i.tTimeFormat(s.ended_at);
            a.startAt = r, a.endAt = c, a.today = o;
            var u = n || o;
            u > o && (u = o);
            var d = o >= r, h = u === o || s.remedy_submit_count > 0;
            u < r ? u = r : u > c && (u = c), a.options.witchDay = u, i.setDataImproved(e, {
                startAt: r,
                canSubmit: h,
                courseHasStarted: d,
                countDown: i.dateDiff(r, o),
                courseDetail: s,
                URLFullCalendar: "/pages/user_sub/calendar/calendar?courseId=" + s.course_id + "&startAt=" + r + "&endAt=" + c + "&type=redirect"
            }, !0), 2 !== s.sold_out_status || s.is_submited ? "function" == typeof t && t(s) : i.hideToast();
        });
    },
    _setupMainData: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        console.log("_setupMainData"), this._getTopic(), this._getMessages();
        this._getSubmitList(!1, t);
    },
    changeDay: function(t) {
        var e = t.currentTarget.dataset.day, a = this.customData;
        e.calendar_id > 0 && "later-than-today" !== e.isToday && (a.options.witchDay = e.submit_date, 
        a.order_type = 0, a.offset = 0, i.stopVideoPlay(), i.showToast("加载中...", "loading", 3e3), 
        this._getSevenDaysCalendar(e.submit_date), this._setupMainData());
    },
    toMsg: function() {
        wx.navigateTo({
            url: "/pages/user_sub/message/message?submit_ids=" + this.customData.submit_ids
        });
    },
    _hasPunchcardPermission: function() {
        var t = this.customData, e = t.options, a = t.today, s = this.data, o = s.submitListObj, r = s.courseDetail;
        if (o.blacklist_state) return i.showError("无权限打卡，请联系超级管理员。", this), !1;
        var n = i.generateBeijingTime(), c = n.getHours(), u = n.getMinutes();
        c < 10 && (c = "0" + c), u < 10 && (u = "0" + u);
        var d = c + ":" + u;
        return a !== e.witchDay || !(d < r.start_clock || d > r.end_clock) || (i.showError("打卡限制时段为" + r.start_clock + "-" + r.end_clock, this), 
        !1);
    },
    _getMessages: function() {
        var t = this;
        s.fetchMessages(this.customData.options.courseId, function(e) {
            t.customData.submit_ids = e.submit_ids.join(","), i.setDataImproved(t, {
                selfMsg: e.msg_cnt
            });
        });
    },
    _getSubmitList: function() {
        var a = this, o = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = this.customData, c = n.options, u = n.offset, d = n.limit, h = n.order_type, l = n.search_user_name, m = n.loadedSubmitMap;
        s.fetchSubmitList(e({
            offset: u,
            limit: d,
            order_type: h,
            search_user_name: l,
            course_id: c.courseId,
            record_at: c.witchDay
        }, r), function(e) {
            e.my_submit = e.my_submit || {}, e.submit_list = e.submit_list || [];
            var s = e.my_submit, r = e.submit_list, n = e.limit, c = e.course_type, u = e.is_hide, d = e.eval_state, l = e.category, f = e.result_effect, g = a.data.submitListObj.submit_list || [];
            a.customData.offset += r.length;
            var _ = function(t) {
                t.course_type = c, t.is_hide = u, t.eval_state = d, t.category = l, t.result_effect = f, 
                t.answer_score = Math.floor(t.answer_score);
            };
            if (_(s), a.customData.hasAllSubmitsFetched = r.length < n, s.user_id) {
                var D = r.findIndex(function(t) {
                    return t.user_id === s.user_id;
                });
                D > -1 && r.splice(D, 1);
            }
            if (o) {
                var p = [];
                r.forEach(function(t) {
                    _(t), m[t.submit_id] || (p.push(t), m[t.submit_id] = !0);
                }), e.submit_list = [].concat(t(g), p);
            } else {
                var b = {};
                r.forEach(function(t) {
                    _(t), b[t.submit_id] = !0;
                }), a.customData.loadedSubmitMap = b;
            }
            i.setSubmitListObj(e), i.setDataImproved(a, {
                submitListObj: e,
                orderType: h
            });
        }, function(t) {
            var e = t.errType, s = t.errMsg;
            "code" === e && 409 === s ? wx.showModal({
                title: "提示",
                content: "此打卡已被管理员删除",
                showCancel: !1,
                success: function(t) {
                    t.confirm && wx.redirectTo({
                        url: "/pages/user/my/my"
                    });
                }
            }) : i.showError("获取数据失败：" + s, a);
        }, function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), i.hideToast(), i.setDataImproved(a, {
                isLoadingMore: !1
            });
        });
    },
    toggleSortOptions: function() {
        this.setData({
            sortOptionsHidden: !this.data.sortOptionsHidden
        });
    },
    showSortOptions: function() {
        this.setData({
            sortOptionsHidden: !1
        });
    },
    hideSortOptions: function() {
        this.setData({
            sortOptionsHidden: !0
        });
    },
    showSearchBox: function() {
        this.hideSortOptions(), this.setData({
            "searchBoxData.isShowSearchBox": !0,
            "searchBoxData.isPreventTriggerReachBottom": !0
        });
    },
    cancelSearch: function() {
        this.setData({
            "searchBoxData.isShowSearchBox": !1,
            "searchBoxData.isPreventTriggerReachBottom": !1
        });
        var t = this.customData;
        if (t.search_user_name) {
            t.offset = 0, t.search_user_name = "";
            this._getSubmitList(!1);
        }
    },
    completeSearch: function(t) {
        this.customData.offset = 0, this.customData.search_user_name = t.detail.value;
        this._getSubmitList(!1, {
            limit: 199
        }, function() {
            wx.createSelectorQuery && wx.createSelectorQuery().select("#userList").fields({
                rect: !0
            }, function(t) {
                wx.pageScrollTo({
                    scrollTop: t.top
                });
            }).exec();
        });
    },
    changeSortType: function(t) {
        this.hideSortOptions();
        var e = t.target.dataset.ordertype;
        if (void 0 !== e && e !== this.customData.order_type) {
            this.customData.offset = 0, this.customData.order_type = e;
            this._getSubmitList(!1);
        }
    },
    _getNotification: function(t) {
        var e = this;
        s.getCourseInform({
            courseCalendarID: t
        }, function(t) {
            var a = JSON.parse(t.content_json).hybrid_content;
            Array.isArray(a[0].content) ? i.setDataImproved(e, {
                hasNotificationUnread: !0,
                informDataPc: JSON.stringify(a),
                informDataApp: ""
            }) : i.setDataImproved(e, {
                hasNotificationUnread: !0,
                informDataPc: "",
                informDataApp: t.content_json
            });
        }, function(t) {
            i.showError("获取课程通知失败：" + t.errMsg, e);
        });
    },
    closeNotification: function(t) {
        this.setData({
            hasNotificationUnread: !1
        });
    },
    markPreview: function() {
        this.customData.afterPreviewingImage = !0;
    },
    _getTopic: function() {
        var t = this, e = this.customData.options, a = e.courseId, o = e.witchDay;
        s.fetchTopicByDate(a, o, function(e) {
            console.log("休息日：" + e.is_offday), e.is_offday || i.setDataImproved(t, {
                topic: e
            }, !0);
            var a = 1 === e.is_push_message && (1 === e.push_message_type || 2 === e.push_message_type && e.is_submited || 3 === e.push_message_type && !e.is_submited), s = a ? "/pages/admin/course_inform_detail/course_inform_detail?courseType=0&courseId=" + e.course_id + "&courseCalendarId=" + e.calendar_id + "&witchDay=" + o + "T00:00:00+08:00&isFrom=home" : "";
            a && !e.is_message_entered && t._getNotification(e.calendar_id), i.setDataImproved(t, {
                offDay: !!e.is_offday,
                hasNotification: a,
                URLNotification: s
            }, !0);
        });
    },
    loginSuccess: function() {
        i.setDataImproved(this, {
            notLogin: !1
        }), this._setPageAfterLogin();
    },
    setAudioType: function(t) {
        this.setData({
            currentAudioType: a.globalData.currentAudioType
        });
    },
    _folded: function(t) {
        console.log(t), this.setData({
            startReading: !0
        });
    }
});