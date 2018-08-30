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
}, a = getApp(), s = a.service, o = a.util, i = a.mixins;

Page({
    data: {
        noMore: !1,
        showHomeworkList: !1,
        themeEditable: !0,
        isBottom: !1,
        homeworkTitleList: [],
        selfMsg: 0,
        netWorkStatus: !0,
        canUseShareButton: !!wx.canIUse && wx.canIUse("button.open-type.share"),
        shareHidden: !0,
        topic: {},
        courseDetail: {},
        submitListObj: {},
        isLoadingMore: !1,
        topicType: "normal",
        naviList: [],
        selectReset: !1,
        currentAudioType: ""
    },
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
        isLoadingHomeWorkList: !1
    },
    onLoad: function(t) {
        var e = this;
        console.log(t);
        var a = this.customData;
        t.courseId = parseInt(t.courseId), t.courseCalendarId = parseInt(t.courseCalendarId || t.courseHomeworkId), 
        a.options = t;
        var i = o.getFullPath(this.route, t);
        this.customData.currentPath = i, s.forAdminOnly(i, function() {
            e._setPageAfterLogin();
        }, function() {
            o.setDataImproved(e, {
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
            this.setData({
                isLoadingMore: !0
            });
            this._getSubmitList(!0);
        }
    },
    onReady: function() {
        this.animation = wx.createAnimation(), this.netWorkCheck();
    },
    onShow: function() {
        var t = this, e = this.customData, s = this.data.submitListObj.submit_list;
        if (this.data.showHomeworkList && o.setDataImproved(this, {
            showHomeworkList: !1
        }), e.hasInited && !e.afterPreviewingImage) {
            var i = a.globalData.onshowData;
            if (i[this.route] && i[this.route]["pages/admin_sub/comments/comments"]) {
                var r = i[this.route]["pages/admin_sub/comments/comments"], n = s.findIndex(function(t) {
                    return t.submit_id === parseInt(r.submitId);
                }), u = s[n];
                return u.avg_score = u.avg_score ? (u.avg_score + r.data.score) / 2 : r.data.score, 
                u.remarks = s[n].remarks || [], u.remarks.push(r.data), void o.setDataImproved(this, {
                    submitListObj: this.data.submitListObj
                }, !0, function() {
                    i[t.route] = null;
                });
            }
            this.customData.offset = 0;
            var c = a.globalData.homework_list_data;
            c && c.course_calendar_id && (this.customData.options.courseCalendarId = c.course_calendar_id), 
            this._refreshCourseDetail(function() {
                s && s.length && s.length > e.limit ? t._setupMainData({
                    limit: s.length
                }) : t._setupMainData();
            });
        } else e.afterPreviewingImage = !1;
    },
    onHide: function() {
        a.util.stopVoicePlay(), a.globalData.homework_list_data = {}, a.globalData.comments_data = {}, 
        a.globalData.detail_priase = {};
    },
    onUnload: function() {
        a.globalData.backgroundAudioManager && a.globalData.backgroundAudioManager.src && (a.globalData.backgroundAudioManager.stop(), 
        a.globalData.backgroundAudioManager = null), a.globalData.homework_list_data = {}, 
        a.globalData.comments_data = {}, a.globalData.detail_priase = {};
    },
    onShareAppMessage: function(t) {
        var e = this, i = this.customData, r = i.invite_code, n = i.options, u = this.data.courseDetail, c = u.title, h = u.share_cover, d = u.course_type, l = t.from, m = t.target, _ = o.getFullPath(this.route, n);
        return "button" === l && "invitation" === m.dataset.sharetype && (_ = "/pages/user_sub/course_invitation/course_invitation?invite_code=" + r, 
        c = "邀请你参加“" + c + "”", console.log("onShareAppMessage", _), this._createCourseInvitation()), 
        {
            title: c,
            path: _,
            imageUrl: o.getCourseCover(h, d, a.globalData.loginUser.user_type_login),
            complete: function(t) {
                var a;
                t.errMsg.split(":").indexOf("ok") <= -1 || 3 === e.data.courseDetail.permit_type && (a = t.shareTickets[0], 
                s.setCourseGroup(a, n.courseId, function() {}, function(t) {
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
    reLink: function(t) {
        this.setData({
            netWorkStatus: !0
        }), this.onLoad({
            courseId: courseId,
            course_calendar_id: course_calendar_id
        }), this.netWorkCheck();
    },
    netWorkCheck: function() {
        var t = this, e = 0, a = setInterval(function() {
            5 == ++e && (t.setData({
                netWorkStatus: t.data.netWorkStatus
            }), clearInterval(a));
        }, 1e3);
    },
    _refreshCourseDetail: function(t) {
        var e = this;
        s.fetchCourseDetail(this.customData.options.courseId, function(a) {
            e._setupCourseDetail(a), "function" == typeof t && t(a);
        });
    },
    _setupCourseDetail: function(t) {
        wx.setNavigationBarTitle({
            title: t.title
        }), o.setDataImproved(this, {
            courseDetail: t
        });
    },
    _setPageAfterLogin: function() {
        var t = this, e = this.customData, r = e.options, n = e.currentPath;
        s.checkAuthority(r.courseId, n, function(e) {
            r.courseCalendarId || (r.courseCalendarId = e.course_calendar_id);
            var s = a.globalData.loginUser, n = s.user_type, u = s.user_id;
            "wx1e2aca7da9c1652b" === s.extAppID && 3 === e.permit_type && 3 !== n && u !== e.holded_by_user_id && (t.customData.hideShareMenu = !0, 
            o.setDataImproved(t, {
                hideShareMenu: !0
            }), wx.hideShareMenu({
                success: function(t) {
                    console.log("hideShareMenu success", t);
                },
                fail: function(t) {},
                complete: function(t) {}
            })), t._createCourseInvitation(), i.setWXGroupAndName(a, t, e), t._setupCourseDetail(e), 
            t._initPage();
        });
    },
    _initPage: function() {
        wx.showShareMenu && !this.customData.hideShareMenu && wx.showShareMenu({
            withShareTicket: !0,
            fail: function(t) {}
        });
        var t = this.customData.options, e = [ {
            name: "home",
            cName: "首页",
            url: "/pages/admin/operation/operation",
            jumpType: "redirect"
        }, {
            name: "note",
            cName: "新建作业",
            url: "/pages/admin_homework_sub/addtheme/addtheme?courseId=" + t.courseId,
            jumpType: "navigate"
        }, {
            name: "punchStudents",
            cName: "参与概况",
            url: "/pages/admin/punch_students/punch_students?courseId=" + t.courseId + "&courseType=1",
            jumpType: "navigate"
        }, {
            name: "rank",
            cName: "排行榜",
            url: "/pages/user/weekly/weekly?course_id=" + t.courseId + "&fromWhich=navi",
            jumpType: "navigate"
        } ];
        o.setDataImproved(this, {
            naviList: e
        }), this._setupMainData();
    },
    _setupMainData: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this._getTopic(), this._getMessages();
        this._getSubmitList(!1, t);
    },
    _getTopic: function() {
        var t = this, e = this.customData.options.courseCalendarId;
        s.fetchTopic(e, function(e) {
            var a = e.category ? "exam" : e.eval_state ? "eval" : "normal";
            o.setDataImproved(t, {
                topic: e,
                topicType: a
            }, !0);
        });
    },
    _getMessages: function() {
        var t = this;
        s.fetchMessages(this.customData.options.courseId, function(e) {
            t.customData.submit_ids = e.submit_ids.join(","), o.setDataImproved(t, {
                selfMsg: e.msg_cnt
            });
        });
    },
    _getSubmitList: function() {
        var a = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = this, n = (arguments[2], 
        arguments[3], this.customData), u = n.options, c = n.offset, h = n.limit, d = n.order_type, l = n.search_user_name, m = n.loadedSubmitMap, _ = n.no_remark;
        s.fetchSubmitList(e({
            offset: c,
            no_remark: _,
            limit: h,
            order_type: d,
            search_user_name: l,
            course_id: u.courseId,
            course_calendar_id: u.courseCalendarId
        }, i), function(e) {
            e.submit_list = e.submit_list || [];
            var s = e.submit_list, i = e.limit, n = e.course_type, u = e.eval_state, c = e.category, h = e.result_effect, d = r.data.submitListObj.submit_list || [], l = function(t) {
                t.course_type = n, t.is_hide = !1, t.eval_state = u, t.category = c, t.result_effect = h, 
                t.answer_score = Math.floor(t.answer_score);
            };
            if (r.customData.hasAllSubmitsFetched = s.length < i, a) {
                var _ = [];
                s.forEach(function(t) {
                    l(t), m[t.submit_id] || (_.push(t), m[t.submit_id] = !0);
                }), e.submit_list = [].concat(t(d), _);
            } else {
                var g = {};
                s.forEach(function(t) {
                    l(t), g[t.submit_id] = !0;
                }), r.customData.loadedSubmitMap = g;
            }
            r.customData.offset = e.submit_list.length, o.setDataImproved(r, {
                submitListObj: e
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
            wx.hideNavigationBarLoading(), o.hideToast(), wx.stopPullDownRefresh(), r.customData.hasInited = !0, 
            o.setDataImproved(r, {
                isLoadingMore: !1
            });
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
    showHomeworkList: function() {
        var t = this;
        this.setData({
            showHomeworkList: !t.data.showHomeworkList
        });
    },
    toHomeworkList: function() {
        wx.navigateTo({
            url: "/pages/admin_homework/homework_list/homework_list?courseId=" + this.customData.options.courseId
        });
    },
    markPreview: function() {
        this.customData.afterPreviewingImage = !0;
    },
    toggleHomework: function(t) {
        var e = this;
        o.showToast("加载中...", "loading", 3e3), o.stopVideoPlay(), this.customData.options.courseCalendarId = "last" === t.currentTarget.dataset.order ? this.data.topic.calendar_left : this.data.topic.calendar_right, 
        this.setData({
            selectReset: !0
        }, function() {
            e.setData({
                selectReset: !1
            });
        }), this.customData.offset = 0, this.customData.order_type = 0, this.customData.search_user_name = "", 
        this.customData.no_remark = 0, this._setupMainData();
    },
    loginSuccess: function() {
        o.setDataImproved(this, {
            notLogin: !1
        }), this._setPageAfterLogin();
    },
    cancelNaming: function(t) {
        o.setDataImproved(this, {
            namingInputVisible: !1
        });
    },
    nameWXGroup: function(t) {
        var e = this, a = t.detail.value;
        a ? a.length > 12 ? o.showError("请输入12个字符以内的名称", this) : s.nameWXGroup({
            course_id: this.data.courseDetail.course_id,
            open_gid: this.customData.open_gid,
            name: a
        }, function() {
            o.showToast("命名成功", "success", 2e3);
        }, function(t) {
            o.showError("命名失败：" + t.errText, e);
        }, function() {
            o.setDataImproved(e, {
                namingInputVisible: !1
            });
        }) : o.showError("请输入名称", this);
    },
    _createCourseInvitation: function() {
        var t = this;
        s.createCourseInvitation(this.customData.options.courseId, function(e) {
            t.customData.invite_code = e.invite_code;
        });
    },
    setAudioType: function(t) {
        this.setData({
            currentAudioType: a.globalData.currentAudioType
        });
    }
});