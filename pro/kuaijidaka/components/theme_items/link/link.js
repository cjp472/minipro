Component({
    properties: {
        linkUrl: {
            type: String,
            value: ""
        },
        linkTitle: {
            type: String,
            value: ""
        },
        applyType: {
            type: String,
            value: ""
        },
        index: {
            type: Number,
            value: 0
        },
        linkType: {
            type: String,
            value: "transform"
        }
    },
    data: {
        showWeb: !1
    },
    ready: function() {},
    methods: {
        delLink: function() {
            this.triggerEvent("delLink", {
                index: this.data.index
            });
        },
        toLinkDetail: function() {
            getApp().globalData.link_website = this.data.linkUrl, wx.navigateTo({
                url: "/pages/user_sub/link_article/link_article?openType=" + this.data.linkType
            });
        }
    }
});