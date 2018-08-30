var e = getApp().service;

Component({
    relations: {
        "./images/images": {
            type: "child"
        },
        "./video/video": {
            type: "child"
        }
    },
    properties: {
        imgArr: {
            type: Array,
            value: [],
            observer: function(e, t) {
                JSON.stringify(e) != JSON.stringify(t) && this.getSize();
            }
        },
        videoArr: {
            type: Array,
            value: [],
            observer: function(e, t) {
                JSON.stringify(e) != JSON.stringify(t) && this.getSize();
            }
        },
        deleteBtn: {
            type: Boolean,
            value: !1
        },
        page: {
            type: String,
            value: "normal"
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
    data: {
        width: 0,
        height: 0
    },
    methods: {
        getSize: function() {
            var t = this;
            if (t.data.deleteBtn) t.setData({
                width: 140,
                height: 140
            }); else if ("normal" == t.data.page) if (t.data.imgArr.length + t.data.videoArr.length == 1) if (1 == t.data.videoArr.length) t.setData({
                width: 360
            }); else {
                var i = [ e.util.changePictureQuality(t.data.imgArr[0], "small_long") ];
                t.setData({
                    imgArr: i,
                    width: 360
                });
            } else t.setData({
                width: 198,
                height: 198
            }); else t.setData({
                width: 160,
                height: 160
            });
        },
        deleteImg: function(e) {
            this.triggerEvent("deleteImg", e.detail);
        },
        deleteVideo: function(e) {
            this.triggerEvent("deleteVideo", e.detail);
        }
    }
});