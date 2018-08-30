var t = require("../../libs/behaviors").recorder, i = getApp(), e = (i.service, 
i.util);

Component({
    behaviors: [ t ],
    properties: {
        refresh: {
            type: String,
            value: "off",
            observer: function(t, i) {
                "on" == t && this.formatData();
            }
        },
        originSubmitData: {
            type: Object,
            value: {},
            observer: function(t, i) {
                t && t.picture_list && t.picture_list.length > 0 && this.formatData();
            }
        },
        applyScene: {
            type: String,
            value: "calendar-submit"
        },
        submitRequire: {
            type: Object,
            value: {
                text: 0,
                voice: 0,
                video: 0,
                picture: 0
            }
        },
        isEdit: {
            type: Boolean,
            value: !1
        },
        noButton: {
            type: Boolean,
            value: !1
        },
        autoUpload: {
            type: Boolean,
            value: !1
        },
        cancelSubmit: {
            type: String,
            value: "off",
            observer: function(t, i) {
                "on" === t && (this.customData.wantToSubmit = !1, this.setData({
                    cancelSubmit: "off"
                }));
            }
        },
        isHide: {
            type: Boolean,
            value: !1
        },
        allowSetScope: {
            type: Boolean,
            value: !1
        },
        userPiclist: {
            type: Array,
            value: []
        },
        isdoodle: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        originData: "",
        submitData: {
            content: "",
            linkList: [],
            voice_list: [],
            video_list: [],
            picture_list: [],
            document_list: [],
            show_range: 0
        },
        textLength: 0,
        MAX_TXT_LENGTH: 1e4,
        showRecorderBox: !1,
        showLinkBox: !1,
        textPlaceholder: "",
        MAX_LINK_NUMBER: 1,
        MAX_PIC_VIDEO_NUMBER: 9,
        submitText: "提交",
        fakeTextContent: ""
    },
    created: function() {
        this.customData = {
            upload_file_done: !0,
            wantToSubmit: !1,
            postVideo: [],
            postImg: [],
            postRecord: [],
            recordingTimer: null
        }, this.app = getApp();
    },
    attached: function() {},
    ready: function() {
        this.formatData();
    },
    methods: {
        _autoUpload: function() {
            var t = this;
            if (t.data.autoUpload) {
                var i = this.app;
                i.service, i.util;
                t.customData.wantToSubmit = !0, t.ifToSubmit();
            }
        },
        formatData: function() {
            var t = this, i = this.data.originSubmitData, e = i.website ? [ {
                link: i.website,
                linkTitle: i.web_title
            } ] : [], a = i.voice_list && i.voice_list.length > 0 ? i.voice_list.map(function(t) {
                return {
                    voice_url: t.voice_url,
                    voice_duration: t.voice_duration,
                    isPlaying: !1,
                    speedStyle: 0,
                    voiceName: t.voice
                };
            }) : [], o = i.picture_list ? i.picture_list.map(function(i) {
                return t.app.util.changePictureQuality(i, "small");
            }) : [], s = i.document_list ? i.document_list.map(function(t, i) {
                return {
                    type: t.document_url.substring(t.document_url.lastIndexOf(".") + 1),
                    content: [ {
                        url: t.document_url,
                        name: t.document_name
                    } ]
                };
            }) : [];
            if (this.setData({
                submitData: {
                    top: i.top > 0,
                    show_range: parseInt(i.show_range) || 0,
                    content: i.content || "",
                    linkList: e || [],
                    voice_list: a || [],
                    video_list: i.video_list || [],
                    picture_list: o || [],
                    document_list: s || []
                },
                refresh: "off",
                textLength: i.content ? i.content.length : 0,
                MAX_TXT_LENGTH: "comments" === this.data.applyScene || "user-comments" === this.data.applyScene ? 1e3 : 1e4
            }), this.data.autoUpload && this.setData({
                originData: {
                    content: i.content || "",
                    linkList: e || [],
                    voice_list: a || [],
                    video_list: i.video_list || [],
                    picture_list: o || [],
                    document_list: s || []
                }
            }), this.customData.postRecord = a, this.data.noButton) {
                this.customData.postVideo = i.video_list || [];
                var n = i.picture_list || [];
                this.customData.postImg = n.map(function(t, i) {
                    return {
                        index: i,
                        url: t
                    };
                });
            } else {
                this.customData.postVideo = i.videos && i.videos.split("|") || [];
                var u = i.pictures && i.pictures.split("|") || [];
                this.customData.postImg = u.map(function(t, i) {
                    return {
                        index: i,
                        url: t
                    };
                });
            }
            switch (this.data.applyScene) {
              case "calendar-submit":
                this.setData({
                    textPlaceholder: "请输入文字",
                    submitText: this.data.isEdit ? "保存" : "打卡"
                });
                break;

              case "homework-submit":
                this.setData({
                    textPlaceholder: "请输入作业文字",
                    submitText: this.data.isEdit ? "保存" : "确认提交"
                });
                break;

              case "unlock-submit":
                this.setData({
                    textPlaceholder: "请输入文字",
                    submitText: this.data.isEdit ? "保存" : "打卡"
                });
                break;

              case "comments":
                this.setData({
                    textPlaceholder: "请输入点评文字",
                    submitText: "发送"
                });
                break;

              case "user-comments":
                this.setData({
                    textPlaceholder: "请输入评论",
                    submitText: "发送"
                });
                break;

              default:
                this.setData({
                    textPlaceholder: "请输入文字",
                    submitText: this.data.isEdit ? "保存" : "提交"
                });
            }
        },
        delLink: function(t) {
            var i = this.data.submitData.linkList;
            i.splice(t.detail.index, 1), this.setData({
                "submitData.linkList": i
            }), this._autoUpload();
        },
        delAccessory: function(t) {
            var i = this.data.submitData.document_list;
            i.splice(t.detail.index, 1), this.setData({
                "submitData.document_list": i
            }), this._autoUpload();
        },
        delVoice: function(t) {
            var i = t.detail.index, e = this.customData.postRecord, a = this.data.submitData.voice_list[i], o = this.app.globalData.uploadingTaskArray, s = this.app.globalData.preparingUploadArray;
            o.map(function(t, i) {
                t.filePath === a && (o[i].uploadTask.abort(), o.splice(i, 1));
            }), s.map(function(t, i) {
                t.file === a && s.splice(i, 1);
            }), e.splice(i, 1), this.setData({
                "submitData.voice_list": e
            }), this._autoUpload();
        },
        deleteVideo: function(t) {
            var i = t.detail.index, e = this.data.submitData.video_list;
            e.splice(i, 1), this.customData.postVideo.splice(i, 1), this.setData({
                "submitData.video_list": e
            }), this._autoUpload();
        },
        deleteImg: function(t) {
            var i = t.detail.index, e = this.data.submitData.picture_list[i], a = this.app.globalData.uploadingTaskArray, o = this.app.globalData.preparingUploadArray, s = !1;
            a.map(function(t, i) {
                t.filePath === e && (a[i].uploadTask.abort(), a.splice(i, 1), s = !0);
            }), o.map(function(t, i) {
                t.file === e && (o.splice(i, 1), s = !0);
            }), this.data.submitData.picture_list.splice(i, 1), s || this.customData.postImg.splice(i, 1), 
            this.setData({
                submitData: this.data.submitData
            }), this._autoUpload();
        },
        valueChange: function(t) {
            var i = t.detail.value.trim(), e = i.replace(/[\n\r]+/g, "");
            this.data.submitData.content = t.detail.value, this.setData({
                textLength: e.length
            }), this.triggerEvent("saveText", {
                content: i
            }), this._autoUpload();
        },
        chooseVoice: function() {
            var t = this.app, i = (t.service, t.util), e = this.data, a = e.recordLimit, o = e.submitData;
            (this.data.submitData.voice_list && this.data.submitData.voice_list.length || 0) >= a ? i.showError("最多上传" + a + "条语音", this) : this.setData({
                showRecorderBox: !0,
                "submitData.isHideVideo": !0,
                fakeTextContent: o.content
            });
        },
        chooseVideo: function() {
            var t = this, i = this.app, e = (i.service, i.util), a = this.data.MAX_PIC_VIDEO_NUMBER, o = this.data.submitData, s = o.video_list || [];
            a - (o.picture_list || []).length - s.length <= 0 ? e.showError("图片和视频最多" + a + "个", this) : wx.chooseVideo({
                maxDuration: 60,
                compressed: !0,
                success: function(i) {
                    var a = t.app.globalData.uploadVideoSizeMax;
                    if (i.size >= 1024 * a * 1024) e.showError("请上传" + a + "M以下的视频", t); else {
                        var o = i.tempFilePath, n = o.split(".")[o.split(".").length - 1].toLowerCase(), u = [ "mp4", "m3u8" ];
                        if (-1 === u.indexOf(n)) return void e.showError("只能上传" + u.join("/") + "格式视频", t);
                        i.duration < 180 ? (60 == parseInt(i.duration) && e.showModal("提示", "微信最多支持录制60s视频，如需上传更长视频（180s以内），请手机录制后上传。", !1), 
                        t.setData({
                            "submitData.video_list": s.concat(o)
                        }), t._autoUpload()) : e.showModal("提示", "最大支持上传 180s 以内的视频，请重新上传", !1);
                    }
                },
                fail: function(i) {
                    "chooseVideo:fail cancel" !== i.errMsg && e.showError("上传视频接口调用失败(" + i.errMsg + ")", t);
                },
                complete: function() {
                    console.log("complete");
                }
            });
        },
        chooseImg: function() {
            var t = this, i = this.app, e = (i.service, i.util), a = this.data.MAX_PIC_VIDEO_NUMBER, o = this.data.submitData, s = o.video_list || [], n = a - (o.picture_list || []).length - s.length;
            n > 0 ? wx.chooseImage({
                count: n,
                success: function(i) {
                    var a = t.app.globalData.uploadImageSizeMax, o = [ "png", "jpg", "jpeg", "gif" ], s = !0, n = i.tempFiles.length, u = void 0;
                    for (u = 0; u < n; u++) {
                        if (i.tempFiles[u].size > 1024 * a * 1024) {
                            e.showError("请上传" + a + "M以下的图片", t), s = !1;
                            break;
                        }
                        if (o.indexOf(i.tempFilePaths[u].split(".").pop().toLowerCase()) < 0) {
                            e.showError("只能上传" + o.join("/") + "格式图片", t), s = !1;
                            break;
                        }
                    }
                    if (s) {
                        t.setData({
                            "submitData.picture_list": t.data.submitData.picture_list.concat(i.tempFilePaths)
                        }), t.customData.upload_file_done = !1;
                        var r = i.tempFilePaths.map(function(i, e) {
                            return {
                                index: e + t.customData.postImg.length,
                                url: i
                            };
                        });
                        t.uploadMultiImgs(r);
                    }
                },
                fail: function(i) {
                    "chooseImage:fail cancel" !== i.errMsg && e.showError("选择图片接口调用失败(" + i.errMsg + ")", t);
                }
            }) : e.showError("图片和视频最多" + a + "个", this);
        },
        uploadMultiImgs: function(t) {
            var i = this, e = this.app, a = e.service, o = e.util;
            t.map(function(t, e) {
                a.uploadImg(t.url, function(e) {
                    i.customData.postImg[t.index] = {}, i.customData.postImg[t.index].url = e, i._autoUpload();
                }, function(e) {
                    var a, s, n = i.data.submitData.picture_list, u = n && n.length || 0;
                    for (a = 0; a < u; a++) t == i.data.submitData.picture_list[a] && (i.customData.wantToSubmit = !1, 
                    s = a + 1, o.showError("第" + s + "张图片上传失败(" + e.errMsg + ")，请更换其他图片", i));
                }, function(t) {
                    i.customData.upload_file_done = t.uploadingComplete, t.uploadingComplete && i.customData.wantToSubmit && i.ifToSubmit();
                });
            });
        },
        ifToSubmit: function() {
            var t = this, i = this.app, e = i.service, a = i.util, o = this.data, s = this.customData, n = o.submitData, u = o.submitRequire, r = n.content && n.content.length || 0, l = n.voice_list && n.voice_list.length || 0, c = n.video_list && n.video_list.length || 0, d = n.picture_list && n.picture_list.length || 0, p = s.postRecord.some(function(t) {
                return !1 === t.success;
            }), h = function() {
                s.upload_file_done && s.wantToSubmit && (a.hideToast(), n.postVideo = s.postVideo.filter(function(t) {
                    return t;
                }), n.postImg = s.postImg.filter(function(t) {
                    return t.url;
                }).map(function(t, i) {
                    return t.url;
                }), s.postRecord.length > 0 ? n.postRecord = s.postRecord.map(function(t) {
                    return {
                        voiceName: t.voiceName,
                        voice_duration: t.voice_duration
                    };
                }) : n.postRecord = [], t.setData({
                    submitData: n
                }), t.triggerEvent("checkBeforeSubmit", {
                    data: n
                }));
            };
            if (!this.data.autoUpload) {
                if (o.textLength > o.MAX_TXT_LENGTH) return a.showError("字数超过限制，请删减", this), void (s.wantToSubmit = !1);
                if ("comments" !== o.applyScene && "user-comments" !== o.applyScene && "" === n.content && 0 === n.voice_list.length && 0 === n.video_list.length && 0 === n.picture_list.length && 0 === n.linkList.length) return a.showError("若遇字符数为零，请将文字截图后以图片方式上传打卡", this), 
                void (s.wantToSubmit = !1);
                if (p) return a.showError("请删除或重传失败的语音后再提交打卡", this), void (s.wantToSubmit = !1);
                if (0 !== u.text && u.text > r) return a.showError("请输入最少" + u.text + "个文字", this), 
                void (s.wantToSubmit = !1);
                if (0 !== u.voice && u.voice > l) return a.showError("请录制最少" + u.voice + "条语音", this), 
                void (s.wantToSubmit = !1);
                if (0 !== u.video && u.video > c) return a.showError("请上传最少" + u.video + "个视频", this), 
                void (s.wantToSubmit = !1);
                if (0 !== u.picture && u.picture > d) return a.showError("请上传最少" + u.picture + "张图片", this), 
                void (s.wantToSubmit = !1);
            }
            if (s.wantToSubmit) {
                o.autoUpload || (c > s.postVideo.length ? a.showToast("视频上传中") : a.showToast("正在提交"));
                var m = n.video_list, v = s.postVideo, f = n.video_list.map(function(t, i) {
                    return {
                        index: i,
                        url: t
                    };
                }).slice(v.length);
                f.length > 0 ? f.map(function(i) {
                    s.upload_file_done = !1, o.autoUpload && a.showToast("视频上传中"), e.uploadVideo(i.url, function(t) {
                        s.postVideo[i.index] = t;
                    }, function(e) {
                        var o = void 0;
                        m.map(function(t, e) {
                            t == i.url && (o = e);
                        }), a.showError("第" + (o + 1) + "个视频上传失败:" + e.errMsg + ",请等待其它内容上传后删除", t), s.wantToSubmit = !1;
                    }, function(t) {
                        s.upload_file_done = t.uploadingComplete, h();
                    });
                }) : h();
            }
        },
        chooseLink: function() {
            var t = this.data, i = t.MAX_LINK_NUMBER, a = t.submitData;
            if (a.linkList.length >= i) e.showError("最多导入" + i + "条链接", this); else {
                var o = a.linkList;
                o.push({
                    linkTitle: "",
                    link: ""
                }), this.setData({
                    showLinkBox: !0,
                    "submitData.isHideVideo": !0,
                    "submitData.linkList": o,
                    fakeTextContent: a.content
                });
            }
        },
        saveLink: function(t) {
            var i = this.data.submitData.linkList;
            i[i.length - 1].link = t.detail.value, this.setData({
                "submitData.linkList": i
            });
        },
        cancelLink: function() {
            var t = this.data.submitData.linkList;
            t.pop(), this.setData({
                showLinkBox: !1,
                "submitData.isHideVideo": !1,
                "submitData.linkList": t
            });
        },
        postLink: function() {
            var t = this, i = this.app, e = i.service, a = i.util, o = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)+/, s = this.data.submitData.linkList, n = s[s.length - 1].link, u = [ "www.jianshu", "mp.weixin.qq" ].every(function(t) {
                return -1 == n.indexOf(t);
            });
            !o.test(n) || u ? a.showError("请输入正确链接", this) : (a.showToast("正在生成..."), e.getLinkInfo(n, 0, function(i) {
                s[s.length - 1].linkTitle = i.website_info, t.setData({
                    "submitData.linkList": s,
                    showLinkBox: !1,
                    "submitData.isHideVideo": !1
                }), a.hideToast(), t._autoUpload();
            }, function(i) {
                s.pop(), t.setData({
                    "submitData.linkList": s
                }), a.showError("链接生成失败(" + i.errMsg + "),请尝试重新生成", t), a.hideToast();
            }));
        },
        postSubmit: function(t) {
            var i = this.app, e = i.service;
            i.util;
            this.customData.wantToSubmit = !0, this.setData({
                "submitData.formId": t.detail.formId || ""
            }), this.ifToSubmit(), e.submitFormId(t.detail.formId);
        },
        outerClick: function() {
            this.data.isRecording || this.setData({
                showRecorderBox: !1,
                "submitData.isHideVideo": !1
            });
        },
        recoderOnStop: function(t) {
            var i = this.customData.postRecord;
            i.push({
                voice_url: t.tempFilePath,
                voice_duration: parseInt(t.duration / 1e3),
                isPlaying: !1,
                speedStyle: 0
            }), this.setData({
                "submitData.voice_list": i,
                isRecording: !1,
                showRecorderBox: !1,
                recordDuration: 0
            });
            var e = i.length;
            this.customData.upload_file_done = !1, this.uploadRecorder(i[e - 1]);
        },
        uploadFailRecorder: function(t) {
            var i = this, e = this, a = this.app, o = a.service, s = a.util, n = t.detail.index;
            s.showToast("上传中");
            var u = this.customData.postRecord;
            o.uploadMp3(u[n].voice_url, function(t) {
                u[n].voiceName = t, u[n].success = !0, i.setData({
                    "submitData.voice_list": u
                }), e._autoUpload(), console.log("common.uploadvoice success:");
            }, function(t) {
                s.hideToast(), u[n].success = !1, i.setData({
                    "submitData.voice_list": u
                }), s.showError("上传语音失败:" + t.errMsg + ",请重试", i);
            }, function(t) {
                i.customData.upload_file_done = t.uploadingComplete, s.hideToast();
            });
        },
        uploadRecorder: function(t) {
            var i = this, a = this;
            this.app.service.uploadMp3(t.voice_url, function(e) {
                t.voiceName = e, t.success = !0, i.setData({
                    "submitData.voice_list": i.customData.postRecord
                }), a._autoUpload(), console.log("common.uploadvoice success:");
            }, function(a) {
                e.hideToast(), t.success = !1, i.setData({
                    "submitData.voice_list": i.customData.postRecord
                }), console.log("common.uploadvoice fail: " + a.errMsg);
            }, function(t) {
                i.customData.upload_file_done = t.uploadingComplete;
                var e = i.customData.postRecord.some(function(t) {
                    return !1 === t.success;
                });
                t.uploadingComplete && !e && i.customData.wantToSubmit && i.ifToSubmit();
            });
        },
        getFormId: function(t) {
            var i = this.app, e = i.service, a = (i.util, t.detail.formId);
            e.submitFormId(a);
        },
        toggleVisibleAll: function() {
            this.setData({
                "submitData.show_range": 0
            });
        },
        toggleVisibleAdmin: function() {
            this.data.submitData.top ? wx.showModal({
                title: "提示",
                content: "已设为精选打卡后不能设为仅管理员可见",
                showCancel: !1
            }) : this.setData({
                "submitData.show_range": 1
            });
        },
        goDoodle: function() {
            var t = encodeURI(this.data.userPiclist.join("|"));
            wx.navigateTo({
                url: "/pages/admin_sub/handwriting/handwriting?imgArr=" + t + "&index=0"
            });
        }
    }
});