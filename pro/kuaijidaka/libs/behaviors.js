var t = Behavior({
    behaviors: [],
    properties: {
        duration: {
            type: Number,
            value: 600
        },
        recordLimit: {
            type: Number,
            value: 20
        }
    },
    data: {
        isRecording: !1,
        recordDuration: 0,
        showSetting: !1,
        settingContent: ""
    },
    attached: function() {
        var t = this;
        this.app = getApp();
        var e = this.app.util.getRecorderManager();
        this.app.globalData.isRecording && (this.app.globalData.unexpectedRecordStop = !0, 
        this.app.globalData.recorderManager.stop()), e.onStop(function(e) {
            clearInterval(t.customData.recordingTimer), t.app.globalData.isRecording = !1, t.app.globalData.unexpectedRecordStop ? t.app.globalData.unexpectedRecordStop = !1 : t.recoderOnStop(e);
        }), e.onError(function(e) {
            var a = t.app, r = (a.service, a.util), o = t;
            t.app.globalData.isRecording = !1, e.errMsg.indexOf("auth") < 0 ? r.showError("录音失败(" + e.errMsg + ")，请重试", o) : wx.getSetting({
                success: function(t) {
                    o.setData({
                        settingContent: "您已拒绝授权，所以无法录音",
                        showSetting: !0
                    });
                }
            }), clearInterval(t.customData.recordingTimer), t.setData({
                isRecording: !1,
                showRecorderBox: !1
            });
        }), e.onPause(function() {
            t.app.globalData.recordManagerPause = !0;
        });
    },
    detached: function() {
        this.stopRecord();
    },
    methods: {
        startRecord: function() {
            var t = this;
            this.app.util.stopVoicePlay();
            var e = this.app.globalData.recorderManager;
            this.setData({
                recordDuration: 0,
                isRecording: !0,
                recordText: "点击结束录音"
            }), this.app.globalData.isRecording = !0, this.app.util.stopVideoPlay(), this.app.util.stopVoicePlay(!0), 
            e.start({
                duration: 1e3 * this.data.duration,
                sampleRate: 16e3,
                numberOfChannels: 1,
                encodeBitRate: 32e3,
                format: "mp3"
            }), wx.setKeepScreenOn({
                keepScreenOn: !0
            });
            var a = 0;
            this.customData.recordingTimer = setInterval(function() {
                a % 2 == 0 && t.setData({
                    recordDuration: Math.ceil(a / 2)
                }), a >= 2 * t.data.duration && e.stop(), a += 1;
            }, 500);
        },
        stopRecord: function() {
            if (this.app.globalData.isRecording) {
                if (0 === this.data.recordDuration) return void getApp().util.showError("请录制一秒以上的语音", this);
                this.app.globalData.recorderManager.stop(), wx.setKeepScreenOn({
                    keepScreenOn: !1
                });
            }
        },
        settingConfirm: function() {
            this.setData({
                showSetting: !1
            });
        }
    }
});

module.exports = {
    recorder: t
};