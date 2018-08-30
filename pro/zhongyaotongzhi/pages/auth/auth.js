var o = require("../../utils/util.js");

Page({
    data: {},
    onLoad: function(o) {},
    onShow: function() {
        this.getCode();
    },
    onHide: function() {
        clearTimeout(void 0);
    },
    login: function(i) {
        o.showLoading("正在登录..."), o.buttonLogin(function() {
            o.hideLoading(), wx.navigateBack({
                delta: 1
            });
        }, function() {
            o.hideLoading();
        }, i.detail);
    },
    getCode: function() {
        wx.login({
            success: function(i) {
                var n = i.code;
                n && o.setStorage("code", n);
            }
        });
        var i = this;
        setTimeout(function() {
            i.getCode(i);
        }, 24e4);
    }
});