Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.drawLine = function(e, t, r, a, n, s) {
    e.setLineWidth(n), t.forEach(function(t, n) {
        var s = parseInt(t.x * r), o = parseInt(t.y * a);
        "0" != n ? e.lineTo(s, o) : e.moveTo(s, o);
    }), e.setStrokeStyle("red"), e.stroke(), e.draw(!0);
}, exports.drawCircle = function(e, t, r, a, n) {
    var s = parseInt(t.x * r), o = parseInt(t.y * a), i = parseInt(t.widthRadius * r);
    e.setLineWidth(n), e.arc(s - i, o - i, i, 0, 2 * Math.PI), e.setStrokeStyle("red"), 
    e.stroke(), e.draw(!0);
}, exports.drawRect = function(e, t, r, a, n) {
    var s = parseInt(t.x * r), o = parseInt(t.y * a), i = parseInt(t.width * r), d = parseInt(t.height * a);
    e.setLineWidth(n), e.setStrokeStyle("red"), e.strokeRect(s, o, i, d), e.stroke(), 
    e.draw(!0);
};

var e = exports.clearPPTCanvas = function(e) {
    e.draw();
};

exports.clearPPTDraw = function(t, r, a, n, s) {
    console.log(n), t && e(t), r[a] && r[a][n] && r[a][n].forEach(function(e) {
        s.drawPPT(e);
    });
};