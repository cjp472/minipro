var t = getApp(), e = require("../../utils/common.js"), a = require("../../utils/login.js");

Page({
    data: {
        defaultAvatarArr: [],
        isActive: !0,
        isZhuliTime: !1,
        helperLength: 0,
        helperPercent: 0,
        help_success: !1,
        help_fail: !1,
        showMore: !1,
        myAvatar: "",
        hasAvatar: !1,
        totalhours: 0,
        minutes: 0,
        seconds: 0,
        Millisecond: 0
    },
    onLoad: function(t) {
        var e = this, a = wx.getStorageSync("myAvatar");
        "" != a && e.setData({
            myAvatar: a,
            hasAvatar: !0
        });
        var o = t.goods_id, i = t.ownerID, s = t.activeID, n = t.help;
        e.setData({
            goods_id: o,
            ownerID: i,
            activeID: s,
            helpStatus: n
        }), console.log(this.data.goods_id), console.log(this.data.ownerID), console.log(this.data.activeID);
    },
    onShow: function() {
        var t = this;
        console.log(wx.getStorageSync("student_id")), "" == wx.getStorageSync("student_id") ? t.setData({
            buttonType: "botton"
        }) : t.setData({
            buttonType: "share"
        }), this.loadDetail(), this.checkLogin();
    },
    setStatus: function() {
        var t = this;
        1 == t.data.isActive && 1 == t.data.isZhuliTime && (console.log(t.data.minutes), 
        "00" == t.data.totalhours && "00" == t.data.minutes && "00" != t.data.seconds && setInterval(function() {
            console.log(t.data.seconds), console.log("enter1"), t.check();
        }, 1e3));
    },
    checkLogin: function(t) {
        a.checkLogin();
    },
    loadDetail: function() {
        var t = this, a = t.data.goods_id;
        if (0 == t.data.helpStatus) o = wx.getStorageSync("student_id"); else var o = t.data.ownerID;
        var i = {
            goods_id: a,
            student_id: o,
            active_id: t.data.activeID,
            session_code: wx.getStorageSync("sessioncode")
        };
        console.log(i), e.globalRequest(i, "index/help/coursedetail", function(a) {
            if (console.log("enter load detail"), console.log(a), 200 == a.statusCode) if (console.log(a.data), 
            0 == a.data.retcode) {
                var o = a.data.data;
                console.log(o), t.setData({
                    item: o
                }), t.check(), t.leftTimer(), t.getActiveTime(), t.setStatus();
            } else e.tip(a.data.message); else e.tip(a.errMsg);
        });
    },
    goIndex: function() {
        wx.switchTab({
            url: "../index/index"
        });
    },
    check: function() {
        var t = this, e = Date.parse(new Date()) / 1e3;
        console.log(e), console.log(t.data.item.name);
        var a = t.data.item.active_end_time / 1e3;
        console.log(a), a < e ? (console.log("活动已结束！"), t.setData({
            isActive: !1
        })) : (console.log("活动正在进行！"), t.setData({
            isActive: !0
        }));
        var o = t.data.item.end_time / 1e3;
        0 == o ? (console.log("助力还未开始"), t.setData({
            isStart: !1
        })) : o < e ? (console.log("助力已结束！"), t.setData({
            isStart: !0,
            isZhuliTime: !1
        })) : (console.log("助力正在进行！"), t.setData({
            isStart: !0,
            isZhuliTime: !0
        })), console.log(t.data.item.helper), console.log(t.data.item.helper.length);
        var i = t.data.item.helper.length, s = 0;
        if (s = i < t.data.item.gradient[0].ful_number ? parseInt(100 * i / t.data.item.gradient[0].ful_number) : parseInt(100 * (i - t.data.item.gradient[0].ful_number) / (t.data.item.gradient[1].ful_number - t.data.item.gradient[0].ful_number)), 
        i < 8) {
            var n = 8 - i;
            console.log("还差", n);
            for (var l = [], d = 0; d < n; d++) l.push("/resources/personal/avatar-bg.png");
            console.log(l), t.setData({
                defaultAvatarArr: l
            });
        }
        t.setData({
            helperLength: i,
            helperPercent: s
        }), setInterval(function() {
            t.leftTimer();
        }, 100);
    },
    lnitiate: function() {
        var o = this, i = o.data.goods_id, s = 0, n = o.data.myAvatar, l = o.data.activeID, d = wx.getStorageSync("sessioncode");
        a.hasStudentID() ? s = wx.getStorageSync("student_id") : (t.globalData.after_login_url = "/pages/activity/activity?help=0&ownerID=" + s + "&activeID=" + l + "&goods_id=" + i, 
        wx.navigateTo({
            url: "/pages/login/login"
        }));
        var r = {
            goods_id: i,
            student_id: s,
            avatar: n,
            session_code: d,
            active_id: l
        };
        console.log("发起助力"), console.log(r), e.globalRequest(r, "index/help/Initiate", function(t) {
            console.log(t), 200 == t.statusCode ? 0 == t.data.retcode ? o.loadDetail() : e.tip(t.data.message) : e.tip(t.errMsg);
        });
    },
    mylnitiate: function() {
        var e = this, o = e.data.goods_id, i = 0, s = (e.data.myAvatar, e.data.activeID);
        wx.getStorageSync("sessioncode");
        a.hasStudentID() ? (i = wx.getStorageSync("student_id"), wx.navigateTo({
            url: "/pages/activity/activity?help=0&ownerID=" + i + "&activeID=" + s + "&goods_id=" + o
        })) : (t.globalData.after_login_url = "/pages/activity/activity?help=0&ownerID=" + i + "&activeID=" + s + "&goods_id=" + o, 
        wx.navigateTo({
            url: "/pages/login/login"
        }));
    },
    giveHelp: function() {
        var t = this, a = {
            goods_id: t.data.goods_id,
            student_id: t.data.item.sponsor_info.student_id,
            avatar: t.data.myAvatar,
            session_code: wx.getStorageSync("sessioncode"),
            active_id: t.data.activeID
        };
        console.log("为他助力"), console.log(a), e.globalRequest(a, "index/help/to", function(a) {
            console.log(a), 200 == a.statusCode ? 0 == a.data.retcode ? (t.setData({
                help_success: !0
            }), setTimeout(function() {
                t.setData({
                    help_success: !1
                });
            }, 1e3), t.loadDetail()) : (e.tip(a.data.message), t.setData({
                help_fail: !0
            }), setTimeout(function() {
                t.setData({
                    help_fail: !1
                });
            }, 1e3)) : e.tip(a.errMsg);
        });
    },
    onGotUserInfo: function(t) {
        console.log(t.detail.userInfo.avatarUrl), "" != t.detail.userInfo.avatarUrl ? wx.setStorageSync("myAvatar", t.detail.userInfo.avatarUrl) : wx.setStorageSync("myAvatar", "/resources/zhuli/avatar.png"), 
        this.setData({
            myAvatar: t.detail.userInfo.avatarUrl,
            hasAvatar: !0
        });
    },
    showMore: function() {
        this.setData({
            showMore: !0
        });
    },
    showLittle: function() {
        this.setData({
            showMore: !1
        });
    },
    leftTimer: function() {
        var t = this;
        if (new Date(t.data.item.end_time) < new Date()) return t.setData({
            totalhours: "00",
            minutes: "00",
            seconds: "00",
            Millisecond: "00",
            isZhuliTime: !1
        }), !1;
        var e = new Date(t.data.item.end_time) - new Date(), a = parseInt(e / 1e3 / 60 / 60 / 24, 10), o = parseInt(e / 1e3 / 60 / 60 % 24, 10), i = 24 * a + o, s = parseInt(e / 1e3 / 60 % 60, 10), n = parseInt(e / 1e3 % 60, 10), l = parseInt(e / 100 % 10, 10);
        if (a = t.checkTime(a), o = t.checkTime(o), i = t.checkTime(i), s = t.checkTime(s), 
        0 == (n = t.checkTime(n))) return !1;
        t.setData({
            totalhours: i,
            minutes: s,
            seconds: n,
            Millisecond: l
        });
    },
    checkTime: function(t) {
        return t < 10 && (t = "0" + t), t;
    },
    onShareAppMessage: function() {
        return {
            title: "Hi，我想学习这门课，快来帮我助力吧~",
            path: "/pages/activity/activity?share=1&help=1&ownerID=" + wx.getStorageSync("student_id") + "&activeID=" + this.data.activeID + "&goods_id=" + this.data.goods_id
        };
    },
    order: function(e) {
        var o = this, i = o.data.goods_id, s = o.data.ownerID, n = o.data.active_id;
        a.hasStudentID() ? wx.navigateTo({
            url: "/pages/confirm/confirm?active=1&type=1&goods_id=" + i
        }) : (t.globalData.after_login_url = "/pages/activity/activity?help=0&ownerID=" + s + "&activeID=" + n + "&goods_id=" + i, 
        wx.navigateTo({
            url: "/pages/login/login"
        }));
    },
    mylivelist: function(t) {
        var e = "../mylivelist/mylivelist?goods_id=" + this.data.goods_id + "&type=1";
        wx.navigateTo({
            url: e
        });
    },
    onPullDownRefresh: function() {
        this.loadDetail();
    },
    add0: function(t) {
        return t < 10 ? "0" + t : t;
    },
    timeFormat: function(t) {
        var e = new Date(t), a = e.getFullYear(), o = e.getMonth() + 1, i = e.getDate(), s = e.getHours(), n = e.getMinutes(), l = e.getSeconds();
        return a + "-" + this.add0(o) + "-" + this.add0(i) + " " + this.add0(s) + ":" + this.add0(n) + ":" + this.add0(l);
    },
    getActiveTime: function() {
        var t = this, e = t.data.item.active_start_time, a = t.data.item.active_end_time;
        console.log("设置时间"), console.log(e), console.log(a);
        var o = this.timeFormat(e), i = this.timeFormat(a);
        console.log(o), console.log(i), t.setData({
            newStartTime: o,
            newEndTime: i
        });
    },
    goLessonDetail: function() {
        var t = "../livedetail/livedetail?goods_id=" + this.data.goods_id;
        wx.navigateTo({
            url: t
        });
    }
});