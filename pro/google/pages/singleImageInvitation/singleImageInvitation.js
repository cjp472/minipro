function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../game/svgUtils.js")), o = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}(require("../../game/api/gameAPI.js")), n = e(require("../../common/soundFXController.js")), i = e(require("../../game/imageEncoding.js")), r = require("../../game/config.js"), a = require("../../common/initState"), d = require("../../libs/av-live-query-weapp-min").User, s = require("../../libs/underscore/underscore.modified");

Page({
    data: {
        user: null,
        appName: r.config.app_name,
        loaded: !1
    },
    showLoading: function() {
        !this._showLoading && wx.showLoading && (this._showLoading = !0, wx.showLoading({
            title: "加载中"
        }));
    },
    hideLoading: function() {
        this._showLoading && wx.hideLoading && (this._showLoading = !1, wx.hideLoading());
    },
    onShow: function(e) {
        var t = this;
        if (getApp().getInitState() === a.InitState.LOADING) return this.showLoading(), 
        void setTimeout(function() {
            t.onShow();
        }, 300);
        this.hideLoading(), getApp().getInitState() !== a.InitState.SUCCESS && getApp().redirectToHome(), 
        s.isEmpty(e) && (e = getApp().ops.query), e.cId && e.roundNumber ? o.fetchCompetition(e.cId).then(function(o) {
            if (o.get("deleted")) getApp().redirectToHome(); else {
                t.setData({
                    user: o.get("user")
                });
                var n = o.get("result");
                if (n && n.detailed && n.detailed.length > e.roundNumber) {
                    var i = n.detailed[e.roundNumber];
                    t.showRoundDetails(i.word, i.drawing, i.recognized, i.duration);
                } else getApp().redirectToHome();
            }
        }).catch(function(e) {
            getApp().redirectToHome();
        }) : e.recordId ? o.fetchRecord(e.recordId).then(function(e) {
            t.setData({
                user: e.get("user")
            }), t.showRoundDetails(e.get("word"), JSON.parse(e.get("image")), e.get("recognized"), e.get("duration"));
        }).catch(function(e) {
            getApp().redirectToHome();
        }) : (console.log("Unrecognized single image inv entrance options: ", e), getApp().redirectToHome());
    },
    onUnload: function() {
        this.hideLoading(), this.loaded = !1;
    },
    showRoundDetails: function(e, o, n, r) {
        var a = wx.getStorageSync("words"), d = a && a[e] && a[e].wordZhCn ? a[e].wordZhCn : e, s = i.default.decode(o), g = t.default.createSvgBase64FromSegments(s, 250, 200, {
            padding: 25
        }), u = Math.floor(10 * r) / 10;
        this.setData({
            drawingSvg: g,
            wordZhCn: d,
            recognized: n,
            duration: u,
            loaded: !0
        });
    },
    buttonStartDrawing: function() {
        getApp().setLoadingTarget("/pages/endless/endless"), getApp().redirectToHome();
    },
    buttonGoHome: function() {
        getApp().redirectToHome();
    },
    onShareAppMessage: function() {
        var e = d.current();
        return getApp().createShareMessage({
            template: "shareTemplateCommon",
            path: "/pages/home/home?uid=" + e.id,
            success: function(e) {
                getApp().onShareSuccess(e);
            }
        });
    },
    playClickSound: function() {
        n.default.play("button-click");
    }
});