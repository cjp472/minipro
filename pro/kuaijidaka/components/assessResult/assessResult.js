var e = getApp().util;

Component({
    properties: {
        isChinese: {
            type: Boolean,
            value: !1
        },
        scoreData: {
            type: Object,
            value: {},
            observer: function(e, t) {
                e && this._init();
            }
        },
        translate: {
            type: String,
            value: null,
            observer: function(e, t) {
                var a = this;
                e !== t && a._init();
            }
        },
        assessFail: {
            type: Boolean,
            value: !1
        },
        page: {
            type: String,
            value: "home"
        },
        userVoice: {
            type: Object,
            value: {
                voice: "",
                voice_url: "",
                voice_duration: 0,
                speedStyle: 0,
                doPlaying: !1
            }
        },
        theme: {
            type: String,
            value: ""
        },
        colorScheme: {
            type: String,
            value: "user"
        }
    },
    data: {
        words: "",
        voice: "",
        notes: "",
        score: 0,
        pronunciation: 0,
        fluency: 0,
        integrity: 0
    },
    methods: {
        _init: function() {
            var t = this, a = void 0, i = void 0, n = void 0, o = t.data.scoreData;
            "detail" === t.data.page ? (i = t.data.translate, a = t.data.userVoice) : (i = JSON.parse(t.data.translate).notes, 
            a = {
                voice_url: t.data.scoreData.voice_url,
                voice_duration: 0
            }), n = e.getEvalResultHTML(JSON.parse(o.words), o.origin_text, o.sample ? "en" : "zh"), 
            t.setData({
                words: n,
                voice: a,
                notes: i,
                score: parseInt(o.score),
                pronunciation: parseInt(o.pronunciation),
                fluency: parseInt(o.fluency),
                integrity: parseInt(o.integrity)
            });
        },
        assessAgain: function() {
            this.triggerEvent("assessAgain", {}, {
                bubbles: !0,
                composed: !0
            });
        }
    }
});