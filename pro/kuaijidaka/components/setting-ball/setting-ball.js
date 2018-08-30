Component({
    properties: {
        bgColor: {
            type: String,
            value: "#22dd82"
        },
        title: {
            type: String,
            value: "",
            observer: function(t, e) {
                var l = [];
                t.length > 6 && console.warn("Components 'setting-ball':建议标题文字不要超过6个字"), t.length > 3 ? (l[0] = t.slice(0, Math.floor(t.length / 2)), 
                l[1] = t.slice(Math.floor(t.length / 2), t.length)) : l[0] = t, this.setData({
                    titleArr: l
                });
            }
        },
        bottom: {
            type: String,
            value: "30",
            observer: function(t) {
                t.indexOf("px") > 0 || (t += "rpx"), this.setData({
                    bottomPosition: t
                });
            }
        },
        ballList: {
            type: Array,
            value: []
        }
    },
    data: {
        titleArr: [],
        ballListHeight: 0,
        selected: !1,
        ballItemHeight: 152,
        bottomPosition: "30rpx"
    },
    ready: function() {
        if (this.data.ballList.length > 0) {
            var t = this.data.ballItemHeight * this.data.ballList.length, e = this.data.ballList.map(function(t) {
                return t.titleArr = [], t.titleArr[0] = t.title.slice(0, Math.floor(t.title.length / 2)), 
                t.titleArr[1] = t.title.slice(Math.floor(t.title.length) / 2, t.title.length), t;
            });
            this.setData({
                ballListHeight: t,
                ballList: e
            });
        }
    },
    methods: {
        tapChild: function(t) {
            this.triggerEvent("tapChild", t.currentTarget.dataset.index), this.setData({
                selected: !this.data.selected
            });
        },
        toggleSelected: function() {
            var t = !this.data.selected;
            this.setData({
                selected: t
            });
        }
    }
});