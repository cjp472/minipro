var t = require("../../biz/vipCourse.js"), e = getApp(), a = require("../../config.js"), o = require("../../utils/xnSDK.js"), s = require("../../utils/xnUtils.js");

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
        SubjectStatus: !1,
        CollectionSubjects: "",
        courseId: "",
        SubjectName: "",
        subjectid: 0,
        IOS: e.globalData.SystemInfo.iOS
    },
    onLoad: function(a) {
        var s = this, i = a.courseId, u = (e.getSubjectInfo().SubjectId, a.coursename);
        wx.setNavigationBarTitle({
            title: u
        }), t.GetCollectionSubjects(i, function(t) {
            s.setData({
                CollectionSubjects: t.SubjectList,
                courseId: i
            });
        }), this.data.sharePath = this.getSharePath(), console.log(this.data.XNConfigInfo), 
        o.callTrail({
            originId: this.data.XNConfigInfo.AppId,
            siteId: "kf_9644"
        }), s.setData({
            isLoadMore: !1
        }), e.checkContextWithShareOptions(a, function() {
            a.IsShare && s.setData({
                IsShare: a.IsShare
            }), t.GetCourseListByCollectionId(i, 0, function(t) {
                console.log("vipCourseListData集合列表"), console.log(t);
                var a = s.initWebcastCourseList(t), o = t.Pager.TotalSum;
                s.setData({
                    loaded: !0,
                    empty: 0 == a.length,
                    webcastCourseList: a,
                    vipTotalSum: o,
                    courseId: i
                });
                var u = e.getSubjectInfo();
                s.setData({
                    subjectInfo: u,
                    isLoadMore: !0
                });
            });
        });
    },
    initWebcastCourseList: function(t) {
        return console.log("vipCourseListData"), console.log(t), t.WebcastCourseList;
    },
    onCourseItemJs: function(t) {
        var e = "../../pages/vipCoursesDetail/vipCoursesDetail?courseId=" + t.currentTarget.dataset.courseId;
        wx.navigateTo({
            url: e
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        if (a.setData({
            vipPageIndex: 1
        }), e.globalData.goToRespository = !0, e.globalData.goToRespositoryBackRoute = "../../pages/vipCourses/vipCourses", 
        a.data.loaded && (a.data.subjectInfo.SubjectId != e.globalData.header.SubjectId || a.data.subjectInfo.SubjectLevel != e.globalData.header.SubjectLevel)) {
            a.setData({
                isLoadMore: !1
            }), t.GetCourseListByCollectionId(courseId, 0, function(t) {
                console.log("vipCourseListData集合列表"), console.log(t);
                var o = a.initWebcastCourseList(t), s = t.Pager.TotalSum;
                a.setData({
                    loaded: !0,
                    empty: 0 == o.length,
                    webcastCourseList: o,
                    vipTotalSum: s,
                    courseId: courseId
                });
                var i = e.getSubjectInfo();
                a.setData({
                    subjectInfo: i,
                    isLoadMore: !0
                });
            });
            var i = e.getSubjectInfo();
            a.setData({
                subjectInfo: i
            }), a.data.XNConfigInfo = s.getXNConfigInfo(), o.callTrail({
                originId: a.data.XNConfigInfo.AppId,
                siteId: "kf_9644"
            });
        }
    },
    getSharePath: function() {
        var t = "/pages/vipCourseDetailsList/vipCourseDetailsList";
        return t += "?" + e.generateShareOptions(), t += "&courseId=" + this.data.courseId, 
        t += "&subjectid=" + this.data.subjectid, console.log(t), t;
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var e = this;
        wx.showNavigationBarLoading(), console.log("onPullDownRefresh"), t.GetCourseListByCollectionId(e.data.courseId, e.data.subjectid, function(t) {
            var a = e.initWebcastCourseList(t);
            t.Pager.TotalSum;
            e.setData({
                webcastCourseList: a,
                SubjectStatus: !1,
                subjectid: e.data.subjectid
            });
        }), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {
        var t = this.getSharePath();
        return {
            title: e.globalData.subject.SubjectParentName + "VIP学院",
            path: t
        };
    },
    clickVipChooseSubject: function() {
        this.setData({
            SubjectStatus: !0
        });
    },
    clickVipSubject: function(e) {
        var a = this;
        console.log("选择科目 "), console.log(e);
        var o = e.currentTarget.dataset.subjectid, s = e.currentTarget.dataset.subjectname;
        a.setData({
            SubjectName: s
        }), t.GetCourseListByCollectionId(a.data.courseId, o, function(t) {
            var e = a.initWebcastCourseList(t);
            t.Pager.TotalSum;
            a.setData({
                webcastCourseList: e,
                SubjectStatus: !1,
                subjectid: o
            });
        });
    },
    vipSubjectBox: function() {
        this.setData({
            SubjectStatus: !1
        });
    },
    goBackIndex: function() {
        wx.reLaunch({
            url: "../index/index"
        });
    }
});