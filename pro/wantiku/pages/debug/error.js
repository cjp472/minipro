var r = getApp();

Page({
    data: {
        error: []
    },
    onLoad: function() {
        var a = this, t = a.data.error, e = wx.getStorageSync("code");
        t.push(e), t.push(JSON.stringify(r.globalData)), a.setData({
            error: t
        }), wx.getStorage({
            key: "error",
            success: function(r) {
                for (var e = 0; e < r.data.length; e++) t.push(r.data[e]);
                a.setData({
                    error: t
                });
            }
        });
    }
});