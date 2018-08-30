var t = require("../../../utils/common.js"), e = require("../../../utils/interface.js"), i = getApp(), a = i.service, o = i.util;

Page({
    data: {
        managerName: "",
        createTime: "",
        informHeadline: "",
        isUser: !1,
        netWorkStatus: !0,
        hybridContent: "",
        customData: {
            informId: null
        }
    },
    onLoad: function(t) {
        var e = this, r = this;
        a.forAllUser(o.getFullPath(this.route, t), function() {
            i.globalData.apsid;
            r.data.customData.informId = t.OPinformId;
            var a = i.globalData.loginUser;
            2 === a.user_type || 3 === a.user_type ? (o.setDataImproved(e, {
                isUser: !1
            }), r.getInform(), r.getViewer({
                limit: 10,
                offset: 0
            })) : wx.showModal({
                title: "错误",
                content: "您还不是管理员哦"
            });
        });
    },
    onReachBottom: function() {
        this.data.visitorsList.length < this.data.visitorsCount && this.getViewer({
            limit: 10,
            offset: this.data.visitorsList.length
        });
    },
    getInform: function() {
        var a = this;
        wx.request({
            url: e.imp().get_opinform_detail,
            method: "GET",
            data: {
                inform_record_id: parseInt(a.data.customData.informId)
            },
            header: {
                "content-type": "application/json",
                apsid: i.globalData.apsid
            },
            success: function(e) {
                if (0 == e.data.err_code) {
                    var i = e.data.data.informRecord;
                    console.log(i.Content_text), a.setData({
                        pcContent: i.Content_text,
                        createTime: i.CreatedAt.split("T")[0] + " " + i.CreatedAt.split("T")[1].substring(0, 5),
                        informHeadline: i.Title
                    });
                } else t.doAnimation("error", "获取通知详情失败，请返回后重试", a);
            },
            fail: function() {
                wx.showModal({
                    title: "错误",
                    content: "网络连接错误，请重试",
                    success: function(t) {
                        t.confirm && wx.redirectTo({
                            url: "/pages/user/my/my"
                        });
                    }
                });
            }
        });
    },
    getViewer: function(a) {
        var o = this;
        wx.request({
            url: e.imp().get_opinform_viewer,
            method: "GET",
            data: {
                inform_record_id: parseInt(o.data.customData.informId),
                limit: a.limit,
                offset: a.offset
            },
            header: {
                "content-type": "application/json",
                apsid: i.globalData.apsid
            },
            success: function(e) {
                if (0 == e.data.err_code) {
                    var i = e.data.data;
                    i.user_view_inform_list = i.user_view_inform_list.map(function(t) {
                        return {
                            url: t.avatar_url,
                            name: t.user_name,
                            time: t.near_at.split("T")[0] + " " + t.near_at.split("T")[1].substring(0, 5)
                        };
                    }), o.setData({
                        visitorsCount: i.view_count,
                        visitorsList: 0 == a.offset ? i.user_view_inform_list : o.data.visitorsList.concat(i.user_view_inform_list)
                    });
                } else t.doAnimation("error", "获取用户信息失败，请返回后重试", o);
            },
            fail: function() {
                wx.showModal({
                    title: "错误",
                    content: "网络连接错误，请重试",
                    success: function(t) {
                        t.confirm && wx.redirectTo({
                            url: "/pages/user/my/my"
                        });
                    }
                });
            }
        });
    },
    markPreview: function() {}
});