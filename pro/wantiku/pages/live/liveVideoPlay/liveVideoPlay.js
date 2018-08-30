var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../biz/live.js")), e = require("./PPTCanvas.js"), a = getApp(), i = require("../../../utils/ccliveSDK.js"), s = require("../../../config.js"), o = require("../../../utils/xnUtils.js"), n = require("../../../utils/xnSDK.js");

Page({
    data: {
        iOS: a.globalData.SystemInfo.iOS,
        scrollView: "",
        iPhoneX: a.globalData.SystemInfo.iPhoneX,
        theme: s.UIConfig.Theme,
        videoSrc: "",
        chatMsg: [],
        userId: "",
        roomId: "",
        userName: "",
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
        XNConfigInfo: o.getXNConfigInfo(),
        teacherWeacht: {},
        videoState: !0,
        lateHide: !1,
        countJs: "",
        inputFocus: !1,
        PPTCanvasList: {},
        loadFirstUrl: !1,
        autoPlay: !0,
        scrollViewState: !0,
        noReadMessageNum: 0
    },
    switchVideo: function() {
        this.setData({
            hideVideoState: 0,
            hideVideoIconState: !1,
            lateHide: !1
        }), this.setData({
            switchVideoState: !this.data.switchVideoState
        });
        var t = this.data, a = t.CanvasContext, i = t.PPTCanvasList, s = t.PPTpage, o = t.docId;
        o && (0, e.clearPPTDraw)(a, i, o, s, this), this.setTimeOutHideBtn();
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
    onLoad: function(e) {
        var s = e.userId, c = e.roomId, d = e.password, r = e.HeadMasterId, h = e.coursetitle, l = e.dataendtime, u = e.formId;
        if (Date.parse(new Date()) / 1e3 > l) wx.switchTab({
            url: "../liveVideo/liveVideo"
        }); else {
            var g = a.globalData.userData.NickName;
            wx.setNavigationBarTitle({
                title: h
            });
            var f = wx.createVideoContext("live-video");
            this.setData({
                userId: s,
                roomId: c,
                password: d,
                HeadMasterId: r,
                coursetitle: h,
                userName: g,
                dataendtime: l,
                videoContext: f
            }), this.getTeacherWeChat(r), this.data.XNConfigInfo = o.getXNConfigInfo(), n.callTrail({
                originId: this.data.XNConfigInfo.AppId,
                siteId: "kf_9644"
            }), wx.showToast({
                title: "正在加载",
                icon: "loading",
                duration: 4e3,
                mask: !0
            });
            var m = this;
            a.checkContextWithShareOptions(e, function() {
                i.login({
                    userId: m.data.userId,
                    roomId: m.data.roomId,
                    userName: m.data.userName,
                    password: m.data.password,
                    success: function() {
                        i.connectIO(), wx.hideLoading(), m.setData({
                            videoState: !1
                        }), i.getVideoSrc(function(t) {
                            t.success && m.setData({
                                videoSrc: t.src[0],
                                loadFirstUrl: !0
                            });
                        }, m), i.getHistory();
                    },
                    fail: function() {}
                });
            });
            var v = "pages/live/liveVideoPlay/liveVideoPlay?" + a.generateShareOptions(), w = a.globalData.userData.OpenId;
            t.default.postViewZhiboEvent({
                OpenId: w,
                formId: u,
                ReportUrl: v
            }, function(t) {}), setTimeout(function() {
                m.switchVideo(), m.getDeviceInfo();
            }, 50), this.setTimeOutHideBtn(), wx.createSelectorQuery().select("#chat-scroll").boundingClientRect(function(t) {
                m.setData({
                    scrollHeight: t.height
                });
            }).exec();
        }
    },
    getTeacherWeChat: function(e) {
        var a = this;
        t.default.getTeacherWeChat(e, function(t) {
            var e = t.avatar, i = t.qrCode, s = t.masterName, o = t.weChat;
            a.setData({
                teacherWeacht: {
                    avatar: e,
                    qrCode: i,
                    masterName: s,
                    weChat: o
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
            url: s.BASE_URL + "/api/vip/HeadMasterQrCode?masterId=" + this.data.HeadMasterId,
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
    onReady: function() {
        var t = this;
        i.on("publish_stream", function(e) {
            i.getVideoSrc(function(e) {
                e.success && t.setData({
                    videoSrc: e.src[0],
                    loadFirstUrl: !0
                });
            }, t);
        }), i.on("end_stream", function(t) {
            wx.showModal({
                title: "提示",
                showCancel: !1,
                content: "当前直播已结束",
                success: function(t) {
                    t.confirm && wx.switchTab({
                        url: "/pages/live/liveVideo/liveVideo"
                    });
                }
            });
        }), i.on("chat_message", function(e) {
            t.setMessage(e);
        }), i.on("page_change", function(a) {
            var i = t.data, s = i.CanvasContext, o = i.PPTCanvasList, n = a.value.docid || a.value.docId, c = void 0;
            c = a.value.page >= 0 ? a.value.page : a.value.pageNum, (0, e.clearPPTDraw)(s, o, n, c, t), 
            t.setData({
                imgSrc: a.value.url,
                PPTpage: c,
                docId: n
            });
        }), i.on("draw", function(e) {
            var a = wx.createCanvasContext("teacherPPT");
            t.setData({
                CanvasContext: a
            }), t.countPPTData(e.value);
        }), i.on("room_user_count", function(e) {
            t.setData({
                userNumber: e
            });
        });
    },
    msgInput: function(t) {
        this.data.msg = t.detail.value;
    },
    inputChatimg: function(t) {
        var e = t.currentTarget.dataset.text;
        i.sendMsg(e);
    },
    sendMsg: function(t) {
        "" != this.data.msg && (i.sendMsg(this.data.msg), this.setData({
            msg: ""
        }), this.keepChatScroll(), this.scrollViewToDom());
    },
    onShow: function() {
        var t = this.data.videoContext, e = this;
        this.data.loadFirstUrl && (i.connectIO(), i.getVideoSrc(function(a) {
            a.success && (e.setData({
                videoSrc: a.src[0]
            }), setTimeout(function() {
                t.play();
            }, 1e3));
        }, e));
    },
    getSharePageUrl: function() {
        var t = this.data, e = t.userId, i = t.roomId, s = t.password, o = t.HeadMasterId, n = t.coursetitle, c = t.dataendtime;
        return "/pages/live/liveVideoPlay/liveVideoPlay?userId=" + e + "&roomId=" + i + "&password=" + s + "&HeadMasterId=" + o + "&" + a.generateShareOptions() + "&coursetitle=" + n + "&dataendtime=" + c;
    },
    setMessage: function(t) {
        var e = this, a = t.msg, i = "", s = "", o = this.data.chatMsg;
        1 == a ? (i = "http://img02.exam8.com/img2017/minapp/video/1@2x.png", s = 24) : 2 == a && (i = "http://img02.exam8.com/img2017/minapp/video/2@2x.png", 
        s = 38);
        var n = {
            name: t.username,
            userrole: t.userrole,
            msg: a,
            imgSrc: i,
            imgWidth: s
        };
        if (o.length > 80 && o.splice(0, 1), o.push(n), this.setData({
            chatMsg: o
        }), this.data.CountScrollView && clearTimeout(this.data.CountScrollView), this.data.scrollViewState) {
            var c = setTimeout(function() {
                e.setData({
                    scrollView: "livechat" + (e.data.chatMsg.length - 1)
                });
            }, 100);
            this.setData({
                CountScrollView: c
            });
        } else {
            var d = this.data.noReadMessageNum;
            d++, this.setData({
                noReadMessageNum: d
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
        a.globalData.userData.HasLogin ? (this.setData({
            keyWordTop: !0
        }), this.data.switchVideoState ? this.setData({
            hideVideoState: 1
        }) : this.setData({
            hideVideoState: 2
        }), setTimeout(function() {
            t.setData({
                keyWordState: !1
            });
        }, 300)) : a.gotoLogin("", 3);
    },
    onShareAppMessage: function() {
        var t = this, e = this.getSharePageUrl();
        return console.log(e), {
            title: t.data.coursetitle,
            path: e
        };
    },
    countPPTData: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = t.data.type, a = t.data.docid || t.data.docId, i = this.data.PPTCanvasList;
        i[a] || (i[a] = {}), i[a][t.page] || (i[a][t.page] = []), "0" == e && i[a][t.page].splice(0, i[a][t.page].length), 
        i[a][t.page].push(t.data), this.drawPPT(t.data), this.setData({
            PPTCanvasList: i
        });
    },
    drawPPT: function(t) {
        var a = this.data.rect, i = a.width, s = a.height, o = t.type, n = t.draw, c = t.color, d = t.thickness, r = this.data.CanvasContext;
        switch (Number(o)) {
          case 0:
            (0, e.clearPPTCanvas)(r);
            break;

          case 1:
            break;

          case 2:
            (0, e.drawLine)(r, n, i, s, d, c);
            break;

          case 3:
            (0, e.drawRect)(r, n, i, s, d, c);
            break;

          case 4:
            (0, e.drawCircle)(r, n, i, s, d, c);
        }
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
        }), i.closeIO();
    },
    onUnload: function() {
        i.closeIO();
    },
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