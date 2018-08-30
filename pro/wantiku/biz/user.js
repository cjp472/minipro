var e = require("../utils/http.js"), o = require("../utils/md5.js"), t = (require("../config.js"), 
getApp()), n = {
    Get: function(o, t, n) {
        var i = {
            UserClientType: 102
        };
        e.Get(o, {}, t, n, i);
    },
    Post: function(o, n, i, r) {
        var a = {
            UserClientType: 102
        };
        0 == t.globalData.header.SubjectParentId && (a = {
            UserClientType: 102,
            SubjectParentId: 3,
            SubjectId: 4
        }), e.Post(o, n, i, r, a);
    }
}, i = {
    mobileLogin: function(e, i, r, a) {
        var s = "/api/user/MobileLogin";
        s += "?UserName=" + e, s += "&Password=" + o(i), s += "&OpenId=" + t.globalData.userData.OpenId, 
        n.Post(s, {}, r, a);
    },
    resetSendVerifyCode: function(e, o, t) {
        var i = "/api/user/GetPasswordVerCode?Mobile=" + e;
        n.Post(i, {}, o, t);
    },
    resetVerifyCode: function(e, o, t, i) {
        var r = {
            Mobile: e,
            VerCode: o
        };
        n.Post("/api/user/VerifyVerCode", r, function(e) {
            "function" == typeof t && t(e.MobileContext);
        }, i);
    },
    resetPwd: function(e, o, t, i, r) {
        var a = {
            Mobile: e,
            Password: t,
            MobileContext: o
        };
        n.Post("/api/user/ResetPwd", a, i, r);
    },
    regSendVerifyCode: function(e, o, t) {
        var i = "/api/user/GetBindMobileVerCode?Mobile=" + e;
        n.Get(i, o, t);
    },
    regCheckCode: function(e, o, t, i) {
        var r = {
            mobile: e,
            verCode: o
        };
        n.Post("/api/user/CheckRegisterVerifyCode", r, t, i);
    },
    register: function(e, o, t, i, r) {
        wx.getStorage({
            key: "openId",
            success: function(a) {
                if (console.log(a), a) {
                    var s = a.data, u = {
                        UserName: e,
                        Password: t,
                        VerCode: o,
                        DeviceNumber: s,
                        IsOAuth: 0
                    };
                    console.log("sucess"), n.Post("/api/user/UserReg", u, i, r);
                }
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getUserPhone: function(e, o, t) {
        n.Post("/api/user/WXDecryptData", {
            iv: e,
            encryptedData: o
        }, function(e) {
            console.log(e), t && e.Data && t(e.Data);
        });
    },
    updateNickName: function(e, o, i) {
        var r = {
            NickName: e,
            UserId: t.globalData.header.UserId
        };
        n.Post("/api/user/UpdateUserNickName", r, function(e) {
            console.log(e), "function" == typeof o && o(e);
        }, function(e) {
            console.log(e), "function" == typeof i && i(e);
        });
    },
    updateAvatar: function(e, o, t) {
        n.Post("/api/user/NetworkPortrait", {
            imageUrl: e,
            extFormat: "jpg"
        }, function(e) {
            console.log(e), "function" == typeof o && o(e);
        }, function(e) {
            console.log(e), "function" == typeof t && t(e);
        });
    },
    updateLocalAvatar: function(o, t, n) {
        e.uploadPicture("/api/user/Portrait", o, function(e) {
            console.log("-----" + e), "function" == typeof t && t(e);
        }, function(e) {
            console.log("uploadPicture---" + e), "function" == typeof n && n(e);
        });
    },
    msgImageInfo: function(o, t, n) {
        e.uploadPicture("/api/Question/SaveUserFeedbackImage", o, function(e) {
            console.log("-----" + e), "function" == typeof t && t(e);
        }, function(e) {
            console.log("uploadPicture---" + e), "function" == typeof n && n(e);
        });
    }
};

module.exports = i;