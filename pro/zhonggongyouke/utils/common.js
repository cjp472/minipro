var e = getApp(), t = require("./md5.js");

module.exports.globalRequest = function(a, o, r, s, l) {
    a.appid = e.globalData.appid, a.format = e.globalData.format, a.timestamp = Date.parse(new Date()) / 1e3;
    var i = t.create_sign(a, e.globalData.secret);
    a.sign = i, wx.request({
        url: e.globalData.API_URL + o,
        data: a,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: r,
        fail: s,
        complete: l
    });
}, module.exports.tip = function(e) {
    return wx.showToast({
        title: e,
        icon: "none",
        duration: 2e3
    }), !1;
};