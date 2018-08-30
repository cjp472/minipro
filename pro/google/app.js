function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e.default = t, e;
}

var n = e(require("./game/api/gameAPI.js")), i = require("./game/config.js"), o = t(require("./game/api/playHistoryAPI.js")), a = t(require("./game/api/quotaAPI.js")), r = e(require("./game/eventlog.js")), s = require("./common/initState.js"), c = t(require("./common/soundFXController.js")), u = e(require("./game/utils.js")), l = require("./libs/av-live-query-weapp-min"), h = require("./game/config/configManager"), g = require("./libs/WXBizDataCrypt"), f = require("./game/models/group"), p = require("./game/models/specialAccount");

App({
    APP_ID: "wx342094ccb21ca56a",
    networkType: void 0,
    userInfo: void 0,
    systemInfo: void 0,
    alert: void 0,
    onLaunch: function(t) {
        console.log("Launch options: ", t), this.ops = t, this.initEnvSync(), this.initLeanCloudSync(), 
        this.initGetNetworkTypeListener(), this.reload();
    },
    setLoadingTarget: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        this.loadingTarget = t;
    },
    redirectToHome: function() {
        wx.redirectTo({
            url: "/pages/home/home"
        });
    },
    initGetNetworkTypeListener: function() {
        var t = this;
        wx.getNetworkType && wx.getNetworkType({
            success: function(e) {
                t.networkType = e.networkType;
            }
        }), wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(e) {
            t.networkType = e.networkType;
        });
    },
    initEnvSync: function() {
        var t = wx.getSystemInfoSync();
        this.systemInfo = t, this.ops && this.ops.query && this.ops.query.env ? h.setEnv(this.ops.query.env) : t && "devtools" === t.platform ? h.setEnv(h.DEV_ENV) : h.setEnv(h.PROD_ENV);
    },
    initLeanCloudSync: function() {
        l.init(h.getLeanCloudAppIdAndKey());
    },
    navigateIfApplicable: function() {
        return !!this.loadingTarget && (wx.navigateTo({
            url: this.loadingTarget
        }), this.loadingTarget = "", !0);
    },
    checkAuth: function() {
        return new Promise(function(t, e) {
            wx.authorize({
                scope: "scope.userInfo",
                success: function(e) {
                    t(e);
                },
                fail: function(t) {
                    console.log("check auth failed:", t), e(t);
                }
            });
        });
    },
    reload: function() {
        var t = this;
        console.log("app.reload"), this.setInitState(s.InitState.LOADING), this.checkAuth().then(this.initialize).catch(function(e) {
            t.setInitState(s.InitState.AUTH_DENY);
        });
    },
    reloadLight: function() {
        var t = this;
        console.log("app.reloadLight"), this.setInitState(s.InitState.LOADING), this.checkAuth().then(this.checkQuota().then(function(e) {
            t.setInitState(s.InitState.SUCCESS);
        }).catch(function(e) {
            t.setInitState(s.InitState.FAIL), t.reportInitFail(e.cause, e.code);
        })).catch(function(e) {
            t.setInitState(s.InitState.AUTH_DENY);
        });
    },
    initialize: function() {
        var t = this;
        this.login().then(this.onLoginSucceed.bind(this)).catch(function(e) {
            console.error(e.message), t.setInitState(s.InitState.FAIL), t.reportInitFail(e.message, s.InitFailAction.LOGIN);
        });
    },
    onHide: function() {
        console.log("Hide the application!!"), this.closeActiveGameHandler && (this.closeActiveGameHandler(), 
        delete this.closeActiveGameHandler);
    },
    onShow: function(t) {
        if (console.log("Show the application!!", t), this.ops = t, this.getInitState() !== s.InitState.LOADING && (this.getInitState() === s.InitState.SUCCESS ? this.reloadLight() : this.reload()), 
        i.config.start_pages.indexOf(t.path) >= 0) {
            var e = r.reset();
            e.version = i.config.client_version, e.scene = t.scene, e.sharer_user_id = t.query.uid, 
            e.referer_id = t.query.referer_id, e.share_template_name = t.query.share_template_name, 
            e.landing_page = t.path, r.logEvent("open", e.data());
        }
        c.default.playSilentBackground();
    },
    checkQuota: function() {
        var t = wx.getStorageSync("appPermitGotTime") || 0, e = (new Date() - t) / 1e3 / 60;
        return console.log("app permit diff time: ", e), e > 10 ? new Promise(function(t, e) {
            a.default.checkAppPermitQuota().then(function() {
                wx.setStorageSync("appPermitGotTime", new Date()), t(!0);
            }).catch(function(t) {
                e({
                    code: s.InitFailAction.CHECK_QUOTA,
                    cause: t
                });
            });
        }) : Promise.resolve(!0);
    },
    checkAlert: function() {
        var t = this;
        return new Promise(function(e, n) {
            new l.Query(p).equalTo("account", l.User.current()).find().then(function(n) {
                n.length >= 1 && (t.alert = n), e();
            }).catch(function(t) {
                n({
                    code: s.InitFailAction.CHECK_ALERT_FAIL,
                    cause: t
                });
            });
        });
    },
    reportInitFail: function(t, e) {
        var n = r.getContext().data();
        n.action = e, r.logEvent("init_fail", n), this.initFailAction = e;
    },
    onError: function(t) {},
    login: function() {
        var t = l.User.current();
        return t ? t.isAuthenticated().then(function(e) {
            return e ? t : l.User.loginWithWeapp();
        }) : l.User.loginWithWeapp();
    },
    onLoginSucceed: function(t) {
        var e = this;
        this.leancloudUserId = t.id, wx.getUserInfo({
            success: function(n) {
                e.userInfo = n.userInfo;
                var i = n.userInfo;
                t.set("userInfo", n.userInfo), t.set("nickName", i.nickName), t.set("avatarUrl", i.avatarUrl), 
                t.set("gender", i.gender), t.set("province", i.province), t.set("city", i.city), 
                t.set("country", i.country), t.set("language", i.language), t.save();
            },
            fail: function(t) {
                console.log("Failed to get user info:", t);
            }
        }), Promise.all([ this.checkAlert(), this.checkQuota(), o.default.initialFetch(t), h.loadConfig() ]).then(function() {
            e.alert ? e.setInitState(s.InitState.ALERT) : e.setInitState(s.InitState.SUCCESS);
        }).catch(function(t) {
            console.log("Init failed:", t), e.setInitState(s.InitState.FAIL), e.reportInitFail(t.cause, t.code);
        }), 1044 == this.ops.scene && this.getShareInfo(this.ops.shareTicket), this.ops.query.uid && t.id != this.ops.query.uid && t.follow(this.ops.query.uid);
    },
    setInitState: function(t) {
        console.log("Init state:", t), this._initStatus = t;
    },
    getInitState: function() {
        return this._initStatus;
    },
    getShareInfo: function(t) {
        wx.getShareInfo({
            shareTicket: t,
            complete: function(t) {
                var e = l.User.current().get("authData").lc_weapp.session_key, i = new g(getApp().APP_ID, e).decryptData(t.encryptedData, t.iv);
                console.log("decrypted data: ", i), i && n.getOrCreate(f, "openGId", i.openGId).then(function(t) {
                    t.addMember(l.User.current().id), t.save();
                });
            }
        });
    },
    createShareMessage: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "http://www.gstatic.com/qilin/drawtogether/share_card.png";
        if (h.getEnv() !== h.PROD_ENV && t.path && (t.path = this.appendUrlArg(t.path, "env", h.getEnv())), 
        e && (t.imageUrl = e), t.template) {
            var n = u.pickRandomShareTemplate(t.template, t.templateArg);
            t.title = n.message, t.path = this.appendUrlArg(t.path, "share_template_name", n.template);
        }
        return t;
    },
    appendUrlArg: function(t, e, n) {
        return t.indexOf("?") < 0 ? t += "?" : t += "&", t += e + "=" + n;
    },
    onShareSuccess: function(t) {
        r.logEvent("share_success", r.getContext().data()), t.shareTickets && this.getShareInfo(t.shareTickets[0]);
    },
    setNavigationBar: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i.config.app_title, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "light";
        "light" == e ? wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "white"
        }) : "underwater" == e ? wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#FFFFFF"
        }) : "land" == e ? wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#FBBC04"
        }) : "to-outerspace" == e ? wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#34A853"
        }) : "outerspace" == e ? wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#185ABC"
        }) : "final-congrat" == e && wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#185ABC"
        }), wx.setNavigationBarTitle({
            title: t
        });
    },
    currentRound: void 0,
    invitedCompetition: void 0
});