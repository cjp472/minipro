getApp();

var e = require("../../utils/common.js"), t = require("../../utils/login.js");

Page({
    data: {},
    onLoad: function(e) {
        var t = e.course_id, a = e.chapter_id;
        this.setData({
            course_id: t,
            chapter_id: a
        });
    },
    onReady: function() {},
    onShow: function() {
        this.checkStudentId(), this.publicVideo();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    checkStudentId: function() {
        t.hasStudentID() || wx.navigateTo({
            url: "../login/login"
        });
    },
    publicVideo: function() {
        var t = this, a = {
            student_id: wx.getStorageSync("student_id"),
            course_id: t.data.course_id,
            chapter_id: t.data.chapter_id
        };
        e.globalRequest(a, "index/public/videoplay", function(a) {
            if (200 == a.statusCode) if (0 == a.data.retcode) {
                var i = a.data.data;
                t.setData({
                    avatar_img: i.avatar_img,
                    brief: i.brief,
                    name: i.name,
                    teacher_name: i.teacher_name,
                    video_url: i.video_url
                });
            } else e.tip(a.data.message); else e.tip(a.errMsg);
        });
    }
});