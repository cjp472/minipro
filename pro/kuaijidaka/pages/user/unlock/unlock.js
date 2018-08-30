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
}, a = getApp(), s = a.service, o = a.util;

Page({
    data: {
        startReading: !1,
        noMore: !1,
        isBottom: !1,
        loadCompelete: !1,
        calendar_url: "",
        ranking_url: "",
        selfMsg: 0,
        pwdStyle: "display:none",
        informDataPc: "",
        informDataApp: "",
        netWorkStatus: !0,
        sortOptionsHidden: !0,
        canIUseRichtext: !!wx.canIUse && wx.canIUse("rich-text"),
        searchBoxData: {
            isShowSearchBox: !1,
            isPreventTriggerReachBottom: !1,
            cancelSearch: "cancelSearch",
            completeSearch: "completeSearch",
            searchedString: ""
        },
        pwdtip: "",
        courseNum: 1,
        courseDetail: {},
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
        showModal: !1,
        modalContent: "",
        submitCount: 0,
        currentAudioType: ""
    },
    customData: {
        options: {},
        messageIDs: [],
        offset: 0,
        limit: 10,
        order_type: 0,
        search_user_name: "",
        password: "",
        loadedSubmitMap: {},
        hasAllSubmitsFetched: !1,
        hasInited: !1,
        afterPreviewingImage: !1,
        hasPastOneDay: !1,
        submit_ids: "",
        ifTrialPass: !1,
        calendarId: 0,
        unlock_next_number: 0,
        currentSubmited: !1
    },
    onLoad: function(t) {
        var e = this, i = this.customData;
        t.courseId = parseInt(t.courseId), t.courseNum = parseInt(t.courseNum || 1), t.isFromOverview = "true" === t.isFromOverview, 
        t.isFromDetail = "true" === t.isFromDetail, i.options = t, s.forUserOnly(o.getFullPath(this.route, t), function() {
            var o = a.globalData.collection;
            o && o.courseId == t.courseId ? s.addInviteePointData({
                course_id: o.courseId,
                share_type: o.submitId ? 1 : 2,
                action_type: 1,
                inviter_id: o.inviterId ? o.inviterId : 0,
                submit_id: o.submitId ? o.submitId : 0
            }, function() {
                a.globalData.collection = null, e._setPageAfterLogin();
            }, function() {
                e._setPageAfterLogin();
            }) : e._setPageAfterLogin();
        }, function() {
            var a = parseInt(t.shareUser || 0);
            o.setDataImproved(e, {
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
        var t = this;
        this.hideSortOptions(), a.globalData.permissionPassed && (this.customData.ifTrialPass = !1, 
        a.globalData.permissionPassed = !1), this.data.hasNotificationUnread && o.setDataImproved(this, {
            hasNotificationUnread: !1
        });
        var e = this.customData, s = this.data.submitListObj, i = s.submit_list;
        s.my_submit;
        if (e.hasInited && !e.afterPreviewingImage) {
            var r = function() {
                t.customData.offset = 0;
                var a = {};
                i && i.length && i.length > e.limit && (a = {
                    limit: i.length
                }), o.showToast("加载中", "loading"), t._refreshCourseDetail(function(e) {
                    t._initPage(a);
                });
            }, n = a.globalData.unlock_data;
            if (n && n.courseNum) return this.customData.options.courseNum = n.courseNum, void r();
            if (a.globalData.justPunched) return a.globalData.justPunched = !1, void r();
            var c = o.getSubmitListObj();
            c && o.setDataImproved(this, {
                submitListObj: c
            }, !0);
        } else this.customData.afterPreviewingImage = !1;
    },
    _getNotification: function(t) {
        var e = this;
        s.getCourseInform({
            courseCalendarID: t
        }, function(t) {
            var a = JSON.parse(t.content_json).hybrid_content;
            Array.isArray(a[0].content) ? o.setDataImproved(e, {
                hasNotificationUnread: !0,
                informDataPc: JSON.stringify(a),
                informDataApp: ""
            }) : o.setDataImproved(e, {
                hasNotificationUnread: !0,
                informDataPc: "",
                informDataApp: t.content_json
            });
        }, function(t) {
            o.showError("获取课程通知失败：" + t.errMsg, e);
        });
    },
    onHide: function() {
        a.util.stopVoicePlay(), a.globalData.unlock_data = {}, a.globalData.calendar_data = {}, 
        a.globalData.comment_data = {}, a.globalData.detail_priase = {}, a.globalData.msg_data = {};
    },
    onUnload: function() {
        a.globalData.backgroundAudioManager && a.globalData.backgroundAudioManager.src && (a.globalData.backgroundAudioManager.stop(), 
        a.globalData.backgroundAudioManager = null), a.globalData.unlock_data = {}, a.globalData.calendar_data = {}, 
        a.globalData.comment_data = {}, a.globalData.detail_priase = {}, a.globalData.msg_data = {}, 
        o.clearSubmitListObj();
    },
    onShareAppMessage: function(t) {
        var e = this, i = this.customData, r = i.options, n = (i.invite_code, t.from, t.target, 
        this.data.courseDetail), c = n.title, u = n.share_cover, l = n.course_type;
        return {
            title: c,
            path: o.getFullPath(this.route, {
                courseId: r.courseId,
                courseNum: r.courseNum,
                calendarId: r.calendarId,
                shareUser: a.globalData.loginUser.user_id
            }),
            desc: "",
            imageUrl: o.getCourseCover(u, l, a.globalData.loginUser.user_type_login),
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
    _setPageAfterLogin: function() {
        var t = this, e = this.customData.options;
        this._refreshCourseDetail(function(a) {
            s.permissionChecker({
                that: t,
                courseID: e.courseId,
                hasPermission: e.hasPermission
            }, function(e) {
                t.customData.ifTrialPass = e, o.showToast("加载中", "loading"), t._initPage();
            });
        });
    },
    _initPage: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        wx.showShareMenu && wx.showShareMenu({
            withShareTicket: !0,
            fail: function(t) {
                console.log("showShareMenu failed: " + JSON.stringify(t));
            }
        });
        var a = this.customData.options, s = this.data.courseDetail, i = "/pages/user/weekly/weekly?course_id=" + a.courseId;
        o.setDataImproved(this, {
            ranking_url: i
        });
        this.fetchSevenUnlockCalendar(function(i) {
            var r = parseInt(i.unlock_next_number), n = a.courseNum;
            if (i.submit_cnt || a.isFromOverview) {
                t.customData.hasPastedOneDay = o.currentBeijingTime() > i.submit_lasttime.substring(0, 10);
                var c = function(s) {
                    t.customData.options.courseNum = a.courseNum, t.customData.calendarId = s.unlock_sequence_data[0].calendar_id, 
                    t._setupMainData(e);
                }, u = (t.data.courseDetail.practice_count, s.left_unlock_today ? i.unlock_next_number || 1 : s.unlock_number || 1), l = n <= u;
                if (l && (t.customData.ifTrialPass && n <= s.trial_count || !t.customData.ifTrialPass)) return void c(i);
                l ? t.customData.ifTrialPass && n <= s.trial_count ? a.courseNum = n : a.courseNum = r > 1 ? r - 1 : 1 : a.courseNum = u, 
                t.fetchSevenUnlockCalendar(function(t) {
                    c(t);
                });
            } else wx.redirectTo({
                url: "/pages/user/course_overview/course_overview?courseId=" + a.courseId + "&courseType=2"
            });
        });
    },
    _setupMainData: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this._getTopic(), this._getMessages();
        this._getSubmitList(!1, t);
    },
    _getTopic: function() {
        var t = this;
        s.fetchTopic(this.customData.calendarId, function(e) {
            t.customData.currentSubmited = 1 === e.is_submited;
            var a = 1 === e.is_push_message && (1 === e.push_message_type || 2 === e.push_message_type && e.is_submited || 3 === e.push_message_type && !e.is_submited), s = a ? "/pages/admin/course_inform_detail/course_inform_detail?courseType=2&courseId=" + e.course_id + "&courseCalendarId=" + e.calendar_id + "&isFrom=home" : "";
            a && !e.is_message_entered && t._getNotification(e.calendar_id), o.setDataImproved(t, {
                topic: e,
                hasNotification: a,
                URLNotification: s
            }, !0);
        });
    },
    _getMessages: function() {
        var t = this;
        s.fetchMessages(this.customData.options.courseId, function(e) {
            t.customData.submit_ids = e.submit_ids, o.setDataImproved(t, {
                selfMsg: e.msg_cnt
            });
        });
    },
    _getSubmitList: function() {
        var a = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = this, n = (arguments[2], 
        arguments[3], this.customData), c = n.options, u = n.offset, l = n.limit, d = n.order_type, h = n.search_user_name, m = n.loadedSubmitMap;
        s.fetchSubmitList(e({
            offset: u,
            limit: l,
            order_type: d,
            search_user_name: h,
            course_id: c.courseId,
            course_calendar_id: this.customData.calendarId
        }, i), function(e) {
            e.my_submit = e.my_submit || {}, e.submit_list = e.submit_list || [];
            var s = e.my_submit, i = e.submit_list, n = e.limit, c = e.course_type, u = e.is_hide, l = e.eval_state, h = e.category, f = e.result_effect, _ = r.data.submitListObj.submit_list || [];
            r.customData.offset += i.length;
            var g = function(t) {
                t.course_type = c, t.is_hide = u, t.eval_state = l, t.category = h, t.result_effect = f, 
                t.answer_score = Math.floor(t.answer_score);
            };
            if (g(s), r.customData.hasAllSubmitsFetched = i.length < n, s.user_id) {
                var p = i.findIndex(function(t) {
                    return t.user_id === s.user_id;
                });
                p > -1 && i.splice(p, 1);
            }
            if (a) {
                var D = [];
                i.forEach(function(t) {
                    g(t), m[t.submit_id] || (D.push(t), m[t.submit_id] = !0);
                }), e.submit_list = [].concat(t(_), D);
            } else {
                var b = {};
                i.forEach(function(t) {
                    g(t), b[t.submit_id] = !0;
                }), r.customData.loadedSubmitMap = b;
            }
            o.setSubmitListObj(e), o.setDataImproved(r, {
                submitListObj: e,
                orderType: d
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
            }) : o.showError("获取数据失败：" + a, r);
        }, function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), o.hideToast(), r.customData.hasInited = !0, 
            o.setDataImproved(r, {
                isLoadingMore: !1
            });
        });
    },
    _refreshCourseDetail: function(t) {
        var e = this, a = this.customData.options.courseId;
        s.fetchCourseDetail(a, function(s) {
            wx.setNavigationBarTitle({
                title: s.title
            }), o.setDataImproved(e, {
                courseDetail: s,
                calendar_url: "/pages/user_sub/unlock_level/unlock_level?courseId=" + a
            }, !0), 2 !== s.sold_out_status || s.is_submited ? "function" == typeof t && t(s) : o.hideToast();
        }, function(t) {
            o.showError("获取课程信息失败：" + t.errMsg, e);
        });
    },
    toMsg: function() {
        wx.navigateTo({
            url: "/pages/user_sub/message/message?submit_ids=" + this.customData.submit_ids
        });
    },
    toggleClass: function(t) {
        var e = this, a = function() {
            o.showToast("加载中...", "loading", 3e3), e.customData.offset = 0, e.customData.order_type = 0, 
            o.stopVideoPlay(), e._initPage();
        }, i = this.customData, r = i.calendarId, n = i.options, c = i.unlock_next_number, u = i.currentSubmited;
        if ("last" === t.currentTarget.dataset.order) n.courseNum--, r = this.data.topic.calendar_left, 
        a(); else {
            if (!u) return void wx.showModal({
                title: "提示",
                content: "解锁完当前课时，才能解锁下一课",
                showCancel: !1
            });
            var l = n.courseNum + 1;
            if (l < c || l === c && this.data.courseDetail.left_unlock_today || l <= this.data.courseDetail.unlock_number) if (this.customData.ifTrialPass && n.courseNum + 1 > this.data.courseDetail.trial_count) {
                var d = "";
                s.submitCheck({
                    course_id: this.customData.options.courseId
                }, function(t) {
                    switch (console.log(t), t.permit_type) {
                      case 1:
                        d = "输入密码";
                        break;

                      case 3:
                        d = "加入课程群";
                        break;

                      case 4:
                        d = "购买课程";
                    }
                    e.setData({
                        modalContent: "你已完成所有体验课，如需继续参与，需" + d + "。",
                        showModal: !0
                    }), e.modalConfirm = function() {
                        e.setData({
                            showModal: !1
                        }), s.permissionChecker({
                            that: e,
                            courseID: n.courseId,
                            hasPermission: n.hasPermission,
                            noTrialPass: !0
                        }, function() {
                            n.courseNum++, r = e.data.topic.calendar_right, e.customData.ifTrialPass = !1, a();
                        });
                    }, e.moadlCancel = function() {
                        e.setData({
                            showModal: !1
                        });
                    };
                });
            } else n.courseNum++, r = this.data.topic.calendar_right, a(); else {
                var h = this.data.courseDetail.left_unlock_today ? 1 === this.data.topic.unlock_type ? "等待管理员审核通过后可解锁下一课" : "当前课时解锁不通过，无法进入下一课时" : "每天最多解锁" + this.data.courseDetail.can_unlock_perday + "课时，请明天再来挑战吧。";
                wx.showModal({
                    content: h,
                    title: "提示",
                    showCancel: !1
                });
            }
        }
    },
    fetchSevenUnlockCalendar: function(t) {
        var e = this, a = this.customData.options.courseNum, i = this.customData.options.courseId, r = this.data.courseDetail.practice_count;
        a > r && (this.customData.options.courseNum = a = r), s.fetchSevenUnlockCalendar(i, a, function(a) {
            e.setData({
                submitCount: a.submit_cnt
            }), e.customData.unlock_next_number = a.unlock_next_number, "function" == typeof t && t(a);
        }, function(t) {
            o.showError("获取课时表失败：" + t.errMsg, e);
        });
    },
    onInputingPwd: function(t) {
        this.customData.password = t.detail.value;
    },
    pwdCancle: function() {
        this.customData.password, wx.redirectTo({
            url: "/pages/user/my/my"
        });
    },
    pwdSub: function(t) {
        var e = this;
        s.checkPassword(this.customData.options.courseId, this.customData.password, function(t) {
            e.customData.password = "", o.setDataImproved(e, {
                readyToInputPwd: !1
            }), o.showToast("加载中", "loading", 5e3), e._initPage();
        }, function(t) {
            e.customData.password = "";
            var a = t.errType, s = t.errMsg;
            "code" === a && 405 === s ? o.showError("密码错误", e) : o.showError("校验密码失败：" + t.errMsg, e);
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
    markPreview: function() {
        console.log("event preview pic"), this.customData.afterPreviewingImage = !0;
    },
    loginSuccess: function() {
        o.setDataImproved(this, {
            notLogin: !1
        }), this._setPageAfterLogin();
    },
    setAudioType: function(t) {
        this.setData({
            currentAudioType: a.globalData.currentAudioType
        });
    },
    closeNotification: function(t) {
        this.setData({
            hasNotificationUnread: !1
        });
    },
    _folded: function(t) {
        console.log(t), this.setData({
            startReading: !0
        });
    }
});