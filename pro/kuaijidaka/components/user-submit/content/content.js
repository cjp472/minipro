var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (t[s] = a[s]);
    }
    return t;
}, e = require("../behavior.js"), a = getApp();

a.service, a.util;

Component({
    behaviors: [ e ],
    properties: {
        page: {
            type: String,
            value: "home"
        },
        isdoodle: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        durationFormatted: {
            seconds: 0,
            minutes: 0
        },
        scene: "normal",
        MAX_WORDS: 220,
        contentFormatted: "",
        documentsFormatted: [],
        voicesFormatted: [],
        picturesFormatted: [],
        accuracyRate: 0,
        answer_score: null,
        isAdmin: !1,
        translate: "",
        evalVoiceFormatted: {},
        prepareToPlay: "",
        useOldVideo: !1,
        show_range: !1
    },
    attached: function() {
        this._setupData();
    },
    methods: {
        _setupData: function() {
            var e = a.util.changePictureQuality, s = a.globalData.loginUser.user_id;
            void 0 === this.data.submitData.show_range && (this.data.submitData.show_range = 0), 
            void 0 === this.data.submitData.eval_state && (this.data.submitData.eval_state = 0);
            var i = this.data.submitData, o = i.user_id, r = i.content, n = i.document_list, c = i.voice_list, u = i.picture_list, d = (i.question_count, 
            i.eval_voice), l = i.eval_state, p = i.duration, h = i.pc_content, m = i.show_range, v = i.category, _ = i.answer_pictures, f = i.answer_videos, g = (i.answer_voices, 
            _ ? this._addFileFront("picture", _.split("|")) : []), D = f ? this._addFileFront("video", f.split("|")) : [], y = f ? f.split("|") : [], b = this.formatDuration(p), F = o === s, w = !!l;
            this.setData({
                useOldVideo: a.util.compareVersion(a.globalData.SDKVersion, "1.9.0") < 0
            }), d && (d.score = Math.floor(d.score));
            var O = d || {}, P = 2 === v ? "cardEval" : 1 === v ? "exam" : 1 === l || 3 === l || 4 === l ? "eval" : 2 === l ? "evalChinese" : "normal", x = "detail" !== this.data.page && r.length > this.data.MAX_WORDS ? r.substring(0, this.data.MAX_WORDS) + "..." : r, S = n.map(function(t, e) {
                return {
                    type: t.document_url.substring(t.document_url.lastIndexOf(".") + 1).toLowerCase(),
                    content: [ {
                        url: t.document_url,
                        name: t.document_name
                    } ]
                };
            }), A = c.map(function(e) {
                return t({}, e, {
                    speedStyle: 0,
                    doPlaying: ""
                });
            }), V = u.map(function(t) {
                return e(t, "small");
            });
            if (w && "detail" == this.data.page) {
                var M = "";
                "" !== h && "[]" !== h && (JSON.parse(h).map(function(t, e) {
                    "eval" === t.type && (M = t.content[0].notes);
                }), this.setData({
                    translate: M
                }));
            }
            var R = parseInt(this.data.submitData.choice_correct_count / this.data.submitData.choice_count * 100);
            this.setData({
                self: F,
                show_range: m,
                scene: P,
                eval_state: l,
                contentFormatted: x,
                durationFormatted: b,
                documentsFormatted: S,
                voicesFormatted: A,
                picturesFormatted: V,
                evalVoiceFormatted: O,
                accuracyRate: R,
                isAdmin: 1 !== a.globalData.loginUser.user_type_login,
                answer_score: Number(this.data.submitData.answer_score).toFixed(1),
                essay_pictures: g,
                essay_videos: D,
                essay_voices: y
            });
        },
        endplay: function(t) {
            var e = this, a = this.data.voicesFormatted;
            a.map(function(s, i) {
                t.detail.voice_url === s.voice_url && i < a.length - 1 && e.setData({
                    prepareToPlay: a[i + 1].voice_url
                });
            });
        },
        clearPrepareToPlay: function() {
            this.setData({
                prepareToPlay: ""
            });
        },
        formatDuration: function(t) {
            var e = Math.floor(t / 60);
            return {
                seconds: t - 60 * e,
                minutes: e
            };
        },
        _addFileFront: function(t, e) {
            for (var s = [], i = 0; i < e.length; i++) switch (t) {
              case "picture":
                0 == e[i].indexOf("https") ? s.push(e[i]) : s.push(a.config.hybridPicturePrefix + e[i]);
                break;

              case "video":
                0 == e[i].indexOf("https") ? s.push(e[i]) : s.push(a.config.videoPrefix + e[i]);
                break;

              case "voice":
                0 == e[i].indexOf("https") ? s.push(e[i]) : s.push(a.config.voicePrefix + e[i]);
            }
            return s;
        }
    }
});