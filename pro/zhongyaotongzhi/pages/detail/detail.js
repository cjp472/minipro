function t(t, a) {
    wx.request({
        url: u.globalData.host + "/notice/alert_setting",
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
    var e = a.data.notice.mp_gid, o = a.data.envVersion;
    wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
        appId: t.appid,
        path: "/pages/groupdetail/groupdetail?gid=" + e,
        envVersion: o
    }) : wx.previewImage({
        urls: [ t.qrcode ]
    });
}

function o(t) {
    null == t.data.notice && (r.showLoading("加载中"), t.setData({
        showLoadError: 0
    }));
    var a = t.data.groupInfo;
    wx.request({
        url: u.globalData.host + "/notice/v2/detail",
        data: {
            nid: t.data.nid,
            access_token: wx.getStorageSync("accessToken"),
            encrypted_data: a.encryptedData ? a.encryptedData : "",
            iv: a.iv ? a.iv : ""
        },
        method: "GET",
        success: function(a) {
            if (null == t.data.notice && r.hideLoading(), -500 != a.data.sta) if (0 == a.data.sta) if (a.data.data) {
                var e = a.data.data;
                if (wx.setNavigationBarTitle({
                    title: e.title
                }), 1 == e.is_owner && 1 == e.group_only && "" == e.open_gid && t.setData({
                    shareError: !0
                }), 1 == e.group_only && wx.showShareMenu({
                    withShareTicket: !0
                }), !e.content) return void t.setData({
                    openGid: e.open_gid,
                    notice: {
                        title: e.title,
                        bg_img: e.bg_img,
                        notGroup: !0
                    }
                });
                e.create_time = r.formatDate(new Date(1e3 * e.create_time), "yyyy-MM-dd HH:mm");
                var i, d = e.alert_time;
                if (0 != d && (new Date().getTime() / 1e3 > d && (i = !0), d = r.formatDate(new Date(1e3 * d), "yyyy-MM-dd HH:mm")), 
                r.isTextEmpty(e.bg_img) && (e.bg_img = "/images/default_cover.jpg"), r.isTextEmpty(e.head_img) && (e.head_img = "/images/default_avatar.png"), 
                (e.mp_gname ? e.mp_gname.length : 0) > 60) {
                    var s = 30;
                    r.strLength(e.mp_gname) < 70 ? s = 56 : r.strLength(e.mp_gname) < 90 && (s = 43), 
                    e.mp_gname = e.mp_gname.substr(0, s) + "...";
                }
                t.setData({
                    notice: e,
                    overdue: i,
                    alert_time: d,
                    openGid: e.open_gid
                }), n(t, !1), n(t, !1, 1);
            } else r.showFailedToast("加载失败，请重试"); else -1 == a.data.sta && a.data.msg.indexOf("data not found") > -1 ? t.setData({
                dataNotFound: 1,
                notice: null
            }) : -1 == a.data.sta && 20 == a.data.errcode ? t.setData({
                illegal: !0
            }) : null == t.data.notice ? t.setData({
                showLoadError: 1
            }) : r.showFailedToast("加载失败，请重试", a.data.msg); else r.login(function() {
                o(t), t.setData({
                    unauthorized: !1
                });
            }, function() {
                t.setData({
                    unauthorized: !0
                });
            });
        },
        fail: function(a) {
            null == t.data.notice ? (r.hideLoading(), t.setData({
                showLoadError: 1
            })) : r.showFailedToast("加载失败，请重试");
        }
    });
}

