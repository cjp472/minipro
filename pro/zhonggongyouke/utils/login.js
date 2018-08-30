function o() {
    wx.removeStorageSync("sessioncode"), wx.removeStorageSync("student_id");
}

function e() {
    wx.login({
        success: function(o) {
            if (console.log("123!"), o.code) {
                console.log(o.code);
                var e = {
                    code: o.code
                };
                i.globalRequest(e, "index/login/createlocalsession", function(o) {
                    console.log(o.data.data.session_code), wx.setStorageSync("sessioncode", o.data.data.session_code);
                });
            }
        }
    });
}

function n() {
    return void 0 != wx.getStorageSync("student_id") && "" != wx.getStorageSync("student_id");
}

function t(o, e, t) {
    void 0 !== e && (n() ? o[e](t) : s());
}

function s(o, e, n) {
    wx.navigateTo({
        url: "/pages/login/login",
        success: function() {},
        fail: function() {},
        complete: function() {}
    });
}

var c = getApp(), i = require("./common.js");

module.exports.wxLogin = e, module.exports.clearLogin = o, module.exports.checkLogin = function(s, i, d) {
    "" == wx.getStorageSync("sessioncode") ? (o(), e(), t(s, i, d)) : wx.checkSession({
        success: function() {
            n() ? (c.globalData.student_id = wx.getStorageSync("student_id"), t(s, i, d)) : t(s, i, d);
        },
        fail: function() {
            o(), e(), t(s, i, d);
        }
    });
}, module.exports.hasStudentID = n, module.exports.needGoLogin = t, module.exports.goLogin = s;