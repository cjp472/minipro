var e = require("../utils/http.js"), n = getApp(), t = function(e, n, t) {
    return n in e ? Object.defineProperty(e, n, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[n] = t, e;
}({
    paperOrderConfirm: function(t, i) {
        var t = t, r = {
            UserClientType: n.globalData.SystemInfo.iOS ? 1 : 2
        }, o = {};
        e.Post(t, o, function(e) {
            i && i(e);
        }, null, r);
    },
    getPayWeixinData: function(n, t, i, r) {
        var o = {
            openid: n,
            orderno: t,
            notifyasync: i
        };
        e.Get("/api/vip/WXOderSign", o, function(e) {
            r && r(e);
        });
    },
    strengtheningTest: function(n) {
        var t = {};
        e.Get("/api/question/IntelTree", t, function(e) {
            n && n(e);
        });
    },
    highFrequencyTest: function(n) {
        var t = {};
        e.Get("/api/question/ExamFreqReal", t, function(e) {
            n && n(e);
        });
    },
    highFrequencyWrong: function(n) {
        var t = {};
        e.Get("/api/question/FreqErrorList", t, function(e) {
            n && n(e);
        });
    },
    ExercisePapersData: function(n, t) {
        var n = n, i = {
            orderSubjectId: 0
        };
        e.Get(n, i, function(e) {
            t && t(e);
        });
    }
}, "highFrequencyWrong", function(n) {
    var t = {};
    e.Get("/api/question/FreqErrorList", t, function(e) {
        n && n(e);
    });
});

module.exports = t;