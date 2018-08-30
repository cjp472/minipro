function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = require("../../utils/util"), a = t(require("../shared/globalMsg/globalMsg")), i = t(require("../shared/player/Player")), s = t(require("../shared/actionSheet/actionSheet")), o = t(require("../../requests/api/subscribe")), n = t(require("../../requests/api/unsubscribe")), r = t(require("../../requests/api/getPlayPage")), c = (t(require("../../requests/api/getPlaylist")), 
t(require("../../requests/api/getTrackBoughtStatus"))), l = t(require("../../requests/api/getAlbumBoughtStatus")), u = t(require("../../requests/api/downloadFile")), d = t(require("../../requests/api/getQrcode")), h = t(require("../../requests/api/wechatLogin")), g = t(require("../../requests/api/updateWechatUserInfo")), p = (t(require("../../requests/api/getAlbumByActivityId")), 
t(require("../../requests/api/collectNoticeId"))), f = getApp();

Page({
    data: {
        isBoxShowing: !1,
        authorizeBox: !1,
        posterSuccess: !1,
        posterBox: !1,
        aniIteration: !0,
        platform: wx.getSystemInfoSync().platform,
        currentPosition: 0,
        closeTimeArray: [ "不开启", "10分钟后", "20分钟后", "30分钟后", "50分钟后", "60分钟后", "100分钟后" ]
    },
    type: "soundPage",
    onLoad: function(t) {
        t.trackId, t.fromHistory, t.fromIndex;
        console.log("options", t), t.scene && (t.trackId = t.scene, wx.reportAnalytics("sound_qrcode", {
            trackid: t.trackId
        })), this.setData({
            showGoToIndex: 1 === getCurrentPages().length
        }), this.actionSheet = new s.default(this), this.player = new i.default(this), this.globalMsg = new a.default(this);
        var e = wx.getStorageSync("USER_INFO").isLogin, o = void 0 !== e && e;
        this.setData({
            isLogin: o,
            options: t
        }), this.getSliderInfo(), f.player.on("playerFocusId", this.onPlayerFocusId), f.player.on("play", this.onPlay), 
        f.player.on("soundchange", this.onSoundchange), f.player.on("playerStateChange", this.playerStateChangeHandler);
    },
    onReady: function() {
        this.getSoundData(this.data.options.trackId);
    },
    onUnload: function() {
        f.player.removeListener("playerFocusId", this.onPlayerFocusId), f.player.removeListener("play", this.onPlay), 
        f.player.removeListener("soundchange", this.onSoundchange);
    },
    onShow: function() {
        f.paySuccess && (this.getSoundData(this.data.options.trackId), f.paySuccess = !1);
    },
    setPlaylist: function(t) {
        var e = [ this.data.playPage.trackInfo ], a = [];
        e.forEach(function(t) {
            a.push(t.trackId);
        }), f.player.cacheSounds(e), f.player.setPlaylist(a);
    },
    onPlayerFocusId: function() {
        wx.showLoading({
            title: "加载中...",
            icon: "loading",
            duration: 2e3
        });
    },
    onPlay: function() {
        wx.hideLoading();
    },
    getSoundData: function(t) {
        var a = this, i = this;
        (0, r.default)(t).then(function(s) {
            i.setData({
                playPage: s,
                isFavorite: s.otherInfo.isFavorite,
                isPaid: s.albumInfo.isPaid,
                currItemAlbumId: s.albumInfo.albumId,
                currItemTrackId: s.trackInfo.trackId,
                currItemTitle: 2 == s.albumInfo.priceTypeId ? s.albumInfo.title : s.trackInfo.title,
                currItemPrice: s.albumInfo.discountedPrice || 0,
                currItemPriceType: s.albumInfo.priceTypeId || 0,
                currItemSampleDuration: s.trackInfo.sampleDuration,
                currItemIsFree: s.trackInfo.isFree
            }), (a.data.options.scene || a.data.options.source) && (a.setPlaylist(t), f.player.select(t, function() {
                f.player.play(t), (0, e.jumpTo)({
                    url: "../soundPage/soundPage?trackId=" + t
                }), wx.reportAnalytics("play_sound", {
                    play_sound_souce: "专辑页"
                });
            })), wx.getStorageSync("USER_INFO").isLogin && s.albumInfo.isPaid && Promise.all([ (0, 
            l.default)([ +s.albumInfo.albumId ]), (0, c.default)([ +s.trackInfo.trackId ]) ]).then(function(t) {
                i.setData({
                    currItemBoughtStatus: t[0].data[0].boughtStatus || t[1].data[0].boughtStatus
                });
            });
        });
    },
    onPlayerStateChange: function(t) {
        var e = this.data, a = e.currItemSampleDuration, i = e.currItemIsFree, s = e.currItemBoughtStatus, o = e.isLogin, n = e.isPaid, r = !(!(t.currentPosition >= a && n) || i || o && s) && (f.player.pause(), 
        !0);
        this.setData({
            currItemSampleEnd: r
        });
    },
    onSoundchange: function(t) {
        try {
            this.data.isPaid;
            return void 0;
        } catch (t) {
            console.log(t);
        }
    },
    formatIntroRich: function(t) {
        return t && (t = t.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')), 
        t;
    },
    onShareAppMessage: function(t) {
        var e = this.data.player.sound;
        return wx.reportAnalytics("share_sound_wxq", {
            albumid: e.albumId
        }), {
            title: e.title,
            imageUrl: e.coverLarge,
            path: "/pages/soundPage/soundPage?trackId=" + e.trackId + "&source=1"
        };
    },
    handleCloseTimeChange: function(t) {
        var e = this.data.closeTimeArray, a = t.detail.value;
        0 == a ? f.player.closeFlag = !1 : (f.player.closeFlag = !0, f.player.closeTime = +new Date() + 6e4 * parseInt(e[a]));
    },
    handleCloseTimeCancel: function() {},
    onAniIteration: function() {
        this.aniIteration = (this.aniIteration || 0) + 1, this.aniIteration > 5 && this.setData({
            aniIteration: !1
        });
    },
    subscribe: function(t) {
        var e = this;
        wx.showLoading({
            mask: !0
        });
        var a = wx.getStorageSync("USER_INFO").isLogin, i = e.data.currItemAlbumId;
        if (a) {
            var s = e.data.isFavorite ? 0 : 1;
            (0, o.default)(s, i).then(function(t) {
                if (1 === t.ret) {
                    var a = !e.data.isFavorite;
                    e.setData({
                        isFavorite: a
                    }), wx.hideLoading();
                } else 0 === t.ret ? (e.setData({
                    globalMsg: t.msg
                }), wx.hideLoading()) : (e.setData({
                    globalMsg: "您已经收藏过此专辑！"
                }), wx.hideLoading());
            });
        } else wx.switchTab({
            url: "../myPage/myPage"
        });
    },
    unsubscribe: function(t) {
        var e = this;
        wx.showToast({
            icon: "loading"
        });
        var a = t.currentTarget.dataset.albumId;
        (0, n.default)(1, a).then(function(t) {
            if (wx.hideToast(), 0 == t.ret) {
                var a = e.data.playPage;
                a.otherInfo.isFavorite = !1, e.setData({
                    playPage: a
                });
            } else 50 == t.ret ? wx.switchTab({
                url: "../myPage/myPage"
            }) : e.setData({
                globalMsg: t.msg
            });
        });
    },
    toAlbumDetail: function(t) {
        var a = t.currentTarget.dataset.albumId;
        this.data.isPaid ? (0, e.jumpTo)({
            url: "../paidPackage/pages/albumDetailPaid/albumDetailPaid?albumId=" + a + "&ispaid=1"
        }) : (0, e.jumpTo)({
            url: "../albumDetail/albumDetail?albumId=" + a
        });
    },
    closeBox: function(t) {
        this.setData({
            isBoxShowing: !1
        });
    },
    showBox: function() {
        this.setData({
            isBoxShowing: !0
        });
    },
    nothing: function() {},
    getImageInfoAndInitCanvas: function(t) {
        var e = this;
        return new Promise(function(a, i) {
            wx.getSystemInfo({
                success: function(i) {
                    var s = i.screenWidth;
                    i.screenHeight, i.pixelRatio;
                    wx.getImageInfo({
                        src: t,
                        success: function(i) {
                            e.setData({
                                canvasW: .85 * s * 2,
                                canvasH: .85 * s * 2 * i.height / i.width
                            }), a(t);
                        }
                    });
                }
            });
        });
    },
    createPoster: function() {
        var t = this;
        wx.showLoading(), this.showPosterBox();
        var e = "../../images/poster-bg-album.png";
        this.getImageInfoAndInitCanvas(e).then(function(a) {
            var i = wx.getStorageSync("USER_INFO"), s = i.avatarUrl, o = i.wxNickName, n = i.nickname, r = t.data, c = r.options.trackId, l = r.canvasW, h = r.canvasH, g = r.platform, p = r.playPage.albumInfo.coverLarge, f = r.player.sound, m = f.calcPlaytimes, I = f.albumTitle, y = f.coverLarge, w = t.length, x = wx.createCanvasContext("poster");
            x.setFillStyle("#ECEDF1"), x.fillRect(0, 0, l, h), x.save(), x.setShadow(0, w(2), w(4), "#B8C0DF"), 
            x.drawImage(e, w(20), w(20), l - w(40), h - w(40)), x.restore(), x.setShadow(0, 0, 0, "rgba(0,0,0,0)"), 
            x.save(), x.font = "normal bold " + ~~w(16) + "px " + ("ios" == g || "devtools" == g ? "Helvetica" : "Noto"), 
            x.setFillStyle("#002800"), x.setFontSize(w(16)), x.setTextAlign("left"), x.fillText(o || n, w(90), w(74));
            var P = x.measureText(o || n).width / 2;
            x.setFillStyle("#F86442"), x.setTextAlign("left"), x.fillText("推荐", w(90 + P + 16), w(74)), 
            x.restore(), x.setFillStyle("#777777"), x.setFontSize(w(12)), x.setTextAlign("left"), 
            x.fillText("这个节目不错，也推荐给你", w(90), w(91)), x.setFillStyle("#333333"), x.setFontSize(w(20)), 
            x.setTextAlign("center");
            var v = t.calcFontWidth(I, x);
            v.forEach(function(t, e) {
                x.fillText(t, l / 2, w(364 + 26 * e));
            });
            var b = x.measureText(m + "人收听").width / 2;
            x.drawImage("../../images/icon-listen.png", l / 2 - b / 2 - w(22), w(372 + 20 * (v.length - 1)), w(22), w(22)), 
            m && (x.setFillStyle("#888888"), x.setFontSize(w(14)), x.setTextAlign("center"), 
            x.fillText(m + "人收听", l / 2 + w(22) / 2, w(388 + 20 * (v.length - 1)))), x.drawImage("../../images/xmlogo.png", w(48), w(499), w(84), w(13.2)), 
            x.setFillStyle("#666666"), x.setFontSize(w(12)), x.setTextAlign("center"), x.fillText("长按二维码收听", w(276), w(514)), 
            x.draw(), (0, d.default)({
                page: "pages/soundPage/soundPage",
                scene: c + ""
            }).then(function(e) {
                "string" == typeof e && e.includes("http") ? (p = p.replace("http:", "https:"), 
                y = y.replace("http:", "https:"), Promise.all([ (0, u.default)(e), (0, u.default)(s), (0, 
                u.default)(y || p) ]).then(function(e) {
                    var a = e[0].tempFilePath, i = e[1].tempFilePath, s = e[2].tempFilePath;
                    x.save(), x.beginPath(), x.arc(w(60), w(75), w(20), 0, 2 * Math.PI), x.clip(), x.drawImage(i, w(40), w(55), w(40), w(40)), 
                    x.restore(), x.save(), x.beginPath(), x.arc(l / 2, w(215), w(110 * Math.sqrt(2) - 8), 0, 2 * Math.PI), 
                    x.clip(), x.drawImage(s, w(70), w(105), w(220), w(220)), x.restore(), x.save(), 
                    x.beginPath(), x.arc(w(276), w(460), w(33), 0, 2 * Math.PI), x.clip(), x.drawImage(a, w(243), w(430), w(66), w(66)), 
                    x.restore(), x.draw(!0, function() {
                        wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            width: l,
                            height: h,
                            canvasId: "poster",
                            success: function(e) {
                                t.setData({
                                    posterPath: e.tempFilePath,
                                    posterSuccess: !0
                                });
                            }
                        });
                    }), wx.hideLoading();
                }).catch(function(e) {
                    wx.hideLoading(), t.closePosterBox(), console.log("err", e);
                })) : (wx.hideLoading(), t.closePosterBox(), t.setData({
                    globalMsg: "生成失败，请稍后重试！"
                }));
            });
        }).catch(function(e) {
            wx.hideLoading(), t.closePosterBox();
        }), wx.reportAnalytics("share_sound_pyq", {
            albumid: this.data.player.sound.albumId
        });
    },
    savePoster: function() {
        var t = this;
        this.closePosterBox();
        var e = this.data, a = (e.canvasW, e.canvasH, e.posterSuccess), i = e.posterPath;
        a && (this.setData({
            posterSuccess: !1
        }), wx.authorize({
            scope: "scope.writePhotosAlbum",
            success: function() {
                wx.saveImageToPhotosAlbum({
                    filePath: i,
                    success: function(e) {
                        t.setData({
                            canvasShow: !1
                        }), wx.showToast({
                            title: "保存成功",
                            icon: "success"
                        });
                    }
                });
            },
            fail: function() {
                t.showAuthorizeBox();
            }
        }), wx.reportAnalytics("save_sound_poster", {
            albumid: this.data.player.sound.albumId
        }));
    },
    calcFontWidth: function(t, e) {
        var a = this.data.canvasW, i = 0, s = 0, o = !1;
        return t.split("").forEach(function(t, n) {
            (i += e.measureText(t).width) < a - 80 ? s = n : o = !0;
        }), o ? [ t.substring(0, s), t.substring(s) ] : [ t ];
    },
    toSetting: function(t) {
        var e = this;
        this.closeAuthorizeBox(), t.detail.authSetting["scope.writePhotosAlbum"] && wx.saveImageToPhotosAlbum({
            filePath: this.data.posterPath,
            success: function(t) {
                e.closePosterBox(), wx.showToast({
                    title: "保存成功",
                    icon: "success"
                });
            }
        });
    },
    showAuthorizeBox: function() {
        this.setData({
            authorizeBox: !0
        });
    },
    closeAuthorizeBox: function() {
        this.setData({
            authorizeBox: !1
        });
    },
    showPosterBox: function() {
        this.setData({
            posterBox: !0
        });
    },
    closePosterBox: function() {
        this.setData({
            posterBox: !1
        });
    },
    length: function(t) {
        return this.data.canvasW * t / 360;
    },
    collectNoticeId: function(t) {
        var e = t.detail.formId;
        this.data.isLogin && (0, p.default)(e).then(function(t) {
            console.log("collectNoticeId", t);
        }).catch(function(t) {
            console.log(t);
        });
    },
    toConfirmPayment: function(t) {
        if (this.data.isLogin) {
            t.currentTarget.dataset;
            wx.reportAnalytics("zhuanjipay", {
                albumid: this.data.currItemAlbumId,
                albumprice: this.data.currItemPrice
            }), (0, e.jumpTo)({
                url: "/pages/confirmPayment/confirmPayment?albumId=" + this.data.currItemAlbumId + "&trackId=" + this.data.currItemTrackId + "&priceType=" + this.data.currItemPriceType + "&title=" + this.data.currItemTitle + "&price=" + this.data.currItemPrice + "&estimatedTrackCount=" + this.data.options.estimatedTrackCount + "&trackCount=" + this.data.options.trackCount
            });
        } else wx.switchTab({
            url: "../myPage/myPage"
        });
    },
    getSliderInfo: function() {
        var t = this, e = wx.createSelectorQuery();
        e.select(".player-slider").boundingClientRect(), e.exec(function(e) {
            e[0] && t.setData({
                playSliderInfo: e[0]
            });
        });
    },
    playerStateChangeHandler: function(t) {
        this.data.player.playerCtrlHolded || this.setData({
            currentPosition: t.currentPosition
        });
    },
    wechatLogin: function(t) {
        var e = this, a = t.detail.errMsg;
        e.setData({
            wxIsLoading: !0
        }), a.includes(":ok") ? wx.login({
            success: function(t) {
                wx.getUserInfo({
                    withCredentials: !0,
                    success: function(a) {
                        var i = a.encryptedData, s = a.iv, o = a.userInfo, n = o.avatarUrl, r = o.nickName;
                        (0, h.default)({
                            js_code: t.code,
                            encryptedData: i,
                            iv: s
                        }).then(function(t) {
                            t.avatarUrl = n, t.wxNickName = r, t.loginType = "wx", 0 == t.ret && "微信小程序授权失败" !== t.msg ? e.loginSuccessful(e, t) : (wx.hideLoading(), 
                            e.setData({
                                wxIsLoading: !1,
                                globalMsg: "微信授权失败，请重试"
                            }));
                        }).catch(function(t) {
                            console.log(t);
                        });
                    }
                });
            },
            fail: function(t) {
                e.setData({
                    globalMsg: t
                });
            }
        }) : e.setData({
            wxIsLoading: !1,
            globalMsg: "微信授权失败"
        });
    },
    loginSuccessful: function(t, e) {
        wx.setStorage({
            key: "USER_INFO",
            data: Object.assign({}, e, {
                isLogin: !0
            }),
            success: function() {
                wx.showToast({
                    title: "登录成功",
                    icon: "success",
                    mask: !0,
                    duration: 1e3,
                    success: function() {
                        t.setData({
                            isLogin: !0,
                            uid: e.uid
                        }), t.createPoster();
                    }
                }), (0, g.default)({
                    id: e.openId,
                    headImage: e.avatarUrl,
                    nickName: e.wxNickName || e.nickname
                }).catch(function(t) {
                    console.log(t);
                });
            },
            complete: function() {}
        });
    }
});