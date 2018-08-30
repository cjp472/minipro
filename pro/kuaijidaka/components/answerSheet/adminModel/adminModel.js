var e = getApp(), t = (e.service, e.util);

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        allQsNum: {
            type: Number,
            value: 0
        },
        qsNum: {
            type: Number,
            value: 0
        },
        index: {
            type: Number,
            value: 0,
            observer: function(e, t) {
                var a = this;
                e != t && a._switchTab(a.data.index);
            }
        },
        chapter: {
            type: Number,
            value: 0,
            observer: function(e, t) {
                e != t && this.setData({
                    submited: 0
                });
            }
        },
        chapterNum: {
            type: Number,
            value: 0
        },
        listArray: {
            type: Array,
            value: []
        },
        finish: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        select: 0
    },
    methods: {
        _switchTab: function(e) {
            var a = this;
            t.stopVideoPlay(), a.setData({
                select: e,
                index: e,
                scrollTo: e - 2 >= 0 ? e - 2 : 0
            });
        },
        next: function(e) {
            this.triggerEvent("next", e.detail);
        },
        previous: function(e) {
            this.triggerEvent("previous", e.detail);
        },
        goBack: function() {
            wx.navigateBack({
                data: 1
            });
        }
    }
});