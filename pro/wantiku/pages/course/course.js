function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a = require("../../config.js"), o = (require("../../biz/auth.js"), require("../../utils/cc.js")), r = (require("../../utils/util.js"), 
require("../../biz/chapter.js")), s = require("../../helper/treeHelper"), i = require("../../utils/tourist.js"), n = getApp(), u = (require("../../utils/wxpares.js"), 
require("../../biz/practice.js")), c = require("../../biz/groupBuy.js"), l = require("../../utils/xnSDK.js"), d = require("../../utils/xnUtils.js");

Page((t = {
    data: {
        XNConfigInfo: d.getXNConfigInfo(),
        buyState: a.buyState,
        theme: a.UIConfig.Theme,
        playUrl: "",
        courseId: 0,
        siteId: 0,
        courseSize: 0,
        courseSizeM: 0,
        tab: 3,
        tree: [],
        treeData: [],
        evaluations: [],
        initEvas: !1,
        pager: {},
        total: {
            avgStar: 0,
            userCount: 0
        },
        lastStar: 0,
        networkWarn: !1,
        networkType: "2g",
        loaded: !1,
        hasCourse: !0,
        needBuy: !1,
        courseName: "",
        lectureImgList: null,
        scrollSite: "",
        lectureImage: "",
        lectureImageCount: 0,
        imageLoaded: !1,
        videoId: "",
        courseIntroUrls: [],
        hasLogin: "",
        formId: "",
        rootSiteId: "",
        IsSaleSuccessRefresh: !1,
        shareSuccess: !0,
        IsBindtimeupdate: !1,
        learnUserCount: 0,
        realCoursePrice: 0,
        IsUnlock: 1,
        deblocking: !1,
        IsLockVideo: 0,
        videoStatus: !0,
        isUnlockingState: !1,
        showModalUnlock: !1
    },
    customData: {
        videoTime: 0,
        imageLoadedCount: 0,
        initTop: 0
    },
    videoContext: null,
    clickNode: function(e, t, a, o, r) {
        for (var i = !1, n = 0; n < e.length; n++) {
            var u = e[n];
            if (u.rootId == t) for (var c = 0; c < u.subTree.length; c++) {
                var l = u.subTree[c];
                if (l.siteId != a || 3 == l.siteLevel) l.parentId != a ? l.rootId == a && l.rootId != l.siteId && (l.display = !i) : (l.display = !l.display, 
                l.style = s.caculateNodeStyle(l), i = i || l.collspan); else {
                    if (!l.hasChildren) continue;
                    l.collspan = !l.collspan, l.style = s.caculateNodeStyle(l), i = i || l.collspan;
                }
            }
        }
        return e;
    },
    initOpenNode: function(e, t, a, o, r) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            if (n.rootId == t) {
                for (var u = 0; u < n.subTree.length; u++) {
                    var c = n.subTree[u];
                    c.siteId == a || c.siteId == r || c.siteId == t ? (c.collspan = !1, c.display = !0, 
                    c.style = s.caculateNodeStyle(c), c.siteId == a && !0) : c.parentId != t && c.parentId != r && c.parentId != a || (c.collspan = !0, 
                    c.display = !0, c.style = s.caculateNodeStyle(c));
                }
                break;
            }
        }
    },
    getItemHeight: function(e) {
        wx.createSelectorQuery().selectViewport().fields({
            size: !0
        }, function(t) {
            e && e(t.width / 750 * 126);
        }).exec();
    },
    onLoad: function(e) {
        var t = this, o = e.formId;
        this.data.formId = o, this.data.rootSiteId = e.rootSiteId, t.videoContext = wx.createVideoContext("myVideo"), 
        n.checkContextWithShareOptions(e, function() {
            e.courseSiteId;
            e.IsShare && 1 == e.IsShare ? (t.data.siteId = e.courseSiteId, t.comeBackFrench(), 
            t.setData({
                IsShare: e.IsShare,
                learnUserCount: e.learnUserCount,
                realCoursePrice: e.realCoursePrice
            })) : t.loadModeData(e), e.IsShare && c.getGroupon(function(e) {
                t.setData({
                    ifHongb: e.HasGroupon,
                    openGroupId: e.Groupon.Id
                });
            });
            var a = n.globalData.userData.HasLogin;
            t.setData({
                hasLogin: a
            });
        }, function() {
            wx.hideToast();
            var e = a.PackageInfo.PackageLevel;
            e == a.PackageLevel.All ? wx.redirectTo({
                url: "../chooseSchool/chooseSchool"
            }) : e != a.PackageLevel.Single && wx.redirectTo({
                url: "../chooseSubject/chooseSubject?packageLevel=" + e
            });
        }), i.addTouristQuantity(n.globalData.VideoType.chapterVideo), r.getIsUnlockChapter(function(e) {
            t.setData({
                IsUnlock: e.IsUnlock
            });
        }), this.setData({
            isIos: !!n.globalData.SystemInfo.iOS
        });
    },
    onShow: function() {
        var e = this;
        if (r.getIsUnlockChapter(function(t) {
            e.setData({
                IsUnlock: t.IsUnlock
            });
        }), r.getCourseSiteTree(function(t) {
            t.CourseSiteList.length;
            var a = s.initTree(t), o = s.transTree(a);
            e.data.tree = a, e.setData({
                treeData: o
            }), e.data.IsLockVideo && e.data.IsUnlock && e.setData({
                videoStatus: !0
            });
        }), this.data.hasLogin != n.globalData.userData.HasLogin || this.data.IsSaleSuccessRefresh) {
            e.setData({
                lectureImgList: []
            }), e.comeBackFrench();
            var t = n.globalData.userData.HasLogin;
            e.setData({
                hasLogin: t
            });
        }
        this.customData.videoTime = 0, 2 == this.data.tab && (this.loadEvaluation(), this.setData({
            lastStar: n.globalData.tempData.star
        })), e.data.isUnlockingState && (wx.showToast({
            title: "解锁成功",
            image: "/images/papers/success.png",
            duration: 2e3,
            mask: !0,
            success: function(t) {
                r.lockChapterSuccess(function(t) {
                    e.setData({
                        IsUnlock: t.MsgCode,
                        isUnlockingState: !1,
                        videoStatus: !0
                    });
                });
            }
        }), r.getIsUnlockChapter(function(t) {
            e.setData({
                IsUnlock: t.IsUnlock
            });
        })), e.data.showModalUnlock && e.setData({
            modalData: {
                title: "解锁失败",
                content: "成功添加后即可解锁，请再试一次"
            },
            showModal: e.data.showModalUnlock
        }), e.data.XNConfigInfo = d.getXNConfigInfo(), l.callTrail({
            originId: e.data.XNConfigInfo.AppId,
            siteId: "kf_9644"
        });
    },
    loginLook: function() {
        n.gotoLogin("", 2);
    },
    getBuyVideo: function(e) {
        var t = "../../pages/chaterVideoOrder/chaterVideoOrder?rootSiteId=" + this.data.rootSiteId;
        this.data.IsSaleSuccessRefresh = !1, this.data.hasLogin ? wx.navigateTo({
            url: t
        }) : n.gotoLogin("", 2);
    },
    bindvideo: function() {},
    getCourseSiteData: function(e) {
        var t = {
            courseData: {},
            subjectParentName: "",
            subjectName: ""
        };
        return t.subjectName = e.SubjectName, t.subjectParentName = e.SubjectParentName, 
        t.courseData.courseId = e.SiteData.ChapterCourseId, t.courseData.courseSiteId = e.SiteData.ChapterCourseSiteId, 
        t.courseData.courseSize = e.SiteData.CourseSize, t.courseData.lectureImage = e.SiteData.LectureImageUrl, 
        t.courseData.lectureImageCount = e.SiteData.ImageCount, t.courseData.needBuy = e.SiteData.RealCoursePrice > 0 && 0 == e.SiteData.BuyState, 
        t.courseData.videoId = e.SiteData.VideoId, t.courseData.courseName = e.SiteData.CourseSiteName, 
        t;
    },
    comeBackFrench: function() {
        var e = this;
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 1e4,
            mask: !0
        });
        var t = this;
        r.getIsUnlockChapter(function(e) {
            t.setData({
                IsUnlock: e.IsUnlock
            }), t.data.IsLockVideo && !t.data.IsUnlock && t.setData({
                videoStatus: !1
            });
        }), r.getCourseInfo(this.data.siteId, function(t) {
            var a = t.SiteData, o = a.RealCoursePrice > 0 && 0 == a.BuyState, r = {
                needBuy: o,
                videoId: o ? "" : a.VideoId,
                courseId: a.ChapterCourseId,
                courseSiteId: a.ChapterCourseSiteId,
                courseSize: a.CourseSize,
                courseName: a.CourseSiteName,
                lectureImage: o ? "" : a.LectureImageUrl,
                lectureImageCount: o ? "" : a.ImageCount,
                lectureUrl: a.LectureURL,
                IsLockVideo: a.IsLockVideo
            };
            e.loadModeData(r);
        });
    },
    loadModeData: function(e) {
        var t = this, a = e.videoId, i = e.courseId, u = e.courseSiteId, c = e.courseSize, l = e.courseName, d = e.lectureImage, g = e.lectureImageCount, I = e.lectureUrl, h = e.IsLockVideo;
        if (e.realCoursePrice && e.learnUserCount) {
            var v = e.realCoursePrice, f = e.learnUserCount;
            t.setData({
                realCoursePrice: v,
                learnUserCount: f
            });
        }
        var S = [];
        d && g > 0 && (S = s.getImageList(d, g));
        for (var p = [], D = 0; D < S.length; D++) {
            var m = S[D];
            p.push({
                url: m,
                index: D,
                loaded: !1
            });
        }
        wx.setNavigationBarTitle({
            title: l
        }), console.log("imageStates~~~~~~~~~~~~~~~~~~"), console.log(p);
        var C = {
            videoId: a,
            courseId: i,
            siteId: u,
            courseSize: c,
            courseSizeM: Math.floor(c / 1024 * 10) / 10,
            courseName: l,
            lectureImgList: p,
            lectureImage: d,
            lectureImageCount: g,
            LectureURL: I,
            IsLockVideo: h
        };
        e.IsShare || (C.needBuy = "true" == e.needBuy), t.setData(C), h && !t.data.IsUnlock && t.setData({
            videoStatus: !1
        }), t.practiceEventMsg();
        var b = n.getSubjectInfo();
        t.setData({
            subjectInfo: b,
            lastStar: n.globalData.tempData.star
        }), r.getCourseSiteTree(function(e) {
            var r = e.CourseSiteList.length > 0, i = s.initTree(e), n = s.findCourse(u, i);
            null != n && t.initOpenNode(i, n.rootId, n.siteId, n.siteLevel, n.parentId);
            var c = s.transTree(i);
            if (t.data.IsSaleSuccessRefresh) {
                var l = t.data.treeData;
                s.saveOpenStyle(l, c), t.data.IsSaleSuccessRefresh = !1;
            }
            t.data.tree = i, t.setData({
                treeData: c
            });
            var d = {
                loaded: !0,
                hasCourse: r
            };
            null != n && (d.needBuy = n.needBuy), wx.getNetworkType({
                success: function(e) {
                    "wifi" == e.networkType ? (d.networkWarn = !1, d.networkType = e.networkType, a ? o(a, function(e) {
                        d.playUrl = e, t.setData(d);
                    }) : t.setData(d)) : (d.networkWarn = !0, d.networkType = e.networkType, t.setData(d));
                }
            }), wx.hideToast();
        });
    },
    practiceEventMsg: function() {
        if (this.data.formId) {
            var e = n.globalData.userData.OpenId, t = this.data.formId, a = n.globalData.subject.SubjectParentName, o = (n.globalData.subject.SubjectName, 
            this.data.courseId), r = this.data.courseName, s = this.getShareAppUrl();
            console.log("OpenId : " + e + ",FormId : " + t + ",SubjectParentName" + a + ",CourseName : " + r), 
            console.log("ReportUrl : " + s), u.chapterEvent(o, e, t, s, a, r, function(e) {});
        }
    },
    setCourseScroll: function() {
        var e = this;
        e.data.scrollSite || e.setData({
            scrollSite: "site" + e.data.siteId
        });
    },
    loadEvaluation: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t = this, a = t.data.courseId;
        r.getEvaluationList(a, function(a) {
            if (a.EvaluationList) for (var o = 0; o < a.EvaluationList.length; o++) {
                var r = a.EvaluationList[o];
                r.PicUrl || (r.PicUrl = "../../images/index/default_photo.png");
            }
            t.setData({
                pager: a.Pager,
                evaluations: a.EvaluationList,
                total: {
                    avgStar: a.AvgEvaluation.AvgEvaluationStar,
                    userCount: a.AvgEvaluation.EvaluationCount
                }
            }), "function" == typeof e && e();
        }, 0, 15);
    },
    onUnload: function() {
        this.saveCourseHistory();
    },
    onHide: function() {
        this.setData({
            initEvas: !1
        }), this.saveCourseHistory();
    },
    onReady: function() {},
    getShareAppUrl: function() {
        var e = this, t = "/pages/course/course";
        return t += "?courseId=" + e.data.courseId, t += "&courseSiteId=" + e.data.siteId, 
        t += "&videoId=" + e.data.videoId, t += "&courseSize=" + e.data.courseSize, t += "&courseName=" + e.data.courseName, 
        t += "&lectureImage=" + e.data.lectureImage, t += "&lectureImageCount=" + e.data.lectureImageCount, 
        t += "&rootSiteId=" + e.data.rootSiteId, t += "&learnUserCount=" + e.data.learnUserCount, 
        t += "&realCoursePrice=" + e.data.realCoursePrice, t += "&" + n.generateShareOptions();
    },
    onShareAppMessage: function() {
        var e = this, t = this.getShareAppUrl();
        return {
            title: e.data.courseName,
            path: t,
            success: function(e) {},
            fail: function(e) {}
        };
    },
    saveCourseHistory: function() {
        var e = this;
        Math.floor(e.customData.videoTime) > 1 && r.saveUserCourseHistory(e.data.siteId, e.data.courseId, Math.floor(e.customData.videoTime));
    },
    bindpause: function(e) {
        this.saveCourseHistory();
    },
    bindplay: function(e) {
        this.setData({
            networkWarn: !1
        });
    },
    bindtimeupdate: function(e) {
        var t = this, a = e.detail.currentTime;
        t.customData.videoTime = a;
    },
    bindError: function(e) {},
    bindLectureLoaded: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.lectureImgList;
        a[t].loaded = !0, this.setData({
            lectureImgList: a
        });
    },
    bindeneded: function(e) {
        this.saveCourseHistory();
    },
    bindNetworkPlay: function(e) {
        var t = this, a = t.data.videoId;
        o(a, function(e) {
            t.setData({
                playUrl: e,
                networkWarn: !1
            }), t.videoContext.play();
        });
    },
    bindtab: function(e) {
        var t = this, a = parseInt(e.currentTarget.dataset.tab);
        console.log("点击讲义"), console.log(a), console.log("点击讲义"), 2 != a || t.data.initEvas ? 1 == a ? (this.setData({
            tab: a
        }), t.setCourseScroll()) : this.setData({
            tab: a
        }) : (t.loadEvaluation(), this.setData({
            initEvas: !0
        }), this.setData({
            tab: a
        }));
    },
    bindEvaluate: function(e) {
        var t = e.currentTarget.dataset.courseid, a = e.target.dataset.star, o = "../evaluation/evaluation?courseId=" + t + "&star=" + a;
        n.globalData.userData.HasLogin ? wx.navigateTo({
            url: o
        }) : n.gotoLogin("", 0), n.globalData.tempData.star = a, this.setData({
            lastStar: a
        });
    },
    bindCourse: function(e) {
        var t = e.currentTarget.dataset.rootid, a = e.currentTarget.dataset.siteid, o = e.currentTarget.dataset.level, r = e.currentTarget.dataset.parentid;
        this.clickNode(this.data.tree, t, a, o, r);
        var i = s.transTree(this.data.tree);
        this.setData({
            treeData: i
        });
    }
}, e(t, "bindvideo", function(e) {}), e(t, "formSubmitVideo", function(e) {
    var t = this, a = e.detail.target.dataset.siteid, r = e.detail.target.dataset.courseid, i = e.detail.target.dataset.vid, u = parseInt(e.detail.target.dataset.size), c = e.detail.target.dataset.needbuy, l = e.detail.target.dataset.name, d = e.detail.target.dataset.lecture_image, g = e.detail.target.dataset.lecture_image_count, I = e.detail.target.dataset.rootSiteid;
    e.detail.target.dataset.siteLevel;
    this.data.formId = e.detail.formId, this.data.realCoursePrice = e.detail.target.dataset.realcourseprice, 
    this.data.learnUserCount = e.detail.target.dataset.learnUserCount;
    var h = e.detail.target.dataset.islockvideo;
    n.globalData.userData.HasLogin;
    if (n.globalData.SystemInfo.iOS && c) return console.log("跳转到小能"), !1;
    if (h && !t.data.IsUnlock) if (n.globalData.userData.HasLogin) wx.navigateTo({
        url: "../../pages/couresUnlock/couresUnlock"
    }); else {
        n.gotoLogin("", 4);
    }
    if (t.setData({
        IsLockVideo: h
    }), c) {
        var v = "../../pages/chaterVideoOrder/chaterVideoOrder?rootSiteId=" + I;
        this.data.IsSaleSuccessRefresh = !1, this.data.hasLogin ? wx.navigateTo({
            url: v
        }) : n.gotoLogin("", 2);
    } else {
        h && !t.data.IsUnlock ? t.setData({
            deblocking: !0,
            videoStatus: !1
        }) : (this.saveCourseHistory(), t.setData({
            deblocking: !1,
            videoStatus: !0
        }));
        var f = [];
        d && g > 0 && (f = s.getImageList(d, g));
        for (var S = [], p = 0; p < f.length; p++) {
            var D = f[p];
            S.push({
                url: D,
                index: p,
                loaded: !1
            });
        }
        t.setData({
            courseName: l,
            lectureImgList: S,
            lectureImage: d,
            lectureImageCount: g
        }), i && !c ? o(i, function(e) {
            n.globalData.tempData.star = 0, t.setData({
                playUrl: e,
                courseId: r,
                siteId: a,
                lastStar: 0,
                needBuy: !1,
                courseSize: u,
                courseSizeM: Math.floor(u / 1024 * 10) / 10,
                initEvas: !1,
                videoId: i
            }), t.customData.videoTime = 0, t.practiceEventMsg();
        }) : c && (n.globalData.tempData.star = 0, t.setData({
            playUrl: "",
            courseId: r,
            siteId: a,
            needBuy: !0,
            lastStar: 0,
            courseSize: u,
            courseSizeM: Math.floor(u / 1024 * 10) / 10,
            initEvas: !1
        }), t.customData.videoTime = 0), wx.setNavigationBarTitle({
            title: l
        });
    }
}), e(t, "onMorePracticeJs", function() {
    wx.reLaunch({
        url: "../../pages/index/index"
    });
}), e(t, "formSubmitHongBao", function(e) {
    var t = e.detail.formId, a = this.data.openGroupId;
    wx.navigateTo({
        url: "../group/groupBuy/groupBuy?formId=" + t + "&grouponid=" + a
    });
}), e(t, "showBtnshare", function() {
    this.onShareAppMessage();
}), e(t, "clickBackground", function() {}), e(t, "deblockingBackground", function() {
    this.setData({
        deblocking: !1
    });
}), e(t, "btnDeblocking", function() {
    if (n.globalData.userData.HasLogin) wx.navigateTo({
        url: "../../pages/couresUnlock/couresUnlock"
    }); else {
        n.gotoLogin(" ", 2);
    }
    this.setData({
        deblocking: !0
    });
}), e(t, "hideModal", function() {
    this.setData({
        showModal: !1,
        showModalUnlock: !1
    });
}), e(t, "logInBtn", function() {
    n.gotoLogin("", 0);
}), t));