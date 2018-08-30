function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var a = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
    }
    return t;
}, e = require("../../../utils/common.js"), s = require("../../../utils/interface.js"), r = getApp(), i = r.service, o = r.util;

Page({
    data: {
        inputing: !1,
        keyword: "",
        calendar_list: [],
        checkAlready: !0,
        user_list: [],
        courseType: 0,
        homeworkList: [],
        currentHomework: {},
        currentHomeworkIndex: 0,
        totalHomeworkCount: 0,
        customData: {
            startTime: "",
            endTime: "",
            courseId: "",
            courseCalendarId: "",
            sevendayStr: ""
        },
        record_at: "",
        isShowAllList: !1,
        showRemind: !1,
        theGroupList: [ "全部分组" ],
        teamName: "全部分组",
        paging: {
            offset: 0,
            limit: 500
        }
    },
    onLoad: function(t) {
        var a = this;
        console.log(t);
        var e = this.data.courseType = t.courseType, s = this.data.customData;
        s.courseId = t.courseId, s.courseType = t.courseType, s.options = t, i.forAdminOnly(o.getFullPath(this.route, t), function() {
            if (0 == e) {
                a.data.record_at = t.witchDay;
                var r = t.witchDay;
                s.startTime = t.startTime, s.endTime = t.endTime, a.initDateArray(r, s.startTime, s.endTime), 
                a.getSevenday(r, function() {
                    a.getUserList(!0);
                });
            } else 1 == e && (wx.setNavigationBarTitle({
                title: "作业学员"
            }), a.getHomeworkList(a.data.currentHomeworkIndex, function() {
                a.getUserList(!0);
            }));
            a.getGroupList();
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            inputing: !1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = "全部分组" === this.data.teamName ? "" : this.data.teamName;
        this.getUserList(this.data.checkAlready, t), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        var t = "全部分组" === this.data.teamName ? "" : this.data.teamName;
        this.getUserList(this.data.checkAlready, t);
    },
    showAlready: function() {
        var t = "全部分组" === this.data.teamName ? "" : this.data.teamName;
        this.setData({
            user_list: [],
            "paging.offset": 0
        }), this.setData({
            showRemind: !1
        });
        var a = this.data, e = a.checkAlready;
        a.courseType, a.customData;
        e || (this.setData({
            checkAlready: !0
        }), this.getUserList(!0, t));
    },
    showNot: function() {
        var t = "全部分组" === this.data.teamName ? "" : this.data.teamName;
        this.setData({
            user_list: [],
            "paging.offset": 0
        });
        var a = this.data, e = a.checkAlready;
        a.courseType, a.customData;
        e && (this.setData({
            checkAlready: !1
        }), this.getUserList(!1, t));
    },
    getUserList: function(i, o, n) {
        var d = this;
        wx.showLoading({
            title: "正在加载"
        });
        var c = this, u = this.data.customData, l = function(t, a) {
            var e = d.data.courseType, s = void 0;
            return 0 == e ? s = a ? t.split("T")[1].split("+")[0] : t.split("T")[0].substring(5).replace("-", "/") : 1 == e && (s = a ? t.substring(5, 16).replace(/T{1}/, " ") : t.substring(5, 10)), 
            s;
        };
        wx.request({
            url: s.imp().get_user_list,
            data: o ? a({
                course_id: u.courseId,
                calendar_id: u.courseCalendarId,
                already: i,
                team_name: o
            }, this.data.paging) : a({
                course_id: u.courseId,
                calendar_id: u.courseCalendarId,
                already: i
            }, this.data.paging),
            method: "GET",
            header: {
                "content-type": "app/json",
                apsid: r.globalData.apsid
            },
            success: function(a) {
                if (0 == a.data.err_code) {
                    var s = a.data.data.list;
                    s.forEach(function(t) {
                        t.LastDate = l(t.LastDate, i), t.UserName = t.UserName.length > 10 ? t.UserName.substring(0, 10) + "..." : t.UserName;
                    }), i || s.reverse();
                    var r = d.data.user_list;
                    r.push.apply(r, t(s));
                    var o = r.length;
                    d.setData({
                        user_list: r,
                        "paging.offset": o > 500 ? o + parseInt(d.data.paging.offset) : o
                    }), i || d.checkRemindStatus(d.data.user_list.length, u.options.selectedDate);
                } else e.doAnimation("error", "获取学员信息失败，请稍后重试", c);
            },
            fail: function(t) {
                e.doAnimation("error", "网络错误，请稍后重试", c);
            },
            complete: function() {
                wx.hideLoading(), n && n();
            }
        });
    },
    getHomeworkList: function(t, a) {
        var i = this, o = function(t) {
            e.doAnimation("error", "获取作业列表失败，请稍后重试", i);
        };
        wx.request({
            url: s.imp().course_homework,
            data: {
                course_id: this.data.customData.courseId,
                offset: 0,
                limit: 200
            },
            method: "GET",
            header: {
                "content-type": "app/json",
                apsid: r.globalData.apsid
            },
            success: function(e) {
                if (0 == e.data.err_code) {
                    var s = e.data.data, r = s.count, n = s.course_calendar, d = (i.data.currentHomeworkIndex, 
                    n[t]);
                    console.log(d), i.data.homeworkList = n, i.data.customData.courseCalendarId = d.course_calendar_id, 
                    i.setData({
                        courseType: 1,
                        currentHomework: d,
                        currentHomeworkIndex: t,
                        totalHomeworkCount: r,
                        "customData.options": d
                    }), a();
                } else o();
            },
            fail: function(t) {
                o();
            }
        });
    },
    getHomework: function(t) {
        this.initStatus();
        var a = "全部分组" === this.data.teamName ? "" : this.data.teamName, e = t.currentTarget.dataset.step, s = this.data, r = s.currentHomeworkIndex, i = s.homeworkList[r - e];
        console.log(i), s.customData.courseCalendarId = i.course_calendar_id, this.setData({
            checkAlready: !0,
            currentHomework: i,
            currentHomeworkIndex: r - e,
            "customData.options": i
        }), this.getUserList(!0, a);
    },
    initDateArray: function(t, a, s) {
        this.data.customData.sevendayStr = "";
        for (var r, i, o, n = e.currentBeijingTime(), d = -3; d < 4; d++) {
            var c = e.getDateFromCurrentDate(t, d);
            r = c.yymmdd == n ? "today" : c.yymmdd > n ? "later-than-today" : "", o = c.yymmdd >= a && c.yymmdd <= s ? "grid" : "", 
            i = 0 == d ? "select-date-bg" : "", this.data.customData.sevendayStr += d < 3 ? c.yymmdd + "," : c.yymmdd;
            var u = parseInt(c.yymmdd.split("-")[2]);
            Object.assign(c, {
                weekSelect: i,
                isToday: r,
                dd: u,
                grid: o
            }), this.data.calendar_list.push(c);
        }
    },
    getSevenday: function(t, a) {
        var e = this;
        wx.request({
            url: s.imp().sevenday,
            data: {
                course_id: e.data.customData.courseId,
                seven_date: e.data.customData.sevendayStr
            },
            method: "GET",
            header: {
                "content-type": "app/json",
                apsid: r.globalData.apsid
            },
            success: function(s) {
                if (s.data && 0 == s.data.err_code) {
                    var r = s.data.data;
                    r.seven_data.forEach(function(a, s) {
                        1 == r.seven_data[s].submit_status && r.seven_data[s].valid_status ? Object.assign(e.data.calendar_list[s], {
                            state: "ok-bg"
                        }) : 0 == r.seven_data[s].submit_status && r.seven_data[s].valid_status ? Object.assign(e.data.calendar_list[s], {
                            state: "not-bg"
                        }) : Object.assign(e.data.calendar_list[s], {
                            state: ""
                        }), e.setData({
                            calendar_list: e.data.calendar_list
                        });
                        var i = e.data.customData;
                        a.submit_date == t && (i.courseCalendarId = a.calendar_id);
                    }), e.setData({
                        selfPunchCount: r.submit_cnt
                    }), e.data.customData.sevendayStr = "", a();
                }
            }
        });
    },
    dayClick: function(t) {
        var a = this, s = t.currentTarget.dataset.dayinfo.yymmdd;
        this.data.customData.options.selectedDate = s;
        var r = e.currentBeijingTime(), i = this.data.customData;
        s <= r && s >= i.startTime && s <= i.endTime && (this.initStatus(), this.data.calendar_list = [], 
        this.initDateArray(s, i.startTime, i.endTime), this.getSevenday(s, function() {
            var t = "全部分组" === a.data.teamName ? "" : a.data.teamName;
            a.getUserList(!0, t);
        }));
    },
    focusInput: function() {
        this.setData({
            inputing: !0
        });
    },
    search: function(t) {
        var a = this.data, e = a.courseType, s = a.customData;
        wx.navigateTo({
            url: "/pages/admin_sub/search_students/search_students?keyword=" + t.detail.value + "&courseId=" + s.courseId + "&courseCalendarId=" + s.courseCalendarId + "&courseType=" + e + "&record_at=" + this.data.record_at
        });
    },
    cancelSearch: function() {
        this.setData({
            inputing: !1
        });
    },
    goToRecords: function(t) {
        var a = t.currentTarget.dataset.userid;
        wx.navigateTo({
            url: "/pages/admin_sub/records_of_course/records_of_course?courseId=" + this.data.customData.courseId + "&userId=" + a
        });
    },
    getGroupList: function() {
        var a = this;
        wx.request({
            url: s.imp().groupList,
            data: {
                course_id: this.data.customData.courseId
            },
            method: "GET",
            header: {
                "content-type": "application/json",
                apsid: r.globalData.apsid
            },
            success: function(e) {
                var s = e.data.data.teamList, r = a.data.theGroupList;
                r.push.apply(r, t(s)), a.setData({
                    theGroupList: r
                });
            }
        });
    },
    showAllList: function() {
        this.setData({
            isShowAllList: !this.data.isShowAllList
        });
    },
    checkGroup: function(t) {
        var a = this;
        this.setData({
            showRemind: !1,
            user_list: [],
            "paging.offset": 0
        });
        var e = "全部分组" === t.target.dataset.teamname ? "" : t.target.dataset.teamname, s = this.data.checkAlready;
        this.getUserList(s, e, function() {
            a.showAllList(), a.setData({
                teamName: t.target.dataset.teamname
            });
        });
    },
    remindPunchCard: function() {
        var t = this, a = "全部分组" === this.data.teamName ? "" : this.data.teamName;
        this.data.customData.options;
        wx.request({
            url: s.imp().remindPunchTime,
            method: "GET",
            header: {
                "content-type": "application/json",
                apsid: r.globalData.apsid
            },
            data: {
                course_id: this.data.customData.courseId,
                send_type: this.data.customData.courseType,
                course_calendar_id: this.data.customData.courseCalendarId
            },
            success: function(e) {
                var i = e.data.data.result;
                if ("No Time Limit" == i) wx.showModal({
                    title: "打卡提醒",
                    content: "· 提醒消息将通过小程序消息服务，发送给全部未打卡学员，\n\n· 近七天无活跃学员无法收到提醒消息",
                    confirmText: "确认发送",
                    confirmColor: "#4f598f",
                    success: function(e) {
                        e.confirm && (console.log("点击发送"), wx.request({
                            url: s.imp().remindPunch,
                            data: {
                                course_id: t.data.customData.courseId,
                                send_type: t.data.customData.courseType,
                                course_calendar_id: t.data.customData.courseCalendarId,
                                team_name: a
                            },
                            method: "GET",
                            header: {
                                "content-type": "application/json",
                                apsid: r.globalData.apsid
                            },
                            success: function(a) {
                                console.log(a.data.err_code), 0 == a.data.err_code ? "Send Scuess" === a.data.data.result && wx.showToast({
                                    title: "发送成功"
                                }) : o.showError("提醒失败，请稍候重试", t);
                            }
                        }));
                    }
                }); else {
                    var n = 14400 - i, d = Math.floor(n / 3600), c = Math.floor(n % 3600 / 60);
                    wx.showModal({
                        title: "提示",
                        content: "距上次打卡提醒不足4小时\n" + d + "时" + c + "分后可发送打卡提醒",
                        showCancel: !1
                    });
                }
            },
            fail: function(a) {
                o.showError(a, t);
            }
        });
    },
    checkRemindStatus: function(t, a) {
        var s = new Date(), r = e.currentBeijing(s), i = (s.getHours() > 9 ? s.getHours() : "0" + s.getHours()) + ":" + (s.getMinutes() > 9 ? s.getHours() : "0" + s.getMinutes()), o = this.data.customData.options, n = o.witchDay, d = (o.startTime, 
        o.endTime, o.startClock), c = o.endClock, u = o.startAt, l = o.endAt;
        console.log(r, u, l, r >= u, r <= l), 0 == o.courseType ? r >= u && r <= l && (console.log(i, d, c), 
        a ? a == n && t > 0 && i >= d && i <= c && this.setData({
            showRemind: !this.data.checkAlready
        }) : t > 0 && i >= d && i <= c && this.setData({
            showRemind: !0
        })) : r >= o.start_at && r <= o.end_at && t > 0 && this.setData({
            showRemind: !this.data.checkAlready
        });
    },
    initStatus: function() {
        this.setData({
            showRemind: !1,
            checkAlready: !0,
            user_list: [],
            "paging.offset": 0
        });
    },
    hideMask: function() {
        this.showAllList();
    }
});