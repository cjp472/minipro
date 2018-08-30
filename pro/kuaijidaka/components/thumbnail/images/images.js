var e = getApp().service;

Component({
    relations: {
        "./group/group": {
            type: "parent"
        }
    },
    properties: {
        width: {
            type: String,
            value: 0
        },
        height: {
            type: String,
            value: 0
        },
        imgArr: {
            type: Array,
            value: []
        },
        url: {
            type: String,
            value: ""
        },
        index: {
            type: Number,
            value: ""
        },
        deleteBtn: {
            type: Boolean,
            value: !0
        },
        singleImg: {
            type: Boolean,
            value: !1
        },
        isdoodle: {
            type: Boolean,
            value: !1
        },
        disable: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        deleteItem: function(e) {
            var t = e.currentTarget.dataset;
            this.triggerEvent("delete", t);
        },
        preview: function(t) {
            for (var r = this, a = t.currentTarget.dataset.index, i = t.currentTarget.dataset.imgarr, n = [], l = 0; l < i.length; l++) n = n.concat(e.util.changePictureQuality(i[l]));
            r.data.isdoodle ? (n = encodeURI(n.join("|")), wx.navigateTo({
                url: "/pages/admin_sub/handwriting/handwriting?imgArr=" + n + "&index=" + a
            })) : (this.triggerEvent("preview", {}, {
                bubbles: !0,
                composed: !0
            }), wx.previewImage({
                current: n[a],
                urls: n
            }));
        }
    }
});