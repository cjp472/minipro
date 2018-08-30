require("../config.js"), require("../utils/log.js");

var e = require("../utils/http.js"), t = {
    submit: function(t, n, s) {
        var i = {
            UserClientType: 102
        }, o = {
            FBContent: t,
            UserContact: n
        };
        e.Post("/api/sys/SaveUserFeedback", o, s, null, i);
    }
}, n = {
    submit: function(t, n, s, i) {
        console.log(t);
        var o = {
            UserClientType: 102
        }, u = {
            QuestionId: t,
            FBType: n,
            FBContent: s
        };
        e.Post("/api/question/SaveFeedback", u, i, null, o);
    }
};

module.exports = {
    feedBackBiz: t,
    feedBackQuestionBiz: n,
    msgList: function(t, n) {
        var s = {};
        t = t, e.Post("/api/Question/UserFeedbackList", t, function(e) {
            n(e);
        }, null, s);
    },
    msgInfo: function(t, n) {
        var s = {};
        t = t, e.Post("/api/Question/SaveUserFeedback", t, function(e) {
            n(e);
        }, null, s);
    },
    msgFormId: function(t, n) {
        var s = {};
        t = t, e.Post("/api/templatemsg/SetUserFormId", t, function(e) {
            n(e);
        }, null, s);
    }
};