var e = require("./utils/util"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./requests/api/getVIPExpireTime")), n = new (require("./pages/shared/player/XMPlayer.js"))();

App({
    player: n,
    paySuccess: !1,
    onLaunch: function() {
        var t = this, n = wx.getStorageSync("logs") || [];
        n.unshift(Date.now()), wx.setStorageSync("logs", n);
        var a = wx.getStorageSync("DEVICE_ID") || (0, e.generateUUID)();
        if (wx.setStorageSync("DEVICE_ID", a), wx.getUpdateManager) {
            var o = wx.getUpdateManager();
            o.onUpdateReady(function() {
                t.getVIPExpireTime(), wx.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，是否应用？",
                    success: function(e) {
                        e.confirm && o.applyUpdate();
                    }
                });
            });
        }
    },
    getUserInfo: function(e) {
        var t = this;
        this.globalData.userInfo ? "function" == typeof e && e(this.globalData.userInfo) : wx.login({
            success: function() {
                wx.getUserInfo({
                    success: function(n) {
                        t.globalData.userInfo = n.userInfo, "function" == typeof e && e(t.globalData.userInfo);
                    }
                });
            }
        });
    },
    globalData: {
        userInfo: null
    },
    getVIPExpireTime: function() {
        !!wx.getStorageSync("USER_INFO").isLogin && wx.getStorageSync("USER_INFO").isLogin && (0, 
        t.default)().then(function(e) {
            1 === e.ret ? 0 === e.data ? wx.setStorageSync("USER_IS_VIP", !1) : wx.setStorageSync("USER_IS_VIP", !0) : wx.setStorageSync("USER_IS_VIP", !1);
        });
    }
});