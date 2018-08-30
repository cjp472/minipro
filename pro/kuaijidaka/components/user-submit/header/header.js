var e = require("../behavior.js"), t = getApp(), s = t.service, o = t.util;

Component({
    behaviors: [ e ],
    relations: {
        "../submit/submit": {
            type: "ancestor"
        }
    },
    properties: {
        page: {
            type: String,
            value: "home"
        }
    },
    data: {
        scoreLevel: 1,
        self: !1,
        isAdmin: !1,
        editable: !1,
        operationAvailable: !1,
        URLPunchcard: "",
        URLRecords: "",
        howLong: ""
    },
    attached: function() {
        this.customData = {}, this._setupData();
    },
    methods: {
        _setupData: function() {
            var e = getApp().globalData.loginUser, t = this.data, s = t.submitData, o = t.page, i = s.course_type, a = s.submit_count, n = s.course_id, r = s.user_id, u = s.eval_state, c = (s.eval_voice, 
            s.question_count, s.eval_limit), d = s.eval_used, l = s.category, _ = e.user_id === r, m = 1 !== e.user_type_login, p = !!u, h = (s.question_count, 
            [ "home", "detail", "center" ]), b = _ && h.indexOf(o) >= 0 && 1 === e.user_type_login && !s.is_submited_edit && 2 !== l && (p && d < c || !p), g = "courseId=" + n + "&courseCalendarId=" + s.course_calendar_id + "&submitId=" + s.submit_id + "&from=" + (3 === s.category ? "read" : "normal"), v = 3 === s.category ? "/pages/user_sub/compellent_read/compellent_read?" + g + "&study=again&editable=" + b : s.eval_state ? "/pages/user_sub/pronunciation_assessment/pronunciation_assessment?" + g : 1 === s.category ? "/pages/user_sub/question/question?" + g : "/pages/user_sub/punchcard/punchcard?" + g, f = 2 === i ? "已解锁" + a + "课" : 1 === i ? "已完成" + a + "次作业" : "已坚持" + a + "天";
            this.setData({
                self: _,
                isAdmin: m,
                isEval: p,
                editable: b,
                URLPunchcard: v,
                howLong: f,
                URLRecords: "/pages/" + (m ? "admin_sub" : "user_sub") + "/records_of_course/records_of_course?courseId=" + n + "&userId=" + r,
                scoreLevel: Math.ceil(s.avg_score),
                operationAvailable: 1 !== e.user_type_login
            });
        },
        showMoreOperation: function() {
            var e = this, t = this.data.submitData, i = void 0 !== this.customData.isSticked ? this.customData.isSticked : t.top > 0;
            wx.showActionSheet({
                itemList: [ i ? "取消精选" : "设为精选", "删除" ],
                success: function(a) {
                    0 === a.tapIndex ? t.show_range ? wx.showModal({
                        title: "提示",
                        content: "该打卡内容仅管理员可见，无法设置为精选",
                        showCancel: !1
                    }) : s.stickSubmit(t.submit_id, t.course_id, !i, function(t) {
                        e.customData.isSticked = !i, e.triggerEvent("sticksubmit", {
                            isSticked: !i
                        }, {
                            composed: !0
                        });
                    }, function(e) {
                        (e.errType = 107 === e.errMsg) ? o.showToast("没有权限", "none", 2e3) : o.showToast("设置失败", "none", 2e3);
                    }) : 1 === a.tapIndex && wx.showModal({
                        title: "确认",
                        content: "是否删除这条打卡",
                        showCancel: !0,
                        cancelText: "取消",
                        confirmText: "删除",
                        success: function(i) {
                            i.confirm && s.deleteSubmit(t.submit_id, function(s) {
                                o.showToast("删除成功", "success", 1e3), e.triggerEvent("deletesubmit", {
                                    submitID: t.submit_id
                                }, {
                                    bubbles: !0,
                                    composed: !0
                                });
                            }, function(e) {
                                (e.errType = 107 === e.errMsg) ? o.showToast("没有权限删除", "none", 2e3) : o.showToast("删除失败", "none", 2e3);
                            });
                        }
                    });
                }
            });
        }
    }
});