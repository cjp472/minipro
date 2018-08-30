var e = getApp(), t = (e.service, e.util);

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
        videoArr: {
            type: Array,
            value: []
        },
        url: {
            type: String,
            value: "",
            observer: function(e, t) {
                e && this._getPoster();
            }
        },
        index: {
            type: Number,
            value: ""
        },
        deleteBtn: {
            type: Boolean,
            value: !0
        },
        applyScene: {
            type: String,
            value: "normal"
        },
        disable: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        hiddenVideo: "hiddenVideo",
        autoplay: !1,
        playUrl: "",
        videoId: "video",
        mode: "aspectFill",
        direction: 0,
        poster: "",
        bindpause: !1,
        updateVideo: !0
    },
    methods: {
        _getPoster: function() {
            var t = this;
            if (t.data.url.indexOf("/video/") > 0) {
                var a = t.data.url.split("/video/")[1], i = a.lastIndexOf(".");
                a = a.substring(0, i);
                var d = e.config.videoPosterBase + "video/" + a + ".jpg";
                t.setData({
                    poster: d,
                    updateVideo: !1,
                    videoId: "videoId" + t.data.url
                }), "normal" == t.data.applyScene ? t.setData({
                    mode: "aspectFill"
                }) : "hybrid-theme" == t.data.applyScene && t.setData({
                    mode: "aspectFit"
                });
            } else t.setData({
                poster: "https://static3topen.jingdaka.com/images/video_first_frame.png"
            });
        },
        bindload: function(e) {
            this.setData({
                updateVideo: !0
            }), e.detail.width && (e.detail.width > e.detail.height ? this.setData({
                direction: 90
            }) : this.setData({
                direction: 0
            }));
        },
        binderror: function(e) {
            this.setData({
                poster: "https://static3topen.jingdaka.com/images/video_first_frame.png",
                updateVideo: !0
            });
        },
        videoPlay: function(a) {
            var i = this;
            i.videoCtx = wx.createVideoContext(i.data.videoId, this), e.globalData.videoCtx && e.globalData.videoCtx.pause(), 
            e.globalData.videoCtx = i.videoCtx, i.triggerEvent("preview", {}, {
                bubbles: !0,
                composed: !0
            }), i.setData({
                playUrl: i.data.url,
                autoplay: !0
            }), e.globalData.videoCtx.requestFullScreen(), e.globalData.videoCtx.play(), setTimeout(function() {
                i.setData({
                    bindpause: !0
                });
            }, 200), t.stopVoicePlay(!0);
        },
        screenChange: function(t) {
            var a = this;
            t.detail.fullScreen || (e.globalData.videoCtx.pause(), e.globalData.videoCtx.seek(0), 
            a.setData({
                autoplay: !1,
                hiddenVideo: "hiddenVideo"
            }));
        },
        exitFullScreen: function() {
            e.globalData.videoCtx.exitFullScreen(), e.globalData.videoCtx.pause(), e.globalData.videoCtx.seek(0), 
            this.setData({
                autoplay: !1,
                hiddenVideo: "hiddenVideo"
            });
        },
        deleteItem: function(e) {
            var t = this, a = e.currentTarget.dataset;
            t.triggerEvent("delete", a);
        },
        _bindplay: function() {
            var a = this;
            a.videoCtx = wx.createVideoContext(a.data.videoId, this), e.globalData.videoCtx && e.globalData.videoCtx.pause(), 
            e.globalData.videoCtx = a.videoCtx, a.setData({
                hiddenVideo: !1,
                playUrl: a.data.url,
                autoplay: !0
            }), e.globalData.videoCtx.play(), setTimeout(function() {
                a.setData({
                    bindpause: !0
                });
            }, 200), t.stopVoicePlay(!0), a.triggerEvent("videoplay", {});
        },
        _bindended: function(t) {
            e.globalData.videoCtx.exitFullScreen(), e.globalData.videoCtx.pause(), e.globalData.videoCtx.seek(0), 
            this.data.hiddenVideo || this.setData({
                autoplay: !1,
                hiddenVideo: !0,
                bindpause: !1
            });
        },
        _bindpause: function() {
            this.data.bindpause && !this.data.hiddenVideo && this.setData({
                autoplay: !1,
                hiddenVideo: !0,
                bindpause: !1
            });
        }
    }
});