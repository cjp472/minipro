getApp();

var t = require("../../utils/common.js");

require("../../utils/login.js");

Page({
    data: {},
    onLoad: function(t) {
        this.studyRecordList();
    },
    studyRecordList: function() {
        var e = this, a = 0, r = {
            student_id: a = "" == wx.getStorageSync("student_id") ? 0 : wx.getStorageSync("student_id")
        };
        t.globalRequest(r, "index/student/studyrecordlist", function(a) {
            if (200 == a.statusCode) if (0 == a.data.retcode) {
                var r = a.data.data;
                e.setData({
                    record: r,
                    recordLength: r.length
                });
            } else t.tip(a.data.message); else t.tip(a.message);
        });
    },
    seedetail: function(e) {
        var a = e.currentTarget.dataset.is_live, r = e.currentTarget.dataset.is_finish, s = e.currentTarget.dataset.video_url, d = e.currentTarget.dataset.playback_url, i = e.currentTarget.dataset.course_id, u = e.currentTarget.dataset.chapter_id, n = e.currentTarget.dataset.ownerid, o = e.currentTarget.dataset.authcode, c = e.currentTarget.dataset.uname;
        if (1 == a) {
            l = d;
            if ("" == d) {
                if (r) return t.tip("暂无播放地址，请耐心等待~"), !1;
                l = s, wx.setStorageSync("url", l);
                g = "../test/test";
                wx.navigateTo({
                    url: g
                });
            } else {
                var g = "../vodTest/vodTest?ownerid=" + n + "&authcode=" + o + "&uname=" + c;
                wx.navigateTo({
                    url: g
                });
            }
        } else {
            if ("" == i || "" == u) return !1;
            var l = "../video/video?course_id=" + i + "&chapter_id=" + u;
            wx.navigateTo({
                url: l
            });
        }
    }
});