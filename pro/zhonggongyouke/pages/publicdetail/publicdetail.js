function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a, i = getApp(), n = require("../../utils/common.js"), s = require("../../utils/login.js"), o = require("../../wxParse/wxParse.js");

Page((a = {
    data: (e = {
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
        scroll_height: "",
        myTop: 0,
        winHeight: "",
        currentTab: 0,
        scrollLeft: 0,
        contentHeights: [],
        rpxR: 1
    }, t(e, "status", 0), t(e, "scroll_left", 0), t(e, "scroll_right", 0), e),
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
    getTop: function() {
        var t = this, e = wx.createSelectorQuery();
        e.select("#myTop").boundingClientRect(), e.exec(function(e) {
            t.setData({
                myTop: e[0].height
            });
        });
    },
    scroll: function(t) {
        var e = this;
        e.setData({
            scroll_height: t.detail.scrollTop
        }), e.getTop();
    },
    scrollleft: function(t) {
        this.setData({
            scroll_left: t.detail.scrollTop
        });
    },
    scrollright: function(t) {
        this.setData({
            scroll_right: t.detail.scrollTop
        });
    },
    content1: function(t) {},
    content2: function(t) {},
    onLoad: function(t) {
        console.log(t.share);
        i = this;
        1 == t.share && i.setData({
            share: !0
        }), this.setData({
            goods_id: t.goods_id
        });
        var e = wx.getSystemInfoSync().system, a = /android/i;
        /ios/i.test(e) ? this.setData({
            platform: 1
        }) : a.test(e) ? this.setData({
            platform: 2
        }) : this.setData({
            platform: 1
        }), this.courseintro(), this.coursemenu();
        var i = this;
        wx.getSystemInfo({
            success: function(t) {
                var e = t.windowHeight * (750 / t.windowWidth);
                i.setData({
                    winHeight: e
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
    loadDetail: function() {
        var t = this, e = 0, a = {
            goods_id: t.data.goods_id,
            student_id: e = "" == wx.getStorageSync("student_id") ? 0 : wx.getStorageSync("student_id")
        };
        n.globalRequest(a, "index/public/coursedetail", function(e) {
            if (200 == e.statusCode) if (0 == e.data.retcode) {
                var a = e.data.data;
                t.setData({
                    head_tpl_type: a.head_tpl_type,
                    banner_img: a.banner_img,
                    name: a.name,
                    chapter_num: a.chapter_num,
                    tag_list: a.tag_list,
                    teachers: a.teachers,
                    teachers_length: a.teachers.length,
                    is_buy: a.is_buy,
                    original_price: a.original_price,
                    price: a.price,
                    buy_num: a.buy_num,
                    goods_id: a.goods_id,
                    is_need_pay: a.is_need_pay
                }), t.getTop();
            } else n.tip(e.data.message); else n.tip(e.errMsg);
        });
    },
    getUrlParam: function(t, e) {
        var a = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"), i = t.match(a);
        return null != i ? unescape(i[2]) : null;
    },
    getCurrentPageUrl: function() {
        var t = getCurrentPages();
        return t[t.length - 1].route;
    },
    onShareAppMessage: function() {
        return {
            title: "我发现一门好课，中公名师主讲，课程好在线学超方便，强烈推荐给你！",
            path: this.getCurrentPageUrl() + "?goods_id=" + this.data.goods_id
        };
    },
    courseintro: function() {
        var t = this, e = {
            goods_id: t.data.goods_id
        };
        n.globalRequest(e, "index/public/courseintro", function(e) {
            if (200 == e.statusCode) if (0 == e.data.retcode) {
                var a = e.data.data;
                t.setData({
                    tpl_type: a.tpl_type,
                    content: a.content
                });
                for (var i = 0; i < a.content.length; i++) o.wxParse("intro" + i, "html", a.content[i].intro, t, 5), 
                i === a.content.length - 1 && o.wxParseTemArray("introTemArray", "intro", a.content.length, t, 5);
                t.content1();
            } else n.tip(e.data.message); else n.tip(e.errMsg);
        });
    },
    coursemenu: function() {
        var t = this, e = 0, a = {
            goods_id: t.data.goods_id,
            student_id: e = "" == wx.getStorageSync("student_id") ? 0 : wx.getStorageSync("student_id")
        };
        n.globalRequest(a, "index/public/coursemenu", function(e) {
            if (200 == e.statusCode) if (0 == e.data.retcode) {
                var a = e.data.data;
                t.setData({
                    coursemenu: {
                        showtype: 1,
                        chapter_num: a.chapter_num,
                        menu_list: a.menu_list,
                        menu_hide: !0
                    }
                }), t.content2();
            } else n.tip(e.data.message); else n.tip(e.errMsg);
        });
    },
    order: function(t) {
        var e = this, a = e.data.goods_id, o = e.data.is_need_pay;
        if (1 == t.currentTarget.dataset.status) return n.tip("参数错误，请刷新后重试！"), !1;
        s.hasStudentID() ? "yes" == o ? wx.navigateTo({
            url: "/pages/confirm/confirm?active=0&type=2&goods_id=" + a
        }) : "no" == o && (e.setData({
            status: 1
        }), e.confirmOrder()) : (i.globalData.after_login_url = "/pages/publicdetail/publicdetail?goods_id=" + a, 
        wx.navigateTo({
            url: "/pages/login/login"
        }));
    },
    confirmOrder: function() {
        var t = this, e = {
            student_id: wx.getStorageSync("student_id"),
            goods_id: t.data.goods_id,
            num: 1,
            address_id: "",
            order_source: this.data.platform
        };
        n.globalRequest(e, "index/order/create", function(e) {
            200 == e.statusCode ? 0 == e.data.retcode ? "yes" == e.data.data.is_need_pay || "no" == e.data.data.is_need_pay && (wx.setStorageSync("publicBuy", !0), 
            wx.setStorageSync("publicListBuy", !0), t.loadDetail(), t.showContact()) : n.tip(e.data.message) : n.tip(e.errMsg);
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
    myPublicList: function(t) {
        var e = this;
        e.setData({
            contact: !1
        });
        var a = "../mypubliclist/mypubliclist?goods_id=" + e.data.goods_id;
        wx.navigateTo({
            url: a
        });
    }
}, t(a, "onShareAppMessage", function() {
    return {
        title: "我发现一门好课，中公名师主讲，强推！",
        path: "pages/publicdetail/publicdetail?share=1&goods_id=" + this.data.goods_id
    };
}), t(a, "goIndex", function() {
    wx.switchTab({
        url: "../index/index"
    });
}), a));