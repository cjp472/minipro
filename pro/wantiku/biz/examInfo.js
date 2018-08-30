var n = require("../utils/http.js"), e = (getApp(), {
    getExamRegister: function(e, t, a) {
        var i = {}, o = {
            provname: e
        };
        n.Get("/api/exam8/GetExamRegister", o, function(n) {
            t && t(n);
        }, function(n) {
            a && a(n);
        }, i);
    },
    getExamArrangement: function(e, t, a) {
        var i = {}, o = {
            provname: e
        };
        n.Get("/api/exam8/GetExamArrangement", o, function(n) {
            t && t(n);
        }, function(n) {
            a && a(n);
        }, i);
    },
    getExamScore: function(e, t, a) {
        var i = {}, o = {
            provname: e
        };
        n.Get("/api/exam8/GetExamScore", o, function(n) {
            t && t(n);
        }, function(n) {
            a && a(n);
        }, i);
    },
    getExamPermit: function(e, t, a) {
        var i = {}, o = {
            provname: e
        };
        n.Get("/api/exam8/GetExamPermit", o, function(n) {
            t && t(n);
        }, function(n) {
            a && a(n);
        }, i);
    },
    getExamProv: function(e) {
        var t = {}, a = {};
        n.Get("/api/exam8/getexamprov", a, function(n) {
            e && e(n);
        }, null, t);
    },
    hasExamInfo: function(e) {
        var t = {}, a = {};
        n.Get("/api/exam8/HasExamInfo", a, function(n) {
            e && e(n);
        }, null, t);
    },
    isNationwide: function(e) {
        var t = {}, a = {
            provname: "0"
        };
        n.Get("/api/exam8/IsNationwide", a, function(n) {
            e && e(n);
        }, null, t);
    }
});

module.exports = e;