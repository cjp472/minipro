function e(e) {
    if (Array.isArray(e)) {
        for (var a = 0, t = Array(e.length); a < e.length; a++) t[a] = e[a];
        return t;
    }
    return Array.from(e);
}

var a = getApp(), t = a.service, s = a.util;

Component({
    properties: {
        courseParams: {
            type: Object,
            value: {}
        },
        topicParams: {
            type: Object,
            value: {}
        },
        submitId: {
            type: Number,
            value: 0
        },
        createdAt: {
            type: String,
            value: ""
        },
        admin: {
            type: Boolean,
            value: !1
        }
    },
    detached: function() {
        a.globalData.hasReadTips = !1;
    },
    data: {
        showShareOptions: !1,
        showInviteModal: !1
    },
    methods: {
        shareCourse: function() {
            var e = this, t = a.globalData.loginUser, r = t.user_type, i = t.user_id;
            if ("wx1e2aca7da9c1652b" !== t.extAppID || 3 !== this.data.courseParams.permit_type || 3 === r || i === this.data.courseParams.holded_by_user_id) {
                var o = function() {
                    e.setData({
                        showShareOptions: !0
                    });
                };
                a.globalData.hasReadTips ? o() : 3 == this.data.courseParams.permit_type ? wx.showModal({
                    title: "提示",
                    content: "此课程需管理员转发到群，随后点击群内链接。则此群具有课程参与权限",
                    showCancel: !1,
                    confirmText: "我知道了",
                    success: function(e) {
                        e.confirm && (a.globalData.hasReadTips = !0, o());
                    }
                }) : o();
            } else s.showToast("群课程只有超级管理员可以分享", "none", 2e3);
        },
        toRank: function() {
            var e = this.data.courseParams, a = e.course_id, t = (e.course_type, "/pages/user/weekly/weekly?course_id=" + a);
            wx.navigateTo({
                url: t
            });
        },
        participate: function() {
            var e = this.data.courseParams, a = e.course_id, t = e.course_type, r = e.start_at, i = e.ended_at, o = e.course_calendar_id, n = e.end_clock, d = e.start_clock;
            if (2 == t) s.showError("此操作仅支持在PC端进行", this); else {
                var c = "/pages/admin/punch_students/punch_students";
                0 == t ? c += "?witchDay=" + s.currentBeijingTime() + "&startTime=" + s.tTimeFormat(r) + "&endTime=" + s.tTimeFormat(i) + "&courseId=" + a + "&courseType=" + t + "&courseCalendarId=" + o + "&endAt=" + i + "&startAt=" + r + "&startClock=" + d + "&endClock=" + n : 1 == t && (c += "?courseId=" + a + "&courseType=" + t), 
                wx.navigateTo({
                    url: c
                });
            }
        },
        editTheme: function() {
            var e = this.data, a = e.courseParams, t = e.topicParams, r = a.course_id, i = a.course_type, o = t.record_at, n = t.pc_content, d = t.calendar_id;
            if (t.is_offday) s.showError("休息日无法创建主题", this); else if (n) s.showError("该主题由PC端创建，请到电脑上操作", this); else if (2 == i) s.showError("解锁课程的主题暂时只能在电脑端编辑", this); else {
                var c = 0 == i ? "/pages/admin_sub/addtheme/addtheme?courseId=" + r + "&witchDay=" + s.tTimeFormat(o) : "/pages/admin_homework_sub/addtheme/addtheme?courseId=" + r + "&courseCalendarId=" + d;
                wx.navigateTo({
                    url: c
                });
            }
        },
        courseInform: function() {
            var e = this.data, a = e.courseParams, t = e.topicParams, r = a.course_id, i = a.course_type, o = a.title, n = t.is_push_message, d = t.record_at, c = t.calendar_id, u = s.tTimeFormat(d) || "";
            if (2 == i) {
                var l = this.data.admin ? "admin" : "user";
                wx.navigateTo({
                    url: "/pages/user_sub/message_list/message_list?courseType=" + i + "&courseId=" + r + "&courseCalendarId=" + c + "&witchDay=" + u + "&isFrom=home&page=" + l
                });
            } else {
                var _ = s.currentBeijingTime();
                0 == i && u !== _ ? s.showError("只能提醒今天的课程", this) : 1 == n ? wx.navigateTo({
                    url: "/pages/admin/course_inform_detail/course_inform_detail?courseType=" + i + "&courseId=" + r + "&courseCalendarId=" + c + "&witchDay=" + u + "&isFrom=home"
                }) : 2 == n ? wx.showModal({
                    title: "提示",
                    content: "pc发送的主题，请pc操作。",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && wx.navigateTo({
                            url: "/pages/admin/course_inform_detail/course_inform_detail?courseType=" + i + "&courseId=" + r + "&courseCalendarId=" + c + "&witchDay=" + u + "&isFrom=home"
                        });
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "如需定时通知，请登录pc操作",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && wx.navigateTo({
                            url: "/pages/admin_sub/add_course_inform/add_course_inform?courseId=" + r + "&courseCalendarId=" + c + "&witchDay=" + u + "&title=" + o
                        });
                    }
                });
            }
        },
        closeWindow: function() {
            this.setData({
                showShareOptions: !1
            });
        },
        goQuestionList: function() {
            wx.navigateTo({
                url: "/pages/admin_sub/qustionList/questionList?courseCalendarId=" + this.data.topicParams.calendar_id
            });
        },
        goRead: function() {
            wx.navigateTo({
                url: "/pages/admin_sub/pre_read/pre_read?courseCalendarId=" + this.data.topicParams.calendar_id
            });
        },
        toQRpage: function() {
            var e = this.data, a = e.courseParams, t = e.topicParams, r = a.course_id, i = a.course_type, o = a.title, n = a.start_at, d = a.ended_at, c = t.calendar_title, u = t.record_at, l = t.calendar_id;
            if (0 == i) wx.navigateTo({
                url: "/pages/admin_sub/qrcode/qrcode?course_id=" + r + "&title=" + o + "&witchday=" + s.tTimeFormat(u) + "&start_at=" + s.tTimeFormat(n) + "&end_time=" + s.tTimeFormat(d) + "&course_type=" + i + "&time_start=" + n + "&time_end=" + d
            }); else if (1 == i) {
                var _ = t.start_at, m = t.ended_at;
                wx.navigateTo({
                    url: "/pages/admin_homework_sub/qrcode/qrcode?courseId=" + r + "&courseCalendarId=" + l + "&title=" + o + "|T" + c + "&course_type=" + i + "&time_start=" + _ + "&time_end=" + m
                });
            } else 2 == i && wx.navigateTo({
                url: "/pages/admin_sub/qrcode/qrcode?course_id=" + r + "&title=" + o + "&course_type=2"
            });
        },
        invite: function() {
            var t = a.globalData.loginUser, s = t.user_type, r = t.user_id, i = t.extAppID, o = this.data.courseParams.manager_user_ids.split(",").map(function(e) {
                return parseInt(e);
            }), n = [].concat(e(o), [ this.data.courseParams.holded_by_user_id ]).some(function(e) {
                return e === r;
            });
            if ("wx1e2aca7da9c1652b" === i && 3 === this.data.courseParams.permit_type && 3 !== s && r !== this.data.courseParams.holded_by_user_id) return this.inviteCard(), 
            !1;
            3 !== this.data.courseParams.permit_type || r != this.data.courseParams.holded_by_user_id && 3 != s && !n ? this.inviteCard() : this.setData({
                showInviteModal: !0
            });
        },
        inviteCard: function() {
            var e = this.data.courseParams, a = e.course_id, t = e.course_type, s = e.title;
            this.setData({
                showInviteModal: !1
            }), wx.navigateTo({
                url: "/pages/user_sub/invited_share/invited_share?title=" + s + "&course_type=" + t + "&course_id=" + a
            });
        },
        daySign: function() {
            var e = this.data.submitId;
            if (e) if (s.currentBeijingTime() !== s.getYYMMDD(this.data.createdAt)) wx.showModal({
                title: "提示",
                content: "只能生成今日的打卡日签",
                showCancel: !1
            }); else {
                var a = this.data, r = a.courseParams, i = a.topicParams, o = "d" + [ e, r.course_id, i.calendar_id, "s" ].join("z");
                console.log("scene:", o);
                var n = t.config.HOST + "signday/info2?submit_id=" + e + "&scene=" + o;
                this.triggerEvent("markPreview"), wx.previewImage({
                    urls: [ n ]
                });
            } else wx.showModal({
                title: "提示",
                content: "请先打卡后再进行生成日签操作",
                showCancel: !1
            });
        },
        toRecord: function() {
            wx.navigateTo({
                url: "/pages/user_sub/records_of_course/records_of_course?courseId=" + this.data.courseParams.course_id + "&userId=" + a.globalData.loginUser.user_id
            });
        },
        userCourseInform: function() {
            var e = this.data, a = e.courseParams, t = e.topicParams, s = a.course_id, r = a.course_type, i = t.record_at, o = t.calendar_id, n = t.is_push_message, d = t.push_message_type, c = t.is_submited, u = 1 === n && (1 === d || 2 === d && c || 3 === d && !c);
            if (2 == r) {
                var l = this.data.admin ? "admin" : "user";
                wx.navigateTo({
                    url: "/pages/user_sub/message_list/message_list?courseType=" + r + "&courseId=" + s + "&courseCalendarId=" + o + "&witchDay=" + i + "&isFrom=home&page=" + l
                });
            } else u ? wx.navigateTo({
                url: "/pages/admin/course_inform_detail/course_inform_detail?courseType=" + r + "&courseId=" + s + "&courseCalendarId=" + o + "&witchDay=" + i + "T00:00:00+08:00&isFrom=home"
            }) : wx.showModal({
                title: "提示",
                content: "暂无通知",
                showCancel: !1
            });
        },
        sendCourseInvitation: function(e) {
            this.triggerEvent("sendCourseInvitation");
        },
        modalConfirm: function() {
            this.setData({
                showInviteModal: !1
            });
            var e = a.globalData.loginUser;
            1 != this.data.userType && 1 == e.group_id_status && t.switchUserLoginType("admin", function() {
                wx.redirectTo({
                    url: "/pages/admin/operation/operation"
                });
            });
        }
    }
});