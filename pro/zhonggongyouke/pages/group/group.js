Page({
    data: {},
    copy: function(t) {
        var a = t.currentTarget.dataset.grouptype, e = "复制成功！";
        1 == a ? e = "复制成功，请前往QQ中搜索该群号" : 2 == a && (e = "复制成功，请在微信中搜索该微信号");
        var n = t.currentTarget.dataset.content;
        wx.setClipboardData({
            data: n,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        wx.showToast({
                            title: e,
                            icon: "none",
                            duration: 2e3
                        });
                    }
                });
            }
        });
    }
});