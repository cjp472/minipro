var t = getApp(), i = t.service;

t.util, require("../../utils/common.js");

Component({
    properties: {
        imgSrc: {
            type: String,
            value: ""
        },
        submitId: {
            type: String,
            value: ""
        },
        customOn: {
            type: String,
            value: ""
        }
    },
    data: {
        bgHide: !0,
        animationEnd: !1,
        showModal: !1,
        modalContent: '进入客服消息后，发送"6"获取分享链接',
        showSetting: !1,
        settingContent: ""
    },
    methods: {
        offButton: function(t) {
            var n = null, a = this;
            this.animationBG.opacity(0).step(), this.animationIN.scale(0).opacity(0).top(2e3).step(), 
            this.setData({
                animationBG: this.animationBG.export(),
                animationIN: this.animationIN.export(),
                animationEnd: !0
            }), n = setInterval(function() {
                a.data.animationEnd && (clearInterval(n), a.setData({
                    bgHide: !0
                }));
            }, 200);
            var o = t.detail.formId;
            i.submitFormId(o);
        },
        imgLoad: function(t) {
            var i = null, n = this;
            n.setData({
                bgHide: !1
            }), i = setInterval(function() {
                n.data.bgHide || (clearInterval(i), n._animationStart());
            }, 100);
        },
        binderror: function() {
            this.setData({
                bgHide: !0
            });
        },
        _animationStart: function() {
            var t = this;
            this.animationBG = wx.createAnimation({
                duration: 300,
                timingFunction: "ease-in-out"
            }), this.animationIN = wx.createAnimation({
                duration: 300,
                timingFunction: "ease-in-out"
            }), wx.getSystemInfo({
                complete: function(i) {
                    i.windowHeight ? t.animationIN.opacity(0).top(-i.windowHeight - 100).step() : t.animationIN.opacity(0).top(-2e3).step();
                }
            }), this.animationBG.opacity(0).step(), this.setData({
                animationBG: this.animationBG.export(),
                animationIN: this.animationIN.export()
            }), setTimeout(function() {
                t.animationBG.opacity(1).step(), t.animationIN.opacity(1).top(0).step(), t.setData({
                    animationBG: t.animationBG.export(),
                    animationIN: t.animationIN.export()
                });
            }, 200);
        },
        downLoadImg: function() {
            var t = this;
            i.util.showToast("正在保存..."), wx.downloadFile({
                url: t.data.imgSrc,
                success: function(n) {
                    wx.saveImageToPhotosAlbum({
                        filePath: n.tempFilePath,
                        success: function(n) {
                            i.util.hideToast(), i.util.showSuccess("图片已保存至本地相册", t), t.setData({
                                signImageVisible: !1
                            });
                        },
                        fail: function(n) {
                            i.util.hideToast(), wx.getSetting({
                                success: function(a) {
                                    a.authSetting["scope.writePhotosAlbum"] ? i.util.showError("保存失败" + n.errMsg, t) : t.setData({
                                        settingContent: "您已拒绝授权，所以无法保存图片",
                                        showSetting: !0
                                    });
                                }
                            });
                        }
                    });
                },
                fail: function(n) {
                    console.log(n), i.util.hideToast(), i.util.showError("保存失败" + n.errMsg, t);
                }
            });
        },
        openModalBox: function() {
            this.setData({
                showModal: !0
            });
        },
        modalConfirm: function() {
            this.setData({
                showModal: !1
            });
        },
        settingConfirm: function() {
            this.setData({
                showSetting: !1
            });
        }
    }
});