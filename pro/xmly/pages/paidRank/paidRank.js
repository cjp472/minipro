function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function t(a) {
    if (Array.isArray(a)) {
        for (var t = 0, e = Array(a.length); t < a.length; t++) e[t] = a[t];
        return e;
    }
    return Array.from(a);
}

var e = a(require("../shared/player/Player")), i = require("../../utils/util"), r = a(require("../../requests/api/getPaidAlbumRank")), n = a(require("../../requests/api/getPaidTags"));

getApp();

Page({
    data: {
        albumList: [],
        isAll: !1,
        rankTag: "精品-热卖新品",
        typeId: "type0",
        showTypes: !1,
        typeList: [],
        topTags: [ "精品-热卖新品", "精品-付费大师课", "有声书" ],
        noIncludeTags: [ "限时折扣" ]
    },
    onLoad: function(a) {
        var t = wx.getSystemInfoSync().windowHeight;
        wx.showToast({
            title: "加载中...",
            icon: "loading"
        }), this.player = new e.default(this), wx.setNavigationBarTitle({
            title: "付费精品"
        }), this.setData({
            windowHeight: t
        });
    },
    onReady: function() {
        var a = this, e = a.data, s = (e.albumList, e.rankTag), u = e.current_page;
        e.total_page;
        wx.reportAnalytics("fufei", {
            index: 0
        }), Promise.all([ (0, n.default)(), (0, r.default)(s, u) ]).then(function(e) {
            var r = e[1].data, n = r.paidAlbums, s = r.currentPage, u = r.totalPage;
            n.map(function(a, t, e) {
                e[t] = {
                    album_intro: a.albumIntro,
                    album_title: a.albumTitle,
                    id: a.id,
                    cover_url_large: a.coverUrlLarge,
                    play_count: (0, i.numToString)(a.playCount),
                    include_track_count: a.includeTrackCount,
                    isPaid: a.isPaid,
                    isVipFree: a.isVIPFree
                };
            }), wx.hideToast();
            var l = [];
            e[0].data.forEach(function(t, e, i) {
                -1 == a.data.topTags.indexOf(t.tagName) && -1 == a.data.noIncludeTags.indexOf(t.tagName) && l.push({
                    kind: "tag",
                    tag_name: t.tagName.replace(/精品-/g, ""),
                    real_tag_name: t.tagName
                });
            });
            var o = a.data.topTags.map(function(a) {
                return {
                    kind: "tag",
                    real_tag_name: a,
                    tag_name: "精品-付费大师课" == a ? "名师课" : a.replace(/精品-/g, "")
                };
            });
            a.setData({
                typeList: [].concat(t(o), l),
                rankTag: o[0].tag_name,
                albumList: n,
                current_page: s,
                total_page: u,
                isAll: s === u,
                isLoading: !1
            });
        }), this.getAlbums(1);
    },
    getAlbumsNext: function() {
        var a = this, t = a.data, e = t.total_page, i = t.current_page;
        e > i && (a.setData({
            isLoading: !0
        }), this.getAlbums(i + 1));
    },
    onShareAppMessage: function() {},
    getAlbums: function(a) {
        var e = this, n = e.data, s = n.albumList, u = n.rankTag;
        n.current_page, n.total_page;
        (0, r.default)(u, a).then(function(a) {
            var r = a.data, n = r.paidAlbums, u = r.currentPage, l = r.totalPage;
            n.map(function(a, t, e) {
                e[t] = {
                    album_intro: a.albumIntro,
                    album_title: a.albumTitle,
                    id: a.id,
                    cover_url_large: a.coverUrlLarge,
                    play_count: (0, i.numToString)(a.playCount),
                    include_track_count: a.includeTrackCount,
                    isPaid: a.isPaid,
                    isVipFree: a.isVIPFree
                };
            }), e.setData({
                albumList: [].concat(t(s), t(n)),
                current_page: u,
                total_page: l,
                isAll: u === l,
                isLoading: !1
            }), wx.hideToast();
        });
    },
    setType: function(a) {
        var t = a.currentTarget.dataset.realRankTag, e = a.currentTarget.dataset.typeId, i = a.currentTarget.dataset.index;
        wx.reportAnalytics("fufei", {
            index: i
        }), this.setData({
            showTypes: !1
        }), t != this.data.rankTag && (wx.showToast({
            title: "加载中...",
            icon: "loading"
        }), this.setData({
            albumList: [],
            rankTag: t,
            isAll: !1
        }), this.setData({
            typeId: e
        }), this.getAlbums(1));
    },
    switchTypes: function() {
        this.setData({
            showTypes: !this.data.showTypes
        });
    },
    toAlbumDetail: function(a) {
        var t = a.currentTarget.dataset.albumId;
        (0, i.jumpTo)({
            url: "../paidPackage/pages/albumDetailPaid/albumDetailPaid?albumId=" + t + "&ispaid=1"
        });
    }
});