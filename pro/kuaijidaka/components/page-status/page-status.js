Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        imgSrc: {
            type: String,
            value: "https://cdn-qiye.jingdaka.com/images/sold_out.png"
        },
        titleMsg: {
            type: String,
            value: "课程已下架!"
        },
        doSometing: {
            type: String,
            value: "返回首页"
        }
    },
    data: {
        someData: {}
    },
    methods: {
        toIndex: function() {
            wx.reLaunch({
                url: "/pages/user/my/my"
            });
        }
    }
});