function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
}

var a = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }
    return e;
}, n = e(require("../shared/player/Player")), r = e(require("../../requests/api/getRecommends")), o = e(require("../../requests/api/getHomeAlbums")), i = e(require("../../requests/api/getAssistanceAlbumList")), s = require("../../utils/util"), u = e(require("../../requests/api/getAssistAlbumById")), l = 0, c = getApp();

Page({
    data: {
        showAdvBox: !1,
        swiperCurrent: 0,
        advImgDefault: "http://fdfs.xmcdn.com/group46/M00/F6/75/wKgKlltCyNGzfIAQAAJC5iTKN38634.png",
        freeGetAlbum: {
            category_name: "免费领"
        },
        AssistanceAlbumList: []
    },
    type: "index",
    bindViewTap: function() {
        (0, s.jumpTo)({
            url: "../logs/logs"
        });
    },
    onTabItemTap: function(e) {
        clearTimeout(null), setTimeout(function() {
            l = 0;
        }, 300), 2 === ++l && (wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        }), l = 0, clearTimeout(null));
    },
    onLoad: function(e) {
        console.log("index-options", e), this.player = new n.default(this), wx.showLoading({
            title: "加载中...",
            icon: "loading"
        }), this.getAdvImg();
    },
    onReady: function() {
        var e = this;
        wx.reportAnalytics("play_sound", {
            play_sound_souce: "专辑页"
        });
        var n = this.data.player;
        n.hidden = !1;
        (0, s.promiseAll)([ (0, o.default)(), (0, r.default)() ]).then(function(t) {
            console.log("getHomeAlbums", t);
            var r = t[0].data;
            r = r.map(function(e, t) {
                var n = {
                    category_id: e.categoryId,
                    category_name: e.categoryName
                };
                return e.albums = e.albums.map(function(t) {
                    return {
                        play_count: (0, s.numToString)(t.playCount),
                        cover_url_large: t.coverUrlLarge ? t.coverUrlLarge : "../../images/defaut-bg.png",
                        category_name: e.categoryName,
                        album_title: t.albumTitle,
                        album_intro: t.albumIntro,
                        total_count: t.includeTrackCount,
                        id: t.id
                    };
                }), e = a({}, n, {
                    albums: e.albums
                });
            });
            var o = t[1].list.filter(function(e) {
                return 2 === e.type || 3 === e.type || 4 === e.type;
            }) || [], i = t[1].list.filter(function(e) {
                return 8 === e.type;
            }) || [];
            i.forEach(function(e) {
                e.url = e.url.replace("https://", "").replace("http://", "");
            }), e.setData({
                home: {
                    categories: r.filter(function(e) {
                        return -1 === [ 1, 21, 22, 13, 24, 31, 7, 34, 32 ].indexOf(e.category_id);
                    }),
                    focusImages: o
                },
                miniProgram: i,
                player: n
            });
        }).catch(function(e) {
            console.log(e);
        }), (0, i.default)().then(function(a) {
            var n = a.data.slice(0, 3);
            e.setData({
                AssistanceAlbumList: [].concat(t(n))
            });
        });
    },
    loginSuccessful: function(e) {
        wx.setStorage({
            key: "USER_INFO",
            data: Object.assign({}, e, {
                isLogin: !0
            })
        });
    },
    onPullDownRefresh: function() {
        this.onReady(), wx.stopPullDownRefresh(), console.log("stoppulldown");
    },
    onShareAppMessage: function(e) {
        return {
            title: "喜马拉雅FM",
            desc: "随时随地，听我想听",
            path: "/pages/index/index"
        };
    },
    getAdvImg: function() {
        var e = this;
        (0, u.default)(378).then(function(t) {
            var a = e.data.advImgDefault;
            e.setData({
                advertisementImg: a
            }), wx.getStorage({
                key: "ADV",
                success: function(t) {
                    console.log(t), t.data != a && e.showAdvBox();
                },
                fail: function() {
                    a && e.showAdvBox();
                },
                complete: function() {
                    wx.setStorage({
                        key: "ADV",
                        data: a
                    });
                }
            });
        });
    },
    onSwiperChange: function(e) {
        this.setData({
            swiperCurrent: e.detail.current
        });
    },
    showAdvBox: function() {
        this.setData({
            showAdvBox: !0
        }), wx.reportAnalytics("showadvbox", {});
    },
    hideAdvBox: function() {
        this.setData({
            showAdvBox: !1
        }), wx.reportAnalytics("closeindexadv", {});
    },
    nothing: function() {},
    bannerAnalytics: function(e) {
        var t = e.currentTarget.dataset.sort;
        wx.reportAnalytics("banner", {
            sort: t
        });
    },
    adAnalytics: function(e) {
        var t = e.currentTarget.dataset.appId;
        wx.reportAnalytics("ad_index", {
            appid: t
        });
    },
    toChannel: function(e) {
        var t = e.currentTarget.dataset, a = t.cate, n = t.catename;
        a === parseInt(3, 10) && wx.reportAnalytics("shouye", {
            index: 2
        }), a === parseInt(12, 10) && wx.reportAnalytics("shouye", {
            index: 4
        }), (0, s.jumpTo)({
            url: "../channel/channel?cate=" + a + "&catename=" + n
        });
    },
    toSoundPage: function(e) {
        var t = e.currentTarget.dataset.trackId, a = wx.getStorageSync("USER_INFO").isLogin || !1;
        this.setData({
            isLogin: a
        }), wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 3e3
        }), c.player.select(t, function() {
            c.player.setPlaylist([ t ]), c.player.play(t), c.player.more(), (0, s.jumpTo)({
                url: "../soundPage/soundPage?trackId=" + t + "&isLogin=" + a
            }), wx.reportAnalytics("play_sound", {
                play_sound_souce: "焦点图"
            });
        });
    },
    toAlbumDetail: function(e) {
        var t = e.currentTarget.dataset.albumId;
        (0, s.jumpTo)({
            url: "../albumDetail/albumDetail?albumId=" + t
        });
    },
    toRank: function() {
        wx.reportAnalytics("shouye", {
            index: 1
        }), (0, s.jumpTo)({
            url: "../rank/rank"
        });
    },
    toPaidRank: function(e) {
        var t = e.currentTarget.dataset.cate;
        (0, s.jumpTo)({
            url: "../paidRank/paidRank"
        }), 6 == t ? wx.reportAnalytics("shouye", {
            index: 5
        }) : wx.reportAnalytics("fufeimore", {});
    },
    toSearch: function() {
        (0, s.jumpTo)({
            url: "../search/search"
        });
    },
    tofreeGetList: function(e) {
        var t = e.currentTarget.dataset.actionType;
        if (t) switch (t) {
          case "main_icon":
            wx.reportAnalytics("shouye", {
                index: 3
            });
            break;

          case "more_btn":
            wx.reportAnalytics("zhulimore", {});
            break;

          case "adv":
            wx.reportAnalytics("adv", {}), this.hideAdvBox();
        }
        (0, s.jumpTo)({
            url: "../freeGetList/freeGetList"
        });
    },
    handleImageLoaded: function() {
        wx.hideLoading();
    }
});