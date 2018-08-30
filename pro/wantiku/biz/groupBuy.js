var n = require("../utils/http.js"), o = getApp(), t = {
    getGroupon: function(o) {
        var t = {};
        n.Get("/api/activity/GetGroupon", t, function(n) {
            o && o(n);
        });
    },
    postCopounTemplate: function(o, t, e, r) {
        var i = {
            reportUrl: o,
            OpenId: t,
            FormId: e
        };
        n.Post("/api/templatemsg/SetUserFormId", i, function(n) {
            r && r(n);
        });
    },
    updateWXUserInfo: function(o, t) {
        var e = {
            avatarUrl: o.avatarUrl,
            city: o.city,
            country: o.country,
            gender: o.gender,
            language: o.language,
            nickName: o.nickName,
            province: o.province
        };
        n.Post("/api/user/UpdateWXUserInfo", e, function(n) {
            t && t(n);
        });
    },
    joinGroup: function(t, e, r) {
        var i = {
            grouponid: t,
            groupInfoId: e
        }, a = {
            UserClientType: o.globalData.SystemInfo.iOS ? 1 : 2
        };
        n.Get("/api/activity/JoinGroup", i, function(n) {
            r && r(n);
        }, null, a);
    },
    getUserGroupInfo: function(o, t, e) {
        var r = {
            groupInfoId: o
        };
        n.Get("/api/activity/GetUserGroupInfo", r, function(n) {
            t && t(n);
        }, function(n) {
            e(n);
        });
    },
    getGrouponOrderConfirm: function(t, e) {
        var r = {
            UserClientType: o.globalData.SystemInfo.iOS ? 1 : 2
        }, i = {
            grouponInfoID: t
        };
        n.Get("/API/VIP/GrouponOrderConfirm", i, function(n) {
            e && e(n);
        }, null, r);
    },
    getPayWeixinData: function(o, t, e, r) {
        var i = {
            openid: o,
            orderno: t,
            notifyasync: e
        };
        n.Get("/api/vip/WXOderSign", i, function(n) {
            r && r(n);
        });
    },
    getUserGoods: function(o, t) {
        var e = {
            pageIndex: o,
            pageSize: 15
        };
        n.Get("/api/activity/GetUserGoods", e, function(n) {
            t && t(n);
        });
    },
    GetGroupInfoId: function(o, t) {
        var e = {
            grouponId: o
        };
        n.Get("/api/activity/GetGroupInfoId", e, function(n) {
            t && t(n);
        });
    }
};

module.exports = t;