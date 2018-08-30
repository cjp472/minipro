var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
    }
    return e;
}, t = require("../../../libs/lodash.custom.min.js"), a = getApp(), o = a.service, i = a.util, r = a.globalData;

Component({
    properties: {
        chapterList: {
            type: Array,
            value: []
        },
        questionId: {
            type: Number,
            value: 0
        },
        answerList: {
            type: Array,
            value: []
        },
        needEval: {
            type: Boolean,
            value: !1
        },
        resultEffect: {
            type: String,
            value: "star"
        },
        leftCount: {
            type: Number,
            value: 999
        }
    },
    data: {
        userType: 1,
        chapter_list: [],
        fold: !0,
        allQsNum: 100,
        QsNum: 1,
        isRecording: !1,
        isPlayingTitle: !1,
        isPlayingRecord: !1,
        seriesPlay: !1,
        recordDuration: 0,
        recordOptions: {
            duration: 6e5,
            sampleRate: 16e3,
            numberOfChannels: 1,
            encodeBitRate: 32e3,
            format: "mp3"
        },
        evalRecord: {
            voice_url: "",
            voice_duration: "00:00",
            score: ""
        },
        index: 0,
        chapter: 0,
        pageType: "answer"
    },
    ready: function() {
        console.log("attached"), this.customData = {
            answersMap: {},
            indexMap: {},
            timerDuration: 0
        };
        var e = 1 === r.loginUser.user_type_login ? 1 : 2, a = 0, o = 1, s = this.customData, n = s.indexMap, c = s.answersMap, l = this.data, d = l.chapterList, u = l.questionId, g = l.answerList, h = function(e) {
            var a = t.attempt(JSON.parse, e);
            return t.isError(a) ? [] : a;
        };
        d.forEach(function(e, t) {
            e.question_list = e.question_list || [], e.chapter_content = h(e.chapter_content);
            var o = e.chapter_content[0].content[0], i = o.picture_width, r = o.picture_height;
            e.chapter_content[0].content[0].picture_width = parseInt(i) > 690 ? 690 : parseInt(i), 
            e.chapter_content[0].content[0].picture_height = parseInt(r) / parseInt(i) * e.chapter_content[0].content[0].picture_width, 
            e.question_list.forEach(function(e, o) {
                e.question_content = h(e.question_content), n[e.question_id] = [ t, o, a + o + 1 ];
            }), a += e.question_list.length;
        });
        var p = 0, v = 0;
        if (u) {
            var _ = n[u];
            _ && (p = _[0], v = _[1], o = _[2]);
        }
        var f = "answer", y = this.data, m = y.evalRecord, P = y.needEval;
        g && g.length > 0 && (f = "preview", g.forEach(function(e) {
            var a = t.attempt(JSON.parse, e.words);
            t.isError(a) && (a = []), c[e.question_id] = {
                toDisplay: {
                    voice_url: e.voice_url,
                    score: Math.floor(e.score),
                    words: P && i.getEvalResultHTML(a, e.origin_text, e.sample ? "en" : "zh")
                }
            };
        }), m = c[d[p].question_list[v].question_id].toDisplay), i.setDataImproved(this, {
            chapter_list: d,
            chapter: p,
            index: v,
            allQsNum: a,
            QsNum: o,
            evalRecord: m,
            pageType: f,
            userType: e
        });
    },
    detached: function() {
        this._stopPlay(), this.data.isRecording && this.stopRecord(), clearInterval(this.customData.timerDuration);
    },
    methods: {
        fold: function() {
            i.setDataImproved(this, {
                fold: !this.data.fold
            });
        },
        _seriesPlay: function() {
            this.data.isPlayingRecord || this._startPlayRecord(), i.setDataImproved(this, {
                seriesPlay: !0
            }, !0);
        },
        _seriesStop: function() {
            i.setDataImproved(this, {
                seriesPlay: !1
            }, !0);
        },
        _startPlayRecord: function() {
            var e = this, t = this.data;
            if (t.isRecording) i.showToast("请先停止录音再播放", "none", 2e3); else {
                var a = function() {
                    var a = t.evalRecord.voice_url;
                    i.pauseVoicePlay(), i.stopVideoPlay(), r.backgroundAudioManager && r.backgroundAudioManager.src || (r.backgroundAudioManager = wx.getBackgroundAudioManager()), 
                    e._registerAudioHandlers("record"), r.backgroundAudioManager.title = "背景音频", r.backgroundAudioManager.src = e._silkToMP3(a);
                };
                t.isPlayingTitle ? (this._stopPlay(), setTimeout(function() {
                    a();
                }, 30)) : a();
            }
        },
        playTitleAudio: function(e) {
            var t = this, a = this.data, o = a.isPlayingTitle, s = a.chapter, n = a.index, c = a.chapter_list, l = a.isPlayingRecord;
            if (this.data.isRecording) i.showToast("请停止录音后再播放", "none", 2e3); else {
                var d = function() {
                    var e = c[s].question_list[n].question_content.voice.voice_url;
                    i.stopVoicePlay(!0), i.stopVideoPlay(), r.backgroundAudioManager && r.backgroundAudioManager.src || (r.backgroundAudioManager = wx.getBackgroundAudioManager()), 
                    t._registerAudioHandlers("title"), r.backgroundAudioManager.title = "背景音频", r.backgroundAudioManager.src = t._silkToMP3(e);
                };
                o ? this._stopPlay() : l ? (this._stopPlay(), setTimeout(function() {
                    d();
                }, 30)) : d();
            }
        },
        _stopPlay: function() {
            console.log("_stopPlay:"), r.backgroundAudioManager && r.backgroundAudioManager.stop();
        },
        _silkToMP3: function(e) {
            if (!e || "string" != typeof e) return "";
            var t = e.lastIndexOf(".");
            return ".silk" === e.slice(t).toLowerCase() ? e.slice(0, t) + ".mp3" : e;
        },
        _registerAudioHandlers: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "title";
            console.log("_registerHandlers");
            this.data.evalRecord;
            var a = r.backgroundAudioManager;
            a.onPlay(function(a) {
                console.log("onPlay"), "title" == t ? e.setData({
                    isPlayingTitle: !0
                }) : e.setData({
                    isPlayingRecord: !0
                });
            }), a.onStop(function(a) {
                console.log("onStop:"), "title" == t ? e.setData({
                    isPlayingTitle: !1
                }) : e.setData({
                    isPlayingRecord: !1,
                    seriesPlay: !1
                });
            }), a.onPause(function(a) {
                console.log("onPause"), "title" == t ? e.setData({
                    isPlayingTitle: !1
                }) : e.setData({
                    isPlayingRecord: !1
                });
            }), a.onError(function(a) {
                i.showToast("音频播放失败", "none", 2e3), e._stopPlay(), "title" == t ? e.setData({
                    isPlayingTitle: !1
                }) : e.setData({
                    isPlayingRecord: !1
                });
            }), a.onEnded(function(a) {
                "title" == t ? e.setData({
                    isPlayingTitle: !1
                }) : e.setData({
                    isPlayingRecord: !1,
                    seriesPlay: e.data.seriesPlay && e.data.QsNum < e.data.allQsNum
                }), e.data.seriesPlay && e.data.QsNum < e.data.allQsNum && (e.nextQs(), e._startPlayRecord());
            });
        },
        startRecord: function() {
            var e = this.data.recordOptions, t = this.data, a = t.isPlayingTitle, o = t.isPlayingRecord;
            (a || o) && this._stopPlay(), i.stopVoicePlay(!0), r.recorderManager || (r.recorderManager = wx.getRecorderManager()), 
            r.recorderManager.start(e), this._registerRecordHandlers();
        },
        stopRecord: function() {
            clearInterval(this.customData.timerDuration), r.recorderManager && r.recorderManager.stop();
        },
        _registerRecordHandlers: function() {
            var e = this, t = 0;
            r.recorderManager.onStart(function() {
                console.log("recorder start"), e.setData({
                    isRecording: !0,
                    "evalRecord.voice_duration": "00:00",
                    "evalRecord.words": ""
                }), clearInterval(e.customData.timerDuration), e.customData.timerDuration = setInterval(function() {
                    var a = e.data, o = a.chapter_list, r = a.chapter, s = a.index, n = o[r].question_list[s].question_content.evalTime;
                    if (n = n || 300, console.log("durationLimit:", n), t >= n) return console.log("auto stop record:", t), 
                    void e.stopRecord();
                    t++, e.setData({
                        "evalRecord.voice_duration": i.getMMSS(t)
                    });
                }, 1e3);
            }), r.recorderManager.onStop(function(a) {
                var o = a.tempFilePath;
                clearInterval(e.customData.timerDuration), i.setDataImproved(e, {
                    isRecording: !1,
                    "evalRecord.voice_duration": "00:00"
                }), t < 1 ? i.showToast("请录制1秒以上的音频", "none", 2e3) : e.uploadFailRecorder(o, t);
            }), r.recorderManager.onFrameRecorded(function(e) {
                e.frameBuffer;
            }), r.recorderManager.onError(function(t) {
                t.errMsg.indexOf("auth") < 0 ? i.showError("录音失败(" + t.errMsg + ")，请重试", e) : wx.getSetting({
                    success: function(t) {
                        e.setData({
                            settingContent: "您已拒绝授权，所以无法录音",
                            showSetting: !0
                        });
                    }
                });
            });
        },
        settingConfirm: function(e) {
            this.setData({
                showSetting: !1
            });
        },
        lastQs: function() {
            var e = this.data, t = e.chapter_list, a = e.chapter, o = e.index, r = e.QsNum, s = e.isPlayingRecord, n = e.isPlayingTitle;
            if (e.isRecording) i.showToast("正在录音", "none", 2e3); else {
                (n || s) && this._stopPlay();
                var c = a, l = o, d = r;
                o > 0 ? (d--, l--) : a > 0 && (d--, l = t[--c].question_list.length - 1);
                var u = t[c].question_list[l].question_id, g = this.customData.answersMap[u];
                i.setDataImproved(this, {
                    index: l,
                    chapter: c,
                    QsNum: d,
                    evalRecord: g && g.toDisplay || {}
                });
            }
        },
        nextQs: function() {
            var e = this.data, t = e.chapter_list, a = e.chapter, o = e.index, r = e.QsNum, s = e.isRecording, n = e.isPlayingTitle, c = e.isPlayingRecord, l = this.customData.answersMap;
            if (s) i.showToast("正在录音", "none", 2e3); else if ((n || c) && this._stopPlay(), 
            l[t[a].question_list[o].question_id]) {
                var d = a, u = o, g = r;
                o < t[a].question_list.length - 1 ? (g++, u++) : a < t.length - 1 && (g++, d++, 
                u = 0);
                var h = l[t[d].question_list[u].question_id];
                i.setDataImproved(this, {
                    index: u,
                    chapter: d,
                    QsNum: g,
                    evalRecord: h && h.toDisplay || {}
                }, !0);
            } else i.showToast("请先完成本题", "none", 2e3);
        },
        uploadFailRecorder: function(e, t) {
            var r = this, s = this.data, n = (s.chapter_list, s.chapter, s.index, s.needEval);
            i.showToast(n ? "正在评分" : "正在上传"), o.uploadMp3(e, function(e) {
                r.data.evalRecord.voiceName = e, r.data.evalRecord.success = !0, r._addToAnswer("toSubmit", {
                    answer_content: "",
                    picture_list: [],
                    video_list: [],
                    voice_list: [ {
                        voice: e,
                        voice_url: e,
                        voice_duration: t,
                        voice_name: "卡片跟读评测语音"
                    } ],
                    eval_voice_id: 0,
                    question_id: r._getCurrentQuestionId()
                }), n ? r.fetchScore(r._getCurrentQuestionId(), e) : (i.hideToast(), r._addToAnswer("toDisplay", {
                    voice_url: a.config.voicePrefix + e
                }));
            }, function(e) {
                i.hideToast(), r.data.evalRecord.success = !1, i.showError("上传语音失败:" + e.errMsg, r);
            });
        },
        fetchScore: function(e, r) {
            var s = this;
            this.setData({
                evaluating: !0
            }), o.fetchQuestionEvalScore({
                eval_url: r,
                question_id: e,
                eval_type: 1
            }, function(e) {
                var o = t.attempt(JSON.parse, e.words);
                t.isError(n) && (o = []);
                var n = i.getEvalResultHTML(o, e.origin_text, e.sample ? "en" : "zh");
                s.setData({
                    "evalRecord.eval_voice_id": e.eval_id,
                    "evalRecord.score": Math.floor(parseInt(e.score)),
                    "evalRecord.words": n
                });
                e.eval_id && e.score >= 0 && (!0, s._addToAnswer("toSubmit", {
                    eval_voice_id: e.eval_id
                }), s._addToAnswer("toDisplay", {
                    score: Math.floor(parseInt(e.score)),
                    voice_url: a.config.voicePrefix + r,
                    words: n
                })), s.triggerEvent("startRec", {});
                var c = s.data.leftCount;
                console.log(c);
            }, function(e) {
                424 === e.errMsg ? wx.showModal({
                    title: "提示",
                    content: "语音评测额度不足，请联系管理员",
                    showCancel: !1,
                    confirmText: "我知道了"
                }) : i.showError("获取评测结果失败(" + e.errText + ",请重试)", s);
            }, function(e) {
                s.setData({
                    evaluating: !1
                }), i.hideToast();
            });
        },
        _getCurrentQuestionId: function() {
            var e = this.data, t = e.chapter_list, a = e.chapter, o = e.index;
            return t[a].question_list[o].question_id;
        },
        _addToAnswer: function(t, a) {
            var o = this.customData.answersMap, r = this._getCurrentQuestionId();
            return o[r] = o[r] || {}, "toSubmit" === t ? o[r].toSubmit = e({}, o[r].toSubmit, a) : "toDisplay" === t && (o[r].toDisplay = e({}, o[r].toDisplay, a), 
            i.setDataImproved(this, {
                evalRecord: o[r].toDisplay
            })), o[r];
        },
        submitCard: function() {
            var e = this.data, t = e.chapter_list, a = e.allQsNum, o = e.isRecording, r = this.customData, s = r.answersMap, n = r.indexMap, c = (t[0].calendar_id, 
            []), l = 0;
            if (o) i.showToast("请先停止录音", "none", 2e3); else if (Object.keys(s).length === a) Object.keys(s).forEach(function(e) {
                var t = s[e].toSubmit;
                c.push(t), l += t.voice_list[0] && t.voice_list[0].voice_duration || 0;
            }), this.triggerEvent("submitCard", {
                duration: l,
                answer_list: c
            }); else {
                var d = Object.keys(n).find(function(e) {
                    return !s[e];
                });
                i.showToast("还有题目未做完", "none", 2e3), i.setDataImproved(this, {
                    chapter: n[d][0],
                    index: n[d][1],
                    QsNum: n[d][2]
                });
            }
        },
        goRemoark: function() {
            this.triggerEvent("goRemark");
        }
    }
});