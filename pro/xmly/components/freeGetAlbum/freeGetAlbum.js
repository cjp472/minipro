var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, t = require("../../utils/util");

Component({
    properties: {
        album: {
            type: Object,
            value: {}
        },
        noBorderBottom: {
            type: Boolean,
            value: !1
        },
        showMine: {
            type: Boolean,
            value: !1
        },
        isIndex: {
            type: Boolean,
            value: !1
        },
        indexReport: {
            type: Boolean,
            value: !1
        },
        isSucceed: {
            type: Boolean,
            value: !1
        },
        isFailed: {
            type: Boolean,
            value: !1
        },
        isOutOfNumber: {
            type: Boolean,
            value: !1
        },
        listIndex: {
            type: String,
            value: "-1"
        }
    },
    data: {
        isIOS: "ios" == wx.getSystemInfoSync().platform || "devtools" == wx.getSystemInfoSync().platform
    },
    attached: function() {
        this.countDown();
    },
    methods: {
        toAlbumDetail: function(e) {
            var a = this.data, i = a.indexReport, o = a.listIndex, n = e.currentTarget.dataset, r = n.albumId, l = n.price, s = n.assistanceNumber;
            i ? wx.reportAnalytics("shouyezhuli", {
                list_index: o,
                album_id: r
            }) : wx.reportAnalytics("zhuli", {
                album_id: r,
                price: l,
                assistance_number: s
            }), (0, t.jumpTo)({
                url: "../paidPackage/pages/albumDetailPaid/albumDetailPaid?albumId=" + r + "&isAssistant=1&ispaid=1"
            });
        },
        checkDetail: function(t) {
            var a = e({}, t.currentTarget.dataset);
            this.triggerEvent("check", a);
        },
        keepShare: function(t) {
            var a = e({}, t.currentTarget.dataset);
            this.triggerEvent("share", a);
        },
        countDown: function() {
            var e = this, t = e.data, a = t.isFailed, i = t.isSucceed, o = t.isOutOfNumber;
            if (!(a || i || o)) {
                var n = e.data.album, r = n.leftTime, l = n.isInvalid;
                l || void 0 === l || (r -= 100, e.setData({
                    "album.leftTimeStr": e.millisecondToStr(r),
                    "album.leftTime": r
                }), r > 0 ? setTimeout(function() {
                    e.countDown();
                }, 100) : e.setData({
                    "album.isInvalid": !1
                }));
            }
        },
        millisecondToStr: function(e) {
            var t;
            if ((e /= 1e3) > -1) {
                var a = Math.floor(e / 3600), i = Math.floor(e / 60) % 60, o = e % 60;
                t = a < 10 ? "0" + a + ":" : a + ":", i < 10 && (t += "0"), t += i + ":", o < 10 && (t += "0"), 
                t += o.toFixed(1);
            }
            return t;
        }
    }
});