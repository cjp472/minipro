var t = getApp(), e = require("../../../config.js"), o = require("../../../biz/examInfo.js"), i = require("../../../utils/util.js");

e.UIConfig.Theme, Page({
    data: {
        isFixed: !1,
        showLetter: "",
        isActivate: !1,
        cityList: [],
        isShowLetter: !1,
        currentLocation: "",
        toView: "",
        city: "",
        opts: "",
        isRefreshLocationLock: !1,
        theme: e.UIConfig.Theme
    },
    onLoad: function(t) {
        var e = this;
        try {
            var i = wx.getSystemInfoSync();
            this.pixelRatio = i.pixelRatio, this.apHeight = 20, this.offsetTop = 80, this.setData({
                windowHeight: i.windowHeight + "px"
            });
        } catch (t) {}
        wx.showLoading({
            title: "加载中"
        }), o.getExamProv(function(t) {
            console.log(t), e.setData({
                city: t.city
            }), wx.hideLoading(), e.initClientRect();
        }), this.setData({
            opts: t
        }), this.initLocation(), console.log(this.data.opts.backTab);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        console.log("页面隐藏");
    },
    onUnload: function() {
        try {
            wx.getStorageSync("province"), this.data.opts.backTab, this.data.isRefreshLocationLock;
            t.globalData.province || wx.navigateBack({
                delta: 2
            });
        } catch (t) {
            console.log(t);
        }
        console.log("返回上一页");
    },
    handlerAlphaTap: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.letter;
        this.setData({
            showLetter: e,
            isShowLetter: !0,
            toView: e,
            isActivate: e,
            isFixed: !0
        });
    },
    handlerMove: function(t) {
        var e = this.data.city, o = t.touches[0].clientY - this.offsetTop;
        if (o >= 0) {
            var i = parseInt((o - this.apHeight) / this.apHeight);
            if (0 <= i < e.length) {
                var a = e[i];
                a && this.setData({
                    showLetter: a.letter,
                    isShowLetter: !0,
                    toView: a.letter,
                    isActivate: a.letter,
                    isFixed: !0
                });
            }
        }
    },
    handlehandlerEnd: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                isShowLetter: !1,
                isActivate: t.data.isActivate
            });
        }, 1e3);
    },
    bindCityTap: function(e) {
        var o = e.target.dataset.name, i = this.data.opts.backTab;
        try {
            wx.setStorageSync("province", o), t.globalData.province = o;
        } catch (t) {
            console.log(t);
        }
        console.log(i), 1 == i ? wx.navigateBack() : (this.setData({
            isRefreshLocationLock: !0
        }), wx.redirectTo({
            url: "/pages/examInfo/examInfo/examInfo"
        }));
    },
    goNavigateBack: function() {
        try {
            var e = wx.getStorageSync("province"), o = this.data.opts.backTab, i = this.data.isRefreshLocationLock;
            e && 0 == o && !i && (wx.setStorageSync("province", e), t.globalData.province = e, 
            wx.navigateTo({
                url: "/pages/examInfo/examInfo/examInfo"
            }));
        } catch (t) {
            console.log(t);
        }
    },
    initClientRect: function() {
        var t = this;
        wx.createSelectorQuery().selectAll(".section-item-header").boundingClientRect(function(e) {
            t.setData({
                allRect: e
            });
        }).exec();
    },
    scroll: function(t) {
        console.log(t);
        for (var e = t.detail.scrollTop, o = this.data.allRect, i = this.data.city, a = 0; a < o.length - 1; a++) {
            if (e >= o[a].top && e < o[a + 1].top) {
                var n = i[a].letter;
                this.setData({
                    isActivate: n,
                    isFixed: !0,
                    showLetter: n
                });
                break;
            }
            if (e > o[o.length - 1].top || !o[a + 1]) {
                var c = i[o.length - 1].letter;
                this.setData({
                    isActivate: c,
                    isFixed: !0,
                    showLetter: c
                });
            } else if (e > 0 && e < o[0].top) {
                var s = i[0].letter;
                this.setData({
                    isActivate: "",
                    isFixed: !1,
                    showLetter: s
                });
            }
        }
    },
    initLocation: function() {
        var t = this;
        try {
            var e = wx.getStorageSync("province");
            console.log(e), e ? this.setData({
                currentLocation: e.replace("市", "")
            }) : i.getLocation(function(e) {
                console.log(e), t.setData({
                    currentLocation: e.replace("市", "")
                }), console.log("success");
            }, function(e) {
                t.setData({
                    currentLocation: "未知"
                });
            });
        } catch (t) {
            console.log(t);
        }
    },
    reGetLocation: function() {
        var e = this, o = this;
        i.getLocation(function(o) {
            e.setData({
                currentLocation: o.replace("市", "")
            });
            try {
                wx.setStorageSync("province", o), t.globalData.province = o;
            } catch (t) {
                console.log(t);
            }
            console.log("success");
        }, function() {
            o.showRemind(), console.log("重新定位失败");
        });
    },
    openSetting: function() {
        var t = this;
        wx.openSetting({
            success: function(e) {
                console.log(e), e.authSetting["scope.userLocation"] ? (t.reGetLocation(), console.log("get success----------\x3e")) : (t.setData({
                    currentLocation: "未知"
                }), t.showRemind(), console.log("get fail----------\x3e"));
            },
            fail: function() {
                console.log("fail");
            },
            complete: function() {
                console.log("complete");
            }
        });
    },
    showRemind: function() {
        var t = this;
        wx.showModal({
            title: "",
            content: '检测到您没有打开"万题库"的定位权限，是否去设置打开？',
            cancelText: "取消",
            confirmText: "确认",
            success: function(e) {
                e.confirm ? t.openSetting() : e.cancel && t.setData({
                    isRefreshLocationLock: !0
                });
            }
        });
    }
});