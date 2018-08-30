var t = require("../utils/http.js"), e = getApp(), i = {
    getVipListData: function(e, i) {
        var n = {
            PageIndex: e,
            pagesize: 15
        };
        t.Get("/api/vip/GetCourseList4Collection", n, function(t) {
            i && i(t);
        });
    },
    getVipDetailCourseInfo: function(e, i) {
        var n = {
            courseid: e
        };
        t.Get("/api/vip/GetCourse", n, function(t) {
            i && i(t);
        });
    },
    vipOpenPintuan: function(e, i, n) {
        var o = {
            businessType: "1",
            businessId: e,
            orderno: i
        };
        t.Get("/api/groupon/Open", o, function(t) {
            n && n(t);
        });
    },
    GrouponActivityOrderConfirm: function(e, i, n) {
        var o = {
            webcastCourseID: e,
            NeedBook: i
        };
        t.Get("/api/vip/GrouponActivityOrderConfirm", o, function(t) {
            n(t);
        });
    },
    SetUserFormId: function(i, n) {
        e.generateShareOptions();
        var o = {}, i = i;
        t.Post("/api/templatemsg/SetUserFormId", i, function(t) {
            n(t);
        }, null, o);
    },
    SetUserPrePayId: function(e, i) {
        var n = {}, e = e;
        t.Post("/api/templatemsg/SetUserPrePayId", e, function(t) {
            i(t);
        }, null, n);
    },
    getVipDetailAddrInfo: function(e, i) {
        var e = e;
        t.Get("/api/vip/GetUserLastAddress", e, function(t) {
            i(t);
        });
    },
    confirmAddrInfo: function(e, i) {
        var n = {}, e = e;
        t.Post("/api/vip/ModifyUserAddress", e, function(t) {
            i(t);
        }, null, n);
    },
    getVipDetailData: function(e, i) {
        var n = {
            webcastcourseid: e
        };
        t.Get("/api/vip/GetCourseDetail?webcastcourseid", n, function(t) {
            i && i(t);
        });
    },
    WebcastOrderConfirm: function(i, n, o) {
        var r = {
            UserClientType: e.globalData.SystemInfo.iOS ? 1 : 2
        }, u = {
            WebcastCourseId: i,
            NeedBook: n
        };
        t.Post("/api/vip/WebcastOrderConfirm", u, function(t) {
            o && o(t);
        }, null, r);
    },
    getPayWeixinData: function(e, i, n, o) {
        var r = {
            openid: e,
            orderno: i,
            notifyasync: n
        };
        t.Get("/api/vip/WXOderSign", r, function(t) {
            o && o(t);
        });
    },
    getSubjectName: function(e, i) {
        var n = {
            subjectid: e
        };
        t.Get("/api/subject/GetSubjectName", n, function(t) {
            i && i(t);
        });
    },
    GetCourseListByCollectionId: function(e, i, n) {
        var o = {
            collectionId: e,
            subjectId: i
        };
        t.Get("/api/vip/GetCourseListByCollectionId", o, function(t) {
            n && n(t);
        });
    },
    GetCollectionSubjects: function(e, i) {
        var n = {
            collectionId: e
        };
        t.Get("/api/vip/GetCollectionSubjects", n, function(t) {
            i && i(t);
        });
    },
    GetGroupListInfo: function(e, i) {
        var n = {
            businessId: e
        };
        t.Get("/api/groupon/GetGroupListInfo", n, function(t) {
            i && i(t);
        });
    }
};

module.exports = i;