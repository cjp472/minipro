function t(t, a) {
    this.key = a, this.page = t, this.animate = wx.createAnimation({
        duration: 400,
        timingFunction: "ease"
    });
}

function a(t, a) {
    this.page = t, this.key = a, this.animate = wx.createAnimation({
        timingFunction: "ease"
    });
}

t.prototype.show = function() {
    var t = this;
    t.animate.translateY(0).opacity(1).step();
    var a = {};
    a[t.key] = t.animate.export(), t.page.setData(a);
}, t.prototype.hide = function() {
    var t = this;
    t.animate.opacity(0).translateY(14).step();
    var a = {};
    a[t.key] = t.animate.export(), t.page.setData(a);
}, a.prototype.show = function() {
    var t = this, a = {};
    t.animate.opacity(0).translateX(-320).step({
        duration: 40
    }), t.animate.opacity(1).translateX(0).step({
        duration: 800
    }), a[t.key] = t.animate.export(), t.page.setData(a);
}, module.exports = {
    TipAnimate: t,
    PageAnimate: a
};