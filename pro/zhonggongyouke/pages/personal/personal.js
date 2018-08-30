var e = getApp(), n = require("../../utils/common.js"), t = require("../../utils/login.js");

Page({
    data: {
        signin_num: 0,
        contact: !1,
        canIUse: wx.canIUse("open-data")
    },
    onShow: function() {
        var e = wx.getSystemInfoSync();
        -1 == this.compareVersion(e.SDKVersion, "1.9.90") && this.setData({
            getInfo: !0
        }), this.userInfo();
    },
    compareVersion: function(e, n) {
        e = e.split("."), n = n.split(".");
        for (var t = Math.max(e.length, n.length); e.length < t; ) e.push("0");
        for (;n.length < t; ) n.push("0");
        for (var a = 0; a < t; a++) {
            var i = parseInt(e[a]), s = parseInt(n[a]);
            if (i > s) return 1;
            if (i < s) return -1;
        }
        return 0;
    },
    userInfo: function() {
        var e = this, a = 0;
        t.hasStudentID() && (a = wx.getStorageSync("student_id"));
        var i = {
            student_id: a
        };
        n.globalRequest(i, "index/student/mycenter", function(t) {
            if (200 == t.statusCode) if (0 == t.data.retcode) {
                var a = t.data.data;
                e.setData({
                    signin_num: a.signin_num,
                    is_signin_today: a.is_signin_today,
                    live_course_num: a.live_course_num,
                    public_course_num: a.public_course_num,
                    next_live_time: a.next_live_time,
                    study_num: a.study_num
                });
            } else n.tip(t.data.message); else n.tip(t.errMsg);
        });
    },
    sign: function() {
        var a = this;
        if (t.hasStudentID()) {
            var i = {
                student_id: wx.getStorageSync("student_id")
            };
            n.globalRequest(i, "index/student/signin", function(e) {
                if (200 == e.statusCode) if (0 == e.data.retcode) {
                    var t = e.data.data;
                    a.setData({
                        signin_num: t.signin_num,
                        is_signin_today: !0
                    });
                } else n.tip(e.data.message); else n.tip(e.errMsg);
            });
        } else e.globalData.after_login_url = "/pages/personal/personal", wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    showContact: function() {
        this.setData({
            contact: !0
        });
    },
    hideContact: function() {
        this.setData({
            contact: !1
        });
    },
    calling: function() {
        wx.makePhoneCall({
            phoneNumber: "4009008885",
            success: function() {},
            fail: function() {}
        });
    },
    myRecord: function() {
        if (t.hasStudentID()) {
            wx.navigateTo({
                url: "/pages/records/records"
            });
        } else e.globalData.after_login_url = "/pages/personal/personal", wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    myPublic: function() {
        if (t.hasStudentID()) {
            wx.navigateTo({
                url: "/pages/mypublic/mypublic"
            });
        } else e.globalData.after_login_url = "/pages/personal/personal", wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    myLive: function() {
        if (t.hasStudentID()) {
            wx.navigateTo({
                url: "/pages/mylive/mylive"
            });
        } else e.globalData.after_login_url = "/pages/personal/personal", wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    scroll: function() {},
    onGotUserInfo: function(e) {
        this.setData({
            userInfo: e.detail.userInfo
        });
    }
});