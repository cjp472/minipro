App({
    onLaunch: function(e) {},
    onShow: function(e) {
        this.shareTicket, e && e.scene && 1044 == e.scene && (this.shareTicket = e.shareTicket ? e.shareTicket : "");
    },
    globalData: {
        host: "https://api-xcx-qunsou.weiyoubot.cn/xcx",
        envVersion: function() {
            return this.host.indexOf("pre") > 0 ? "trial" : "release";
        },
        noticeBoard: {
            showUpgradeDialog: 0,
            title: "100个公众号关联名额",
            desc: "喜欢重要通知小程序的你有微信公众号吗？\n如果有，就可以马上关联！\n\n请您按照以下步骤操作：\n1. 登录微信公众号\n2. 小程序管理-添加\n3. 关联小程序\n4. 输入小程序App ID：wx9301aa654c7cb6b2\n5. 提交关联申请后，1-2天时间内通过，关联成功。\n\n备注：\n1. 关联过程中，有任何疑问请联系小程序客服。\n2. 本次关联免费，无任何 RMB 往来。"
        },
        recommend: {
            title: "许愿送祝福",
            appid: "wx3dd29bfe3e5f0d1d"
        },
        adSwiper: {
            indicatorDots: !0,
            autoplay: !0,
            interval: 5e3,
            duration: 1e3
        }
    }
});