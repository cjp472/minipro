var a = getApp(), o = (a.service, a.util);

Component({
    properties: {
        colorScheme: {
            type: String,
            value: "user"
        },
        page: {
            type: String,
            value: ""
        },
        voice: {
            type: Object,
            value: {},
            observer: function(a, o) {
                if (!a.voice_url) return !1;
                a.isPlaying ? this._startPlay() : this._stopPlay();
            }
        },
        currentAudioType: {
            type: String,
            value: ""
        }
    },
    data: {
        isWaiting: !1,
        isPlaying: !1,
        currentUrl: "",
        duration: "",
        currentTime: "00:00",
        durations: 0,
        currentTimes: 0,
        targetPosition: 0,
        currentPosition: 0,
        customData: {
            audioCtx: null,
            sliderRect: {
                left: 10,
                width: 300
            },
            audioTimes: 0
        },
        colorData: {
            audioBgColor: "",
            deepColour: "",
            sliderColour: ""
        },
        hideController: !1,
        showGlobalAudio: !1
    },
    ready: function() {
        if ("admin" == this.data.colorScheme) {
            var t = {
                audioBgColor: "#6bdbcd",
                deepColour: "#44baab",
                sliderColour: "#9bf6eb"
            };
            this.setData({
                colorData: t
            });
        } else {
            var r = {
                audioBgColor: "#22dd82",
                deepColour: "#16c786",
                sliderColour: "#9bf6eb"
            };
            this.setData({
                colorData: r
            });
        }
        if ("user" == this.data.colorScheme && a.globalData.loginUser.audio_color) {
            var i = a.globalData.loginUser.audio_color, e = new o.Color(), n = {
                audioBgColor: e.RgbToHex(i) || "#22dd82",
                deepColour: e.getDarkColor(e.RgbToHex(i), .11) || "#16c786",
                sliderColour: e.getLightColor(e.RgbToHex(i), .5) || "#9bf6eb"
            };
            this.setData({
                colorData: n
            });
        }
    },
    methods: {
        toggleAudio: function() {
            this.data.isPlaying ? this._stopPlay() : this._startPlay(0);
        },
        seekAudio: function(o) {
            var t = a.globalData.backgroundAudioManager;
            if (t.duration) {
                var r = Math.round(o.detail.value / 100 * t.duration);
                t.currentTime = r, t.seek(r);
            }
        },
        cancelBubble: function() {
            console.log("cancleBubble");
        },
        _startPlay: function(t) {
            a.globalData.currentAudioType = this.data.page, this.triggerEvent("audioType"), 
            this.setData({
                showGlobalAudio: !0,
                isPlaying: !0
            }), o.pauseVoicePlay(), o.stopVideoPlay();
            var r = this.data.voice, i = this._silkToMP3(r.voice_url);
            if (a.globalData.backgroundAudioManager && a.globalData.backgroundAudioManager.src) if (a.globalData.backgroundAudioManager.src != i) {
                a.globalData.backgroundAudioManager = wx.getBackgroundAudioManager();
                var e = a.globalData.backgroundAudioManager;
                e.title = r.voice_name || "背景音频", e.src = i, e.play();
            } else a.globalData.backgroundAudioManager.play(); else {
                a.globalData.backgroundAudioManager = wx.getBackgroundAudioManager();
                var n = a.globalData.backgroundAudioManager;
                n.title = r.voice_name || "背景音频", n.src = i, n.play();
            }
            this._registerHandlers();
        },
        _stopPlay: function() {
            console.log("_stopPlay:");
            var o = a.globalData.backgroundAudioManager;
            o && o.pause(), this.setData({
                isPlaying: !1
            });
        },
        _silkToMP3: function(a) {
            if (!a || "string" != typeof a) return "";
            var o = a.lastIndexOf(".");
            return ".silk" === a.slice(o).toLowerCase() ? a.slice(0, o) + ".mp3" : a;
        },
        _registerHandlers: function() {
            var t = this;
            console.log("_registerHandlers");
            var r = this.data.voice, i = a.globalData.backgroundAudioManager;
            i.onWaiting(function() {
                t.setData({
                    isWaiting: !0
                });
                var a = i.currentTime, o = i.duration || r.voice_duration;
                t.triggerEvent("update", {
                    duration: t.data.duration,
                    currentPosition: t.data.currentPosition,
                    currentTime: t.data.currentTime,
                    durations: Math.floor(o),
                    currentTimes: Math.floor(a),
                    isWaiting: !0
                });
            }), i.onCanplay(function() {
                console.log("onCanplay");
                var a = i.currentTime, o = i.duration || r.voice_duration;
                t.setData({
                    duration: t._formatTime(o),
                    durations: Math.floor(o),
                    isWaiting: !1
                }), t.triggerEvent("update", {
                    duration: t.data.duration,
                    currentPosition: t.data.currentPosition,
                    currentTime: t.data.currentTime,
                    durations: Math.floor(o),
                    currentTimes: Math.floor(a),
                    isWaiting: !1
                });
            }), i.onPlay(function() {
                console.log("onPlay"), t.setData({
                    isWaiting: !1
                }), t.triggerEvent("startPlay", r);
            }), i.onStop(function(a) {
                console.log("onStop:"), t.setData({
                    isPlaying: !1
                }), t.triggerEvent("stopPlay", r);
            }), i.onPause(function(a) {
                console.log("onPause"), t.setData({
                    isPlaying: !1
                }), t.triggerEvent("stopPlay", r);
            }), i.onError(function(a) {
                console.log("onError:", JSON.stringify(a)), o.showToast("音频播放失败", "none", 2e3), 
                t._stopPlay();
            }), i.onEnded(function(o) {
                console.log("onEnded:"), t.setData({
                    isPlaying: !1,
                    currentTime: t._formatTime(0),
                    currentPosition: 0
                }), a.globalData.backgroundAudioManager = null, t.triggerEvent("endplay", {
                    voice_url: t.data.voice.voice_url
                });
            }), i.onTimeUpdate(function() {
                var a = i.currentTime, o = i.duration || r.voice_duration;
                t.setData({
                    currentPosition: Math.round(a / o * 100),
                    duration: t._formatTime(o),
                    currentTime: t._formatTime(a),
                    durations: Math.floor(o),
                    currentTimes: Math.floor(a),
                    isWaiting: !1
                }), t.triggerEvent("update", {
                    duration: t.data.duration,
                    currentPosition: t.data.currentPosition,
                    currentTime: t.data.currentTime,
                    durations: Math.floor(o),
                    currentTimes: Math.floor(a),
                    isWaiting: !1
                });
            });
        },
        _next: function() {
            this.triggerEvent("nextplay", {
                voice_url: this.data.voice.voice_url
            });
        },
        _last: function() {
            this.triggerEvent("lastplay", {
                voice_url: this.data.voice.voice_url
            });
        },
        _formatTime: function(a) {
            var o = Math.floor(a || 0), t = Math.floor(o / 60), r = o % 60;
            return t < 10 && (t = "0" + t), r < 10 && (r = "0" + r), t + ":" + r;
        },
        toggleShow: function() {
            this.setData({
                hideController: !this.data.hideController
            });
        }
    }
});