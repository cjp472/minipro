function t(o) {
    a.showLoading("正在获取图片"), wx.request({
        url: i.globalData.host + "/notice/share_img",
        data: {
            nid: o.data.nid,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(i) {
            a.hideLoading(), -500 != i.data.sta ? 0 == i.data.sta ? o.setData({
                imageUrl: i.data.data.url
            }) : a.showFailedToast("获取图片失败，请重试", i.data.msg) : a.login(function() {
                t(o);
            });
        },
        fail: function(t) {
            a.hideLoading(), a.showFailedToast("获取图片失败，请重试");
        }
    });
}

function o(t, i) {
    wx.saveImageToPhotosAlbum({
        filePath: i,
        success: function(t) {
            a.hideLoading(), a.showModelTips("保存成功，您可以分享图片啦。");
        },
        fail: function(e) {
            a.hideLoading();
            var s = e.errMsg;
            wx.getSetting({
                success: function(e) {
                    e.authSetting["scope.writePhotosAlbum"] ? a.showFailedToast("保存失败，请重试", s) : wx.showModal({
                        title: "提示",
                        content: "请授权重要通知访问相册，该操作仅会方便您保存图片到相册，请放心授权。",
                        cancelText: "不想授权",
                        confirmText: "去授权",
                        confirmColor: "#1677d2",
                        success: function(e) {
                            e.confirm ? wx.openSetting({
                                complete: function(a) {
                                    o(t, i);
                                }
                            }) : e.cancel && a.showModelTips('如果您不愿授权，也可以通过点击下面的图片查看大图，然后长按或点击右上角三个点"..."保存到系统相册。');
                        }
                    });
                }
            });
        }
    });
}

var a = require("../../utils/util.js"), i = getApp();

Page({
    data: {
        nid: "",
        imageUrl: ""
    },
    onLoad: function(o) {
        this.setData({
            nid: o.nid
        }), t(this);
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    showTips: function() {
        a.showModelTips("先保存下面的图片到系统相册，然后就可以分享啦");
    },
    save: function() {
        wx.saveImageToPhotosAlbum ? (a.showLoading("正在保存"), wx.getImageInfo({
            src: this.data.imageUrl,
            success: function(t) {
                o(this, t.path);
            },
            fail: function(t) {
                a.hideLoading(), a.showModelTips("获取图片信息失败，原因:" + t.errMsg);
            }
        })) : a.showModelTips('1、点击下面的图片查看大图。2、长按或点击右上角三个点"..."保存到系统相册。3、分享给好友或群。');
    },
    showPic: function() {
        wx.previewImage({
            urls: [ this.data.imageUrl ]
        });
    },
    postFormId: function(t) {
        a.postFormId(t.detail.formId);
    }
});