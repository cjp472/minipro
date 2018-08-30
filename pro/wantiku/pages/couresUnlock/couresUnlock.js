var t = require("../../config.js"), a = require("../../biz/chapter.js"), t = require("../../config.js"), e = getApp();

Page({
    data: {
        MasterIfno: "",
        showModal: !1,
        hideTime: "",
        showTime: "",
        isButtonClickState: !1,
        isTimeState: !1,
        imgData: {},
        theme: t.UIConfig.Theme
    },
    onLoad: function(t) {
        var i = this, o = t.courseType, n = void 0 === o ? 0 : o, s = t.masterType, c = void 0 === s ? 5 : s;
        console.log(n), wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 4e3,
            mask: !0
        }), a.getMasterInfo(n, c, function(t) {
            i.setData({
                MasterIfno: t,
                courseType: n
            }), wx.setNavigationBarTitle({
                title: t.masterName
            }), wx.hideToast();
        }), wx.onUserCaptureScreen(function(t) {
            i.setData({
                showModal: !0,
                isButtonClickState: !0,
                imgData: {
                    imgWidth: "626rpx",
                    imgHeight: "562rpx",
                    imgUrl: "http://img02.exam8.com/img2017/minapp/index/we-chat-canvas-new.png"
                }
            }), e.aldstat.sendEvent("截屏成功");
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        this.data.hideTime && (t.data.showTime = Math.floor(new Date().getTime() / 1e3), 
        t.navigateGoBack());
    },
    onHide: function() {
        var t = this;
        t.data.showModal = !1, t.data.isTimeState = !0, t.data.hideTime = Math.floor(new Date().getTime() / 1e3), 
        console.log("关闭页面时间是：" + t.data.hideTime);
    },
    onUnload: function() {
        if (this.data.isButtonClickState && !this.data.isTimeState) {
            var t = getCurrentPages();
            t[t.length - 2].setData({
                isUnlockingState: !1,
                deblocking: !1,
                showModalUnlock: !0
            }), e.aldstat.sendEvent("解锁失败");
        }
    },
    copyAccountTap: function() {
        var t = this, i = this.data.courseType, o = this.data.MasterIfno, n = o.weChat, s = o.masterId;
        wx.setClipboardData({
            data: n,
            success: function(o) {
                console.log(s), 1 == i && a.updatedUnlockMaster(s, function(t) {
                    console.log(t);
                }), t.setData({
                    showModal: !0,
                    isButtonClickState: !0,
                    imgData: {
                        imgWidth: "624rpx",
                        imgHeight: "489rpx",
                        imgUrl: "http://img02.exam8.com/img2017/minapp/index/we-chat-number-new.png"
                    }
                }), e.aldstat.sendEvent("copyAccountTap");
            }
        });
    },
    onChangeModal: function() {
        var t = this.data, a = t.showModal, e = t.isButtonClickState;
        this.setData({
            showModal: !a,
            isButtonClickState: !e
        });
    },
    navigateGoBack: function() {
        var t = this, a = getCurrentPages(), i = a[a.length - 2], o = t.data;
        o.showTime - o.hideTime >= 10 ? (i.setData({
            isUnlockingState: !0,
            deblocking: !1,
            showModalUnlock: !1
        }), setTimeout(function() {
            wx.navigateBack();
        }, 1e3), e.aldstat.sendEvent("解锁成功")) : (i.setData({
            isUnlockingState: !1,
            deblocking: !1,
            showModalUnlock: !0
        }), setTimeout(function() {
            wx.navigateBack();
        }, 1e3), e.aldstat.sendEvent("解锁失败"));
    }
});