Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        content: {
            type: String,
            value: "",
            observer: function(t, e) {
                t != e && this._init();
            }
        },
        kind: {
            type: Number,
            value: ""
        },
        colorScheme: {
            type: String,
            value: "user"
        },
        haveBg: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        contentJson: "",
        imgList: [],
        voiceList: [],
        videoList: []
    },
    methods: {
        _init: function() {
            var t = "";
            if (-1 == this.data.kind) {
                if (this.data.content) {
                    var e = [], i = [], n = [];
                    try {
                        t = JSON.parse(this.data.content);
                        for (var a = JSON.parse(this.data.content).media, o = 0; o < a.length; o++) "picture" == a[o].type && e.push(a[o].content[0].picture_url);
                        for (var s = 0; s < a.length; s++) "voice" != a[s].type && "recording" != a[s].type || i.push(a[s]);
                        for (var r = 0; r < a.length; r++) "video" == a[r].type && n.push(a[r].content[0].video_url);
                        this.setData({
                            imgList: e,
                            voiceList: i,
                            videoList: n
                        });
                    } catch (t) {
                        wx.showToast({
                            title: "解析文本错误"
                        });
                    }
                }
            } else if (this.data.content) try {
                t = JSON.parse(this.data.content);
            } catch (t) {
                wx.showToast({
                    title: "解析文本错误"
                });
            }
            this.setData({
                contentJson: t
            });
        },
        previewImg: function(t) {
            var e = t.currentTarget.dataset.url;
            wx.previewImage({
                current: e,
                urls: [ e ]
            });
        }
    }
});