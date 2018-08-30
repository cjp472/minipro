require("../../utils/cc.js");

var e = require("../../config.js"), t = require("../../biz/chapter.js"), a = require("../../helper/treeHelper.js"), o = require("../../helper/homeIconHelper.js"), i = require("../../biz/practice.js"), r = require("../../utils/tourist.js"), s = require("../../biz/groupBuy.js"), n = require("../../utils/getSetStorage.js"), c = require("../../biz/checkInCircle.js"), l = require("../../utils/xnSDK.js"), u = require("../../utils/xnUtils.js"), d = getApp();

Page({
    data: {
        XNConfigInfo: u.getXNConfigInfo(),
        theme: e.UIConfig.Theme,
        buyState: e.buyState,
        subjectInfo: {
            SubjectId: 0
        },
        userAreaInfo: {},
        tree: [],
        treeData: [],
        progress: {},
        hasCourse: !0,
        loaded: !1,
        app: e.AppName,
        userId: 0,
        subjectScore: {
            MyPredictScore: 0,
            SubjectScore: 100
        },
        disabled: "disabled",
        homeIconList: [],
        hasLogin: d.globalData.userData.HasLogin,
        empty: !1,
        IsSaleDiscount: 0,
        ifHongb: !1,
        ifCloseHb: !1,
        hbanmationState: !1,
        GoodsName: "",
        openGroupId: 0,
        hbAnimation: !1,
        hongBaoLaoding: !1,
        sharePractice: !1,
        kdShareSuccess: !1,
        shareCallBack: !1,
        toUrl: "",
        courseShareName: "考点智能",
        homeIconListOne: [],
        homeIconListTwo: [],
        homeIconListType: !1,
        color: e.UIConfig.color,
        deblocking: !1,
        IsUnlock: "",
        isUnlockingState: !1,
        showModalUnlock: !1,
        showLockModule: !1,
        examFigh: {},
        userClickGoLogin: !1,
        recommendCardData: {},
        IOS: d.globalData.SystemInfo.iOS
    },
    onLoad: function(r) {
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 6e3,
            mask: !0
        });
        try {
            var s = wx.getStorageSync("ifCloseHb");
            s && this.setData({
                ifCloseHb: s
            });
        } catch (e) {}
        var c = this;
        if (d.checkContextWithShareOptions(r, function() {
            wx.setNavigationBarTitle({
                title: d.globalData.subject.SubjectParentName
            }), i.getHomeIconData(function(e) {
                var t = e.Funcs, a = o.initIconDataList(t);
                if (a.length > 8) {
                    var i = c.groupSlice(a, 8);
                    c.setData({
                        homeIconList: o.initIconDataList(i),
                        homeIconListType: !0
                    });
                } else c.setData({
                    homeIconList: o.initIconDataList(t),
                    homeIconListType: !1
                });
            }), c.getCheckInCircle(), t.getCourseSiteTree(function(e) {
                c.setData({
                    loaded: !0
                });
                var t = a.initTree(e), o = a.transTree(t);
                c.data.tree = t, c.setData({
                    treeData: o,
                    hasCourse: t.length > 0,
                    userId: d.globalData.header.UserId,
                    IsSaleDiscount: e.IsSaleDiscount
                }), c.initProgressData(e, t, c), wx.hideToast(), c.groupPonBuyStaus();
            }), t.getIsUnlockChapter(function(e) {
                c.setData({
                    IsUnlock: e.IsUnlock
                });
            });
            var e = d.getSubjectInfo();
            c.setData({
                subjectInfo: e
            });
            var s = d.getUserAreaInfo();
            c.setData({
                userAreaInfo: s
            }), wx.setNavigationBarTitle({
                title: d.globalData.subject.SubjectParentName
            }), t.getPredictScore(function(e) {
                c.data.subjectScore.MyPredictScore = e.MyPredictScore < 0 ? 0 : e.MyPredictScore, 
                c.data.subjectScore.SubjectScore = e.SubjectScore, c.setData({
                    subjectScore: c.data.subjectScore
                });
            }), 1 == d.getExamRegionType() && 0 == d.globalData.userArea.UserAreaId ? wx.redirectTo({
                url: "../selectExamArea/selectExamArea"
            }) : 2 == d.getExamRegionType() && 0 == d.globalData.userArea.InstitutionAreaId && wx.redirectTo({
                url: "../selectExamArea/selectExamArea"
            }), i.practiceMenuFrequency(function(e) {
                1 == e.MsgCode && (d.globalData.TouristQuantity.fastTestQuantity = e.fastTestQuantity, 
                d.globalData.TouristQuantity.chapterTestQuantity = e.chapterTestQuantity, d.globalData.TouristQuantity.zhentiTestQuantity = e.zhentiTestQuantity, 
                d.globalData.TouristQuantity.solidifyTestQuantity = e.solidifyTestQuantity, d.globalData.TouristQuantity.chapterVideoQuantity = e.chapterCourseQuantity, 
                d.globalData.TouristQuantity.wrongSeeQuantity = e.errorQuantity, d.globalData.TouristQuantity.collectionSeeQuantity = e.collectionQuantity, 
                d.globalData.TouristQuantity.historySeeQuantity = e.historyQuantity);
            }), c.jumpHomeList(r.type);
        }, function() {
            wx.hideToast();
            var t = e.PackageInfo.PackageLevel;
            t == e.PackageLevel.All ? wx.redirectTo({
                url: "../chooseSchoolType/chooseSchoolType"
            }) : t != e.PackageLevel.Single && wx.redirectTo({
                url: "../chooseSubject/chooseSubject?packageLevel=" + t
            });
        }), 1 == r.IsShare && r.examType == d.globalData.ExamType.fastTest) {
            var l = "../../pages/papers/papers?examType=" + d.globalData.ExamType.fastTest;
            wx.navigateTo({
                url: l
            });
        }
        var u = n.getStorageSync(d.globalData.ExamType.fastTest);
        c.setData({
            kdShareSuccess: u
        }), this.setData({
            isIos: !!d.globalData.SystemInfo.iOS
        });
    },
    onShow: function() {
        d.globalData.goToRespository = !0, d.globalData.goToRespositoryBackRoute = "../../pages/index/index";
        var e = this;
        if (e.setData({
            hasLogin: d.globalData.userData.HasLogin
        }), i.getExamFightBySubject(function(t) {
            t.Data && e.setData({
                examFigh: t.Data
            });
        }), this.data.userClickGoLogin && (this.data.userClickGoLogin = !1, this.getCheckInCircle()), 
        e.data.loaded) {
            if (wx.setNavigationBarTitle({
                title: d.globalData.subject.SubjectParentName
            }), t.getPredictScore(function(t) {
                e.data.subjectScore.MyPredictScore = t.MyPredictScore < 0 ? 0 : t.MyPredictScore, 
                e.data.subjectScore.SubjectScore = t.SubjectScore, e.setData({
                    subjectScore: e.data.subjectScore
                });
            }), e.data.subjectInfo.SubjectId != d.globalData.header.SubjectId || e.data.subjectInfo.SubjectLevel != d.globalData.header.SubjectLevel || e.data.userId != d.globalData.header.UserId || e.data.userAreaInfo.InstitutionAreaId != d.globalData.userArea.InstitutionAreaId) {
                wx.showToast({
                    title: "加载中",
                    icon: "loading",
                    duration: 1e4,
                    mask: !0
                }), e.setData({
                    userId: d.globalData.header.UserId
                }), e.getCheckInCircle(), t.getIsUnlockChapter(function(t) {
                    e.setData({
                        IsUnlock: t.IsUnlock
                    });
                }), t.getCourseSiteTree(function(t) {
                    var o = a.initTree(t), i = a.transTree(o);
                    e.data.tree = o, e.setData({
                        treeData: i,
                        hasCourse: o.length > 0,
                        data: t
                    }), e.initProgressData(t, o, e), wx.hideToast(), e.groupPonBuyStaus();
                });
                var r = d.getSubjectInfo();
                e.setData({
                    subjectInfo: r
                });
                var s = d.getUserAreaInfo();
                e.setData({
                    userAreaInfo: s
                }), i.getHomeIconData(function(t) {
                    var a = t.Funcs, i = o.initIconDataList(a);
                    if (i.length > 8) {
                        var r = e.groupSlice(i, 8);
                        e.setData({
                            homeIconList: o.initIconDataList(r),
                            homeIconListType: !0
                        });
                    } else e.setData({
                        homeIconList: o.initIconDataList(a),
                        homeIconListType: !1
                    });
                }), wx.setNavigationBarTitle({
                    title: d.globalData.subject.SubjectParentName
                }), i.practiceMenuFrequency(function(e) {
                    1 == e.MsgCode && (d.globalData.TouristQuantity.fastTestQuantity = e.fastTestQuantity, 
                    d.globalData.TouristQuantity.chapterTestQuantity = e.chapterTestQuantity, d.globalData.TouristQuantity.zhentiTestQuantity = e.zhentiTestQuantity, 
                    d.globalData.TouristQuantity.solidifyTestQuantity = e.solidifyTestQuantity, d.globalData.TouristQuantity.chapterVideoQuantity = e.chapterCourseQuantity);
                });
            } else t.getCourseSiteTree(function(t) {
                var o = a.initTree(t), i = a.transTree(o), r = e.data.treeData;
                a.saveOpenStyle(r, i), e.data.tree = o, e.setData({
                    treeData: i
                }), t.data && e.setData({
                    data: t.data
                }), e.initProgressData(t, o, e);
            }), e.setData({
                homeIconList: o.initIconDataList(e.data.homeIconList)
            });
            e.data.isUnlockingState && (e.data.ctx.draw(), wx.showToast({
                title: "解锁成功",
                image: "/images/papers/success.png",
                duration: 2e3,
                mask: !0,
                success: function(a) {
                    t.lockChapterSuccess(function(t) {
                        e.setData({
                            IsUnlock: t.MsgCode,
                            isUnlockingState: !1
                        });
                    });
                }
            }), t.getIsUnlockChapter(function(t) {
                e.setData({
                    IsUnlock: t.IsUnlock
                });
            })), e.data.showModalUnlock && (e.data.ctx.draw(), e.setData({
                modalData: {
                    title: "解锁失败",
                    content: "成功添加后即可解锁，请再试一次"
                },
                showModal: e.data.showModalUnlock
            })), t.getIsUnlockChapter(function(t) {
                e.setData({
                    IsUnlock: t.IsUnlock
                });
            }), e.data.XNConfigInfo = u.getXNConfigInfo(), l.callTrail({
                originId: e.data.XNConfigInfo.AppId,
                siteId: "kf_9644"
            });
        }
    },
    groupPonBuyStaus: function() {
        var e = this;
        s.getGroupon(function(t) {
            e.data.hongBaoLaoding = !0;
            var a = t.HasGroupon;
            e.data.buyState && e.setData({
                ifHongb: a,
                GoodsName: t.Groupon.GoodsName,
                openGroupId: t.Groupon.Id,
                groupRecommend: t.Groupon.IsRecommend
            }), e.data.ifHongb && e.setData({
                hbAnimation: !0
            }), e.IfHongbao();
        });
    },
    onReady: function() {},
    onShareAppMessage: function() {
        var e = this, t = "/pages/index/index";
        return t += "?" + d.generateShareOptions(), n.setStorage(d.globalData.ExamType.fastTest), 
        e.setData({
            kdShareSuccess: !0,
            shareCallBack: !0
        }), {
            title: d.globalData.subject.SubjectParentName,
            path: t,
            success: function(e) {},
            fail: function(e) {}
        };
    },
    initProgressData: function(e, t, o) {
        var i = o, r = "";
        e.LastestCourseHistory && e.LastestCourseHistory.AllCourseSiteName && e.LastestCourseHistory.AllCourseSiteName.length > 0 && (r = e.LastestCourseHistory.AllCourseSiteName[e.LastestCourseHistory.AllCourseSiteName.length - 1]);
        var s = e.CourseProgress, n = a.findCourse(e.LastestCourseHistory.ChapterCourseSiteId, t);
        s.TotalCourseDuration <= 0 && (s.TotalCourseDuration = 1);
        var c = {
            totalHour: Math.floor(s.TotalCourseDuration / 3600),
            totalMinute: Math.floor(s.TotalCourseDuration % 3600 / 60),
            todayHour: Math.floor(s.UserTodayCourseDuration / 3600),
            todayMinute: Math.floor(s.UserTodayCourseDuration % 3600 / 60),
            userHour: Math.floor(s.UserTotalCourseDuration / 3600),
            userMinute: Math.floor(s.UserTotalCourseDuration % 3600 / 60),
            userPercent: Math.round(s.UserTotalCourseDuration / s.TotalCourseDuration * 100),
            lastCourseName: r,
            lastCourseId: e.LastestCourseHistory.ChapterCourseId,
            lastCourseSiteId: e.LastestCourseHistory.ChapterCourseSiteId,
            last: null == n ? {} : n
        };
        i.setData({
            progress: c
        }), this.IfHongbao();
    },
    bindCourse: function(e) {
        for (var t = e.currentTarget.dataset.rootid, o = e.currentTarget.dataset.siteid, i = (e.currentTarget.dataset.level, 
        e.currentTarget.dataset.parentid, e.currentTarget.dataset.islockvideo, this), r = i.data.tree, s = !1, n = 0; n < r.length; n++) {
            var c = r[n];
            if (c.rootId == t) for (var l = 0; l < c.subTree.length; l++) {
                var u = c.subTree[l];
                if (u.siteId != o || 3 == u.siteLevel) u.parentId != o ? u.rootId == o && u.rootId != u.siteId && (u.display = !s) : (u.display = !u.display, 
                u.style = a.caculateNodeStyle(u), s = s || u.collspan); else {
                    if (!u.hasChildren) continue;
                    u.collspan = !u.collspan, u.style = a.caculateNodeStyle(u), s = s || u.collspan;
                }
            }
        }
        var d = a.transTree(r);
        i.data.tree = r, i.setData({
            treeData: d
        });
    },
    changeSubject: function(e) {
        wx.navigateTo({
            url: "../selectSubject/selectSubject",
            fail: function(e) {}
        });
    },
    onDrawProgress: function() {
        var t = wx.createCanvasContext("myCanvas");
        this.setData({
            ctx: t
        });
        var a = 1.5 * Math.PI / 100;
        t.beginPath(), t.arc(40, 40, 38, .75 * Math.PI, .75 * Math.PI + 100 * a, !1), t.setStrokeStyle("#eeeeee"), 
        t.setLineWidth(2), t.stroke(), t.beginPath(), t.arc(40, 40, 38, .75 * Math.PI, .75 * Math.PI + this.data.progress.userPercent * a, !1), 
        t.setStrokeStyle(e.UIConfig.color), t.setLineWidth(2), t.stroke(), t.draw();
    },
    bindvideo: function(e) {},
    formSubmitLastVideo: function(e) {
        var t = this, a = parseInt(e.detail.target.dataset.courseid), o = parseInt(e.detail.target.dataset.siteid), i = e.detail.target.dataset.videoid, s = parseInt(e.detail.target.dataset.size), n = e.detail.target.dataset.needbuy, c = e.detail.target.dataset.name, l = e.detail.target.dataset.lecture_image, u = e.detail.target.dataset.lecture_image_count, g = e.detail.formId, h = e.detail.target.dataset.rootId, p = e.detail.target.dataset.islockvideo;
        if (o > 0 || n) {
            var f = "../course/course?courseSiteId=" + o;
            if (f += "&courseId=" + a, f += "&videoId=" + i, f += "&courseSize=" + s, f += "&courseName=" + c, 
            f += "&lectureImage=" + l, f += "&lectureImageCount=" + u, f += "&needBuy=" + n, 
            f += "&formId=" + g, f += "&rootSiteId=" + h, 0 == r.availabilityQuantity(d.globalData.VideoType.chapterVideo)) d.gotoLogin(f, 2); else if (n) {
                var I = "../../pages/chaterVideoOrder/chaterVideoOrder?rootSiteId=" + h;
                wx.navigateTo({
                    url: I
                });
            } else p && !t.data.IsUnlock ? (t.setData({
                deblocking: !0
            }), t.data.ctx.draw()) : (wx.navigateTo({
                url: f
            }), t.setData({
                deblocking: !1
            }), setTimeout(function() {
                this.onDrawProgress();
            }.bind(this), 500));
        }
    },
    formSubmitVideo: function(e) {
        var t = this, a = e.detail.target.dataset.siteid, o = e.detail.target.dataset.courseid, i = e.detail.target.dataset.vid, s = e.detail.target.dataset.size, n = e.detail.target.dataset.needbuy, c = e.detail.target.dataset.name, l = e.detail.target.dataset.lecture_image, u = e.detail.target.dataset.lecture_image_count, g = e.detail.target.dataset.lectureUrl, h = e.detail.formId, p = (e.detail.target.dataset.sitelevel, 
        e.detail.target.dataset.rootSiteid), f = e.detail.target.dataset.realcourseprice, I = e.detail.target.dataset.learnusercount, m = e.detail.target.dataset.islockvideo;
        if (d.globalData.SystemInfo.iOS && n) return !1;
        if (!m || t.data.IsUnlock) {
            if (i || n) {
                d.globalData.tempData.star = 0, t.setData({
                    lastStar: 0
                });
                D = "../course/course";
                if (D += "?courseSiteId=" + a, D += "&courseId=" + o, D += "&videoId=" + i, D += "&courseSize=" + s, 
                D += "&courseName=" + c, D += "&lectureImage=" + l, D += "&lectureImageCount=" + u, 
                D += "&needBuy=" + n, D += "&lectureUrl=" + g, D += "&formId=" + h, D += "&realCoursePrice=" + f, 
                D += "&learnUserCount=" + I, D += "&rootSiteId=" + p, 0 == r.availabilityQuantity(d.globalData.VideoType.chapterVideo)) d.gotoLogin(D, 2); else if (n) {
                    var b = "../../pages/chaterVideoOrder/chaterVideoOrder?rootSiteId=" + p;
                    this.data.hasLogin ? this.data.buyState ? wx.navigateTo({
                        url: b
                    }) : wx.showModal({
                        content: "请下载万题库APP学习",
                        showCancel: !1
                    }) : d.gotoLogin(b, 2);
                } else wx.navigateTo({
                    url: D
                });
            }
        } else if (d.globalData.userData.HasLogin) wx.navigateTo({
            url: "../../pages/couresUnlock/couresUnlock"
        }); else {
            var D = "";
            wx.showModal({
                content: "请登陆后解锁免费课程",
                cancelColor: "#7a7a7a",
                confirmColor: "#6fce29",
                success: function(e) {
                    e.confirm ? d.gotoLogin(D, 4) : e.cancel && console.log("用户点击取消");
                }
            }), t.data.showLockModule && t.data.ctx.draw();
        }
    },
    jumpHomeList: function(e) {
        setTimeout(function() {
            1 == e ? wx.navigateTo({
                url: "../../pages/practicePapers/practicePapers"
            }) : 4 == e ? wx.navigateTo({
                url: "../../pages/practiceChapter/practiceChapter"
            }) : 5 == e && wx.navigateTo({
                url: "../../pages/practiceSolidify/practiceSolidify"
            });
        }, 800);
    },
    formSubmit: function(e) {
        var t = this, a = e.detail.target.dataset.typeId, o = e.detail.formId, i = "";
        switch (a) {
          case 3:
            if (i = "../../pages/papers/papers?examType=" + (p = d.globalData.ExamType.fastTest) + "&formId=" + o, 
            0 == r.availabilityQuantity(p)) return void d.gotoLogin(i, 1);
            break;

          case 2:
            i = "../../pages/practiceChapter/practiceChapter";
            break;

          case 0:
            i = "../../pages/practicePapers/practicePapers";
            break;

          case 10:
            i = "../../pages/practiceSolidify/practiceSolidify";
            break;

          case 9:
            i = "../../pages/practiceCollection/practiceCollection?examType=" + (p = d.globalData.ExamType.wrongSee);
            break;

          case 17:
            i = "../../pages/practiceCollection/practiceCollection?examType=" + (p = d.globalData.ExamType.collectionSee);
            break;

          case 18:
            i = "../../pages/practiceHistory/practiceHistory";
            break;

          case 16:
            i = "../../pages/vipPractice/finePapers/finePapers?examType=" + d.globalData.ExamType.fineTest + "&formId=" + o;
            break;

          case 7:
            i = "../../pages/vipPractice/burningPapers/burningPapers";
            break;

          case 12:
            i = "../../pages/vipPractice/finePapers/finePapers?examType=" + d.globalData.ExamType.denseTest + "&formId=" + o;
            break;

          case 6:
            i = "../../pages/vipPractice/textbookPapers/textbookPapers";
            break;

          case 8:
            i = "../../pages/vipPractice/highFrePapers/highFrePapers";
            break;

          case 20:
            d.aldstat.sendEvent("mock_home");
            var s = t.data.examFigh.HadEntry, n = t.data.examFigh.HadSubmitPager, c = t.data.examFigh.ExamFightID, l = t.data.examFigh.PaperId, u = t.data.examFigh.BeginDate, g = t.data.examFigh.EndDate, h = Date.parse(new Date()) / 1e3;
            if (s) if (n) i = "../../packageMock/pages/mockDetail/mockDetail?examFightId=" + c + "&paperId=" + l + "&formId=" + o + "&currentindex=1"; else if (u - h < 600 && u - h > 0) i = "../../packageMock/pages/mockWait/mockWait?ExamFightID=" + c + "&BeginDate=" + u + "&EndDate=" + g + "&paperId=" + l + "&formId=" + o; else if (h - u < 1800 && h > u && h < g) var p = d.globalData.ExamType.mockTest, i = "../../pages/papers/papers?examType=" + p + "&paperId=" + l + "&formId=" + o + "&questionId=" + d.globalData.MockPaperCache.questionId + "&mockId=" + c + "&beginTime=" + u + "&endTime=" + g; else i = "../../packageMock/pages/mockDetail/mockDetail?examFightId=" + c + "&paperId=" + l + "&formId=" + o + "&currentindex=1"; else i = "../../packageMock/pages/mockDetail/mockDetail?examFightId=" + c + "&paperId=" + l + "&formId=" + o + "&currentindex=1";
        }
        wx.navigateTo({
            url: i
        });
    },
    OnNoLoaginJs: function() {
        d.gotoLogin(null, 1);
    },
    onPageScroll: function() {
        var e = this;
        this.data.hbanmationState || this.setData({
            hbanmationState: !0
        }), this.data.scrollToHideAward && clearTimeout(this.data.scrollToHideAward);
        var t = setTimeout(function() {
            e.setData({
                hbanmationState: !1
            });
        }, 300);
        this.setData({
            scrollToHideAward: t
        });
    },
    IfHongbao: function() {
        this.onDrawProgress(), (this.data.ifHongb && !this.data.ifCloseHb && this.data.sharePractice && this.data.showModalUnlock || this.data.showModalUnlock) && this.data.ctx.draw();
    },
    clickHongbaoBackground: function() {},
    closeBtn: function() {
        this.setData({
            ifCloseHb: !0
        }), wx.setStorage({
            key: "ifCloseHb",
            data: !0
        }), setTimeout(function() {
            this.onDrawProgress();
        }.bind(this), 500);
    },
    formSubmitHongBao: function(e) {
        this.closeBtn();
        var t = e.detail.formId, a = this.data.openGroupId;
        wx.navigateTo({
            url: "../group/groupBuy/groupBuy?formId=" + t + "&grouponid=" + a
        });
    },
    onbtnShera: function() {},
    shareBoxBackground: function() {
        var e = this;
        this.setData({
            sharePractice: !1
        }), setTimeout(function() {
            e.IfHongbao();
        }, 100);
    },
    groupSlice: function(e, t) {
        for (var a = 0, o = []; a < e.length; ) o.push(e.slice(a, a += t));
        return o;
    },
    deblockingBackground: function() {
        this.setData({
            deblocking: !1
        }), setTimeout(function() {
            this.onDrawProgress();
        }.bind(this), 500);
    },
    hideModal: function() {
        this.setData({
            showModal: !1,
            showModalUnlock: !1
        }), setTimeout(function() {
            this.onDrawProgress();
        }.bind(this), 500);
    },
    getCheckInCircle: function() {
        var e = this;
        c.getRecommendCheckInCircle({}, function(t) {
            console.log(t, "res"), 1 == t.MsgCode && e.setData({
                recommendCardData: t
            });
        });
    },
    onInotView: function() {
        var e = this.data.recommendCardData, t = "";
        if (!d.globalData.userData.HasLogin) return this.data.userClickGoLogin = !0, void d.gotoLogin("");
        t = e.IsJoin || e.IsCheckIn ? "/packageClock/pages/clockHome/clockHome?CircleID=" + e.CircleID + "&Type=" + e.CheckInCircleType + "&isShowModal=0&isCreatePoster=0" : "/packageClock/pages/clockProfile/clockProfile?CircleID=" + e.CircleID + "&Type=" + e.CheckInCircleType, 
        wx.navigateTo({
            url: t
        });
    }
});