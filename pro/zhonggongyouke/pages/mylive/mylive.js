getApp();

var t = require("../../utils/common.js"), e = require("../../utils/login.js");

Page({
    data: {
        selected1: !0,
        selected2: !1
    },
    onShow: function() {
        this.checkStudentId(), this.liveWaitStudy(), this.liveFinishCourse();
    },
    checkStudentId: function() {
        e.hasStudentID() || wx.navigateTo({
            url: "../login/login"
        });
    },
    selected1: function(t) {
        this.setData({
            selected1: !0,
            selected2: !1
        });
    },
    selected2: function(t) {
        this.setData({
            selected1: !1,
            selected2: !0
        });
    },
    liveWaitStudy: function() {
        var e = this, i = {
            student_id: wx.getStorageSync("student_id")
        };
        t.globalRequest(i, "index/student/livewaitstudy", function(i) {
            if (200 == i.statusCode) if (0 == i.data.retcode) {
                var s = i.data.data;
                e.setData({
                    liveWaitStudy: s,
                    liveWaitStudyLength: s.length
                });
            } else t.tip(i.data.message); else t.tip(i.errMsg);
        });
    },
    liveFinishCourse: function() {
        var e = this, i = 0, s = {
            student_id: i = "" == wx.getStorageSync("student_id") ? 0 : wx.getStorageSync("student_id")
        };
        t.globalRequest(s, "index/student/livefinishcourse", function(i) {
            if (200 == i.statusCode) if (0 == i.data.retcode) {
                var s = i.data.data;
                e.setData({
                    liveFinishCourse: s,
                    liveFinishCourseLength: s.length
                });
            } else t.tip(i.data.message); else t.tip(i.errMsg);
        });
    },
    mylivelist: function(t) {
        var e = "../mylivelist/mylivelist?goods_id=" + t.currentTarget.dataset.goods_id + "&type=" + t.currentTarget.dataset.type;
        wx.navigateTo({
            url: e
        });
    }
});