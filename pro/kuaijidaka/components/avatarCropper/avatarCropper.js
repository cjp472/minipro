var a = getApp().util, t = {
    getAdjustSize: function(a, t, e, o) {
        return e > a && (o *= a / e, e = a), o > t && (e *= t / o, o = t), {
            width: e,
            height: o
        };
    },
    doDrawImage: function(a, t, e, o) {
        var i = wx.createCanvasContext(a), r = e, h = o, n = e / 2, d = o / 2;
        Math.abs(e - o);
        i.translate(n, d), i.translate(-n, -d), i.drawImage(t, 0, 0, r, h), i.draw(!1, function(a) {
            console.log("draw callback");
        });
    }
};

module.exports = {
    init: function(e, o) {
        var i = this, r = this;
        r.setData({
            cropperData: {
                hidden: !0,
                left: 0,
                top: 0,
                width: e,
                height: o,
                W: e,
                H: o,
                itemLength: 50,
                imageInfo: {
                    path: "",
                    width: 0,
                    height: 0
                },
                scaleInfo: {
                    x: 1,
                    y: 1
                },
                cropCallback: null,
                sizeType: [ "original", "compressed" ],
                original: !1,
                mode: "rectangle"
            },
            cropperMoveInfo: {
                top: 0,
                left: 0,
                width: 300,
                scaleRadio: 1
            },
            cropperChangableData: {
                canCrop: !0,
                rotateDegree: 0,
                originalSize: {
                    width: 0,
                    height: 0
                },
                scaleSize: {
                    width: 0,
                    height: 0
                },
                shape: {},
                previewImageInfo: {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0
                }
            }
        }), r.showCropper = function(a) {
            var t = i, e = t.data.cropperData, o = a.src, h = a.callback, n = a.sizeType, d = a.mode, p = [];
            n.indexOf("original") > -1 && p.push("original"), n.indexOf("compressed") > -1 && p.push("compressed"), 
            1 == p.length && p.indexOf("original") > -1 && (e.original = !0), d && (e.mode = d), 
            e.hidden = !1, e.cropCallback = h, e.sizeType = p, o && wx.getImageInfo({
                src: o,
                success: function(a) {
                    var i = a.width, h = a.height;
                    e.imageInfo = {
                        path: o,
                        width: i,
                        height: h
                    }, t.setData({
                        cropperData: e
                    }), r.loadImage(o, i, h, !1);
                }
            });
        }, r.hideCropper = function() {
            var a = i;
            a.data.cropperData.hidden = !0, a.data.cropperData.cropCallback = null, a.setData({
                cropperData: a.data.cropperData,
                cropperMoveInfo: {
                    top: -1,
                    left: -1,
                    width: 0
                }
            }), a.clearCanvas(a.data.cropperData.imageInfo);
        }, r.cropImage = function() {
            var t = i, e = t.data.cropperData, o = (e.mode, e.scaleInfo), r = t.data.cropperMoveInfo;
            wx.createCanvasContext("originalCanvas"), wx.showLoading({
                title: "正在截取..."
            });
            var h = r.left * o.x, n = r.top * o.y, d = r.width * o.x;
            r.width, o.y, wx.canvasToTempFilePath({
                x: h,
                y: n,
                width: d,
                height: d,
                destWidth: 187.5,
                destHeight: 187.5,
                canvasId: "originalCanvas",
                success: function(a) {
                    var e = a.tempFilePath;
                    console.log(a), wx.hideLoading(), t.data.cropperData.cropCallback && t.data.cropperData.cropCallback(e), 
                    t.hideCropper();
                },
                fail: function(e) {
                    a.showError("截图失败:" + e.errMsg, t), t.hideCropper(), console.log("fail res:"), console.log(e);
                }
            });
        }, r.loadImage = function(a, r, h, n) {
            var d = i, p = t.getAdjustSize(e, o, r, h), c = (e - p.width) / 2, g = (o - p.height) / 2, l = {}, s = d.data.cropperData;
            n || (s.imageInfo = {
                path: a,
                width: r,
                height: h
            }), s.left = c, s.top = g, s.width = p.width, s.height = p.height, s.scaleInfo = {
                x: r / p.width,
                y: h / p.height
            }, l.cropperData = s, l.cropperMoveInfo = {
                left: 0,
                top: 0,
                width: 300
            };
            var w = d.data.cropperChangableData, f = w.rotateDegree % 180 > 0, v = f ? p.height : p.width, m = f ? p.width : p.height;
            console.log("rotateWidth:" + v + ", rotateHeight:" + m), w.previewImageInfo.x = (e - v) / 2, 
            w.previewImageInfo.y = (o - m) / 2, w.previewImageInfo.w = v, w.previewImageInfo.h = m, 
            w.originalSize = {
                width: r,
                height: h
            }, w.scaleSize = {
                width: p.width,
                height: p.height
            }, l.cropperChangableData = w, d.setData(l), d.drawImage({
                path: d.data.cropperData.imageInfo.path,
                width: r,
                height: h
            }), d.drawCropBox(d.data.cropperMoveInfo, d.data.cropperData.imageInfo);
        }, r.clearCanvas = function(a) {
            r.data.cropperData;
            var i = t.getAdjustSize(e, o, a.width, a.height);
            if ("" != a.path) {
                var h = wx.createCanvasContext("originalCanvas");
                h.clearRect(0, 0, a.width, a.height), h.draw();
                var n = wx.createCanvasContext("canvas");
                n.clearRect(0, 0, i.width, i.height), n.draw();
                var d = wx.createCanvasContext("moveCanvas");
                d.clearRect(0, 0, i.width, i.height), d.draw();
            }
        }, r.drawImage = function(a) {
            if (i.data.cropperData, t.getAdjustSize(e, o, a.width, a.height), "" != a.path) {
                var r = a.path;
                t.doDrawImage("originalCanvas", r, a.width, a.height), console.log("draw=" + r);
            }
        }, r.drawCropBox = function(a, r, h) {
            function n(a, t, e) {
                var o = e - l, i = Math.sqrt(e * e - o * o), r = a - o, h = t - i, d = 2 * o, p = 2 * i;
                l <= e && (g.clearRect(r, h, d, p), l += 1, n(a, t, e));
            }
            var d = i, p = (d.data.cropperData.mode, t.getAdjustSize(e, o, r.width, r.height)), c = a;
            c.width = p.width > p.height ? Math.min(c.width, p.height) : Math.min(c.width, p.width);
            var g = wx.createCanvasContext("moveCanvas");
            d.setData({
                cropperMoveInfo: c
            }), g.setFillStyle("rgba(0,0,0,0.5)"), g.fillRect(0, 0, p.width, p.height), g.setStrokeStyle("#22dd82"), 
            g.beginPath(), g.arc(c.left + c.width / 2, c.top + c.width / 2, c.width / 2, 0, 2 * Math.PI), 
            g.stroke(), g.setFillStyle("rgba(0,0,0,0)");
            var l = 1;
            n(c.left + c.width / 2, c.top + c.width / 2, c.width / 2), g.draw(), h && h(!0);
        }, r.moveCropperBox = function(a, r, h) {
            var n = i, d = n.data.cropperData, p = n.data.cropperMoveInfo, c = d.left, g = d.top, l = (d.mode, 
            t.getAdjustSize(e, o, r.width, r.height)), s = a[0], w = s.clientX, f = s.clientY;
            w = w - c - p.width / 2, f = f - g - p.width / 2, w = w < 0 ? 0 : w + p.width > l.width ? l.width - p.width : w, 
            f = f < 0 ? 0 : f + p.width > l.height ? l.height - p.width : f, p.left = w, p.top = f, 
            n.setData({
                cropperMoveInfo: p
            }), n.drawCropBox(p, r, function(a) {
                h && h(p, a);
            });
        }, r.moveEvent = function(a) {
            var t = i, e = Object.assign({}, i.data.cropperData.imageInfo);
            t.moveCropperBox(a.changedTouches, e);
        }, r.endEvent = function(a) {
            console.log("end");
            var t = i, e = (t.data.cropperData, t.data.cropperMoveInfo, Object.assign({}, i.data.cropperData.imageInfo));
            t.moveCropperBox(a.changedTouches, e, function(a, e) {
                t.setData({
                    cropperMoveInfo: a
                });
            });
        };
    }
};