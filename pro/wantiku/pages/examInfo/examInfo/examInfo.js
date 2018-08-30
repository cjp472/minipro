var e = getApp(), t = require("../../../biz/examInfo.js"), a = require("../../../utils/util.js"), n = require("../../../config.js"), i = require("../../../utils/getSubjectParentName.js"), o = require("../../../biz/groupBuy.js"), r = require("../../../biz/vipCourse.js");

Page({
    data: {
        pageIndex: 0,
        navList: [ {
            name: "报名",
            pageIndex: 0
        }, {
            name: "考试安排",
            pageIndex: 1
        }, {
            name: "成绩查询",
            pageIndex: 2
        }, {
            name: "准考证",
            pageIndex: 3
        } ],
        tableWidth: 2e3,
        tableWidth1: 2e3,
        province: "",
        examTime: "",
        subjectName: "",
        signUpData: {},
        examArrangementData: {},
        examScoreData: {},
        examPermitData: {},
        signUpDataLoading: !1,
        examArrangementLoading: !1,
        examScoreLoading: !1,
        examPermitLoading: !1,
        subjectInfo: {},
        bStartTime: !0,
        bEndTime: !0,
        bExamContent: !0,
        bExamQuestionType: !0,
        bQuestionAmount: !0,
        bExamMethod: !0,
        bPrice: !0,
        bPriceTxt: !0,
        isNationwide: !1,
        IsShare: 0,
        theme: n.UIConfig.Theme,
        iPhoneX: e.globalData.SystemInfo.iPhoneX,
        loading: !0,
        SignUpDataPaperState: !0,
        ExamArrangementPaperState: !0,
        ExamScorePaperState: !0,
        ExamPermitPaperState: !0,
        buyState: n.buyState
    },
    onLoad: function(t) {
        var a = this, i = this.getUrlParam(t);
        if (console.log("-----------"), console.log(i), console.log("-----------"), -1 == i.SubjectParentId || -1 == i.SubjectId) return console.log("reLaunch"), 
        void wx.reLaunch({
            url: "../../../pages/chooseSchoolType/chooseSchoolType?backTab=4&pageIndex=" + i.pageIndex
        });
        e.checkContextWithShareOptions(i, function() {
            void 0 != i.isCode && r.getSubjectName(i.SubjectId, function(t) {
                console.log(t.Data), e.globalData.subject.SubjectName = t.Data, wx.setStorage({
                    key: n.AppStorage.subject,
                    data: e.globalData.subject
                });
            }), a.setData({
                subjectName: e.globalData.subject.SubjectParentName
            }), i.pageIndex && a.setData({
                pageIndex: i.pageIndex
            });
            var c = e.getSubjectInfo();
            a.setData({
                subjectInfo: c,
                IsShare: i.IsShare
            }), wx.showLoading({
                title: "正在加载数据",
                mask: !1
            }), a.initNationwide(function(t) {
                try {
                    var n = wx.getStorageSync("province");
                    t && (n = "全国统一"), console.log(n), "" != n ? (a.setData({
                        province: n.replace("市", "")
                    }), e.globalData.province = n, a.initSignUpData(n), a.initExamArrangement(n), a.initExamScore(n), 
                    a.initExamPermit(n)) : a.initProvince();
                } catch (e) {
                    a.initProvince();
                }
            }), t.IsShare && o.getGroupon(function(e) {
                console.log(e), a.setData({
                    ifHongb: e.HasGroupon,
                    openGroupId: e.Groupon.Id
                });
            });
        });
    },
    initProvince: function() {
        var t = this;
        a.getLocation(function(a) {
            console.log("回掉成功位置：", a), t.setData({
                province: a.replace("市", "")
            }), e.globalData.province = a, t.initSignUpData(a), t.initExamArrangement(a), t.initExamScore(a), 
            t.initExamPermit(a);
        }, function() {
            console.log("失败定位"), t.setData({
                loading: !1
            }), wx.navigateTo({
                url: "/pages/examInfo/swiperCity/swiperCity?backTab=1"
            });
        });
    },
    initSignUpData: function(e) {
        var a = this;
        this.data.contentError;
        t.getExamRegister(e, function(e) {
            a.setData({
                signUpData: e,
                examDate: e.examDate,
                signUpDataLoading: !0,
                loading: !1
            }), wx.hideLoading();
        }, function() {
            console.log("error"), a.setData({
                SignUpDataPaperState: !1
            });
        });
    },
    initExamArrangement: function(e) {
        var a = this;
        this.data.contentError;
        t.getExamArrangement(e, function(e) {
            a.setData({
                examArrangementData: e,
                examDate: e.examDate,
                examArrangementLoading: !0,
                loading: !1
            }), a.initTableBoxElement(a.data.examArrangementData.subject), setTimeout(function() {
                a.queryMultipleNodes();
            }, 300);
        }, function() {
            a.setData({
                ExamArrangementPaperState: !1
            });
        }), wx.hideLoading();
    },
    initExamScore: function(e) {
        var a = this;
        this.data.contentError;
        t.getExamScore(e, function(e) {
            a.setData({
                examScoreData: e,
                examDate: e.examDate,
                examScoreLoading: !0,
                loading: !1
            }), wx.hideLoading();
        }, function() {
            a.setData({
                ExamScorePaperState: !1
            });
        });
    },
    initExamPermit: function(e) {
        var a = this;
        this.data.contentError;
        t.getExamPermit(e, function(e) {
            a.setData({
                examPermitData: e,
                examDate: e.examDate,
                examPermitLoading: !0,
                loading: !1
            }), wx.hideLoading();
        }, function() {
            a.setData({
                ExamPermitPaperState: !1
            });
        });
    },
    initTableBoxElement: function(e) {
        this.setData({
            bStartTime: e.some(this.checkStartTime),
            bEndTime: e.some(this.checkStartTime),
            bExamContent: e.some(this.checkExamContent),
            bExamQuestionType: e.some(this.checkExamQuestionType),
            bQuestionAmount: e.some(this.checkQuestionAmount),
            bExamMethod: e.some(this.checkExamMethod),
            bPrice: e.some(this.checkPrice),
            bPriceTxt: e.some(this.checkPriceTxt)
        });
    },
    checkStartTime: function(e) {
        return "" != e.startTime && null != e.startTime;
    },
    checkEndTime: function(e) {
        return "" != e.endTime && null != e.endTime;
    },
    checkExamContent: function(e) {
        return "" != e.examContent && null != e.examContent;
    },
    checkExamQuestionType: function(e) {
        return "" != e.examQuestionType && null != e.examQuestionType;
    },
    checkQuestionAmount: function(e) {
        return "" != e.questionAmount && null != e.questionAmount;
    },
    checkExamMethod: function(e) {
        return "" != e.examMethod && null != e.examMethod;
    },
    checkPrice: function(e) {
        return "" != e.price && null != e.price;
    },
    checkPriceTxt: function(e) {
        return "" != e.price_txt && null != e.price_txt;
    },
    changePage: function(e) {
        var t = e.currentTarget.dataset.navPageIndex;
        this.setData({
            pageIndex: t
        });
    },
    changeSwiper: function(e) {
        var t = e.detail.current;
        this.setData({
            pageIndex: t
        });
    },
    onReady: function() {},
    onShow: function() {
        if (!this.data.loading && this.data.province != e.globalData.province.replace("市", "") && e.globalData.province) {
            console.log("刷新切换"), wx.showLoading({
                title: "正在加载",
                mask: !0
            });
            var t = e.getSubjectInfo();
            this.setData({
                subjectInfo: t
            }), this.data.province = e.globalData.province, this.setData({
                province: this.data.province.replace("市", "")
            }), this.initSignUpData(e.globalData.province), this.initExamArrangement(e.globalData.province), 
            this.initExamScore(e.globalData.province), this.initExamPermit(e.globalData.province);
        }
    },
    initNationwide: function(e) {
        var a = this;
        t.isNationwide(function(t) {
            a.setData({
                isNationwide: t.result
            }), e(t.result);
        });
    },
    formSubmitHongBao: function(e) {
        var t = e.detail.formId, a = this.data.openGroupId;
        wx.navigateTo({
            url: "/pages/group/groupBuy/groupBuy?formId=" + t + "&grouponid=" + a
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onEnrollSummaryJs: function() {
        this.clipboardData(this.data.signUpData.enroll_way);
    },
    onEnrollTitleJs: function() {
        this.clipboardData(this.data.signUpData.enroll_title_url);
    },
    onDetailExamTitleJs: function() {
        this.clipboardData(this.data.examArrangementData.examSyllabus_url);
    },
    onInquireTitleJs: function() {
        this.clipboardData(this.data.examScoreData.inquire_title_url);
    },
    onPrintimeTitleJs: function() {
        this.clipboardData(this.data.examPermitData.printime_title_url);
    },
    clipboardData: function(e) {
        wx.setClipboardData({
            data: e,
            success: function(e) {
                wx.showToast({
                    title: "已复制链接",
                    icon: "success",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    getUrlParam: function(e) {
        return void 0 != e.isCode ? {
            IsShare: e.IsShare,
            SubjectParentId: e.pId,
            SubjectLevel: e.level,
            SubjectId: e.SubId,
            SubjectParentName: i.getSubParentName(e.pId, e.level),
            UserAreaId: e.uId,
            InstitutionAreaId: e.aId,
            pageIndex: e.pIx,
            isCode: e.isCode
        } : e;
    },
    getShareAppUrl: function() {
        var t = this, a = "pages/examInfo/examInfo/examInfo";
        return a += "?" + e.generateShareOptions() + "&pageIndex=" + t.data.pageIndex, console.log(a), 
        a;
    },
    onShareAppMessage: function() {
        var t = this.getShareAppUrl();
        return {
            title: e.globalData.subject.SubjectParentName + "报名查分",
            path: t,
            success: function(e) {},
            fail: function(e) {}
        };
    },
    onVipCourseJs: function() {
        wx.switchTab({
            url: "../../../pages/vipCourses/vipCourses",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    onHomeJs: function() {
        wx.switchTab({
            url: "../../../pages/index/index",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    onMoreExamJs: function() {
        wx.navigateTo({
            url: "../../../pages/chooseSchoolType/chooseSchoolType?backTab=3",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    onProvinceJs: function() {
        this.data.isNationwide || wx.navigateTo({
            url: "/pages/examInfo/swiperCity/swiperCity?backTab=1",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    queryMultipleNodes: function() {
        var e = this;
        wx.createSelectorQuery().selectAll("#table,.fixed-table").boundingClientRect().exec(function(t) {
            if (console.log(t), t[0].length > 0) {
                var a = t[0][1].width + t[0][0].width - 1, n = t[0][0].width;
                e.setData({
                    tableWidth: a,
                    paddingLeft: n
                });
            }
            if (t[0].length > 2) {
                var i = t[0][3].width + t[0][2].width - 1, o = t[0][2].width;
                e.setData({
                    tableWidth1: i,
                    paddingLeft1: o
                });
            }
        });
    },
    goBackIndex: function() {
        wx.switchTab({
            url: "../../../pages/index/index"
        });
    }
});