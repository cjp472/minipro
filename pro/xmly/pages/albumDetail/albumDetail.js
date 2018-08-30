function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

function a(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

t(require("../../utils/moment.min"));

var s, o = require("../../utils/util"), i = t(require("../shared/player/Player")), n = t(require("../shared/globalMsg/globalMsg")), r = t(require("../shared/tab/tab")), l = (t(require("../../requests/api/getPlayPage")), 
t(require("../../requests/api/getAlbum"))), c = t(require("../../requests/api/getAlbumTrack")), u = t(require("../../requests/api/subscribe")), g = t(require("../../requests/api/getQrcode")), h = t(require("../../requests/api/downloadFile")), d = t(require("../../requests/api/wechatLogin")), f = t(require("../../requests/api/updateWechatUserInfo")), m = getApp();

Page((s = {
    data: {
        pageId: 1,
        isLoading: !1,
        isAll: !1,
        tittleOffsetTop: 0,
        platform: wx.getSystemInfoSync().platform,
        displayMode: 1,
        albumCommentData: null,
        commentPageId: 1,
        showGoToTopBtn: !1,
        showGoToIndex: !1,
        isAsc: !0,
        showPages: !1,
        choosingPage: !1,
        changeASC: !1,
        choosedPage: null,
        fixed: !1,
        loading: !1,
        showShareBox: !1,
        posterBox: !1,
        authorizeBox: !1,
        posterSuccess: !1,
        tracks: {
            list: [],
            pageId: 0,
            prevPage: 0,
            isAll: !1
        },
        defaultAlbumCover: "https://img.alicdn.com/imgextra/i2/732450928/TB22yXCbipnpuFjSZFIXXXh2VXa_!!732450928.png"
    },
    type: "albumDetail",
    onLoad: function(t) {
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), this.getTittleOffsetTop(), t.scene && (t.albumId = t.scene, wx.reportAnalytics("album_qrcode", {
            albumid: t.albumId,
            albumtype: 0
        }));
        var e = parseInt(t.albumId, 10), a = !!wx.getStorageSync("USER_INFO").isLogin && wx.getStorageSync("USER_INFO").isLogin;
        this.player = new i.default(this), this.globalMsg = new n.default(this), this.setData({
            showGoToIndex: 1 === getCurrentPages().length,
            albumId: e,
            isLogin: a
        }), this.getAlbum(), this.getTracks(), wx.reportAnalytics("zhuanji", {
            albumid: e
        }), wx.reportAnalytics("albumtype", {
            albumtype: 0
        });
    },
    onReady: function() {
        wx.hideLoading();
    },
    getAlbum: function() {
        var t = this, e = this.data.albumId;
        (0, l.default)({
            albumId: e,
            source: 1
        }).then(function(e) {
            var a = e.data.album, s = a.albumId, i = a.title, n = a.coverLarge, r = a.coverMiddle, l = a.coverSmall, c = a.customSubTitle, u = a.subscribeCount, g = a.tracks, h = a.intro, d = a.introRich, f = a.isFavorite, m = a.orderNo;
            t.setData({
                album: {
                    albumId: s,
                    title: i,
                    coverLarge: n,
                    coverMiddle: r,
                    coverSmall: l,
                    customSubTitle: c,
                    realSubscribeCount: u,
                    subscribeCount: (0, o.numToString)(u),
                    tracks: g,
                    intro: h,
                    introRich: t.formatIntroRich(d),
                    isFavorite: f,
                    orderNo: m
                }
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    handleTabChange: function(t) {
        if (2 === t) {
            var e = this.data.albumId;
            wx.reportAnalytics("zhuanjixiangqing", {
                type: "评论",
                album_id: e
            });
        }
    },
    onShareAppMessage: function(t) {
        var e = this.data, a = e.album, s = e.albumId;
        return wx.reportAnalytics("share_album_wxq", {
            albumid: s
        }), {
            title: a.title,
            imageUrl: a.coverLarge,
            path: "/pages/albumDetail/albumDetail?albumId=" + (a && a.albumId),
            success: function() {
                wx.reportAnalytics("albumdetail_click_share", {});
            }
        };
    },
    subscribe: function(t) {
        var e = this;
        wx.showLoading({
            mask: !0
        });
        var a = e.data, s = a.isLogin, i = a.albumId;
        if (s) {
            var n = e.data.album, r = n.isFavorite, l = n.realSubscribeCount, c = (n.subscribeCount, 
            r ? 0 : 1);
            (0, u.default)(c, i).then(function(t) {
                if (1 === t.ret) {
                    e.data.freeAlbum;
                    0 === c ? e.setData({
                        "album.realSubscribeCount": l - 1,
                        "album.subscribeCount": (0, o.numToString)(l - 1)
                    }) : 1 === c && e.setData({
                        "album.realSubscribeCount": l + 1,
                        "album.subscribeCount": (0, o.numToString)(l + 1)
                    }), e.setData({
                        "album.isFavorite": !r
                    }), wx.hideLoading();
                } else 0 === t.ret ? (e.setData({
                    globalMsg: t.msg
                }), wx.hideLoading()) : (e.setData({
                    globalMsg: "您已经收藏过此专辑！"
                }), wx.hideLoading());
            });
        } else wx.switchTab({
            url: "../myPage/myPage"
        }), m.fromPage = {
            page: "albumDetail/albumDetail",
            query: "albumId=" + i + "&action=subscribe"
        };
    },
    playAndJumpToDetail: function(t) {
        var e = t.currentTarget.dataset.trackId;
        m.player.canPlay = !0, this.setPlaylist(e), wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 3e3
        }), m.player.select(e, function() {
            m.player.play(e), (0, o.jumpTo)({
                url: "../soundPage/soundPage?trackId=" + e
            }), wx.reportAnalytics("play_sound", {
                play_sound_souce: "专辑页"
            });
        });
    },
    jumpToDetail: function(t) {
        var e = t.currentTarget.dataset.trackId;
        this.setPlaylist(t), m.player.select(e, function() {
            (0, o.jumpTo)({
                url: "../soundPage/soundPage?trackId=" + e
            });
        });
    },
    playFreeTracksNoJump: function(t) {
        var e = t.currentTarget.dataset.trackId;
        this.setPlaylist(t), m.player.play(e);
    },
    pauseFreeTracksNoJump: function(t) {
        m.player.pause();
    },
    setPlaylist: function(t) {
        var e = this.data.tracks.list, a = [];
        e.forEach(function(t) {
            a.push(t.trackId);
        }), m.player.cacheSounds(e), m.player.setPlaylist(a);
    },
    getTracks: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], s = this.data, i = s.albumId, n = s.tabInit, r = s.choosingPage, l = s.choosedPage, u = s.loading, g = s.isAsc, h = s.changeASC, d = s.tracks, f = d.list, m = (d.maxPageId, 
        d.pageId), p = (d.pageSize, d.totalCount, d.prevPage), b = d.isAll;
        if (!u) {
            var x = h ? 1 : e ? p : r ? l : m + 1, w = h ? 0 : r ? l - 1 : e ? p - 1 : p;
            (!b || r || h || e && w > 0) && (this.setData({
                loading: !0
            }), (0, c.default)({
                albumId: i,
                isAsc: g,
                pageId: x
            }).then(function(s) {
                var i = s.data, l = i.list, c = i.maxPageId, u = i.pageId, g = i.pageSize, d = i.totalCount;
                (0, o.format)(l, {
                    createdAt: "createdAt",
                    duration: "duration"
                }), l.length && (0, o.multNumToString)(l, [ "playtimes", "comments" ]), l.forEach(function(t) {
                    t.calcDuration = (0, o.formatDuration)(t.duration);
                });
                var m = h || r ? l : e ? [].concat(a(l), a(f)) : [].concat(a(f), a(l));
                t.setData({
                    tracks: {
                        list: m,
                        maxPageId: c,
                        pageId: u,
                        pageSize: g,
                        totalCount: d,
                        prevPage: w,
                        isAll: u >= c
                    },
                    choosingPage: !1,
                    changeASC: !1,
                    loading: !1,
                    toUpper: !1
                }), !n && (t.initTab(), t.initPages());
            }).catch(function(t) {
                console.log(t);
            }));
        }
    },
    onReachBottom: function() {
        1 != this.data.Tab.index || this.getTracks();
    },
    initTab: function() {
        var t = this, e = this, a = this.data.tracks.totalCount;
        new r.default({
            data: {
                list: [ "详情", "节目 " + a ],
                index: 1
            },
            callback: function(t) {
                e.handleTabChange(t);
            }
        }) && this.setData({
            tabInit: !0
        }), wx.getSystemInfo({
            success: function(e) {
                var a = e.windowHeight, s = e.statusBarHeight;
                t.setData({
                    windowHeight: a,
                    statusBarHeight: s,
                    tabHeight: 50,
                    fixedViewHeight: 47
                });
            }
        }), wx.createSelectorQuery().select(".album-header").boundingClientRect().exec(function(e) {
            console.log(e);
            var a = e[0], s = a.height;
            a.top;
            t.setData({
                headerHeight: s
            });
        });
    },
    initPages: function() {
        var t = this.data, e = t.isAsc, a = t.tracks, s = a.maxPageId, o = a.pageSize, i = a.totalCount, n = [];
        if (e) for (var r = 0; r < s; r++) {
            var l = r * o + 1, c = l + o - 1 > i ? i : l + o - 1;
            n.push(l + "~" + c);
        } else for (var u = 0; u < s; u++) {
            var g = i - u * o, h = g - o - 1 < 1 ? 1 : g - o - 1;
            n.push(g + "~" + h);
        }
        this.setData({
            pages: n
        });
    },
    switchPagesBox: function() {
        var t = this.data.showPages;
        this.setData({
            showPages: !t
        });
    },
    switchASC: function() {
        var t = this.data.isAsc;
        this.setData({
            changeASC: !0,
            isAsc: !t,
            choosedPage: null
        }), this.getTracks(), this.initPages();
    },
    choosePage: function(t) {
        var e = t.currentTarget.dataset.pageId;
        console.log(t.currentTarget.dataset);
        var a = this.data, s = a.showPages, o = a.choosedPage;
        this.setData({
            choosedPage: e,
            choosingPage: !0,
            showPages: !s,
            "tracks.list": []
        }), o != e && this.getTracks();
    },
    toAnnouncer: function(t) {
        (0, o.jumpTo)({
            url: "../announcer/announcer?id=" + t.currentTarget.dataset.id
        });
    },
    toSample: function(t) {
        var e = this.data, a = e.paidAlbum, s = e.albumId;
        wx.reportAnalytics("sample", {
            albumid: s
        }), a.paidTracks && a.paidTracks.length > 0 ? this.playAndJumpToDetail(t) : this.setData({
            globalMsg: "该专辑还未发布任何声音。"
        });
    },
    onPageScroll: function(t) {
        var e = this.data, a = (e.tittleOffsetTop, e.headerHeight), s = e.album.title, o = (e.Tab.index, 
        t.scrollTop);
        this.setData({
            fixed: o >= a,
            showGoToTopBtn: o >= 350
        }), wx.setNavigationBarTitle({
            title: o >= a ? s : "专辑详情"
        });
    },
    goToTop: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },
    getTittleOffsetTop: function() {
        var t = this, e = wx.createSelectorQuery();
        e.select(".banner-title-free").boundingClientRect(), e.exec(function(e) {
            e[0] ? t.setData({
                tittleOffsetTop: e[0].height + e[0].top
            }) : t.setData({
                tittleOffsetTop: -1
            });
        });
    },
    getTabOffsetTop: function() {
        var t = this, e = wx.createSelectorQuery();
        e.select(".tab").boundingClientRect(), e.exec(function(e) {
            var a = e[0];
            a.height;
            a.top < 0 && t.setData({
                fixed: !0
            });
        });
    },
    formatIntroRich: function(t) {
        return t && (t = t.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')), 
        t;
    },
    showShareBox: function() {
        this.setData({
            showShareBox: !0
        });
    },
    nothing: function() {},
    getImageInfoAndInitCanvas: function(t) {
        var e = this;
        return new Promise(function(a, s) {
            wx.getSystemInfo({
                success: function(s) {
                    console.log("shareImage", t);
                    var o = s.screenWidth;
                    s.screenHeight, s.pixelRatio;
                    wx.getImageInfo({
                        src: t,
                        success: function(s) {
                            console.log("imgInfo", s), e.setData({
                                canvasW: .85 * o * 2,
                                canvasH: .85 * o * 2 * s.height / s.width
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
            var s = wx.getStorageSync("USER_INFO"), o = s.avatarUrl, i = s.wxNickName, n = s.nickname, r = t.data, l = r.album, c = l.albumId, u = l.title, d = l.coverLarge, f = (l.customSubTitle, 
            l.subscribeCount), m = r.canvasW, p = r.canvasH, b = r.platform, x = t.length, w = wx.createCanvasContext("poster");
            w.setFillStyle("#ECEDF1"), w.fillRect(0, 0, m, p), w.save(), w.setShadow(0, x(2), x(4), "#B8C0DF"), 
            w.drawImage(e, x(20), x(20), m - x(40), p - x(40)), w.restore(), w.setShadow(0, 0, 0, "rgba(0,0,0,0)"), 
            w.save(), w.font = "normal bold " + ~~x(16) + "px " + ("ios" == b || "devtools" == b ? "Helvetica" : "Noto"), 
            w.setFillStyle("#002800"), w.setFontSize(x(16)), w.setTextAlign("left"), w.fillText(i || n, x(90), x(74));
            var v = w.measureText(i || n).width / 2;
            w.setFillStyle("#F86442"), w.setTextAlign("left"), w.fillText("推荐", x(90 + v + 16), x(74)), 
            w.restore(), w.setFillStyle("#777777"), w.setFontSize(x(12)), w.setTextAlign("left"), 
            w.fillText("这个节目不错，也推荐给你", x(90), x(91)), w.setFillStyle("#333333"), w.setFontSize(x(20)), 
            w.setTextAlign("center");
            var I = t.calcFontWidth(u, w);
            I.forEach(function(t, e) {
                w.fillText(t, m / 2, x(364 + 26 * e));
            }), w.setFillStyle("#888888"), w.setFontSize(x(14)), w.setTextAlign("center"), w.fillText(f + "人收藏", m / 2, x(392 + 20 * (I.length - 1))), 
            w.drawImage("../../images/xmlogo.png", x(48), x(499), x(84), x(13.2)), w.setFillStyle("#666666"), 
            w.setFontSize(x(12)), w.setTextAlign("center"), w.fillText("长按二维码收听", x(276), x(514)), 
            w.draw(), (0, g.default)({
                page: "pages/albumDetail/albumDetail",
                scene: c + ""
            }).then(function(e) {
                "string" == typeof e && e.includes("http") ? (d = d.replace("http:", "https:"), 
                Promise.all([ (0, h.default)(e), (0, h.default)(o), (0, h.default)(d) ]).then(function(e) {
                    console.log(2, e);
                    var a = e[0].tempFilePath, s = e[1].tempFilePath, o = e[2].tempFilePath;
                    w.save(), w.beginPath(), w.arc(x(60), x(75), x(20), 0, 2 * Math.PI), w.clip(), w.drawImage(s, x(40), x(55), x(40), x(40)), 
                    w.restore(), w.save(), w.beginPath(), w.arc(m / 2, x(215), x(110 * Math.sqrt(2) - 8), 0, 2 * Math.PI), 
                    w.clip(), w.drawImage(o, x(70), x(105), x(220), x(220)), w.restore(), w.save(), 
                    w.beginPath(), w.arc(x(276), x(460), x(33), 0, 2 * Math.PI), w.clip(), w.drawImage(a, x(243), x(430), x(66), x(66)), 
                    w.restore(), w.draw(!0, function() {
                        wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            width: m,
                            height: p,
                            canvasId: "poster",
                            success: function(e) {
                                console.log("res", e.tempFilePath), t.setData({
                                    posterPath: e.tempFilePath,
                                    posterSuccess: !0
                                });
                            }
                        });
                    }), wx.hideLoading();
                }).catch(function(e) {
                    wx.hideLoading(), t.closePosterBox(), console.log(e);
                })) : (wx.hideLoading(), t.closePosterBox(), t.setData({
                    globalMsg: "生成失败，请稍后重试！"
                }));
            });
        }).catch(function(e) {
            wx.hideLoading(), t.closePosterBox(), console.log(e);
        }), wx.reportAnalytics("share_album_pyq", {
            albumid: this.data.albumId
        });
    },
    savePoster: function() {
        var t = this;
        this.closePosterBox();
        var e = this.data, a = (e.canvasW, e.canvasH, e.posterSuccess), s = (e.albumId, 
        e.posterPath);
        a && (this.setData({
            posterSuccess: !1
        }), console.log("save"), wx.authorize({
            scope: "scope.writePhotosAlbum",
            success: function() {
                wx.saveImageToPhotosAlbum({
                    filePath: s,
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
        }), wx.reportAnalytics("save_album_poster", {
            albumid: this.data.albumId
        }));
    },
    calcFontWidth: function(t, e) {
        var a = this.data.canvasW, s = 0, o = 0, i = !1;
        return t.split("").forEach(function(t, n) {
            (s += e.measureText(t).width) < a - 10 ? o = n : i = !0;
        }), i ? [ t.substring(0, o), t.substring(o, 2 * o - 1) + "..." ] : [ t ];
    },
    toSetting: function(t) {
        var e = this;
        this.closeAuthorizeBox(), console.log("settingdata", t), t.detail.authSetting["scope.writePhotosAlbum"] && wx.saveImageToPhotosAlbum({
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
    }
}, e(s, "showShareBox", function() {
    var t = this.data, e = t.albumId;
    t.source;
    wx.reportAnalytics("share_album_share", {
        albumid: e
    }), this.setData({
        showShareBox: !0
    });
}), e(s, "closeShareBox", function() {
    this.setData({
        showShareBox: !1
    });
}), e(s, "length", function(t) {
    return this.data.canvasW * t / 360;
}), e(s, "handleAlbumCoverLoad", function(t) {
    this.getTittleOffsetTop();
}), e(s, "wechatLogin", function(t) {
    var e = this, a = t.detail.errMsg, s = t.currentTarget.dataset.action;
    e.setData({
        wxIsLoading: !0
    }), a.includes(":ok") ? wx.login({
        success: function(t) {
            console.log("wxlogin", t), wx.getUserInfo({
                withCredentials: !0,
                success: function(a) {
                    var o = a.encryptedData, i = a.iv, n = a.userInfo, r = n.avatarUrl, l = n.nickName;
                    (0, d.default)({
                        js_code: t.code,
                        encryptedData: o,
                        iv: i
                    }).then(function(t) {
                        t.avatarUrl = r, t.wxNickName = l, t.loginType = "wx", t.action = s, 0 == t.ret && "微信小程序授权失败" !== t.msg ? e.loginSuccessful(e, t) : (wx.hideLoading(), 
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
}), e(s, "loginSuccessful", function(t, e) {
    wx.setStorage({
        key: "USER_INFO",
        data: Object.assign({}, e, {
            isLogin: !0
        }),
        success: function() {
            console.log("loginSuccessful"), wx.showToast({
                title: "登录成功",
                icon: "success",
                mask: !0,
                duration: 1e3,
                success: function() {
                    t.setData({
                        isLogin: !0,
                        uid: e.uid
                    }), "createPoster" == e.action && t.createPoster();
                }
            }), (0, f.default)({
                id: e.openId,
                headImage: e.avatarUrl,
                nickName: e.wxNickName || e.nickname
            }).then(function(t) {
                console.log("data.avatarUrl", e.avatarUrl), console.log("data.uid", e.uid), console.log("updateWechatUserInfoRes", t);
            });
        },
        complete: function() {}
    });
}), s));