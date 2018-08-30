Component({
    properties: {
        content: {
            type: Object,
            value: {}
        },
        colorScheme: {
            type: String,
            value: "user"
        }
    },
    data: {},
    methods: {
        previewImg: function(e) {
            var t = e.currentTarget.dataset.url;
            wx.previewImage({
                current: t,
                urls: [ t ]
            });
        }
    }
});