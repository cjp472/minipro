var t = getApp(), e = (t.service, t.util);

Component({
    properties: {
        voice: {
            type: Object,
            value: {}
        },
        toPlay: {
            type: Boolean,
            value: !1,
            observer: function(t, e) {
                console.log("toPlay", t), t && this._startPlay();
            }
        },
        size: {
            type: String,
            value: "normal"
        },
        theme: {
            type: String,
            value: ""
        },
        applyType: {
            type: String,
            value: ""
        },
        index: {
            type: Number,
            value: 0
        }
    },
    data: {
        audioCtx: null,
        audioCtxID: 0,
        timer: 0,
        isWaiting: !1,
        speedStyle: 0,
        doPlaying: ""
    },
    attached: function() {},
    detached: function() {
        console.log("silk voice detached"), this._clearTimer(), e.stopVoicePlay();
    },
    methods: {
        onClickVoice: function() {
            this.data.voice;
            "" !== this.data.doPlaying ? this._stopPlay() : this._startPlay();
        },
        _startPlay: function() {
            var t = this.data.voice, i = this._silkToMP3(t.voice_url), o = this._getAudioCtx(i);
            e.stopVoicePlay(!0), this.setData({
                isWaiting: !0
            }), o.src !== i ? (this._registerHandlers(), o.src = i, o.autoplay = !0) : (o.startTime = 0, 
            o.play()), this.setData({
                doPlaying: "play"
            }), console.log("start play voice child:", i);
        },
        _stopPlay: function() {
            console.log("stop play voice child:"), this.setData({
                doPlaying: "",
                isWaiting: !1
            }), this.data.audioCtx && (this.data.audioCtx.stop(), this.triggerEvent("stopplay", {
                voice: this.data.voice
            }));
        },
        _silkToMP3: function(t) {
            if (!t || "string" != typeof t) return "";
            var e = t.lastIndexOf(".");
            return ".silk" === t.slice(e).toLowerCase() ? t.slice(0, e) + ".mp3" : t;
        },
        _toggleLoading: function(t) {
            this.setData({
                isWaiting: t
            });
        },
        _registerHandlers: function() {
            var t = this, e = this.data, i = e.audioCtx, o = e.voice;
            i.onError(function(e) {
                console.log("onError:", JSON.stringify(e)), t._clearTimer(), t._stopPlay();
            }), i.onStop(function(e) {
                t._clearTimer(), console.log("onStop:"), t.setData({
                    speedStyle: 0,
                    doPlaying: ""
                });
            }), i.onEnded(function(e) {
                t._clearTimer(), console.log("onEnd child:", t.data.voice.voice_url), t.setData({
                    speedStyle: 0,
                    doPlaying: "",
                    "voice.hasPlayed": !0
                }), t.triggerEvent("endplay", {
                    voice: o
                });
            }), i.onWaiting(function() {
                console.log("onWaiting"), t._toggleLoading(!0);
            }), i.onCanplay(function() {
                console.log("onCanplay"), t._toggleLoading(!1);
            }), i.onPlay(function() {
                console.log("onCanplay"), t._toggleLoading(!1);
            }), i.onTimeUpdate(function() {
                console.log("onTimeUpdate");
                var e = Math.round(i.currentTime);
                t.data.speedStyle !== e && t.setData({
                    speedStyle: i.paused ? 0 : e,
                    isWaiting: !1
                });
            });
        },
        _getAudioCtx: function(t) {
            var i = this.data;
            return i.audioCtx && !i.audioCtx.destroied || (i.audioCtx = null, i.audioCtxID = new Date().getTime(), 
            i.audioCtx = e.getAudioCtx(i.audioCtxID)), i.audioCtx;
        },
        _clearTimer: function() {
            clearTimeout(this.data.timer);
        },
        delVoice: function() {
            this.triggerEvent("delVoice", {
                index: this.data.index
            }, {
                bubbles: !0,
                composed: !0
            });
        },
        uploadFailRecorder: function() {
            this.triggerEvent("uploadFailRecorder", {
                index: this.data.index
            }, {
                bubbles: !0,
                composed: !0
            });
        }
    }
});