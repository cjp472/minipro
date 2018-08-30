var e = require("../utils/http.js"), n = (getApp(), {
    GetCheckInCircle: function(n) {
        var c = {};
        e.Get("/api/checkin/GetCheckInCircle", c, function(e) {
            n && n(e);
        });
    },
    GetCheckInCircleDetail: function(n, c, t) {
        var i = {
            CircleId: n
        };
        e.Get("/api/checkin/GetCheckInCircleDetail", i, function(e) {
            c && c(e);
        }, function(e) {
            t && t(e);
        });
    },
    findGetCheckInCircleDetail: function(n, c, t, i, o) {
        var r = {
            CircleId: n,
            themeId: c,
            type: t
        };
        e.Get("/api/checkin/GetCheckInThemeById", r, function(e) {
            i && i(e);
        }, function(e) {
            o && o(e);
        });
    },
    GetTheme: function(n, c, t, i) {
        var o = {
            CircleId: n,
            Type: c
        };
        e.Get("/api/checkin/GetCheckInTheme", o, function(e) {
            t && t(e);
        }, function(e) {
            i && i(e);
        });
    },
    GetCheckInSetting: function(n, c, t) {
        var i = {
            CircleId: n
        };
        e.Get("/api/checkIn/GetCheckInSetting", i, function(e) {
            c && c(e);
        }, function(e) {
            t && t(e);
        });
    },
    SetCircleSetting: function(n, c, t, i) {
        var o = {}, r = {
            CircleId: n,
            WithNotice: c,
            NoticeTime: t
        };
        e.Post("/api/checkin/SetCircleSetting", r, function(e) {
            i && i();
        }, null, o);
    },
    LeaveCircle: function(n, c) {
        var t = {}, i = {
            circleId: n
        };
        e.Post("/api/checkin/LeaveCircle", i, function(e) {
            c && c();
        }, null, t);
    },
    getCheckInCardInfo: function(n, c) {
        e.Get("/api/checkin/GetCheckInCardInfo", n, function(e) {
            c && c(e);
        });
    },
    getRecommendCheckInCircle: function(n, c) {
        var n = {};
        e.Get("/api/checkin/GetRecommendCheckInCircle", n, function(e) {
            c && c(e);
        });
    },
    GetHeadMaster: function(n, c, t) {
        var i = {
            HeadMasterId: n
        };
        e.Get("/api/checkIn/GetHeadMaster", i, function(e) {
            c && c(e);
        }, function(e) {
            t && t(e);
        });
    },
    GetChecinQuestionResult: function(n, c, t) {
        var i = {
            themeId: n
        };
        e.Get("/api/checkIn/GetChecinQuestionResult", i, function(e) {
            c && c(e);
        }, function(e) {
            t && t(e);
        });
    },
    GetCheckInThemeForPreview: function(n, c, t) {
        var i = {
            circleId: n,
            themeId: c
        };
        e.Get("/api/checkin/GetCheckInThemeForPreview", i, function(e) {
            t && t(e);
        });
    },
    GetChecinErrorQuestionResult: function(n, c, t, i, o) {
        var r = {
            circledId: n,
            pageIndex: c,
            pageSize: t
        };
        e.Get("/api/checkin/GetChecinErrorQuestionResult", r, function(e) {
            i && (i(e), console.log(e, "====================>"));
        }, function(e) {
            o && (console.log("er", e), o(e));
        });
    }
});

module.exports = n;