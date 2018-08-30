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

var e = t(require("../shared/player/Player")), n = t(require("../../requests/api/getAnnouncerInfo")), r = t(require("../../requests/api/getAnnouncersAlbums")), u = require("../../utils/util");

Page({
    data: {
        current_page: 1,
        albums: [],
        isAll: !1
    },
    onLoad: function(t) {
        this.player = new e.default(this);
        var a = t.id;
        this.setData({
            id: a
        }), wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e3
        });
    },
    onReady: function() {
        var t = this.data.id, a = this;
        (0, n.default)(+t).then(function(t) {
            var e = t[0];
            e.following_count = (0, u.numToString)(e.following_count), e.follower_count = (0, 
            u.numToString)(e.follower_count), a.setData({
                announcer: e
            });
        }), this.getAlbums(1);
    },
    onReachBottom: function() {
        var t = this, a = t.data, e = a.current_page, n = a.total_page, r = a.isAll;
        e <= n && !r && (t.setData({
            isLoading: !0
        }), this.getAlbums(e + 1));
    },
    onShareAppMessage: function() {},
    getAlbums: function(t) {
        var e = this, n = this.data.id, o = this;
        (0, r.default)(+n, t).then(function(t) {
            console.log("主播", t);
            var n = t.albums, r = t.total_page, l = t.current_page;
            n.map(function(t) {
                t.play_count = (0, u.numToString)(t.play_count), t.cover_url_large = t.cover_url_large ? t.cover_url_large : "../../images/defaut-bg.png";
            }), o.setData({
                albums: [].concat(a(e.data.albums), a(n)),
                current_page: l,
                total_page: r,
                isLoading: !1,
                isAll: l === r && n.length
            });
        });
    },
    toAlbumDetail: function(t) {
        var a = t.currentTarget.dataset.albumId;
        (0, u.jumpTo)({
            url: "../albumDetail/albumDetail?albumId=" + a
        });
    }
});