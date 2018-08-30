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

var e = t(require("../shared/player/Player")), r = t(require("../../requests/api/getCategoryRECAlbums")), n = require("../../utils/util");

getApp();

Page({
    data: {},
    onLoad: function(t) {
        var r = t.tag, n = t.categoryId;
        this.player = new e.default(this), wx.setNavigationBarTitle({
            title: r
        }), wx.showToast({
            title: "加载中...",
            icon: "loading"
        }), this.setData({
            categoryId: n,
            tag: r
        });
        var u = {
            url: "/pages/channelList/channelList?categoryId=" + n + "&tag=" + r,
            tag: r
        }, i = wx.getStorageSync("history_tags");
        i && (i = i.filter(function(t) {
            return t.url !== u.url;
        }).slice(0, 2)), wx.setStorage({
            key: "history_tags",
            data: i ? [ u ].concat(a(i)) : [ u ]
        });
    },
    onReady: function() {
        var t = this, a = t.data, e = a.categoryId, u = a.tag;
        (0, r.default)(e, 20).then(function(a) {
            a.forEach(function(a) {
                a.display_tag_name === u && (a.albums.forEach(function(t) {
                    t.play_count = (0, n.numToString)(t.play_count), t.include_track_count = (0, n.numToString)(t.include_track_count), 
                    t.cover_url_large = t.cover_url_large ? t.cover_url_large : "../../images/defaut-bg.png";
                }), wx.hideLoading(), t.setData({
                    albums: a.albums,
                    isAll: !0
                }));
            });
        });
    },
    toAlbumDetail: function(t) {
        var a = t.currentTarget.dataset.albumId;
        (0, n.jumpTo)({
            url: "../albumDetail/albumDetail?albumId=" + a
        });
    },
    onShareAppMessage: function() {}
});