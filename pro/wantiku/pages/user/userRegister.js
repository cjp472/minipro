var e = require("./effectJs.js"), t = require("../../biz/user.js"), i = require("../../helper/loginHelper.js"), a = (require("../../helper/route.js"), 
require("../../utils/util.js")), n = require("../../config.js"), r = getApp();

Page({
    data: {
        theme: n.UIConfig.Theme,
        effect: {
            selectNextIndex: 0,
            userInput: "password"
        },
        userInputCode: "",
        inputFocus: !1,
        mobile: "",
        mobileStr: "",
        verCode: "",
        reSendSec: 60,
        input: "",
        verCodeClick: !1,
        regClick: !1,
        pwdFocus: !1
    },
    Animates: {},
    onLoad: function(e) {
        var t = this;
        if (e.mobile) {
            t.setData({
                mobile: e.mobile,
                mobileStr: t.formatMobile(e.mobile),
                inputFocus: !0
            }), t.setData({
                reSendSec: 60
            });
            var a = setInterval(function() {
                t.data.reSendSec > 0 ? t.setData({
                    reSendSec: t.data.reSendSec - 1
                }) : clearInterval(a);
            }, 1e3);
            this.Animates.verCodeTipAnimate = new i.TipAnimate(this, "verCodeTipAnimate"), this.Animates.registerTipAnimate = new i.TipAnimate(this, "registerTipAnimate"), 
            this.Animates.registerPageAnimate = new i.PageAnimate(this, "registerPageAnimate");
        }
    },
    showMsg: function(e, t) {
        var i = e + "Text", a = e + "Animate";
        this.Animates[a].show();
        var n = {};
        n[i] = t, this.setData(n);
    },
    selectNext: e.selectNext,
    userInputStatic: e.userInputStatic,
    onFocus: function(e) {
        this.setData({
            inputFocus: !0
        }), this.Animates.verCodeTipAnimate.show();
    },
    userKeydown: function(e) {
        for (var i = this, a = e.detail.value, n = [], r = 0; r < a.length; r++) n.push(a.substr(r, 1));
        if (i.setData({
            userInputCode: n
        }), a && 6 == a.length) return t.regCheckCode(i.data.mobile, a, function(e) {
            i.setData({
                "effect.selectNextIndex": 1,
                verCode: a,
                verCodeContext: e,
                pwdFocus: !0
            }), i.Animates.registerPageAnimate.show();
        }, function(e) {
            i.showMsg("verCodeTip", e.Msg), i.setData({
                userInputCode: ""
            });
        }), "";
    },
    formatMobile: function(e) {
        if (e && 11 == e.length) {
            var t = /^(\d{3})(\d{4})(\d{4})$/.exec(e);
            return t[1] + " " + t[2] + " " + t[3];
        }
        return e;
    },
    inputPassword: function(e) {
        var t = e.detail.value, i = {
            input: t
        };
        t && t.length > 0 && (i.regClick = !0), this.setData(i), this.Animates.registerTipAnimate.hide();
    },
    resendCode: function(e) {
        var i = this;
        0 == i.data.reSendSec && t.regSendVerifyCode(i.data.mobile, function(e) {
            i.setData({
                reSendSec: 60
            });
            var t = setInterval(function() {
                i.data.reSendSec > 0 ? i.setData({
                    reSendSec: i.data.reSendSec - 1
                }) : clearInterval(t);
            }, 1e3);
        }, function(e) {
            (e.MsgCode = -12001) ? wx.redirectTo({
                url: "/pages/user/userOldLogin?mobile=" + mobile
            }) : i.showMsg("verCodeTip", e.Msg);
        });
    },
    verifyCode_submit: function(e) {
        var i = this, a = e.detail.value.verCode;
        t.regCheckCode(i.data.mobile, a, function(e) {
            i.setData({
                "effect.selectNextIndex": 1,
                verCode: a,
                verCodeContext: e,
                pwdFocus: !0
            }), i.Animates.registerPageAnimate.show();
        }, function(e) {
            i.showMsg("verCodeTip", e.Msg);
        });
    },
    register: function(e) {
        console.log("register");
        var i = this, n = i.data.mobile, s = i.data.verCode, o = e.detail.value.password;
        o ? (i.setData({
            regClick: !1
        }), t.register(n, s, o, function(e) {
            console.log("registerSuccess"), wx.getUserInfo({
                withCredentials: !1,
                success: function(n) {
                    var s = n.userInfo.avatarUrl, o = n.userInfo.nickName, u = !1, c = !1;
                    t.updateAvatar(s, function(t) {
                        e.Avatar = t.Url, u = !0;
                    }, function(e) {
                        u = !0;
                    }), t.updateNickName(o, function(t) {
                        e.NickName = o, c = !0;
                    }, function(i) {
                        c = !0, -11 == i.MsgCode ? (o += a.randomNumber(4), t.updateNickName(o, function(t) {
                            e.NickName = o, c = !0;
                        }, function(e) {
                            c = !0;
                        })) : c = !0;
                    }), a.setIntervalWithTimeout(function() {
                        var t = u && c;
                        return t && setTimeout(function() {
                            r.setUserData(e), r.backLogin(), i.setData({
                                regClick: !0
                            });
                        }, 1e3), t;
                    }, function() {
                        r.setUserData(e), r.backLogin(), i.setData({
                            regClick: !0
                        });
                    }, 100, 8e3);
                },
                fail: function(n) {
                    var s = wx.getStorageSync("openId"), o = s ? s.substr(s.length - 6) : a.randomNumber(4);
                    e.NickName = "MinApp_" + o + a.randomNumber(4), t.updateNickName(e.NickName, function() {
                        r.setUserData(e), r.backLogin(), i.setData({
                            regClick: !0
                        });
                    }, function() {
                        r.setUserData(e), r.backLogin(), i.setData({
                            regClick: !0
                        });
                    });
                }
            });
        }, function(e) {
            i.showMsg("registerTip", e.Msg), i.setData({
                regClick: !0
            });
        })) : i.showMsg("registerTip", "密码不能为空");
    }
});