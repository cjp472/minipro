var a = require("/papersClass/PapersAdpter.js"), t = require("../../biz/practice.js"), e = require("../../utils/util.js"), s = require("../../utils/tourist.js"), i = require("../../utils/wxpares.js"), r = require("../../config.js"), o = getApp();

Page({
    papersAdpter: {},
    data: {
        theme: r.UIConfig.Theme,
        papersInfoCurrent: 0,
        current: 0,
        orderNumber: 0,
        PapersQuantity: 6,
        oldCurrent: 0,
        PapersInfoList: [],
        iPhoneX: o.globalData.SystemInfo.iPhoneX,
        materialEntityList: {},
        trainAnswerBtn: {
            10: "radius",
            20: "",
            35: "no-directional"
        },
        materialScroll: !0,
        IsFavor: 0,
        strTimeCounter: "00:00",
        timeCounter: 0,
        stopTimeCounter: !1,
        stopTimeExamState: "",
        cartState: !1,
        cartInfoList: [],
        duration: 200,
        fastTestExplain: !1,
        firstTestDoPaper: !1,
        firstDuoxuanTestDopaper: !1,
        questionId: 0,
        mockId: 0,
        examType: 0,
        paperId: 0,
        oldTimer: 0,
        hasAudio: !1,
        audio: {
            src: "",
            percent: 0,
            AudioStart: "00:00",
            AudioEnd: "00:00",
            play: !1
        },
        examStateMsg: "",
        formId: 0,
        highFreType: 0,
        examFrequency: 0,
        isReset: 0,
        newProgress: "",
        currentPosition: "",
        isRealFavor: !0,
        beginTime: 0,
        endTime: 0
    },
    onLoad: function(a) {
        console.log(a);
        var i = this;
        this.data.examType = a.examType, this.data.paperId = a.paperId, this.data.formId = a.formId, 
        a.highFreType && (this.data.highFreType = a.highFreType), a.examFrequency && (this.data.examFrequency = a.examFrequency), 
        a.isReset && (this.data.isReset = a.isReset), this.data.questionId = a.questionId, 
        this.data.mockId = a.mockId, this.data.beginTime = a.beginTime, this.data.endTime = a.endTime, 
        wx.setNavigationBarTitle({
            title: e.getTitleByExamType(this.data.examType)
        }), wx.showLoading({
            title: "正在加载"
        }), i.data.examType == o.globalData.ExamType.fastTest ? t.getFastTestData(function(a) {
            console.log(a), i.initDataView(a);
        }) : i.data.examType == o.globalData.ExamType.zhentiTest ? t.getZhentiTestData(i.data.paperId, 0, function(a) {
            i.initDataView(a);
        }) : i.data.examType == o.globalData.ExamType.mockTest ? t.getMockTestData(i.data.paperId, function(a) {
            i.initDataView(a);
        }) : i.data.examType == o.globalData.ExamType.burningTest || i.data.examType == o.globalData.ExamType.fineTest || i.data.examType == o.globalData.ExamType.denseTest ? t.getBurningTestData(i.data.paperId, 0, function(a) {
            i.initDataView(a);
        }) : i.data.examType == o.globalData.ExamType.chapterTest ? t.getChapterTestData(i.data.paperId, function(a) {
            i.initDataView(a);
        }) : i.data.examType == o.globalData.ExamType.solidifyTest ? t.getSolidifyTestData(i.data.paperId, 0, function(a) {
            i.initDataView(a);
        }) : i.data.examType == o.globalData.ExamType.textbookTest ? t.getTextbookTestData(i.data.paperId, function(a) {
            console.log(a), i.initDataView(a);
        }) : i.data.examType == o.globalData.ExamType.highFreTest && (0 == i.data.highFreType ? t.getHighFreData(i.data.examFrequency, i.data.isReset, function(a) {
            console.log(a), i.initDataView(a);
        }) : t.getErroFreData(i.data.examFrequency, i.data.isReset, function(a) {
            console.log(a), i.initDataView(a);
        })), s.addTouristQuantity(this.data.examType), this.practiceEventMsg();
    },
    initDataView: function(t) {
        var e = this;
        if (e.papersAdpter = new a.PapersAdpter(t, e.data.examType), this.data.examType != o.globalData.ExamType.mockTest && this.data.examType != o.globalData.ExamType.solidifyTest && this.data.examType != o.globalData.ExamType.zhentiTest && this.data.examType != o.globalData.ExamType.burningTest && this.data.examType != o.globalData.ExamType.denseTest && this.data.examType != o.globalData.ExamType.fineTest || (this.data.examType == o.globalData.ExamType.mockTest ? e.papersAdpter.initMockPapersData(e.data.mockId) : e.papersAdpter.initMockPapersData(e.data.paperId), 
        this.data.questionId = e.papersAdpter.checkQustionId(this.data.questionId)), this.data.questionId && 0 != this.data.questionId) this.cartQuestionToNubmer(this.data.questionId); else {
            var s = e.wxParseData(e.papersAdpter.getPersInfoListByQuantity(this.data.PapersQuantity));
            e.setData({
                PapersInfoList: s
            });
        }
        e.wxParseData(e.papersAdpter.materialEntityList);
        e.data.currentPaperInfo = this.data.PapersInfoList[0];
        try {
            wx.getStorageSync("FastTestExplain") || e.data.examType != o.globalData.ExamType.fastTest && e.data.examType != o.globalData.ExamType.chapterTest || (e.data.fastTestExplain = !0);
        } catch (a) {}
        console.log(e.papersAdpter.OrderNumber, "orderNuber"), e.setData({
            orderNumber: e.papersAdpter.OrderNumber,
            materialEntityList: e.papersAdpter.materialEntityList,
            IsFavor: e.data.currentPaperInfo.IsFavor,
            fastTestExplain: e.data.fastTestExplain,
            firstTestDoPaper: e.data.firstTestDoPaper,
            hasAudio: !(!e.data.currentPaperInfo.AudioUrl || "" == e.data.currentPaperInfo.AudioUrl),
            oldTimer: new Date().getTime()
        }), e.initAudio(), e.data.examType == o.globalData.ExamType.mockTest ? e.startMockTimer() : e.startExamTimer(), 
        wx.hideLoading();
    },
    startMockTimer: function() {
        this.setData({
            isRealFavor: !1
        });
        var a = new Date().getTime() / 1e3;
        this.data.timeCounter = this.data.endTime - a;
        var t = this, s = setInterval(function() {
            if (t.data.timeCounter < 0) return console.log("归0"), t.autoSubmitPapers(!0), void clearInterval(t.data.intervalNumber);
            t.setData({
                timeCounter: t.data.timeCounter
            }), t.setData({
                strTimeCounter: e.fortmatPapersTime(t.data.timeCounter--)
            });
        }.bind(this), 1e3);
        t.data.intervalNumber = s;
    },
    startExamTimer: function() {
        var a = this;
        setTimeout(function() {
            this.data.stopTimeCounter || (a.setData({
                timeCounter: a.data.timeCounter
            }), this.setData({
                strTimeCounter: e.fortmatPapersTime(this.data.timeCounter++)
            }), wx.getBackgroundAudioPlayerState({
                success: function(t) {
                    t.status, t.dataUrl;
                    var e = t.duration;
                    t.downloadPercent;
                    e && a.setData({
                        durationAudioPlaye: e
                    });
                    var s = t.currentPosition;
                    s && a.Audiobindtimeupdate(s, e);
                }
            })), this.startExamTimer();
        }.bind(this), 1e3);
    },
    initAudio: function() {
        var a = this;
        if (a.data.hasAudio) {
            if (a.data.currentPaperInfo.AudioUrl == a.data.audio.src) return void console.log("同一个听力");
            wx.stopBackgroundAudio();
            t = {
                src: a.data.currentPaperInfo.AudioUrl,
                percent: 0,
                AudioStart: "00:00",
                AudioEnd: "00:00",
                play: !1
            };
            a.setData({
                audio: t
            }), this.onPlayAudio();
        } else {
            wx.stopBackgroundAudio();
            var t = {
                src: "",
                play: !1
            };
            a.setData({
                audio: t
            });
        }
    },
    wxParseData: function(a) {
        for (var t in a) {
            var s = a[t];
            s.FormatContentWxpares = i.getSources(s.FormatContent);
            var r = s.FormatContentWxpares[s.FormatContentWxpares.length - 1].content;
            s.FormatContentWxpares[s.FormatContentWxpares.length - 1].content = r.substring(0, r.length - 1), 
            s.strQuestionType = this.papersAdpter.getQuestionType(s.QuestionTypeId);
            for (var o in s.QuestionContentKeyValue) {
                var n = s.QuestionContentKeyValue[o];
                n.QuestionValueWxpares = i.getSources(n.Value);
            }
            var p = [];
            for (var d in s.FormatImages) {
                var u = s.FormatImages[d], c = e.getSrcInfoByImages(u);
                p.push(c);
            }
            s.ForatImagesWxpares = p;
        }
        return a;
    },
    onSwiperBindChange: function(a) {
        var t = new Date().getTime();
        this.calculaQuestionTime(this.data.oldCurrent, t);
        var e = a.detail.current;
        this.data.current = e;
        var s = this.data.PapersInfoList[e];
        this.data.currentPaperInfo = s;
        try {
            var i = wx.getStorageSync("firstDuoxuanTestDopaper");
            wx.getStorageSync("firstTestDoPaper") ? i || 20 != this.data.currentPaperInfo.QuestionTypeId || this.data.currentPaperInfo.isExplain || (this.data.firstDuoxuanTestDopaper = !0) : this.data.firstTestDoPaper = !0, 
            this.setData({
                firstDuoxuanTestDopaper: this.data.firstDuoxuanTestDopaper,
                firstTestDoPaper: this.data.firstTestDoPaper
            });
        } catch (a) {}
        this.data.papersInfoCurrent == this.data.current && this.setData({
            duration: 200
        });
        var r = !(!this.data.currentPaperInfo.AudioUrl || "" == this.data.currentPaperInfo.AudioUrl);
        if (this.setData({
            hasAudio: r
        }), this.initAudio(), setTimeout(function() {
            this.setData({
                IsFavor: s.IsFavor
            });
        }.bind(this), 500), this.data.currentPaperInfo.isLastItem) {
            var o = this.papersAdpter.getStopTimeExamState();
            this.setData({
                examStateMsg: o
            });
        }
        e - this.data.oldCurrent >= 0 ? this.data.PapersInfoList[e + 1] || (console.log("右滑动-到加载下面数据："), 
        this.onPaperChange(e, !0)) : this.data.PapersInfoList[e - 1] || (console.log("左滑动-到加载上面数据"), 
        this.onPaperChange(e, !1)), this.data.oldTimer = t, this.data.oldCurrent = e;
    },
    calculaQuestionTime: function(a, t) {
        var e = t - this.data.oldTimer, s = this.data.PapersInfoList[a];
        s.QuestionTime = e, this.synchronPapersData(s);
    },
    onPaperChange: function(a, t) {
        this.setData({
            duration: 0
        });
        var e, s = this.papersAdpter.getPapersListPostion(this.data.PapersInfoList[a].RealQuestionId, t, this.data.PapersQuantity), i = this.wxParseData(s), r = this.data.PapersInfoList[a];
        e = t ? this.data.PapersInfoList.concat(i) : i.concat(this.data.PapersInfoList);
        var o = this.papersAdpter.getBufferDataList(e, t, this.data.PapersQuantity), n = a, p = 0;
        e.length > this.papersAdpter.bufferData && (n = this.papersAdpter.getBufferDataListPostion(r.RealQuestionId, o), 
        p = 160), setTimeout(function() {
            this.setData({
                PapersInfoList: o,
                papersInfoCurrent: n
            });
        }.bind(this), p);
    },
    onQuestionContentKeyValue: function(a) {
        var t = this.data.PapersInfoList[this.data.current];
        this.papersAdpter.getLastQuestionState(t) && this.calculaQuestionTime(this.data.current, new Date().getTime());
        var e = t.QuestionContentKeyValue, s = e[a.currentTarget.dataset.index], i = !1;
        10 != t.QuestionTypeId || s.select || (this.clearQuestionContentKeyValueSelect(e), 
        this.papersAdpter.getLastQuestionState(t) || (i = !0)), s.select = !s.select, i && (this.data.current = parseInt(this.data.current) + 1), 
        this.setData({
            PapersInfoList: this.data.PapersInfoList
        }), setTimeout(function() {
            this.setData({
                papersInfoCurrent: this.data.current
            });
        }.bind(this), 200), this.synchronPapersData(t);
    },
    clearQuestionContentKeyValueSelect: function(a) {
        for (var t in a) a[t].select = !1;
    },
    synchronPapersData: function(a) {
        this.papersAdpter.synchronPapersData(a);
    },
    onQustionFavor: function() {
        var a = this.data.PapersInfoList[this.data.current];
        a.isExplain || (0 == a.IsFavor ? a.IsFavor = 1 : a.IsFavor = 0, this.setData({
            IsFavor: a.IsFavor
        }), this.synchronPapersData(a), t.favorByRealQuestionId(a.RealQuestionId, a.IsFavor, function(a) {
            console.log(a);
        }));
    },
    OncartStateJs: function() {
        this.data.cartInfoList = this.papersAdpter.getCartInfoList(), this.setData({
            cartState: !this.data.cartState,
            cartInfoList: this.data.cartInfoList
        });
    },
    onCartNumberJs: function(a) {
        var t = a.currentTarget.dataset.realQuestionid;
        this.cartQuestionToNubmer(t), this.setData({
            cartState: !this.data.cartState
        }), this.initAudio();
    },
    cartQuestionToNubmer: function(a) {
        var t = this.papersAdpter.getPapersListPostion(a, !1, 4), e = this.papersAdpter.getPapersListPostion(a, !0, 5), s = this.papersAdpter.getPaperInfoById(a);
        t.push(s), t = this.wxParseData(t), e = this.wxParseData(e);
        var i = t.concat(e), r = this.papersAdpter.getBufferDataListPostion(a, i), o = !(!s.AudioUrl || "" == s.AudioUrl);
        this.data.current = r, console.log("cartPostion : " + r), this.setData({
            PapersInfoList: i,
            papersInfoCurrent: r,
            hasAudio: o
        });
    },
    OnContinueExamJs: function() {
        this.setData({
            cartState: !this.data.cartState
        });
    },
    autoSubmitPapers: function(a) {
        var e = this.papersAdpter.getAnsersJson(), s = this.papersAdpter.PaperId, i = this.data.mockId, r = this;
        wx.showLoading({
            title: "系统交卷中",
            mask: !1
        }), t.submitMockPapers(s, e, i, function(t) {
            if (console.log(t), wx.hideLoading(), 1 == t.S) {
                var e = "/packageMock/pages/mockDetail/mockDetail?examFightId=" + r.data.mockId + "&currentindex=0";
                a ? wx.showModal({
                    title: "考试结束",
                    content: "试卷已经自动上交,快去看看你的成绩吧",
                    confirmText: "知道了",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && wx.redirectTo({
                            url: e
                        });
                    }
                }) : wx.redirectTo({
                    url: e
                });
            } else wx.showModal({
                content: "交卷失败,请检查当前网络",
                confirmText: "忍痛离场",
                cancelText: "再次交卷",
                showCancel: !1,
                success: function(t) {
                    t.confirm ? wx.navigateBack({
                        delta: 1
                    }) : t.cancel && this.autoSubmitPapers(a);
                }
            });
        });
    },
    OnSubmitPapersJs: function() {
        this.data.examType == o.globalData.ExamType.mockTest ? this.autoSubmitPapers(!1) : this.OnSubmitExamJs();
    },
    OnSubmitExamJs: function() {
        var a = this.papersAdpter.getAnsersJson(), e = this.papersAdpter.PaperId, s = this;
        wx.showLoading({
            title: "正在提交试卷",
            mask: !1
        }), t.submitPapers(e, a, function(a) {
            if (console.log(a), wx.hideLoading(), 1 == a.S) {
                var t = a.UserExamPaperId, i = "examType=" + s.data.examType + "&paperId=" + e + "&userExamPaperId=" + t + "&highFreType=" + s.data.highFreType + "&examFrequency=" + s.data.examFrequency, r = "";
                r = s.data.examType == o.globalData.ExamType.fastTest || s.data.examType == o.globalData.ExamType.highFreTest || s.data.examType == o.globalData.ExamType.chapterTest || s.data.examType == o.globalData.ExamType.textbookTest ? "../../pages/capacityReport/capacityReport?" + i : "../../pages/papersReport/papersReport?" + i, 
                s.clearPaperCache(), wx.redirectTo({
                    url: r
                });
            } else wx.showToast({
                title: "试卷提交失败",
                image: "/images/icon/icon_07.png",
                duration: 2e3,
                mask: !0
            });
        });
    },
    onStopStateJs: function() {
        if (this.data.examType != o.globalData.ExamType.mockTest) this.data.stopTimeExamState = this.papersAdpter.getStopTimeExamState(), 
        this.setData({
            stopTimeCounter: !this.data.stopTimeCounter,
            stopTimeExamState: this.data.stopTimeExamState
        }); else {
            var a = new Date().getTime() / 1e3;
            console.log(this.data.beginTime);
            var t = "考试时长" + e.fortmatPapersTime(this.data.endTime - this.data.beginTime) + "，已经进行" + e.fortmatPapersTime(a - this.data.beginTime) + "。考试结束后将自动交卷";
            wx.showModal({
                content: t,
                showCancel: !1,
                confirmText: "知道了"
            });
        }
    },
    materialMoveStart: function(a) {
        console.log("materialMoveStart"), this.setData({
            materialScroll: !1
        });
    },
    materialMoveEnd: function(a) {
        this.setData({
            materialScroll: !0
        });
    },
    materialMove: function(a) {
        var t = this.data.PapersInfoList[this.data.current], e = a.changedTouches[0].pageY;
        e <= 0 ? e = 0 : o.globalData.SystemInfo.windowHeight - 74 < e && (e = o.globalData.SystemInfo.windowHeight - 74), 
        this.data.materialEntityList[t.ContextQuestionId].MoveTop = e, this.setData({
            materialEntityList: this.data.materialEntityList
        });
    },
    onPreviewImageJs: function(a) {
        var t = a.currentTarget.dataset.formatImages, e = a.currentTarget.dataset.currentImage;
        wx.previewImage({
            current: e,
            urls: t
        });
    },
    onFastTestExplainJs: function() {
        wx.setStorage({
            key: "FastTestExplain",
            data: "1"
        }), this.setData({
            fastTestExplain: !1
        });
        try {
            wx.getStorageSync("firstTestDoPaper") || (this.data.firstTestDoPaper = !0);
        } catch (a) {}
        this.setData({
            firstTestDoPaper: this.data.firstTestDoPaper
        });
    },
    onFirstTestDoPaperJs: function() {
        wx.setStorage({
            key: "firstTestDoPaper",
            data: "1"
        }), this.setData({
            firstTestDoPaper: !1
        });
    },
    onFirstDuoxuanTestDopaperJs: function() {
        wx.setStorage({
            key: "firstDuoxuanTestDopaper",
            data: "1"
        }), this.setData({
            firstDuoxuanTestDopaper: !1
        });
    },
    Audiobindtimeupdate: function(a, t) {
        var s = e.fortmatPapersTime(a), i = e.fortmatPapersTime(t);
        if (s != this.data.audio.AudioStart) {
            var r = Math.floor(100 * a / t);
            this.data.audio.AudioStart = s, this.data.audio.AudioEnd = i, this.data.audio.percent = r, 
            this.setData({
                audio: this.data.audio
            });
        }
    },
    onPlayAudio: function() {
        this.data.audio.play = !this.data.audio.play, this.data.audio.play ? (console.log("play"), 
        this.audioPlay()) : (wx.pauseBackgroundAudio(), console.log("pause")), this.setData({
            audio: this.data.audio
        });
    },
    audioPlay: function() {
        var a = this;
        console.log(a.data.audio.src), wx.playBackgroundAudio({
            dataUrl: a.data.audio.src
        });
    },
    practiceEventMsg: function() {
        var a = o.globalData.userData.OpenId, e = this.data.formId, s = o.globalData.subject.SubjectParentName, i = o.globalData.subject.SubjectName, r = "", n = this.data.examType;
        n == o.globalData.ExamType.fastTest ? r = "pages/index/index" : n == o.globalData.ExamType.chapterTest ? r = "pages/practiceChapter/practiceChapter" : n == o.globalData.ExamType.zhentiTest ? r = "pages/practicePapers/practicePapers" : n == o.globalData.ExamType.solidifyTest && (r = ""), 
        "" != r && (r += "?examType=" + this.data.examType, r += "&" + o.generateShareOptions(), 
        t.practiceEvent(n, a, e, r, s, i, function(a) {
            console.log(a);
        }));
    },
    onReady: function() {},
    onAnswer: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        wx.stopBackgroundAudio(), this.data.intervalNumber && clearInterval(this.data.intervalNumber), 
        this.data.clearPaperCache || this.savePaperCache();
    },
    savePaperCache: function() {
        this.data.examType != o.globalData.ExamType.mockTest && this.data.examType != o.globalData.ExamType.solidifyTest && this.data.examType != o.globalData.ExamType.zhentiTest && this.data.examType != o.globalData.ExamType.burningTest && this.data.examType != o.globalData.ExamType.denseTest && this.data.examType != o.globalData.ExamType.fineTest || (this.data.examType == o.globalData.ExamType.mockTest ? o.globalData.MockPaperCache.mockId = this.data.mockId : o.globalData.MockPaperCache.mockId = this.data.paperId, 
        o.globalData.MockPaperCache.questionId = this.getCurrentQustionId(), o.globalData.MockPaperCache.mockAnswerList = this.papersAdpter.getPersInfoList());
    },
    clearPaperCache: function() {
        this.data.clearPaperCache = !0, o.globalData.MockPaperCache.mockId = 0, o.globalData.MockPaperCache.questionId = 0, 
        o.globalData.MockPaperCache.mockAnswerList = null;
    },
    getCurrentQustionId: function() {
        var a = this.data.current, t = this.data.PapersInfoList[a];
        return t.isExplain && (a = this.data.current + 1, t = this.data.PapersInfoList[a]), 
        t || (a = this.data.current - 1, t = this.data.PapersInfoList[a]), t.RealQuestionId;
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var a = this.data.current, t = this.data.PapersInfoList[a];
        t.isExplain && (a = this.data.current + 1, t = this.data.PapersInfoList[a]), t || (a = this.data.current - 1, 
        t = this.data.PapersInfoList[a]);
        var s = this, i = "/pages/papersAnalysis/papersAnalysis";
        return i += "?examType=" + o.globalData.ExamType.fenxiangTest, i += "&questionId=" + t.RealQuestionId, 
        i += "&" + o.generateShareOptions(), console.log(i), {
            title: o.globalData.subject.SubjectName + e.getTitleByExamType(s.data.examType),
            path: i
        };
    },
    touchEnd: function(a) {
        var t = this;
        if (console.log("离开"), t.data.durationAudioPlaye) {
            var e = a.detail.value, s = Math.floor(e * t.data.durationAudioPlaye / 100);
            wx.seekBackgroundAudio({
                position: s,
                success: function(a) {
                    console.log("success"), console.log(a);
                },
                complete: function(a) {
                    console.log("complete"), console.log(a);
                },
                fail: function(a) {
                    console.log("fail"), console.log(a);
                }
            });
        }
    }
});