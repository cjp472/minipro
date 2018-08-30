var e = require("../../../libs/behaviors").recorder, t = getApp(), o = t.service, a = t.util;

Component({
    behaviors: [ e ],
    properties: {
        evalContent: {
            type: Object,
            value: {}
        },
        wantToSubmit: {
            type: String,
            value: "off",
            observer: function(e) {
                "on" === e && this.ifToSubmit();
            }
        },
        applyType: {
            type: String,
            value: ""
        },
        showRecordBox: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        recordPlaying: !1,
        recorderUrl: "",
        isRecording: !1,
        evalRecord: {
            voice_url: "",
            voice_duration: ""
        },
        innerAudioCurrent: 0,
        innerAudioDuration: 0
    },
    created: function() {
        this.customData = {
            evalRecordContext: {},
            realDuration: 0
        };
    },
    methods: {
        recoderOnStop: function(e) {
            this.setData({
                "evalRecord.voice_url": e.tempFilePath,
                isRecording: !1
            }), this.customData.realDuration = parseInt(e.duration / 1e3), this.uploadRecorder(this.data.evalRecord), 
            this.triggerEvent("recorderStop", {
                bubbles: !0,
                composed: !0
            });
        },
        reupload: function() {
            var e = this;
            a.showToast("上传中"), o.uploadMp3(this.data.evalRecord, function(t) {
                e.data.evalRecord.voiceName = t, e.data.evalRecord.success = !0;
            }, function(t) {
                a.hideToast(), e.data.evalRecord.success = !1, a.showError("上传语音失败:" + t.errMsg, e);
            }, function() {
                a.hideToast(), e.setData({
                    evalRecord: e.data.evalRecord
                });
            });
        },
        uploadRecorder: function(e) {
            var t = this;
            o.uploadMp3(e.voice_url, function(t) {
                e.voiceName = t, e.success = !0;
            }, function(t) {
                e.success = !1;
            }, function() {
                "on" === t.data.wantToSubmit && t.ifToSubmit();
            });
        },
        recordAgain: function() {
            var e = this;
            this.setData({
                "evalRecord.voice_url": "",
                recordPlaying: !1
            }, function() {
                e.startRecord(), e.customData.evalRecordContext = {};
            }), this.triggerEvent("recorderStart", {
                bubbles: !0,
                composed: !0
            });
        },
        playRecordAudio: function() {
            var e = this;
            if (this.data.evalRecord.voice_url) {
                var t = this.customData.evalRecordContext;
                t.src || ((t = a.getAudioCtx(new Date().getTime())).src = this.data.evalRecord.voice_url, 
                t.onPlay(function() {
                    e.setData({
                        recordPlaying: !0,
                        innerAudioCurrent: 0,
                        innerAudioDuration: 0
                    });
                }), t.onEnded(function() {
                    e.setData({
                        recordPlaying: !1
                    });
                }), t.onTimeUpdate(function() {
                    e.setData({
                        innerAudioCurrent: Math.round(t.currentTime),
                        innerAudioDuration: Math.round(t.duration)
                    });
                }), t.onError(function(t) {
                    a.log(t), e.setData({
                        recordPlaying: !1
                    });
                }), this.customData.evalRecordContext = t), t.play();
            }
        },
        pauseRecordAudio: function() {
            this.data.evalRecord.voice_url && (this.setData({
                recordPlaying: !1
            }), this.customData.evalRecordContext.pause());
        },
        ifToSubmit: function() {
            var e = this, t = function() {
                e.triggerEvent("cancelSubmit", {}, {
                    bubbles: !0,
                    composed: !0
                });
            };
            if (this.setData({
                evalRecord: this.data.evalRecord
            }), !1 === this.data.evalRecord.success) return a.showError("请重传失败的语音后再提交打卡", this), 
            void t();
            if (void 0 !== this.data.evalRecord.voiceName || void 0 !== this.data.evalRecord.success || !this.data.evalRecord.voice_url) {
                if (!this.data.evalRecord.voice_url) return this.data.isRecording ? (a.showError("请保存录音后提交打卡", this), 
                void t()) : (a.showError("请录音后提交打卡", this), void t());
                var o = [ {
                    voice: this.data.evalRecord.voiceName,
                    voice_duration: this.customData.realDuration
                } ];
                this.triggerEvent("readyToSubmit", {
                    voiceList: o
                }, {
                    bubbles: !0,
                    composed: !0
                });
            }
        },
        hideRecordBox: function() {
            this.data.isRecording ? wx.showToast({
                title: "请先停止录音",
                icon: "none"
            }) : this.setData({
                showRecordBox: !1
            });
        }
    }
});