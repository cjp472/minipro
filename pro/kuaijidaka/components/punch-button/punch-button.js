var e = getApp(), t = e.service, a = e.util;

Component({
    properties: {
        courseDetail: {
            type: Object,
            value: null
        },
        topic: {
            type: Object,
            value: null,
            observer: function(e, t) {
                this.init();
            }
        },
        hideButton: {
            type: Boolean,
            value: !1
        },
        themeReadTime: {
            type: Number,
            value: 0,
            observer: function(e, t) {
                this.data.TIME = parseInt(this.data.themeReadTime) || 0;
            }
        },
        startReading: {
            type: Boolean,
            value: !1,
            observer: function(e, t) {
                e && this.goTimer();
            }
        }
    },
    data: {
        TIME: "--",
        timer: null,
        onelyPhone: !1,
        isRemedying: !1,
        goPunchText: "",
        show_user_mobile: !1,
        custom_form_list: [],
        form_value: {
            course_id: "",
            form_value_list: []
        }
    },
    created: function() {
        this.customData = {
            URLPunchcard: "",
            mobilePhone: ""
        };
    },
    attached: function() {
        this.init();
    },
    methods: {
        init: function() {
            var r = this;
            1 != this.data.courseDetail.custom_form_switch || this.data.courseDetail.user_form_status || (this.data.form_value.course_id = parseInt(this.data.courseDetail.course_id) || "", 
            t.getCustomForm(this.data.courseDetail.course_id, function(e) {
                var t = e.custom_form_list || [];
                1 == t.length && 6 == t[0].kind && r.setData({
                    custom_form_list: t,
                    onelyPhone: !0
                });
            }, function(e) {
                a.showError("获取表单信息失败", r);
            }));
            var o = "empty", s = this.data, i = s.topic, n = s.courseDetail, u = "current=" + i.record_at + "&courseId=" + i.course_id + "&courseCalendarId=" + i.calendar_id + "&type=release", c = {
                eval: "/pages/user_sub/pronunciation_assessment/pronunciation_assessment?" + u,
                cardEval: "/pages/user_sub/card_eval/card_eval?" + u,
                exam: "/pages/user_sub/question/question?" + u,
                normal: "/pages/user_sub/punchcard/punchcard?" + u,
                read: "/pages/user_sub/compellent_read/compellent_read?courseCalendarId=" + i.calendar_id
            }, d = {
                eval: "去挑战",
                exam: "去答题",
                cardEval: "去跟读",
                normal: "去打卡",
                read: "去学习",
                empty: ""
            };
            if (o = 1 == i.category ? "exam" : 2 == i.category ? "cardEval" : 3 == i.category ? "read" : i.eval_state ? "eval" : "normal", 
            !i.is_submited && "read" === o) {
                var l = 1 == i.category ? "exam" : 2 == i.category ? "cardEval" : i.eval_state ? "eval" : "normal";
                e.globalData.readingOptions = {
                    text: d[l],
                    url: c[l]
                };
            }
            this.customData.URLPunchcard = c[o], console.log(i.is_submited ? "" : d[o]), a.setDataImproved(this, {
                goPunchText: i.is_submited ? "" : d[o],
                isRemedying: i.record_at.substring(0, 10) !== a.currentBeijingTime() && n.remedy_submit_count > 0
            }, !0);
        },
        goPunch: function(r) {
            r.detail && t.submitFormId(r.detail.formId);
            var o = this.data, s = o.courseDetail, i = o.topic, n = this.customData.URLPunchcard, u = e.globalData.loginUser, c = "buttonText=" + this.data.goPunchText + "&theme_min_read_limit=" + this.data.TIME + "&current=" + i.record_at + "&courseId=" + i.course_id + "&courseCalendarId=" + i.calendar_id + "&type=release", d = "/pages/user_sub/binding/binding?toURL=" + encodeURIComponent(n), l = "/pages/user_sub/theme_guide/theme_guide?" + c + "&toURL=" + encodeURIComponent(n), m = u.is_partner && !u.is_bind_partner && s.bind_co_account ? d : this.data.TIME > 0 ? l : n;
            if (0 === i.course_type) {
                var _ = a.generateBeijingTime(), h = _.getHours(), v = _.getMinutes();
                h < 10 && (h = "0" + h), v < 10 && (v = "0" + v);
                var f = h + ":" + v;
                if (a.currentBeijingTime() === i.record_at.substring(0, 10) && (f < s.start_clock || f > s.end_clock)) return a.showError("打卡限制时段为" + s.start_clock + "-" + s.end_clock, this), 
                !1;
            }
            1 != this.data.courseDetail.custom_form_switch || this.data.courseDetail.user_form_status ? (wx.navigateTo({
                url: m
            }), clearInterval(this.data.timer)) : (wx.navigateTo({
                url: "/pages/user_sub/questionnaire/questionnaire?course_id=" + this.data.courseDetail.course_id + "&toURL=" + encodeURIComponent(m) + "&user_mobile=" + this.data.courseDetail.user_mobile
            }), clearInterval(this.data.timer));
        },
        goTimer: function() {
            var e = this;
            this.data.timer = setInterval(function() {
                e.data.TIME--, e.data.TIME <= 0 && (clearInterval(e.data.timer), e.data.TIME = 0);
            }, 1e3);
        },
        getFormId: function(e) {
            console.log("formid"), t.submitFormId(e.detail.formId);
        },
        getPhoneNumber: function(e) {
            var r = this, o = e.detail, s = o.encryptedData, i = o.iv;
            if (!s || !i) return a.showError("获取手机号码失败，请手动输入", this), void a.setDataImproved(this, {
                show_user_mobile: !0
            }, !0);
            t.setPhoneNumber({
                encryptedData: s,
                iv: i,
                phone: ""
            }, function(t) {
                if (r.data.onelyPhone) {
                    var a = {
                        form_id: r.data.custom_form_list[0].id,
                        content: t
                    };
                    r.data.form_value.form_value_list = [ a ], r._submitForm(r.data.form_value, e);
                } else r.goPunch(e);
            }, function(e) {
                var t = e.errType;
                e.errMsg;
                "code" === t && a.setDataImproved(r, {
                    show_user_mobile: !0
                }, !0);
            });
        },
        cancleInput: function() {
            this.setData({
                show_user_mobile: !1
            });
        },
        subInput: function(e) {
            var r = this, o = this.customData.mobilePhone;
            if (/^1[3-9][0-9]{9}$/.test(o)) if (this.data.onelyPhone) {
                var s = {
                    form_id: this.data.custom_form_list[0].id ? this.data.custom_form_list[0].id : this.data.custom_form_list[0].Id,
                    content: o
                };
                this.data.form_value.form_value_list.push(s), this._submitForm(this.data.form_value, e);
            } else t.setPhoneNumber({
                encryptedData: "",
                iv: "",
                phone: o
            }, function(t) {
                r.setData({
                    show_user_mobile: !1
                }), r.goPunch(e);
            }, function(e) {
                a.showError("设置手机号码失败：" + e.errMsg, r);
            }); else a.showError("请输入正确的手机号码", this);
        },
        mobileEvent: function(e) {
            this.customData.mobilePhone = e.detail.value;
        },
        _submitForm: function(r, o) {
            var s = this;
            t.submitCustomForm(r, function(t) {
                e.globalData.justPunched = !0, s.data.courseDetail.user_form_status = !0, s.setData({
                    courseDetail: s.data.courseDetail
                }), s.goPunch(o);
            }, function(e) {
                a.showError("设置手机号码失败：" + e.errMsg, s);
            });
        }
    }
});