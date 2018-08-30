function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t) {
    if (Array.isArray(t)) {
        for (var a = 0, i = Array(t.length); a < t.length; a++) i[a] = t[a];
        return i;
    }
    return Array.from(t);
}

var i = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var i = arguments[a];
        for (var e in i) Object.prototype.hasOwnProperty.call(i, e) && (t[e] = i[e]);
    }
    return t;
}, e = t(require("../../requests/api/getAssistanceAlbumList")), n = t(require("../../requests/api/getMyAssistAlbumList")), s = require("../../utils/util"), r = getApp();

Page({
    data: {
        curTab: 1,
        AssistanceAlbumList: [],
        MyAssistanceAlbumList: [],
        rulesBox: !1,
        isNodata: !1,
        shareImgDefault: "../../images/share-img-1.jpg"
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "加载中..."
        }), "mine" === t.tab && this.setData({
            curTab: 2
        }), this.getList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var a = t.from;
        if ("menu" !== a) {
            var i = this.data.shareImgDefault, e = t.target.dataset, n = e.assistNum, s = e.activityId, r = e.albumTitle, o = e.originalPrice, u = e.albumCover, l = wx.getStorageSync("USER_INFO"), c = l.wxNickName, h = l.nickname, d = l.avatarUrl;
            if (l.isLogin) {
                var g = [ "万水千山总是情，为我助力行不行！", "没时间解释了，助力就能领" + o + "元的好课！", "【有人@我】来来来，帮我助力下", "原价" + o + "元的课，现在免费领，不来就亏！", "送你快速通道特权，免费领" + o + "元好课，永久收听！", (c || h || "ta") + "正在研究什么？速来围观！", (c || h || "ta") + "正在请求支援，速来！" ], f = [ "限时免费！" + r + " 了解一下？", "想听" + r + " ，帮帮我呗~", (c || h || "ta") + "邀请你一起免费听" + r ], m = [ i, u ], v = this.getShareImgRandom(m), y = "";
                if (y = v == i ? this.getShareTitleRandom(g, a, 5) : this.getShareTitleRandom(f, a, 2), 
                n >= 0 && s && d) return {
                    title: y,
                    imageUrl: v,
                    path: "/pages/activityDetail/activityDetail?source=1&activityId=" + s + "&urlAvatar=" + d
                };
                this.setData({
                    globalMsg: "服务器异常，请稍候再试..."
                });
            } else this.setData({
                globalMsg: "请先登录"
            });
        }
    },
    getShareTitleRandom: function(t, a, i) {
        var e = t.length, n = this.data.isLogin;
        return "menu" != a || n ? t[~~(Math.random() * (e - 1e-8))] : t[~~(Math.random() * (i - 1e-8))];
    },
    getShareImgRandom: function(t) {
        var a = t.length;
        return t[~~(Math.random() * (a - 1e-8))];
    },
    toggleTabBar: function(t) {
        var a = t.target.dataset.index, i = wx.getStorageSync("USER_INFO").isLogin;
        parseInt(a, 10) !== this.data.curTab && (this.setData({
            curTab: parseInt(a, 10)
        }), 2 !== parseInt(a, 10) || i ? 2 === parseInt(a, 10) && i && (wx.reportAnalytics("wodezhuli"), 
        wx.showLoading({
            title: "加载中..."
        }), this.handleGetMyAssistAlbumList()) : (wx.switchTab({
            url: "../myPage/myPage"
        }), r.fromPage = {
            page: "freeGetList",
            query: "tab=mine"
        }));
    },
    handleCheck: function(t) {
        var a = t.detail, i = a.activityId, e = a.albumId;
        wx.reportAnalytics("zhulixiangqing", {
            activity_id: i,
            album_id: e
        }), this.goToActivityDetail(i);
    },
    getList: function() {
        var t = this, i = wx.getStorageSync("USER_INFO").isLogin;
        (0, e.default)().then(function(e) {
            t.setData({
                AssistanceAlbumList: [].concat(a(e.data))
            }), i ? t.handleGetMyAssistAlbumList() : wx.hideLoading();
        });
    },
    handleGetMyAssistAlbumList: function() {
        var t = this, a = this;
        (0, n.default)().then(function(e) {
            var n = [];
            t.data.AssistanceAlbumList.forEach(function(t) {
                e.data.forEach(function(e) {
                    if (e.isInvalid = 0 === e.leftTime, e.leftTimeStr = a.millisecondToStr(e.leftTime), 
                    e.albumId === t.albumId) {
                        var s = i({}, e, t);
                        n.push(s);
                    }
                });
            }), n.sort(function(t, a) {
                return a.activityId - t.activityId;
            }), t.setData({
                MyAssistanceAlbumList: n,
                isNodata: 0 === n.length
            }), wx.hideLoading();
        });
    },
    goToActivityDetail: function(t) {
        (0, s.jumpTo)({
            url: "../activityDetail/activityDetail?source=0&activityId=" + t
        });
    },
    checkList: function() {
        this.setData({
            curTab: 1
        });
    },
    handleShare: function(t) {
        var a = t.detail, i = a.activityId, e = a.albumId;
        wx.reportAnalytics("jixufenxiang", {
            activity_id: i,
            album_id: e
        });
    },
    closeRulesBox: function() {
        this.setData({
            rulesBox: !1
        });
    },
    showRulesBox: function() {
        wx.reportAnalytics("guize"), this.setData({
            rulesBox: !0
        });
    },
    millisecondToStr: function(t) {
        var a;
        if ((t /= 1e3) > -1) {
            var i = Math.floor(t / 3600), e = Math.floor(t / 60) % 60, n = t % 60;
            a = i < 10 ? "0" + i + ":" : i + ":", e < 10 && (a += "0"), a += e + ":", n < 10 && (a += "0"), 
            a += n.toFixed(1);
        }
        return a;
    }
});