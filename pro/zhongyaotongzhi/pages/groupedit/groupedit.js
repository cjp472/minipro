function a(t) {
    s.showLoading("正在创建...");
    var e = "/images/group_default_cover.jpg" == t.data.cover ? "" : t.data.cover;
    wx.request({
        url: i.globalData.host + "/qmp/group/create",
        data: {
            bg_img: e,
            name: t.data.name,
            summary: t.data.summary,
            verify: t.data.verify ? 1 : 0,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(e) {
            if (s.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                if (e.data.data) {
                    var i = {
                        gid: e.data.data.gid,
                        name: t.data.name
                    };
                    wx.setStorageSync("groupChecked", i), wx.navigateBack({
                        delta: 1
                    });
                }
            } else s.showFailedToast("创建失败，请重试", e.data.msg); else s.login(function() {
                a(t);
            });
        },
        fail: function(a) {
            s.hideLoading(), s.showFailedToast("创建失败，请重试");
        }
    });
}

function t(a) {
    s.showLoading("正在保存...");
    var e = "/images/group_default_cover.jpg" == a.data.cover ? "" : a.data.cover;
    wx.request({
        url: i.globalData.host + "/qmp/group/update",
        data: {
            gid: a.data.gid,
            bg_img: e,
            name: a.data.name,
            summary: a.data.summary,
            verify: a.data.verify ? 1 : 0,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(e) {
            s.hideLoading(), -500 != e.data.sta ? 0 == e.data.sta ? wx.navigateBack({
                delta: 1
            }) : s.showFailedToast("保存失败，请重试", e.data.msg) : s.login(function() {
                t(a);
            });
        },
        fail: function(a) {
            s.hideLoading(), s.showFailedToast("保存失败，请重试");
        }
    });
}

function e(a) {
    s.showLoading("正在删除..."), wx.request({
        url: i.globalData.host + "/qmp/group/remove",
        data: {
            gid: a.data.gid,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(t) {
            s.hideLoading(), -500 != t.data.sta ? 0 == t.data.sta ? wx.navigateBack({
                delta: 2
            }) : s.showFailedToast("删除失败，请重试", t.data.msg) : s.login(function() {
                e(a);
            });
        },
        fail: function(a) {
            s.hideLoading(), s.showFailedToast("删除失败，请重试");
        }
    });
}

var s = require("../../utils/util.js"), i = getApp();

Page({
    data: {
        gid: "",
        cover: "",
        name: "",
        summary: "",
        nameEmpty: !0,
        summaryEmpty: !0,
        verify: !1,
        is_self: !1
    },
    onLoad: function(a) {
        this.setData({
            gid: s.isTextEmpty(a.gid) ? "" : a.gid,
            cover: s.isTextEmpty(a.cover) ? "/images/group_default_cover.jpg" : a.cover,
            name: s.isTextEmpty(a.name) ? "" : a.name,
            summary: s.isTextEmpty(a.summary) ? "" : a.summary,
            verify: 1 == a.verify,
            is_self: 1 == a.is_self
        }), this.setData({
            nameEmpty: s.isTextEmpty(this.data.name),
            summaryEmpty: s.isTextEmpty(this.data.summary)
        });
    },
    changeCover: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var e = t.tempFilePaths[0];
                s.showLoading("上传中..."), wx.uploadFile({
                    url: i.globalData.host + "/image/v2/upload",
                    filePath: e,
                    name: "file",
                    formData: {},
                    success: function(t) {
                        s.hideLoading();
                        var e = t.data, i = JSON.parse(e).data.url;
                        a.setData({
                            cover: i
                        });
                    },
                    fail: function(a) {
                        s.hideLoading(), s.showFailedToast("上传图片失败，请重试");
                    }
                });
            }
        });
    },
    inputName: function(a) {
        this.setData({
            nameEmpty: 0 == a.detail.value.length
        });
    },
    clearName: function() {
        this.setData({
            name: "",
            nameEmpty: !0
        });
    },
    inputSummary: function(a) {
        this.setData({
            summaryEmpty: 0 == a.detail.value.length
        });
    },
    clearSummary: function() {
        this.setData({
            summary: "",
            summaryEmpty: !0
        });
    },
    changeVerify: function(a) {
        this.setData({
            verify: a.detail.value
        });
    },
    saveGroupCard: function(e) {
        var i = e.detail.value.name.trim();
        if (s.isTextEmpty(i)) s.showModelTips("请输入群名称"); else {
            var o = e.detail.value.summary.trim();
            s.isTextEmpty(o) ? s.showModelTips("请输入群简介") : (this.setData({
                name: i,
                summary: o
            }), s.isTextEmpty(this.data.gid) ? a(this) : t(this));
        }
    },
    deleteGroupCard: function() {
        var a = this;
        wx.showModal({
            title: "提示",
            content: "删除后无法恢复，确定要删除该通讯录吗？",
            confirmColor: "#1677d2",
            success: function(t) {
                t.confirm && e(a);
            }
        });
    }
});