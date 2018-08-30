var e = getApp(), t = e.util;

e.service;

Component({
    properties: {
        voice: {
            type: Object,
            value: {}
        },
        apply: {
            type: String,
            value: ""
        },
        eval_voice: {
            type: Object,
            value: {},
            observer: function(i, a) {
                if (i && i.words) {
                    try {
                        i.words = e.util.getEvalResultHTML(JSON.parse(i.words), i.origin_text, i.sample ? "en" : "zh");
                    } catch (e) {
                        t.log(e);
                    }
                    this.setData({
                        evalVoiceFormatted: i
                    });
                }
            }
        },
        colorScheme: {
            type: String,
            value: "user"
        },
        prepareToPlay: {
            type: String,
            value: "",
            observer: function(e, t) {
                e === this.data.voice.voice_url && (this._startPlay(0), this.triggerEvent("clearPrepareToPlay"));
            }
        },
        size: {
            type: String,
            value: "MIN"
        },
        readIndex: {
            type: Number,
            value: NaN
        }
    },
    data: {
        isWaiting: !1,
        isPlaying: !1,
        duration: "",
        secondDuration: "",
        currentSecond: "",
        currentTime: "00:00",
        sliderHandlePosition: 0,
        app: null,
        audioCtx: null,
        audioCtxID: 0,
        timer: 0,
        sliderRect: {
            left: 10,
            width: 300
        },
        hasPlayed: !1
    },
    attached: function() {
        this.data.app = getApp();
    },
    ready: function() {
        this._getSliderRect();
        var t = this.data.voice.voice_avatar;
        t && 0 != t.indexOf("https://") && 0 != t.indexOf("http://") && (t = e.config.hybridPicturePrefix + t, 
        this.setData({
            "voice.voice_avatar": t
        }));
    },
    detached: function() {
        console.log("silk voice detached"), this.data.app.util.stopVoicePlay();
    },
    methods: {
        startPlay: function() {
            this.data.isPlaying || this._startPlay(0);
        },
        stopPlay: function() {
            this.data.isPlaying && this._stopPlay();
        },
        onClickVoice: function() {
            this.data.isPlaying ? this._stopPlay() : this._startPlay(0);
        },
        seekAudioEnd: function(e) {
            var t = this.data.sliderRect, i = this._getAudioCtx(), a = (e.changedTouches[0].clientX - t.left) / t.width * i.duration;
            i.seek(a);
        },
        seekAudioSlider: function(e) {
            this._getAudioCtx().seek(e.detail.value);
        },
        _startPlay: function(e) {
            var i = this.data, a = i.app, o = i.voice, n = this._silkToMP3(o.voice_url), r = this._getAudioCtx();
            t.stopVideoPlay(), e || a.util.pauseVoicePlay(!0), this.setData({
                isPlaying: !0
            }), r.src !== n ? (this._registerHandlers(), r.src = n, e && (r.startTime = e), 
            r.autoplay = !0) : e ? r.seek(e) : r.play(), console.log("_startPlay:", n);
        },
        _stopPlay: function() {
            console.log("_stopPlay:"), this.data.audioCtx && this.data.audioCtx.pause();
        },
        _silkToMP3: function(e) {
            if (!e || "string" != typeof e) return "";
            var t = e.lastIndexOf(".");
            return ".silk" === e.slice(t).toLowerCase() ? e.slice(0, t) + ".mp3" : e;
        },
        _toggleLoading: function(e) {
            this.setData({
                isWaiting: e
            });
        },
        _KeepReadScreen: function(e) {
            "read" === this.data.apply && wx.setKeepScreenOn({
                keepScreenOn: e
            });
        },
        _registerHandlers: function() {
            var e = this, t = this.data, i = t.audioCtx;
            t.voice;
            i.onError(function(t) {
                console.log("onError:", JSON.stringify(t)), e._stopPlay(), e._KeepReadScreen(!1);
            }), i.onPause(function(t) {
                console.log("onPause"), e.setData({
                    isPlaying: !1
                }), e._KeepReadScreen(!1);
            }), i.onStop(function(t) {
                console.log("onStop:"), e.setData({
                    isPlaying: !1
                }), e._KeepReadScreen(!1);
            }), i.onEnded(function(t) {
                console.log("onEnded child:", e.data.voice.voice_url), e.setData({
                    isPlaying: !1,
                    "voice.hasPlayed": !0,
                    currentSecond: 0,
                    currentTime: e._formatTime(0),
                    sliderHandlePosition: 0,
                    hasPlayed: !0
                }), e.triggerEvent("endplay", {
                    voice_url: e.data.voice.voice_url,
                    readIndex: e.data.readIndex
                }), e._KeepReadScreen(!1);
            }), i.onWaiting(function() {
                console.log("onWaiting"), e._toggleLoading(!0);
            }), i.onPlay(function() {
                console.log("onPlay"), e.setData({
                    isWaiting: !1,
                    isPlaying: !0
                }), e._KeepReadScreen(!0);
            }), i.onTimeUpdate(function() {
                console.log("onTimeUpdate"), e.setData({
                    duration: e._formatTime(i.duration),
                    secondDuration: Math.floor(i.duration),
                    currentSecond: Math.floor(i.currentTime),
                    currentTime: e._formatTime(i.currentTime),
                    sliderHandlePosition: "user-submit" === e.data.apply || "read" === e.data.apply ? 0 : e._getSliderPosition(),
                    isWaiting: !1
                });
            }), i.onSeeked(function(e) {
                console.log("onSeeked:", i, e), i.play();
            });
        },
        _getAudioCtx: function() {
            var e = this.data;
            return e.audioCtx && !e.audioCtx.destroied || (console.log("create audio"), e.audioCtx = null, 
            e.audioCtxID = new Date().getTime(), e.audioCtx = e.app.util.getAudioCtx(e.audioCtxID)), 
            e.audioCtx;
        },
        _getSliderRect: function() {
            var e = this.data;
            wx.createSelectorQuery && wx.createSelectorQuery().in(this).select(".slider").boundingClientRect(function(t) {
                e.sliderRect = t;
            }).exec();
        },
        _getSliderPosition: function() {
            var e = this.data, t = e.audioCtx, i = e.sliderRect;
            return t.currentTime / t.duration * i.width;
        },
        _formatTime: function(e) {
            var t = Math.floor(e), i = Math.floor(t / 60), a = t % 60;
            return i < 10 && (i = "0" + i), a < 10 && (a = "0" + a), i + ":" + a;
        }
    }
});