var t = getApp(), o = (t.service, t.util);

Component({
    properties: {
        voice: {
            type: Object,
            value: {}
        },
        isPlaying: {
            type: Boolean,
            value: !1
        },
        voiceStatus: {
            type: Object,
            value: {}
        },
        colorScheme: {
            type: String,
            value: "user"
        },
        size: {
            type: String,
            value: "MIN"
        }
    },
    data: {
        duration: "",
        currentPosition: 0,
        currentTime: "00:00",
        colorData: {
            audioBgColor: "",
            deepColour: "",
            sliderColour: ""
        }
    },
    ready: function() {
        var a = this.data.voice.voice_avatar;
        if (a && 0 != a.indexOf("https://") && 0 != a.indexOf("http://") && (a = t.config.hybridPicturePrefix + a, 
        this.setData({
            duration: this._formatTime(audioCtx.duration),
            "voice.voice_avatar": a
        })), "admin" == this.data.colorScheme) {
            var e = {
                audioBgColor: "#6bdbcd",
                deepColour: "#44baab",
                sliderColour: "#9bf6eb"
            };
            this.setData({
                colorData: e
            });
        } else {
            var i = {
                audioBgColor: "#22dd82",
                deepColour: "#16c786",
                sliderColour: "#9bf6eb"
            };
            this.setData({
                colorData: i
            });
        }
        if ("user" == this.data.colorScheme && t.globalData.loginUser.audio_color) {
            var r = t.globalData.loginUser.audio_color, l = new o.Color(), s = {
                audioBgColor: l.RgbToHex(r) || "#22dd82",
                deepColour: l.getDarkColor(l.RgbToHex(r), .11) || "#16c786",
                sliderColour: l.getLightColor(l.RgbToHex(r), .5) || "#9bf6eb"
            };
            this.setData({
                colorData: s
            });
        }
    },
    methods: {
        toggleAudio: function() {
            this.data.isPlaying ? this._stopPlay() : this._startPlay(0);
        },
        _startPlay: function(t) {
            var o = this;
            this.triggerEvent("playAudio", this.data.voice), setTimeout(function() {
                o.startPlay = !0;
            }, 200);
        },
        _stopPlay: function() {
            this.startPlay && this.triggerEvent("stopAudio", this.data.voice);
        }
    }
});