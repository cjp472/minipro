var t = require("../utils/http.js"), e = (getApp(), {
    getExamFight: function(e, i) {
        var n = {};
        t.Get("/api/mockexam/GetExamFight", e, function(t) {
            i && i(t);
        }, null, n);
    },
    myExamFights: function(e) {
        var i = {}, n = {};
        t.Get("/api/mockexam/MyExamFights", n, function(t) {
            e && e(t);
        }, null, i);
    },
    entryexamfight: function(e, i) {
        var n = {};
        t.Get("/api/mockexam/entryexamfight", e, function(t) {
            i && i(t);
        }, null, n);
    }
});

module.exports = e;