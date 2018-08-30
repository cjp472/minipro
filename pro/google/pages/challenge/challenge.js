function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var i = t(require("../../game/svgUtils.js")), o = e(require("../../game/api/gameAPI.js")), n = e(require("../../game/utils.js")), a = t(require("../../common/soundFXController.js")), s = t(require("../../game/imageEncoding.js")), r = require("../../game/config.js"), d = require("../../common/initState"), g = require("../../game/widgets/digitImage.js"), u = require("../../libs/av-live-query-weapp-min").User, h = require("../../libs/underscore/underscore.modified");

Page({
    data: {
        user: null,
        appName: r.config.app_name,
        digitImageData: void 0,
        themeScheme: "underwater"
    },
    initMenu: function() {
        wx.showShareMenu && wx.showShareMenu({
            withShareTicket: !0
        });
    },
    onLoad: function(e) {
        if (this.loaded = !0, this.initMenu(), h.isEmpty(e) && (e = getApp().ops.query), 
        "endless" == e.mode) "wxcard" == e.source && this.showCompetition(e.cid); else {
            var t = decodeURIComponent(e.scene), i = !!t && t.split("&");
            i && i.length > 1 && "m1" == i[0] ? this.showCompetition(i[1]) : (console.log("Unrecognized scene:", t), 
            this.redirectToHome());
        }
    },
    showCompetition: function(e) {
        var t = this;
        o.fetchCompetition(e).then(function(e) {
            e && !e.get("deleted") ? (t.competition = e, t.showInvitationPage()) : getApp().redirectToHome();
        }).catch(function(t) {
            console.log("Could not load competition", e, t), getApp().redirectToHome();
        });
    },
    redirectToHome: function() {
        wx.redirectTo({
            url: "/pages/home/home"
        });
    },
    renderInvitationPageLowerContainer: function(e) {
        h.each(e, function(e, t) {
            e.drawingSvg = i.default.createSvgBase64FromSegments(s.default.decode(e.drawing), 180, 120, {
                padding: 25
            });
        }), this.setData({
            rounds: e
        });
    },
    showInvitationPage: function() {
        var e = this.competition.get("user"), t = this.competition.get("result"), i = t ? t.total : void 0, o = i ? i.round_pass : 0, a = n.getThemeSchemeFromRoundCount(o + 1);
        this.setData({
            user: e,
            themeScheme: a
        }), getApp().setNavigationBar(r.config.app_title, a), this.digitImage = new g.DigitImage(this), 
        this.digitImage.setDigits(o, e.get("nickName") + "本局成功画出", "张", a), this.setData({
            digitImageData: this.digitImage.getData()
        }), t && this.renderInvitationPageLowerContainer(t.detailed);
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
            if (getApp().getInitState() === d.InitState.LOADING) return this.showLoading(), 
            void setTimeout(function() {
                e.onShow();
            }, 300);
            this.hideLoading(), getApp().getInitState() !== d.InitState.SUCCESS && getApp().redirectToHome();
        }
    },
    onUnload: function() {
        this.hideLoading(), this.loaded = !1;
    },
    onShareAppMessage: function() {
        var e = u.current();
        if (e) return getApp().createShareMessage({
            template: "shareTemplateCommon",
            path: "/pages/home/home?uid=" + e.id,
            success: function(e) {
                getApp().onShareSuccess(e);
            }
        });
    },
    buttonStartDrawing: function() {
        this.competition && (this.competition.get("user").id !== u.current().id && (getApp().invitedCompetition = this.competition), 
        getApp().setLoadingTarget("/pages/endless/endless"), getApp().redirectToHome());
    },
    playClickSound: function() {
        a.default.play("button-click");
    }
});