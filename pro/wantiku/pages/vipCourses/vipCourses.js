var e = require("../../biz/vipCourse.js"), t = getApp(), a = require("../../config.js"), o = require("../../utils/xnSDK.js"), s = require("../../utils/xnUtils.js");

Page({
    data: {
        theme: a.UIConfig.Theme,
        loaded: !1,
        subjectInfo: {
            SubjectId: 0
        },
        webcastCourseList: [],
        empty: !1,
        sharePath: "",
        XNConfigInfo: s.getXNConfigInfo(),
        vipSubGroup: !0,
        vipPageIndex: 1,
        vipTotalSum: 0,
        isLoadMore: !0,
        IOS: t.globalData.SystemInfo.iOS,
        Review: !0
    },
    onLoad: function(a) {
        var s = this;
        this.data.sharePath = this.getSharePath(), console.log(this.data.XNConfigInfo), 
        o.callTrail({
            originId: this.data.XNConfigInfo.AppId,
            siteId: "kf_9644"
        }), s.setData({
            isLoadMore: !1
        }), t.checkContextWithShareOptions(a, function() {
            e.getVipListData(1, function(e) {
                var a = s.initWebcastCourseList(e), o = e.Pager.TotalSum;
                s.setData({
                    loaded: !0,
                    empty: 0 == a.length,
                    webcastCourseList: a,
                    vipTotalSum: o
                });
                var i = t.getSubjectInfo();
                s.setData({
                    subjectInfo: i,
                    isLoadMore: !0
                });
            });
        });
    },
    initWebcastCourseList: function(e) {
        return console.log("vipCourseListData"), console.log(e), e.WebcastCourseList;
    },
    onCourseItemJs: function(e) {
        if (console.log("~~~~~~~onCourseItemJs.event~~~~~~~~~~~~"), console.log(e), e.currentTarget.dataset.iscollection) t = "../../pages/vipCourseDetailsList/vipCourseDetailsList?courseId=" + e.currentTarget.dataset.courseId + "&coursename=" + e.currentTarget.dataset.coursename; else var t = "../../pages/vipCoursesDetail/vipCoursesDetail?courseId=" + e.currentTarget.dataset.courseId;
        wx.navigateTo({
            url: t
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        if (t.globalData.Review || this.setData({
            Review: !1
        }), a.setData({
            vipPageIndex: 1
        }), t.globalData.goToRespository = !0, t.globalData.goToRespositoryBackRoute = "../../pages/vipCourses/vipCourses", 
        a.data.loaded && (a.data.subjectInfo.SubjectId != t.globalData.header.SubjectId || a.data.subjectInfo.SubjectLevel != t.globalData.header.SubjectLevel)) {
            a.setData({
                isLoadMore: !1
            }), e.getVipListData(1, function(e) {
                var t = a.initWebcastCourseList(e), o = e.Pager.TotalSum;
                a.setData({
                    webcastCourseList: t,
                    empty: 0 == t.length,
                    vipTotalSum: o,
                    isLoadMore: !0
                });
            });
            var i = t.getSubjectInfo();
            a.setData({
                subjectInfo: i
            }), a.data.XNConfigInfo = s.getXNConfigInfo(), o.callTrail({
                originId: a.data.XNConfigInfo.AppId,
                siteId: "kf_9644"
            });
        }
    },
    getSharePath: function() {
        var e = "/pages/vipCourses/vipCourses";
        return e += "?" + t.generateShareOptions();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        wx.showNavigationBarLoading(), console.log("onPullDownRefresh"), e.getVipListData(1, function(e) {
            var a = t.initWebcastCourseList(e);
            console.log(e), t.setData({
                webcastCourseList: a,
                empty: 0 == a.length,
                vipPageIndex: 1
            });
        }), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        var e = this;
        e.data.webcastCourseList.length < e.data.vipTotalSum && (console.log("onReachBottom-refresh触底事件"), 
        e.refreshVipListData(e.data.vipPageIndex + 1, !0), e.setData({
            isLoadMore: !1
        }));
    },
    refreshVipListData: function(t, a) {
        var o = this;
        e.getVipListData(t, function(e) {
            var t = e.WebcastCourseList, s = e.Pager.PageIndex;
            a && (t = o.data.webcastCourseList.concat(t), o.setData({
                webcastCourseList: t,
                vipPageIndex: s,
                isLoadMore: !0
            }));
        });
    },
    onShareAppMessage: function() {
        var e = this.getSharePath();
        return {
            title: t.globalData.subject.SubjectParentName + "VIP学院",
            path: e
        };
    }
});