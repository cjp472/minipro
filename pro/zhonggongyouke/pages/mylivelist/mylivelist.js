function e(e, t, s) {
    return t in e ? Object.defineProperty(e, t, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = s, e;
}

getApp();

var t = require("../../utils/common.js"), s = require("../../utils/login.js");

Page({
    data: {
        goods_id: "",
        selected1: !0,
        selected2: !1,
        type: 1
    },
    onLoad: function(e) {
        this.checkStudentId(), this.setData({
            goods_id: e.goods_id
        }), 2 == e.type && this.setData({
            selected1: !1,
            selected2: !0,
            type: 2
        }), this.liveCourseMenu();
    },
    onShow: function() {
        this.liveCourseMenu();
    },
    checkStudentId: function() {
        s.hasStudentID() || wx.navigateTo({
            url: "../login/login"
        });
    },
    selected1: function(e) {
        this.setData({
            selected1: !0,
            selected2: !1,
            coursemenu: {
                show_type: 2,
                name: this.data.coursemenu.name,
                time_section: this.data.coursemenu.time_section,
                chapter_num: this.data.coursemenu.chapter_num,
                teachers: this.data.coursemenu.teachers,
                wait_list: this.data.coursemenu.wait_list,
                finish_list: this.data.coursemenu.finish_list,
                menu_list: this.data.coursemenu.wait_list,
                course_id: this.data.coursemenu.course_id
            }
        });
    },
    selected2: function(e) {
        this.setData({
            selected1: !1,
            selected2: !0,
            coursemenu: {
                show_type: 2,
                name: this.data.coursemenu.name,
                time_section: this.data.coursemenu.time_section,
                chapter_num: this.data.coursemenu.chapter_num,
                teachers: this.data.coursemenu.teachers,
                wait_list: this.data.coursemenu.wait_list,
                finish_list: this.data.coursemenu.finish_list,
                menu_list: this.data.coursemenu.finish_list,
                course_id: this.data.coursemenu.course_id
            }
        });
    },
    liveCourseMenu: function() {
        var s = this, a = wx.getStorageSync("student_id"), i = {
            goods_id: s.data.goods_id,
            student_id: a
        };
        t.globalRequest(i, "index/student/livecoursemenu", function(a) {
            if (200 == a.statusCode) if (0 == a.data.retcode) {
                var i, n = a.data.data;
                if (1 == s.data.selected1) u = n.wait_list; else var u = n.finish_list;
                s.setData({
                    coursemenu: (i = {
                        show_type: 2,
                        chapter_num: n.chapter_num,
                        name: n.name,
                        time_section: n.time_section
                    }, e(i, "chapter_num", n.chapter_num), e(i, "teachers", n.teachers), e(i, "wait_list", n.wait_list), 
                    e(i, "finish_list", n.finish_list), e(i, "menu_list", u), e(i, "course_id", n.course_id), 
                    i)
                });
            } else t.tip(a.data.message); else t.tip(a.errMsg);
        });
    },
    prewdetail: function(s) {
        var a = this, a = this, i = "index/student/logstudy", n = {
            student_id: u = wx.getStorageSync("student_id"),
            course_id: s.currentTarget.dataset.course_id,
            chapter_id: s.currentTarget.dataset.chapter_id,
            length: 0
        };
        t.globalRequest(n, i, function(e) {
            if (200 == e.statusCode) if (0 == e.data.retcode) e.data.data; else t.tip(e.data.message); else t.tip(e.errMsg);
        });
        var u = wx.getStorageSync("student_id"), i = "index/student/livecoursemenu", n = {
            goods_id: a.data.goods_id,
            student_id: u
        };
        t.globalRequest(n, i, function(i) {
            if (200 == i.statusCode) if (0 == i.data.retcode) {
                var n, u = i.data.data;
                if (1 == a.data.selected1) d = u.wait_list; else var d = u.finish_list;
                a.setData({
                    coursemenu: (n = {
                        show_type: 2,
                        chapter_num: u.chapter_num,
                        name: u.name,
                        time_section: u.time_section
                    }, e(n, "chapter_num", u.chapter_num), e(n, "teachers", u.teachers), e(n, "wait_list", u.wait_list), 
                    e(n, "finish_list", u.finish_list), e(n, "menu_list", d), e(n, "course_id", u.course_id), 
                    n)
                });
                var r = "../vodTest/vodTest?ownerid=" + s.currentTarget.dataset.ownerid + "&authcode=" + s.currentTarget.dataset.authcode + "&uname=" + s.currentTarget.dataset.uname;
                wx.navigateTo({
                    url: r
                });
            } else t.tip(i.data.message); else t.tip(i.errMsg);
        });
    },
    seedetail: function(e) {
        var s = {
            student_id: wx.getStorageSync("student_id"),
            course_id: e.currentTarget.dataset.course_id,
            chapter_id: e.currentTarget.dataset.chapter_id,
            length: 0
        };
        t.globalRequest(s, "index/student/logstudy", function(e) {
            if (200 == e.statusCode) if (0 == e.data.retcode) e.data.data; else t.tip(e.data.message); else t.tip(e.errMsg);
        });
        var a = e.currentTarget.dataset.url;
        if ("" == a) return !1;
        wx.setStorageSync("url", a);
        wx.navigateTo({
            url: "../test/test"
        });
    },
    showtip2: function() {
        t.tip("直播教室尚未开放，请再等等哦");
    },
    showtip: function() {
        t.tip("回放生成中，请再等等哦");
    }
});