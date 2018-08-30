var e = getApp(), t = e.service, o = e.util;

Page({
    data: {
        actionSheetHidden: !0,
        actionSheetItems: [],
        array: [],
        courses: [],
        userType: "",
        userTel: "",
        viewHeight: "",
        customServiceStyle: "display:none",
        expire: "",
        remind: !1,
        readyToInputPwd: !1,
        pwdtip: "",
        hasMore: !0,
        notAuthorized: !1
    },
    customData: {
        options: {},
        courseIdToCheck: 0,
        urlAfterPwd: "",
        password: "",
        courseId: 0,
        courseIndex: 0,
        courseType: 0,
        homeworkCount: 0,
        punchTimes: 0,
        title: "",
        startTime: "",
        endTime: "",
        currentTime: "",
        loginUser: {},
        hasInited: !1,
        isFromQrcode: !1,
        offset: 0,
        limits: 10
    },
    onLoad: function(t) {
        var s = this;
        this.customData.options = t, console.log("options:", JSON.stringify(t)), t.scene || o.hasAuthorized("scope.userInfo", function() {
            s._initPage(), e.globalData.currentIndex = "my";
        }, function() {
            var t = e.globalData.extConfig;
            o.setDataImproved(s, {
                companyName: t.companyName || "鲸打卡",
                companyLogo: t.companyLogo || "http://static3topen.jingdaka.com/images/ico_jingdaka.png",
                notAuthorized: !0
            }, !0);
        });
    },
    onPullDownRefresh: function() {
        this.getCourses("pull");
    },
    onReachBottom: function() {
        this.getCourses("more");
    },
    onReady: function() {},
    onShow: function() {
        this.checkAuthority();
    },
    onHide: function() {},
    onUnload: function() {},
    _initPage: function() {
        var s = this;
        t.forUserOnly(o.getFullPath(this.route, this.customData.options), function() {
            var t = e.globalData.loginUser;
            s.customData.loginUser = t, o.setDataImproved(s, {
                userType: t.user_type
            }), s.getCourses("init");
        });
    },
    checkAuthority: function() {
        var s = this, r = this.customData, a = r.hasInited, i = r.isFromQrcode;
        !a && i && t.forUserOnly("/pages/user/my/my", function() {
            var t = e.globalData.loginUser;
            s.customData.loginUser = t, o.setDataImproved(s, {
                userType: t.user_type
            }), s.getCourses("init");
        });
    },
    goRankList: function(e) {
        var t = e.currentTarget.dataset.course, o = t.course_id, s = (t.permit_type, t.remark, 
        t.title, t.holded_by_group_id, "/pages/user/weekly/weekly?course_id=" + o + "&course_type=" + t.course_type + "&from_which=my&hasPermission=true");
        this._checkPermission(t, s);
    },
    goUnlockCalendar: function(e) {
        var t = e.currentTarget.dataset.course, o = "/pages/user_sub/unlock_level/unlock_level?courseId=" + t.course_id + "&fromWhich=my";
        this._checkPermission(t, o);
    },
    goCalendar: function(e) {
        var t = e.currentTarget.dataset.course, o = "/pages/user_sub/calendar/calendar?courseId=" + t.course_id + "&course_name=" + t.title + "&type=redirect&startAt=" + t.start_at.split("T")[0] + "&endAt=" + t.ended_at.split("T")[0];
        this._checkPermission(t, o);
    },
    goHomeworkList: function(e) {
        var t = e.currentTarget.dataset.course, o = "/pages/user_homework/homework_list/homework_list?courseId=" + t.course_id + "&type=redirect&hasPermission=true";
        this._checkPermission(t, o);
    },
    goInvitedFriends: function(e) {
        var t = e.currentTarget.dataset.course, o = (t.course_id, t.permit_type, t.remark, 
        t.title, t.holded_by_group_id, t.course_type, "/pages/user_sub/invited_share/invited_share?title=" + t.title + "&course_type=" + t.course_type + "&course_id=" + t.course_id);
        wx.navigateTo({
            url: o
        });
    },
    bindDeleteCourseConfirm: function(e) {
        var o = this, s = this.data.courses, r = this.customData;
        this.setData({
            actionSheetHidden: !0
        }), wx.showModal({
            title: "确定退出该课程吗？",
            content: "退出后，将无法收到课程相关提醒。重新进入课程后，可再次收到提醒",
            success: function(e) {
                e.confirm && t.exitCourse(r.courseId, function() {
                    s.splice(r.courseIndex, 1), o.setData({
                        courses: s
                    });
                });
            }
        });
    },
    previewImage: function(e) {
        var t = e.target.dataset.src, o = e.target.dataset.idx;
        wx.previewImage({
            current: t,
            urls: this.data.array[o].pictures
        });
    },
    getCourses: function(s) {
        var r = this, a = this, i = this.data.hasMore;
        "init" === s ? (e.util.showToast("加载中...", "loading", 3e3), i = !0, this.customData.offset = 0) : "pull" === s && (i = !0, 
        this.customData.offset = 0), i && t.fetchCourses(this.customData.offset, this.customData.limits, function(t) {
            wx.stopPullDownRefresh();
            var c = r.data.courses;
            t.list.length < r.customData.limits ? i = !1 : r.customData.offset += t.list.length, 
            c = "init" === s || "pull" === s ? t.list : c.concat(t.list), o.setDataImproved(a, {
                courses: c,
                hasMore: i
            }), e.util.hideToast();
        }, function(t) {
            e.util.hideToast();
        }, function() {
            r.customData.hasInited = !0;
        });
    },
    hideCustomService: function() {
        this.setData({
            customServiceStyle: "display:none"
        });
    },
    actionSheetTap: function(e) {
        var t = this.customData, s = this.data.courses[e.target.dataset.idx], r = s.summary_enabled;
        t.courseIndex = e.target.dataset.idx, t.courseId = s.course_id, t.courseType = s.course_type, 
        t.homeworkCount = s.practice_count, t.punchTimes = s.user_submit_count, t.startTime = s.start_at.split("T")[0], 
        t.endTime = o.getYYMMDD(s.ended_at), t.currentTime = o.currentBeijingTime(), s.course_type, 
        r ? this.setData({
            actionSheetItems: [ {
                bindtap: "Export",
                txt: "导出数据"
            }, {
                bindtap: "Overview",
                txt: "课程介绍"
            }, {
                bindtap: "DeleteCourseConfirm",
                txt: "退出"
            } ]
        }) : this.setData({
            actionSheetItems: [ {
                bindtap: "Export",
                txt: "导出数据"
            }, {
                bindtap: "DeleteCourseConfirm",
                txt: "退出"
            } ]
        }), this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        });
    },
    actionSheetbindchange: function() {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        });
    },
    bindExport: function() {
        this.setData({
            actionSheetHidden: !0
        }), this.customData.punchTimes > 0 ? wx.navigateTo({
            url: "/pages/user_sub/export_data/export_data?course_id=" + this.customData.courseId + "&courseType=" + this.customData.courseType
        }) : o.showError("在该课程你尚无任何数据可导出", this);
    },
    bindOverview: function() {
        this.setData({
            actionSheetHidden: !0
        }), wx.navigateTo({
            url: "/pages/user/course_overview/course_overview?courseId=" + this.customData.courseId + "&courseType=" + this.customData.courseType
        });
    },
    bindQrcode: function() {
        var e = this, s = void 0, r = this.customData;
        o.showToast("正在生成...", "loading"), 0 == r.courseType ? s = "c" + r.currentTime.replace(/-/g, "") + r.startTime.replace(/-/g, "") + r.endTime.replace(/-/g, "") + r.courseId : 1 == r.courseType ? s = "h" + r.courseId : 2 == r.courseType && (s = "iz" + r.courseId + "z" + r.courseType), 
        t.fetchCourseAPPQrcode(this.customData.courseId, s, function(e) {
            o.hideToast(), wx.previewImage({
                urls: [ e.course_share_qrcode ]
            });
        }, function(t) {
            o.hideToast(), o.showError("生成失败：" + t.errMsg, e);
        });
    },
    checkCourseDetail: o.debounce(function(e) {
        e.detail && t.submitFormId(e.detail.formId);
        var s = e.currentTarget.dataset.course, r = s.course_type, a = void 0, i = void 0, c = "/pages/user/course_overview/course_overview?courseId=" + s.course_id + "&courseType=" + r;
        i = s.ended_at.split("T")[0] < o.currentBeijingTime() ? s.ended_at.split("T")[0] : s.start_at.split("T")[0] > o.currentBeijingTime() ? s.start_at.split("T")[0] : o.currentBeijingTime(), 
        t.checkCoursePermission(s.course_id, function(e) {
            e ? a = c : 0 === r ? a = o.getYYMMDD(s.start_at) > o.currentBeijingTime() && s.summary_enabled ? c : "/pages/user/home/home?courseId=" + s.course_id + "&witchDay=" + i : 1 === r ? a = s.user_submit_count <= 0 && s.summary_enabled ? c : "/pages/user_homework/homework_list/homework_list?courseId=" + s.course_id + "&type=redirect" : 2 === r && (a = s.user_submit_count > 0 ? "/pages/user/unlock/unlock?courseId=" + s.course_id + "&courseNum=" + (parseInt(s.user_submit_count) + 1) + "&courseTotal=" + s.practice_count : c), 
            wx.navigateTo({
                url: a
            });
        }, function() {
            wx.navigateTo({
                url: c
            });
        });
    }, 1e3),
    _checkPermission: function(e, s) {
        var r = this, a = e.course_id, i = (e.permit_type, e.remark), c = (e.title, e.group_id, 
        e.course_type);
        t.checkCoursePermission(a, function(e) {
            wx.navigateTo({
                url: s
            });
        }, function(e) {
            var t = e.errType, n = e.errMsg;
            switch (t) {
              case "blacklist":
              case "blacklist_course":
                o.showError(n, r);
                break;

              case "password":
                r.customData.urlAfterPwd = s, r.setData({
                    pwdtip: i || "",
                    readyToInputPwd: !0
                }), r.customData.courseIdToCheck = a;
                break;

              case "wxgroup":
                wx.showModal({
                    title: "提示",
                    content: i || "请从群主分享的微信群链接进入",
                    showCancel: !1
                });
                break;

              case "pay":
                wx.navigateTo({
                    url: "/pages/user/course_overview/course_overview?courseId=" + a + "&toPay=true&courseType=" + c
                });
                break;

              default:
                wx.showModal({
                    title: "提示",
                    content: "暂无权限进入该课程",
                    showCancel: !1
                });
            }
        });
    },
    onInputingPwd: function(e) {
        this.customData.password = e.detail.value;
    },
    pwdCancle: function() {
        this.customData.password = "", this.setData({
            readyToInputPwd: !1
        });
    },
    backHome: function() {
        wx.redirectTo({
            url: "/pages/user/my/my"
        });
    },
    pwdSub: function(e) {
        var s = this, r = this.customData, a = r.courseIdToCheck, i = r.password;
        t.checkPassword(a, i, function(e) {
            s.setData({
                readyToInputPwd: !1
            }), s.customData.password = "", wx.navigateTo({
                url: s.customData.urlAfterPwd
            });
        }, function(e) {
            s.setData({
                readyToInputPwd: !1
            });
            var t = e.errType, r = e.errMsg;
            "network" === t ? o.showError("网络错误，请重试", s) : "code" === t && 405 === r ? o.showError("密码错误", s) : o.showError("校验密码失败：" + e.errMsg, s);
        });
    },
    getFormId: function(e) {
        var o = e.detail.formId;
        t.submitFormId(o);
    },
    getUserInfo: function(e) {
        var s = this, r = e.detail;
        r.errMsg.indexOf("ok") > -1 && t.signIn(r, function() {
            o.setDataImproved(s, {
                notAuthorized: !1
            }), s._initPage();
        }, function(e) {
            wx.showModal({
                title: "错误",
                content: "登录失败：" + e.errText + "，请重试",
                showCancel: !1
            });
        });
    },
    toDoTask: o.debounce(function() {
        this.data.notAuthorized ? wx.showModal({
            title: "提示",
            content: "请登录后再查看任务模式",
            showCancel: !1,
            confirmText: "我知道了"
        }) : wx.redirectTo({
            url: "/pages/user_sub/to_do_task/to_do_task"
        });
    }, 500)
});