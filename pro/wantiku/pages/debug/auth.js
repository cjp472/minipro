var t = require("../../utils/http.js");

Page({
    data: {},
    onLoad: function() {},
    bindLogin: function() {
        var t = this;
        wx.login({
            success: function(i) {
                t.setData({
                    code: i.code
                });
            }
        });
    },
    bindAuth: function() {
        var i = this;
        t.Get("/WXMinApp/UserLogin", {
            code: i.data.code
        }, function(t) {
            i.setData({
                res: JSON.stringify(t)
            });
        });
    }
});