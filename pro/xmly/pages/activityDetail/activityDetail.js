function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var e, i = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
}, s = t(require("../shared/globalMsg/globalMsg")), n = t(require("../../requests/api/isActivityValid")), o = t(require("../../requests/api/getAlbumByActivityId")), r = t(require("../../requests/api/getQrcode")), c = t(require("../../requests/api/getAssistedInfo")), u = t(require("../../requests/api/assist")), l = t(require("../../requests/api/getAssistanceAlbumList")), d = t(require("../../requests/api/updateWechatUserInfo")), g = t(require("../../requests/api/wechatLogin")), h = t(require("../../requests/api/downloadFile")), f = t(require("../../requests/api/createActivity")), m = t(require("../../requests/api/collectNoticeId")), p = require("../../utils/util");

getApp();

Page((e = {
    data: {
        canvasShow: !1,
        posterSuccess: !1,
        getFreeSuccess: !1,
        upperLimit: !1,
        appBox: !1,
        rulesBox: !1,
        hasAssisted: !1,
        assistNum: 0,
        leftTime: null,
        endLabel: "24小时内未能集满助力",
        activityEnd: !1,
        hasGot: !1,
        shareImgDefault: "../../images/share-img-1.jpg",
        continusAssist: !1,
        clipboardBox: !1,
        clipboardData: "",
        authorizeBox: !1,
        showShareBox: !1
    },
    type: "activityDetail",
    onLoad: function(t) {
        var a = this;
        wx.showLoading({}), this.globalMsg = new s.default(this), console.log("activityDetail-options", t);
        var e = wx.getStorageSync("USER_INFO") && wx.getStorageSync("USER_INFO").isLogin, i = wx.getStorageSync("USER_INFO") && wx.getStorageSync("USER_INFO").uid || 0, n = wx.getStorageSync("USER_INFO") && wx.getStorageSync("USER_INFO").wxNickName || "", r = "https://img.alicdn.com/imgextra/i4/732450928/TB2vNE2c4xmpuFjSZFNXXXrRXXa_!!732450928.png", u = r;
        if (void 0 !== t.source) var d = t.source, g = void 0 === d ? 0 : d, h = t.activityId; else {
            var f = {
                source: 2,
                activityId: +decodeURIComponent(t.scene)
            }, g = f.source, h = f.activityId;
            wx.reportAnalytics("assist_qrcode", {
                activityid: h
            });
        }
        var m = wx.getStorageSync("gotFreeList") && wx.getStorageSync("gotFreeList")[h];
        m && this.setData({
            hasGot: m
        }), u = 0 == g ? wx.getStorageSync("USER_INFO") && wx.getStorageSync("USER_INFO").avatarUrl || r : null;
        var p = wx.getStorageSync("assistedList");
        p && p[h] && this.setData({
            hasAssisted: !0,
            count: p[h].count,
            status: p[h].status,
            myActivityId: p[h].myActivityId
        }), this.setData({
            isLogin: e,
            source: g,
            coverDefault: "https://img.alicdn.com/imgextra/i2/732450928/TB22yXCbipnpuFjSZFIXXXh2VXa_!!732450928.png",
            sponsorAvatarUrl: u,
            assistAvatarDeault: "../../images/icon-assist-avatar-default.png"
        }), Promise.all([ (0, o.default)(h).then(function(t) {
            if (1 == t.ret) {
                var e = t.data.albumInfo.configedAlbum, s = e.albumId, o = e.shareImageType, c = e.originalPrice, d = e.shareImage, f = e.subTitle, m = e.title, p = e.image, v = e.replyMsg, w = t.data.albumInfo, x = w.tracks, y = w.subscribes, b = w.leftQuantity, I = t.data, S = I.uid, D = I.userHeadImage, A = I.drawStatus, F = I.currentUserAssisted;
                a.setData({
                    uid: i,
                    urlUid: S,
                    avatarDefault: r,
                    currentUserAssisted: F,
                    hasAssisted: F,
                    activityId: h,
                    albumId: s,
                    albumTitle: m,
                    albumDesc: f,
                    albumCover: p,
                    originalPrice: c,
                    wxNickName: n,
                    shareImageType: o,
                    shareImage: d,
                    tracks: x,
                    subscribes: y,
                    replyMsg: v,
                    leftQuantity: b,
                    drawStatus: A,
                    sponsorAvatarUrl: u || D
                }), i != S && 0 != g && (0, l.default)().then(function(t) {
                    if (1 == t.ret) {
                        var e = [];
                        t.data.some(function(t) {
                            if (t.albumId != s) return 2 == e.push({
                                album_title: t.title,
                                id: t.albumId,
                                cover_url_large: t.image,
                                album_intro: t.subTitle,
                                play_count: t.play_count || 0,
                                total_count: t.total_count || 0,
                                hasGotNum: t.draw || 0
                            });
                        }), a.setData({
                            albums: e
                        });
                    }
                });
            } else a.setData({
                globalMsg: t.msg || "服务器异常，稍候再试..."
            });
        }), (0, c.default)({
            activityId: h
        }).then(function(t) {
            if (wx.hideLoading(), 1 == t.ret) {
                for (var e = t.data, i = e.avatar, s = e.maxCount, n = e.expireTime, o = i.length, r = o; r < s; r++) i[r] = "#";
                a.setData({
                    avatars: i,
                    assistNum: o,
                    maxCount: s,
                    leftTime: n - new Date()
                });
            } else a.setData({
                globalMsg: t.msg || "服务器异常，请稍候再试..."
            });
        }) ]).then(function() {
            a.stateAnalytics(a.data);
        });
    },
    onUnload: function() {
        this.setData({
            leftTime: null
        });
    },
    onReady: function() {
        var t = this;
        wx.createSelectorQuery().select(".proccess").boundingClientRect(function(a) {
            t.setData({
                borderRadius: a.height / 2 + "px"
            });
        }).exec();
    },
    onShow: function() {},
    onHide: function() {}
}, a(e, "onUnload", function() {}), a(e, "onShareAppMessage", function(t) {
    t.from;
    var a = this.data, e = a.assistNum, i = a.activityId, s = a.sponsorAvatarUrl, n = a.albumTitle, o = (a.maxCount, 
    a.originalPrice), r = a.albumCover, c = a.shareImgDefault, u = a.albumId, l = wx.getStorageSync("USER_INFO"), d = l.wxNickName, g = void 0 === d ? "" : d, h = l.nickname;
    wx.reportAnalytics("weixinqun", {
        albumid: u
    });
    var f = [ "万水千山总是情，为我助力行不行！", "没时间解释了，助力就能领" + o + "元的好课！", "【有人@我】来来来，帮我助力下", "原价" + o + "元的课，现在免费领，不来就亏！", "送你快速通道特权，免费领" + o + "元好课，永久收听！", (g || h || "ta") + "正在研究什么？速来围观！", (g || h || "ta") + "正在请求支援，速来！" ], m = [ "限时免费！" + n + " 了解一下？", "想听" + n + " ，帮帮我呗~", (g || h || "ta") + "邀请你一起免费听" + n ], p = [ c, r ], v = this.getShareImgRandom(p), w = "";
    if (w = v == c ? this.getShareTitleRandom(f, 5) : this.getShareTitleRandom(m, 2), 
    e >= 0 && i && s) return {
        title: w,
        imageUrl: v,
        path: "/pages/activityDetail/activityDetail?source=1&activityId=" + i
    };
    this.setData({
        globalMsg: "服务器异常，请稍候再试..."
    });
}), a(e, "getShareTitleRandom", function(t, a) {
    var e = t.length, i = this.data, s = i.isLogin, n = i.uid, o = i.urlUid;
    return s && n == o ? t[~~(Math.random() * (e - 1e-8))] : t[~~(Math.random() * (a - 1e-8))];
}), a(e, "getShareImgRandom", function(t) {
    var a = t.length;
    return t[~~(Math.random() * (a - 1e-8))];
}), a(e, "assist", function() {
    var t = this;
    wx.showLoading({
        mask: !0
    });
    var a = this.data.activityId, e = wx.getStorageSync("assistedList");
    if (e && e[a]) return wx.hideLoading(), void this.setData({
        globalMsg: "你已助力过，请勿重复操作！",
        hasAssisted: !0
    });
    (0, n.default)({
        activityId: a
    }).then(function(t) {
        return t.data;
    }).then(function(s) {
        s ? (0, u.default)({
            activityId: a
        }).then(function(s) {
            if (wx.hideLoading(), 1 == s.ret) {
                var n = s.data, o = n.count, r = n.status, c = n.myActivityId, u = n.albumId;
                if (t.setData({
                    status: r,
                    myActivityId: c
                }), 0 == r) return t.setData({
                    globalMsg: "今天已助力过了，挑一门喜欢的课去发起助力吧!",
                    upperLimit: !0
                }), void wx.reportAnalytics("upperlimmit", {
                    albumid: u
                });
                var l = {};
                l[a] = {
                    albumId: u,
                    count: o,
                    status: r,
                    myActivityId: c
                }, wx.setStorageSync("assistedList", i({}, e, l));
                var d = wx.getStorageSync("USER_INFO").avatarUrl;
                wx.showToast({
                    title: "助力成功",
                    icon: "success"
                });
                var g = t.data, h = g.assistNum, f = g.avatars;
                f.splice(h, 1, d), t.setData({
                    count: o,
                    hasAssisted: !0,
                    avatars: f,
                    assistNum: h + 1
                }), wx.reportAnalytics("weitazhuli", {
                    albumid: u
                });
            } else t.setData({
                globalMsg: s.msg || "助力失败！"
            });
        }) : (wx.hideLoading(), t.setData({
            globalMsg: "活动已失效！"
        }));
    }).then(function() {
        t.stateAnalytics(t.data);
    });
}), a(e, "createImage", function() {
    var t = this, a = this.data, e = a.shareImage, i = a.albumId;
    wx.reportAnalytics("pengyouquan", {
        albumid: i
    }), e ? (wx.showLoading({
        title: "海报生成中..."
    }), this.setData({
        canvasShow: !0
    }), this.getImageInfoAndInitCanvas(e).then(function(a) {
        var e = wx.getStorageSync("USER_INFO"), i = e.avatarUrl, s = e.wxNickName, n = e.nickname, o = t.data, c = o.sponsorAvatarUrl, u = o.tracks, l = o.shareImageType, d = (o.uid, 
        o.originalPrice), g = o.activityId, f = (o.albumId, o.albumTitle), m = o.avatarDefault, p = o.canvasW, v = o.canvasH, w = t.length, x = wx.createCanvasContext("share");
        x.drawImage(a, 0, 0, p, v), 1 == l && (x.setFillStyle("#ffffff"), x.setFontSize(w(12)), 
        x.setTextAlign("left"), x.fillText(s || n, w(61), w(29)), x.fillText("正在收听《" + f + "》", w(61), w(55)), 
        x.fillText("原价￥" + d, w(163), w(445)), x.setStrokeStyle("#ffffff"), x.moveTo(w(163), w(440)), 
        x.lineTo(w(218), w(440)), x.stroke(), x.setFillStyle("#ffffff"), x.setFontSize(w(14)), 
        x.setTextAlign("left"), x.fillText("完成助力，ta将领取" + u + "节完整课程", w(21), w(478)), x.fillText("长按识别", w(260), w(478)), 
        x.draw(), (0, r.default)({
            page: "pages/activityDetail/activityDetail",
            scene: "" + g
        }).then(function(a) {
            if ("string" != typeof a || !a.includes("http")) return wx.hideLoading(), t.setData({
                globalMsg: a.msg || "生成失败，请稍后重试！",
                posterSuccess: !1,
                canvasShow: !1
            }), !1;
            Promise.all([ (0, h.default)(a), (0, h.default)(i || c || m) ]).then(function(t) {
                var a = t[0], e = t[1];
                return 200 === a.statusCode && (x.save(), x.beginPath(), x.arc(w(289), w(436), w(26), 0, 2 * Math.PI), 
                x.clip(), x.drawImage(a.tempFilePath, w(263), w(410), w(52), w(52)), x.restore(), 
                x.draw(!0)), 200 === e.statusCode && (x.save(), x.beginPath(), x.arc(w(35), w(32), w(19), 0, 2 * Math.PI), 
                x.clip(), x.drawImage(e.tempFilePath, w(16), w(13), w(38), w(38)), x.restore(), 
                x.draw(!0)), 200 === e.statusCode && 200 === a.statusCode;
            }).then(function(a) {
                wx.hideLoading(), t.setData({
                    posterSuccess: !0
                }), a || t.setData({
                    globalMsg: "生成失败，请稍后重试！"
                });
            }, function() {
                t.createFail();
            }).catch(function(a) {
                t.createFail();
            });
        })), 2 == l && (x.setFillStyle("#F86642"), x.setFontSize(w(18)), x.setTextAlign("center"), 
        x.fillText(f, w(173), w(340)), x.setFillStyle("#F86642"), x.setFontSize(w(14)), 
        x.setTextAlign("center"), x.fillText("完成助力，ta将领取" + u + "节完整课程", w(173), w(463)), 
        x.draw(), (0, r.default)({
            page: "pages/activityDetail/activityDetail",
            scene: "" + g
        }).then(function(a) {
            if ("string" != typeof a || !a.includes("http")) return wx.hideLoading(), t.setData({
                globalMsg: a.msg || "生成失败，请稍后重试！",
                posterSuccess: !1,
                canvasShow: !1
            }), !1;
            Promise.all([ (0, h.default)(a), (0, h.default)(i || c || m) ]).then(function(t) {
                var a = t[0], e = t[1];
                return 200 === a.statusCode && (x.save(), x.beginPath(), x.arc(w(140), w(407), w(29), 0, 2 * Math.PI), 
                x.clip(), x.drawImage(a.tempFilePath, w(111), w(378), w(58), w(58)), x.restore(), 
                x.draw(!0)), 200 === e.statusCode && (x.save(), x.beginPath(), x.arc(w(173), w(80), w(24), 0, 2 * Math.PI), 
                x.clip(), x.drawImage(e.tempFilePath, w(149), w(56), w(48), w(48)), x.restore(), 
                x.draw(!0)), 200 === e.statusCode && 200 === a.statusCode;
            }).then(function(a) {
                wx.hideLoading(), t.setData({
                    posterSuccess: !0
                }), a || t.setData({
                    globalMsg: "生成失败，请稍后重试！"
                });
            }, function() {
                t.createFail();
            }).catch(function(a) {
                t.createFail();
            });
        }));
    })) : this.setData({
        globalMsg: "服务器异常，稍候再试..."
    });
}), a(e, "save", function() {
    var t = this;
    this.closeShareBox();
    var a = this.data, e = a.canvasW, i = a.canvasH, s = a.posterSuccess, n = a.albumId;
    wx.reportAnalytics("zhuli_cuntu", {
        albumid: n
    }), s && (this.setData({
        posterSuccess: !1
    }), wx.canvasToTempFilePath({
        canvasId: "share",
        destWidth: 4 * e,
        destHeight: 4 * i,
        success: function(a) {
            t.setData({
                tempFilePath: a.tempFilePath
            }), wx.authorize({
                scope: "scope.writePhotosAlbum",
                success: function() {
                    wx.saveImageToPhotosAlbum({
                        filePath: a.tempFilePath,
                        success: function(a) {
                            t.setData({
                                canvasShow: !1
                            }), t.showClipboardBox();
                        }
                    });
                },
                fail: function() {
                    t.showAuthorizeBox();
                }
            });
        },
        complete: function() {
            t.setData({
                canvasShow: !1
            });
        }
    }));
}), a(e, "joinGroup", function() {
    var t = this.data.replyMsg;
    wx.reportAnalytics("jiaqun", {
        grouptype: t
    });
}), a(e, "getImageInfoAndInitCanvas", function(t) {
    var a = this;
    return new Promise(function(e, i) {
        (0, h.default)(t).then(function(t) {
            wx.getSystemInfo({
                success: function(i) {
                    var s = i.screenWidth;
                    i.screenHeight, i.pixelRatio;
                    wx.getImageInfo({
                        src: t.tempFilePath,
                        success: function(i) {
                            a.setData({
                                canvasW: .75 * s,
                                canvasH: .75 * s * i.height / i.width
                            }), e(t.tempFilePath);
                        }
                    });
                }
            });
        });
    });
}), a(e, "length", function(t) {
    return this.data.canvasW * t / 347;
}), a(e, "createFail", function() {
    wx.hideLoading(), this.setData({
        posterSuccess: !0,
        globalMsg: "生成失败，请稍后重试！"
    });
}), a(e, "tofreeGetList", function(t) {
    (0, p.jumpTo)({
        url: "../freeGetList/freeGetList"
    }), wx.reportAnalytics("morefreeget", {
        albumid: this.data.albumId,
        index: t.currentTarget.dataset.index
    });
}), a(e, "toAlbumDeail", function() {
    var t = this.data, a = (t.activityId, t.albumId);
    wx.reportAnalytics("albuminactivity", {
        albumid: a
    }), (0, p.jumpTo)({
        url: "../paidPackage/pages/albumDetailPaid/albumDetailPaid?albumId=" + a + "&isAssistant=1&ispaid=1"
    });
}), a(e, "stateAnalytics", function(t) {
    var a = t.uid, e = t.urlUid, i = t.source, s = t.drawStatus, n = t.hasGot, o = t.assistNum, r = t.maxCount, c = t.activityEnd, u = t.hasAssisted, l = t.isLogin, d = 0;
    d = a == e || 0 == i ? 1 == s ? n ? 1 : 2 : 2 == s && o >= r ? 3 : c ? 4 : 5 : u ? 6 : 7, 
    wx.reportAnalytics("zhulizhuangtai", {
        state: l ? d : 8
    });
}), a(e, "canvasHide", function() {
    this.setData({
        posterSuccess: !1,
        canvasShow: !1
    });
}), a(e, "nothing", function() {}), a(e, "showClipboardBox", function() {
    var t = this.data, a = t.albumTitle, e = t.albumDesc, i = t.originalPrice;
    this.setData({
        clipboardBox: !0,
        clipboardData: "我在听《" + a + "》，" + e + "，课程还不错，原价" + i + "元，限时免费听，一起来学习吧！"
    });
}), a(e, "closeClipboardBox", function() {
    this.setData({
        clipboardBox: !1
    });
}), a(e, "setClipboard", function() {
    var t = this, a = this.data, e = a.clipboardData, i = a.albumId;
    wx.setClipboardData({
        data: e,
        success: function(a) {
            t.closeClipboardBox(), wx.reportAnalytics("sharepengyouquan", {
                albumid: i
            });
        }
    });
}), a(e, "showAuthorizeBox", function() {
    this.setData({
        authorizeBox: !0
    });
}), a(e, "closeAuthorizeBox", function() {
    this.setData({
        authorizeBox: !1
    });
}), a(e, "toSetting", function() {
    var t = this;
    this.closeAuthorizeBox(), wx.openSetting({
        success: function(a) {
            a.authSetting["scope.writePhotosAlbum"] && wx.saveImageToPhotosAlbum({
                filePath: t.data.tempFilePath,
                success: function(a) {
                    t.setData({
                        canvasShow: !1
                    }), t.showClipboardBox();
                }
            });
        }
    });
}), a(e, "showAppBox", function() {
    this.setData({
        getFreeSuccess: !1
    });
    var t = this.data.albumId;
    (0, p.jumpTo)({
        url: "../paidPackage/pages/albumDetailPaid/albumDetailPaid?albumId=" + t + "&isAssistant=1&ispaid=1"
    });
}), a(e, "closeAppBox", function() {
    this.setData({
        appBox: !1
    });
}), a(e, "showRulesBox", function() {
    this.setData({
        rulesBox: !0
    });
}), a(e, "closeRulesBox", function() {
    this.setData({
        rulesBox: !1
    });
}), a(e, "showShareBox", function() {
    var t = this.data, a = t.albumId, e = t.source;
    wx.reportAnalytics("activityinvite", {
        albumid: a,
        source: e
    }), this.setData({
        showShareBox: !0
    });
}), a(e, "closeShareBox", function() {
    this.setData({
        showShareBox: !1
    });
}), a(e, "getFreeSuccess", function() {
    var t = this, e = this.data, s = e.activityId, n = e.albumId, o = wx.getStorageSync("gotFreeList") || {};
    wx.setStorageSync("gotFreeList", i({}, o, a({}, s, !0))), this.setData({
        hasGot: !0,
        getFreeSuccess: !0
    }), wx.reportAnalytics("dianjilingqu", {
        albumid: n
    }), setTimeout(function() {
        t.stateAnalytics(t.data);
    }, 0);
}), a(e, "collectNoticeId", function(t) {
    var a = t.detail.formId;
    this.data.isLogin && (0, m.default)(a).then(function(t) {
        console.log("collectNoticeId", t);
    }).catch(function(t) {
        console.log(t);
    });
}), a(e, "activityEnd", function() {
    var t = this;
    this.setData({
        activityEnd: !0
    }), setTimeout(function() {
        t.stateAnalytics(t.data);
    }, 0);
}), a(e, "createActivityAndRefresh", function(t) {
    var a = this, e = t.detail.formId, i = this.data, s = i.isLogin, n = i.albumId, o = i.urlUid, r = i.uid, c = i.status, u = void 0 === c ? null : c, l = i.drawStatus, d = i.source;
    s && (wx.showLoading({
        mask: !0
    }), 1 == u || 1 == l ? wx.redirectTo({
        url: "../paidPackage/pages/albumDetailPaid/albumDetailPaid?albumId=" + n + "&isAssistant=1&ispaid=1"
    }) : 2 == u || 2 == l ? this.setData({
        globalMsg: "该专辑已被抢完，去看看其他的吧~"
    }) : (0, f.default)({
        albumId: n,
        isOrigin: !(r != o && !upperLimit),
        noticeId: e
    }).then(function(t) {
        if (wx.hideLoading(), 1 == t.ret) {
            var e = t.data;
            wx.redirectTo({
                url: "../activityDetail/activityDetail?source=" + d + "&activityId=" + e
            });
        } else t.msg && a.setData({
            globalMsg: t.msg
        });
    }), r != o && wx.reportAnalytics("woyeyaoling", {
        albumid: n
    }));
}), a(e, "wechatLogin", function(t) {
    var a = this, e = t.detail.errMsg;
    a.setData({
        wxIsLoading: !0
    }), e.includes(":ok") ? wx.login({
        success: function(t) {
            wx.getUserInfo({
                withCredentials: !0,
                success: function(e) {
                    var i = e.encryptedData, s = e.iv, n = e.userInfo, o = n.avatarUrl, r = n.nickName;
                    (0, g.default)({
                        js_code: t.code,
                        encryptedData: i,
                        iv: s
                    }).then(function(t) {
                        t.avatarUrl = o, t.wxNickName = r, t.loginType = "wx", 0 == t.ret && "微信小程序授权失败" !== t.msg ? a.loginSuccessful(a, t) : (wx.hideLoading(), 
                        a.setData({
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
            a.setData({
                globalMsg: t
            });
        }
    }) : a.setData({
        wxIsLoading: !1,
        globalMsg: "微信授权失败"
    });
}), a(e, "loginSuccessful", function(t, a) {
    wx.setStorage({
        key: "USER_INFO",
        data: Object.assign({}, a, {
            isLogin: !0
        }),
        success: function() {
            wx.showToast({
                title: "登录成功",
                icon: "success",
                mask: !0,
                duration: 1e3,
                success: function() {
                    var e = this;
                    t.setData({
                        isLogin: !0,
                        uid: a.uid
                    });
                    var i = t.data, s = i.urlUid, n = i.source;
                    a.uid != s && 0 != n && (0, o.default)(t.data.activityId).then(function(a) {
                        if (1 == a.ret) {
                            var i = a.data.currentUserAssisted;
                            t.setData({
                                hasAssisted: i
                            }), i || t.assist();
                        } else e.setData({
                            globalMsg: a.msg || "服务器异常，稍候再试..."
                        });
                    }), setTimeout(function() {
                        t.stateAnalytics(t.data);
                    }, 0);
                }
            }), (0, d.default)({
                id: a.openId,
                headImage: a.avatarUrl,
                nickName: a.wxNickName || a.nickname
            }).catch(function(t) {
                console.log(t);
            });
        },
        complete: function() {}
    });
}), e));