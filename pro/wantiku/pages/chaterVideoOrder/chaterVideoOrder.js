function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../biz/chapter.js")), a = t(require("../../utils/util.js")), i = require("../../config.js"), n = getApp();

Page({
    data: {
        buyState: i.buyState,
        theme: i.UIConfig.Theme,
        checkboxBtnState: !1,
        quantityDetialsOne: [],
        quantityDetialsMore: [],
        quantityDetials: [],
        IsSaleChapter: 0,
        BuyInfo: "",
        DiscountName1: "",
        DiscountName2: "",
        Quantity: 2,
        QuantityIndex: 1,
        TotalChapters: 0,
        endTime: "",
        originalPrice: "",
        TotalPrice: 0,
        DiscountPriceEnd: 0,
        DiscountType: 0,
        QuantityType: 2,
        rootSiteId: 0,
        Discount: .9,
        TotalPriceDiscount: 0,
        SaleDiscount: 0,
        options: "",
        BuyState: ""
    },
    _data: {
        url: "",
        DiscountType: 0
    },
    onLoad: function(t) {
        this.data.options = t, this.setData({
            options: t,
            BuyState: t.BuyState
        }), wx.showLoading({
            title: "正在加载",
            duration: 6e3
        }), this.data.rootSiteId = t.rootSiteId;
        var a = this;
        if ("textbookPapers" == t.type) this._data.url = "/api/vip/ChapterOrderConfirm", 
        e.default.getPriceInfoBook(this.data.rootSiteId, function(t) {
            console.log(t), a.initPriceInfo(t), wx.hideLoading();
        }); else if ("Frequency" == t.type) {
            var i = t.frequencyId;
            this._data.url = "/api/vip/FrequencyOrderConfirm", e.default.getPriceInfoTest(i, function(t) {
                a.initPriceInfo(t), wx.hideLoading();
            });
        } else this._data.url = "/API/VIP/ChapterCourseOrderConfirm", e.default.getPriceInfoMsg(this.data.rootSiteId, function(t) {
            console.log(t), a.initPriceInfo(t), wx.hideLoading();
        });
    },
    initPriceInfo: function(t) {
        var e = this.data.options, i = e.BuyState, n = t.Prices[0].QuantityDetails, o = t.Prices[0].DiscountType, s = t.BuyInfo, c = t.IsSaleChapter, u = t.TotalChapters, r = t.SaleDiscount, l = (10 * t.SaleDiscount).toFixed(1), y = 1 == i ? "" : t.Prices[1].Discount, d = 1 == i ? "" : t.Prices[1].QuantityDetails, h = 1 == i ? "" : t.Prices[1].DiscountType, D = 1 == i ? "" : t.Prices[1].DiscountName1;
        (u > 1 || t.Prices.length > 1) && this.setData({
            DiscountName1: t.Prices[1].DiscountName1,
            DiscountName2: t.Prices[1].DiscountName2
        }), "Frequency" == e.type && this.setData({
            DiscountName1: D
        }), this.setData({
            IsSaleChapter: c,
            Discount: y,
            SaleDiscount: r,
            Prices: t.Prices
        });
        var p = t.Prices[0].QuantityDetails[1], f = p.QuantityType, P = p.TotalPrice, g = (P - this.getPriceByQuantity(p)).toFixed(2), T = (P - g).toFixed(2);
        this.setData({
            SaleDiscountCache: l,
            quantityDetialsOne: n,
            quantityDetialsMore: d,
            quantityDetials: n,
            TotalChapters: u,
            endTime: a.default.payEndTime(this.data.Quantity),
            TotalPrice: P,
            DiscountTypeOne: o,
            DiscountTypeMore: h,
            QuantityType: f,
            DiscountPriceEnd: parseFloat(g),
            TotalPriceDiscount: parseFloat(T),
            BuyInfo: s
        });
    },
    getPriceByQuantity: function(t) {
        return this.data.SaleDiscount > 0 ? 0 == this.data.DiscountType ? t.TotalPrice * this.data.SaleDiscount : t.TotalPrice * this.data.SaleDiscount * this.data.Discount : 0 == this.data.DiscountType ? t.TotalPrice * t.Discount : t.TotalPrice * t.Discount * this.data.Discount;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    checkboxBtn: function() {
        this.setData({
            checkboxBtnState: !this.data.checkboxBtnState
        }), this.data.checkboxBtnState ? this.setData({
            quantityDetials: this.data.quantityDetialsMore,
            DiscountType: this.data.DiscountTypeMore
        }) : this.setData({
            quantityDetials: this.data.quantityDetialsOne,
            DiscountType: this.data.DiscountTypeOne
        }), this.refreshQuantityDetials(this.data.QuantityIndex);
    },
    choosePayTime: function(t) {
        var e = t.currentTarget.dataset.quantity, i = t.currentTarget.dataset.index;
        this.setData({
            Quantity: e,
            endTime: a.default.payEndTime(e)
        }), this.refreshQuantityDetials(i);
    },
    refreshQuantityDetials: function(t) {
        var e = this.data.quantityDetials[t], a = this.getPriceByQuantity(e), i = e.TotalPrice, n = e.QuantityType, o = (i - a).toFixed(2), s = (i - o).toFixed(2);
        this.setData({
            TotalPriceDiscount: parseFloat(s),
            QuantityIndex: t,
            DiscountPriceEnd: parseFloat(o),
            TotalPrice: i,
            QuantityType: n
        });
    },
    formSubmit: function(t) {
        if (n.globalData.SystemInfo.iOS) wx.showModal({
            title: "请下载万题库APP购买",
            content: "基于微信的运营规范，小程序暂不支持当前商品的购买，请下载万题库APP购买",
            showCancel: !1,
            confirmText: "知道了",
            success: function(t) {}
        }); else if (this.data.buyState) {
            console.log("form"), wx.showLoading({
                title: "正在生成订单",
                duration: 6e3
            });
            var a = {
                QuantityType: this.data.QuantityType,
                DiscountType: this.data.DiscountType,
                ChapterId: this.data.rootSiteId,
                FrequencyId: this.data.options.frequencyId
            };
            e.default.getChapterOrder(this._data.url, a, function(t) {
                var a = t.OrderNo, i = t.NotifyAsync;
                console.log(a), console.log(i), e.default.getPayWeixinData(n.globalData.userData.OpenId, a, i, function(t) {
                    var e = t.PayPartnerInfoNew.timeStamp, a = t.PayPartnerInfoNew.nonceStr, i = t.PayPartnerInfoNew.package, n = t.PayPartnerInfoNew.paySign, o = t.PayPartnerInfoNew.signType;
                    console.log("timeStamp : " + e), console.log("nonceStr : " + a), console.log("packages : " + i), 
                    console.log("paySign : " + n), console.log("signType : " + o), wx.hideLoading(), 
                    wx.requestPayment({
                        timeStamp: e,
                        nonceStr: a,
                        package: i,
                        signType: o,
                        paySign: n,
                        success: function(t) {
                            console.log(t), wx.showToast({
                                title: "支付成功",
                                duration: 1500
                            });
                            var e = getCurrentPages();
                            e[e.length - 2].setData({
                                IsSaleSuccessRefresh: !0
                            }), wx.navigateBack({});
                        },
                        fail: function(t) {
                            console.log(t), wx.showToast({
                                title: "支付失败",
                                image: "/images/icon/icon_tip.png",
                                duration: 2e3,
                                mask: !0
                            });
                        }
                    });
                });
            });
        } else wx.showModal({
            content: "请下载万题库APP学习",
            showCancel: !1
        });
    }
});