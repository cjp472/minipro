getApp();

var t = require("../../utils/common.js"), e = require("../../utils/login.js");

Page({
    data: {},
    onLoad: function(t) {
        this.checkStudentId(), t.goods_id && this.setData({
            goods_id: t.goods_id
        });
    },
    onShow: function(t) {
        this.coursemenu();
    },
    checkStudentId: function() {
        e.hasStudentID() || wx.navigateTo({
            url: "../login/login"
        });
    },
    coursemenu: function() {
        var e = this, a = {
            goods_id: e.data.goods_id,
            student_id: wx.getStorageSync("student_id")
        };
        t.globalRequest(a, "index/student/publiccoursemenu", function(a) {
            if (200 == a.statusCode) if (0 == a.data.retcode) {
                var s = a.data.data;
                e.setData({
                    name: s.name,
                    chapter_num: s.chapter_num,
                    has_study: s.has_study,
                    not_study: s.not_study,
                    coursemenu: {
                        showtype: 2,
                        course_id: s.course_id,
                        chapter_num: s.chapter_num,
                        menu_list: s.menu_list,
                        menu_hide: !1
                    },
                    teachers: s.teachers
                });
            } else t.tip(a.data.message); else t.tip(a.errMsg);
        });
    },
    seedetail: function(e) {
        var a = {
            student_id: wx.getStorageSync("student_id"),
            course_id: s = e.currentTarget.dataset.course_id,
            chapter_id: d = e.currentTarget.dataset.chapter_id,
            length: 0
        };
        t.globalRequest(a, "index/student/logstudy", function(e) {
            if (200 == e.statusCode) if (0 == e.data.retcode) e.data.data; else t.tip(e.data.message); else t.tip(e.errMsg);
        });
        var s = e.currentTarget.dataset.course_id, d = e.currentTarget.dataset.chapter_id;
        if ("" == s || "" == d) return !1;
        var r = "../video/video?course_id=" + s + "&chapter_id=" + d;
        wx.navigateTo({
            url: r
        });
    },
    seedoc: function(t) {
        var e = t.currentTarget.dataset.url;
        if ("" == e) return !1;
        wx.setStorageSync("url", e);
        wx.navigateTo({
            url: "../test/test"
        });
    }
});