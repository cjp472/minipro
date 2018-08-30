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
}, o = getApp(), i = o.service, r = o.util;

Page({
    data: {
        startReading: !1,
        noMore: !1,
        informDataPc: "",
        informDataApp: "",
        showHomeworkList: !1,
        showAchievementPicture: !0,
        isBottom: !1,
        homeworkstartTime: "",
        homeworkendTime: "",
        courseHomeworkId: "",
        isLoadingHomeWorkList: !1,
        calendarTitleList: [],
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
        topic: {},
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
        URLHomeworkList: "",
        URLRank: "",
        currentAudioType: ""
    },
    customData: (a = {
        options: {},
        currentPath: "",
        offset: 0,
        limit: 10,
        order_type: 0,
        search_user_name: "",
        loadedSubmitMap: {},
        hasAllSubmitsFetched: !1,
        password: ""
    }, e(a, "loadedSubmitMap", {}), e(a, "hasInited", !1), e(a, "afterPreviewingImage", !1), 
    e(a, "URLPunchcard", ""), e(a, "isLoadingHomeWorkList", !1), e(a, "submit_ids", ""), 
    e(a, "is_submited", 0), e(a, "summary_enabled", 0), a),
    onLoad: function(t) {
        var e = this;
        t.courseId = parseInt(t.courseId), t.courseCalendarId = t.courseCalendarId || t.courseHomeworkId || 0, 
        t.isFromOverview = "true" === t.isFromOverview, this.customData.options = t, this.customData.currentPath = r.getFullPath(this.route, t), 
        i.forUserOnly(this.customData.currentPath, function() {
            e._setPageAfterLogin();
        }, function() {
            var a = parseInt(t.shareUser || 0);
            r.setDataImproved(e, {
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
        o.globalData.justPunched = !1;
    },
    onShow: function() {
        var t = this, e = this.customData, a = this.data.submitListObj.submit_list;
        if (this.data.hasNotificationUnread && r.setDataImproved(this, {
            hasNotificationUnread: !1
        }), this.data.showHomeworkList && r.setDataImproved(this, {
            showHomeworkList: !1
        }), e.hasInited && !e.afterPreviewingImage) {
            var s = function() {
                t.customData.offset = 0, t.hideSortOptions(), t._refreshCourseDetail(function() {
                    a && a.length && a.length > e.limit ? t._setupMainData({
                        limit: a.length
                    }) : t._setupMainData();
                });
            }, i = o.globalData.homework_list_data;
            if (i && i.course_calendar_id) return this.customData.options.courseCalendarId = i.course_calendar_id, 
            void s();
            if (o.globalData.justPunched) return o.globalData.justPunched = !1, void s();
            var n = r.getSubmitListObj();
            n && r.setDataImproved(this, {
                submitListObj: n
            }, !0);
        } else e.afterPreviewingImage = !1;
    },
    onHide: function() {
        o.util.stopVoicePlay(), o.globalData.calendar_data = {}, o.globalData.comment_data = {}, 
        o.globalData.detail_priase = {}, o.globalData.msg_data = {}, o.globalData.homework_list_data = {}, 
        this.data.hasNotificationUnread && this.setData({
            hasNotificationUnread: !1
        });
    },
    onUnload: function() {
        r.clearSubmitListObj(), o.globalData.backgroundAudioManager && o.globalData.backgroundAudioManager.src && (o.globalData.backgroundAudioManager.stop(), 
        o.globalData.backgroundAudioManager = null);
    },
    onShareAppMessage: function(t) {
        var e = this, a = this.customData, s = a.options, n = (a.invite_code, t.from, t.target, 
        this.data.courseDetail), c = n.title, u = n.share_cover, d = n.course_type;
        return {
            title: c,
            path: r.getFullPath(this.route, {
                courseId: s.courseId,
                courseCalendarId: s.courseCalendarId,
                shareUser: o.globalData.loginUser.user_id
            }),
            desc: "",
            imageUrl: r.getCourseCover(u, d, o.globalData.loginUser.user_type_login),
            complete: function(t) {
                var a;
                t.errMsg.split(":").indexOf("ok") <= -1 || 3 === e.data.courseDetail.permit_type && (a = t.shareTickets[0], 
                i.setCourseGroup(a, s.courseId, function() {}, function(t) {
                    i.forceUpdateSession(), wx.showModal({
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
        var t = this, e = this.customData.options;
        this._refreshCourseDetail(function(a) {
            i.permissionChecker({
                that: t,
                courseID: e.courseId,
                hasPermission: e.hasPermission
            }, function() {
                t._initPage();
            }), t._drawAchievementPicture(a.course_id, a.course_type);
        });
    },
    _initPage: function() {
        var t = this.customData.options, e = t.courseId, a = t.isFromOverview, s = this.data.courseDetail;
        if (r.showToast("加载中", "loading"), s.is_submited || !s.summary_enabled || a) {
            wx.showShareMenu && wx.showShareMenu({
                withShareTicket: !0
            });
            var o = "/pages/user_homework/homework_list/homework_list?courseId=" + e, i = "/pages/user/weekly/weekly?course_id=" + e;
            r.setDataImproved(this, {
                URLHomeworkList: o,
                URLRank: i
            }), this._setupMainData(), this.customData.hasInited = !0;
        } else wx.redirectTo({
            url: "/pages/user/course_overview/course_overview?courseId=" + e + "&courseType=1"
        });
    },
    _refreshCourseDetail: function(t) {
        var e = this;
        i.fetchCourseDetail(this.customData.options.courseId, function(a) {
            e.customData.is_submited = a.is_submited, e.customData.summary_enabled = a.summary_enabled, 
            wx.setNavigationBarTitle({
                title: a.title
            });
            var s = e.customData.options, o = (s.isFromOverview, s.courseId, s.courseCalendarId), i = (a.start_at, 
            a.pay_after_json, a.sold_out_status, a.course_calendar_id);
            a.is_submited;
            if (!o) {
                if (!i) return void wx.showModal({
                    title: "提示",
                    content: "此课程无作业，无法进入查看",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.redirectTo({
                            url: "/pages/user/my/my"
                        });
                    }
                });
                e.customData.options.courseCalendarId = i;
            }
            r.setDataImproved(e, {
                courseDetail: a
            }, !0), 2 !== a.sold_out_status || a.is_submited ? "function" == typeof t && t(a) : r.hideToast();
        }, function(t) {
            r.showError("获取课程详情失败" + t.errMsg, e);
        });
    },
    _setupMainData: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        console.log("_setupMainData"), this._getTopic(), this._getMessages();
        this._getSubmitList(!1, t);
    },
    _getTopic: function() {
        var t = this;
        i.fetchTopic(this.customData.options.courseCalendarId, function(e) {
            var a = r.currentBeijingTime(), s = r.yymmdd(e.start_at).slice(0, -3), o = r.getYYMMDD(e.start_at), i = r.yymmdd(e.ended_at).slice(0, -3), n = new Date().getTime() >= new Date(e.start_at).getTime(), c = r.yymmdd(e.ended_at) < r.yymmdd(r.currentBeijingTimeFull()), u = r.dateDiff(o, a), d = 1 === e.is_push_message && (1 === e.push_message_type || 2 === e.push_message_type && e.is_submited || 3 === e.push_message_type && !e.is_submited), h = d ? "/pages/admin/course_inform_detail/course_inform_detail?courseType=1&courseId=" + e.course_id + "&courseCalendarId=" + e.calendar_id + "&isFrom=home" : "";
            d && !e.is_message_entered && t._getNotification(), r.setDataImproved(t, {
                topic: e,
                homeworkStartTime: s,
                homeworkStartTimeShort: o,
                homeworkEndTime: i,
                homeworkHasStarted: n,
                homeworkHasEnded: c,
                countDown: u,
                hasNotification: d,
                URLNotification: h
            }, !0);
        });
    },
    _getMessages: function() {
        var t = this;
        i.fetchMessages(this.customData.options.courseId, function(e) {
            t.customData.submit_ids = e.submit_ids.join(","), r.setDataImproved(t, {
                selfMsg: e.msg_cnt
            });
        });
    },
    _getNotification: function() {
        var t = this;
        i.getCourseInform({
            courseCalendarID: this.customData.options.courseCalendarId
        }, function(e) {
            var a = JSON.parse(e.content_json).hybrid_content;
            Array.isArray(a[0].content) ? r.setDataImproved(t, {
                hasNotificationUnread: !0,
                informDataPc: JSON.stringify(a),
                informDataApp: ""
            }) : t.setData({
                hasNotificationUnread: !0,
                informDataPc: "",
                informDataApp: e.content_json
            });
        }, function(e) {
            r.showError("获取课程通知失败：" + e.errMsg, t);
        });
    },
    _getSubmitList: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = this, n = (arguments[2], 
        arguments[3], this.customData), c = n.options, u = n.offset, d = n.limit, h = n.order_type, m = n.search_user_name, l = n.loadedSubmitMap;
        i.fetchSubmitList(s({
            order_type: h,
            offset: u,
            limit: d,
            search_user_name: m,
            course_id: c.courseId,
            course_calendar_id: c.courseCalendarId
        }, a), function(a) {
            a.my_submit = a.my_submit || {}, a.submit_list = a.submit_list || [];
            var s = a.my_submit, i = a.submit_list, n = a.limit, c = a.course_type, u = a.is_hide, d = a.eval_state, m = a.category, f = a.result_effect, _ = o.data.submitListObj.submit_list || [];
            o.customData.offset += i.length;
            var g = function(t) {
                t.course_type = c, t.is_hide = u, t.eval_state = d, t.category = m, t.result_effect = f, 
                t.answer_score = Math.floor(t.answer_score);
            };
            if (g(s), o.customData.hasAllSubmitsFetched = i.length < n, s.user_id) {
                var p = i.findIndex(function(t) {
                    return t.user_id === s.user_id;
                });
                p > -1 && i.splice(p, 1);
            }
            if (e) {
                var D = [];
                i.forEach(function(t) {
                    g(t), l[t.submit_id] || (D.push(t), l[t.submit_id] = !0);
                }), a.submit_list = [].concat(t(_), D);
            } else {
                var w = {};
                i.forEach(function(t) {
                    g(t), w[t.submit_id] = !0;
                }), o.customData.loadedSubmitMap = w;
            }
            r.setSubmitListObj(a), r.setDataImproved(o, {
                submitListObj: a,
                orderType: h
            }, !0), r.hideToast();
        }, function(t) {
            r.hideToast();
            var e = t.errType, a = t.errMsg;
            "code" === e && 409 === a ? wx.showModal({
                title: "提示",
                content: "此作业已被管理员删除",
                showCancel: !1,
                success: function(t) {
                    t.confirm && wx.redirectTo({
                        url: "/pages/user/my/my"
                    });
                }
            }) : r.showError("获取作业数据失败：" + a, o);
        }, function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), r.setDataImproved(o, {
                isLoadingMore: !1
            });
        });
    },
    hideHomeworkList: function() {
        this.setData({
            showHomeworkList: !1
        });
    },
    changeHomework: function(t) {
        r.showToast("加载中", "loading", 300);
        var e = t.currentTarget.dataset.calendarid, a = this.customData;
        r.setDataImproved(this, {
            showHomeworkList: !1
        }), e !== a.options.courseCalendarId && (a.options.courseCalendarId = e, a.offset = 0, 
        a.order_type = 0, r.stopVideoPlay(), this._setupMainData());
    },
    toggleHomework: function(t) {
        r.showToast("加载中...", "loading", 3e3), r.stopVideoPlay(), this.customData.options.courseCalendarId = "last" === t.currentTarget.dataset.order ? this.data.topic.calendar_left : this.data.topic.calendar_right, 
        this._setupMainData();
    },
    toMsg: function() {
        wx.navigateTo({
            url: "/pages/user_sub/message/message?submit_ids=" + this.customData.submit_ids + "&courseType=1"
        });
    },
    preventNavToDetail: function() {},
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
    closeNotification: function() {
        this.setData({
            hasNotificationUnread: !1,
            showHomeworkList: !1
        });
    },
    toNotification: function() {
        if (this.data.hasNotification) {
            var t = this.customData.options, e = t.courseId, a = t.courseCalendarId;
            wx.navigateTo({
                url: "/pages/admin/course_inform_detail/course_inform_detail?courseType=1&courseId=" + e + "&courseCalendarId=" + a + "&isFrom=home"
            });
        } else r.showError("暂无课程通知", this);
    },
    markPreview: function() {
        console.log("event preview pic"), this.customData.afterPreviewingImage = !0;
    },
    loginSuccess: function() {
        r.setDataImproved(this, {
            notLogin: !1
        }), this._setPageAfterLogin();
    },
    _drawAchievementPicture: function(t, e) {
        var a = this;
        if (this.data.courseDetail.achieve_course && this.data.showAchievementPicture) {
            var s = this._getScene(t, e);
            i.fetchAchievementPicture({
                course_id: t,
                scene: s,
                is_new: 1
            }, function(t) {
                a.data.showAchievementPicture = !1, wx.previewImage({
                    current: r.formatBase64Image(t),
                    urls: [ r.formatBase64Image(t) ]
                });
            });
        }
    },
    _getScene: function(t, e) {
        var a = [];
        switch (e) {
          case 0:
            a = [ "c", t, "" ].join("z");
            break;

          case 1:
            a = "h" + (a = [ t ].join("z"));
            break;

          case 2:
            a = "j" + (a = [ t ].join("z"));
        }
        return a;
    },
    setAudioType: function(t) {
        this.setData({
            currentAudioType: o.globalData.currentAudioType
        });
    },
    _folded: function(t) {
        console.log(t), this.setData({
            startReading: !0
        });
    }
});