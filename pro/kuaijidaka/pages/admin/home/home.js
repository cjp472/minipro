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
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, a = getApp(), i = a.service, s = a.util, o = a.mixins;

Page({
    data: {
        noMore: !1,
        pcTheme: "",
        appTheme: "",
        started: "",
        isBottom: !1,
        loadCompelete: !1,
        selfMsg: 0,
        canUseShareButton: !!wx.canIUse && wx.canIUse("button.open-type.share"),
        shareHidden: !0,
        themeEditable: !0,
        canIUseRichtext: !!wx.canIUse && wx.canIUse("rich-text"),
        netWorkStatus: !0,
        topic: {},
        courseDetail: {},
        submitListObj: {},
        isLoadingMore: !1,
        topicType: "normal",
        naviList: [],
        URLFullCalendar: "",
        selectReset: !1,
        namingInputVisible: !1,
        selectType: {
            order_type: 0,
            search_user_name: "",
            no_remark: !1
        },
        currentAudioType: ""
    },
    customData: {
        options: {},
        offset: 0,
        limit: 10,
        order_type: 0,
        search_user_name: "",
        no_remark: 0,
        loadedSubmitMap: {},
        hasAllSubmitsFetched: !1,
        hasInited: !1,
        afterPreviewingImage: !1,
        startAt: "",
        endAt: "",
        today: "",
        currentPath: ""
    },
    onLoad: function(t) {
        var e = this, o = s.getFullPath(this.route, t);
        this.customData.currentPath = o, this.customData.options = t, i.forAdminOnly(o, function() {
            var s = a.globalData.collection;
            s && s.courseId == t.courseId ? i.addInviteePointData({
                course_id: s.courseId,
                share_type: s.submitId ? 1 : 2,
                action_type: 1,
                inviter_id: s.inviterId ? s.inviterId : 0,
                submit_id: s.submitId ? s.submitId : 0
            }, function() {
                a.globalData.collection = null, e._setPageAfterLogin();
            }, function() {
                e._setPageAfterLogin();
            }) : e._setPageAfterLogin();
        }, function() {
            s.setDataImproved(e, {
                notLogin: !0,
                courseId: t.courseId
            }, !0);
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
            s.setDataImproved(this, {
                isLoadingMore: !0
            }, !0);
            this._getSubmitList(!0);
        }
    },
    onReady: function() {
        this.animation = wx.createAnimation(), this.netWorkCheck();
    },
    onShow: function() {
        var t = this, e = this.customData, i = this.data.submitListObj.submit_list;
        if (e.hasInited && !e.afterPreviewingImage) {
            var o = a.globalData.onshowData;
            if (o[this.route] && o[this.route]["pages/admin_sub/comments/comments"]) {
                var n = o[this.route]["pages/admin_sub/comments/comments"], r = i.findIndex(function(t) {
                    return t.submit_id === parseInt(n.submitId);
                }), u = i[r];
                return u.avg_score = u.avg_score ? (u.avg_score + n.data.score) / 2 : n.data.score, 
                u.remarks = i[r].remarks || [], u.remarks.push(n.data), u.top = n.data.top, void s.setDataImproved(this, {
                    submitListObj: this.data.submitListObj
                }, !0, function() {
                    o[t.route] = null;
                });
            }
            var c = a.globalData.calendar_data.record_at;
            if (c) return e.options.witchDay === s.tTimeFormat(c) ? void 0 : (e.options.witchDay = s.tTimeFormat(c), 
            void this._initPage());
            e.offset = 0, i && i.length && i.length > e.limit ? this._setupMainData({
                limit: i.length
            }) : this._setupMainData();
        }
    },
    onHide: function() {
        a.util.stopVoicePlay(), a.globalData.calendar_data = {}, a.globalData.comments_data = {}, 
        a.globalData.detail_priase = {};
    },
    onUnload: function() {
        a.globalData.backgroundAudioManager && a.globalData.backgroundAudioManager.src && (a.globalData.backgroundAudioManager.stop(), 
        a.globalData.backgroundAudioManager = null), a.globalData.calendar_data = {}, a.globalData.comments_data = {}, 
        a.globalData.detail_priase = {};
    },
    onShareAppMessage: function(t) {
        var e = this, o = this.customData, n = o.options, r = o.invite_code, u = this.data.courseDetail, c = u.title, d = u.share_cover, h = u.course_type, m = t.from, l = t.target, p = "/pages/admin/home/home?courseId=" + n.courseId + "&witchDay=" + n.witchDay;
        return "button" === m && "invitation" === l.dataset.sharetype && (p = "/pages/user_sub/course_invitation/course_invitation?invite_code=" + r, 
        c = "邀请你参加“" + c + "”", console.log("onShareAppMessage", p), this._createCourseInvitation()), 
        {
            title: c,
            path: p,
            imageUrl: s.getCourseCover(d, h, a.globalData.loginUser.user_type_login),
            complete: function(t) {
                if (console.log("share complete"), !(t.errMsg.split(":").indexOf("ok") <= -1)) {
                    if (3 === e.data.courseDetail.permit_type) {
                        var a = t.shareTickets[0];
                        i.setCourseGroup(a, n.courseId, function() {
                            s.showToast("设置群成功", "success", 2e3);
                        }, function(t) {
                            i.forceUpdateSession(), wx.showModal({
                                title: "失败",
                                content: "设置微信群课程失败，请重新分享",
                                showCancel: !1,
                                confirmText: "我知道了"
                            });
                        });
                    }
                }
            }
        };
    },
    reLink: function(t) {
        this.setData({
            netWorkStatus: !0
        }), this.onLoad({
            courseId: courseId,
            witchDay: witchDay,
            end_time: endTime,
            start_at: startTime
        }), this.netWorkCheck();
    },
    netWorkCheck: function() {
        var t = this, e = 0, a = setInterval(function() {
            5 == ++e && (t.setData({
                netWorkStatus: t.data.netWorkStatus
            }), clearInterval(a));
        }, 1e3);
    },
    _setPageAfterLogin: function() {
        var t = this;
        i.checkAuthority(this.customData.options.courseId, this.customData.currentPath, function(e) {
            var i = a.globalData.loginUser, n = i.user_type, r = i.user_id;
            "wx1e2aca7da9c1652b" === i.extAppID && 3 === e.permit_type && 3 !== n && r !== e.holded_by_user_id && (t.customData.hideShareMenu = !0, 
            s.setDataImproved(t, {
                hideShareMenu: !0
            }), wx.hideShareMenu({
                success: function(t) {
                    console.log("hideShareMenu success", t);
                },
                fail: function(t) {},
                complete: function(t) {}
            })), t._createCourseInvitation(), o.setWXGroupAndName(a, t, e), t._setupCourseDetail(e), 
            t._initPage();
        });
    },
    _initPage: function() {
        wx.showShareMenu && !this.customData.hideShareMenu && wx.showShareMenu({
            withShareTicket: !0,
            fail: function(t) {}
        });
        var t = this.customData, e = [ {
            name: "home",
            cName: "首页",
            url: "/pages/admin/operation/operation",
            jumpType: "redirect"
        }, {
            name: "punchStudents",
            cName: "参与概况",
            url: "/pages/admin/punch_students/punch_students?witchDay=" + t.today + "&startTime=" + t.startAt + "&endTime=" + t.endAt + "&courseId=" + t.options.courseId + "&courseType=0",
            jumpType: "navigate"
        }, {
            name: "rank",
            cName: "排行榜",
            url: "/pages/user/weekly/weekly?course_id=" + t.options.courseId + "&fromWhich=navi",
            jumpType: "navigate"
        } ];
        s.setDataImproved(this, {
            naviList: e
        }), this._getSevenDaysCalendarAdmin(), this._setupMainData(), this.customData.hasInited = !0;
    },
    _refreshCourseDetail: function(t) {
        var e = this;
        i.fetchCourseDetail(this.customData.options.courseId, function(a) {
            e._setupCourseDetail(a), "function" == typeof t && t(a);
        });
    },
    _setupCourseDetail: function(t) {
        var e = this.customData, a = e.options.witchDay;
        wx.setNavigationBarTitle({
            title: t.title
        });
        var i = s.currentBeijingTime(), o = s.tTimeFormat(t.start_at), n = s.tTimeFormat(t.ended_at);
        e.startAt = o, e.endAt = n, e.today = i;
        var r = a || i;
        r < o ? r = o : r > n && (r = n), e.options.witchDay = r, s.setDataImproved(this, {
            courseDetail: t,
            URLFullCalendar: "/pages/admin_sub/calendar/calendar?courseId=" + t.course_id + "&startAt=" + o + "&endAt=" + n
        }, !0);
    },
    _setupMainData: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this._getTopic(), this._getMessages();
        this._getSubmitList(!1, t);
    },
    _getSevenDaysCalendarAdmin: function(t, e) {
        for (var a = this, o = this.customData.options, n = o.witchDay, r = o.courseId, u = [], c = -3; c < 3; c++) u.push(s.getDateFromCurrentDate(n, c).yymmdd);
        i.fetchSevenDaysCalenadrAdmin(r, u, function(e) {
            var i = a.customData.today;
            e.seven_data.forEach(function(t) {
                t.dd = parseInt(t.submit_date.split("-")[2]), t.isToday = t.submit_date > i ? "later-than-today" : t.submit_date === i ? "today" : "", 
                t.grid = t.calendar_id > 0 ? "grid" : "", t.weekSelect = t.submit_date === n ? "select-date-bg" : "", 
                t.state = t.valid_status ? "ok-bg" : "not-bg";
                var e = {
                    0: "日",
                    1: "一",
                    2: "二",
                    3: "三",
                    4: "四",
                    5: "五",
                    6: "六"
                };
                t.week = e[t.weekday];
            }), s.setDataImproved(a, {
                calendar: e
            }), "function" == typeof t && t();
        }, function(t) {
            s.showError("获取日历失败：" + t.errMsg, a), "function" == typeof e && e();
        });
    },
    _getTopic: function() {
        var t = this, e = this.customData.options, a = e.courseId, o = e.witchDay;
        i.fetchTopicByDate(a, o, function(e) {
            var a = e.category ? "exam" : e.eval_state ? "eval" : "normal";
            s.setDataImproved(t, {
                topic: e,
                topicType: a
            }, !0);
        });
    },
    _getMessages: function() {
        var t = this;
        i.fetchMessages(this.customData.options.courseId, function(e) {
            t.customData.submit_ids = e.submit_ids.join(","), s.setDataImproved(t, {
                selfMsg: e.msg_cnt
            });
        });
    },
    _getSubmitList: function() {
        var a = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = this, r = (arguments[2], 
        arguments[3], this.customData), u = r.options, c = r.offset, d = r.limit, h = r.order_type, m = r.search_user_name, l = r.loadedSubmitMap, p = r.no_remark;
        i.fetchSubmitList(e({
            offset: c,
            limit: d,
            no_remark: p,
            order_type: h,
            search_user_name: m,
            course_id: u.courseId,
            record_at: u.witchDay
        }, o), function(e) {
            e.submit_list = e.submit_list || [];
            var i = e.submit_list, o = e.limit, r = e.course_type, u = e.eval_state, c = e.category, d = e.result_effect, m = n.data.submitListObj.submit_list || [], p = function(t) {
                t.course_type = r, t.is_hide = !1, t.eval_state = u, t.category = c, t.answer_score = Math.floor(t.answer_score), 
                t.result_effect = d;
            };
            if (n.customData.hasAllSubmitsFetched = i.length < o, a) {
                var _ = [];
                i.forEach(function(t) {
                    p(t), l[t.submit_id] || (_.push(t), l[t.submit_id] = !0);
                }), e.submit_list = [].concat(t(m), _);
            } else {
                var f = {};
                i.forEach(function(t) {
                    p(t), f[t.submit_id] = !0;
                }), n.customData.loadedSubmitMap = f;
            }
            n.customData.offset = e.submit_list.length, s.setDataImproved(n, {
                submitListObj: e,
                orderType: h
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
            }) : s.showError("获取数据失败：" + a, n);
        }, function() {
            wx.hideNavigationBarLoading(), s.hideToast(), wx.stopPullDownRefresh(), s.setDataImproved(n, {
                isLoadingMore: !1
            });
        });
    },
    setTheme: function(t) {
        var e = this.data.topic;
        if (e.is_offday) s.showError("休息日无法创建主题", this); else if (e.pc_content) s.showError("该主题由PC端创建，请到电脑上操作", this); else {
            var a = this.customData.options;
            wx.navigateTo({
                url: "/pages/admin_sub/addtheme/addtheme?courseId=" + a.courseId + "&witchDay=" + encodeURIComponent(a.witchDay)
            });
        }
    },
    toHome: function(t) {
        wx.redirectTo({
            url: "/pages/user/my/my"
        });
    },
    preventNavToDetail: function() {},
    toMsg: function() {
        wx.navigateTo({
            url: "/pages/admin_sub/message/message?submit_ids=" + this.customData.submit_ids
        });
    },
    deleteSubmit: function(t) {
        console.log("deleteSubmit in home", t);
        var e = t.detail.submitID, a = this.data.submitListObj.submit_list, i = a.findIndex(function(t) {
            return t.submit_id === e;
        });
        i >= 0 && (a.splice(i, 1), s.setDataImproved(this, {
            "submitListObj.submit_list": a
        }, !0));
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
        this.setData({
            selectType: t.detail
        }), Object.assign(this.customData, t.detail), this.customData.offset = 0, this._getSubmitList(!1, t.detail);
    },
    toLink: function(t) {
        wx.navigateTo({
            url: "/pages/user_sub/link_article/link_article?website=" + t.currentTarget.dataset.website
        });
    },
    changeDay: function(t) {
        var e = this, a = t.currentTarget.dataset.day;
        a.calendar_id > 0 && (s.showToast("加载中...", "loading", 3e3), s.stopVideoPlay(), 
        this.customData.options.witchDay = a.submit_date, this.customData.offset = 0, this.customData.order_type = 0, 
        this.customData.search_user_name = "", this.customData.no_remark = 0, this.setData({
            selectReset: !0
        }, function() {
            e.setData({
                selectReset: !1
            });
        }), this._getSevenDaysCalendarAdmin(), this._setupMainData());
    },
    markPreview: function() {
        this.customData.afterPreviewingImage = !0;
    },
    loginSuccess: function() {
        s.setDataImproved(this, {
            notLogin: !1
        }), this._setPageAfterLogin();
    },
    cancelNaming: function(t) {
        s.setDataImproved(this, {
            namingInputVisible: !1
        });
    },
    nameWXGroup: function(t) {
        var e = this, a = t.detail.value;
        a ? a.length > 12 ? s.showError("请输入12个字符以内的名称", this) : i.nameWXGroup({
            course_id: this.data.courseDetail.course_id,
            open_gid: this.customData.open_gid,
            name: a
        }, function() {
            s.showToast("命名成功", "success", 2e3);
        }, function(t) {
            s.showError("命名失败：" + t.errText, e);
        }, function() {
            s.setDataImproved(e, {
                namingInputVisible: !1
            });
        }) : s.showError("请输入名称", this);
    },
    _createCourseInvitation: function() {
        var t = this;
        i.createCourseInvitation(this.customData.options.courseId, function(e) {
            t.customData.invite_code = e.invite_code;
        });
    },
    setAudioType: function(t) {
        this.setData({
            currentAudioType: a.globalData.currentAudioType
        });
    }
});