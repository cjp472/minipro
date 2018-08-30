var e = require("./effectJs.js"), t = require("../../biz/user.js"), s = require("../../helper/route.js"), i = require("../../helper/loginHelper.js"), n = require("../../config.js"), a = getApp();

Page({
    data: {
        theme: n.UIConfig.Theme,
        effect: {
            selectNextIndex: 0,
            userInput: "password",
            userInputReset: "password"
        },
        userInputCode: [],
        inputFocus: !1,
        mobile: "",
        mobileStr: "",
        input: "",
        reSendSec: 0,
        verCodeContext: "",
        verCode: "",
        inputReset: "",
        loginTipText: "",
        verCodeTipText: "",
        resetTipText: "",
        loginClick: !1,
        verCodeClick: !1,
        resetClick: !1,
        pwdTextFocus: !1,
        pwdFocus: !1,
        resetFocus: !1
    },
    Animates: {},
    onLoad: function(e) {
        var t = this;
        e.mobile ? (t.setData({
            mobile: e.mobile,
            mobileStr: t.formatMobile(e.mobile),
            pwdFocus: !0
        }), this.Animates.loginTipAnimate = new i.TipAnimate(this, "loginTipAnimate"), this.Animates.verCodeTipAnimate = new i.TipAnimate(this, "verCodeTipAnimate"), 
        this.Animates.resetTipAnimate = new i.TipAnimate(this, "resetTipAnimate"), this.Animates.verCodePageAnimate = new i.PageAnimate(this, "verCodePageAnimate"), 
        this.Animates.resetPageAnimate = new i.PageAnimate(this, "resetPageAnimate")) : s.toLogin();
    },
    onShow: function() {
        this.setData({
            loginClick: !1,
            verCodeClick: !1,
            resetClick: !1
        });
    },
    showMsg: function(e, t) {
        var s = e + "Text", i = e + "Animate";
        this.Animates[i].show();
        var n = {};
        n[s] = t, this.setData(n);
    },
    resetInput: function(e) {
        var t = e.detail.value, s = {
            inputReset: t
        };
        t && t.length > 0 ? s.resetClick = !0 : s.resetClick = !1, this.setData(s);
    },
    sendCode: function(s) {
        var i = this;
        e.selectNext.call(i), this.Animates.verCodePageAnimate.show(), t.resetSendVerifyCode(i.data.mobile, function(e) {
            console.log("success"), console.log(e), i.setData({
                reSendSec: 60,
                inputFocus: !0
            });
            var t = setInterval(function() {
                i.data.reSendSec > 0 ? i.setData({
                    reSendSec: i.data.reSendSec - 1
                }) : clearInterval(t);
            }, 1e3);
        }, function(e) {
            i.showMsg("verCodeTip", e.Msg);
        });
    },
    userInputStatic: function() {
        if ("password" == (e = this.data.effect.userInput)) {
            e = "text";
            this.setData({
                "effect.userInput": e
            });
        } else {
            var e = "password";
            this.setData({
                "effect.userInput": e
            });
        }
        console.log(this.data);
    },
    onFocus: function(e) {
        console.log("onFocus"), this.setData({
            inputFocus: !0
        }), this.Animates.verCodeTipAnimate.hide();
    },
    userInputStaticReset: function() {
        if ("password" == (e = this.data.effect.userInputReset)) {
            e = "text";
            this.setData({
                "effect.userInputReset": e,
                resetFocus: !0,
                resetTextFocus: !1
            });
        } else {
            var e = "password";
            this.setData({
                "effect.userInputReset": e,
                resetTextFocus: !0,
                resetFocus: !1
            });
        }
    },
    userKeydown: function(e) {
        for (var s = this, i = e.detail.value, n = [], a = 0; a < i.length; a++) n.push(i.substr(a, 1));
        if (s.setData({
            userInputCode: n
        }), i && 6 == i.length) return t.resetVerifyCode(s.data.mobile, i, function(e) {
            s.setData({
                "effect.selectNextIndex": 2,
                verCode: i,
                verCodeContext: e,
                resetFocus: !0
            }), s.Animates.resetPageAnimate.show();
        }, function(e) {
            s.showMsg("verCodeTip", e.Msg), s.setData({
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
        var t = e.detail.value, s = {
            input: t
        };
        t && t.length > 0 ? s.loginClick = !0 : s.loginClick = !1, this.setData(s);
    },
    resendCode: function() {
        var e = this;
        0 == e.data.reSendSec && t.resetSendVerifyCode(e.data.mobile, function(t) {
            console.log("success"), console.log(t), e.setData({
                reSendSec: 60
            });
            var s = setInterval(function() {
                e.data.reSendSec > 0 ? e.setData({
                    reSendSec: e.data.reSendSec - 1
                }) : clearInterval(s);
            }, 1e3);
        }, function(t) {
            e.showMsg("verCodeTip", t.Msg);
        });
    },
    login: function(e) {
        var s = this;
        s.setData({
            loginClick: !1
        });
        var i = e.detail.value.password;
        i ? t.mobileLogin(this.data.mobile, i, function(e) {
            a.setUserData(e), a.backLogin(), s.setData({
                loginClick: !0
            });
        }, function(e) {
            s.showMsg("loginTip", e.Msg), s.setData({
                loginClick: !0
            });
        }) : s.showMsg("loginTip", "手机号不能为空");
    },
    reset_pwd: function(e) {
        var s = this;
        s.setData({
            resetClick: !1
        });
        var i = e.detail.value.password;
        t.resetPwd(s.data.mobile, s.data.verCodeContext, i, function(e) {
            a.setUserData(e), a.backLogin(), s.setData({
                resetClick: !0
            });
        }, function(e) {
            s.showMsg("resetTip", e.Msg), s.setData({
                resetClick: !0
            });
        });
    }
});