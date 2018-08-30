Component({
    properties: {
        naviList: {
            type: Array,
            value: []
        }
    },
    data: {
        offset: 0
    },
    methods: {
        moveBar: function() {
            this.setData({
                offset: 0 === this.data.offset ? -128 * this.data.naviList.length : 0
            });
        },
        toNavi: function(t) {
            var e = t.currentTarget.dataset;
            "redirect" === e.jumptype ? wx.redirectTo({
                url: e.url
            }) : wx.navigateTo({
                url: e.url
            });
        }
    }
});