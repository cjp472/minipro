function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
}

var a = e(require("../shared/player/Player")), i = e(require("../../utils/moment.min")), o = require("../../utils/util"), s = e(require("../../requests/api/subscribe")), n = (e(require("../../requests/api/createFeedTop")), 
e(require("../../requests/api/deleteFeedTop")), e(require("../shared/globalMsg/globalMsg"))), r = e(require("../shared/modal/modal")), u = e(require("../../utils/formValidate")), l = e(require("../../requests/api/getVerifyCode")), c = e(require("../../requests/api/verifyCode")), d = e(require("../../requests/api/getLoginToken")), g = e(require("../../requests/api/getHomePage")), f = e(require("../../requests/api/getFeedDynamic")), h = e(require("../../requests/api/getBoughtAlbums")), p = e(require("../../requests/api/wechatLogin")), m = e(require("../../requests/api/code2session")), b = e(require("../shared/tab/tab")), v = e(require("../../requests/api/updateWechatUserInfo")), y = e(require("../../requests/api/getVIPExpireTime")), w = getApp(), x = 0;

Page({
    data: {
        pageId: 1,
        mobileShow: !1,
        subscriptionTotalCount: 0,
        subscriptionTotalPage: 0,
        subscriptionCurrentPage: 0,
        avatarDefault: "https://img.alicdn.com/imgextra/i4/732450928/TB2vNE2c4xmpuFjSZFNXXXrRXXa_!!732450928.png",
        vipExpireTime: 0,
        vipExpireTimeStr: "",
        isWechatLogin: !1,
        headerHeight: 0,
        fixed: !1,
        todaySignIn: !0
    },
    verifyIntervalId: 0,
    type: "myPage",
    onLoad: function(e) {
        var t = this;
        this.player = new a.default(this), this.globalMsg = new n.default(this), this.modal = new r.default(this), 
        wx.reportAnalytics("mypage_click_subscribe", {}), new b.default({
            data: {
                list: [ "我的收藏", "我的已购", "收听历史" ],
                index: 0
            },
            callback: function() {
                var e = t.data.Tab.index;
                0 === e && wx.reportAnalytics("mypage_click_subscribe", {}), 1 === e && wx.reportAnalytics("yigou", {}), 
                2 === e && wx.reportAnalytics("mypage_click_history", {});
            }
        });
        var i = e.userId, o = wx.getStorageSync("USER_INFO") || {}, s = o.isLogin;
        console.log("userInfo", o), t.setData({
            isLogin: s || !1,
            uid: i || "",
            phoneNum: "",
            smsCode: "",
            isSending: !1,
            seconds: 60,
            showModal: !1,
            userInfo: o,
            isWechatLogin: "wx" === o.loginType
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this, t = wx.getStorageSync("USER_INFO").isLogin;
        void 0 !== t && t && ((0, g.default)().then(function(t) {
            0 == t.ret && (console.log("getHomePage", t), e.setData({
                myPage: t,
                isLogin: !0,
                phoneIsLoading: !1
            }), e.updateData()), wx.setNavigationBarColor({
                frontColor: "#000000",
                backgroundColor: "#F3F4F6"
            });
        }), e.getVIPExpireTime());
    },
    getVIPExpireTime: function() {
        var e = this;
        (0, y.default)().then(function(t) {
            console.log(t), 1 === t.ret ? (e.setData({
                vipExpireTime: t.data,
                vipExpireTimeStr: 0 === t.data ? "" : (0, i.default)(t.data).format("YYYY.MM.DD") + " 到期"
            }), 0 === t.data ? wx.setStorageSync("USER_IS_VIP", !1) : wx.setStorageSync("USER_IS_VIP", !0)) : e.setData({
                vipExpireTime: 0
            });
        });
    },
    updateData: function() {
        wx.showLoading({
            title: "加载中..."
        });
        var e = this, t = wx.getStorageSync("player_history_playlist") || [];
        t = t.filter(function(e) {
            return e.title;
        }), this.setData({
            historyList: t
        }), (0, f.default)().then(function(t) {
            var a = t.data, i = a.subscribeAlbums, s = void 0 === i ? [] : i, n = a.totalCount, r = a.totalPage, u = a.currentPage;
            a.subscribeAlbums, s.length;
            s && (0, o.format)(s, {
                updatedAt: "updatedAt"
            }), e.setData({
                subscription: s,
                subscriptionTotalCount: n,
                subscriptionTotalPage: r,
                subscriptionCurrentPage: u
            }), wx.hideLoading();
        }), (0, h.default)().then(function(t) {
            var a = t.data;
            a && (0, o.format)(a, {
                updatedAt: "updatedAt"
            }), e.setData({
                boughtAlbums: a
            }), wx.hideLoading();
        });
    },
    onReachBottom: function(e) {
        var a = this, i = a.data, s = i.isLogin, n = i.Tab, r = i.subscription, u = i.subscriptionTotalPage, l = i.subscriptionCurrentPage;
        s && 0 == n.index && u > l && (0, f.default)(l + 1).then(function(e) {
            var i = e.data, s = i.subscribeAlbums, n = i.totalCount, u = i.totalPage, l = i.currentPage;
            i.subscribeAlbums;
            (0, o.format)(s, {
                updatedAt: "updatedAt"
            }), a.setData({
                subscription: [].concat(t(r), t(s)),
                subscriptionTotalCount: n,
                subscriptionTotalPage: u,
                subscriptionCurrentPage: l
            });
        });
    },
    toggleLogin: function() {
        var e = this, t = this.data.isWechatLogin;
        wx.showActionSheet({
            itemList: t ? [ "切换手机登录" ] : [ "切换微信登录" ],
            success: function(a) {
                0 === a.tapIndex && (e.setData({
                    vipExpireTime: 0,
                    vipExpireTimeStr: ""
                }), e.exit(t), wx.setNavigationBarColor({
                    frontColor: "#000000",
                    backgroundColor: "#ffffff"
                }));
            },
            fail: function() {
                return !1;
            }
        });
    },
    exit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = this;
        wx.setStorage({
            key: "USER_INFO",
            data: {},
            success: function() {
                t.setData({
                    isLogin: !1,
                    wxIsLoading: !1,
                    mobileShow: e,
                    myPage: {},
                    phoneNum: "",
                    smsCode: "",
                    isSending: !1,
                    seconds: 60,
                    subscription: [],
                    boughtAlbums: [],
                    mobileAvatar: null
                });
            }
        }), wx.removeStorageSync("implicitToken"), wx.removeStorageSync("player_history_playlist"), 
        wx.removeStorageSync("player_last_sound"), wx.removeStorageSync("player_last_playlist_sounds"), 
        wx.removeStorageSync("player_last_playlist"), wx.removeStorageSync("assistedList"), 
        wx.removeStorageSync("gotFreeList");
    },
    toHome: function(e) {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    toPaidRank: function() {
        (0, o.jumpTo)({
            url: "/pages/paidRank/paidRank"
        });
    },
    toAlbumDetail: function(e) {
        var t = e.currentTarget.dataset, a = t.albumId, i = t.ispaid;
        1 != i ? (0, o.jumpTo)({
            url: "../albumDetail/albumDetail?albumId=" + a
        }) : (0, o.jumpTo)({
            url: "../paidPackage/pages/albumDetailPaid/albumDetailPaid?albumId=" + a + "&ispaid=" + i
        });
    },
    unsubscribeAlbum: function(e) {
        var t = this, a = e.currentTarget.dataset.albumId;
        wx.showActionSheet({
            itemList: [ "取消收藏" ],
            success: function(e) {
                t.unsubscribe(a);
            }
        });
    },
    deleteHistory: function(e) {
        var t = this, a = e.currentTarget.dataset.id, i = this.data.historyList.filter(function(e) {
            return e.uid !== a;
        });
        wx.showActionSheet({
            itemList: [ "删除历史记录" ],
            success: function(e) {
                t.setData({
                    historyList: i
                }), wx.setStorage({
                    key: "player_history_playlist",
                    data: i
                });
            }
        });
    },
    unsubscribe: function(e) {
        var t = this;
        wx.showLoading({
            icon: "loading"
        }), (0, s.default)(0, e).then(function(e) {
            1 === e.ret && (0, f.default)().then(function(e) {
                var a = e.data, i = a.subscribeAlbums, s = void 0 === i ? [] : i, n = a.totalCount, r = a.totalPage, u = a.currentPage;
                a.subscribeAlbums, s.length;
                s && (0, o.format)(s, {
                    updatedAt: "updatedAt"
                }), t.setData({
                    subscription: s,
                    subscriptionTotalCount: n,
                    subscriptionTotalPage: r,
                    subscriptionCurrentPage: u
                }), wx.hideLoading();
            }), wx.hideLoading();
        });
    },
    switchMobileLogin: function() {
        this.setData({
            mobileShow: !0
        });
    },
    getVerifyCode: function() {
        var e = this, t = this, a = t.data.phoneNum;
        u.default.phone(a) ? (0, d.default)().then(function(i) {
            var o = i.token;
            (0, l.default)(a, o).then(function(a) {
                0 == a.ret ? (t.setData({
                    isSending: !0,
                    globalMsg: a.msg,
                    showModal: !1,
                    seconds: 60
                }), clearInterval(t.verifyIntervalId), t.verifyIntervalId = setInterval(function() {
                    e.data.seconds || (clearInterval(t.verifyIntervalId), e.setData({
                        isSending: !1,
                        seconds: 60
                    })), e.setData({
                        seconds: --e.data.seconds
                    });
                }, 1e3)) : 211 == a.ret ? t.setData({
                    globalMsg: a.msg,
                    showModal: !0,
                    verifyCodeRes: a,
                    smsCode: "",
                    checkCode: ""
                }) : 212 == a ? t.setData({
                    smsCode: "",
                    checkCode: ""
                }) : -1 == a.ret && t.setData({
                    globalMsg: a.msg,
                    phoneNum: "",
                    checkCode: "",
                    smsCode: ""
                });
            });
        }) : t.setData({
            globalMsg: "您输入的手机号不正确"
        });
    },
    inputPhoneNum: function(e) {
        this.setData({
            phoneNum: e.detail.value
        });
    },
    clearPhoneNum: function(e) {
        this.setData({
            phoneNum: ""
        });
    },
    inputVerifyCode: function(e) {
        this.setData({
            smsCode: e.detail.value
        });
    },
    clearSmsCode: function(e) {
        this.setData({
            smsCode: ""
        });
    },
    login: function() {
        var e = this, t = e.data, a = t.phoneNum, i = t.smsCode, o = t.verifyCodeRes;
        e.setData({
            phoneIsLoading: !0
        }), (0, d.default)().then(function(t) {
            var s = t.token;
            if (o) {
                var n = o.checkCode, r = o.checkUUID;
                (0, c.default)(a, s, i, n, r).then(function(t) {
                    e.setData({
                        phoneIsLoading: !1
                    }), 0 == t.ret ? e.loginSuccessful(e, t) : -1 == t.ret ? e.setData({
                        globalMsg: t.msg
                    }) : 211 == t.ret && e.setData({
                        globalMsg: t.msg,
                        verifyCodeRes: t,
                        showModal: !0
                    });
                }).catch(function(t) {
                    e.setData({
                        globalMsg: t
                    });
                });
            } else (0, c.default)(a, s, i).then(function(t) {
                console.log("verifyCode", t), e.setData({
                    phoneIsLoading: !1
                }), 0 == t.ret ? (t.avatarUrl = e.data.avatarDefault, t.loginType = "mobile", e.loginSuccessful(e, t)) : -1 == t.ret ? e.setData({
                    globalMsg: t.msg
                }) : 211 == t.ret && e.setData({
                    globalMsg: t.msg,
                    verifyCodeRes: t,
                    showModal: !0
                });
            }).catch(function(t) {
                e.setData({
                    globalMsg: t
                });
            });
        });
    },
    changeImage: function(e) {
        this.getVerifyCode();
    },
    wechatLogin: function(e) {
        var t = this, a = e.detail.errMsg;
        t.setData({
            wxIsLoading: !0
        }), a.includes(":ok") ? wx.login({
            success: function(e) {
                wx.getUserInfo({
                    withCredentials: !0,
                    success: function(a) {
                        var i = a.encryptedData, o = a.iv, s = a.userInfo, n = s.avatarUrl, r = s.nickName;
                        (0, p.default)({
                            js_code: e.code,
                            encryptedData: i,
                            iv: o
                        }).then(function(e) {
                            e.avatarUrl = n, e.wxNickName = r, e.loginType = "wx", 0 == e.ret && "微信小程序授权失败" !== e.msg ? t.loginSuccessful(t, e) : (wx.hideLoading(), 
                            t.setData({
                                wxIsLoading: !1,
                                globalMsg: "微信授权失败，请重试"
                            }));
                        }).catch(function(e) {
                            console.log(e);
                        });
                    }
                });
            },
            fail: function(e) {
                t.setData({
                    globalMsg: e
                });
            }
        }) : t.setData({
            wxIsLoading: !1,
            globalMsg: "微信授权失败"
        });
    },
    loginSuccessful: function(e, t) {
        console.log("loginSuccessful", t), wx.setStorage({
            key: "USER_INFO",
            data: Object.assign({}, t, {
                isLogin: !0
            }),
            success: function() {
                var a = "";
                (0, g.default)().then(function(i) {
                    0 == i.ret && (e.setData({
                        myPage: i,
                        isLogin: !0,
                        phoneIsLoading: !1,
                        userInfo: t
                    }), a = i.mobileSmallLogo, e.updateData(), "mobile" == t.loginType && (t.avatarUrl = a || e.data.avatarDefault, 
                    e.setData({
                        mobileAvatar: a
                    }), wx.login({
                        success: function(e) {
                            var a = e.code;
                            (0, m.default)({
                                code: a
                            }).then(function(e) {
                                console.log("code2sessionRes", e);
                                var a = e.ret, i = e.data;
                                1 == a && (0, v.default)({
                                    id: i,
                                    headImage: t.avatarUrl,
                                    nickName: t.wxNickName || t.nickname
                                }).then(function(e) {
                                    console.log("data.avatarUrl", t.avatarUrl), console.log("data.uid", t.uid), console.log("updateWechatUserInfoRes", e);
                                });
                            });
                        }
                    })));
                }), e.getVIPExpireTime(), wx.showToast({
                    title: "登录成功",
                    icon: "success",
                    mask: !0,
                    duration: 1e3,
                    success: function() {
                        e.setData({
                            isLogin: !0,
                            phoneIsLoading: !1,
                            userInfo: t
                        });
                    }
                }), e.handleFromPage(), wx.setNavigationBarColor({
                    frontColor: "#000000",
                    backgroundColor: "#F3F4F6"
                }), e.setData({
                    isWechatLogin: "wx" === t.loginType
                }), "mobile" != t.loginType && (0, v.default)({
                    id: t.openId,
                    headImage: t.avatarUrl,
                    nickName: t.wxNickName || t.nickname
                }).then(function(e) {
                    console.log("data.avatarUrl", t.avatarUrl), console.log("data.uid", t.uid), console.log("updateWechatUserInfoRes", e);
                });
            },
            complete: function() {}
        });
    },
    handleFromPage: function() {
        if (w.fromPage) {
            var e = w.fromPage, t = e.page, a = e.query;
            console.log(t, a), "" !== t && ((0, o.jumpTo)({
                url: "../../pages/" + t + "?" + a
            }), w.fromPage = {});
        }
    },
    onPageScroll: function(e) {
        var t = this.data.headerHeight;
        if (0 !== t) {
            var a = e.scrollTop;
            this.setData({
                fixed: a >= t
            });
        }
    },
    getInfoBlockHeight: function() {
        var e = this;
        wx.createSelectorQuery().select(".user-info").boundingClientRect().exec(function(t) {
            if (t[0]) {
                var a = t[0].height;
                e.setData({
                    headerHeight: a
                });
            }
        });
    },
    onTabItemTap: function(e) {
        clearTimeout(null), setTimeout(function() {
            x = 0;
        }, 300), 2 === ++x && (wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        }), x = 0, clearTimeout(null));
    }
});