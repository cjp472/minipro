var t = getApp(), o = t.service, a = t.util;

Page({
    data: {
        companyName: "",
        companyLogo: "",
        status: 0
    },
    customData: {
        options: {},
        currentPath: "",
        jumpURL: ""
    },
    onLoad: function(n) {
        this.customData.options = n;
        var e = t.globalData.extConfig;
        this.setData({
            companyName: e.companyName || "鲸打卡",
            companyLogo: e.companyLogo || "http://static3topen.jingdaka.com/images/ico_jingdaka.png"
        }), this.customData.currentPath = a.getFullPath(this.route, n);
        var i = n.fromURL, c = n.pageType, s = decodeURIComponent(i);
        this.customData.jumpURL = c.indexOf("user") > -1 ? o._getPairURL(s, "user") : c.indexOf("admin") > -1 ? o._getPairURL(s, "admin") : s;
    },
    onReady: function() {},
    onShow: function() {},
    getFormId: function(t) {
        o.submitFormId(t.detail.formid);
    },
    getUserInfo: function(t) {
        var a = this, n = t.detail;
        n.errMsg.indexOf("ok") > -1 && o.signIn(n, function() {
            wx.redirectTo({
                url: a.customData.jumpURL
            });
        }, function(t) {
            wx.showModal({
                title: "错误",
                content: "登录失败：" + t.errText + "，请重试",
                showCancel: !1
            });
        });
    },
    loginSuccess: function() {
        wx.redirectTo({
            url: this.customData.jumpURL
        });
    }
});