function n(t, a, e) {
    var o, i, d, s = "";
    o = t.data.commentRecordsPage, i = t.data.commentRecords, d = e ? 0 : 1;
    var c = e ? 6 : 10;
    s = t.data.notice.mp_gid, o = a ? o : 1, wx.request({
        url: u.globalData.host + "/notice/v2/user_list",
        data: {
            nid: t.data.nid,
            type: d,
            page: o,
            count: c,
            mp_gid: s,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(s) {
            if (-500 != s.data.sta) if (0 == s.data.sta) {
                if (s.data.data) {
                    var c = s.data.data.users;
                    t.setData({
                        canLoadMore: c.length > 0
                    });
                    for (var l = 0; l < c.length; l++) {
                        var u = c[l];
                        u.stamp = r.formatDate(new Date(1e3 * u.stamp), "yyyy-MM-dd HH:mm:ss"), r.isTextEmpty(u.head_img) && (u.head_img = "/images/default_avatar.png");
                    }
                    if (0 == d) t.setData({
                        readInfo: {
                            total: s.data.data.total,
                            readlist: c
                        }
                    }); else {
                        var m = s.data.data.total;
                        t.setData({
                            com_count: m,
                            commentRecords: 1 == o ? c : i.concat(c),
                            commentRecordsPage: 0 == c.length ? o : o + 1
                        });
                    }
                }
            } else r.showFailedToast("加载失败，请重试", s.data.msg); else r.login(function() {
                n(t, a, e), t.setData({
                    unauthorized: !1
                });
            }, function() {
                t.setData({
                    unauthorized: !0
                });
            });
        },
        fail: function(t) {
            r.showFailedToast("加载失败，请重试");
        }
    });
}

function i(t, a) {
    r.showLoading("正在删除");
    var e = t.data.commentRecords[a];
    wx.request({
        url: u.globalData.host + "/notice/rem_com",
        data: {
            cid: e.cid,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(e) {
            r.hideLoading(), -500 != e.data.sta ? 0 == e.data.sta ? o(t) : r.showFailedToast("删除失败，请重试") : r.login(function() {
                i(t, a);
            });
        },
        fail: function(t) {
            r.hideLoading(), r.showFailedToast("删除失败，请重试");
        }
    });
}

function d(t) {
    r.showLoading("正在发布留言"), wx.request({
        url: u.globalData.host + "/notice/comment",
        data: {
            nid: t.data.nid,
            content: t.data.commentContent,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(a) {
            r.hideLoading(), -500 != a.data.sta ? 0 == a.data.sta ? (r.showToast("留言成功"), n(t, !1), 
            t.setData({
                commentEditing: !1,
                commentContent: ""
            })) : r.showFailedToast("留言失败，请重试") : r.login(function() {
                d(t);
            });
        },
        fail: function(t) {
            r.hideLoading(), r.showFailedToast("留言失败，请重试");
        }
    });
}

function s(t, a) {
    var e = {
        nid: a.data.nid,
        encrypted_data: t.encryptedData || "",
        iv: t.iv || "",
        access_token: wx.getStorageSync("accessToken")
    };
    wx.request({
        url: u.globalData.host + "/notice/bind",
        data: e,
        method: "POST",
        success: function(e) {
            if (r.hideLoading(), -500 != e.data.sta) {
                if (-1 == e.data.sta) r.showModelTips("获取群名称失败，请重新分享，请重新分享或者联系客服"); else if (0 == e.data.sta) {
                    var o = a.data.notice;
                    o.open_gid = e.data.data.open_gid, a.setData({
                        shareError: !1,
                        notice: o
                    });
                }
            } else r.login(function() {
                s(t, a);
            });
        },
        fail: function(t) {
            r.hideLoading(), console.log("bind fail  ============"), r.showModelTips("获取群名称失败，请重新分享，请联系客服");
        }
    });
}

function c(t, a, e) {
    r.showLoading("正在删除");
    var o = t.data.commentRecords[a];
    console.log(o);
    var n = o.reply[e];
    console.log(n), wx.request({
        url: u.globalData.host + "/notice/rem_com",
        data: {
            cid: o.cid,
            reply_id: n.reply_id,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(n) {
            r.hideLoading(), -500 != n.data.sta ? 0 == n.data.sta ? (o.reply.splice(e, 1), t.data.commentRecords[a] = o, 
            t.setData({
                commentRecords: t.data.commentRecords
            })) : r.showFailedToast("删除失败，请重试", n.data.msg) : r.login(function() {
                c(t, a, e);
            });
        },
        fail: function(t) {
            r.hideLoading(), r.showFailedToast("删除失败，请重试");
        }
    });
}

var r = require("../../utils/util.js"), l = require("../../tmp/tmp.js"), u = getApp();

Page({
    data: {
        unauthorized: !1,
        showLoadError: 0,
        dataNotFound: 0,
        nid: "",
        notice: null,
        com_count: 0,
        recordsType: "visit",
        visitRecordsPage: 1,
        commentRecordsPage: 1,
        unreadRecordsPage: 1,
        commentClickRecordIndex: -1,
        commentClickCommentIndex: -1,
        visitRecords: null,
        commentRecords: null,
        unreadRecords: null,
        canLoadMore: !1,
        canShare: !1,
        alert_time: 0,
        groupName: "",
        groupCards: null,
        openGid: "",
        groupInfo: {},
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
        overdue: !1,
        readInfo: null,
        illegal: !1,
        wish: {
            qrcode: "https://xcx-qunsou.weiyoubot.cn/wish/img/qrcode.png",
            appid: "wx3dd29bfe3e5f0d1d"
        },
        wishs: [ {
            wid: "5a7d13c7a379e8aaf551192a",
            img: "https://cdn-xcxcustom.weiyoubot.cn/20180209/623b7a16eba309fdacc5ae34bd140d94.png"
        }, {
            wid: "5a7d1b4ca379e8aaf5511fa0",
            img: "https://cdn-xcxcustom.weiyoubot.cn/20180209/8722dc57ed4f1572a1c3bd22eb5d5c8e.png"
        } ],
        envVersion: u.globalData.envVersion(),
        swiper: u.globalData.adSwiper,
        adId: "2a73d4a338ab5ae533c1716a608f3d41",
        contactUserInfo: '{ "nickName": "' + r.getStorage("userInfo").nickName + '", "avatarUrl": "' + r.getStorage("userInfo").avatarUrl + '" }',
        focus: !1
    },
    onLoad: function(t) {
        var a = t.nid || "";
        r.isTextEmpty(a) && (a = decodeURIComponent(t.scene || "")), this.setData({
            nid: a
        }), wx.canIUse && this.setData({
            canShare: wx.canIUse("button.open-type.share")
        });
        var e = wx.getStorageSync("notice_id");
        this.setData({
            alertRecv: e == a ? 1 : 0
        }), l.ads(this, this.data.adId, "detail"), console.log(this.data.adsList);
    },
    onShow: function(t) {
        r.autoPlay(this, !0);
        var a = this;
        u.shareTicket ? wx.getShareInfo({
            shareTicket: u.shareTicket,
            complete: function(t) {
                "getShareInfo:fail:" == t.errMsg || a.setData({
                    groupInfo: t
                }), o(a);
            }
        }) : o(this), this.setData({
            contactUserInfo: '{ "nickName": "' + r.getStorage("userInfo").nickName + '", "avatarUrl": "' + r.getStorage("userInfo").avatarUrl + '" }'
        });
    },
    onHide: function() {
        r.autoPlay(this, !1);
    },
    onReachBottom: function() {
        this.data.canLoadMore && n(this, !0);
    },
    onShareAppMessage: function() {
        var t = this;
        return {
            title: "您收到了一条重要通知",
            path: "/pages/detail/detail?nid=" + this.data.nid,
            success: function(a) {
                t.data.notice.group_only && "" == t.data.notice.open_gid && (r.showLoading("正在获取群信息"), 
                wx.getShareInfo({
                    shareTicket: a.shareTickets[0],
                    complete: function(a) {
                        s(a, t);
                    }
                }));
            },
            fail: function(t) {
                console.log("转发到群/好友失败 ============= "), r.showModelTips("转发失败，请重新选择需要转发的群");
            }
        };
    },
    refresh: function() {
        o(this);
    },
    move: function(t) {
        console.log(222333);
    },
    shareWx: function() {
        r.showModelTips('点击右上角三个点"..."，转发到群里或转发给好友吧~');
    },
    shareWxCircle: function() {
        r.buttonClicked(this), wx.navigateTo({
            url: "../qrcode/qrcode?nid=" + this.data.nid
        });
    },
    showPic: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.notice.pics;
        100 == a && (a = 0, e = [ this.data.notice.bg_img ]), wx.previewImage({
            current: e[a],
            urls: e
        });
    },
    showStatusModal: function() {
        this.setData({
            alertRecv: 0
        });
    },
    bannerError: function() {
        var t = this.data.notice;
        t.bg_img = "https://cdn-xcx-qunsou.weiyoubot.cn/notice_bg/41.jpg", this.setData({
            notice: t
        });
    },
    message: function() {
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
    postComment: function() {
        var t = this.data.commentContent;
        if (r.isTextEmpty(t)) r.showModelTips("请输入留言内容"); else {
            var a = r.hasSensitiveWords(t);
            if (a) {
                r.showModelTips("留言内容包含敏感词，已经自动处理为*，请重新编辑");
                var e = r.replaceAll(t, a);
                return console.log(e), void this.setData({
                    commentContent: e,
                    defaultComment: e
                });
            }
            d(this);
        }
    },
    modalClick: function(t) {
        this.setData({
            modal: {
                isShow: !1
            }
        }), 1 == t.currentTarget.dataset.id && a(this, "detail");
    },
    loadRecords: function() {
        n(this, !1);
    },
    deleteRecord: function(t) {
        var a = this;
        wx.showModal({
            title: "提示",
            content: "删除后无法恢复，确定要删除吗？",
            confirmColor: "#1677d2",
            success: function(e) {
                e.confirm && i(a, t.currentTarget.dataset.index);
            }
        });
    },
    changeFocus: function() {
        this.setData({
            focus: !0
        });
    },
    toIndex: function() {
        r.toIndex();
    },
    toEdit: function(t) {
        r.buttonClicked(this), a(this);
    },
    toCreate: function() {
        r.buttonClicked(this), wx.navigateTo({
            url: "../edit/edit"
        });
    },
    toList: function() {
        r.buttonClicked(this), wx.navigateTo({
            url: "../readlist/readlist?nid=" + this.data.nid + "&mp_gid=" + this.data.notice.mp_gid + "&mp_join=" + this.data.notice.mp_join
        });
    },
    toCard: function(t) {
        var a = this, o = t.currentTarget.dataset.id, n = this.data.notice.mp_join, i = this.data.recommend, d = a.data.envVersion;
        n ? wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
            appId: i.appid,
            path: "/pages/detail/detail?cid=" + o,
            envVersion: d
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
        if (r.buttonClicked(this), this.data.groupCards) wx.setStorageSync("notice", this.data.notice), 
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
    toComment: function(t) {
        var a = this;
        r.buttonClicked(this);
        var e = t.currentTarget.dataset.index, o = this.data.commentRecords[e];
        wx.navigateTo({
            url: "../comment/comment?nid=" + a.data.nid + "&recordIndex=" + e + "&cid=" + o.cid
        });
    },
    clickComment: function(t) {
        var a = this, e = a.data.notice, o = t.currentTarget.dataset.recordIndex, n = t.currentTarget.dataset.commentIndex, i = a.data.commentRecords[o], d = i.reply[n];
        a.setData({
            commentClickRecordIndex: o,
            commentClickCommentIndex: n
        }), setTimeout(function() {
            a.setData({
                commentClickRecordIndex: -1,
                commentClickCommentIndex: -1
            });
            var t = d.unionid != e.unionid, s = e.is_owner || i.unionid == e.unionid || d.unionid == e.unionid, r = [];
            t && r.push("回复"), s && r.push("删除"), wx.showActionSheet({
                itemList: r,
                success: function(t) {
                    var e = r[t.tapIndex];
                    "回复" == e ? (console.log(i), wx.navigateTo({
                        url: "../comment/comment?nid=" + a.data.nid + "&recordIndex=" + o + "&replyCommentId=" + d.reply_id + "&replyName=" + d.name + "&replyContent=" + d.content + "&cid=" + i.cid
                    })) : "删除" == e && c(a, o, n);
                }
            });
        }, 200);
    },
    postFormId: function(t) {
        r.postFormId(t.detail.formId);
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
                r.login(function() {
                    t.setData({
                        unauthorized: !1
                    }), o(t);
                });
            }
        });
    },
    toGroupCard: function(t) {
        r.buttonClicked(this), e(this.data.recommend, this);
    },
    modalClose: function(a) {
        var e = parseInt(a.currentTarget.dataset.id);
        this.setData({
            alertRecv: 1
        }), t(this, e);
    },
    copyNid: function() {
        var t = this.data.nid;
        wx.setClipboardData({
            data: t,
            success: function(t) {}
        });
    }
});