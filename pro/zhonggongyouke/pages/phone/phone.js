var e = getApp(), t = require("../../utils/common.js"), a = require("../../utils/login.js");

Page({
    data: {
        mobile: "",
        code: "",
        codeContent: "获取验证码",
        currentTime: 61,
        errTipShow: !1,
        errorTipTxt: "*手机号码格式不正确"
    },
    onLoad: function() {
        this.checkLogin();
    },
    checkLogin: function(e) {
        a.checkLogin();
    },
    mobileInput: function(e) {
        this.setData({
            mobile: e.detail.value,
            errTipShow: !1
        });
    },
    codeInput: function(e) {
        this.setData({
            code: e.detail.value
        });
    },
    getverifycode: function(e) {
        var a = this, i = a.data.mobile, o = /^[1][3,4,5,7,8][0-9]{9}$/.test(i);
        if ("" == i) return a.setData({
            errTipShow: !0,
            errorTipTxt: "*手机号码不能为空"
        }), !1;
        if (!o) return a.setData({
            errTipShow: !0,
            errorTipTxt: "*手机号码格式不正确"
        }), !1;
        var r = a.data.currentTime, n = setInterval(function() {
            r--, a.setData({
                codeContent: r + "秒"
            }), r <= 0 && (clearInterval(n), a.setData({
                codeContent: "重新发送",
                currentTime: 61,
                codeDisabled: !1
            }));
        }, 1e3);
        a.setData({
            codeDisabled: !0
        });
        var s = {
            mobile: a.data.mobile,
            type: 1
        };
        t.globalRequest(s, "index/util/sendcode", function(e) {
            200 == e.statusCode ? (e.data.retcode, t.tip(e.data.message)) : t.tip(e.errMsg);
        });
    },
    mobilelogin: function(a) {
        var i = this.data.mobile;
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(i)) return t.tip("请输入正确的手机号"), !1;
        var o = this.data.code;
        if (!/^[0-9]{4}$/.test(o)) return t.tip("请输入正确的验证码"), !1;
        var r = {
            mobile: this.data.mobile,
            code: this.data.code,
            device: wx.getSystemInfoSync().model,
            session_code: wx.getStorageSync("sessioncode")
        };
        t.globalRequest(r, "index/login/mobilelogin", function(a) {
            200 == a.statusCode ? 0 == a.data.retcode ? (wx.setStorageSync("student_id", a.data.data.student_id), 
            e.globalData.student_id = a.data.data.student_id, "" != e.globalData.after_login_url ? "/pages/personal/personal" == e.globalData.after_login_url ? wx.switchTab({
                url: e.globalData.after_login_url
            }) : wx.redirectTo({
                url: e.globalData.after_login_url
            }) : wx.navigateBack({
                delta: 2
            })) : t.tip(a.data.message) : t.tip(a.errMsg);
        });
    }
});