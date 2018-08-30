var t = getApp(), e = t.service, s = t.util, a = e.getPictureResources();

Page({
    data: {
        isTimeOut: !1,
        showInform: !1,
        needPunch: !1,
        readyToInputPwd: !1,
        tip: "",
        noPermission: !1,
        netWorkStatus: !0,
        courseType: null,
        courseName: "",
        homeworkTitle: "",
        createTime: "",
        editTime: "",
        visitorsCount: null,
        visitorsList: [],
        isAdmin: !1
    },
    customData: {
        options: {},
        startAt: "",
        endedAt: "",
        hasInited: !1,
        limit: 10
    },
    onLoad: function(t) {
        var a = this;
        t.courseId = parseInt(t.courseId), t.courseCalendarId = parseInt(t.courseCalendarId), 
        t.courseType = parseInt(t.courseType), this.customData.options = t, e.forAllUser(s.getFullPath(this.route, t), function() {
            e.permissionChecker({
                that: a,
                courseID: t.courseId,
                hasPermission: t.hasPermission
            }, function() {
                a._initPage();
            });
        });
    },
    onShow: function() {
        var t = this.customData, e = t.limit;
        t.hasInited && this.getInform({
            limit: e,
            offset: this.data.visitorsList.length,
            onshow: !0
        });
    },
    onReachBottom: function() {
        var t = this.customData, e = t.hasInited, s = t.limit;
        e && this.getInform({
            limit: s,
            offset: this.data.visitorsList.length
        });
    },
    _initPage: function() {
        1 == t.globalData.loginUser.user_type_login ? (s.setDataImproved(this, {
            isAdmin: !1
        }), wx.setNavigationBarColor && wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#22dd82"
        })) : (s.setDataImproved(this, {
            isAdmin: !0
        }), wx.setNavigationBarColor && wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#4f598f"
        })), this.getInform({
            limit: this.customData.limit,
            offset: 0
        }), this.setData({
            courseType: this.customData.options.courseType
        });
    },
    getInform: function(a) {
        var o = this, r = this.customData.options;
        0 == r.courseType && this.getCourseTime(), e.getCourseInform({
            courseCalendarID: r.courseCalendarId,
            limit: a.limit,
            offset: a.offset
        }, function(e) {
            o.customData.hasInited = !0;
            var i = "" === e.content_json ? [] : JSON.parse(e.content_json).hybrid_content;
            2 == e.push_message_type && 0 == e.is_submit && 1 == t.globalData.loginUser.user_type_login && o.setData({
                needPunch: !0
            }), i.length > 0 && (i[0].content instanceof Array ? o.setData({
                informDataPc: JSON.stringify(i),
                informDataApp: ""
            }) : o.setData({
                informDataPc: "",
                informDataApp: e.content_json
            }));
            var n = e.list || [];
            n = n.map(function(t) {
                return {
                    url: t.avatar_url,
                    name: t.user_name.length > 10 ? t.user_name.substring(0, 10) + "..." : t.user_name,
                    time: t.created_at.split("T")[0] + " " + t.created_at.split("T")[1].substring(0, 5)
                };
            }), a.onshow && (n = []), o.setData({
                courseName: e.course_name,
                homeworkTitle: e.task_title,
                createTime: e.created_at_message.split("T")[0].replace(/-/g, "/") + " " + e.created_at_message.split("T")[1].substring(0, 5),
                visitorsCount: e.count,
                course_started_days: e.course_started_days || 0,
                visitorsList: o.data.visitorsList.concat(n),
                isTimeOut: 2 === e.is_push_message
            }), t.globalData.calendar_data = {
                courseId: r.courseId,
                record_at: s.currentBeijingTime() + "T00:00:00Z"
            }, t.globalData.homework_list_data = {
                courseId: r.courseId,
                course_calendar_id: r.courseCalendarId
            };
        }, function(t) {
            s.showError("获取课程通知失败(" + t.errMsg + ")", o);
        });
    },
    getCourseTime: function() {
        var t = this;
        e.fetchCourseDetail(this.customData.options.courseId, function(e) {
            t.customData.startAt = e.start_at.split("T")[0], t.customData.endedAt = e.ended_at.split("T")[0], 
            t.setData({
                day: s.dateDiff(t.customData.options.witchDay, t.customData.startAt)
            });
        }, function(e) {
            s.showError("获取课程详情失败(" + e.errMsg + ")", t);
        });
    },
    onShareAppMessage: function() {
        var t = this.customData.options;
        return {
            title: this.data.courseName || "课程通知",
            imageUrl: a.shareInformCover,
            desc: "鲸打卡的分享",
            path: "/pages/admin/course_inform_detail/course_inform_detail?courseType=" + this.data.courseType + "&courseId=" + t.courseId + "&courseCalendarId=" + t.courseCalendarId + "&witchDay=" + t.witchDay
        };
    },
    editInform: function() {
        var t = this.customData.options;
        this.data.informDataPc ? s.showError("pc发送的通知，只能PC编辑。", this) : wx.navigateTo({
            url: "/pages/admin_sub/add_course_inform/add_course_inform?edit=true&courseId=" + t.courseId + "&courseCalendarId=" + t.courseCalendarId + "&title=" + this.data.courseName + "&witchDay=" + t.witchDay
        });
    },
    toHomeworkCourse: function() {
        var t = this.customData.options;
        "home" === t.isFrom ? wx.navigateBack({
            delta: 1
        }) : this.data.isAdmin ? wx.redirectTo({
            url: "/pages/admin_homework/home/home?courseId=" + t.courseId + "&courseType=" + this.data.courseType + "&courseHomeworkId=" + t.courseCalendarId + "&jumpType=redirect"
        }) : wx.redirectTo({
            url: "/pages/user_homework/home/home?courseId=" + t.courseId + "&courseType=" + this.data.courseType + "&courseCalendarId=" + t.courseCalendarId + "&jumpType=redirect"
        });
    },
    toCalendarCourse: function() {
        var t = this.customData.options;
        "home" === t.isFrom ? wx.navigateBack({
            delta: 1
        }) : this.data.isAdmin ? wx.redirectTo({
            url: "/pages/admin/home/home?courseId=" + t.courseId + "&witchDay=" + t.witchDay + "&start_at=" + this.customData.startAt + "&end_time=" + this.customData.endedAt + "&jumpType=redirect"
        }) : wx.redirectTo({
            url: "/pages/user/home/home?courseId=" + t.courseId + "&witchDay=" + t.witchDay + "&jumpType=redirect"
        });
    },
    toUnlockCourse: function() {
        var t = this, e = this.customData.options;
        "home" === e.isFrom ? wx.navigateBack({
            delta: 1
        }) : this.data.isAdmin ? wx.redirectTo({
            url: "/pages/admin/unlock/unlock?courseId=" + e.courseId + "&calendarId=" + e.courseCalendarId
        }) : wx.redirectTo({
            url: "/pages/user/unlock/unlock?courseId=" + e.courseId + "&courseNum=" + parseInt(t.data.course_started_days)
        });
    }
});