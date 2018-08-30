getApp();

var e = require("../../utils/common.js");

require("../../utils/login.js");

Page({
    data: {
        video_url: "",
        video_play: !1,
        share_id: ""
    },
    onLoad: function(e) {
        if ("{}" != JSON.stringify(e)) if (void 0 !== e.q) {
            var t = decodeURIComponent(e.q);
            if (this.getUrlParam(t.split("?")[1], "share_id")) {
                var a = this.getUrlParam(t.split("?")[1], "share_id");
                this.setData({
                    share_id: a
                });
            }
        } else void 0 !== e.banner && this.setData({
            share_id: e.banner
        });
        this.getVideo();
    },
    getVideo: function() {
        var t = this, a = {};
        e.globalRequest(a, "index/util/getknowyoukevideo", function(a) {
            200 == a.statusCode ? 0 == a.data.code ? t.setData({
                video_url: a.data.data.url
            }) : e.tip(a.data.msg) : e.tip(a.errMsg);
        });
    },
    play: function() {
        this.setData({
            video_play: !0
        });
    },
    videoEnd: function() {
        this.setData({
            video_play: !1
        });
    },
    goIndex: function() {
        wx.switchTab({
            url: "../index/index"
        });
    },
    getUrlParam: function(e, t) {
        var a = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), i = e.match(a);
        return null != i ? unescape(i[2]) : null;
    },
    getCurrentPageUrl: function() {
        var e = getCurrentPages();
        return e[e.length - 1].route;
    },
    onShareAppMessage: function() {
        this.getCurrentPageUrl();
        return {
            title: "名师好课尽在中公优课，不容错过！",
            path: "pages/offcn/offcn"
        };
    }
});