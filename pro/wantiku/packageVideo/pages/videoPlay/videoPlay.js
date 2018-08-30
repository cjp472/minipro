var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../biz/live.js")), e = getApp(), a = require("../../../config.js"), s = require("../../../utils/xnUtils.js"), n = require("../../../utils/xnSDK.js"), i = require("../sdk/zrender-helper"), o = require("../sdk/zrender"), r = require("../sdk/live"), l = require("../sdk/gssdk").GS, d = "", c = "", h = {};

Page({
    data: {
        iOS: e.globalData.SystemInfo.iOS,
        scrollView: "",
        iPhoneX: e.globalData.SystemInfo.iPhoneX,
        theme: a.UIConfig.Theme,
        videoSrc: "",
        chatMsg: [],
        userId: "",
        roomId: "",
        userName: "wei",
        password: "",
        headmasterid: "",
        inputText: "点击参与互动",
        msg: "",
        switchVideoState: !1,
        VideoFullState: !1,
        hideVideoIconState: !1,
        hideVideoState: 0,
        toggleTeacherWechatState: !0,
        keyWordState: !0,
        keyWordTop: !1,
        imgSrc: "",
        XNConfigInfo: s.getXNConfigInfo(),
        teacherWeacht: {},
        videoState: !0,
        lateHide: !1,
        countJs: "",
        inputFocus: !1,
        PPTCanvasList: {},
        loadFirstUrl: !1,
        autoPlay: !0,
        scrollViewState: !0,
        noReadMessageNum: 0,
        joinItem: {
            id: "7f06639df2984eb7ba53009c25dd439c",
            title: "随便写点字不要太多",
            status: 0,
            num: 0,
            pic: parseInt(4 * Math.random() + 1),
            ctx: "webcast",
            authcode: "238179",
            site: "mhmtceshi.gensee.com:80",
            liveDemo: !0
        }
    },
    switchVideo: function() {
        this.setData({
            hideVideoState: 0,
            hideVideoIconState: !1,
            lateHide: !1
        }), this.setData({
            switchVideoState: !this.data.switchVideoState
        }), this.setTimeOutHideBtn();
    },
    getUserMessage: function(t) {
        this.setData({
            msg: t.detail.value
        });
    },
    getVideoFullState: function(t) {
        var e = t.detail.fullScreen;
        this.setData({
            VideoFullState: e
        });
    },
    hideVideo: function() {
        this.setData({
            hideVideoIconState: !this.data.hideVideoIconState
        }), "" != this.data.countJs && clearTimeout(this.data.countJs), this.setData({
            lateHide: !1
        }), this.data.hideVideoIconState || this.setTimeOutHideBtn(), 0 == this.data.hideVideoState ? this.data.switchVideoState ? this.setData({
            hideVideoState: 1
        }) : this.setData({
            hideVideoState: 2
        }) : this.setData({
            hideVideoState: 0
        });
    },
    toggleTeacherWechatHide: function() {
        this.setData({
            toggleTeacherWechatState: !0
        });
    },
    toggleTeacherWechatShow: function() {
        this.setData({
            toggleTeacherWechatState: !1
        });
    },
    showKeyWord: function() {
        this.setData({
            keyWordState: !1
        });
    },
    hideKeyWord: function() {
        this.setData({
            keyWordState: !0,
            hideVideoState: 0,
            keyWordTop: !1
        });
    },
    onLoad: function(t) {
        e.globalData.userData.NickName;
        this.data.XNConfigInfo = s.getXNConfigInfo(), n.callTrail({
            originId: this.data.XNConfigInfo.AppId,
            siteId: "kf_9644"
        }), wx.showToast({
            title: "正在加载",
            icon: "loading",
            duration: 4e3,
            mask: !0
        });
        var a = this;
        e.checkContextWithShareOptions(t, function() {
            a.initVideoParams();
        });
        e.generateShareOptions(), e.globalData.userData.OpenId;
        setTimeout(function() {
            a.switchVideo(), a.getDeviceInfo();
        }, 50), this.setTimeOutHideBtn(), wx.createSelectorQuery().select("#chat-scroll").boundingClientRect(function(t) {
            a.setData({
                scrollHeight: t.height
            });
        }).exec();
    },
    initVideoParams: function() {
        var t = this;
        this.channel = l.createChannel(), e.globalData.channel = this.channel;
        var a = wx.createVideoContext("live-video");
        this.setData({
            videoContext: a
        }), this.zr && this.zr.dispose(), this.zr = i.createZrender("teacherPPT", 375, 211), 
        h = {}, this.channel.bind("onVideoUrl", function(e) {
            t.setData({
                videoSrc: e.data,
                videoState: !1
            }), console.log("视频URL:" + e.data);
        }), this.channel.bind("onAudioUrl", function(e) {
            t.setData({
                audioSrc: e.data
            }), console.log("音频URL:" + e.data);
        }), this.channel.bind("onStart", function() {
            t.setData({
                playStatus: "直播中",
                showVideo: !0
            }), a.play();
        }), this.channel.bind("onPause", function() {
            t.setData({
                playStatus: "已暂停",
                showVideo: !0
            }), a.play();
        }), this.channel.bind("onPlay", function() {
            t.setData({
                playStatus: "直播中",
                showVideo: !0
            }), a.play();
        }), this.channel.bind("onStop", function() {
            t.setData({
                playStatus: "已结束",
                showVideo: !1,
                playSrc: ""
            });
        }), this.channel.bind("onKickOut", function(t) {
            console.log("被踢出"), wx.showModal({
                title: "提示",
                content: "您已被管理员请出本次活动",
                showCancel: !1,
                confirmText: "我知道了",
                confirmColor: "#0078d7"
            });
            setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 3e3);
        }), this.channel.bind("onInitAnno", function(e) {
            console.log("历史标注", e);
            for (var a = e.data, s = t.data.pptArray, n = 0; n < a.length; n++) s.push(a[n]);
            t.setData({
                pptArray: s
            }), t.drawCanvas(a, t.scale);
        }), this.channel.bind("onAnnotation", function(e) {
            console.log("收到标注", e);
            for (var a = e.data.annoArray, s = t.data.pptArray, n = [], i = 0; i < a.length; i++) t.inPptArr(a[i].id) || (s.push(a[i]), 
            n.push(a[i]));
            t.setData({
                pptArray: s
            }), t.drawCanvas(n, t.scale);
        }), this.channel.bind("onAnnoClear", function(e) {
            console.log("清空标注"), t.clearAnno();
        }), this.channel.bind("onDocChange", function(e) {
            console.log("收到文档翻页", e.data.hls), t.clearAnno();
            var a = e.data.height, s = e.data.width, n = a / s, i = wx.getSystemInfoSync().windowWidth * n;
            t.scale = wx.getSystemInfoSync().windowWidth / s, t.setData({
                imgSrc: e.data.hls,
                docHeight: i,
                canvasHeight: i,
                condition: !0
            });
        }), this.channel.bind("onStatus", function(t) {
            console.log("SDK状态通知");
            var e = "";
            "1" == t.data.type ? e = "直播间人数已满，您无法加入" : "4" == t.data.type ? e = "服务器拒绝，加入失败" : "7" == t.data.type ? e = "直播间已上锁，拒绝加入" : "8" == t.data.type && (e = "您无权进入该活动"), 
            "1" != t.data.type && "8" != t.data.type || wx.showModal({
                title: "提示",
                content: e,
                showCancel: !1,
                confirmText: "我知道了",
                confirmColor: "#0078d7"
            });
        }), this.channel.bind("onAPIError", function(t) {
            console.log("报错"), wx.showModal({
                title: "ERROR",
                content: t.data.explain,
                showCancel: !1,
                confirmText: "我知道了",
                confirmColor: "#0078d7"
            });
        }), this.channel.bind("onPublicChat", function(e) {
            e.data;
            e.data && t.setMessage(e.data);
        }), this.inPptArr = function(e) {
            for (var a = t.data.pptArray, s = 0; s < a.length; s++) if (e == a[s].id) return !0;
            return !1;
        }, r.init({
            site: this.data.joinItem.site,
            ownerid: this.data.joinItem.id,
            ctx: this.data.joinItem.ctx,
            authcode: this.data.joinItem.authcode,
            uid: "",
            uname: this.data.userName,
            encodetype: "",
            password: "",
            stream: "",
            istest: "true"
        }, function(t) {
            console.log("回调");
        });
    },
    getTeacherWeChat: function(e) {
        var a = this;
        t.default.getTeacherWeChat(e, function(t) {
            var e = t.avatar, s = t.qrCode, n = t.masterName, i = t.weChat;
            a.setData({
                teacherWeacht: {
                    avatar: e,
                    qrCode: s,
                    masterName: n,
                    weChat: i
                }
            });
        });
    },
    clipboard: function() {
        var t = this;
        wx.setClipboardData({
            data: t.data.teacherWeacht.weChat,
            success: function() {
                wx.showModal({
                    title: "微信号已复制",
                    content: "已成功复制老师微信号，请自行添加老师微信",
                    showCancel: !1,
                    confirmText: "知道了",
                    success: function(t) {}
                });
            },
            fail: function() {
                wx.showModal({
                    title: "复制出错",
                    content: "请稍后再试",
                    showCancel: !1,
                    confirmText: "知道了",
                    success: function(t) {}
                });
            }
        });
    },
    saveTeacherImg: function() {
        wx.showToast({
            title: "正在保存",
            icon: "loading"
        }), wx.downloadFile({
            url: a.BASE_URL + "/api/vip/HeadMasterQrCode?masterId=" + this.data.HeadMasterId,
            success: function(t) {
                wx.hideLoading();
                var e = t.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: e,
                    success: function() {
                        wx.showModal({
                            title: "图片保存成功",
                            content: "请在微信内点击扫一扫 - 相册，扫描图片后添加老师微信",
                            showCancel: !1,
                            confirmText: "知道了",
                            success: function(t) {}
                        });
                    },
                    fail: function() {
                        wx.showModal({
                            title: "图片保存失败",
                            content: "获取相册权限失败，请稍后再试",
                            showCancel: !1,
                            confirmText: "知道了",
                            success: function(t) {}
                        });
                    }
                });
            },
            fail: function(t) {
                wx.hideLoading(), wx.showModal({
                    title: "保存出错",
                    content: "请稍后再试",
                    showCancel: !1,
                    confirmText: "知道了",
                    success: function(t) {}
                });
            }
        });
    },
    drawCanvas: function(t, e) {
        for (var a = this, e = e, s = t, n = 0; n < s.length; n++) {
            if (null != s[n].color) var i = s[n].color.split(","), r = i[0], l = parseFloat(i[1]);
            if (a.data.pointer_show > 0 && (9 == s[n].type || 1 == s[n].type ? ("0" == s[n].style && 2 != a.data.pointer_show || "1" == s[n].style && 1 != a.data.pointer_show) && (1 == a.data.pointer_show ? d.setStyle({
                x: -100,
                y: -100
            }) : c.setStyle({
                x: -100,
                y: -100
            })) : (1 == a.data.pointer_show ? d.setStyle({
                x: -100,
                y: -100
            }) : c.setStyle({
                x: -100,
                y: -100
            }), a.setData({
                pointer_show: 0
            }))), 6 == s[n].type) {
                s[n].start_p = s[n].p.split(","), s[n].end_p = s[n].ep.split(",");
                var p = parseInt(s[n].end_p[0]) - parseInt(s[n].start_p[0]), u = parseInt(s[n].end_p[1]) - parseInt(s[n].start_p[1]), f = parseInt(s[n].linesize) * e, g = new o.Rect({
                    shape: {
                        x: parseInt(s[n].start_p[0]) * e,
                        y: parseInt(s[n].start_p[1]) * e,
                        width: parseInt(p * e),
                        height: parseInt(u * e)
                    },
                    style: {
                        fill: null,
                        stroke: r,
                        lineWidth: f
                    }
                });
                h[s[n].id] = g, a.zr.add(g);
            } else if (5 == s[n].type) {
                s[n].start_p = s[n].p.split(","), s[n].end_p = s[n].ep.split(",");
                var p = parseInt(s[n].end_p[0]) - parseInt(s[n].start_p[0]), u = parseInt(s[n].end_p[1]) - parseInt(s[n].start_p[1]), f = parseInt(s[n].linesize) * e, m = new o.Ellipse({
                    shape: {
                        cx: (parseInt(s[n].start_p[0]) + parseInt(s[n].end_p[0])) / 2 * e,
                        cy: (parseInt(s[n].start_p[1]) + parseInt(s[n].end_p[1])) / 2 * e,
                        rx: parseInt(p / 2 * e),
                        ry: parseInt(u / 2 * e)
                    },
                    style: {
                        fill: null,
                        stroke: r,
                        lineWidth: f
                    }
                });
                h[s[n].id] = m, a.zr.add(m);
            } else if (4 == s[n].type && s[n].value) {
                console.log("写文字"), s[n].start_p = s[n].p.split(","), s[n].end_p = s[n].ep.split(",");
                var w = parseInt(s[n].fontsize * e), y = s[n].value, I = new o.Text({
                    style: {
                        x: parseInt(s[n].start_p[0]) * e,
                        y: parseInt(s[n].start_p[1]) * e,
                        text: y,
                        textFill: r,
                        textFont: w + "px Microsoft Yahei",
                        textBaseline: "top"
                    }
                });
                h[s[n].id] = I, a.zr.add(I);
            } else if (3 == s[n].type) if (0 == s[n].removed) a.clearAnno(); else {
                var S = s[n].removed;
                h[S] && null != h[S] && a.zr.remove(h[S]), h[S] = null;
            } else if ("8" == s[n].type || "7" == s[n].type) {
                s[n].start_p = s[n].p.split(","), s[n].end_p = s[n].ep.split(",");
                f = parseInt(s[n].linesize) * e;
                if ("0" == s[n].style || "7" == s[n].type) {
                    var v = new o.Line({
                        shape: {
                            x1: parseInt(s[n].start_p[0]) * e,
                            y1: parseInt(s[n].start_p[1]) * e,
                            x2: parseInt(s[n].end_p[0]) * e,
                            y2: parseInt(s[n].end_p[1]) * e
                        },
                        style: {
                            lineCap: "round",
                            lineWidth: f,
                            stroke: r,
                            lineDash: null
                        }
                    });
                    h[s[n].id] = v, a.zr.add(v);
                } else if ("1" == s[n].style) {
                    console.log("虚线");
                    var x = new o.Line({
                        shape: {
                            x1: parseInt(s[n].start_p[0]) * e,
                            y1: parseInt(s[n].start_p[1]) * e,
                            x2: parseInt(s[n].end_p[0]) * e,
                            y2: parseInt(s[n].end_p[1]) * e
                        },
                        style: {
                            lineCap: "butt",
                            lineWidth: f,
                            stroke: r,
                            lineDash: [ 2, 2 ]
                        }
                    });
                    h[s[n].id] = x, a.zr.add(x);
                } else if ("2" == s[n].style) {
                    console.log("有箭头线条");
                    var D = a.createArrowHead([ s[n].start_p[0] * e, s[n].start_p[1] * e, s[n].end_p[0] * e, s[n].end_p[1] * e ], r, f * e), _ = new o.Line({
                        shape: {
                            x1: parseInt(s[n].start_p[0]) * e,
                            y1: parseInt(s[n].start_p[1]) * e,
                            x2: parseInt(s[n].end_p[0]) * e,
                            y2: parseInt(s[n].end_p[1]) * e
                        },
                        style: {
                            lineCap: "round",
                            lineWidth: f,
                            stroke: r,
                            fill: r
                        }
                    });
                    h[s[n].id] = [ _, D ], a.zr.add(_), a.zr.add(D);
                }
            } else if (2 == s[n].type) {
                for (var f = parseInt(s[n].linesize) * e, C = s[n].p, T = new Array(), V = 0; V < C.length; V++) C[V] = C[V].split(",");
                for (var M = 0; M < C.length; M++) T.push([ parseInt(C[M][0]) * e, parseInt(C[M][1]) * e ]);
                l < 1 && (l = .75);
                var b = new o.Polyline({
                    style: {
                        lineDash: [ 0, 0 ],
                        opacity: l,
                        stroke: r,
                        lineWidth: f
                    },
                    shape: {
                        points: T,
                        smooth: .5
                    }
                });
                h[s[n].id] = b, a.zr.add(b);
            } else if (9 == s[n].type || 1 == s[n].type) {
                var W = s[n].p.split(",");
                if (s[n].style && 1 == s[n].style && "" == d) {
                    k = new o.Image({
                        style: {
                            x: parseInt(W[0]) * e,
                            y: parseInt(W[1]) * e,
                            image: "../../assets/icons/point.png",
                            width: 16,
                            height: 16,
                            text: ""
                        }
                    });
                    a.zr.add(k), d = k;
                } else if (s[n].style && 0 == s[n].style && "" == c) {
                    var k = new o.Image({
                        style: {
                            x: parseInt(W[0]) * e,
                            y: parseInt(W[1]) * e,
                            image: "../../assets/icons/pointEx.png",
                            width: 16,
                            height: 16,
                            text: ""
                        }
                    });
                    a.zr.add(k), c = k;
                } else s[n].style && 1 == s[n].style ? d.setStyle({
                    x: parseInt(W[0]) * e,
                    y: parseInt(W[1]) * e
                }) : c.setStyle({
                    x: parseInt(W[0]) * e,
                    y: parseInt(W[1]) * e
                });
                s[n].style && 1 == s[n].style ? a.setData({
                    pointer_show: 1
                }) : a.setData({
                    pointer_show: 2
                });
            }
        }
    },
    clearAnno: function() {
        var t = this, e = [];
        for (var a in h) h[a] && null != h[a] && (e.push(h[a]), t.zr.remove(h[a]));
        h = {}, t.setData({
            pptArray: []
        });
    },
    onReady: function() {},
    msgInput: function(t) {
        this.data.msg = t.detail.value;
    },
    inputChatimg: function(t) {
        var e = t.currentTarget.dataset.text;
        this.sendMsg({}, e);
    },
    sendMsg: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        console.log(e, "msg");
        var a = this, s = e || this.data.msg;
        "" == this.data.msg && null == e || (this.channel.send("submitChat", {
            content: s
        }, function(t) {
            if (console.log(t, "Message"), t.result) {
                var e = {
                    senderId: "",
                    senderRole: "",
                    sender: a.data.userName,
                    content: t.data.content,
                    id: t.data.uuidStr,
                    uid: ""
                };
                a.setMessage([ e ]);
            } else a.setData({
                unChatText: "发送过于频繁，请稍后再重试",
                showUnchat: !0
            });
        }), this.setData({
            msg: ""
        }), this.keepChatScroll(), this.scrollViewToDom());
    },
    onShow: function() {},
    getSharePageUrl: function() {
        var t = this.data, a = t.userId, s = t.roomId, n = t.password, i = t.HeadMasterId, o = t.coursetitle, r = t.dataendtime;
        return "/pages/live/liveVideoPlay/liveVideoPlay?userId=" + a + "&roomId=" + s + "&password=" + n + "&HeadMasterId=" + i + "&" + e.generateShareOptions() + "&coursetitle=" + o + "&dataendtime=" + r;
    },
    setMessage: function(t) {
        var e = this, a = this.data.chatMsg;
        if (t.forEach(function(t) {
            var e = t.content, s = "", n = "", i = !0;
            1 == e ? (s = "http://img02.exam8.com/img2017/minapp/video/1@2x.png", n = 24) : 2 == e && (s = "http://img02.exam8.com/img2017/minapp/video/2@2x.png", 
            n = 38), "" != t.senderRole && "8" != t.senderRole && (t.senderRole.indexOf("1") > -1 || t.senderRole.indexOf("2") > -1) && (i = !1);
            var o = {
                name: t.sender,
                userrole: i,
                msg: e,
                imgSrc: s,
                imgWidth: n
            };
            a.length > 80 && a.splice(0, 1), a.push(o);
        }), console.log(a, "chatMsg"), this.setData({
            chatMsg: a
        }), this.data.CountScrollView && clearTimeout(this.data.CountScrollView), this.data.scrollViewState) {
            var s = setTimeout(function() {
                e.setData({
                    scrollView: "livechat" + (e.data.chatMsg.length - 1)
                });
            }, 100);
            this.setData({
                CountScrollView: s
            });
        } else {
            var n = this.data.noReadMessageNum;
            n++, this.setData({
                noReadMessageNum: n
            });
        }
    },
    setTimeOutHideBtn: function() {
        var t = this;
        "" != this.data.countJs && clearTimeout(this.data.countJs), this.data.countJs = setTimeout(function() {
            t.setData({
                lateHide: !0,
                countJs: ""
            });
        }, 5e3);
    },
    showHideBtn: function() {
        var t = this.data.lateHide;
        this.setData({
            lateHide: !t
        }), t && this.setTimeOutHideBtn();
    },
    inputFocusTrue: function() {
        var t = this;
        e.globalData.userData.HasLogin ? (this.setData({
            keyWordTop: !0
        }), this.data.switchVideoState ? this.setData({
            hideVideoState: 1
        }) : this.setData({
            hideVideoState: 2
        }), setTimeout(function() {
            t.setData({
                keyWordState: !1
            });
        }, 300)) : e.gotoLogin("", 3);
    },
    onShareAppMessage: function() {
        var t = this, e = this.getSharePageUrl();
        return console.log(e), {
            title: t.data.coursetitle,
            path: e
        };
    },
    getDeviceInfo: function() {
        var t = this, e = wx.createSelectorQuery();
        setTimeout(function() {
            e.select("#teacher-ppt").boundingClientRect().exec(function(e) {
                t.setData({
                    rect: e[0]
                });
            });
        }, 100);
    },
    onHide: function() {
        this.setData({
            autoPlay: !1
        });
    },
    onUnload: function() {},
    StopChatScroll: function(t) {
        var e = t.detail, a = e.scrollHeight;
        e.deltaY;
        a - e.scrollTop - 50 > this.data.scrollHeight ? this.setData({
            scrollViewState: !1
        }) : this.setData({
            scrollViewState: !0,
            noReadMessageNum: 0
        });
    },
    keepChatScroll: function() {
        this.setData({
            scrollViewState: !0,
            noReadMessageNum: 0
        });
    },
    scrollViewToDom: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                scrollView: "livechat" + (t.data.chatMsg.length - 1)
            });
        }, 100);
    },
    catchtap: function() {}
});