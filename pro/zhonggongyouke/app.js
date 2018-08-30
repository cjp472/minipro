require("./utils/ald-stat.js");

var t = require("/utils/md5.js");

App({
    onLaunch: function() {
        this.loginRecord();
    },
    onShow: function() {},
    onHide: function() {},
    onError: function() {},
    onPageNotFound: function() {},
    globalData: {
        student_id: "",
        appid: "youke",
        secret: "123qwe",
        format: "form",
        API_URL: "https://youke.eoffcn.com/",
        after_login_url: "",
        liveBuyNum: 0,
        publicBuyNum: 0,
        channel: null,
        currentTime: 0
    },
    globalRequest: function(e, o, n, a, i) {
        e.appid = this.globalData.appid, e.format = this.globalData.format, e.timestamp = Date.parse(new Date()) / 1e3;
        var u = t.create_sign(e, this.globalData.secret);
        e.sign = u, wx.request({
            url: this.globalData.API_URL + o,
            data: e,
            method: "GET",
            header: {
                Accept: "application/json"
            },
            success: n,
            fail: a,
            complete: i
        });
    },
    loginRecord: function() {
        if (void 0 == wx.getStorageSync("student_id") || "" == wx.getStorageSync("student_id")) return !1;
        var t = {
            student_id: wx.getStorageSync("student_id"),
            device: wx.getSystemInfoSync().model
        };
        this.globalRequest(t, "index/login/loginrecord", function(t) {
            200 == t.statusCode && t.data.retcode;
        });
    }
});