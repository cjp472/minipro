var t = getApp(), o = t.service, e = t.util;

Page({
    data: {
        sort_type: 0,
        isLoadingMore: !1,
        maxOffset: !1,
        offset: 0,
        courseHomeworkList: [],
        courseHomeworkCounts: ""
    },
    customData: {
        options: {},
        hasInited: !1
    },
    onLoad: function(s) {
        var i = this;
        this.customData.options = s, o.forAdminOnly(e.getFullPath(this.route, s), function() {
            var e = t.globalData.collection;
            e && e.courseId == s.courseId ? o.addInviteePointData({
                course_id: e.courseId,
                share_type: e.submitId ? 1 : 2,
                action_type: 1,
                inviter_id: e.inviterId ? e.inviterId : 0,
                submit_id: e.submitId ? e.submitId : 0
            }, function() {
                t.globalData.collection = null, i.initPage(0);
            }, function() {
                i.initPage(0);
            }) : i.initPage(0);
        });
    },
    initPage: function(t) {
        var s = this, i = this.customData, a = i.options;
        this.data.maxOffset || (this.setData({
            isLoadingMore: !0
        }), o.fetchHomeworkList({
            course_id: a.courseId,
            limit: 10,
            offset: t,
            sort_type: this.data.sort_type
        }, function(o) {
            o.course_calendar = o.course_calendar || [];
            o.course_title;
            var i = o.course_calendar;
            if (i.length > 0) {
                var a = e.yymmdd;
                i.forEach(function(t) {
                    t.startTime = a(t.start_at), t.endTime = a(t.end_at);
                }), 0 == t ? e.setDataImproved(s, {
                    courseHomeworkList: i,
                    count: o.count,
                    user_count: o.user_count,
                    undering_count: o.undering_count,
                    submit_count: o.submit_count
                }) : e.setDataImproved(s, {
                    courseHomeworkList: s.data.courseHomeworkList.concat(i),
                    count: o.count,
                    undering_count: o.undering_count,
                    submit_count: o.submit_count
                });
            } else s.setData({
                maxOffset: !0
            });
        }, function(t) {
            var o = t.errType, i = t.errMsg;
            "code" === o && 409 === i ? wx.showModal({
                title: "提示",
                content: "此打卡已被管理员删除",
                showCancel: !1,
                success: function(t) {
                    t.confirm && wx.redirectTo({
                        url: "/pages/user/my/my"
                    });
                }
            }) : e.showError("获取数据失败：" + i, s);
        }, function() {
            s.setData({
                isLoadingMore: !1
            }), i.hasInited = !0;
        }));
    },
    toHome: function(o) {
        var e = this.customData.options, s = (e.routeType, e.courseId), i = o.currentTarget.dataset.calendarid;
        t.globalData.homework_list_data = {
            courseId: s,
            course_calendar_id: i
        }, wx.navigateTo({
            url: "/pages/admin_homework/home/home?courseId=" + s + "&courseHomeworkId=" + i
        });
    },
    createHomework: function() {
        wx.navigateTo({
            url: "/pages/admin_homework_sub/addtheme/addtheme?courseId=" + this.customData.options.courseId + "&firstTime=true"
        });
    },
    onShow: function() {
        this.customData.hasInited && this.initPage(0);
    },
    onReachBottom: function() {
        this.initPage(this.data.courseHomeworkList.length);
    },
    _sortList: function() {
        this.setData({
            maxOffset: !1,
            sort_type: 0 == this.data.sort_type ? 2 : 2 == this.data.sort_type ? 1 : 0
        }), this.data.courseHomeworkList = [], this.initPage(0);
    }
});