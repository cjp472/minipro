function c(c) {
    var t = [ {
        description: "实现产品分类上传及销售，在线完成支付，订单管理与发货设置。适用于服装、水果、化妆品、在线教育等各个行业。（示例中部分功能未开放）",
        title: "商城示例",
        pics: [ "https://cdn-xcx-qunsou.weiyoubot.cn/xcx/2017-08-24/51ca03a3-6e84-49bd-994d-2e8d9a02c007.jpg", "https://cdn-xcx-qunsou.weiyoubot.cn/xcx/2017-08-24/a6095427-b35d-4588-b8ae-d7bf8c982c5a.jpg", "https://cdn-xcx-qunsou.weiyoubot.cn/xcx/2017-08-24/b65e5a3b-5f60-4077-aa4e-ec2c21e27e7d.jpg", "https://cdn-xcx-qunsou.weiyoubot.cn/xcx/2017-08-24/5f941c7d-4fda-47d6-b09d-2122a210258c.jpg" ],
        appid: "wx8b23c357521d1783",
        qrcode: "/images/customized/version_old1.png",
        logo: "/images/customized/logo1.jpg"
    }, {
        description: "打造企业微官网，展示企业文化、产品、联系方式等重要信息，用户在5km以内可直接在附近小程序中找到微官网。适用于实体店铺、教育培训等任何需要品牌推广的企业。",
        title: "微官网示例",
        pics: [ "https://cdn-xcx-qunsou.weiyoubot.cn/xcx/2017-08-24/9b88eca4-079a-4a1b-aae6-d21989212623.jpg", "https://cdn-xcx-qunsou.weiyoubot.cn/xcx/2017-08-24/3726d2a7-cad2-4abb-9294-0f526b8f80c3.jpg", "https://cdn-xcx-qunsou.weiyoubot.cn/xcx/2017-08-24/66cf91a2-0f60-427d-b607-b91ba0f9ede3.jpg", "https://cdn-xcx-qunsou.weiyoubot.cn/xcx/2017-08-24/c33ea33c-4a67-412f-8452-d26f27e135df.jpg" ],
        appid: "wx783e6aae40519ccf",
        qrcode: "/images/customized/version_old2.png",
        logo: "/images/customized/logo2.jpg"
    } ];
    c.setData({
        recommends: t
    });
}

var t = require("../../utils/util.js");

getApp();

Page({
    data: {
        showLoadError: 0,
        recommends: null,
        buttonClicked: !1
    },
    onLoad: function() {
        c(this);
    },
    refresh: function() {
        c(this);
    },
    try: function(c) {
        var t = this.data.recommends[c.currentTarget.dataset.index];
        wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
            appId: t.appid
        }) : wx.previewImage({
            urls: [ t.qrcode ]
        });
    },
    showPic: function(c) {
        var t = c.currentTarget.dataset.pics, e = c.currentTarget.dataset.pic;
        wx.previewImage({
            current: e,
            urls: t
        });
    },
    toCustom: function() {
        t.buttonClicked(this), wx.navigateTo({
            url: "../custom/custom"
        });
    }
});