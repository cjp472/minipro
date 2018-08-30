var t = getApp(), e = require("../../utils/common.js"), a = require("../../utils/login.js"), i = require("../../wxParse/wxParse.js");

Page({
    data: function(t, e, a) {
        return e in t ? Object.defineProperty(t, e, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = a, t;
    }({
        goods_id: 0,
        name: "",
        tag_list: [],
        time_section: "",
        chapter_num: 0,
        buy_num: 0,
        teachers: [],
        teachers_length: 0,
        original_price: 0,
        price: 0,
        status: [],
        countdown_num: 0,
        head_tpl_type: 0,
        banner_img: "",
        is_need_pay: "",
        tpl_type: [],
        content: [],
        coursemenu: {},
        indicatorDots: !0,
        autoplay: !1,
        circular: !1,
        interval: 2e3,
        duration: 500,
        previousMargin: 0,
        nextMargin: 0,
        selected1: !0,
        selected2: !1,
        contact: !1,
        myTop: 0,
        winHeight: "",
        currentTab: 0,
        contentHeights: [],
        rpxR: 1
    }, "status", 0),
    swichNav: function(t) {
        var e = t.currentTarget.dataset.current;
        if (this.data.currentTaB == e) return !1;
        this.setData({
            currentTab: e
        });
    },
    switchTab: function(t) {
        this.setData({
            currentTab: t.detail.current
        });
    },
    content1: function(t) {},
    content2: function(t) {},
    onLoad: function(t) {
        this.getPlatForm();
        e = this;
        1 == t.share && e.setData({
            share: !0
        }), this.setData({
            goods_id: t.goods_id
        });
        var e = this;
        this.courseintro(), this.coursemenu(), wx.getSystemInfo({
            success: function(t) {
                var a = t.windowHeight, i = 750 / t.windowWidth, n = a * i;
                e.setData({
                    winHeight: n,
                    rpxR: i
                });
            }
        });
    },
    onShow: function() {
        this.loadDetail();
    },
    onUnload: function() {
        this.setData({
            contentHeights: []
        });
    },
    getPlatForm: function() {
        var t = this, e = wx.getSystemInfoSync().system, a = /android/i;
        /ios/i.test(e) ? t.setData({
            platform: 1
        }) : a.test(e) ? t.setData({
            platform: 2
        }) : t.setData({
            platform: 1
        });
    },
    getUrlParam: function(t, e) {
        var a = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"), i = t.match(a);
        return null != i ? unescape(i[2]) : null;
    },
    loadDetail: function() {
        var t = this, i = t.data.goods_id, n = 0;
        a.hasStudentID() && (n = wx.getStorageSync("student_id"), t.setData({
            ownerID: n
        }));
        var s = {
            goods_id: i,
            student_id: n
        };
        e.globalRequest(s, "index/live/coursedetail", function(a) {
            if (200 == a.statusCode) if (0 == a.data.retcode) {
                var i = a.data.data;
                t.setData({
                    head_tpl_type: i.head_tpl_type,
                    banner_img: i.banner_img,
                    name: i.name,
                    time_section: i.time_section,
                    chapter_num: i.chapter_num,
                    tag_list: i.tag_list,
                    teachers: i.teachers,
                    teachers_length: i.teachers.length,
                    status: i.status,
                    original_price: i.original_price,
                    price: i.price,
                    buy_num: i.buy_num,
                    countdown_num: i.countdown_num,
                    goods_id: i.goods_id,
                    is_need_pay: i.is_need_pay,
                    is_show_surplus: i.is_show_surplus,
                    surplus_num: i.surplus_num,
                    is_active: i.is_active,
                    lowest_price: i.lowest_price,
                    active_id: i.active_id
                });
            } else e.tip(a.data.message); else e.tip(a.errMsg);
        });
    },
    courseintro: function() {
        var t = this, a = {
            goods_id: t.data.goods_id
        };
        e.globalRequest(a, "index/live/courseintro", function(a) {
            if (200 == a.statusCode) if (0 == a.data.retcode) {
                var n = a.data.data;
                t.setData({
                    tpl_type: n.tpl_type,
                    content: n.content
                });
                for (var s = 0; s < n.content.length; s++) i.wxParse("intro" + s, "html", n.content[s].intro, t, 5), 
                s === n.content.length - 1 && i.wxParseTemArray("introTemArray", "intro", n.content.length, t, 5);
                t.content1();
            } else e.tip(a.data.message); else e.tip(a.errMsg);
        });
    },
    getCurrentPageUrl: function() {
        var t = getCurrentPages();
        return t[t.length - 1].route;
    },
    coursemenu: function() {
        var t = this, i = {
            goods_id: t.data.goods_id
        };
        e.globalRequest(i, "index/live/coursemenu", function(i) {
            if (200 == i.statusCode) if (0 == i.data.retcode) {
                var n = i.data.data, s = 0;
                a.hasStudentID() && (s = wx.getStorageSync("student_id")), t.setData({
                    coursemenu: {
                        show_type: 1,
                        chapter_num: n.chapter_num,
                        menu_list: n.menu_list,
                        trans_student_id: s
                    }
                }), t.content2();
            } else e.tip(i.data.message); else e.tip(i.errMsg);
        });
    },
    order: function(i) {
        var n = this, s = n.data.goods_id, o = n.data.is_need_pay;
        if (1 == i.currentTarget.dataset.status) return e.tip("参数错误，请刷新后重试！"), !1;
        a.hasStudentID() ? "yes" == o ? wx.navigateTo({
            url: "/pages/confirm/confirm?active=0&type=1&goods_id=" + s
        }) : "no" == o && (n.setData({
            status: 1
        }), n.confirmOrder()) : (t.globalData.after_login_url = "/pages/livedetail/livedetail?goods_id=" + s, 
        wx.navigateTo({
            url: "/pages/login/login"
        }));
    },
    confirmOrder: function() {
        var t = this, a = {
            student_id: wx.getStorageSync("student_id"),
            goods_id: t.data.goods_id,
            num: 1,
            address_id: "",
            order_source: this.data.platform
        };
        e.globalRequest(a, "index/order/create", function(a) {
            200 == a.statusCode ? 0 == a.data.retcode ? "yes" == a.data.data.is_need_pay || "no" == a.data.data.is_need_pay && (wx.setStorageSync("liveBuy", !0), 
            t.loadDetail(), t.showContact()) : e.tip(a.data.message) : e.tip(a.errMsg);
        });
    },
    showContact: function() {
        this.setData({
            contact: !0
        });
    },
    hideContact: function() {
        this.setData({
            contact: !1
        });
    },
    mylivelist: function(t) {
        var e = this;
        e.setData({
            contact: !1
        });
        var a = "../mylivelist/mylivelist?goods_id=" + e.data.goods_id + "&type=1";
        wx.navigateTo({
            url: a
        });
    },
    onShareAppMessage: function() {
        this.getCurrentPageUrl(), this.data.goods_id;
        return {
            title: "我发现一门好课，中公名师主讲，强推！",
            path: "pages/livedetail/livedetail?share=1&goods_id=" + this.data.goods_id
        };
    },
    goIndex: function() {
        wx.switchTab({
            url: "../index/index"
        });
    },
    activeBuy: function() {
        var e = this, i = e.data.goods_id, n = e.data.ownerID, s = e.data.active_id;
        a.hasStudentID() ? wx.navigateTo({
            url: "/pages/activity/activity?help=0&ownerID=" + n + "&activeID=" + s + "&goods_id=" + i
        }) : (t.globalData.after_login_url = "/pages/livedetail/livedetail?goods_id=" + i, 
        wx.navigateTo({
            url: "/pages/login/login"
        }));
    }
});