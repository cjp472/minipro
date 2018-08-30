var e = getApp().util;

Component({
    properties: {
        accessoryItem: {
            type: Object,
            value: {},
            observer: function(e, t) {
                this.setData({
                    name: e.content[0].name
                });
            }
        },
        applyType: {
            type: String,
            value: ""
        },
        index: {
            type: Number,
            value: 0
        }
    },
    data: {
        name: ""
    },
    ready: function() {},
    methods: {
        previewDoc: function(t) {
            var o = t.currentTarget.dataset.content;
            e.showToast(), wx.openDocument ? (console.log("开始下载"), wx.downloadFile({
                url: o[0].url,
                success: function(t) {
                    console.log("下载成功");
                    var o = t.tempFilePath;
                    wx.openDocument({
                        filePath: o,
                        success: function(t) {
                            e.hideToast(), console.log("打开文档成功");
                        },
                        fail: function(t) {
                            e.hideToast(), wx.showModal({
                                title: "提示",
                                content: t.errMsg
                            }), console.log("打开文档失败");
                        }
                    });
                },
                fail: function(e) {
                    console.log("下载失败"), wx.showToast({
                        title: "下载文件失败",
                        duration: 2e3
                    });
                }
            })) : wx.showModal({
                title: "提示",
                content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
            });
        },
        delAccessory: function() {
            this.triggerEvent("delAccessory", {
                index: this.data.index
            });
        }
    }
});