var a = getApp(), e = require("../../../biz/user.js"), o = require("../../../config.js");

Page({
    data: {
        theme: o.UIConfig.Theme,
        avatar: "",
        nickName: ""
    },
    onLoad: function(a) {},
    onReady: function() {},
    onModifyNickNameJs: function() {
        wx.navigateTo({
            url: "../../mine/nameModify/nameModify"
        });
    },
    logout: function() {
        var e = this;
        a.globalData.userData.HasLogin = !1, wx.showToast({
            title: "正在退出",
            icon: "loading",
            image: "",
            duration: 4e3
        }), a.reAuth(function() {
            e.setData({
                hasLogin: !1
            }), wx.hideToast();
            var t = wx.getStorageSync(o.AppStorage.userArea);
            console.log(t), 1 == a.getExamRegionType() && 0 == t.UserAreaId ? wx.reLaunch({
                url: "../../index/index"
            }) : 2 == a.getExamRegionType() && 0 == t.InstitutionAreaId ? wx.reLaunch({
                url: "../../index/index"
            }) : wx.navigateBack({});
        });
    },
    onShow: function() {
        var e = a.globalData.userData.Avatar, o = a.globalData.userData.NickName;
        this.setData({
            avatar: e,
            nickName: o
        });
    },
    onPhoneModifyJs: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var o = e.tempFilePaths;
                a.upload(o), console.log(o);
            }
        });
    },
    upload: function(t) {
        var n = this, i = t[0];
        e.updateLocalAvatar(i, function(e) {
            if (console.log(e), 1 == e.MsgCode) {
                wx.showToast({
                    title: "头像上传成功",
                    duration: 2e3
                });
                var t = wx.getStorageSync(o.AppStorage.userData);
                t.Avatar = e.Url, a.globalData.userData.Avatar = e.Url, wx.setStorage({
                    key: o.AppStorage.userData,
                    data: t
                }), n.setData({
                    avatar: e.Url
                });
            } else wx.showToast({
                title: "头像上传失败",
                image: "/images/icon/icon_tip.png",
                duration: 2e3
            });
        }, function(a) {
            console.log(a), wx.showToast({
                title: "头像上传失败",
                image: "/images/icon/icon_tip.png",
                duration: 2e3
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});