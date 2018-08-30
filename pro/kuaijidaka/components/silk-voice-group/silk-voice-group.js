Component({
    relations: {
        "./silk-voice/silk-voice": {
            type: "child",
            linked: function(e) {
                console.log("in parent linked:");
            },
            linkChanged: function(e) {},
            unlinked: function(e) {}
        }
    },
    properties: {
        voices: {
            type: Array,
            value: []
        },
        theme: {
            type: String,
            value: ""
        },
        applyType: {
            type: String,
            value: ""
        }
    },
    data: {
        playingVoice: {}
    },
    methods: {
        onEndPlay: function(e) {
            console.log("onEndPlay parent");
            var n = this.data.voices, i = e.detail.voice, t = n.findIndex(function(e) {
                return e.voice_url === i.voice_url;
            });
            t + 1 < n.length ? (console.log("auto play next"), this.setData({
                playingVoice: n[t + 1]
            })) : this.setData({
                playingVoice: {}
            });
        },
        onStopPlay: function(e) {
            this.setData({
                playingVoice: {}
            });
        }
    }
});