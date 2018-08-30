var t = getApp(), e = t.service, o = t.util, i = o.getYYMMDD;

Page({
    data: {
        notAssess: !0,
        labelText: {},
        isShare: !1,
        URLCourseHome: "",
        leftSubmitId: 0,
        rightSubmitId: 0,
        currentAudioType: ""
    },
    customData: {
        options: {},
        currentPath: "",
        hasInited: !1,
        afterPreviewingImage: !1
    },
    onLoad: function(i) {
        var s = this, a = this.customData;
        i.isShare = "true" === i.isShare, i.order_type = parseInt(i.order_type), i.no_remark = parseInt(i.no_remark), 
        a.options = i.isShare ? i : t.globalData.nowCourse || {}, a.currentPath = o.getFullPath(this.route, a.options), 
        e.forAdminOnly(a.currentPath, function() {
            i.courseId && i.submitId && i.courseCalendarId && (void 0 == a.options.course_type && e.fetchCourseDetail(i.courseId, function(t) {
                a.options.course_type = t.course_type;
            }, function(t) {}), a.options.course_id = i.courseId, a.options.course_calendar_id = i.courseCalendarId, 
            a.options.witchDay = i.witchDay, a.options.submit_id = i.submitId, console.log(a));
            var o = t.globalData.collection;
            o && o.courseId == i.courseId ? e.addInviteePointData({
                course_id: o.courseId,
                share_type: o.submitId ? 1 : 2,
                action_type: 1,
                inviter_id: o.inviterId ? o.inviterId : 0,
                submit_id: o.submitId ? o.submitId : 0
            }, function() {
                t.globalData.collection = null, s._setPageAfterLogin();
            }, function() {
                s._setPageAfterLogin();
            }) : s._setPageAfterLogin();
        }, function() {
            o.setDataImproved(s, {
                notLogin: !0,
                submitId: a.options.submitId
            });
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this.customData;
        t.hasInited && !t.afterPreviewingImage ? this._getSubmitDetail() : t.afterPreviewingImage = !1;
    },
    onHide: function() {
        t.util.stopVoicePlay();
    },
    onShareAppMessage: function() {
        var t = this.customData.options;
        console.log(t);
        var e = t.course_id, i = t.submit_id, s = t.course_calendar_id, a = t.course_type;
        return console.log(o.getFullPath(this.route, {
            course_id: e,
            submit_id: i,
            course_calendar_id: s,
            course_type: a,
            isShare: !0
        })), {
            title: this.data.submitData.title,
            desc: "鲸打卡的分享",
            path: o.getFullPath(this.route, {
                course_id: e,
                submit_id: i,
                course_calendar_id: s,
                course_type: a,
                isShare: !0
            })
        };
    },
    onPullDownRefresh: function() {
        this.data.notLogin || this._getSubmitDetail();
    },
    _setPageAfterLogin: function() {
        var t = this, i = this.customData, s = i.options, a = i.currentPath;
        s.daySignType && e.collectDataShare({
            course_id: parseInt(s.course_id),
            type: "s" === s.daySignType ? 2 : 3
        }), e.checkAuthority(s.course_id, a, function(e) {
            wx.showShareMenu && wx.showShareMenu({
                withShareTicket: !0
            }), o.setDataImproved(t, {
                isShare: s.isShare
            }), t._getSubmitDetail();
        });
    },
    _getSubmitDetail: function(t, i) {
        var s = this, a = this.customData.options;
        e.util.showToast("加载中...", "loading", 5e3), e.fetchSubmitDetail(a.submit_id, function(t) {
            var e = t[0] || {}, i = e.title, r = e.course_type, u = e.course_started_days, n = e.course_calendar_title, c = e.sequence, d = e.course_id, l = e.course_calendar_id, h = e.created_at;
            wx.setNavigationBarTitle({
                title: i
            });
            var m = {
                topTitle: "第" + u + "天"
            }, _ = {
                topTitle: "" + n
            }, g = {
                topTitle: "第" + c + "课"
            }, p = 2 === r ? g : 1 === r ? _ : m, I = 2 === r ? "/pages/admin/unlock/unlock?courseId=" + d + "&calendarId=" + a.courseCalendarId : 1 === r ? "/pages/admin_homework/home/home?courseId=" + d + "&courseCalendarId=" + l : "/pages/user/home/home?courseId=" + d + "&witchDay=" + o.getYYMMDD(h);
            o.setDataImproved(s, {
                submitData: e,
                labelText: p,
                URLCourseHome: I
            }, !0);
        }, function(t) {
            "code" !== t.errType || 119 !== t.errMsg ? e.util.showError("获取失败：" + t.errMsg, s) : e.util.showError("此内容已经被删除", s);
        }, function() {
            e.util.hideToast(), wx.stopPullDownRefresh(), s.customData.hasInited = !0;
        });
        var r = a.submit_id, u = a.order_type, n = a.search_user_name, c = a.no_remark;
        e.fetchSubmitAround({
            submit_id: r,
            order_type: u,
            search_user_name: n,
            no_remark: c
        }, function(t) {
            s.setData({
                leftSubmitId: t.left_submit_id,
                rightSubmitId: t.right_submit_id
            });
        });
    },
    longPicture: function() {
        var t = this, i = this.customData.options, s = [ "d", "", i.submit_id, "", "", i.course_id, i.course_calendar_id, "", "l" ].join("z");
        console.log("longPicture scene:", s), o.showToast("正在生成...", "loading", 5e3), e.fetchLongPicture(i.submit_id, s, function(e) {
            o.hideToast(), t.customData.afterPreviewingImage = !0, wx.previewImage({
                urls: [ e.submit_img_url ]
            });
        }, function(t) {
            o.hideToast(), wx.showModal({
                title: "错误",
                content: "生成失败：" + t.errMsg,
                showCancel: !1
            });
        });
    },
    commentOther: function() {
        var t = this.customData.options, e = void 0, o = this.customData.options.witchDay || i(t.created_at);
        console.log(t), 0 == t.course_type ? e = "/pages/admin/home/home?courseId=" + t.course_id + "&witchDay=" + o : 1 == t.course_type ? e = "/pages/admin_homework/home/home?courseId=" + t.course_id + "&courseHomeworkId=" + t.course_calendar_id : 2 == t.course_type && (e = "/pages/admin/unlock/unlock?courseId=" + t.course_id + "&calendarId=" + t.course_calendar_id), 
        wx.redirectTo({
            url: e
        });
    },
    markPreview: function() {
        console.log("event preview pic"), this.customData.afterPreviewingImage = !0;
    },
    loginSuccess: function() {
        o.setDataImproved(this, {
            notLogin: !1
        }), this._setPageAfterLogin();
    },
    toggleSubmit: function(t) {
        var e = this.data, o = e.leftSubmitId, i = e.rightSubmitId, s = "last" === t.currentTarget.dataset.order ? o : i;
        this.customData.options.submit_id = s || this.customData.options.submit_id, s && this._getSubmitDetail();
    },
    setAudioType: function(e) {
        this.setData({
            currentAudioType: t.globalData.currentAudioType
        });
    }
});