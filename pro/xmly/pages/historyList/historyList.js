var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../shared/player/Player")), a = require("../../utils/util"), e = getApp();

Page({
    tapHistoryBtn: !1,
    type: "historyList",
    data: {
        history: []
    },
    onLoad: function() {
        var a = this;
        this.player = new t.default(this);
        var e = wx.getStorageSync("player_history_playlist");
        e = (e || []).filter(function(t) {
            return t.title;
        }), a.setData({
            history: e
        });
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: "播放历史"
        });
    },
    playAndJumpToDetail: function(t) {
        var r = t.currentTarget.dataset.trackId;
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 3e3
        }), e.player.select(r, function() {
            e.player.setPlaylist([ r ]), e.player.play(r), e.player.more(), (0, a.jumpTo)({
                url: "../soundPage/soundPage?trackId=" + r
            }), wx.reportAnalytics("play_sound", {
                play_sound_souce: "播放历史"
            });
        });
    },
    toAlbumDetail: function(t) {
        console.log("e.currentTarget.dataset", t.currentTarget.dataset);
        var e = t.currentTarget.dataset, r = e.albumId, i = e.ispaid;
        (0, a.jumpTo)({
            url: "../albumDetail/albumDetail?albumId=" + r + "&ispaid=" + i
        });
    }
});