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

var e = t(require("../shared/player/Player")), s = t(require("../../requests/api/searchAlbums")), r = t(require("../../requests/api/searchTracks")), n = t(require("../../requests/api/searchAnnouncers")), o = t(require("../../requests/api/searchHotWords")), i = t(require("../../requests/api/searchSuggestWord")), u = require("../../utils/util"), c = t(require("../shared/tab/tab")), l = getApp();

Page({
    data: {
        kw: "",
        showSuggestions: !1,
        showData: !1,
        isAlbumsLoading: !1,
        isAlbumsAll: !1,
        isAnnouncersLoading: !1,
        isAnnouncersAll: !1,
        isTracksLoading: !1,
        isTracksAll: !1,
        count: 0,
        isShowSort: !1,
        albumsCalc: "relation",
        tracksCalc: "relation",
        announcersCalc: "relation",
        albumCoverDefault: "https://img.alicdn.com/imgextra/i2/732450928/TB22yXCbipnpuFjSZFIXXXh2VXa_!!732450928.png"
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "搜索"
        });
        var a = this;
        this.player = new e.default(this);
        var s = wx.getSystemInfoSync().windowHeight;
        new c.default({
            data: {
                list: [ "专辑", "主播", "声音" ],
                index: 0
            },
            callback: function() {
                a.updateCount();
                var t = a.data, e = t.albums, s = t.announcers, r = t.tracks, n = a.data.Tab.index;
                0 !== n || e || a.getAlbums(), 1 !== n || s || a.getAnnouncers(), 2 !== n || r || a.getTracks(), 
                a.setData({
                    isShowSort: !1
                });
            }
        }), wx.showToast({
            title: "加载中...",
            icon: "loading"
        }), a.setData({
            windowHeight: s,
            scrollHeight: s - 117
        });
    },
    onReady: function() {
        var t = this, a = wx.getStorageSync("search_history");
        t.setData({
            history: a
        }), (0, o.default)().then(function(a) {
            console.log("searchHotWords", a), t.setData({
                hotWords: a.data.result.list
            }), wx.hideToast();
        });
    },
    onReachBottom: function() {},
    onInput: (0, u.debounce)(function(t) {
        var a = this, e = t.detail.value;
        a.setData({
            kw: e,
            showData: !1,
            albums: null,
            announcers: null,
            tracks: null,
            isAlbumsAll: !1,
            isAnnouncersAll: !1,
            isTracksAll: !1,
            device: "ios" == wx.getSystemInfoSync().platform ? "iPhone" : "Android"
        }), a.getSuggestWord();
    }),
    getSuggestWord: function() {
        var t = this, a = t.data.kw;
        a && (0, i.default)(a).then(function(a) {
            var e = a.queryResultList;
            e.forEach(function(t) {
                var a = t.highlightKeyword.replace("<em>", "").split("</em>");
                t.hightlight = a[0], t.keyword = a[1];
            });
            var s = a.albumResultList;
            s.forEach(function(t) {
                var a = t.highlightKeyword.replace("<em>", "").split("</em>");
                t.hightlight = a[0], t.keyword = a[1];
            }), t.setData({
                suggestWord: e,
                suggestAlbums: s,
                showSuggestions: !0
            });
        });
    },
    getAlbums: function() {
        var t = this, e = t.data, r = e.kw, n = e.albums, o = e.albumsCalc, i = e.device, c = 1;
        t.data.isAlbumsLoading || n && n.currentPage >= n.totalPage || (n && (c = n.currentPage + 1), 
        t.setData({
            isAlbumsLoading: !0
        }), (0, s.default)({
            kw: r,
            page: c,
            condition: o,
            device: i
        }).then(function(e) {
            console.log("searchAlbums", e);
            var s = n ? n.albums : [];
            e.data.result.response.docs.forEach(function(t) {
                t.play = (0, u.numToString)(t.play), t.cover_path = t.cover_path ? t.cover_path : "../../images/defaut-bg.png";
            }), e.albums = [].concat(a(s), a(e.data.result.response.docs)), t.setData({
                albums: {
                    albums: e.albums,
                    currentPage: e.data.result.response.currentPage,
                    totalPage: e.data.result.response.totalPage,
                    total: e.data.result.response.total
                },
                isAlbumsLoading: !1,
                isAlbumsAll: e.albums.length && e.data.result.response.currentPage == e.data.result.response.totalPage
            }), t.updateCount(), 1 === c && wx.reportAnalytics("search_success", {}), wx.hideToast();
        }));
    },
    getAnnouncers: function() {
        var t = this, e = t.data, s = e.kw, r = e.announcers, o = e.announcersCalc, i = e.device, c = 1;
        this.data.isAnnouncersLoading || r && r.currentPage >= r.totalPage || (r && r.currentPage && (c = r.currentPage + 1), 
        t.setData({
            isAnnouncersLoading: !0
        }), (0, n.default)({
            kw: s,
            page: c,
            condition: o,
            device: i
        }).then(function(e) {
            var s = r ? r.announcers : [];
            e.data.result.response.docs && (e.data.result.response.docs.forEach(function(t) {
                t.tracks_counts = (0, u.numToString)(t.tracks_counts), t.followers_counts = (0, 
                u.numToString)(t.followers_counts);
            }), e.announcers = [].concat(a(s), a(e.data.result.response.docs))), t.setData({
                announcers: {
                    announcers: e.announcers,
                    currentPage: e.data.result.response.currentPage,
                    totalPage: e.data.result.response.totalPage,
                    total: e.data.result.response.total
                },
                isAnnouncersLoading: !1,
                isAnnouncersAll: e.announcers && e.data.result.response.currentPage == e.data.result.response.totalPage
            }), t.updateCount(), 1 === c && wx.reportAnalytics("search_success", {}), wx.hideToast();
        }));
    },
    getTracks: function() {
        var t = this, e = t.data, s = e.kw, n = e.tracks, o = e.tracksCalc, i = e.device, c = 1;
        this.data.isTracksLoading || n && n.currentPage >= n.totalPage || (n && (c = n.currentPage + 1), 
        t.setData({
            isTracksLoading: !0
        }), (0, r.default)({
            kw: s,
            page: c,
            condition: o,
            device: i
        }).then(function(e) {
            var s = n ? n.tracks : [];
            e.data.result.response.docs.forEach(function(t) {
                t.count_play = (0, u.numToString)(t.count_play), t.count_comment = (0, u.numToString)(t.count_comment), 
                t.duration = (0, u.formatDuration)(t.duration);
            }), e.tracks = [].concat(a(s), a(e.data.result.response.docs)), t.setData({
                tracks: {
                    tracks: e.tracks,
                    currentPage: e.data.result.response.currentPage,
                    totalPage: e.data.result.response.totalPage,
                    total: e.data.result.response.total
                },
                isTracksLoading: !1,
                isTracksAll: e.tracks.length && e.data.result.response.currentPage == e.data.result.response.totalPage
            }), t.updateCount(), 1 === c && wx.reportAnalytics("search_success", {}), wx.hideToast();
        }));
    },
    getData: function() {
        var t = this, a = t.data.Tab.index;
        switch (this.updateCount(), t.setData({
            showSuggestions: !1,
            showData: !0
        }), a) {
          case 0:
            t.getAlbums();
            break;

          case 1:
            t.getAnnouncers();
            break;

          case 2:
            t.getTracks();
        }
    },
    search: function() {
        var t = this;
        wx.showToast({
            icon: "loading",
            mask: !0,
            duration: 500
        }), setTimeout(function() {
            var a = t.data.kw;
            t.setData({
                isShowSort: !1
            }), a ? (console.log(a), t.setData({
                showSuggestions: !1
            }), t.getData(), t.updateHistory(a)) : getCurrentPages().length > 1 ? wx.navigateBack({
                delta: 1
            }) : wx.switchTab({
                url: "../index/index"
            });
        }, 500);
    },
    updateCount: function() {
        var t = this.data, a = t.albums, e = t.announcers, s = t.tracks, r = 0;
        switch (this.data.Tab.index) {
          case 0:
            r = a && a.total ? a.total : 0;
            break;

          case 1:
            r = e && e.total ? e.total : 0;
            break;

          case 2:
            r = s && s.total ? s.total : 0;
        }
        this.setData({
            count: r
        });
    },
    deleteHistoryAll: function() {
        wx.setStorage({
            key: "search_history",
            data: []
        }), this.setData({
            history: []
        });
    },
    deleteHistory: function(t) {
        var e = wx.getStorageSync("search_history"), s = e.indexOf(t.target.dataset.text), r = [].concat(a(e.slice(0, s)), a(e.slice(s + 1)));
        wx.setStorage({
            key: "search_history",
            data: r
        }), this.setData({
            history: r
        });
    },
    updateHistory: function(t) {
        var e = wx.getStorageSync("search_history");
        e = e ? e.filter(function(a) {
            return a !== t;
        }) : [];
        var s = [ t ].concat(a(e)).slice(0, 9);
        wx.setStorage({
            key: "search_history",
            data: s
        }), this.setData({
            history: s
        });
    },
    searchWord: function(t) {
        var a = t.currentTarget.dataset, e = a.text, s = a.type;
        "hot" === s && wx.reportAnalytics("search_click_hotword", {}), "history" === s && wx.reportAnalytics("search_click_history", {}), 
        this.setData({
            kw: e,
            showSuggestions: !1,
            showData: !0
        }), this.search(), this.updateHistory(e);
    },
    showSort: function() {
        var t = this.data.isShowSort;
        this.setData({
            isShowSort: !t
        });
    },
    setCalc: function(t) {
        var a = t.currentTarget.dataset.calc, e = this.data.Tab.index, s = this.data, r = s.albumsCalc, n = s.tracksCalc, o = s.announcersCalc;
        0 === e && r !== a && (this.setData({
            isShowSort: !1,
            albumsCalc: a,
            albums: null
        }), this.getAlbums()), 1 === e && o !== a && (this.setData({
            isShowSort: !1,
            announcersCalc: a,
            announcers: null
        }), this.getAnnouncers()), 2 === e && n !== a && (this.setData({
            isShowSort: !1,
            tracksCalc: a,
            tracks: null
        }), this.getTracks());
    },
    clearQuery: function() {
        this.setData({
            kw: "",
            showData: !1,
            albums: null,
            announcers: null,
            tracks: null,
            isAlbumsAll: !1,
            isAnnouncersAll: !1,
            isTracksAll: !1
        });
    },
    toAlbumDetail: function(t) {
        var a = t.currentTarget.dataset, e = a.albumId, s = a.isPaid;
        s ? (0, u.jumpTo)({
            url: "../paidPackage/pages/albumDetailPaid/albumDetailPaid?albumId=" + e + (s ? "&ispaid=1" : "")
        }) : (0, u.jumpTo)({
            url: "../albumDetail/albumDetail?albumId=" + e
        });
    },
    toAnnouncer: function(t) {
        (0, u.jumpTo)({
            url: "../announcer/announcer?id=" + t.currentTarget.dataset.id
        });
    },
    toSoundPage: function(t) {
        var a = t.currentTarget.dataset, e = a.trackId, s = a.isPaid;
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 3e3
        }), l.player.select(e, function() {
            l.player.setPlaylist([ e ]), l.player.play(e), l.player.more(), (0, u.jumpTo)({
                url: "../soundPage/soundPage?trackId=" + e + (s ? "&ispaid=1" : "")
            });
        });
    },
    closeSort: function() {
        this.setData({
            isShowSort: !1
        });
    }
});