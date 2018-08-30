function o(o) {
    var e = o.currentTarget.dataset, n = (e.index, e.url);
    wx.openDocument ? (console.log("开始下载"), wx.downloadFile({
        url: n,
        success: function(o) {
            console.log("下载成功");
            var e = o.tempFilePath;
            wx.openDocument({
                filePath: e,
                success: function(o) {
                    console.log("打开文档成功");
                },
                fail: function(o) {
                    wx.showModal({
                        title: "提示",
                        content: "微信小程序不支持低于2007版本文件"
                    }), console.log(JSON.stringify(o)), console.log("打开文档失败");
                }
            });
        },
        fail: function(o) {
            console.log("下载失败"), wx.showToast({
                title: "下载文件失败",
                duration: 2e3
            });
        }
    })) : wx.showModal({
        title: "提示",
        content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
    });
}

var e = void 0;

module.exports = {
    init: function(n, t, c) {
        (e = n).previewAccessory = o, t.map(function(o, e) {
            var n = o.document.lastIndexOf("."), t = o.document.substring(n + 1, o.document.length);
            o.accessoryType = t;
        }), c && e.setData({
            needDel: !0
        });
    }
};