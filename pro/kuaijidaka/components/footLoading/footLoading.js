Component({
    properties: {
        loadMore: {
            type: Boolean,
            value: !1,
            observer: function(e, o) {}
        },
        noMore: {
            type: Boolean,
            value: !1
        },
        pageType: {
            type: String,
            value: "user"
        },
        pageTxt: {
            type: String,
            value: "已经到底了"
        }
    },
    data: {},
    methods: {}
});