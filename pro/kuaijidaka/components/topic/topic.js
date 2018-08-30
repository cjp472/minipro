var t = getApp(), e = (t.service, t.util), i = {
    NEXT: 0,
    ONCE: 1,
    CIRCLE: 2
};

Component({
    relations: {
        "./globalAudio/globalAudio": {
            type: "child"
        }
    },
    properties: {
        pc_content: {
            type: String,
            value: "",
            observer: function(t, e) {
                t ? this.setData({
                    tooManyTopic: !1,
                    folded: !1
                }, this.init(this.judgeFold)) : this.setData({
                    tooManyTopic: !1,
                    folded: !1
                });
            }
        },
        hybrid_content: {
            type: String,
            value: "",
            observer: function(t, e) {
                t ? this.setData({
                    tooManyTopic: !1,
                    folded: !1
                }, this.init(this.judgeFold)) : this.setData({
                    tooManyTopic: !1,
                    folded: !1
                });
            }
        },
        applyType: {
            type: String,
            value: ""
        },
        title: {
            type: String,
            value: ""
        },
        colorScheme: {
            type: String,
            value: "user"
        },
        playRule: {
            type: Number,
            value: i.NEXT
        },
        foldedTxt: {
            type: String,
            value: "主题"
        },
        currentAudioType: {
            type: String,
            value: ""
        }
    },
    data: {
        contentArray: [],
        videoWidth: 630,
        videoHeight: 480,
        tooManyTopic: !1,
        folded: !1,
        prepareToPlay: "",
        playingAudioSrc: "",
        showAudioControl: !1,
        playingVoice: {
            voice_name: "",
            voice_url: ""
        },
        voiceStatus: {}
    },
    attached: function() {
        this.init();
    },
    ready: function() {
        console.log("on pc-theme ready"), this.judgeFold();
    },
    methods: {
        judgeFold: function(t) {
            var e = (t = this || t).data.applyType;
            "topic" !== e && "punch-card" !== e && "question" !== e && "call" !== e || wx.createSelectorQuery().in(t).select(".whole-topic").boundingClientRect(function(e) {
                e && e.height >= 150 ? t.setData({
                    tooManyTopic: !0,
                    folded: !0
                }) : (t.setData({
                    tooManyTopic: !1,
                    folded: !1
                }), t.triggerEvent("folded", {
                    folded: !1
                }));
            }).exec();
        },
        init: function(e) {
            var i = this, n = void 0, o = this.data.contentArray, a = function(t) {
                return t.indexOf("https://") < 0 && t.indexOf("http://") < 0;
            };
            switch (this.data.applyType) {
              case "topic":
              case "punch-card":
              case "eval-edit":
                n = 690, 690 / 850;
                break;

              case "inform-pop-up":
                n = 540, 540 / 850;
                break;

              default:
                n = 630, 630 / 850;
            }
            if (this.data.pc_content) {
                try {
                    o = JSON.parse(this.data.pc_content);
                } catch (t) {
                    wx.showToast({
                        title: "解析主题文本错误"
                    });
                }
                o = o.map(function(e, i) {
                    if ("picture" === e.type || "qrcode" === e.type) e.content[0].picture_width ? (e.content[0].editImg = !0, 
                    e.content[0].editedWidth = parseInt(e.content[0].picture_width) > n ? n : parseInt(e.content[0].picture_width), 
                    e.content[0].editedHeight = parseInt(e.content[0].picture_height) * e.content[0].editedWidth / parseInt(e.content[0].picture_width)) : (e.content[0].editImg = !1, 
                    e.content[0].pictureMaxWidth = n), a(e.content[0].picture_url) && (e.content[0].picture_url = t.config.hybridPicturePrefix + e.content[0].picture_url); else if ("richText" === e.type) {
                        e.content[0] = function(t) {
                            return t = t.replace(/\\/g, "%"), unescape(t);
                        }(e.content[0]).replace(/<s>/g, "<del>").replace(/<s\s/g, "<del ").replace(/<\/s>/g, "</del>").replace(/<u/g, "<ins").replace(/<\/u>/g, "</ins>").replace(/\u2028|\u2029/g, "");
                    } else "video" === e.type ? a(e.content[0].video_url) && (e.content[0].video_url = t.config.videoPrefix + e.content[0].video_url) : "voice" === e.type && a(e.content[0].voice_url) && (e.content[0].voice_url = t.config.hybridVoicePrefix + e.content[0].voice_url);
                    return e;
                });
            } else if (this.data.hybrid_content) {
                var c = {};
                try {
                    c = "association-inform" === this.data.applyType ? {
                        hybrid_content: JSON.parse(this.data.hybrid_content)
                    } : JSON.parse(this.data.hybrid_content);
                } catch (t) {
                    wx.showToast({
                        title: "解析主题文本错误"
                    });
                }
                c.hybrid_content && (o = c.hybrid_content.map(function(e) {
                    return "picture" === e.type ? (e.content.editImg = !1, e.content.pictureMaxWidth = n, 
                    e.content.picture_url.indexOf("https://") < 0 && e.content.picture_url.indexOf("http://") < 0 && (e.content.picture_url = t.config.hybridPicturePrefix + e.content.picture_url)) : "video" === e.type ? e.content.video_url.indexOf("https://") < 0 && e.content.video_url.indexOf("http://") < 0 && (e.content.video_url = t.config.videoPrefix + e.content.video_url) : "voice" === e.type && e.content.voice_url.indexOf("https://") < 0 && e.content.voice_url.indexOf("http://") < 0 && (e.content.voice_url = t.config.hybridVoicePrefix + e.content.voice_url), 
                    {
                        type: e.type,
                        content: [ e.content ]
                    };
                }));
            }
            this.setData({
                contentArray: o,
                videoWidth: n,
                videoHeight: 9 * n / 16
            }, function() {
                e && (console.log("fold callback"), e(i));
            });
        },
        previewImage: function(t) {
            var e = this.data.contentArray.filter(function(t) {
                return "picture" === t.type;
            }).map(function(t) {
                return t.content[0].picture_url;
            });
            this.triggerEvent("preview", {}, {
                bubbles: !0,
                composed: !0
            }), wx.previewImage({
                current: t.detail.src,
                urls: e
            });
        },
        previewQr: function(t) {
            var e = this.data.contentArray.filter(function(t) {
                return "qrcode" === t.type;
            }).map(function(t) {
                return t.content[0].picture_url;
            });
            wx.previewImage({
                current: t.detail.src,
                urls: e
            });
        },
        toggleFold: function() {
            !this.data.folded && t.globalData.videoCtx && t.globalData.videoCtx.pause(), this.data.tooManyTopic && (this.setData({
                folded: !this.data.folded
            }), this.data.folded || this.triggerEvent("folded", {
                folded: !1
            }));
        },
        stopOtherAudios: function(t) {
            console.log(t), this.setData({
                playingSrc: t.detail.src
            });
        },
        playEnd: function(t) {
            var n = this.data.playRule, o = this.data.contentArray.filter(function(t) {
                return "voice" === t.type || "recording" === t.type;
            }), a = t.detail.voice_url, c = o.findIndex(function(t) {
                return t.content[0].voice_url === a;
            });
            if (n === i.ONCE) {
                var r = o[c].content[0];
                return r.isPlaying = !1, void this.setData({
                    playingVoice: r,
                    playingSrc: r.voice_url
                });
            }
            if (n === i.NEXT) if (c < o.length - 1) {
                var l = o[c + 1].content[0];
                l.isPlaying = !0, this.setData({
                    playingVoice: l,
                    playingSrc: l.voice_url
                });
            } else e.showToast("已经是最后一个", "none", 2e3);
            if (n === i.CIRCLE) {
                var d = o[c].content[0];
                d.isPlaying = "CIRCLE", this.setData({
                    playingVoice: d,
                    playingSrc: d.voice_url
                });
            }
        },
        playNext: function(t) {
            var i = this.data.contentArray.filter(function(t) {
                return "voice" === t.type || "recording" === t.type;
            }), n = t.detail.voice_url, o = i.findIndex(function(t) {
                return t.content[0].voice_url === n;
            });
            if (o < i.length - 1) {
                var a = i[o + 1].content[0];
                a.isPlaying = !0, this.setData({
                    playingVoice: a
                });
            } else e.showToast("已经是最后一个", "none", 2e3);
        },
        playLast: function(t) {
            this.data.playRule;
            var i = this.data.contentArray.filter(function(t) {
                return "voice" === t.type || "recording" === t.type;
            }), n = t.detail.voice_url, o = i.findIndex(function(t) {
                return t.content[0].voice_url === n;
            });
            if (o > 0) {
                var a = i[o - 1].content[0];
                a.isPlaying = !0, this.setData({
                    playingVoice: a
                });
            } else e.showToast("已经是第一个", "none", 2e3);
        },
        playAudio: function(t) {
            var e = t.detail;
            e.isPlaying = !0, this.setData({
                showAudioControl: !0,
                playingVoice: e
            });
        },
        stopAudio: function(t) {
            var e = t.detail;
            e.isPlaying = !1, this.setData({
                playingVoice: e
            });
        },
        startPlay: function(t) {
            var e = t.detail;
            e.isPlaying = !0, this.setData({
                playingVoice: e
            });
        },
        stopPlay: function(t) {
            var e = t.detail;
            e.isPlaying = !1, this.setData({
                playingVoice: e
            });
        },
        voiceUpdate: function(t) {
            this.setData({
                voiceStatus: t.detail
            });
        },
        setAudioType: function(t) {
            this.triggerEvent("audioType");
        },
        toFold: function() {
            this.setData({
                folded: !1
            }), this.data.folded || this.triggerEvent("folded", {
                folded: !1
            });
        }
    }
});