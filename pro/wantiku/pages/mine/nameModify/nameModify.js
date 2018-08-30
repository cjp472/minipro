var a = getApp(), e = require("../../../biz/user.js"), t = require("../../../config.js");

Page({
    data: {
        theme: t.UIConfig.Theme,
        nickName: ""
    },
    onLoad: function(e) {
        this.setData({
            nickName: a.globalData.userData.NickName
        });
    },
    onClearNickNameJs: function() {
        this.setData({
            nickName: ""
        });
    },
    onModifyJs: function() {
        var i = this;
        console.log(this.data.nickName), "" != this.data.nickName ? e.updateNickName(i.data.nickName, function(e) {
            if (1 == e.MsgCode) {
                a.globalData.userData.NickName = i.data.nickName;
                var n = wx.getStorageSync(t.AppStorage.userData);
                console.log(n), n.NickName = a.globalData.userData.NickName, wx.setStorage({
                    key: t.AppStorage.userData,
                    data: n
                }), wx.navigateBack({});
            } else wx.showToast({
                title: e.Msg,
                image: "/images/icon/icon_tip.png",
                duration: 2e3
            });
        }, function(a) {
            wx.showToast({
                title: a.Msg,
                image: "/images/icon/icon_tip.png",
                duration: 2e3
            });
        }) : wx.showToast({
            title: "昵称不能为空",
            image: "/images/icon/icon_tip.png",
            duration: 1e3,
            mask: !0
        });
    },
    bindinput: function(a) {
        this.data.nickName = a.detail.value;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});