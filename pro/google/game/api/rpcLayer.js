function e(n, r, u, c, l, a, f, p, y) {
    var m = void 0, v = d.get(n) || 0, g = Date.now(), w = function(e) {
        var t = Date.now() - g;
        console.log("[" + e.statusCode + "] Invoked " + n + ", latency=" + t + "ms, url=" + r), 
        a(e);
    }, b = function(t) {
        var o = Date.now() - g;
        console.log("Invoke " + n + " failed, latency=" + o + "ms, url=" + r, t), p -= 1, 
        (y -= o) < 0 ? f("Request timed out!") : p < 0 ? f("Request exceeds max retry count!") : (console.log("Retrying request. Remaining retry count: ", p), 
        e(n, r, u, c, l, a, f, p, y));
    }, h = o(), x = "object" == (void 0 === u ? "undefined" : i(u)) ? JSON.stringify(u) : u, q = s.OtpUtils.hashEncrypt("", x), j = wx.request({
        url: r,
        data: x,
        method: c,
        header: l || {
            "content-type": "application/json",
            userid: h,
            token: s.OtpUtils.hashEncrypt(h, s.OtpUtils.getCurrentMinuteInSeconds()),
            encrypt: q
        },
        success: function(e) {
            t(e.statusCode) ? w(e) : b(e);
        },
        fail: b,
        complete: function(e) {
            clearTimeout(m), v++, d.set(n, v);
        }
    });
    return m = setTimeout(function() {
        j.error && j.abort(), f("Request timed out!");
    }, y), j;
}

function t(e) {
    return e.toString().startsWith("2");
}

function o() {
    if (void 0 === getApp().leancloudUserId) {
        for (var e = "", t = 0; t < 24; t++) e += a[c.random(a.length - 1)];
        return e;
    }
    return getApp().leancloudUserId;
}

function n(e) {
    return "?" + r(e);
}

function r(e) {
    return Object.keys(e).map(function(t) {
        return [ t, e[t] ].map(encodeURIComponent).join("=");
    }).join("&");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.invokeHttpRequest = function(t, o, i, s, c, a, d) {
    var f = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : {}, p = f.retrying, y = void 0 !== p && p, m = f.timeoutPeriod, v = void 0 === m ? u.config.rpc_default_timeout_period : m, g = f.maxRetryCount, w = void 0 === g ? u.config.rpc_max_retry_count : g;
    return s === l && (o.includes("?") ? o += r(i) : o += n(i), i = ""), e(t, o, i, s, c, a, d, y ? w : 0, v);
}, exports.wxDownloadFile = function(e, n, r, i) {
    var u = d.get(e);
    u || (u = 0);
    var c = Date.now(), l = function(e) {
        var t = Date.now() - c;
        console.log("Download failed, latency=" + t + "ms, url=" + n, e), i(e);
    }, a = o();
    wx.downloadFile({
        url: n,
        header: {
            userid: a,
            token: s.OtpUtils.hashEncrypt(a, s.OtpUtils.getCurrentMinuteInSeconds())
        },
        success: function(o) {
            if (t(o.statusCode)) {
                var i = Date.now() - c;
                console.log("[" + o.statusCode + "] Download " + e + ", latency=" + i + "ms, url=" + n), 
                r(o);
            } else l();
        },
        fail: l,
        complete: function(t) {
            u++, d.set(e, u);
        }
    });
};

var u = require("../config.js"), s = require("../otpUtils.js"), c = require("../../libs/underscore/underscore.modified"), l = "GET", a = "abcdefghijklmnopqrstuvwxyz0123456789", d = new Map();