function t(t, a) {
    wx.request({
        url: s.globalData.host + "/notice/alert_setting",
        method: "POST",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            nid: t.data.nid,
            alert_recv: a
        },
        complete: function(e) {
            if (console.log("是否接收通知返回值： =========="), console.log(e), wx.setStorageSync("notice_id", t.data.nid), 
            0 == e.data.sta) {
                var o = t.data.notice;
                o.alert_recv = a, t.setData({
                    notice: o
                });
            }
        }
    });
}

function a(t, a) {
    wx.setStorageSync("notice", t.data.notice), wx.navigateTo({
        url: "../edit/edit?nid=" + t.data.nid + "&from=" + a
    });
}

function e(t, a) {
    var e = a.data.mp_gid;
    wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
        appId: t.appid,
        path: "/pages/groupdetail/groupdetail?gid=" + e
    }) : wx.previewImage({
        urls: [ t.qrcode ]
    });
}

function o(t, a) {
    var e, n, i = 0;
    switch (t.data.recordsType) {
      case "visit":
        e = t.data.visitRecordsPage, n = t.data.visitRecords;
        break;

      case "unread":
        e = t.data.unreadRecordsPage, n = t.data.unreadRecords, i = 2;
    }
    e = a ? e : 1, wx.request({
        url: s.globalData.host + "/notice/v2/user_list",
        data: {
            nid: t.data.nid,
            type: i,
            page: e,
            mp_gid: t.data.mp_gid,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(s) {
            if (console.log(s), -500 != s.data.sta) if (0 == s.data.sta) {
                if (s.data.data) {
                    var c = s.data.data.users;
                    t.setData({
                        canLoadMore: c.length > 0
                    });
                    for (var r = 0; r < c.length; r++) {
                        var u = c[r];
                        u.stamp = d.formatDate(new Date(1e3 * u.stamp), "yyyy-MM-dd HH:mm"), d.isTextEmpty(u.head_img) && (u.head_img = "/images/default_avatar.png");
                    }
                    var l = t.data.notice;
                    0 == i ? (l.view_count = s.data.data.total, l.unread_count = s.data.data.unread_total, 
                    t.setData({
                        visitRecords: 1 == e ? c : n.concat(c),
                        visitRecordsPage: 0 == c.length ? e : e + 1,
                        notice: l
                    })) : (l.unread_count = s.data.data.total, t.setData({
                        unreadRecords: 1 == e ? c : n.concat(c),
                        unreadRecordsPage: 0 == c.length ? e : e + 1,
                        notice: l
                    }));
                }
            } else d.showFailedToast("加载失败，请重试", s.data.msg); else d.login(function() {
                o(t, a), t.setData({
                    unauthorized: !1
                });
            }, function() {
                t.setData({
                    unauthorized: !0
                });
            });
        },
        fail: function(t) {
            d.showFailedToast("加载失败，请重试");
        }
    });
}

function n(t, a) {
    d.showLoading("正在删除");
    var e = t.data.commentRecords[a];
    wx.request({
        url: s.globalData.host + "/notice/rem_com",
        data: {
            cid: e.cid,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(e) {
            d.hideLoading(), -500 != e.data.sta ? 0 == e.data.sta ? loadNoticeDetail(t) : d.showFailedToast("删除失败，请重试") : d.login(function() {
                n(t, a);
            });
        },
        fail: function(t) {
            d.hideLoading(), d.showFailedToast("删除失败，请重试");
        }
    });
}

function i(t) {
    var a = t.data.groupCards;
    null == a && d.showLoading("加载中..."), wx.request({
        url: s.globalData.host + "/qmp/group/list",
        data: {
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(e) {
            if (null == a && d.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                if (e.data.data) {
                    var n = e.data.data, s = [], c = [];
                    console.log(n);
                    for (var r = 0; r < n.length; r++) {
                        var u = n[r];
                        s.push(u.name), c.push(u.gid);
                    }
                    t.setData({
                        groupCards: s,
                        groupCardsIds: c
                    }), o(t, !1);
                }
            } else d.showFailedToast("加载失败，请重试", e.data.msg); else d.login(function() {
                i(t);
            });
        },
        fail: function(t) {
            null == a && d.hideLoading(), d.showFailedToast("加载失败，请重试");
        }
    });
}

var d = require("../../utils/util.js"), s = getApp();

Page({
    data: {
        unauthorized: !1,
        showLoadError: 0,
        dataNotFound: 0,
        nid: "",
        notice: {},
        recordsType: "visit",
        visitRecordsPage: 1,
        unreadRecordsPage: 1,
        visitRecords: null,
        unreadRecords: null,
        canLoadMore: !1,
        canShare: !1,
        groupName: "",
        groupCards: null,
        shareError: !1,
        recommend: {
            title: "微友名片",
            appid: "wxb141cac5a4da3378",
            qrcode: "https://cdn-xcx-qunsou.weiyoubot.cn/xcx/2017-09-07/e9c4f40e-1dc5-4c51-a1dc-784a4ead71a6.png"
        },
        modal: {
            isShow: !1,
            title: "提示",
            desc: "提示内容",
            src: "",
            ok: "确定",
            cancel: ""
        },
        overdue: !1
    },
    onLoad: function(t) {
        console.log(t);
        var a = t.nid;
        this.setData({
            nid: a,
            mp_gid: t.mp_gid,
            mp_join: t.mp_join
        }), wx.canIUse && this.setData({
            canShare: wx.canIUse("button.open-type.share")
        });
        var e = wx.getStorageSync("notice_id");
        this.setData({
            alertRecv: e == a ? 1 : 0
        });
    },
    onShow: function(t) {
        o(this, !1), o(this, !1);
    },
    onReachBottom: function() {
        this.data.canLoadMore && o(this, !0);
    },
    move: function(t) {
        console.log(222333);
    },
    showStatusModal: function() {
        this.setData({
            alertRecv: 0
        });
    },
    comment: function() {
        this.setData({
            commentEditing: !0
        });
    },
    inputComment: function(t) {
        this.setData({
            commentContent: t.detail.value
        });
    },
    cancelComment: function() {
        this.setData({
            commentEditing: !1,
            commentContent: ""
        });
    },
    postComment: function(t) {
        function a() {
            return t.apply(this, arguments);
        }
        return a.toString = function() {
            return t.toString();
        }, a;
    }(function() {
        d.isTextEmpty(this.data.commentContent) ? d.showModelTips("请输入留言内容") : postComment(this);
    }),
    changeRecordsType: function(t) {
        var a = t.currentTarget.dataset.type;
        this.setData({
            recordsType: a
        });
        var e = this.data.notice, n = this.data.groupCards;
        if ("unread" == a && 0 == e.unread_count && !e.mp_gname && e.is_owner) {
            this.setData({
                modal: {
                    isShow: !0,
                    title: "提示",
                    desc: "未读人数是根据已关联的群通讯录里的人员是否已读计算出来的，所以需要您先关联一个群通讯录。",
                    src: "https://cdn-xcxcustom.weiyoubot.cn/20171017/f93bee0a5c15a11c9ec3296d4039802f.jpeg",
                    cancel: "取消",
                    ok: "去设置"
                }
            });
        }
        "unread" == a && e.is_owner && !n ? i(this) : o(this, !1);
    },
    modalClick: function(t) {
        this.setData({
            modal: {
                isShow: !1
            }
        }), 1 == t.currentTarget.dataset.id && a(this, "detail");
    },
    loadRecords: function() {
        o(this, !1);
    },
    deleteRecord: function(t) {
        var a = this;
        wx.showModal({
            title: "提示",
            content: "删除后无法恢复，确定要删除吗？",
            confirmColor: "#1677d2",
            success: function(e) {
                e.confirm && n(a, t.currentTarget.dataset.index);
            }
        });
    },
    toIndex: function() {
        d.toIndex();
    },
    toEdit: function(t) {
        d.buttonClicked(this), a(this);
    },
    toCreate: function() {
        d.buttonClicked(this), wx.navigateTo({
            url: "../edit/edit"
        });
    },
    toCard: function(t) {
        var a = this, o = t.currentTarget.dataset.id, n = this.data.mp_join;
        console.log(n);
        var i = this.data.recommend;
        1 == n ? wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
            appId: i.appid,
            path: "/pages/detail/detail?cid=" + o
        }) : wx.previewImage({
            urls: [ i.qrcode ]
        }) : wx.showModal({
            title: "温馨提示",
            content: "您还未加入通讯录，无法查看通讯录成员的名片详情，点击“加入”按钮，可以加入群通讯录。",
            confirmText: "加入",
            confirmColor: "#1677d2",
            success: function(t) {
                t.confirm ? e(i, a) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    toContact: function() {
        if (d.buttonClicked(this), this.data.groupCards) wx.setStorageSync("notice", this.data.notice), 
        wx.navigateTo({
            url: "../edit/edit?nid=" + this.data.nid + "&from=detail"
        }); else {
            var t = this.data.recommend;
            wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
                appId: t.appid,
                path: "/pages/groupedit/groupedit"
            }) : wx.previewImage({
                urls: [ t.qrcode ]
            });
        }
    },
    postFormId: function(t) {
        d.postFormId(t.detail.formId);
    },
    openLocation: function(t) {
        var a = this.data.notice.latitude, e = this.data.notice.longitude;
        wx.openLocation({
            latitude: a,
            longitude: e
        });
    },
    reAuthorize: function() {
        var t = this;
        wx.openSetting({
            complete: function(a) {
                d.login(function() {
                    t.setData({
                        unauthorized: !1
                    }), loadNoticeDetail(t);
                });
            }
        });
    },
    toGroupCard: function(t) {
        d.buttonClicked(this), e(this.data.recommend, this);
    },
    modalClose: function(a) {
        var e = parseInt(a.currentTarget.dataset.id);
        this.setData({
            alertRecv: 1
        }), t(this, e);
    }
});