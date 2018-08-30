var t, e, i = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a]);
    }
    return t;
}, a = getApp(), o = a.service, s = a.util, r = s.currentBeijingTime(), n = "", c = "", d = "", u = void 0;

Page({
    data: {
        isLoadingMore: !1,
        miniappName: "",
        noMoreData: !1,
        totalCourseNumber: 0,
        nowCourseNumber: 0,
        viewHeight: "",
        course_list: [],
        currenTime: "",
        del: "display:none",
        actionSheetHidden: !0,
        actionSheetHidden2: !0,
        actionSheetItems: [],
        actionSheetItems2: [ {
            bindtap: "PunchType",
            txt: "打卡模式"
        }, {
            bindtap: "HomeworkType",
            txt: "作业模式"
        } ],
        footerFixed: "",
        jumpToMyUrl: "/pages/admin_sub/manager/manager",
        managerId: "",
        startTime: "",
        endTime: "",
        customData: {
            totalCourseNumber: 0,
            confirmDeleteText: ""
        },
        _loginUser: {},
        modalOptions: {}
    },
    customData: {
        options: {}
    },
    onLoad: function(t) {
        var e = this;
        this.customData.options = t, o.forAdminOnly(s.getFullPath(this.route, t), function() {
            e._initData();
        });
    },
    _initData: function() {
        var i = this;
        this.customData.options;
        s.setDataImproved(this, {
            currenTime: r
        }), wx.getSystemInfo({
            success: function(t) {
                s.setDataImproved(i, {
                    viewHeight: t.windowHeight
                });
            }
        });
        var o = a.globalData.loginUser;
        this.data._loginUser = o, s.setDataImproved(this, {
            jumpToMyUrl: 3 === o.user_type_login ? "/pages/admin_sub/administrator/administrator" : "/pages/admin_sub/manager/manager"
        }), t = o.user_id, e = o.user_type, this.getCourseList({
            limit: 10,
            offset: 0
        });
    },
    getCourseList: function(t) {
        var e = this, a = this, n = i({}, {
            limit: 10,
            offset: 0
        }, t);
        a.setData({
            isLoadingMore: !0
        }), o.fetchCoursesAdmin(n.offset, n.limit, function(t) {
            var i = t.course_list || [], a = s.generateBeijingTime(), o = a.getDate();
            o <= 9 && (o = "0" + o);
            var c = a.getMonth() + 1;
            c <= 9 && (c = "0" + c);
            for (var d, u = a.getFullYear() + "-" + c + "-" + o, h = 0, l = i.length; h < l; h++) {
                if (0 == (d = i[h]).course_type) {
                    d.qr_args = "&time_start=" + d.start_at + "&time_end=" + d.ended_at;
                    var m = d.ended_at.split("T", 1), p = m[0];
                    d.end_time = m[0];
                    var g = (o = d.start_at.split("T", 1))[0];
                    d.start_at = o[0], d.witchday = s.currentBeijingTime(), d.time = g > u ? 0 : s.dateDiff(u, g) + 1, 
                    d.time_count = s.dateDiff(p, g) + 1, d.hasMessages = d.remind;
                }
                d.courseType = d.course_type ? d.course_type : 0, 0 == d.courseType ? d.url = "/pages/admin/home/home?courseId=" + d.course_id + "&witchDay=" + r : 1 == d.courseType ? 0 == d.practice_count ? d.url = "/pages/admin_homework_sub/homework_guide/homework_guide?course_name=" + d.title + "&courseId=" + d.course_id : d.url = "/pages/admin_homework/homework_list/homework_list?courseId=" + d.course_id + "&type=redirect" : 2 == d.courseType && (d.url = "/pages/admin_sub/unlock_level/unlock_level?courseId=" + d.course_id + "&totalPeople=" + d.people_submit_count);
            }
            0 === n.offset ? e.setData({
                course_list: i,
                miniappName: t.group_name && t.group_name.length > 8 ? t.group_name.substring(0, 8) + "..." : t.group_name,
                totalCourseNumber: t.count,
                nowCourseNumber: t.running
            }) : e.setData({
                course_list: e.data.course_list.concat(i)
            }), 1 != i.length && 2 != i.length || e.setData({
                footerFixed: "footer-fixed"
            }), e.setData({
                isLoadingMore: !1
            });
        });
    },
    onPullDownRefresh: function() {
        this.getCourseList({
            limit: 10,
            offset: 0
        }), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.course_list.length < this.data.totalCourseNumber ? this.getCourseList({
            limit: 10,
            offset: this.data.course_list.length
        }) : this.setData({
            noMoreData: !0
        });
    },
    onReady: function() {
        wx.hideShareMenu && wx.hideShareMenu();
    },
    onShow: function() {},
    onHide: function() {
        this.setData({
            actionSheetHidden: !0
        });
    },
    onUnload: function() {},
    toWeekly: function(t) {
        var e = t.currentTarget.dataset, i = e.courseid, a = (e.coursetype, "/pages/user/weekly/weekly?course_id=" + i);
        wx.navigateTo({
            url: a
        });
    },
    courseEdit: function(i) {
        var a = this, o = i.currentTarget.dataset.idx;
        n = a.data.course_list[o].course_id, d = a.data.course_list[o].end_time || "", 2 == i.currentTarget.dataset.course_type ? s.showError("此操作仅支持在PC端进行", this) : i.currentTarget.dataset.managerid == t || 3 == e ? d && d < r ? s.showError("打卡课程已结束，不能修改", this) : 0 == i.currentTarget.dataset.course_type ? wx.navigateTo({
            url: "/pages/admin_sub/add_card/add_card?course_id=" + n
        }) : wx.navigateTo({
            url: "/pages/admin_homework_sub/add_card/add_card?course_id=" + n
        }) : s.showError("你没有该课程管理权限，请联系创建人", this);
    },
    actionSheetTap: function(t) {
        var e = this, i = t.target.dataset, a = i.idx;
        n = e.data.course_list[a].course_id, u = e.data.course_list[a].course_type, c = e.data.course_list[a].title;
        var o = e.data.course_list[a].summary_enabled;
        0 === i.course_type ? o ? this.setData({
            actionSheetItems: [ {
                bindtap: 0 == i.course_stick ? "CourseStick" : "CourseUnstick",
                txt: 0 == i.course_stick ? "置顶课程" : "取消置顶"
            }, {
                bindtap: "Participant",
                txt: "参与概况"
            }, {
                bindtap: "Statistics",
                txt: "课程统计"
            }, {
                bindtap: "Export",
                txt: "导出数据"
            }, {
                bindtap: "overview",
                txt: "课程介绍"
            }, {
                bindtap: "Del",
                txt: "删除",
                color: "red"
            } ]
        }) : this.setData({
            actionSheetItems: [ {
                bindtap: 0 == i.course_stick ? "CourseStick" : "CourseUnstick",
                txt: 0 == i.course_stick ? "置顶课程" : "取消置顶"
            }, {
                bindtap: "Participant",
                txt: "参与概况"
            }, {
                bindtap: "Statistics",
                txt: "课程统计"
            }, {
                bindtap: "Export",
                txt: "导出数据"
            }, {
                bindtap: "Del",
                txt: "删除",
                color: "red"
            } ]
        }) : o ? this.setData({
            actionSheetItems: [ {
                bindtap: 0 == i.course_stick ? "CourseStick" : "CourseUnstick",
                txt: 0 == i.course_stick ? "置顶课程" : "取消置顶"
            }, {
                bindtap: "Participant",
                txt: "参与概况"
            }, {
                bindtap: "Export",
                txt: "导出数据"
            }, {
                bindtap: "overview",
                txt: "课程介绍"
            }, {
                bindtap: "Del",
                txt: "删除",
                color: "red"
            } ]
        }) : this.setData({
            actionSheetItems: [ {
                bindtap: 0 == i.course_stick ? "CourseStick" : "CourseUnstick",
                txt: 0 == i.course_stick ? "置顶课程" : "取消置顶"
            }, {
                bindtap: "Participant",
                txt: "参与概况"
            }, {
                bindtap: "Export",
                txt: "导出数据"
            }, {
                bindtap: "Del",
                txt: "删除",
                color: "red"
            } ]
        }), this.setData({
            startTime: s.tTimeFormat(i.start_at),
            endTime: s.tTimeFormat(i.ended_at),
            managerId: i.managerid,
            actionSheetHidden: !this.data.actionSheetHidden
        });
    },
    actionSheetTap2: function() {
        this.setData({
            actionSheetHidden2: !this.data.actionSheetHidden2
        });
    },
    actionSheetbindchange: function() {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        });
    },
    actionSheetbindchange2: function() {
        this.setData({
            actionSheetHidden2: !this.data.actionSheetHidden2
        });
    },
    bindPunchType: function() {
        this.setData({
            actionSheetHidden2: !0
        }), wx.navigateTo({
            url: "/pages/admin_sub/add_card/add_card"
        });
    },
    bindHomeworkType: function() {
        1 == a.globalData.loginUser.group_grade ? wx.showModal({
            title: "提示",
            content: "此功能需成长版及其以上方可使用,请登录Web后台升级或联系客服。",
            showCancel: !1,
            confirmText: "我知道了",
            confirmColor: "#4f598f"
        }) : wx.navigateTo({
            url: "/pages/admin_homework_sub/add_card/add_card"
        }), this.setData({
            actionSheetHidden2: !0
        });
    },
    bindCourseStick: function() {
        var t = this;
        s.setDataImproved(this, {
            actionSheetHidden: !0
        }, !0), o.stickCourse(n, !0, function(e) {
            t.getCourseList({
                limit: 10,
                offset: 0
            });
        }, function(t) {
            wx.showModal({
                title: "错误",
                content: "课程置顶失败：" + t.errMsg,
                showCancel: !1
            });
        });
    },
    bindCourseUnstick: function() {
        var t = this;
        s.setDataImproved(this, {
            actionSheetHidden: !0
        }, !0), o.stickCourse(n, !1, function(e) {
            t.getCourseList({
                limit: 10,
                offset: 0
            });
        }, function(t) {
            wx.showModal({
                title: "错误",
                content: "课程取消置顶失败：" + t.errMsg,
                showCancel: !1
            });
        });
    },
    bindDel: function() {
        this.data.managerId == t || 3 == e ? this.setData({
            actionSheetHidden: !this.data.actionSheetHidden,
            del: "display:block"
        }) : (s.showError("你没有该课程管理权限，请联系创建人", this), this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        }));
    },
    bindoverview: function() {
        wx.navigateTo({
            url: "/pages/user/course_overview/course_overview?courseId=" + n + "&courseType=" + u
        });
    },
    bindStatistics: function() {
        var t = this, e = this;
        if (2 == u) s.showError("此操作仅支持在PC端进行", this); else {
            s.setDataImproved(this, {
                actionSheetHidden: !0
            }), s.showToast("正在生成...", "loading");
            var i = "c" + s.currentBeijingTime().replace(/-/g, "") + this.data.startTime.replace(/-/g, "") + e.data.endTime.replace(/-/g, "") + n;
            o.generateCourseStatistics(n, i, function(t) {
                s.hideToast(), wx.previewImage({
                    urls: [ t.course_img_url ]
                });
            }, function(e) {
                s.hideToast(), s.showError("生成失败：" + e.errMsg, t);
            });
        }
    },
    bindExport: function() {
        this.setData({
            actionSheetHidden: !0
        }), 2 == u ? s.showError("此操作仅支持在PC端进行", this) : this.data.managerId == t || 3 == e ? wx.navigateTo({
            url: "/pages/admin_sub/export_data/export_data?courseId=" + n + "&courseType=" + u
        }) : s.showError("你没有该课程管理权限，请联系创建人", this);
    },
    bindParticipant: function() {
        if (this.setData({
            actionSheetHidden: !0
        }), 2 == u) s.showError("此操作仅支持在PC端进行", this); else {
            var t = "/pages/admin/punch_students/punch_students";
            0 == u ? t += "?witchDay=" + s.currentBeijingTime() + "&startTime=" + this.data.startTime + "&endTime=" + this.data.endTime + "&courseId=" + n + "&courseType=" + u : 1 == u && (t += "?courseId=" + n + "&courseType=" + u), 
            wx.navigateTo({
                url: t
            });
        }
    },
    cancel: function() {
        this.setData({
            del: "display:none",
            "customData.confirmDeleteText": ""
        });
    },
    sub: function() {
        var t = this;
        "确认删除" === this.data.customData.confirmDeleteText ? o.deleteCourse(n, function(e) {
            s.showToast("删除成功", "success", 2e3), t.onLoad(), s.setDataImproved(t, {
                del: "display:none",
                "customData.confirmDeleteText": ""
            });
        }, function(e) {
            s.showError("删除失败：" + e.errMsg, t);
        }) : s.showError('请输入"确认删除"', this);
    },
    onInputDeleteText: function(t) {
        this.data.customData.confirmDeleteText = t.detail.value.trim();
    },
    switchUserLoginType: function() {
        var t = this;
        o.switchUserLoginType("user", function() {
            wx.redirectTo({
                url: "/pages/user/my/my"
            });
        }, function(e) {
            s.showError("管理员切换为学员身份失败:" + e.errMsg, t);
        });
    },
    associationInform: function() {
        wx.navigateTo({
            url: "/pages/admin_sub/association_inform_list/association_inform_list"
        });
    },
    collectFormId: function(t) {
        o.submitFormId(t.detail.formId), this._goCourse(t.detail.target.dataset.url);
    },
    _goCourse: s.debounce(function(t) {
        wx.navigateTo({
            url: t
        });
    }, 500)
});