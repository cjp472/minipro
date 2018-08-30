var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (t[s] = a[s]);
    }
    return t;
}, e = getApp(), a = e.service, s = e.util;

Page({
    data: {
        courseCalendarId: "",
        answer_score: 0,
        answers: [],
        remarks: [],
        currentAudioType: ""
    },
    customData: {
        options: {},
        currentPath: "",
        submitDetail: {}
    },
    onLoad: function(e) {
        var r = this, i = this.customData;
        e.submitId = parseInt(e.submitId), i.options = e, i.currentPath = s.getFullPath(this.route, t({}, e, {
            afterPunch: ""
        })), a.forAllUser(i.currentPath, function() {
            wx.showShareMenu && wx.showShareMenu({
                withShareTicket: !0
            }), s.showToast("加载中", "loading"), a.fetchCardAnswer(e.submitId, function(t) {
                r._formatAnswers(t);
            }, function(t) {
                s.showError("获取数据错误：" + t.errText, r);
            }, function() {
                s.hideToast();
            }), r._SubmitDetail();
        });
    },
    onShow: function() {
        this.customData.afterPreviewingImage ? this.customData.afterPreviewingImage = !1 : this._SubmitDetail();
    },
    _SubmitDetail: function() {
        var t = this, r = this.customData.options;
        a.fetchSubmitDetail(r.submitId, function(i) {
            i[0].remarks = i[0].remarks || [];
            var o = i[0], n = o.course_calendar_title, u = o.remarks, c = o.eval_state, l = o.avg_score, m = o.title, d = (o.is_custom_on, 
            o.submit_id), h = o.user_id, _ = o.result_effect, f = o.answer_score;
            wx.setNavigationBarTitle({
                title: n || m
            }), u.forEach(function(t) {
                t.avg_score = l, t.scoreLevel = Math.ceil(l);
            }), t.customData.submitDetail = i[0];
            var v = r.afterPunch ? a.config.HOST + "signday/info2?submit_id=" + r.submitId + "&scene=" + t._getScene("s") : "";
            s.setDataImproved(t, {
                submitData: i[0],
                remarks: u,
                eval_state: c,
                signImage: v,
                submit_id: d,
                isMine: e.globalData.loginUser.user_id === h,
                result_effect: _,
                answer_score: Math.floor(f)
            });
        });
    },
    toQsList: function(t) {
        var e = t.currentTarget.dataset.questionid;
        wx.navigateTo({
            url: "/pages/user_sub/card_eval/card_eval?courseCalendarId=" + this.customData.rawAnswers.calendar_id + "&questionId=" + (e || 0) + "&submitId=" + this.customData.options.submitId
        });
    },
    onShareAppMessage: function() {
        var t = this.customData, e = t.currentPath, a = t.submitDetail;
        return console.log("share:", e), s.setDataImproved(this, {
            hideDaySign: !0
        }, !0), {
            title: a.course_calendar_title || a.title,
            path: e
        };
    },
    _formatAnswers: function(t) {
        t.answer_list = t.answer_list || [];
        var e = t.answer_score, a = (t.eval_voice, t.answer_list.map(function(t) {
            var e = t.eval_voice, a = t.question_id, s = t.answer_id;
            return {
                score: e && Math.floor(e.score) || 0,
                question_id: a,
                answer_id: s
            };
        }));
        this.customData.rawAnswers = t;
        var r = e < 30 ? 1 : e < 50 ? 2 : e < 70 ? 3 : e < 85 ? 4 : 5;
        s.setDataImproved(this, {
            answer_score: Math.floor(e),
            answers: a,
            starNumber: r
        });
    },
    _getScene: function(t) {
        var e = this.customData.options, a = "d" + [ e.submitId, e.courseId, e.calendarId, t ].join("z");
        return console.log("scene:", a), a;
    },
    markPreview: function() {
        this.customData.afterPreviewingImage = !0;
    },
    setAudioType: function(t) {
        this.setData({
            currentAudioType: e.globalData.currentAudioType
        });
    }
});