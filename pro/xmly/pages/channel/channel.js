function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var e = t(require("../shared/player/Player")), i = require("../../utils/util"), r = t(require("../../requests/api/getAlbumsByKeyWord")), s = t(require("../../requests/api/getKeywords"));

getApp();

Page({
    data: {
        albumList: [],
        isAll: !1,
        typeId: "type0",
        showTypes: !1,
        keywordId: 0,
        keywords: [ {
            keywordId: 0,
            keywordName: "全部"
        } ]
    },
    onLoad: function(t) {
        var a = t.cate, i = t.catename, r = t.tag, s = void 0 === r ? "全部" : r, o = wx.getSystemInfoSync().windowHeight;
        wx.showToast({
            title: "加载中...",
            icon: "loading"
        }), this.player = new e.default(this), wx.setNavigationBarTitle({
            title: i || "喜马拉雅FM"
        }), this.setData({
            windowHeight: o,
            categoryId: a,
            catename: i,
            tag: s
        });
    },
    onReady: function() {
        this.init();
    },
    init: function() {
        var t = this, e = t.data, i = e.catename, r = e.tag;
        (0, s.default)(this.data.categoryId).then(function(e) {
            var s = e.categoryInfo, o = e.keywords;
            wx.setNavigationBarTitle({
                title: s.title
            }), t.setData({
                keywords: [].concat(a(t.data.keywords), a(o.slice(0, 10)))
            });
            var n = 0, d = 0;
            o.some(function(t, a) {
                return t.keywordName == r && (n = t.keywordId, d = "type" + a);
            }), i != r && t.setData({
                keywordId: n,
                typeId: d
            }), t.getAlbums(1);
        });
    },
    getAlbums: function(t) {
        var e = this, s = e.data, o = s.albumList, n = s.keywordId, d = s.categoryId;
        (0, r.default)({
            categoryId: d,
            pageId: t,
            keywordId: n
        }).then(function(t) {
            var r = t.list, s = t.pageId, n = t.totalCount, d = Math.ceil(n / 20);
            r.map(function(t) {
                t.playsCount = (0, i.numToString)(t.playsCount);
            }), e.setData({
                albumList: [].concat(a(o), a(r)),
                current_page: s,
                total_page: d,
                isAll: s === d,
                isLoading: !1
            }), wx.hideToast();
        });
    },
    getAlbumsNext: function() {
        var t = this, a = t.data, e = a.total_page, i = a.current_page;
        e > i && (t.setData({
            isLoading: !0
        }), this.getAlbums(i + 1));
    },
    setHistory: function(t) {
        var e = wx.getStorageSync("history_tags") || [], i = t.currentTarget.dataset, r = i.cate, s = i.catename, o = i.tag, n = 0;
        e.some(function(t, a) {
            return n = a, t.tag == o;
        }) && e.splice(n, 1);
        var d = {
            cate: r,
            catename: s,
            tag: "全部" == o ? s : o
        };
        wx.setStorageSync("history_tags", [].concat(a(e), [ d ]).slice(-3));
    },
    onScrollBarTap: function(t) {
        console.log(t);
    },
    setType: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.keywordId, e = t.currentTarget.dataset.typeId;
        this.setData({
            showTypes: !1
        }), a != this.data.keywordId && (wx.showToast({
            title: "加载中...",
            icon: "loading"
        }), this.setData({
            albumList: [],
            keywordId: a,
            isAll: !1
        }), console.log(t.currentTarget.id), this.setData({
            typeId: e
        }), this.getAlbums(1), this.setHistory(t));
    },
    switchTypes: function() {
        this.setData({
            showTypes: !this.data.showTypes
        });
    },
    toAlbumDetail: function(t) {
        var a = t.currentTarget.dataset, e = a.albumId;
        a.isPaid ? (0, i.jumpTo)({
            url: "../paidPackage/pages/albumDetailPaid/albumDetailPaid?albumId=" + e + "&ispaid=1"
        }) : (0, i.jumpTo)({
            url: "../albumDetail/albumDetail?albumId=" + e
        });
    }
});