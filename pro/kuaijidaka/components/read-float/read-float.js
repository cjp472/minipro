var t = getApp();

t.service, t.util;

Component({
    properties: {
        scene: {
            type: String,
            value: ""
        },
        readingParts: {
            type: String,
            value: ""
        },
        wantToSubmit: {
            type: String,
            value: "off"
        },
        currentParts: {
            type: Number,
            value: 1,
            observer: function(t, e) {
                t > 1 && this.addPart();
            }
        },
        fold: {
            type: Boolean,
            value: !1
        },
        noEvalEdit: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        contentArray: null,
        fold: !1,
        tooManyContent: !1,
        isAdmin: !1,
        prepareToPlay: "",
        avatar: "",
        author: ""
    },
    created: function() {
        this.customData = {
            fullArray: null,
            pictureMaxWidth: 280,
            pictureMaxHeight: 280,
            pictureMinWidth: 80,
            pictureMinHeight: 80
        };
    },
    attached: function() {
        this.init();
    },
    ready: function() {
        this.judgeFold();
    },
    methods: {
        judgeFold: function() {
            var t = this;
            this.data.fold && wx.createSelectorQuery().in(this).select(".reading__container").boundingClientRect(function(e) {
                e && e.height >= 150 ? t.setData({
                    tooManyContent: !0,
                    fold: !0
                }) : t.setData({
                    tooManyContent: !1,
                    fold: !1
                });
            }).exec();
        },
        init: function() {
            var e = this.customData, n = e.pictureMaxWidth, i = e.pictureMaxHeight, r = e.pictureMinWidth, c = e.pictureMinHeight, a = this.data.readingParts, o = function(t) {
                return t.indexOf("https://") < 0 && t.indexOf("http://") < 0;
            };
            try {
                a = JSON.parse(this.data.readingParts);
            } catch (t) {
                wx.showToast({
                    title: "解析阅读内容错误"
                });
            }
            var u = a.force_list;
            u = u.map(function(e, a) {
                return e.chapter_content = e.chapter_content.map(function(e, a) {
                    if ("picture" === e.type || "qrcode" === e.type) e.content[0].picture_width = parseInt(e.content[0].picture_width), 
                    e.content[0].picture_height = parseInt(e.content[0].picture_height), e.content[0].editImg = !0, 
                    e.content[0].picture_width < e.content[0].picture_height ? (e.content[0].editedHeight = e.content[0].picture_height > i ? i : e.content[0].picture_height, 
                    e.content[0].editedWidth = e.content[0].picture_width < r ? r : e.content[0].picture_width * e.content[0].editedHeight / e.content[0].picture_height, 
                    e.content[0].cut = e.content[0].picture_width < r) : (e.content[0].editedWidth = e.content[0].picture_width > n ? n : e.content[0].picture_width, 
                    e.content[0].editedHeight = e.content[0].picture_height < c ? c : e.content[0].picture_height * e.content[0].editedWidth / e.content[0].picture_width, 
                    e.content[0].cut = e.content[0].picture_height < c), o(e.content[0].picture_url) && (e.content[0].picture_url = t.config.hybridPicturePrefix + e.content[0].picture_url); else if ("richText" === e.type) {
                        e.content[0] = function(t) {
                            return t = t.replace(/\\/g, "%"), unescape(t);
                        }(e.content[0]).replace(/<s>/g, "<del>").replace(/<s\s/g, "<del ").replace(/<\/s>/g, "</del>").replace(/<u/g, "<ins").replace(/<\/u>/g, "</ins>").replace(/\u2028|\u2029/g, "");
                    } else "video" === e.type ? o(e.content[0].video_url) && (e.content[0].video_url = t.config.videoPrefix + e.content[0].video_url) : "voice" === e.type && o(e.content[0].voice_url) && (e.content[0].voice_url = t.config.hybridVoicePrefix + e.content[0].voice_url);
                    return e;
                }), e;
            }), this.customData.fullArray = u, this.setData({
                avatar: a.face_url,
                author: a.nick_name,
                isAdmin: 2 === t.globalData.loginUser.user_type_login || 3 === t.globalData.loginUser.user_type_login,
                contentArray: "read-punching" === this.data.scene || u.length === this.data.currentParts ? u : u.slice(0, 1)
            });
        },
        addPart: function() {
            this.customData.fullArray && this.setData({
                contentArray: this.customData.fullArray.slice(0, this.data.currentParts)
            });
        },
        previewImage: function(t) {
            var e = t.detail, n = e.src, i = e.index, r = this.data.contentArray[i].chapter_content.filter(function(t) {
                return "picture" === t.type;
            }).map(function(t) {
                return t.content[0].picture_url;
            });
            this.triggerEvent("preview", {}, {
                bubbles: !0,
                composed: !0
            }), wx.previewImage({
                current: n,
                urls: r
            });
        },
        toggleFold: function() {
            !this.data.fold && t.globalData.videoCtx && t.globalData.videoCtx.pause(), this.data.tooManyContent && this.setData({
                fold: !this.data.fold
            });
        },
        toFold: function() {
            this.setData({
                folded: !1
            });
        },
        endplay: function(t) {
            var e = this, n = t.detail, i = n.voice_url, r = n.readIndex, c = this.data.contentArray[r].chapter_content.filter(function(t) {
                return "voice" == t.type || "recording" == t.type;
            });
            c.map(function(t, n) {
                i === t.content[0].voice_url && n < c.length - 1 && e.setData({
                    prepareToPlay: c[n + 1].content[0].voice_url
                });
            });
        },
        clearPrepareToPlay: function() {
            this.setData({
                prepareToPlay: ""
            });
        }
    }
});