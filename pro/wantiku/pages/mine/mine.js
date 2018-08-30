var a = require("../../config.js"), e = (require("../../helper/route.js"), require("../../biz/examArea.js")), t = require("../../biz/feedback.js"), o = require("../../biz/examInfo.js"), i = require("../../biz/checkInCircle.js"), n = getApp();

Page({
    data: {
        buyState: a.buyState,
        theme: a.UIConfig.Theme,
        subjectInfo: {
            SubjectParentId: 0
        },
        debug: !1,
        version: "1.0",
        canChoose: a.PackageInfo.NeedChooseSubject,
        packageLevel: a.PackageInfo.PackageLevel,
        hasLogin: !1,
        showExamArea: !1,
        examAreaName: "",
        hideMsg: "",
        msgList: "",
        scoreResule: !1,
        CheckInCircle: [],
        totalRow: 3,
        pageNumber: 1,
        hasMoreData: !0
    },
    _data: {
        disable: !1
    },
    onLoad: function() {
        var e = this;
        e.setData({
            version: a.VERSION
        });
        var t = n.getSubjectInfo();
        e.setData({
            subjectInfo: t,
            hasLogin: n.globalData.userData.HasLogin,
            avatar: n.globalData.userData.Avatar,
            nickName: n.globalData.userData.NickName
        });
    },
    onReady: function() {},
    onShow: function() {
        n.globalData.goToRespository = !0, n.globalData.goToRespositoryBackRoute = "../../pages/mine/mine", 
        this.remindMsg();
        var a = this;
        if (a.setData({
            showExamArea: 0 != n.getExamRegionType()
        }), a.data.subjectInfo.SubjectParentName != n.globalData.header.SubjectParentName) {
            var t = n.getSubjectInfo();
            a.setData({
                subjectInfo: t
            });
        }
        a.setData({
            hasLogin: n.globalData.userData.HasLogin,
            avatar: n.globalData.userData.Avatar,
            nickName: n.globalData.userData.NickName
        }), 0 != n.getExamRegionType() && e.getExamAreaName(function(e) {
            a.setData({
                examAreaName: e.AreaName
            });
        }), o.hasExamInfo(function(e) {
            a.setData({
                scoreResule: e.result
            });
        }), i.GetCheckInCircle(function(e) {
            console.log("获取打卡信息"), a.setData({
                CheckInCircle: e.CheckInCircle
            });
        });
    },
    remindMsg: function() {
        var a = this;
        e.remindMsg(function(e) {
            a._data.disable = !0, a.setData({
                hideMsg: e.ReplyCount
            });
        }), t.msgList({
            Pageindex: 1
        }, function(e) {
            a.data.msgList = e.FeedbackList;
        });
    },
    bindAbout: function() {
        wx.navigateTo({
            url: "../about/about"
        });
    },
    bindFeedback: function() {
        this._data.disable && (this.data.msgList ? wx.navigateTo({
            url: "../feedBack/chat/chat"
        }) : wx.navigateTo({
            url: "../feedBack/feedBack"
        }));
    },
    bindExamInfo: function() {
        wx.navigateTo({
            url: "../examInfo/examInfo/examInfo"
        });
    },
    bindChoose: function() {
        var e = this;
        this.data.canChoose && (e.data.packageLevel == a.PackageLevel.All ? wx.navigateTo({
            url: "../chooseSchoolType/chooseSchoolType?backTab=2"
        }) : e.data.packageLevel != a.PackageLevel.Group && e.data.packageLevel != a.PackageLevel.Class || wx.navigateTo({
            url: "../chooseSubject/chooseSubject?backTab=2&packageLevel=" + e.data.packageLevel
        }));
    },
    bindDebug: function(a) {
        wx.navigateTo({
            url: "../debug/index"
        });
    },
    bindLogin: function() {
        n.gotoLogin("./mine");
    },
    logout: function() {
        var a = this;
        n.globalData.userData.HasLogin = !1, n.reAuth(function() {
            a.setData({
                hasLogin: !1
            });
        });
    },
    onUserMsgJs: function() {
        n.globalData.userData.HasLogin && wx.navigateTo({
            url: "../mine/modify/modify"
        });
    },
    bindExamAreaJs: function() {
        wx.navigateTo({
            url: "../selectExamArea/selectExamArea?backTab=1"
        });
    },
    oneselfData: function() {
        wx.navigateTo({
            url: "../group/groupDocList/groupDocList"
        });
    },
    onInotView: function(a) {
        var e = a.currentTarget.dataset, t = "";
        if (n.globalData.userData.HasLogin) t = (e.isjoin || e.ischeckin) && e.isjoin ? "/packageClock/pages/clockHome/clockHome?CircleID=" + e.circleid + "&Type=" + e.checkincircletype + "&isShowModal=0&isCreatePoster=0" : "/packageClock/pages/clockProfile/clockProfile?CircleID=" + e.circleid + "&Type=" + e.checkincircletype, 
        wx.navigateTo({
            url: t
        }); else {
            n.gotoLogin("");
        }
    },
    onLoadMoreCircles: function() {
        var a = this.data.totalRow, e = this.data.pageNumber, t = this.data.CheckInCircle.length;
        e++, a <= t && (wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 300
        }), this.setData({
            totalRow: e * a,
            hasMoreData: !0,
            pageNumber: e
        }), this.data.totalRow > t && this.setData({
            hasMoreData: !1
        }));
    }
});