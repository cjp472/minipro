function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r;
    }
    return Array.from(t);
}

var r = t(require("../shared/player/Player")), a = t(require("../../requests/api/getCategories")), n = t(require("../../requests/api/getRecommends")), i = t(require("../../requests/api/getKeywords")), o = require("../../utils/util"), s = (getApp(), 
{
    entertainment: [ 2, 12, 10, 28, 4, 23 ],
    knowledge: [ 9, 39, 8, 34, 13, 40, 18, 38, 30 ],
    life: [ 22, 7, 31 ],
    features: [ 17, 15, 16 ]
});

Page({
    data: {},
    onLoad: function(t) {
        this.player = new r.default(this), wx.showToast({
            title: "加载中...",
            icon: "loading"
        }), this.getHistory(), this.getMiniProgram();
    },
    onReady: function() {
        this.getHotCategories(), this.getSubCategories();
    },
    onShow: function() {
        this.getHistory();
    },
    getHotCategories: function() {
        var t = this;
        (0, a.default)().then(function(e) {
            var r = e.data.filter(function(t) {
                return -1 !== s.entertainment.indexOf(t.id);
            }), a = e.data.filter(function(t) {
                return -1 !== s.knowledge.indexOf(t.id);
            }), n = e.data.filter(function(t) {
                return -1 !== s.life.indexOf(t.id);
            }), i = e.data.filter(function(t) {
                return -1 !== s.features.indexOf(t.id);
            });
            t.setData({
                entertainment: r,
                knowledge: a,
                features: i,
                life: n
            });
        });
    },
    getSubCategories: function() {
        var t = this;
        (0, o.promiseAll)([ (0, i.default)(3), (0, i.default)(46), (0, i.default)(6) ]).then(function(e) {
            t.setData({
                books: e[0].keywords.slice(0, 3),
                bestSellerBooks: e[1].keywords.slice(0, 3),
                children: e[2].keywords.slice(0, 3)
            }), wx.hideToast();
        });
    },
    getHistory: function() {
        var t = (wx.getStorageSync("history_tags") || []).filter(function(t) {
            return !(t.url || !t.cate) && (t.tag && t.tag.length > 5 && (t.tag = t.tag.slice(0, 5) + "..."), 
            t);
        }).reverse();
        this.setData({
            history_tags: t
        });
    },
    setHistory: function(t) {
        var r = wx.getStorageSync("history_tags") || [], a = t.currentTarget.dataset, n = a.cate, i = a.catename, o = a.tag, s = 0;
        r.some(function(t, e) {
            return s = e, t.tag == o;
        }) && r.splice(s, 1);
        var u = {
            cate: n,
            catename: i,
            tag: o
        };
        wx.setStorageSync("history_tags", [].concat(e(r), [ u ]).slice(-3));
    },
    goChannel: function(t) {
        var e = t.currentTarget.dataset, r = e.cate, a = e.catename, n = e.tag;
        (0, o.jumpTo)({
            url: "../channel/channel?cate=" + r + "&catename=" + a + "&tag=" + n
        }), this.setHistory(t);
    },
    goAlbumList: function(t) {
        var e = t.currentTarget.dataset, r = e.tag, a = e.cate;
        (0, o.jumpTo)({
            url: "../albumList/albumList?cate=" + a + "&tag=" + r
        });
    },
    goHistory: function(t) {
        var e = t.currentTarget.dataset.url;
        (0, o.jumpTo)({
            url: e
        });
    },
    toSearch: function() {
        (0, o.jumpTo)({
            url: "../search/search"
        });
    },
    getMiniProgram: function() {
        var t = this;
        (0, n.default)().then(function(e) {
            var r = e.list.filter(function(t) {
                return 8 === t.type;
            }) || [];
            r.forEach(function(t) {
                t.url = t.url.replace("https://", "").replace("http://", "");
            }), t.setData({
                miniProgram: r
            });
        });
    },
    adAnalytics: function(t) {
        var e = t.currentTarget.dataset.appId;
        wx.reportAnalytics("ad_index", {
            appid: e
        });
    }
});