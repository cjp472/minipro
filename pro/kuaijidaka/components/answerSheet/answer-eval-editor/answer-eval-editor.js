var e = getApp(), t = e.service, a = e.util, o = require("../../../libs/behaviors").recorder;

Component({
    behaviors: [ o ],
    properties: {
        evalRecord: {
            type: Object,
            value: {
                eval_voice_id: 0,
                voice_url: "",
                voice_duration: "",
                score: ""
            },
            observer: function(e, t) {
                e && this.init();
            }
        },
        evaluating: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        recordPlaying: !1,
        recordText: "点击开始录音"
    },
    attached: function() {
        this.init();
    },
    methods: {
        init: function() {
            this.setData({
                recordText: this.data.evalRecord.voice_url ? "重录" : this.data.isRecording ? "点击结束录音" : "点击开始录音",
                recordPlaying: !1
            }), this.customData = {
                evalRecordContext: a.getAudioCtx(new Date().getTime()),
                recordingTimer: null
            };
        },
        recoderOnStop: function(e) {
            this.customData.evalRecordContext.src = e.tempFilePath, this.data.evalRecord.voice_url = e.tempFilePath, 
            this.setData({
                isRecording: !1,
                recordText: "重录"
            }), this.uploadRecorder(this.data.evalRecord);
        },
        uploadFailRecorder: function() {
            var e = this;
            a.showToast("上传中"), t.uploadMp3(this.data.evalRecord.voice_url, function(t) {
                a.hideToast(), e.data.evalRecord.voiceName = t, e.data.evalRecord.success = !0, 
                e.triggerEvent("fetchScore", e.data.evalRecord.voiceName);
            }, function(t) {
                a.hideToast(), e.data.evalRecord.success = !1, a.showError("上传语音失败:" + t.errMsg, e);
            });
        },
        uploadRecorder: function(e) {
            var o = this;
            a.showToast("上传中"), t.uploadMp3(e.voice_url, function(t) {
                a.hideToast(), e.voiceName = t, e.success = !0, o.triggerEvent("fetchScore", o.data.evalRecord.voiceName);
            }, function(t) {
                a.hideToast(), e.success = !1, o.setData({
                    evalRecord: o.data.evalRecord
                });
            });
        },
        recordAgain: function() {
            var e = this;
            this.customData.evalRecordContext && this.pauseRecordAudio(), this.setData({
                "evalRecord.voice_url": "",
                recordPlaying: !1,
                "evalRecord.score": null,
                recordText: "点击一下开始录音"
            }, function() {
                e.startRecord();
            });
        },
        playRecordAudio: function() {
            var e = this;
            !this.data.evalRecord.voice_url && this.data.recordPlaying || (this.customData.evalRecordContext.src = this.data.evalRecord.voice_url, 
            setTimeout(function() {
                e.customData.evalRecordContext.startTime = 0, e.customData.evalRecordContext.play(), 
                e.setData({
                    recordPlaying: !0
                });
            }, 100), this.customData.evalRecordContext.onEnded(function() {
                e.setData({
                    recordPlaying: !1
                });
            }));
        },
        pauseRecordAudio: function() {
            (this.data.evalRecord.voice_url || this.data.recordPlaying) && (this.customData.evalRecordContext.stop(), 
            this.setData({
                recordPlaying: !1
            }));
        }
    }
});