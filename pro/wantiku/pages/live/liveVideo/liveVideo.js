var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../biz/live.js")), t = require("../../../config.js"), a = getApp();

Page({
    data: {
        theme: t.UIConfig.Theme,
        subjectInfo: {
            SubjectId: 0
        },
        loaded: !1,
        selectLiveState: 0,
        mockDataToday: [],
        empty: !1,
        mockDataLate: [],
        playstate: {
            0: {
                icon: "iconfont icon_yuyue",
                style: "live-unorder",
                text: "预约"
            },
            1: {
                icon: "iconfont icon_yiyuyue",
                style: "live-order",
                text: "已预约"
            },
            2: {
                icon: "icon-live-on",
                style: "live-on",
                text: "直播中"
            },
            3: {
                icon: "iconfont icon_end",
                style: "live-end",
                text: "已结束"
            },
            5: {
                icon: "iconfont icon_yuyue",
                style: "live-unorder",
                text: "已约满"
            }
        },
        Review: !0
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "正在加载"
        });
        var o = this;
        a.checkContextWithShareOptions(t, function() {
            e.default.getTodayLiveList(function(e) {
                t.selectLiveState && o.setData({
                    selectLiveState: t.selectLiveState
                });
                var a = e.CourseList.every(function(e) {
                    return 3 == e.PlayState;
                });
                e.CourseList.length <= 0 && o.setData({
                    empty: !0
                }), o.setData({
                    mockDataToday: e.CourseList,
                    todayLiveState: a
                }), wx.hideLoading(), 0 == t.templateType && wx.showModal({
                    content: "APP专享课，请下载万题库APP学习",
                    showCancel: !1,
                    confirmText: "知道了",
                    success: function(e) {}
                });
            }), e.default.getLateLiveList(function(e) {
                console.log(e), o.setData({
                    mockDataLate: e.CourseList,
                    loaded: !0
                });
            });
            var i = a.getSubjectInfo();
            o.setData({
                subjectInfo: i
            });
        });
    },
    onShow: function() {
        a.globalData.goToRespository = !0, a.globalData.goToRespositoryBackRoute = "../../pages/live/liveVideo/liveVideo", 
        a.globalData.Review || (this.setData({
            Review: !1
        }), wx.setNavigationBarTitle({
            title: "直播"
        }));
        var t = this;
        if (t.data.loaded) {
            if (t.data.subjectInfo.SubjectId != a.globalData.header.SubjectId || t.data.subjectInfo.SubjectLevel != a.globalData.header.SubjectLevel) {
                wx.showLoading({
                    title: "正在加载"
                });
                var o = a.getSubjectInfo();
                t.setData({
                    subjectInfo: o
                });
            }
            e.default.getTodayLiveList(function(e) {
                var a = !1, o = e.CourseList.every(function(e) {
                    return 3 == e.PlayState;
                });
                e.CourseList.length <= 0 && (a = !0), t.setData({
                    mockDataToday: e.CourseList,
                    empty: a,
                    todayLiveState: o
                }), wx.hideLoading();
            }), e.default.getLateLiveList(function(e) {
                t.setData({
                    mockDataLate: e.CourseList,
                    loaded: !0
                });
            });
        }
    },
    onClickLiveInfoJS: function(e) {
        var t = e.detail.target.dataset, a = e.detail.formId;
        this.countDate(t, a);
    },
    countDate: function(t, o) {
        var i = Date.parse(new Date()) / 1e3, n = t.playstate, s = t.ccuserid, c = t.courseid, l = t.roomid, r = t.joinpassword, d = t.headmasterid, u = t.coursetitle, v = t.dataendtime, f = t.datastarttime, h = t.livetype, g = t.isshowbookingnum, y = t.livevideotype, L = a.globalData.userData.OpenId, m = this.getPlayInfoByCourseID(c, h);
        if ("0" == n) {
            var D = a.generateShareOptions(), p = void 0;
            3 == y ? p = "pages/live/liveVideoPlay/liveVideoPlay?userId=" + s + "&roomId=" + l + "&password=" + r + "&headmasterid=" + d + "&" + D + "&coursetitle=" + u + "&dataendtime=" + v : 1 == y && (p = this.getSharePageUrl(0) + "&templateType=0"), 
            console.log(p), i < f ? (m.PlayState = 1, console.log(p), e.default.postLiveBookTemplate({
                livevideotype: y,
                courseid: c,
                OpenId: L,
                formId: o,
                ReportUrl: p
            }, function(e) {
                console.log("预约模版", e), 1 == y ? wx.showModal({
                    title: "直播预约成功",
                    content: "APP专享课，请下载万题库APP学习",
                    showCancel: !1,
                    confirmText: "知道了",
                    success: function(e) {}
                }) : wx.showToast({
                    title: "直播预约成功",
                    duration: 1e3
                });
            }), "1" == g ? (m.RemainBookingNum--, m.RemainBookingNum <= 0 && (m.PlayState = 5)) : m.BookingNum++) : i >= f && i <= v ? (m.PlayState = 2, 
            this.navigateToLive(t, o)) : m.PlayState = 3, this.refreshLiveData(h);
        } else "1" == n ? (i < f ? 3 != y && wx.showModal({
            title: "直播已预约",
            content: "APP专享课，请下载万题库APP学习",
            showCancel: !1,
            confirmText: "知道了",
            success: function(e) {}
        }) : i >= f && i <= v ? (m.PlayState = 2, this.navigateToLive(t, o)) : m.PlayState = 3, 
        this.refreshLiveData(h)) : "2" == n ? (i < f || (i >= f && i <= v ? (m.PlayState = 2, 
        this.navigateToLive(t, o)) : m.PlayState = 3), this.refreshLiveData(h)) : "3" == n && wx.showModal({
            content: "当前直播已结束",
            showCancel: !1,
            confirmText: "知道了",
            success: function(e) {}
        });
    },
    getPlayInfoByCourseID: function(e, t) {
        var a = {};
        return "today" == t ? this.data.mockDataToday.forEach(function(t) {
            t.CourseID != e || (a = t);
        }) : "late" == t && this.data.mockDataLate.forEach(function(t) {
            t.DayList.forEach(function(t) {
                t.CourseList.forEach(function(t) {
                    t.CourseID != e || (a = t);
                });
            });
        }), a;
    },
    refreshLiveData: function(e) {
        "today" == e ? this.setData({
            mockDataToday: this.data.mockDataToday
        }) : this.setData({
            mockDataLate: this.data.mockDataLate
        });
    },
    navigateToLive: function(e, t) {
        var a = e.dataendtime, o = (e.datastarttime, e.roomid), i = e.ccuserid, n = e.joinpassword, s = e.headmasterid, c = e.coursetitle, l = e.livevideotype;
        console.log("老师ID", s), 3 == l ? wx.navigateTo({
            url: "../liveVideoPlay/liveVideoPlay?roomId=" + o + "&userId=" + i + "&password=" + n + "&HeadMasterId=" + s + "&coursetitle=" + c + "&dataendtime=" + a + "&formId=" + t,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : wx.showModal({
            content: "APP专享课，请下载万题库APP学习",
            showCancel: !1,
            confirmText: "知道了",
            success: function(e) {}
        });
    },
    selectLive: function(e) {
        this.setData({
            selectLiveState: e.currentTarget.dataset.name
        });
    },
    getSharePageUrl: function(e) {
        return "pages/live/liveVideo/liveVideo?" + a.generateShareOptions() + "&selectLiveState=" + e;
    },
    changeCurrent: function(e) {
        this.setData({
            selectLiveState: e.detail.current
        });
    },
    onShareAppMessage: function() {
        var e = "/pages/live/liveVideo/liveVideo?" + a.generateShareOptions() + "&selectLiveState=" + this.data.selectLiveState;
        return console.log(e), {
            title: a.globalData.subject.SubjectParentName + "直播课",
            path: e
        };
    }
});