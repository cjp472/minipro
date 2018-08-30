var a = getApp(), o = (a.service, a.util), t = {
    NEXT: 0,
    ONCE: 1,
    CIRCLE: 2
};

Component({
    properties: {
        voice: {
            type: Object,
            value: {}
        },
        colorScheme: {
            type: String,
            value: "user"
        },
        playingSrc: {
            type: String,
            value: "",
            observer: function(a, o) {
                var t = this.data.voice.voice_url;
                a && o && (a !== t ? this._stopPlay() : this.data.isPlaying || this._startPlay());
            }
        },
        playRule: {
            type: Number,
            value: t.NEXT
        },
        size: {
            type: String,
            value: "MIN"
        },
        applyType: {
            type: String,
            value: ""
        }
    },
    data: {
        isWaiting: !1,
        isPlaying: !1,
        duration: "",
        currentPosition: 0,
        currentTime: "00:00",
        colorData: {
            audioBgColor: "",
            deepColour: "",
            sliderColour: ""
        }
    },
    attached: function() {
        this.customData = {
            audioCtx: null,
            sliderRect: {
                left: 10,
                width: 300
            },
            audioTimes: 0
        };
    },
    ready: function() {
        var t = this.data.voice.voice_avatar;
        if (t && 0 != t.indexOf("https://") && 0 != t.indexOf("http://") && (t = a.config.hybridPicturePrefix + t, 
        this.setData({
            "voice.voice_avatar": t
        })), "admin" == this.data.colorScheme) {
            var i = {
                audioBgColor: "#6bdbcd",
                deepColour: "#44baab",
                sliderColour: "#9bf6eb"
            };
            this.setData({
                colorData: i
            });
        } else {
            var e = {
                audioBgColor: "#22dd82",
                deepColour: "#16c786",
                sliderColour: "#9bf6eb"
            };
            this.setData({
                colorData: e
            });
        }
        if ("user" == this.data.colorScheme && a.globalData.loginUser.audio_color) {
            var r = a.globalData.loginUser.audio_color, n = new o.Color(), s = {
                audioBgColor: n.RgbToHex(r) || "#22dd82",
                deepColour: n.getDarkColor(n.RgbToHex(r), .11) || "#16c786",
                sliderColour: n.getLightColor(n.RgbToHex(r), .5) || "#9bf6eb"
            };
            this.setData({
                colorData: s
            });
        }
    },
    detached: function() {
        console.log("background audio detached");
    },
    methods: {
        toggleAudio: function() {
            this.data.isPlaying ? this._stopPlay() : this._startPlay(0);
        },
        seekAudio: function(a) {
            var o = this._getBackgroundAudioManager();
            if (o.duration) {
                var t = a.detail.value / 100 * o.duration;
                o.seek(t);
            }
        },
        cancelBubble: function() {
            console.log("cancleBubble");
        },
        _startPlay: function(a) {
            var t = this.data.voice, i = this._silkToMP3(t.voice_url), e = this._getBackgroundAudioManager();
            e.title = t.voice_name || "背景音频", this.setData({
                isPlaying: !0
            }), o.pauseVoicePlay(), this.triggerEvent("play", {
                src: t.voice_url
            }), o.stopVideoPlay(), t.voice_url !== e.src || this.customData.audioTimes <= 1 ? (console.log("audioTimes:", this.customData.audioTimes), 
            this._registerHandlers(), e.src = i) : e.currentTime >= e.duration ? (console.log("set audio src"), 
            e.src = i) : (e.currentTime > 0 && (e.startTime = e.currentTime), e.play());
        },
        _stopPlay: function() {
            console.log("_stopPlay:");
            var a = this.customData.audioCtx;
            a && a.pause(), this.setData({
                isPlaying: !1
            });
        },
        _silkToMP3: function(a) {
            if (!a || "string" != typeof a) return "";
            var o = a.lastIndexOf(".");
            return ".silk" === a.slice(o).toLowerCase() ? a.slice(0, o) + ".mp3" : a;
        },
        _registerHandlers: function() {
            var a = this;
            console.log("_registerHandlers");
            this.data.voice;
            var o = this.customData.audioCtx;
            console.log(o);
            o.onWaiting(function() {
                a.setData({
                    isWaiting: !0
                });
            }), o.onCanplay(function() {
                console.log("onCanplay"), a.setData({
                    duration: a._formatTime(o.duration),
                    isWaiting: !1
                });
            }), o.onPlay(function() {
                console.log("onPlay"), a.setData({
                    isWaiting: !1,
                    isPlaying: !0
                });
            }), o.onStop(function(o) {
                console.log("onStop:"), a.setData({
                    isPlaying: !1
                });
            }), o.onPause(function(o) {
                console.log("onPause"), a.setData({
                    isPlaying: !1
                });
            }), o.onError(function(o) {
                console.log("onError:", JSON.stringify(o)), a._stopPlay();
            }), o.onEnded(function(o) {
                a.setData({
                    isPlaying: !1,
                    "voice.hasPlayed": !0,
                    currentTime: a._formatTime(0),
                    currentPosition: 0
                }), a.data.playRule === t.CIRCLE && a._startPlay(), a.triggerEvent("endplay", {
                    voice_url: a.data.voice.voice_url
                });
            }), o.onTimeUpdate(function() {
                var t = o.duration, i = o.currentTime;
                a.setData({
                    duration: a._formatTime(t),
                    currentPosition: Math.round(100 * i / t),
                    currentTime: a._formatTime(i),
                    isWaiting: !1
                });
            });
        },
        _getBackgroundAudioManager: function() {
            var o = this.customData;
            return o.audioTimes += 1, o.audioCtx || (a.globalData.backgroundAudioManager && a.globalData.backgroundAudioManager.src ? o.audioCtx = a.globalData.backgroundAudioManager : (a.globalData.backgroundAudioManager = wx.getBackgroundAudioManager(), 
            o.audioCtx = a.globalData.backgroundAudioManager)), o.audioCtx;
        },
        _formatTime: function(a) {
            var o = Math.floor(a), t = Math.floor(o / 60), i = o % 60;
            return t < 10 && (t = "0" + t), i < 10 && (i = "0" + i), t + ":" + i;
        }
    }
});