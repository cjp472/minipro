var t = require("../papers/papersClass/PapersAdpter.js"), a = require("../../biz/practice.js"), e = require("../../utils/util.js"), s = require("../../utils/wxpares.js"), i = require("../../config.js"), r = getApp(), o = require("../../utils/practiceModle.js"), n = require("../../utils/tourist.js"), d = require("../../biz/groupBuy.js");

Page({
    papersAdpter: {},
    data: {
        buyState: i.buyState,
        configColor: i.UIConfig.color,
        paperAnalysisOptionState: !1,
        iPhoneX: r.globalData.SystemInfo.iPhoneX,
        theme: i.UIConfig.Theme,
        papersInfoCurrent: 0,
        current: 0,
        orderNumber: 0,
        PapersQuantity: 6,
        oldCurrent: 0,
        PapersInfoList: [],
        materialEntityList: {},
        trainAnswerBtn: {
            10: "radius",
            20: "",
            35: "no-directional"
        },
        trainCartBtn: {
            0: "",
            1: "success",
            2: "error"
        },
        materialScroll: !0,
        IsFavor: 0,
        cartState: !1,
        cartInfoList: [],
        duration: 200,
        examType: 0,
        IsShare: 0,
        errorAnalysis: 0,
        SubjectName: "",
        paperId: 0,
        userExamPaperId: 0,
        questionId: 0,
        hasAudio: !1,
        audio: {
            src: "",
            percent: 0,
            AudioStart: "00:00",
            AudioEnd: "00:00",
            play: !1
        },
        showExamSite: !1,
        examFrequencyList: [],
        examSitesName: "",
        shareModle: !1,
        reciteModle: !1,
        rightDel: !1,
        rightSkip: !1,
        settingModel: !1,
        examPaperType: 1,
        shuatiModleOver: !1,
        highFreType: 0,
        examFrequency: 0,
        mockId: 0
    },
    onLoad: function(t) {
        var s = this;
        this.data.examType = t.examType, this.data.IsShare = t.IsShare, this.data.SubjectName = t.SubjectName, 
        t.userExamPaperId && (this.data.userExamPaperId = t.userExamPaperId), this.data.paperId = t.paperId, 
        this.data.questionId = t.questionId, this.data.errorAnalysis = t.errorAnalysis, 
        this.data.allQustions = t.allQustions, t.examPaperType && (this.data.examPaperType = t.examPaperType), 
        this.data.highFreType = t.highFreType, this.data.examFrequency = t.examFrequency, 
        this.data.mockId = t.mockId;
        var i = "";
        i = this.data.examType == r.globalData.ExamType.fenxiangTest ? this.data.SubjectName : e.getTitleByExamType(this.data.examType), 
        wx.setNavigationBarTitle({
            title: i
        }), wx.showLoading({
            title: "正在加载"
        }), r.checkContextWithShareOptions(t, function() {
            s.data.examType == r.globalData.ExamType.fenxiangTest ? a.getShareTestData(s.data.questionId, function(t) {
                s.initDataView(t);
            }) : s.data.examType == r.globalData.ExamType.fastTest || s.data.examType == r.globalData.ExamType.highFreTest ? a.getZhentiTestData(s.data.paperId, s.data.userExamPaperId, function(t) {
                s.initDataView(t);
            }) : s.data.examType == r.globalData.ExamType.zhentiTest || s.data.examType == r.globalData.ExamType.burningTest || s.data.examType == r.globalData.ExamType.fineTest || s.data.examType == r.globalData.ExamType.denseTest ? a.getZhentiTestData(s.data.paperId, s.data.userExamPaperId, function(t) {
                s.initDataView(t);
            }) : s.data.examType == r.globalData.ExamType.mockTest ? a.getMockTestAnalysisData(s.data.paperId, s.data.mockId, function(t) {
                s.initDataView(t);
            }) : s.data.examType == r.globalData.ExamType.solidifyTest ? a.getSolidifyTestData(s.data.paperId, s.data.userExamPaperId, function(t) {
                s.initDataView(t);
            }) : s.data.examType == r.globalData.ExamType.chapterTest || s.data.examType == r.globalData.ExamType.textbookTest ? a.getZhentiTestData(s.data.paperId, s.data.userExamPaperId, function(t) {
                s.initDataView(t);
            }) : s.data.examType == r.globalData.ExamType.wrongSee ? (n.addTouristQuantity(s.data.examType), 
            s.data.allQustions ? a.getAllErroTestData(s.data.examPaperType, function(t) {
                s.initDataView(t);
            }) : 45 == s.data.examPaperType || 40 == s.data.examPaperType || 20 == s.data.examPaperType ? a.GetErrorOverviewData(s.data.paperId, function(t) {
                s.initDataView(t);
            }) : a.getErroTestData(s.data.paperId, s.data.examPaperType, function(t) {
                s.initDataView(t);
            })) : s.data.examType == r.globalData.ExamType.collectionSee ? (n.addTouristQuantity(s.data.examType), 
            s.data.allQustions ? a.getAllFavorTestData(s.data.examPaperType, function(t) {
                s.initDataView(t);
            }) : 45 == s.data.examPaperType || 40 == s.data.examPaperType || 20 == s.data.examPaperType ? a.getFavorOverviewData(s.data.paperId, function(t) {
                s.initDataView(t);
            }) : a.getFavorTestData(s.data.paperId, s.data.examPaperType, function(t) {
                s.initDataView(t);
            })) : s.data.examType == r.globalData.ExamType.historySee && a.getZhentiTestData(s.data.paperId, s.data.userExamPaperId, function(t) {
                s.initDataView(t);
            }), t.IsShare && d.getGroupon(function(t) {
                console.log(t), s.setData({
                    ifHongb: t.HasGroupon,
                    openGroupId: t.Groupon.Id
                });
            });
        }), this.startExamTimer();
    },
    startExamTimer: function() {
        var t = this;
        setTimeout(function() {
            wx.getBackgroundAudioPlayerState({
                success: function(a) {
                    a.status, a.dataUrl;
                    var e = a.currentPosition, s = a.duration;
                    a.downloadPercent;
                    s && t.setData({
                        durationAudioPlaye: s
                    }), e && t.Audiobindtimeupdate(e, s);
                }
            }), this.startExamTimer();
        }.bind(this), 1e3);
    },
    initAudio: function() {
        var t = this;
        if (t.data.hasAudio) {
            if (t.data.currentPaperInfo.AudioUrl == t.data.audio.src) return void console.log("同一个听力");
            wx.stopBackgroundAudio();
            a = {
                src: t.data.currentPaperInfo.AudioUrl,
                percent: 0,
                AudioStart: "00:00",
                AudioEnd: "00:00",
                play: !1
            };
            t.setData({
                audio: a
            });
        } else {
            wx.stopBackgroundAudio();
            var a = {
                src: "",
                play: !1
            };
            t.setData({
                audio: a
            });
        }
    },
    initDataView: function(a) {
        var e = this;
        if (e.papersAdpter = new t.PapersAdpter(a, e.data.examType, 1), e.papersAdpter.TransAnalysisAnswer(), 
        this.data.examType == r.globalData.ExamType.fenxiangTest ? (this.setData({
            reciteModle: !1,
            shareModle: !0
        }), this.reciteModleinit()) : this.data.examType == r.globalData.ExamType.wrongSee || this.data.examType == r.globalData.ExamType.collectionSee ? (this.setData({
            reciteModle: r.globalData.PracticeModle.reciteModle,
            rightDel: r.globalData.PracticeModle.rightDel,
            rightSkip: r.globalData.PracticeModle.rightSkip,
            settingModel: !0
        }), this.reciteModleinit()) : (e.papersAdpter.TransAnalysisUserAnswer(), e.papersAdpter.TransPapersInfoListStyle()), 
        1 == this.data.errorAnalysis && e.papersAdpter.TransErroAnalysisModle(), this.data.questionId && 0 != this.data.questionId) this.cartQuestionToNubmer(this.data.questionId); else {
            var s = e.wxParseData(e.papersAdpter.getPersInfoListByQuantity(this.data.PapersQuantity));
            e.setData({
                PapersInfoList: s
            });
        }
        e.wxParseData(e.papersAdpter.materialEntityList);
        e.data.currentPaperInfo = this.data.PapersInfoList[0], e.setData({
            SubjectName: e.data.SubjectName,
            IsShare: e.data.IsShare,
            orderNumber: e.papersAdpter.OrderNumber,
            materialEntityList: e.papersAdpter.materialEntityList,
            IsFavor: e.data.currentPaperInfo.IsFavor,
            hasAudio: !(!e.data.currentPaperInfo.AudioUrl || "" == e.data.currentPaperInfo.AudioUrl)
        }), wx.hideLoading(), this.initAudio(), e.data.examType == r.globalData.ExamType.highFreTest && (r.globalData.HightFreMode.userCount = r.globalData.HightFreMode.userCount + e.papersAdpter.OrderNumber, 
        r.globalData.HightFreMode.TotalCount <= r.globalData.HightFreMode.userCount && e.setData({
            shuatiModleOver: !0
        }));
    },
    reciteModleinit: function() {
        console.log(this.data.reciteModle), this.data.shareModle ? this.papersAdpter.TransShareModle() : this.data.reciteModle ? (this.papersAdpter.TransReciteModle(), 
        this.papersAdpter.TransPapersInfoListStyle()) : this.papersAdpter.TransDoModle();
    },
    refrshPapersInfoList: function() {
        this.data.reciteModle ? (this.papersAdpter.refreshReciteModle(this.data.PapersInfoList), 
        this.papersAdpter.refreshPapersInfoListStyle(this.data.PapersInfoList)) : this.papersAdpter.refreshDoModle(this.data.PapersInfoList), 
        this.setData({
            PapersInfoList: this.data.PapersInfoList
        });
    },
    wxParseData: function(t) {
        for (var a in t) {
            var i = t[a];
            i.FormatContentWxpares = s.getSources(i.FormatContent);
            var r = i.FormatContentWxpares[i.FormatContentWxpares.length - 1].content;
            if (i.FormatContentWxpares[i.FormatContentWxpares.length - 1].content = r.substring(0, r.length - 1), 
            i.strQuestionType = this.papersAdpter.getQuestionType(i.QuestionTypeId), i.QuestionsAnswerEntity && (i.QuestionsAnswerEntity.FormatContentWxpares = s.getSources(i.QuestionsAnswerEntity.FormatContent), 
            50 == i.QuestionTypeId)) {
                var o = i.QuestionsAnswerEntity.AnswerArray[0];
                i.QuestionsAnswerEntity.RightAnswerWxpares = s.getSources(o);
            }
            i.QuestionStatisticsEntity && (i.QuestionStatisticsEntity.RightRatioInt = Math.round(100 * i.QuestionStatisticsEntity.RightRatio));
            for (var n in i.QuestionContentKeyValue) {
                var d = i.QuestionContentKeyValue[n];
                d.QuestionValueWxpares = s.getSources(d.Value);
            }
            var p = [];
            for (var u in i.FormatImages) {
                var l = i.FormatImages[u], h = e.getSrcInfoByImages(l);
                p.push(h);
            }
            if (i.ForatImagesWxpares = p, i.QuestionsAnswerEntity) {
                var c = [];
                for (var g in i.QuestionsAnswerEntity.FormatImages) {
                    var l = i.QuestionsAnswerEntity.FormatImages[g], h = e.getSrcInfoByImages(l);
                    c.push(h);
                }
                i.QuestionsAnswerEntity.FormatQuestionsAnswerEntityImagesPares = c;
            }
        }
        return t;
    },
    onSwiperBindChange: function(t) {
        var a = t.detail.current;
        this.data.current = a;
        var e = this.data.PapersInfoList[a];
        this.data.currentPaperInfo = e, setTimeout(function() {
            this.setData({
                IsFavor: e.IsFavor
            });
        }.bind(this), 500), console.log(this.data.papersInfoCurrent == this.data.current), 
        this.data.papersInfoCurrent == this.data.current && this.setData({
            duration: 200
        });
        var s = !(!this.data.currentPaperInfo.AudioUrl || "" == this.data.currentPaperInfo.AudioUrl);
        this.setData({
            hasAudio: s
        }), this.initAudio(), a - this.data.oldCurrent >= 0 ? this.data.PapersInfoList[a + 1] || (console.log("右滑动-到加载下面数据："), 
        this.onPaperChange(a, !0)) : this.data.PapersInfoList[a - 1] || (console.log("左滑动-到加载上面数据"), 
        this.onPaperChange(a, !1)), this.data.oldCurrent = a;
    },
    onPaperChange: function(t, a) {
        this.setData({
            duration: 0
        });
        var e, s = this.papersAdpter.getPapersListPostion(this.data.PapersInfoList[t].RealQuestionId, a, this.data.PapersQuantity), i = this.wxParseData(s), r = this.data.PapersInfoList[t];
        e = a ? this.data.PapersInfoList.concat(i) : i.concat(this.data.PapersInfoList);
        var o = this.papersAdpter.getBufferDataList(e, a, this.data.PapersQuantity), n = t, d = 0;
        e.length > this.papersAdpter.bufferData && (n = this.papersAdpter.getBufferDataListPostion(r.RealQuestionId, o), 
        d = 160), setTimeout(function() {
            this.setData({
                PapersInfoList: o,
                papersInfoCurrent: n
            });
        }.bind(this), d);
    },
    onQuestionContentKeyValue: function(t) {
        var a = this.data.PapersInfoList[this.data.current].QuestionContentKeyValue, e = this.data.PapersInfoList[this.data.current];
        if (e.AnalysisModle) {
            var s = a[t.currentTarget.dataset.index];
            s.userSelect = !s.userSelect, this.QuestionContentKeyValueUserSelectState(a) ? e.readModleOpen = !0 : e.readModleOpen = !1, 
            10 == e.QuestionTypeId ? (this.onAnalysisModleJs(), !this.papersAdpter.getLastQuestionState(e) && this.data.rightSkip && e.UserAnswerEntity && 1 == e.UserAnswerEntity.IsState && (this.data.current = this.data.current + 1, 
            setTimeout(function() {
                this.setData({
                    papersInfoCurrent: this.data.current
                });
            }.bind(this), 200))) : this.setData({
                PapersInfoList: this.data.PapersInfoList
            }), this.synchronPapersData(e);
        }
    },
    QuestionContentKeyValueUserSelectState: function(t) {
        var a = !1;
        for (var e in t) if (t[e].userSelect) {
            a = !0;
            break;
        }
        return a;
    },
    clearQuestionContentKeyValueUserSelect: function(t) {
        for (var a in t) t[a].userSelect = !1;
    },
    synchronPapersData: function(t) {
        this.papersAdpter.synchronPapersData(t);
    },
    onQustionFavor: function() {
        var t = this.data.PapersInfoList[this.data.current];
        0 == t.IsFavor ? t.IsFavor = 1 : t.IsFavor = 0, this.setData({
            IsFavor: t.IsFavor
        }), this.synchronPapersData(t), a.favorByRealQuestionId(t.RealQuestionId, t.IsFavor, function(t) {
            console.log(t);
        });
    },
    OncartStateJs: function() {
        this.data.cartInfoList = this.papersAdpter.getAnalysisCartInfoList(), this.setData({
            cartState: !this.data.cartState,
            cartInfoList: this.data.cartInfoList
        });
    },
    onCartNumberJs: function(t) {
        var a = t.currentTarget.dataset.realQuestionid;
        this.cartQuestionToNubmer(a), this.setData({
            cartState: !this.data.cartState
        });
    },
    onExamSiteJs: function() {
        var t = this.data.PapersInfoList[this.data.current].ExamSitesEntityList, a = "";
        for (var s in t) a += t[s].ExamSiteName, s != t.length - 1 && (a += ">");
        var i = t[t.length - 1].ExamFrequency, r = e.caculateStarCount(i);
        this.setData({
            showExamSite: !this.data.showExamSite,
            examFrequencyList: r,
            examSitesName: a
        });
    },
    cartQuestionToNubmer: function(t) {
        var a = this.papersAdpter.getPapersListPostion(t, !1, 4), e = this.papersAdpter.getPapersListPostion(t, !0, 5), s = this.papersAdpter.getPaperInfoById(t);
        a.push(s), a = this.wxParseData(a), e = this.wxParseData(e);
        var i = a.concat(e), r = this.papersAdpter.getBufferDataListPostion(t, i), o = !(!s.AudioUrl || "" == s.AudioUrl);
        this.data.current = r, console.log("cartPostion : " + r), this.setData({
            PapersInfoList: i,
            papersInfoCurrent: r,
            hasAudio: o
        });
    },
    OnSubmitExamJs: function() {
        this.setData({
            cartState: !this.data.cartState
        });
    },
    onLastItemBack: function() {
        wx.navigateBack({});
    },
    onLastItemDo: function() {
        var t = "";
        this.data.examType == r.globalData.ExamType.highFreTest ? t = "../../pages/papers/papers?examType=" + this.data.examType + "&highFreType=" + this.data.highFreType + "&examFrequency=" + this.data.examFrequency + "&isReset=0" : this.data.examType == r.globalData.ExamType.fastTest ? t = "../../pages/papers/papers?examType=" + this.data.examType : this.data.examType != r.globalData.ExamType.chapterTest && this.data.examType != r.globalData.ExamType.textbookTest || (t = "../../pages/papers/papers?examType=" + this.data.examType + "&paperId=" + r.globalData.ExamSiteId, 
        console.log(t)), wx.redirectTo({
            url: t
        });
    },
    materialMoveStart: function(t) {
        console.log("materialMoveStart"), this.setData({
            materialScroll: !1
        });
    },
    materialMoveEnd: function(t) {
        console.log("materialMoveEnd"), this.setData({
            materialScroll: !0
        });
    },
    materialMove: function(t) {
        var a = this.data.PapersInfoList[this.data.current], e = t.changedTouches[0].pageY;
        e <= 0 ? e = 0 : r.globalData.SystemInfo.windowHeight - 74 < e && (e = r.globalData.SystemInfo.windowHeight - 74), 
        this.data.materialEntityList[a.ContextQuestionId].MoveTop = e, this.setData({
            materialEntityList: this.data.materialEntityList
        });
    },
    onVidJs: function(t) {
        console.log(t), console.log(t.currentTarget.dataset.vid), wx.navigateTo({
            url: "../../pages/questionsVideo/questionsVideo?videoId=" + t.currentTarget.dataset.vid + "&realQuestionId=" + t.currentTarget.dataset.realQuestionId
        });
    },
    onFankuiJs: function(t) {
        var a = this.data.PapersInfoList[this.data.current];
        wx.navigateTo({
            url: "../../pages/questionsFeedback/questionsFeedback?questionsId=" + a.RealQuestionId
        });
    },
    onPreviewImageJs: function(t) {
        var a = t.currentTarget.dataset.formatImages;
        console.log(a);
        var e = t.currentTarget.dataset.currentImage;
        wx.previewImage({
            current: e,
            urls: a
        });
    },
    onAnalysisModleJs: function() {
        var t = this.data.PapersInfoList[this.data.current];
        if (t.AnalysisModle = !1, 50 != t.QuestionTypeId) {
            var e = {};
            e.AnswerDuration = 0, e.UserAnswer = this.papersAdpter.getUserSelectAnswer(t.QuestionContentKeyValue), 
            e.IsState = this.papersAdpter.getUserAnswerState(t.QuestionContentKeyValue, t.QuestionsAnswerEntity.AnswerArray), 
            "" == e.UserAnswer ? t.UserAnswerEntity = null : t.UserAnswerEntity = e;
        }
        this.papersAdpter.TransKeyValueInfoStyle(t), this.synchronPapersData(t), this.setData({
            PapersInfoList: this.data.PapersInfoList
        }), null != t.UserAnswerEntity && this.data.rightDel && 1 == t.UserAnswerEntity.IsState && (console.log(t.RealQuestionId), 
        a.removeErrorQustions(t.RealQuestionId, function(t) {
            console.log(t);
        }));
    },
    onMorePracticeJs: function() {
        wx.reLaunch({
            url: "../../pages/index/index"
        });
    },
    Audiobindtimeupdate: function(t, a) {
        var s = e.fortmatPapersTime(t), i = e.fortmatPapersTime(a);
        if (s != this.data.audio.AudioStart) {
            var r = Math.floor(100 * t / a);
            this.data.audio.AudioStart = s, this.data.audio.AudioEnd = i, this.data.audio.percent = r, 
            console.log(r), this.setData({
                audio: this.data.audio
            });
        }
    },
    onPlayAudio: function() {
        this.data.audio.play = !this.data.audio.play, this.data.audio.play ? this.audioPlay() : wx.pauseBackgroundAudio(), 
        this.setData({
            audio: this.data.audio
        });
    },
    audioPlay: function() {
        var t = this;
        console.log(t.data.audio.src), wx.playBackgroundAudio({
            dataUrl: t.data.audio.src
        });
    },
    onReady: function() {},
    onAnswer: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        wx.stopBackgroundAudio();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this.data.current, a = this.data.PapersInfoList[t];
        a.isExplain && (t = this.data.current + 1, a = this.data.PapersInfoList[t]), a || (t = this.data.current - 1, 
        a = this.data.PapersInfoList[t]);
        var s = this, i = "/pages/papersAnalysis/papersAnalysis";
        return i += "?examType=" + r.globalData.ExamType.fenxiangTest, i += "&questionId=" + a.RealQuestionId, 
        i += "&" + r.generateShareOptions(), console.log(i), {
            title: r.globalData.subject.SubjectName + e.getTitleByExamType(s.data.examType),
            path: i
        };
    },
    showPapersOptions: function() {
        this.setData({
            paperAnalysisOptionState: !0
        });
    },
    hidePapersOptions: function() {
        this.setData({
            paperAnalysisOptionState: !1
        });
    },
    rciteModleChangeJs: function(t) {
        var a = t.detail.value;
        this.setData({
            reciteModle: a
        }), o.setStorageReciteModle(r, a), this.reciteModleinit(), this.refrshPapersInfoList();
    },
    rightSkipChangeJs: function(t) {
        var a = t.detail.value;
        this.setData({
            rightSkip: a
        }), o.setStorageRightSkip(r, a);
    },
    completeSettingJs: function() {
        this.data.reciteModle != this.data.reciteModleCache && (this.setData({
            reciteModle: this.data.reciteModleCache
        }), o.setStorageReciteModle(r, this.data.reciteModleCache), this.reciteModleinit(), 
        this.refrshPapersInfoList()), this.setData({
            rightSkip: this.data.rightSkipCache
        }), o.setStorageRightSkip(r, this.data.rightSkipCache), this.setData({
            paperAnalysisOptionState: !1
        });
    },
    emtyModle: function() {},
    formSubmitHongBao: function(t) {
        var a = t.detail.formId, e = this.data.openGroupId;
        wx.navigateTo({
            url: "../group/groupBuy/groupBuy?formId=" + a + "&grouponid=" + e
        });
    },
    touchEnd: function(t) {
        var a = this;
        if (console.log("离开"), a.data.durationAudioPlaye) {
            var e = t.detail.value;
            console.log(e);
            var s = Math.floor(e * a.data.durationAudioPlaye / 100);
            console.log(s), wx.seekBackgroundAudio({
                position: s,
                success: function(t) {
                    console.log("success"), console.log(t);
                },
                complete: function(t) {
                    console.log("complete"), console.log(t);
                },
                fail: function(t) {
                    console.log("fail"), console.log(t);
                }
            });
        }
    }
});