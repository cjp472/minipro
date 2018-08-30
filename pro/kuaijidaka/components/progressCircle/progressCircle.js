Component({
    properties: {
        scoreData: {
            type: Object,
            value: {}
        }
    },
    attached: function() {},
    ready: function() {
        var e = this, t = this.data.scoreData, a = t.score, n = t.pronunciation, i = t.fluency, s = t.tone_score, l = t.integrity, r = wx.createCanvasContext(this.data.canvasId, this), c = [ {
            name: "总分",
            value: a
        }, {
            name: "声韵母",
            value: n
        }, {
            name: "流畅度",
            value: i
        }, {
            name: "声调分",
            value: s
        }, {
            name: "完整度",
            value: l
        } ].filter(function(e) {
            return "流畅度" !== e.name && "完整度" !== e.name || e.value > 0;
        }), o = (626 - 98 * c.length) / (c.length - 1);
        c.map(function(t, a) {
            e._drawArc(r, (98 + o) * a + 49, 49, 49, t.name, t.value);
        }), r.draw(!1, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                canvasId: e.data.canvasId,
                success: function(t) {
                    e.setData({
                        imageSrc: t.tempFilePath
                    });
                }
            }, e);
        });
    },
    data: {
        canvasId: Math.floor(1e5 * Math.random()),
        width: 630,
        height: 142
    },
    methods: {
        _drawArc: function(e, t, a, n, i, s) {
            var l = 750 / wx.getSystemInfoSync().screenWidth, r = t / l, c = a / l, o = "总分" === i, d = o ? "#ffd43b" : "#22dd82", h = o ? "black" : "#8b97a4", u = o ? 34 : 24, f = 6 / l, m = (n - f) / l;
            e.setLineWidth(f), e.beginPath();
            var v = 2 * Math.PI * s / 100 - .5 * Math.PI;
            e.arc(r, c, m, -.5 * Math.PI, v), e.setStrokeStyle(d), e.stroke(), e.beginPath(), 
            e.arc(r, c, m, v, 1.5 * Math.PI), e.setStrokeStyle("#edf0f3"), e.stroke(), e.setFontSize(u / l), 
            e.setFillStyle(d), e.setTextAlign("center"), e.setTextBaseline("middle"), e.fillText([ Math.floor(s) ].join(""), r, c), 
            e.setFontSize(24 / l), e.setFillStyle(h), e.setTextAlign("center"), e.setTextBaseline("middle"), 
            e.fillText(i, r, c + m + 28 / l);
        }
    }
});