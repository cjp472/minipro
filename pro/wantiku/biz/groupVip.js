var n = require("../utils/http.js"), t = (getApp(), {
    GetCourseInfo: function(t, o, i) {
        n.Get("/api/vip/GetCourse", t, function(n) {
            o && o(n);
        }, function(n) {
            i(n);
        });
    },
    GetGroupInfo: function(t, o, i) {
        n.Get("/api/groupon/GetGroupInfo", t, function(n) {
            o && o(n);
        }, function() {
            i();
        });
    },
    GrouponActivityOrderConfirm: function(t, o) {
        n.Get("/api/vip/GrouponActivityOrderConfirm", t, function(n) {
            o && o(n);
        });
    },
    WXOderSign: function(t, o) {
        n.Get("/api/vip/WXOderSign", t, function(n) {
            o && o(n);
        });
    },
    PostTemplateSetUserPrePayId: function(t, o) {
        n.Post("/api/templatemsg/SetUserPrePayId", t, function(n) {
            o && o(n);
        });
    },
    joinGroup: function(t, o) {
        n.Get("/api/groupon/join", t, function(n) {
            o && o(n);
        });
    },
    openGroup: function(t, o) {
        n.Get("/api/groupon/Open", t, function(n) {
            o && o(n);
        });
    },
    SetUserFormId: function(t, o) {
        n.Post("/api/templatemsg/SetUserFormId", t, function(n) {
            o && o(n);
        });
    }
});

module.exports = t;