function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

require("utils/ald-stat.js");

var a, t = require("config.js"), r = (require("utils/log.js"), require("biz/auth.js")), o = require("biz/subject.js"), l = require("helper/route.js"), n = require("biz/examArea.js"), u = require("utils/storageManage.js"), s = require("utils/practiceModle.js"), c = require("biz/review.js");

App((a = {
    globalData: {
        Review: !0,
        channel: null,
        currentTime: 0,
        buyState: t.buyState,
        header: null,
        subject: {
            SubjectName: "",
            SubjectParentName: ""
        },
        userArea: {
            UserAreaId: 0,
            InstitutionAreaId: 0
        },
        userData: {
            HasLogin: !1,
            HasWxLogin: !1
        },
        tempData: {
            star: 0
        },
        SystemInfo: {
            windowHeight: 603,
            iOS: !1,
            iPhoneX: !1
        },
        ExamType: {
            fenxiangTest: 0,
            fastTest: 1,
            chapterTest: 2,
            zhentiTest: 3,
            wrongSee: 4,
            collectionSee: 5,
            historySee: 6,
            solidifyTest: 7,
            burningTest: 8,
            fineTest: 9,
            denseTest: 10,
            highFreTest: 11,
            textbookTest: 12,
            mockTest: 13
        },
        ExamSiteId: 0,
        TouristQuantity: {
            fastTestQuantity: 3,
            chapterTestQuantity: 3,
            zhentiTestQuantity: 3,
            solidifyTestQuantity: 3,
            chapterVideoQuantity: 3,
            wrongSeeQuantity: 3,
            collectionSeeQuantity: 3,
            historySeeQuantity: 3
        },
        HightFreMode: {
            userCount: 0,
            TotalCount: 0
        },
        VideoType: {
            chapterVideo: 30
        },
        PracticeModle: {
            reciteModle: !1,
            rightDel: !1,
            rightSkip: !1
        },
        goToRespository: !0,
        goToRespositoryBackRoute: "",
        MockPaperCache: {
            mockId: 0,
            questionId: 0,
            mockAnswerList: []
        },
        paperList: null,
        userAnswer: null
    },
    onLaunch: function() {
        var e = this;
        c.versionState(function(a) {
            1 == a.MsgCode && (e.globalData.Review = 0 == a.ReviewState, e.globalData.Review || wx.setTabBarItem({
                index: 1,
                text: "直播",
                iconPath: "images/tabBar/home_icon_video_dis.png",
                selectedIconPath: "images/tabBar/home_icon_video.png"
            }));
        });
        var a = this;
        wx.getSystemInfo({
            success: function(e) {
                a.globalData.SystemInfo.windowHeight = e.windowHeight;
                var t = e.system.substring(0, 3);
                a.globalData.SystemInfo.iOS = "iOS" == t, "iPhone X" == e.model.substring(0, 8) && (a.globalData.SystemInfo.iPhoneX = !0);
            }
        });
        try {
            var r = wx.getStorageSync(t.AppStorage.header);
            r ? (a.globalData.header = r, u.headerStorageFilter(a.globalData.header, t.DefaultHeader)) : a.globalData.header = t.DefaultHeader, 
            a.globalData.header.UserClientType = a.globalData.SystemInfo.iOS ? 1 : 2;
            var o = wx.getStorageSync(t.AppStorage.subject);
            o && (a.globalData.subject = o);
            var l = wx.getStorageSync(t.AppStorage.userData);
            l && (a.globalData.userData = l);
            var n = wx.getStorageSync(t.AppStorage.userArea);
            n && (a.globalData.userArea = n);
        } catch (e) {
            console.error(e);
        }
        s.initpPacticeModle(a);
    },
    jiakaoNavigateto: !1,
    onShow: function(e) {
        var a = this;
        e.referrerInfo && e.referrerInfo.extraData && e.referrerInfo.extraData.foo && "jiakaoNavigateto" == e.referrerInfo.extraData.foo ? a.jiakaoNavigateto = !0 : a.jiakaoNavigateto = !1;
    },
    setTitleWithSubjectParentName: function(e) {
        var a = this;
        console.log(a.globalData.subject.SubjectParentName), a.globalData.subject.SubjectParentName || wx.setNavigationBarTitle({
            title: a.globalData.subject.SubjectParentName,
            success: function(a) {
                console.log("success"), e && e(a);
            },
            fail: function(e) {
                console.error(e);
            },
            complete: function(e) {
                console.error("complete");
            }
        });
    },
    setParentSubject: function(e, a, r) {
        var o = this;
        o.globalData.header || (o.globalData.header = {
            SubjectParentId: 0,
            SubjectLevel: 0
        }), o.globalData.header.SubjectParentId = e, o.globalData.header.SubjectLevel = a, 
        o.globalData.subject.SubjectParentName = r, wx.setStorage({
            key: t.AppStorage.header,
            data: o.globalData.header
        }), wx.setStorage({
            key: t.AppStorage.subject,
            data: o.globalData.subject
        });
    },
    setSubject: function(e, a) {
        var r = this;
        r.globalData.header || (r.globalData.header = {
            SubjectId: 0,
            SubjectName: ""
        }), r.globalData.header.SubjectId = e, r.globalData.subject.SubjectName = a, wx.setStorage({
            key: t.AppStorage.header,
            data: r.globalData.header
        }), wx.setStorage({
            key: t.AppStorage.subject,
            data: r.globalData.subject
        });
    },
    setGlobalSubject: function(e, a, r, o, l) {
        var n = this;
        n.globalData.header || (n.globalData.header = {}), n.globalData.header.SubjectParentId = e, 
        n.globalData.header.SubjectLevel = a, n.globalData.header.SubjectId = r, n.globalData.subject.SubjectName = l, 
        n.globalData.subject.SubjectParentName = o, wx.setStorage({
            key: t.AppStorage.header,
            data: n.globalData.header
        }), wx.setStorage({
            key: t.AppStorage.subject,
            data: n.globalData.subject
        });
    },
    setGlobalUserAreaId: function(e) {
        var a = this;
        a.globalData.userArea.UserAreaId = e, wx.setStorage({
            key: t.AppStorage.userArea,
            data: a.globalData.userArea
        });
    },
    setGlobalInstitutionAreaId: function(e) {
        var a = this;
        a.globalData.userArea.InstitutionAreaId = e, wx.setStorage({
            key: t.AppStorage.userArea,
            data: a.globalData.userArea
        });
    },
    setGlobalSubjectName: function(e, a) {
        var t = this;
        t.globalData.subject.SubjectName = a, t.globalData.subject.SubjectParentName = e;
    },
    setUserData: function(e) {
        var a = this, r = a.globalData.header;
        r.UserId = e.UserId, r.Token = e.Token, a.globalData.userData.HasLogin = !0, "" != e.OpenId && null != e.OpenId && (a.globalData.userData.OpenId = e.OpenId), 
        !e.Avatar || e.NickName, a.globalData.userData.Avatar = e.Avatar, a.globalData.userData.NickName = e.NickName, 
        a.globalData.userData.Avatar || (a.globalData.userData.Avatar = "http://img02.exam8.com/img2013/wantiku/paihang/default_rank_head.png");
        var l = {
            cSubjectParentId: a.globalData.header.SubjectParentId,
            cSubjectParentName: a.globalData.subject.SubjectParentName,
            cSubjectLevel: a.globalData.header.SubjectLevel,
            cSubjectId: a.globalData.header.SubjectId,
            cSubjectName: a.globalData.subject.SubjectName
        };
        o.saveSubjectParent(l), 1 == a.getExamRegionType() ? n.saveExamArea(a.globalData.userArea.UserAreaId) : 2 == a.getExamRegionType() && n.saveExamArea(a.globalData.userArea.InstitutionAreaId), 
        wx.setStorage({
            key: t.AppStorage.header,
            data: r
        }), wx.setStorage({
            key: t.AppStorage.userData,
            data: a.globalData.userData
        });
    },
    checkAuth: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, a = this, l = a.globalData.header, n = a.globalData.userData;
        l && 0 != l.UserId && l.Token && n.HasWxLogin ? "function" == typeof e && e() : r.login(function(r) {
            if (l = t.DefaultHeader, l.UserId = r.UserId, l.Token = r.Token, l.SubjectLevel = r.SubjectLevel, 
            l.SubjectParentId = r.SubjectParentId, l.SubjectId = r.SubjectId, a.globalData.subject.SubjectParentName = r.SubjectParentName, 
            a.globalData.subject.SubjectName = r.SubjectName, a.globalData.userArea.UserAreaId = r.UserAreaId, 
            a.globalData.userArea.InstitutionAreaId = r.InstitutionAreaId, !t.PackageInfo.NeedChooseSubject && 0 == l.SubjectParentId && l.SubjectMergerId <= 0) {
                l.SubjectLevel = t.PackageInfo.SubjectLevel, l.SubjectParentId = t.PackageInfo.SubjectParentId, 
                l.SubjectId = t.PackageInfo.SubjectId, a.globalData.subject.SubjectParentName = t.PackageInfo.SubjectParentName, 
                a.globalData.subject.SubjectName = t.PackageInfo.SubjectName;
                var n = {
                    cSubjectParentId: t.PackageInfo.SubjectParentId,
                    cSubjectParentName: t.PackageInfo.SubjectParentName,
                    cSubjectLevel: t.PackageInfo.SubjectLevel,
                    cSubjectId: t.PackageInfo.SubjectId,
                    cSubjectName: t.PackageInfo.SubjectName
                };
                o.saveSubjectParent(n);
            }
            a.globalData.header = l, a.globalData.userData.HasLogin = !1, a.globalData.userData.HasWxLogin = !0, 
            a.globalData.userData.OpenId = r.OpenId, a.globalData.userData.Avatar = r.Avatar, 
            a.globalData.userData.NickName = r.NickName, wx.setStorage({
                key: t.AppStorage.header,
                data: l
            }), wx.setStorage({
                key: t.AppStorage.subject,
                data: a.globalData.subject
            }), wx.setStorage({
                key: t.AppStorage.userData,
                data: a.globalData.userData
            }), wx.setStorage({
                key: t.AppStorage.userArea,
                data: a.globalData.userArea
            }), "function" == typeof e && e();
        });
    },
    reAuth: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, a = this;
        if (a.globalData.userData.HasLogin) l.toLogin(); else {
            var o = a.globalData.header;
            r.login(function(r) {
                console.log(r), o.UserId = r.UserId, o.Token = r.Token, a.globalData.userData.HasLogin = !1, 
                a.globalData.userData.HasWxLogin = !0, a.globalData.userData.OpenId = r.OpenId, 
                a.globalData.userData.Avatar = r.Avatar, a.globalData.userData.NickName = r.NickName, 
                a.globalData.userArea.UserAreaId = r.UserAreaId, a.globalData.userArea.InstitutionAreaId = r.InstitutionAreaId, 
                a.globalData.header = o, wx.setStorage({
                    key: t.AppStorage.userData,
                    data: a.globalData.userData
                }), wx.setStorage({
                    key: t.AppStorage.header,
                    data: o
                }), wx.setStorage({
                    key: t.AppStorage.userArea,
                    data: a.globalData.userArea,
                    success: function() {
                        "function" == typeof e && e();
                    }
                });
            });
        }
    },
    checkContext: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, t = this;
        t.checkAuth(function() {
            t.globalData.header.SubjectParentId > 0 && t.globalData.header.SubjectId > 0 ? "function" == typeof e && e() : "function" == typeof a && a();
        });
    },
    checkContextWithShareOptions: function(e) {
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, r = this;
        console.log(e), r.checkAuth(function() {
            if (1 == e.IsShare && e.SubjectParentId && e.SubjectId) {
                r.setGlobalSubject(e.SubjectParentId, e.SubjectLevel, e.SubjectId, e.SubjectParentName, e.SubjectName), 
                r.setGlobalUserAreaId(e.UserAreaId), r.setGlobalInstitutionAreaId(e.InstitutionAreaId);
                var l = {
                    cSubjectParentId: e.SubjectParentId,
                    cSubjectParentName: e.SubjectParentName,
                    cSubjectLevel: e.SubjectLevel,
                    cSubjectId: e.SubjectId,
                    cSubjectName: e.SubjectName
                };
                o.saveSubjectParent(l), 1 == r.getExamRegionType() ? n.saveExamArea(e.UserAreaId) : 2 == r.getExamRegionType() && n.saveExamArea(e.InstitutionAreaId);
            }
            console.log(r.globalData.header), r.globalData.header.SubjectParentId > 0 && r.globalData.header.SubjectId > 0 ? "function" == typeof a && a() : "function" == typeof t && t();
        });
    },
    getSubjectInfo: function() {
        var e = this;
        return {
            SubjectParentId: e.globalData.header.SubjectParentId,
            SubjectLevel: e.globalData.header.SubjectLevel,
            SubjectId: e.globalData.header.SubjectId,
            SubjectParentName: e.globalData.subject.SubjectParentName,
            SubjectName: e.globalData.subject.SubjectName
        };
    },
    getUserAreaInfo: function() {
        var e = this;
        return {
            UserAreaId: e.globalData.userArea.UserAreaId,
            InstitutionAreaId: e.globalData.userArea.InstitutionAreaId
        };
    },
    generateShareOptions: function() {
        var e = this, a = "IsShare=1";
        return a += "&SubjectParentId=" + e.globalData.header.SubjectParentId, a += "&SubjectLevel=" + e.globalData.header.SubjectLevel, 
        a += "&SubjectId=" + e.globalData.header.SubjectId, a += "&SubjectParentName=" + e.globalData.subject.SubjectParentName, 
        a += "&SubjectName=" + e.globalData.subject.SubjectName, a += "&UserAreaId=" + e.globalData.userArea.UserAreaId, 
        a += "&InstitutionAreaId=" + e.globalData.userArea.InstitutionAreaId;
    },
    gotoLogin: function(e) {
        e || (e = "/pages/index/index"), this.globalData.loginReffer = e, wx.navigateTo({
            url: "/pages/user/userLogin"
        });
    }
}, e(a, "gotoLogin", function(e, a) {
    e || (e = "/pages/index/index"), this.globalData.loginReffer = e, wx.navigateTo({
        url: "/pages/user/userLogin?touristPractice=" + a
    });
}), e(a, "backLogin", function() {
    var e = this.globalData.loginReffer;
    e ? (wx.navigateBack({
        delta: 2
    }), setTimeout(function() {
        console.log(e), wx.navigateTo({
            url: e
        });
    }, 800)) : wx.switchTab({
        url: "/pages/index/index"
    });
}), e(a, "getExamRegionType", function() {
    var e = 0;
    return 432 == this.globalData.header.SubjectParentId ? e = 1 : 719 != this.globalData.header.SubjectParentId && 715 != this.globalData.header.SubjectParentId || (e = 2), 
    e;
}), a));