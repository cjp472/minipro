function t(t, a) {
    var s = this.data.noticeBoard;
    s.showUpgradeDialog = 0, this.setData({
        noticeBoard: s,
        textareaHide: !1
    });
}

function a(t) {
    var a = t.currentTarget.dataset.index, s = this.data.adsList[a], i = this.data.adFrom;
    e.toAdDetail(s, i);
}

function s(t) {
    var a = t.detail.current, s = this.data.adsList[a], i = this.data.adFrom;
    e.adShow(s, i);
}

var e = require("../utils/util.js");

module.exports = {
    noticeBoard: function(a, s) {
        a.successCb = s, a.closeUpgradeDialog = t;
    },
    ads: function(t, i, o, d) {
        t.successCb = d, t.setData({
            adFrom: o
        }), t.toAdDetail = a, t.swiperChange = s, e.getAds(t, i, o, function() {
            console.log(t.data.adsList), "function" == typeof d && d();
        });
    }
};