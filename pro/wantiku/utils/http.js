function e() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "GET";
    return function(o, n) {
        var l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, u = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
        o.indexOf("?") > 0 ? o += "&t=" + Date.parse(new Date()) : o += "?t=" + Date.parse(new Date());
        var i = null, c = getApp();
        c && c.globalData && c.globalData.header && (i = c.globalData.header), null == i && (i = t.DefaultHeader);
        var d = {
            "content-type": "application/x-www-form-urlencoded"
        };
        i && (d = r.objectAssign(d, i)), u && (d = r.objectAssign(d, u)), wx.request({
            method: e,
            url: t.BASE_URL + o,
            data: n,
            header: d,
            success: function(e) {
                a.info(e);
                var o = e.statusCode, t = (e.errMsg, e.data);
                200 == o || "200" == o ? t.MsgCode && 1 == t.MsgCode ? "function" == typeof l && l(e.data) : t.MsgCode && -6 == t.MsgCode ? c.reAuth(function() {
                    wx.showToast({
                        title: "网络请求失败,请重试",
                        icon: "success",
                        duration: 2e3
                    });
                }) : "function" == typeof s ? s(e.data) : a.error(t) : (a.error(e), "function" == typeof s && s("网络请求错误, 请稍后再试"));
            },
            fail: function(e) {
                console.log("error : " + o), a.error(e), "function" == typeof s && s("网路请求不符合规范");
            },
            complate: function(e) {
                a.info(e);
            }
        });
    };
}

function o() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "GET";
    return function(o) {
        var l = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, u = null, i = getApp();
        i && i.globalData && i.globalData.header && (u = i.globalData.header), null == u && (u = t.DefaultHeader);
        var c = r.objectAssign({
            "content-type": "json"
        }, s);
        return u && (c = r.objectAssign(c, u)), new n(function(n, r) {
            wx.uploadFile({
                url: t.BASE_URL + o,
                data: l,
                method: e,
                header: c,
                success: function(e) {
                    var o = e.statusCode, t = (e.errMsg, e.data);
                    200 == o || "200" == o ? t.MsgCode ? -6 == t.MsgCode ? i.reAuth(function() {
                        wx.showToast({
                            title: "网络请求失败,请重试",
                            icon: "success",
                            duration: 2e3
                        });
                    }) : t.MsgCode && 1 == t.MsgCode ? n(t) : (a.error(t), r(t.Msg)) : (a.error(t), 
                    r(t.Msg)) : (a.error(e), r("网络请求错误, 请稍后再试"));
                },
                fail: function(e) {
                    a.error(e), r("网路请求不符合规范");
                },
                complete: function() {}
            });
        });
    };
}

var t = require("../config.js"), n = require("promise.js"), a = require("log.js"), r = require("util.js");

module.exports = {
    GET: o("GET"),
    POST: o("POST"),
    Get: e("GET"),
    Post: e("POST"),
    uploadPicture: function(e, o) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
        e.indexOf("?") > 0 ? e += "&t=" + Date.parse(new Date()) : e += "?t=" + Date.parse(new Date());
        var u = null, i = getApp();
        i && i.globalData && i.globalData.header && (u = i.globalData.header), null == u && (u = t.DefaultHeader);
        var c = {
            "content-type": "multipart/form-data"
        };
        u && (c = r.objectAssign(c, u)), s && (c = r.objectAssign(c, s)), console.log(t.BASE_URL + e), 
        wx.uploadFile({
            url: t.BASE_URL + e,
            header: c,
            filePath: o,
            name: "file",
            success: function(e) {
                console.log(e);
                var o = e.statusCode, t = (e.errMsg, e.data), r = JSON.parse(t);
                200 == o || "200" == o ? (console.log(r), console.log(r.MsgCode), r.MsgCode && 1 == r.MsgCode ? "function" == typeof n && n(r) : r.MsgCode && -6 == r.MsgCode ? i.reAuth(function() {
                    wx.showToast({
                        title: "网络请求失败,请重试",
                        icon: "success",
                        duration: 2e3
                    });
                }) : "function" == typeof l ? l(r) : a.error(r)) : (a.error(e), "function" == typeof l && l("网络请求错误, 请稍后再试"));
            },
            fail: function(e) {
                a.error(e), "function" == typeof l && l("网路请求不符合规范");
            },
            complate: function(e) {
                a.info(e);
            }
        });
    }
};