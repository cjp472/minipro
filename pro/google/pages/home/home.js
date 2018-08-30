function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = require("../../game/config.js"), i = e(require("../../game/api/playHistoryAPI.js")), n = e(require("../../common/soundFXController.js")), a = require("../../game/widgets/popup.js"), o = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../../game/eventlog.js")), s = require("../../common/initState.js"), r = require("../../libs/av-live-query-weapp-min").User, l = require("../../game/config/configManager");

Page({
    data: {
        user: r.current(),
        versionCode: t.config.client_version
    },
    onLoad: function(e) {
        this.loaded = !0, wx.showShareMenu && wx.showShareMenu({
            withShareTicket: !0
        }), this.popup = new a.PopupView(this);
    },
    onHide: function() {
        var e = this;
        setTimeout(function() {
            e.setData({
                animateClass: ""
            });
        }, 300);
    },
    showLoading: function() {
        !this._showLoading && wx.showLoading && (this._showLoading = !0, wx.showLoading({
            title: "加载中"
        }));
    },
    hideLoading: function() {
        this._showLoading && wx.hideLoading && (this._showLoading = !1, wx.hideLoading());
    },
    onShow: function() {
        var e = this;
        if (this.loaded) {
            if (getApp().getInitState() === s.InitState.LOADING) return this.showLoading(), 
            void setTimeout(function() {
                e.onShow();
            }, 300);
            if (getApp().getInitState() === s.InitState.SUCCESS) {
                if (getApp().navigateIfApplicable()) return;
                this.applyConfig();
                var t = i.default.getLatestPlayHistory().getLevelStr();
                this.setData({
                    userLevel: t,
                    user: r.current(),
                    env: this.getEnvStr(),
                    loadSuccess: !0,
                    showFooter: l.getEnv() !== l.PROD_ENV
                }), this.disableButtonClick = !1;
                var n = o.getContext();
                n.retry_count = 0, o.logEvent("home", n.data());
            } else {
                if (getApp().getInitState() !== s.InitState.FAIL) return getApp().getInitState() === s.InitState.AUTH_DENY ? void wx.redirectTo({
                    url: "/pages/unauthorized/unauthorized"
                }) : getApp().getInitState() === s.InitState.ALERT ? void wx.redirectTo({
                    url: "/pages/alert/alert"
                }) : void console.log("Unknown init state:", getApp().getInitState());
                this.setData({
                    loadSuccess: !1,
                    errAction: getApp().initFailAction
                });
            }
            setTimeout(function() {
                e.setData({
                    animateClass: "on-screen"
                });
            }, 200), this.hideLoading(), this.setData({
                finishedLoading: !0
            });
        }
    },
    onUnload: function() {
        this.hideLoading(), this.loaded = !1;
    },
    applyConfig: function() {
        var e = l.configEnabled(l.VS_MODE_EXPERIMENT_NAME);
        this.setData({
            vsModeEnabled: e
        });
    },
    handleShowRanking: function() {
        this.disableButtonClick || (this.disableButtonClick = !0, wx.navigateTo({
            url: "/pages/ranking/ranking"
        }));
    },
    getEnvStr: function() {
        return l.getEnv() === l.DEV_ENV ? "开发版" : l.getEnv() === l.BETA_ENV ? "内测版" : "";
    },
    playClickSound: function() {
        n.default.play("button-click");
    },
    handlePlayEndless: function() {
        this.disableButtonClick || (this.disableButtonClick = !0, wx.navigateTo({
            url: "/pages/endless/endless"
        }));
    },
    handlePlayDouble: function() {
        this.disableButtonClick || (this.disableButtonClick = !0, wx.navigateTo({
            url: "/pages/vs/vs?rid=" + this.data.user.id
        }));
    },
    handleShowCollection: function() {
        this.disableButtonClick || (this.disableButtonClick = !0, wx.navigateTo({
            url: "/pages/collection/collection"
        }));
    },
    handleShowSetting: function() {
        this.popup.showSelectionDialog();
    },
    handleFeedback: function() {
        wx.navigateTo({
            url: "/pages/feedback/feedback"
        });
    },
    handleReload: function() {
        getApp().reload(), this.onShow();
    },
    onShareAppMessage: function() {
        var e = r.current();
        return getApp().createShareMessage({
            template: "shareTemplateCommon",
            path: "/pages/home/home?uid=" + e.id,
            success: function(e) {
                getApp().onShareSuccess(e);
            }
        });
    }
});