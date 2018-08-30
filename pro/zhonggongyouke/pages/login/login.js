var e = getApp(), o = require("../../utils/common.js"), t = require("../../utils/login.js");

wx.getSystemInfoSync();

Page({
    onShow: function(e) {
        this.checkLogin(), console.log(wx.getStorageSync("sessioncode"));
    },
    checkLogin: function() {
        console.log("enter1"), t.checkLogin();
    },
    getPhoneNumber: function(t) {
        console.log(t.detail);
        var a = wx.getStorageSync("sessioncode");
        console.log(a), a || console.log("没有session_code");
        var n = {
            session_code: wx.getStorageSync("sessioncode"),
            encrypteddata: t.detail.encryptedData,
            iv: t.detail.iv
        };
        o.globalRequest(n, "index/login/decodephone", function(t) {
            if (200 == t.statusCode) if (0 == t.data.retcode) {
                var a = {
                    phone: t.data.data.phone,
                    bind_device: wx.getSystemInfoSync().model,
                    session_code: wx.getStorageSync("sessioncode")
                };
                o.globalRequest(a, "index/login/weixinlogin", function(t) {
                    200 == t.statusCode ? 0 == t.data.retcode ? (wx.setStorageSync("student_id", t.data.data.student_id), 
                    e.globalData.student_id = t.data.data.student_id, console.log("enter!!!"), console.log(e.globalData.after_login_url), 
                    "" != e.globalData.after_login_url ? "/pages/personal/personal" == e.globalData.after_login_url ? wx.switchTab({
                        url: e.globalData.after_login_url
                    }) : wx.redirectTo({
                        url: e.globalData.after_login_url
                    }) : wx.navigateBack({})) : o.tip(t.data.message) : o.tip(t.errMsg);
                });
            } else o.tip(t.data.message); else o.tip(t.errMsg);
        });
    },
    mobilelogin: function() {
        wx.navigateTo({
            url: "/pages/phone/phone"
        });
    }
});