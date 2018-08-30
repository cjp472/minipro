var t = require("../../../utils/common.js"), a = require("../../../utils/interface.js"), e = getApp(), o = e.service, i = e.util;

Page({
    data: {
        alertDialog: "display:none",
        managerName: "",
        createTime: "",
        informHeadline: "",
        showDelete: !1,
        isUser: !0,
        netWorkStatus: !0,
        hybridContent: "",
        customData: {
            informId: null,
            jumpType: ""
        }
    },
    onLoad: function(t) {
        var a = this, n = this;
        o.forAllUser(i.getFullPath(this.route, t), function() {
            e.globalData.apsid;
            n.data.customData.informId = t.informId, n.data.customData.jumpType = t.jumpType;
            var o = e.globalData.loginUser;
            1 == o.user_type_login ? (i.setDataImproved(a, {
                isUser: !0
            }), wx.setNavigationBarColor && wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: "#22dd82"
            })) : (3 == o.user_type_login && i.setDataImproved(a, {
                showDelete: !0
            }), i.setDataImproved(a, {
                isUser: !1
            }), wx.setNavigationBarColor && wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: "#4f598f"
            })), n.getInform(), n.getViewer({
                limit: 10,
                offset: 0
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.visitorsList.length < this.data.visitorsCount && this.getViewer({
            limit: 10,
            offset: this.data.visitorsList.length
        });
    },
    onShareAppMessage: function() {
        return {
            title: this.data.informHeadline || "群通知",
            desc: "鲸打卡的分享",
            path: "/pages/admin/association_inform_detail/association_inform_detail?informId=" + this.data.customData.informId
        };
    },
    getInform: function() {
        var o = this;
        wx.request({
            url: a.imp().get_inform_detail,
            method: "GET",
            data: {
                inform_record_id: parseInt(o.data.customData.informId)
            },
            header: {
                "content-type": "application/json",
                apsid: e.globalData.apsid
            },
            success: function(a) {
                if (0 == a.data.err_code) {
                    var i = a.data.data.informRecord;
                    i.user_id == e.globalData.loginUser.user_id && o.setData({
                        showDelete: !0
                    }), o.setData({
                        hybridContent: i.content,
                        managerName: a.data.data.user_name.length > 9 ? a.data.data.user_name.substring(0, 9) + "..." : a.data.data.user_name,
                        createTime: i.create_at.split("T")[0] + " " + i.create_at.split("T")[1].substring(0, 5),
                        informHeadline: i.title
                    });
                } else t.doAnimation("error", "获取通知详情失败，请返回后重试", o);
            },
            fail: function() {
                wx.showModal({
                    title: "错误",
                    content: "网络连接错误，请重试",
                    success: function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }
        });
    },
    getViewer: function(o) {
        var i = this;
        wx.request({
            url: a.imp().get_inform_viewer,
            method: "GET",
            data: {
                inform_record_id: parseInt(i.data.customData.informId),
                limit: o.limit,
                offset: o.offset
            },
            header: {
                "content-type": "application/json",
                apsid: e.globalData.apsid
            },
            success: function(a) {
                if (0 == a.data.err_code) {
                    var e = a.data.data;
                    e.user_view_inform_list = e.user_view_inform_list.map(function(t) {
                        return {
                            url: t.avatar_url,
                            name: t.user_name,
                            time: t.near_at.split("T")[0] + " " + t.near_at.split("T")[1].substring(0, 5)
                        };
                    }), i.setData({
                        visitorsCount: e.view_count,
                        visitorsList: 0 == o.offset ? e.user_view_inform_list : i.data.visitorsList.concat(e.user_view_inform_list)
                    });
                } else t.doAnimation("error", "获取用户信息失败，请返回后重试", i);
            },
            fail: function() {
                wx.showModal({
                    title: "错误",
                    content: "网络连接错误，请重试",
                    success: function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }
        });
    },
    shareToWX: function() {
        if (3 !== e.globalData.loginUser.user_type) wx.showModal({
            title: "群通知功能说明",
            content: "此操作只允许超级管理员操作，请联系超级管理员",
            showCancel: !1,
            confirmText: "我知道了",
            confirmColor: "#4f598f"
        }); else {
            var o = this;
            wx.showModal({
                title: "微信通知",
                content: "一个会员账号下，一天内只允许微信通知一次。",
                confirmText: "确定发送",
                confirmColor: "#4f598f",
                success: function(i) {
                    if (i.confirm) wx.request({
                        url: a.imp().send_wx_inform,
                        method: "GET",
                        data: {
                            inform_record_id: parseInt(o.data.customData.informId)
                        },
                        header: {
                            "content-type": "application/json",
                            apsid: e.globalData.apsid
                        },
                        success: function(a) {
                            0 == a.data.err_code ? wx.showToast({
                                title: "创建成功",
                                icon: "success"
                            }) : 117 == a.data.err_code ? t.doAnimation("error", "一个会员账号下，一天内只允许微信通知一次。", o) : t.doAnimation("error", "发送模板消息失败，请返回后重试", o);
                        },
                        fail: function() {
                            wx.showModal({
                                title: "错误",
                                content: "网络连接错误，请重试",
                                success: function(t) {
                                    t.confirm && wx.navigateBack({
                                        delta: 1
                                    });
                                }
                            });
                        }
                    }); else if (i.cancel) return;
                },
                fail: function() {}
            });
        }
    },
    deleteInform: function(t) {
        this.setData({
            alertDialog: "display: block"
        }), this.data.customData.deleteId = t.currentTarget.dataset.informid;
    },
    cancleDel: function() {
        this.setData({
            alertDialog: "display: none"
        });
    },
    subDel: function() {
        var t = this;
        wx.request({
            url: a.imp().delete_inform,
            data: {
                inform_record_id: parseInt(t.data.customData.informId)
            },
            method: "GET",
            header: {
                "content-type": "app/json",
                apsid: e.globalData.apsid
            },
            success: function(a) {
                0 == a.data.err_code ? (wx.showToast({
                    title: "删除成功",
                    icon: "success"
                }), t.toInformList()) : 107 == a.data.err_code ? wx.showModal({
                    title: "提示",
                    content: "只允许删除自己创建的通知",
                    showCancel: !1
                }) : wx.showModal({
                    title: "错误",
                    content: "删除通知失败，请稍后重试",
                    showCancel: !1
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "错误",
                    content: "网络错误，请刷新重试",
                    showCancel: !1
                });
            }
        });
    },
    toInformList: function() {
        "back" == this.data.customData.jumpType ? wx.navigateBack({
            delta: 1
        }) : wx.redirectTo({
            url: "/pages/admin_sub/association_inform_list/association_inform_list"
        });
    },
    markPreview: function() {}
});