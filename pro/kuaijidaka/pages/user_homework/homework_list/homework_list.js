function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
        return o;
    }
    return Array.from(t);
}

var e = getApp(), o = e.service, s = e.util;

Page({
    data: {
        sort_type: 0,
        isLoadingMore: !1,
        maxOffset: !1,
        offset: 0,
        finish: 0,
        count: 0,
        courseHomeworkList: [],
        auth: {},
        hasInited: !1,
        shutDown: 0
    },
    customData: {
        options: {}
    },
    onLoad: function(t) {
        var a = this;
        this.customData.options = t;
        var r = function() {
            o.permissionChecker({
                that: a,
                courseID: t.courseId,
                hasPermission: t.hasPermission
            }, function() {
                a.getCourseTask(0);
            });
        };
        o.forUserOnly(s.getFullPath(this.route, t), function() {
            var s = e.globalData.collection;
            s && s.courseId == t.courseId ? o.addInviteePointData({
                course_id: s.courseId,
                share_type: s.submitId ? 1 : 2,
                action_type: 1,
                inviter_id: s.inviterId ? s.inviterId : 0,
                submit_id: s.submitId ? s.submitId : 0
            }, function() {
                e.globalData.collection = null, r();
            }, function() {
                r();
            }) : r();
        });
    },
    onReachBottom: function() {
        var t = this;
        t.getCourseTask(t.data.courseHomeworkList.length);
    },
    getCourseTask: function(t) {
        var e = this, a = this;
        a.data.maxOffset || (a.setData({
            isLoadingMore: !0
        }), s.showToast("加载中", "loading"), o.fetchHomeworkList({
            course_id: this.customData.options.courseId,
            limit: 10,
            offset: t,
            sort_type: this.data.sort_type
        }, function(o) {
            if (o.shut_down) a.setData({
                shutDown: 1
            }); else if (a.setData({
                isLoadingMore: !1,
                finish: o.submit_num,
                count: o.count
            }), o.course_calendar.length > 0) if (o.course_calendar.length + a.data.courseHomeworkList.length == 1 && "redirect" === e.customData.options.type) {
                var s = {
                    currentTarget: {
                        dataset: {
                            homeworkId: o.course_calendar[0].course_calendar_id
                        }
                    }
                };
                e.toHome(s);
            } else a.formatData(o.course_calendar, t); else a.setData({
                maxOffset: !0,
                hasInited: !0
            });
        }, function(t) {
            var e = t.errType, o = t.errMsg;
            "code" === e && 409 === o ? wx.showModal({
                title: "提示",
                content: "此打卡已被管理员删除",
                showCancel: !1,
                success: function(t) {
                    t.confirm && wx.redirectTo({
                        url: "/pages/user/my/my"
                    });
                }
            }) : s.showError("获取数据失败：" + o, this), a.setData({
                isLoadingMore: !1
            });
        }, function() {
            s.hideToast();
        }));
    },
    formatData: function(e, o) {
        var a = this, r = [];
        e.map(function(t) {
            2 != t.state && r.push({
                courseHomeworkId: t.course_calendar_id,
                courseHomeworkTitle: t.title,
                startTime: t.start_at.substring(0, 16).replace(/T/, " "),
                endTime: t.end_at.substring(0, 16).replace(/T/, " "),
                is_submit: t.is_submit,
                state: t.state
            });
        }), s.setDataImproved(this, {
            courseHomeworkList: 0 == o ? r : [].concat(t(a.data.courseHomeworkList), r),
            hasInited: !0
        }, !0);
    },
    toHome: function(t) {
        var o = t.currentTarget.dataset.homeworkId, s = this.customData.options.courseId, a = this.customData.options.type;
        e.globalData.homework_list_data = {
            courseId: s,
            course_calendar_id: o
        }, "redirect" == a ? wx.redirectTo({
            url: "/pages/user_homework/home/home?courseId=" + s + "&courseType=1&courseHomeworkId=" + o + "&isFromOverview=true&hasPermission=true"
        }) : wx.navigateBack({
            delta: 1
        });
    },
    _sortList: function() {
        this.setData({
            maxOffset: !1,
            sort_type: 0 == this.data.sort_type ? 2 : 2 == this.data.sort_type ? 1 : 0
        }), this.data.courseHomeworkList = [], this.getCourseTask(0);
    }
});