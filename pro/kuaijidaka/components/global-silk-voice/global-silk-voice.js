var t = getApp(), e = (t.service, t.util);

Component({
    properties: {
        voice: {
            type: Object,
            value: {}
        },
        size: {
            type: String,
            value: "normal"
        },
        theme: {
            type: String,
            value: ""
        },
        isPlaying: {
            type: Boolean,
            value: !1
        },
        voiceStatus: {
            type: Object,
            value: {}
        }
    },
    data: {},
    detached: function() {
        console.log("silk voice detached"), e.stopVoicePlay();
    },
    methods: {
        toggleAudio: function() {
            this.data.isPlaying ? this._stopPlay() : this._startPlay(0);
        },
        _startPlay: function(t) {
            var e = this;
            this.triggerEvent("playAudio", this.data.voice), setTimeout(function() {
                e.startPlay = !0;
            }, 200);
        },
        _stopPlay: function() {
            this.startPlay && this.triggerEvent("stopAudio", this.data.voice);
        }
    }
});