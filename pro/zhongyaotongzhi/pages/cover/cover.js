function a(t) {
    wx.request({
        url: s.globalData.host + "/notice/bg_list",
        data: {
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(s) {
            -500 != s.data.sta ? 0 == s.data.sta && s.data.data && t.setData({
                pics: s.data.data
            }) : e.login(function() {
                a(t);
            });
        }
    });
}

function t(a) {
    var t = getCurrentPages();
    t[t.length - 2].setData({
        cover: a
    }), wx.navigateBack({
        delta: 1
    });
}

var e = require("../../utils/util.js"), s = getApp();

Page({
    data: {
        cid: "",
        pics: null
    },
    onLoad: function(t) {
        this.setData({
            cid: t.cid
        }), a(this);
    },
    chooseImage: function() {
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var o = a.tempFilePaths[0];
                e.showLoading("上传中"), wx.uploadFile({
                    url: s.globalData.host + "/image/v2/upload",
                    filePath: o,
                    name: "file",
                    formData: {},
                    success: function(a) {
                        e.hideLoading();
                        var s = a.data, o = JSON.parse(s).data.url;
                        wx.setStorageSync("cover", o), t(o);
                    },
                    fail: function(a) {
                        e.hideLoading(), e.showFailedToast("上传图片失败，请重试");
                    }
                });
            }
        });
    },
    selectImage: function(a) {
        t(this.data.pics[a.currentTarget.dataset.index]);
    },
    postFormId: function(a) {
        e.postFormId(a.detail.formId);
    }
});