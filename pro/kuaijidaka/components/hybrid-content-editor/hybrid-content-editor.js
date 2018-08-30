function t(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var e, o = require("../../libs/behaviors").recorder, i = getApp(), n = i.service, a = i.util;

Component({
    behaviors: [ o ],
    properties: {
        originData: {
            type: Array,
            value: [],
            observer: function(t, e) {
                this.initData();
            }
        },
        applyScene: {
            type: String,
            value: "calendar-theme"
        },
        cancelSubmit: {
            type: String,
            value: "off",
            observer: function(t, e) {
                "on" === t && (this.customData.wantToSubmit = !1, this.setData({
                    cancelSubmit: "off"
                }));
            }
        }
    },
    data: {
        hybridContent: [],
        isToCreate: !0,
        showRecorderBox: !1,
        showLinkBox: !1,
        showDeleteBox: !1,
        saveWord: "保存",
        videoWidth: 560,
        videoHeight: 420
    },
    created: function() {
        this.customData = {
            hybridContent: [],
            upload_file_done: !0,
            wantToSubmit: !1,
            recordingTimer: null,
            confirmDeleteText: "",
            expectedConfirmDeleteText: "删除作业",
            MAX_VIDEO_NUMBER: 3
        };
    },
    attached: function() {
        this.initData();
    },
    methods: (e = {
        initData: function() {
            var t = function(t) {
                return t.indexOf("https://") < 0 && t.indexOf("http://") < 0;
            };
            if ("association-inform" === this.data.applyScene && this.setData({
                saveWord: "确认创建"
            }), this.data.originData.length > 0) {
                var e = this.data.originData.map(function(e) {
                    return "voice" === e.type ? {
                        type: "voice",
                        content: {
                            voice_url: t(e.content.voice_url) ? i.config.hybridVoicePrefix + e.content.voice_url : e.content.voice_url,
                            voice_duration: e.content.voice_duration,
                            isPlaying: !1,
                            speedStyle: 0,
                            voiceName: e.content.voice
                        }
                    } : "video" === e.type ? (t(e.content.video_url) && (e.content.video_url = i.config.videoPrefix + e.content.video_url), 
                    e.oldVideo = !0, e) : "picture" === e.type ? (t(e.content.picture_url) && (e.content.picture_url = i.config.hybridPicturePrefix + e.content.picture_url), 
                    e) : e;
                });
                this.customData.hybridContent = e, this.setData({
                    hybridContent: e,
                    isToCreate: !1
                }), "course-inform" === this.data.applyScene && this.setData({
                    saveWord: "保存"
                });
            } else "course-inform" === this.data.applyScene && this.setData({
                saveWord: "发送通知"
            });
        },
        addText: function() {
            var t = this.customData.hybridContent;
            t.push({
                type: "text",
                content: ""
            }), this.setData({
                hybridContent: t
            });
        },
        valueChange: function(t) {
            var e = t.detail.value, o = t.currentTarget.dataset.index;
            this.customData.hybridContent[o].content = e;
        },
        textBlur: function(t) {
            this.setData({
                hybridContent: this.customData.hybridContent
            });
        },
        addVoice: function() {
            this.setData({
                showRecorderBox: !0
            });
        },
        recoderOnStop: function(t) {
            var e = this.customData.hybridContent;
            e.push({
                type: "voice",
                content: {
                    voice_url: t.tempFilePath,
                    voice_duration: parseInt(t.duration / 1e3),
                    isPlaying: !1,
                    speedStyle: 0
                }
            }), this.setData({
                hybridContent: e,
                isRecording: !1,
                showRecorderBox: !1,
                recordDuration: 0
            });
            var o = e.length;
            this.customData.upload_file_done = !1, this.uploadRecorder(e[o - 1].content);
        },
        uploadRecorder: function(t) {
            var e = this;
            n.uploadMp3(t.voice_url, function(o) {
                t.voice_url = i.config.hybridVoicePrefix + o, t.voiceName = o, t.success = !0, e.setData({
                    hybridContent: e.customData.hybridContent
                });
            }, function(o) {
                a.hideToast(), t.success = !1, e.setData({
                    hybridContent: e.customData.hybridContent
                });
            }, function(t) {
                e.customData.upload_file_done = t.uploadingComplete;
                var o = e.customData.hybridContent.some(function(t) {
                    return !1 === t.content.success;
                });
                t.uploadingComplete && !o && e.customData.wantToSubmit && e.ifToSubmit();
            });
        },
        uploadFailRecorder: function(t) {
            var e = this, o = t.detail.index;
            a.showToast("上传中");
            var r = this.customData.hybridContent;
            n.uploadMp3(r[o].content.voice_url, function(t) {
                r[o].content.voice_url = i.config.hybridVoicePrefix + t, r[o].content.voiceName = t, 
                r[o].content.success = !0, e.setData({
                    hybridContent: r
                });
            }, function(t) {
                a.hideToast(), r[o].content.success = !1, e.setData({
                    hybridContent: r
                }), a.showError("上传语音失败:" + t.errMsg + ",请重试", e);
            }, function(t) {
                e.customData.upload_file_done = t.uploadingComplete, a.hideToast();
            });
        },
        addImage: function() {
            var t = this;
            wx.chooseImage({
                success: function(e) {
                    var o = i.globalData.uploadImageSizeMax, n = [ "png", "jpg", "jpeg", "gif" ], r = !0, s = e.tempFiles.length, c = void 0, u = [];
                    for (c = 0; c < s; c++) {
                        if (e.tempFiles[c].size > 1024 * o * 1024) {
                            a.showError("请上传" + o + "M以下的图片", t), r = !1;
                            break;
                        }
                        if (n.indexOf(e.tempFilePaths[c].split(".").pop().toLowerCase()) < 0) {
                            a.showError("只能上传" + n.join("/") + "格式图片", t), r = !1;
                            break;
                        }
                        u[c] = {
                            type: "picture",
                            content: {
                                picture_url: e.tempFilePaths[c]
                            }
                        };
                    }
                    r && (t.customData.hybridContent = t.customData.hybridContent.concat(u), t.setData({
                        hybridContent: t.customData.hybridContent
                    }), t.customData.upload_file_done = !1, t.uploadMultiImgs(e.tempFilePaths));
                },
                fail: function(e) {
                    "chooseImage:fail cancel" !== e.errMsg && a.showError("选择图片接口调用失败(" + e.errMsg + ")", t);
                }
            });
        },
        uploadMultiImgs: function(t) {
            var e = this;
            t.map(function(t, o) {
                n.uploadImg(t, function(o) {
                    e.customData.hybridContent.map(function(n, a) {
                        n.content.picture_url == t && (e.customData.hybridContent[a].content = {
                            picture_name: o,
                            picture_url: i.config.hybridPicturePrefix + o
                        });
                    });
                }, function(o) {
                    var i, n, r = e.customData.hybridContent, s = r && r.length || 0;
                    for (i = 0; i < s; i++) t == r[i].content.picture_url && (n = i + 1, a.showError("第" + n + "张图片上传失败(" + o.errMsg + ")，请更换其他图片", e));
                }, function(t) {
                    e.customData.upload_file_done = t.uploadingComplete, t.uploadingComplete && e.customData.wantToSubmit && e.ifToSubmit();
                });
            });
        },
        addLink: function() {
            var t = this.customData.hybridContent;
            t.push({
                type: "link",
                content: {}
            }), this.setData({
                hybridContent: t,
                showLinkBox: !0
            });
        },
        addVideo: function() {
            var t = this, e = this.customData.MAX_VIDEO_NUMBER;
            this.customData.hybridContent.filter(function(t) {
                return "video" === t.type;
            }).length >= e ? a.showError("视频最多" + e + "个", this) : wx.chooseVideo({
                maxDuration: 60,
                compressed: !0,
                success: function(e) {
                    var o = i.globalData.uploadVideoSizeMax;
                    if (e.size >= 1024 * o * 1024) a.showError("请上传" + o + "M以下的视频", t); else {
                        var n = e.tempFilePath, r = n.split(".")[n.split(".").length - 1].toLowerCase(), s = [ "mp4", "m3u8" ];
                        if (-1 === s.indexOf(r)) return void a.showError("只能上传" + s.join("/") + "格式视频", t);
                        if (e.duration < 180) {
                            60 == parseInt(e.duration) && a.showModal("提示", "微信最多支持录制60s视频，如需上传更长视频（180s以内），请手机录制后上传。", !1);
                            var c = t.customData.hybridContent;
                            c.push({
                                type: "video",
                                content: {
                                    video_url: n
                                }
                            }), t.setData({
                                hybridContent: c
                            });
                        } else a.showModal("提示", "最大支持上传 180s 以内的视频，请重新上传", !1);
                    }
                },
                fail: function(e) {
                    "chooseVideo:fail cancel" !== e.errMsg && a.showError("上传视频接口调用失败(" + e.errMsg + ")", t);
                },
                complete: function() {
                    console.log("complete");
                }
            });
        },
        delText: function(t) {
            var e = t.target.dataset.index, o = this.customData.hybridContent;
            o.splice(e, 1), this.setData({
                hybridContent: o
            });
        },
        previewImage: function(t) {
            var e = t.target.dataset.src, o = this.data.hybridContent.filter(function(t) {
                return "picture" === t.type;
            }).map(function(t) {
                return t.content.picture_url;
            });
            wx.previewImage({
                current: e,
                urls: o
            });
        },
        delImg: function(t) {
            var e = t.target.dataset.index, o = this.data.hybridContent[e].content.picture_url, n = i.globalData.uploadingTaskArray, a = i.globalData.preparingUploadArray, r = !1;
            n.map(function(t, e) {
                t.filePath === o && (n[e].uploadTask.abort(), n.splice(e, 1), r = !0);
            }), a.map(function(t, e) {
                t.file === o && (a.splice(e, 1), r = !0);
            });
            var s = this.customData.hybridContent;
            s.splice(e, 1), this.setData({
                hybridContent: s
            });
        },
        delVoice: function(t) {
            var e = t.detail.index, o = this.data.hybridContent[e].content.voice_url, n = i.globalData.uploadingTaskArray, a = i.globalData.preparingUploadArray;
            n.map(function(t, e) {
                t.filePath === o && (n[e].uploadTask.abort(), n.splice(e, 1));
            }), a.map(function(t, e) {
                t.file === o && a.splice(e, 1);
            });
            var r = this.customData.hybridContent;
            r.splice(e, 1), this.setData({
                hybridContent: r
            });
        },
        delLink: function(t) {
            var e = this.customData.hybridContent, o = t.detail.index;
            e.splice(o, 1), this.setData({
                hybridContent: e
            });
        },
        delVideo: function(t) {
            var e = t.detail.src, o = void 0;
            this.data.hybridContent.map(function(t, i) {
                t.content.video_url && t.content.video_url === e && (o = i);
            });
            var i = this.customData.hybridContent;
            i.splice(o, 1), this.setData({
                hybridContent: i
            });
        },
        outerClick: function() {
            this.data.isRecording || this.setData({
                showRecorderBox: !1
            });
        },
        saveLink: function(t) {
            var e = this.customData.hybridContent;
            e[e.length - 1].content.link = t.detail.value;
        },
        cancelLink: function() {
            var t = this.customData.hybridContent;
            t.pop(), this.setData({
                showLinkBox: !1,
                hybridContent: t
            });
        },
        postLink: function() {
            var t = this, e = this.customData.hybridContent, o = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)+/, i = e[e.length - 1].content.link, r = [ "www.jianshu", "mp.weixin.qq" ].every(function(t) {
                return -1 == i.indexOf(t);
            });
            !o.test(i) || r ? a.showError("请输入正确链接", this) : (a.showToast("正在生成..."), n.getLinkInfo(i, 0, function(o) {
                e[e.length - 1].content.linkTitle = o.website_info, t.setData({
                    showLinkBox: !1,
                    hybridContent: e
                }), a.hideToast();
            }, function(o) {
                e.pop(), t.setData({
                    hybridContent: e
                }), a.showError("链接生成失败(" + o.errMsg + "),请尝试重新生成", t), a.hideToast();
            }));
        },
        ifToSubmit: function() {
            var t = this, e = this.customData, o = e.hybridContent;
            if (0 !== o.length) {
                if (o.filter(function(t) {
                    return "voice" === t.type;
                }).some(function(t) {
                    return !1 === t.content.success;
                })) return a.showError("请删除或重传失败的语音后再提交打卡", this), void (e.wantToSubmit = !1);
                var r = function() {
                    if (0 === i.globalData.uploadingTaskArray.length && 0 === i.globalData.preparingUploadArray.length && a.hideToast(), 
                    e.upload_file_done && e.wantToSubmit) {
                        a.hideToast();
                        var n = o.map(function(t) {
                            return "voice" === t.type ? {
                                type: "voice",
                                content: {
                                    voice: t.content.voiceName,
                                    voice_url: t.content.voice_url.replace(i.config.hybridVoicePrefix, ""),
                                    voice_duration: t.content.voice_duration
                                }
                            } : "video" === t.type ? (t.content.video_url = t.content.video_url.replace(i.config.videoPrefixMap, ""), 
                            t) : "picture" === t.type ? (t.content.picture_url = t.content.picture_url.replace(i.config.hybridPicturePrefix, ""), 
                            t) : t;
                        });
                        t.triggerEvent("checkBeforeSubmit", {
                            data: n
                        });
                    }
                }, s = o.filter(function(t) {
                    return "video" === t.type && !t.oldVideo;
                });
                s.length > 0 ? (a.showToast("视频上传中"), s.map(function(o, s) {
                    e.upload_file_done = !1, n.uploadVideo(o.content.video_url, function(t) {
                        o.content.video_url = i.config.videoPrefix + t;
                    }, function(o) {
                        a.showError("第" + (s + 1) + "个视频上传失败:" + o.errMsg + ",请等待其它内容上传后删除", t), e.wantToSubmit = !1;
                    }, function(t) {
                        e.upload_file_done = t.uploadingComplete, r();
                    });
                })) : (a.showToast("正在保存"), r());
            } else a.showError("请输入文字、语音、图片、视频，或上传链接", this);
        },
        saveEdit: function() {
            this.customData.wantToSubmit = !0, this.setData({
                hybridContent: this.customData.hybridContent
            }), this.ifToSubmit();
        },
        deleteEdit: function() {
            this.setData({
                showDeleteBox: !0
            });
        },
        cancelDel: function() {
            this.setData({
                showDeleteBox: !1
            });
        },
        subDel: function() {
            this.customData.hybridContent = [], this.setData({
                showDeleteBox: !1
            }), this.triggerEvent("checkBeforeSubmit", {
                data: []
            });
        },
        delHomeworkTheme: function() {
            this.customData.confirmDeleteText === this.customData.expectedConfirmDeleteText ? (this.setData({
                showDeleteBox: !1
            }), this.triggerEvent("delHomeworkTheme")) : a.showError("请输入正确文字确认删除", this);
        }
    }, t(e, "outerClick", function() {
        this.data.isRecording || this.setData({
            showRecorderBox: !1
        });
    }), t(e, "onInputDeleteText", function(t) {
        this.customData.confirmDeleteText = t.detail.value.trim();
    }), e)
});