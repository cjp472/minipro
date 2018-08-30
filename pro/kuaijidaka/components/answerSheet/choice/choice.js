var e = getApp(), t = e.service, a = e.util;

Component({
    properties: {
        index: {
            type: Number,
            value: 0
        },
        chapter: {
            type: Number,
            value: 0
        },
        title: {
            type: String,
            value: "",
            observer: function(e, t) {
                e && 5 == this.data.selectType && this.setData({
                    blankTitle: this.data.title,
                    choice: []
                });
            }
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        qsList: {
            type: String,
            value: "",
            observer: function(e, t) {
                e != t && this._init("qsList");
            }
        },
        standardAnswer: {
            type: String,
            value: "",
            observer: function(e, t) {
                var a = this;
                if (e != t && 5 == this.data.selectType) {
                    var i = this.data.standardAnswer;
                    try {
                        i = JSON.parse(i);
                    } catch (e) {
                        i = [];
                    }
                    for (var r = 0; r < i.length; r++) i[r] = i[r].trim().replace(/\s+/g, " ").trim();
                    this.setData({
                        blankAnswer: i
                    }), setTimeout(function() {
                        a._init("blank");
                    }, 200);
                }
            }
        },
        answerContent: {
            type: String,
            value: "",
            observer: function(e, t) {
                var a = this;
                e != t && (1 != this.data.selectType && 2 != this.data.selectType && 4 != this.data.selectType || this._init("answer"), 
                5 == this.data.selectType && setTimeout(function() {
                    a._init("blank");
                }, 100), 0 == this.data.selectType && this._init("essay"));
            }
        },
        pictureList: {
            type: Array,
            value: [],
            observer: function(e, t) {
                e && this._init("essay");
            }
        },
        videoList: {
            type: Array,
            value: [],
            observer: function(e, t) {
                e && this._init("essay");
            }
        },
        voiceList: {
            type: Array,
            value: [],
            observer: function(e, t) {
                e && this._init("essay");
            }
        },
        website: {
            type: String,
            value: "",
            observer: function(e, t) {
                e && this._init("essay");
            }
        },
        webtitle: {
            type: String,
            value: "",
            observer: function(e, t) {
                e && this._init("essay");
            }
        },
        selectType: {
            type: Number,
            value: 1,
            observer: function(e, t) {
                3 != e && 6 != e && 9 != e && 10 != e && 0 != e || this.setData({
                    choice: []
                });
            }
        },
        optionType: {
            type: Number,
            value: 4
        },
        page: {
            type: String,
            value: "question"
        },
        qsId: {
            type: Number,
            value: null
        },
        evalRecord: {
            type: Object,
            value: {
                eval_voice_id: 0,
                voice_url: "",
                voice_duration: "",
                score: ""
            },
            observer: function(e, t) {
                e && this._init("eval");
            }
        },
        remark: {
            type: Array,
            value: []
        },
        colorScheme: {
            type: String,
            value: "user"
        }
    },
    data: {
        optionTag: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T" ],
        blankTag: [ "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮", "⑯", "⑰", "⑱", "⑲", "⑳" ],
        qsOption: [],
        choice: [],
        essayAnswer: "",
        blankAnswer: [],
        refresh: "off",
        evaluating: !1,
        blankTitle: ""
    },
    attached: function() {},
    ready: function() {
        5 == this.selectType && this._init("blank");
    },
    methods: {
        _init: function(t) {
            if ("essay" == t) {
                var a = this.data.voiceList.map(function(t) {
                    var a = {};
                    return a.voice_url = e.config.voicePrefix + t.voice, a.voice_duration = t.voice_duration, 
                    a.voice = t.voice, a;
                }), i = {
                    content: this.data.answerContent,
                    picture_list: this._addFileFront("picture", this.data.pictureList),
                    video_list: this._addFileFront("video", this.data.videoList),
                    voice_list: a,
                    website: this.data.website,
                    web_title: this.data.webtitle
                };
                this.setData({
                    essayAnswer: i,
                    refresh: "on"
                });
            }
            if ("eval" == t && (this.data.evalRecord.voice_url && (0 != this.data.evalRecord.voice_url.indexOf("https://") && (this.data.evalRecord.voice_url = e.config.voicePrefix + this.data.evalRecord.voice_url), 
            this.data.evalRecord.score = parseInt(this.data.evalRecord.score)), this.setData({
                evalRecord: this.data.evalRecord
            })), "qsList" == t) {
                var r = [];
                if (this.data.qsList) try {
                    r = JSON.parse(this.data.qsList);
                } catch (e) {
                    wx.showToast({
                        title: "解析文本错误"
                    });
                }
                this.setData({
                    qsOption: r
                });
            }
            if ("answer" == t) {
                var s = this.data.answerContent, n = this.data.qsList;
                try {
                    s = JSON.parse(this.data.answerContent);
                } catch (e) {
                    s = [];
                }
                try {
                    n = JSON.parse(this.data.qsList);
                } catch (e) {
                    n = [];
                }
                for (var o = [], c = 0; c < n.length; c++) o.push("");
                for (var l = 0; l < s.length; l++) o[this.data.optionTag.indexOf(s[l])] = s[l];
                this.setData({
                    choice: o
                });
            }
            if ("blank" == t) {
                var h = [], d = [];
                try {
                    d = JSON.parse(this.data.answerContent);
                } catch (e) {
                    d = [];
                }
                if ("result" == this.data.page) {
                    try {
                        h = JSON.parse(this.data.answerContent);
                    } catch (e) {
                        h = [];
                    }
                    for (var v = 0; v < h.length; v++) h[v] && (h[v] = h[v].trim().replace(/\s+/g, " ").trim());
                    this.setData({
                        choice: h
                    });
                } else {
                    try {
                        h.length = JSON.parse(this.data.standardAnswer).length;
                    } catch (e) {
                        h = [];
                    }
                    for (var u = 0; u < h.length; u++) h[u] = "";
                    if (d.length > 0) for (var p = 0; p < h.length; p++) d[p] && (h[p] = d[p]);
                    this.setData({
                        choice: h
                    });
                }
            }
        },
        previewImg: function(e) {
            var t = e.currentTarget.dataset.url;
            wx.previewImage({
                current: t,
                urls: [ t ]
            });
        },
        radioChange: function(e) {
            var t = "", a = !1;
            e.detail.value && (t = JSON.stringify([ e.detail.value ]), a = !0);
            var i = {
                index: this.data.index,
                chapter: this.data.chapter,
                finish: a,
                answerContent: t
            };
            this.triggerEvent("answer", i);
        },
        checkboxChange: function(e) {
            var t = !1, a = "";
            e.detail.value.length > 0 && (a = JSON.stringify(e.detail.value.sort()), t = !0);
            var i = {
                index: this.data.index,
                chapter: this.data.chapter,
                finish: t,
                answerContent: a
            };
            this.triggerEvent("answer", i);
        },
        blankfocus: function(e) {
            var t = this, a = e.currentTarget.dataset.index;
            t.setData({
                blankTitle: t.data.title.replace(t.data.blankTag[a], "<span style='color:#22dd82;font-weight:600;'>" + t.data.blankTag[a] + "</span>")
            });
        },
        saveTxt: function(e) {
            var t = !1, a = e.currentTarget.dataset.index, i = e.currentTarget.dataset.choice, r = e.currentTarget.dataset.qindex, s = e.currentTarget.dataset.chapter;
            e.detail.value.length > 0 && (i[a] = e.detail.value);
            for (var n = 0; n < i.length; n++) i[n] && (t = !0);
            var o = {
                index: r,
                chapter: s,
                finish: t,
                answerContent: JSON.stringify(i)
            };
            this.triggerEvent("answer", o);
        },
        valueChange: function(e) {
            var t = e.detail.data, a = t.linkList[0], i = !1, r = t.content || "", s = a && a.link ? a.link : "", n = a && a.linkTitle ? a.linkTitle : "", o = t.postImg || [];
            o = o.map(function(e) {
                var t = e;
                return t && t.indexOf("/poster/") > 0 && (t = t.substring(t.indexOf("/poster/") + 8)), 
                t;
            });
            var c = t.postVideo || [];
            c = c.map(function(e) {
                var t = e;
                return t && t.indexOf("/video/") > 0 && (t = t.substring(t.indexOf("/video/") + 7)), 
                t;
            });
            var l = (t.postRecord || []).map(function(e) {
                var t = {}, a = e.voiceName;
                return a && a.indexOf("voice/") > 0 && (a = a.substring(a.indexOf("voice/") + 6)), 
                t.voice = a, t.voice_duration = e.voice_duration, t;
            });
            ("" != r || o.length > 0 || c.length > 0 || l.length > 0 || "" != s || "" != n) && (i = !0);
            var h = {
                index: this.data.index,
                chapter: this.data.chapter,
                finish: i,
                answerContent: r,
                picture_list: o,
                video_list: c,
                voice_list: l,
                website: s,
                web_title: n
            };
            this.setData({
                refresh: "off"
            }), this.triggerEvent("answer", h);
        },
        _addFileFront: function(t, a) {
            for (var i = [], r = 0; r < a.length; r++) switch (t) {
              case "picture":
                0 == a[r].indexOf("https") ? i.push(a[r]) : i.push(e.config.hybridPicturePrefix + a[r]);
                break;

              case "video":
                0 == a[r].indexOf("https") ? i.push(a[r]) : i.push(e.config.videoPrefix + a[r]);
                break;

              case "voice":
                0 == a[r].indexOf("https") ? i.push(a[r]) : i.push(e.config.voicePrefix + a[r]);
            }
            return i;
        },
        fetchScore: function(e) {
            var i = this, r = this.data.qsId, s = this.data.index, n = this.data.chapter, o = "2", c = {
                index: s,
                chapter: n,
                finish: o,
                evalRecord: {
                    eval_voice_id: "",
                    voice_url: e.detail,
                    score: ""
                }
            };
            this.triggerEvent("answer", c), this.setData({
                evaluating: !0
            }), t.fetchQuestionEvalScore({
                question_id: r,
                eval_url: e.detail,
                eval_type: 0
            }, function(t) {
                i.setData({
                    "evalRecord.eval_voice_id": t.eval_id,
                    "evalRecord.score": parseInt(t.score)
                }), t.eval_id && t.score >= 0 && (o = !0), c = {
                    index: s,
                    chapter: n,
                    finish: o,
                    evalRecord: {
                        eval_voice_id: t.eval_id,
                        voice_url: e.detail,
                        score: parseInt(t.score)
                    }
                }, i.triggerEvent("answer", c);
            }, function(e) {
                424 === e.errMsg ? wx.showModal({
                    title: "提示",
                    content: "语音评测额度不足，请联系管理员",
                    showCancel: !1,
                    confirmText: "我知道了"
                }) : a.showError("获取评测结果失败(" + e.errText + ",请重试)", i);
            }, function(e) {
                i.setData({
                    evaluating: !1
                });
            });
        }
    }
});