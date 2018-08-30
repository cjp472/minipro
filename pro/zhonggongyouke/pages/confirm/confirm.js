getApp();

var t = require("../../utils/common.js"), a = require("../../utils/login.js");

require("../../utils/md5.js");

Page({
    data: {
        pay: !1,
        contact: !1,
        goContact: !1,
        reload: !1
    },
    onLoad: function(t) {
        console.log(t.active), this.checkStudentId(), this.setData({
            goods_id: t.goods_id,
            type: t.type,
            is_active: t.active
        }), wx.getStorageSync("address_id") && (this.setData({
            address_id: wx.getStorageSync("address_id")
        }), this.showAddress());
        var a = wx.getSystemInfoSync().system, e = /android/i;
        /ios/i.test(a) ? this.setData({
            platform: 1
        }) : e.test(a) ? this.setData({
            platform: 2
        }) : this.setData({
            platform: 1
        }), this.confirmDetail(), this.addressList(), this.confirmPay();
    },
    onShow: function() {
        void 0 != wx.getStorageSync("address_id") && (this.setData({
            address_id: wx.getStorageSync("address_id")
        }), this.showAddress()), this.confirmDetail(), this.addressList(), this.checkPay();
    },
    checkPay: function() {
        this.data.goods_id, wx.getStorageSync("pay");
    },
    checkStudentId: function() {
        a.hasStudentID() || wx.navigateTo({
            url: "../login/login"
        });
    },
    confirmDetail: function() {
        var a = this, e = wx.getStorageSync("student_id"), s = a.data.goods_id, d = {
            student_id: e,
            goods_id: s,
            num: 1,
            is_active: a.data.is_active
        };
        console.log(e), console.log(s), t.globalRequest(d, "index/order/confirm", function(e) {
            if (200 == e.statusCode) if (0 == e.data.retcode) {
                var s = e.data.data;
                a.setData({
                    has_book: s.has_book,
                    name: s.name,
                    chapter_num: s.chapter_num,
                    teachers: s.teachers,
                    time_section: s.time_section,
                    price: s.price
                });
            } else t.tip(e.data.message); else t.tip(e.errMsg);
        });
    },
    addressList: function() {
        var a = this, e = {
            student_id: wx.getStorageSync("student_id")
        };
        t.globalRequest(e, "index/student/addresslist", function(e) {
            if (200 == e.statusCode) if (0 == e.data.retcode) {
                var s = e.data.data;
                a.setData({
                    addressList: s,
                    addressListLength: s.length
                }), 1 == s.length && (wx.setStorageSync("address_id", s[0].address_id), a.setData({
                    address_id: wx.getStorageSync("address_id")
                }), a.showAddress());
            } else t.tip(e.data.message); else t.tip(e.errMsg);
        });
    },
    showAddress: function() {
        var a = this, e = {
            student_id: wx.getStorageSync("student_id"),
            address_id: wx.getStorageSync("address_id")
        };
        t.globalRequest(e, "index/student/editaddress", function(e) {
            if (200 == e.statusCode) if (0 == e.data.retcode) {
                var s = e.data.data;
                a.setData({
                    receiver: s.receiver,
                    phone: s.phone,
                    detail_address: s.detail_address,
                    province: s.province,
                    city: s.city,
                    area: s.area
                });
            } else t.tip(e.data.message); else t.tip(e.errMsg);
        });
    },
    addaddress: function() {
        t = "/pages/address/address";
        if (0 == this.data.addressListLength || void 0 == this.data.addressListLength) t = "/pages/address/address"; else var t = "/pages/addresses/addresses";
        wx.navigateTo({
            url: t
        });
    },
    confirmOrder: function() {
        console.log("确认支付");
        var a = this, e = a.data.type;
        a.setData({
            BuyType: e
        });
        var s = wx.getStorageSync("student_id"), d = wx.getStorageSync("address_id");
        if (1 == a.data.has_book && !d) return t.tip("请添加收货地址"), !1;
        var i = a.data.goods_id, o = wx.getStorageSync("pay");
        if (i == o) return t.tip("您已购买过该课程，请返回课程列表页并下拉刷新！"), !1;
        if (1 == a.data.pay) return t.tip("您已购买过该课程，请返回课程列表页并下拉刷新！"), !1;
        d = 0;
        1 == a.data.has_book && wx.getStorageSync("address_id") && (d = wx.getStorageSync("address_id"));
        var r = {
            student_id: s,
            goods_id: i,
            num: 1,
            address_id: d,
            order_source: a.data.platform,
            is_active: a.data.is_active
        };
        t.globalRequest(r, "index/order/create", function(e) {
            if (200 == e.statusCode) if (0 == e.data.retcode) if ("yes" == e.data.data.is_need_pay) {
                var o = "index/order/weixinpay", r = {
                    student_id: s,
                    order_sn: e.data.data.order_sn
                };
                if (a.setData({
                    order_sn: e.data.data.order_sn
                }), console.log("确认支付2"), 1 == a.data.platform) {
                    a.setData({
                        goContact: !0
                    });
                    var o = "index/student/saveorderaddress", r = {
                        student_id: s,
                        goods_id: i,
                        address_id: d
                    };
                    t.globalRequest(r, o, function(t) {
                        200 == t.statusCode ? 0 == t.data.retcode ? console.log("发送成功！") : console.log(t.data.message) : console.log(t.errMsg);
                    });
                } else t.globalRequest(r, o, function(t) {
                    wx.requestPayment({
                        timeStamp: t.data.data.timeStamp + "",
                        nonceStr: t.data.data.nonceStr,
                        package: t.data.data.package,
                        signType: t.data.data.signType,
                        paySign: t.data.data.paySign,
                        success: function(t) {
                            a.setData({
                                contact: !0
                            });
                        },
                        fail: function(t) {}
                    });
                });
            } else e.data.data.is_need_pay; else t.tip(e.data.message); else t.tip(e.errMsg);
        });
    },
    confirmPay: function() {
        var a = this, e = wx.getStorageSync("student_id"), s = a.data.goods_id;
        setInterval(function() {
            var d = a.data.contact, i = a.data.pay;
            if (1 == d && 0 == i) {
                var o = {
                    student_id: e,
                    goods_id: s
                };
                t.globalRequest(o, "/index/order/payresult", function(t) {
                    0 == t.data.code && 1 == t.data.data.is_complete && (a.setData({
                        pay: !0
                    }), 1 == a.data.BuyType ? wx.setStorageSync("liveBuy", !0) : 2 == a.data.BuyType && (wx.setStorageSync("publicBuy", !0), 
                    wx.setStorageSync("publicListBuy", !0)));
                });
            }
        }, 1e3);
    },
    hideContact: function() {
        this.setData({
            contact: !1
        });
    },
    mylivelist: function(t) {
        var a = this;
        a.setData({
            contact: !1
        });
        var e = "../mylivelist/mylivelist?goods_id=" + a.data.goods_id + "&type=1";
        wx.navigateTo({
            url: e
        });
    },
    myPublicList: function(t) {
        var a = this;
        a.setData({
            contact: !1
        });
        var e = "../mypubliclist/mypubliclist?goods_id=" + a.data.goods_id;
        wx.navigateTo({
            url: e
        });
    },
    contactTouch: function() {
        this.setData({
            reload: !0
        });
    },
    havePay: function() {
        console.log("我已支付！"), this.setData({
            contact: !0,
            goContact: !1
        }), this.confirmDetail(), this.addressList(), this.addressList(), this.confirmPay();
    },
    reload: function() {
        this.setData({
            goContact: !1,
            reload: !1
        }), this.confirmDetail(), this.addressList(), this.checkPay();
    }
});