var e = require("../behavior.js"), a = getApp();

a.service, a.util;

Component({
    behaviors: [ e ],
    properties: {
        page: {
            type: String,
            value: "home"
        },
        selectType: {
            type: Object,
            value: {
                order_type: 0,
                search_user_name: "",
                no_remark: !1
            }
        },
        currentAudioType: {
            type: String,
            value: ""
        }
    },
    data: {
        self: !1,
        isAdmin: !1,
        isSticked: "notSet"
    },
    attached: function() {
        this._setupData();
    },
    methods: {
        goDetail: function() {
            a.globalData.loginUser;
            var e = this.data, s = e.submitData, t = e.isAdmin, r = e.self;
            a.globalData.nowCourse = s;
            var i = !!s.eval_state, d = 2 === s.category ? "cardEval" : 1 === s.category ? "exam" : i ? "eval" : "normal", u = this.data.selectType, o = u.order_type, n = u.search_user_name, c = u.no_remark;
            if ("exam" !== d || r || t) {
                if (!s.show_range || r || t) {
                    var l = "exam" === d ? "/pages/user_sub/resultScore/resultScore?submit_id=" + s.submit_id + "&calendar_id=" + s.course_calendar_id : t ? "/pages/admin/detail/detail?submitId=" + s.submit_id + "&courseCalendarId=" + s.course_calendar_id + "&courseId=" + s.course_id + "&order_type=" + o + "&search_user_name=" + n + "&no_remark=" + c : "/pages/user/detail/detail?submitId=" + s.submit_id + "&courseCalendarId=" + s.course_calendar_id + "&courseId=" + s.course_id;
                    "cardEval" === d && (l = "/pages/user/card_eval/card_eval_result/card_eval_result?submitId=" + s.submit_id + "&courseCalendarId=" + s.course_calendar_id + "&courseId=" + s.course_id), 
                    wx.navigateTo({
                        url: l
                    });
                }
            } else (s.answer_content || s.answer_voices || s.answer_pictures || s.answer_videos) && wx.navigateTo({
                url: "/pages/user_sub/essayQuestion/essayQuestion?submit_id=" + s.submit_id + "&calendar_id=" + s.course_calendar_id
            });
        },
        stickSubmit: function(e) {
            var a = e.detail.isSticked;
            this.setData({
                isSticked: a
            });
        },
        _setupData: function() {
            var e = a.globalData.loginUser;
            this.setData({
                self: e.user_id === this.data.submitData.user_id,
                isAdmin: 1 !== e.user_type_login
            });
        },
        debugEvent: function(e) {
            console.log("deleteSubmit", e.detail);
        },
        setAudioType: function(e) {
            this.triggerEvent("audioType");
        }
    }
});