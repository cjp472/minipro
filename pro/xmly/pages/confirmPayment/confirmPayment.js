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

var e, o = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, i = t(require("../shared/globalMsg/globalMsg")), n = t(require("../../requests/api/pay")), s = getApp();

Page((e = {
    data: {
        isBoxShowing: !1,
        isContactShowing: !1,
        isIOS: "ios" == wx.getSystemInfoSync().platform || "devtools" == wx.getSystemInfoSync().platform
    },
    type: "confirmPayment",
    onLoad: function(t) {
        var a = wx.getSystemInfoSync();
        this.globalMsg = new i.default(this), wx.showToast({
            title: "加载中...",
            icon: "loading"
        }), this.setData(o({}, t, {
            systemInfo: a
        }));
    },
    onReady: function() {
        wx.hideToast();
        this.data.albumId;
    },
    toPay: function() {
        var t = this, a = this, e = this.data, o = e.albumId, i = (e.estimatedTrackCount, 
        e.price), r = (e.priceUnit, e.priceType), c = (e.title, e.trackCount, e.trackId), l = e.systemInfo, u = e.isIOS;
        wx.reportAnalytics("pay", {
            albumid: +o,
            price: i
        }), u && wx.showLoading(), (0, n.default)({
            businessTypeId: 2 == r ? 201 : 202,
            albumId: +o,
            quantity: 1,
            sounds: 1 == r ? [ +c ] : [],
            channelType: "ios" == l.platform || "devtools" == l.platform ? 65 : 64,
            returnUrl: "http://m.test.ximalaya.com"
        }).then(function(e) {
            if (wx.hideLoading(), console.log("toPay", e), "isIOS" == e) return console.log("isIOS"), 
            void t.showContactBox();
            "requestPayment:ok" === e.errMsg && (a.showBox(), s.paySuccess = !0, wx.reportAnalytics("successpay", {
                albumid: o,
                price: i
            }));
        }).catch(function(t) {
            wx.hideLoading(), console.log("error", t), a.setData({
                globalMsg: "下单失败!"
            }), wx.reportAnalytics("failpay", {
                albumid: +o,
                price: i
            });
        });
    },
    nothing: function() {},
    closeContactBox: function() {
        this.setData({
            isContactShowing: !1
        });
    },
    showContactBox: function() {
        this.setData({
            isContactShowing: !0
        });
    },
    onShareAppMessage: function(t) {
        var a = this.data, e = (a.albumId, a.trackId, a.title);
        return {
            title: e,
            desc: e,
            path: "/pages/albumDetail/albumDetail?albumId=" + album.albumId + "&ispaid=1",
            success: function(t) {
                wx.reportAnalytics("albumdetail_click_share", {});
            }
        };
    },
    setPlaylist: function(t) {
        var a = this, e = 1 == a.data.ispaid, o = 1 == e ? a.data.paidAlbum.tracks : a.data.freeAlbum.tracks.list, i = [];
        o.forEach(function(t) {
            i.push(e ? t.id : t.trackId);
        }), s.player.cacheSounds(o), s.player.setPlaylist(i);
    },
    closeBox: function(t) {
        this.setData({
            isBoxShowing: !1
        }), wx.navigateBack({
            delta: 1
        });
    }
}, a(e, "nothing", function() {}), a(e, "showBox", function(t) {
    this.setData({
        isBoxShowing: !0
    });
}), e));