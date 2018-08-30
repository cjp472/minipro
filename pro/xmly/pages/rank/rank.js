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

var e = t(require("../shared/player/Player")), s = (t(require("../../requests/api/getAlbumsList")), 
require("../../utils/util")), i = t(require("../../requests/api/getAlbumRank")), r = t(require("../../constants/rankList"));

getApp();

Page({
    data: {
        albumList: [],
        isAll: !1,
        rankId: r.default[0].rank_list_id,
        typeId: "type0",
        showTypes: !1,
        typelist: r.default
    },
    onLoad: function(t) {
        var a = wx.getSystemInfoSync().windowHeight;
        wx.showToast({
            title: "加载中...",
            icon: "loading"
        }), this.player = new e.default(this), wx.setNavigationBarTitle({
            title: "榜单"
        }), this.setData({
            windowHeight: a
        });
    },
    onReady: function() {
        this.getAlbums(1);
    },
    getAlbumsNext: function() {
        var t = this, a = t.data, e = a.total_page, s = a.current_page;
        e > s && (t.setData({
            isLoading: !0
        }), this.getAlbums(s + 1));
    },
    onShareAppMessage: function() {},
    getAlbums: function(t) {
        var e = this, r = e.data, n = r.albumList, u = r.rankId;
        (0, i.default)(t, u).then(function(t) {
            var i = t.albums, r = t.current_page, u = t.total_page;
            i.map(function(t) {
                t.play_count = (0, s.numToString)(t.play_count);
            }), e.setData({
                albumList: [].concat(a(n), a(i)),
                current_page: r,
                total_page: u,
                isAll: r === u,
                isLoading: !1
            }), wx.hideToast();
        });
    },
    setType: function(t) {
        var a = t.currentTarget.dataset.rankId, e = t.currentTarget.dataset.typeId;
        this.setData({
            showTypes: !1
        }), a != this.data.rankId && (wx.showToast({
            title: "加载中...",
            icon: "loading"
        }), this.setData({
            albumList: [],
            rankId: a,
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
    toAlbumDetail: function(t) {
        var a = t.currentTarget.dataset.albumId;
        (0, s.jumpTo)({
            url: "../albumDetail/albumDetail?albumId=" + a
        });
    }
});