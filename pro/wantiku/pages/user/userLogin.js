var t = require("./effectJs.js"), e = require("../../biz/user.js"), i = require("../../biz/auth.js"), a = require("../../helper/loginHelper.js"), s = require("../../config.js");

getApp();

Page({
    data: {
        theme: s.UIConfig.Theme,
        logo: s.UIConfig.LogoImg,
        appName: s.UIConfig.LogoName,
        effect: {
            selectNextIndex: 1,
            userInput: "password"
        },
        errorText: "",
        nextCanClick: !1,
        mobileFocus: !0,
        nextDisabled: !1,
        touristPracticeTip: "未注册的用户将自动注册"
    },
    Animates: {},
    onLoad: function(t) {
        i.checkSession(), this.Animates.MobileTip = new a.TipAnimate(this, "tipAnimate"), 
        this.Animates.PageAnimate = new a.PageAnimate(this, "pageAnimate"), 1 == t.touristPractice ? (this.data.touristPracticeTip = "为保存你的学习数据，请登录后继续练习", 
        this.setData({
            touristPracticeTip: this.data.touristPracticeTip
        })) : 2 == t.touristPractice ? (this.data.touristPracticeTip = "为保存你的学习数据，请登录后继续听课", 
        this.setData({
            touristPracticeTip: this.data.touristPracticeTip
        })) : 3 == t.touristPractice ? (this.data.touristPracticeTip = "登录后参与互动，未注册的用户将自动注册", 
        this.setData({
            touristPracticeTip: this.data.touristPracticeTip
        })) : 4 == t.touristPractice && (this.data.touristPracticeTip = "请登录后解锁免费课程", this.setData({
            touristPracticeTip: this.data.touristPracticeTip
        }));
    },
    onShow: function() {
        this.setData({
            mobileFocus: !1,
            nextDisabled: !1
        });
    },
    mobileInput: function(t) {
        var e = t.detail.value;
        e && 11 == e.length && this.setData({
            nextCanClick: !0
        });
    },
    showMobileTip: function(t) {
        var e = this;
        e.setData({
            errorText: t
        }), e.Animates.MobileTip.show();
    },
    focusInput: function() {
        this.Animates.MobileTip.hide();
    },
    otherMobile: function() {
        t.selectNext.apply(this), this.Animates.PageAnimate.show(), this.setData({
            mobileFocus: !0
        });
    },
    userInputStatic: t.userInputStatic,
    getPhoneNumber: function(t) {
        console.log(t);
        t.detail.iv && e.getUserPhone(t.detail.iv, t.detail.encryptedData, function(t) {
            wx.navigateTo({
                url: "/pages/user/userOldLogin?mobile=" + t.phoneNumber
            });
        });
    },
    bindNext: function(t) {
        var i = this, a = t.detail.value.mobile;
        i.setData({
            nextCanClick: !1
        }), /^1[3456789]\d{9}$/.test(a) ? e.regSendVerifyCode(a, function(t) {
            i.setData({
                nextCanClick: !0
            }), wx.navigateTo({
                url: "/pages/user/userRegister?mobile=" + a
            });
        }, function(t) {
            i.setData({
                nextCanClick: !0
            }), (t.MsgCode = -12001) ? wx.navigateTo({
                url: "/pages/user/userOldLogin?mobile=" + a
            }) : i.showMobileTip(t.Msg);
        }) : (i.showMobileTip("请输入正确的手机号码"), i.setData({
            nextCanClick: !0
        }));
    }
});