var e = require("../utils/http.js"), n = require("../config.js"), o = require("../utils/log.js"), t = {
    login: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        wx.login({
            success: function(t) {
                t.code ? e.Get("/api/user/UserLogin", {
                    code: t.code
                }, function(e) {
                    n && n(e), e.OpenId && wx.setStorage({
                        key: "openId",
                        data: e.OpenId
                    });
                }) : o.error(t);
            },
            fail: function(e) {
                o.error(e);
            }
        });
    },
    getUserInfo: function(e) {
        wx.login({
            success: function() {
                wx.getUserInfo({
                    success: function(o) {
                        wx.setStorage({
                            key: n.AppStorage.userInfo,
                            data: o.userInfo
                        }), "function" == typeof e && e(o.userInfo);
                    },
                    fail: function(n) {
                        console.error(n);
                        var o = {
                            avatarUrl: "../../images/index/default_photo.png",
                            nickName: ""
                        };
                        "function" == typeof e && e(o);
                    }
                });
            }
        });
    },
    generateKey: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        wx.login({
            success: function(t) {
                t.code ? e.Get("/api/user/GenerateUserKey", {
                    code: t.code
                }, function(e) {
                    n && n(e), e.Data.OpenId && wx.setStorage({
                        key: "openId",
                        data: e.OpenId
                    });
                }, null) : o.error(t);
            },
            fail: function(e) {
                o.error(e);
            }
        });
    },
    checkSession: function(e) {
        var n = this;
        wx.checkSession({
            success: function() {
                "function" == typeof e && e();
            },
            fail: function() {
                n.generateKey(function() {
                    "function" == typeof e && e();
                });
            }
        });
    }
};

module.exports = t;