function t(t, a) {
    var e = t.data.envVersion;
    wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
        appId: a.appid,
        path: "/pages/groupedit/groupedit",
        envVersion: e
    }) : wx.previewImage({
        urls: [ a.qrcode ]
    });
}

function a(t) {
    wx.request({
        url: l.globalData.host + "/notice/bg_list",
        data: {
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(e) {
            if (-500 != e.data.sta) if (0 == e.data.sta) if (e.data.data) {
                var i = Math.floor(Math.random() * e.data.data.length);
                t.setData({
                    cover: e.data.data[i]
                });
            } else t.setData({
                cover: "/images/default_cover.jpg"
            }); else t.setData({
                cover: "/images/default_cover.jpg"
            }); else d.login(function() {
                a(t);
            });
        },
        fail: function(a) {
            t.setData({
                cover: "/images/default_cover.jpg"
            });
        }
    });
}

function e(t) {
    console.log(555), console.log(t.data.groupChecked), d.showLoading("正在创建");
    var a = "/images/default_cover.jpg" == t.data.cover ? "" : t.data.cover, i = t.data.pics;
    i.splice(i.length - 1, 1);
    var o = d.getUTCDateInSeconds(t.data.alertDate) + d.getTimeInSeconds(t.data.alertTime), n = t.data.groupChecked ? t.data.groupChecked.gid : "";
    n = t.data.contactStatus ? n : "", n = t.data.mp_gid ? t.data.mp_gid : n;
    var s = {
        bg_img: a,
        title: t.data.title,
        content: t.data.content,
        sign_name: t.data.name,
        pics: i,
        alert_status: t.data.alertStatus ? 1 : 0,
        alert_time: t.data.alertStatus ? o : 0,
        access_token: wx.getStorageSync("accessToken"),
        address: t.data.address,
        mp_gid: n,
        group_only: t.data.groupOnly ? 1 : 0,
        cid: t.data.cid
    };
    t.data.address && (s.longitude = t.data.longitude, s.latitude = t.data.latitude), 
    wx.request({
        url: l.globalData.host + "/notice/create",
        data: s,
        method: "POST",
        success: function(a) {
            d.hideLoading(), -500 != a.data.sta ? 0 == a.data.sta ? a.data.data && wx.redirectTo({
                url: "../detail/detail?nid=" + a.data.data.nid
            }) : d.showFailedToast("创建通知失败，请重试", a.data.msg) : d.login(function() {
                e(t);
            });
        },
        fail: function(t) {
            d.hideLoading(), d.showFailedToast("创建通知失败，请重试");
        }
    });
}

function i(t) {
    d.showLoading("正在保存");
    var a = "/images/default_cover.jpg" == t.data.cover ? "" : t.data.cover, e = t.data.pics;
    e.splice(e.length - 1, 1);
    var o = d.getUTCDateInSeconds(t.data.alertDate) + d.getTimeInSeconds(t.data.alertTime), n = t.data.groupChecked ? t.data.groupChecked.gid : "";
    n = t.data.contactStatus ? n : "";
    var s = {
        nid: t.data.nid,
        bg_img: a,
        title: t.data.title,
        content: t.data.content,
        sign_name: t.data.name,
        pics: e,
        alert_status: t.data.alertStatus ? 1 : 0,
        alert_time: t.data.alertStatus ? o : 0,
        access_token: wx.getStorageSync("accessToken"),
        address: t.data.address,
        mp_gid: n,
        group_only: t.data.groupOnly ? 1 : 0,
        cid: t.data.cid
    };
    t.data.address && (s.longitude = t.data.longitude, s.latitude = t.data.latitude), 
    wx.request({
        url: l.globalData.host + "/notice/update",
        data: s,
        method: "POST",
        success: function(a) {
            d.hideLoading(), -500 != a.data.sta ? 0 == a.data.sta ? wx.navigateBack({
                delta: 1
            }) : d.showFailedToast("更新通知失败，请重试", a.data.msg) : d.login(function() {
                i(t);
            });
        },
        fail: function(t) {
            d.hideLoading(), d.showFailedToast("更新通知失败，请重试");
        }
    });
}

function o(t) {
    wx.chooseLocation({
        success: function(a) {
            console.log(a), t.setData({
                longitude: a.longitude,
                latitude: a.latitude,
                address: a.name
            });
        },
        fail: function(a) {
            var e = a.errMsg;
            console.log(e), e && (e.indexOf("fail auth") > -1 || e.indexOf("fail:auth") > -1) && (wx.openSetting ? wx.showModal({
                title: "提示",
                content: "选择地点需要授权重要通知访问您的地理位置。",
                cancelText: "不想授权",
                confirmText: "去授权",
                confirmColor: "#12b7f5",
                success: function(a) {
                    a.confirm ? wx.openSetting({
                        complete: function(a) {
                            o(t);
                        }
                    }) : a.cancel && d.showModelTips("由于您拒绝授权，因此无法选择地点");
                }
            }) : d.showModelTips("由于您拒绝授权，因此无法选择地点"));
        }
    });
}

function n(t) {
    var a = t.data.groupCards;
    null == a && d.showLoading("加载中..."), wx.request({
        url: l.globalData.host + "/qmp/group/list",
        data: {
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(e) {
            if (null == a && d.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                if (e.data.data) {
                    var i = e.data.data, o = [], s = [];
                    console.log(i);
                    for (var c = 0; c < i.length; c++) {
                        var l = i[c];
                        o.push(l.name), s.push(l.gid);
                    }
                    t.setData({
                        groupCards: o,
                        groupCardsIds: s
                    });
                }
            } else d.showFailedToast("加载失败，请重试", e.data.msg); else d.login(function() {
                n(t), t.setData({
                    unauthorized: !1
                });
            }, function() {
                t.setData({
                    unauthorized: !0
                });
            });
        },
        fail: function(t) {
            null == a && d.hideLoading(), d.showFailedToast("加载失败，请重试");
        }
    });
}

function s(t, a) {
    wx.request({
        url: l.globalData.host + "/common/v1/switch",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            xcx: "notice",
            feature: "group_only"
        },
        method: "GET",
        success: function(a) {
            0 == a.data.sta && 0 == a.data.data.enable && t.setData({
                showGroupOnly: !1,
                groupOnly: !1
            });
        }
    });
}

var d = require("../../utils/util.js"), c = require("../../tmp/tmp.js"), l = getApp();

Page({
    data: {
        nid: "",
        cover: "",
        title: "",
        content: "",
        name: "",
        titleEmpty: !0,
        contentEmpty: !0,
        nameEmpty: !0,
        pics: null,
        alertStatus: !1,
        alertDate: "",
        alertTime: "",
        groupOnly: !1,
        buttonClicked: !1,
        showGroupOnly: !1,
        contactStatus: !1,
        relationDialog: !1,
        groupCards: [],
        groupCardsIds: [],
        modeIndex: 0,
        groupChecked: null,
        address: "",
        recommend: {
            title: "微友名片",
            appid: "wxb141cac5a4da3378",
            qrcode: "https://cdn-xcx-qunsou.weiyoubot.cn/xcx/2017-09-07/e9c4f40e-1dc5-4c51-a1dc-784a4ead71a6.png"
        },
        noticeBoard: l.globalData.noticeBoard,
        textareaHide: !1,
        envVersion: l.globalData.envVersion(),
        focus: !1
    },
    onLoad: function(t) {
        console.log(t);
        var e = wx.getStorageSync("userInfo");
        if (d.isTextEmpty(t.nid)) {
            r = new Date(new Date().getTime() + 36e5);
            this.setData({
                name: e.nickName,
                pics: [ "/images/image_add.png" ],
                alertStatus: !1,
                alertDate: d.formatDate(r, "yyyy-MM-dd"),
                alertTime: d.formatDate(r, "HH:mm"),
                cid: t.cid ? t.cid : "",
                mp_gid: t.mp_gid ? t.mp_gid : "",
                mpName: t.mp_name ? t.mp_name : ""
            });
            var i = wx.getStorageSync("cover");
            i ? this.setData({
                cover: i
            }) : a(this);
        } else {
            wx.setNavigationBarTitle && wx.setNavigationBarTitle({
                title: "编辑重要通知"
            });
            var o = wx.getStorageSync("notice"), l = o.pics;
            l.push("/images/image_add.png");
            var r;
            r = 0 == o.alert_time ? new Date(new Date().getTime() + 36e5) : new Date(1e3 * o.alert_time), 
            this.setData({
                nid: t.nid,
                cover: o.bg_img,
                title: o.title,
                content: o.content,
                contentText: o.content,
                name: o.sign_name,
                pics: l,
                groupOnly: o.group_only,
                address: o.address,
                longitude: o.longitude,
                latitude: o.latitude,
                alertStatus: "1" == o.alert_status,
                alertDate: d.formatDate(r, "yyyy-MM-dd"),
                alertTime: d.formatDate(r, "HH:mm"),
                contactStatus: !!o.mp_gname,
                groupChecked: o.mp_gname ? {
                    gid: o.mp_gid,
                    name: o.mp_gname
                } : null,
                cid: o.cid,
                isOwner: o.is_owner
            }), wx.removeStorageSync("notice"), wx.pageScrollTo && "detail" == t.from && setTimeout(function() {
                wx.pageScrollTo({
                    scrollTop: 2e3
                });
            }, 100);
        }
        this.setData({
            titleEmpty: d.isTextEmpty(this.data.title),
            contentEmpty: d.isTextEmpty(this.data.content),
            nameEmpty: d.isTextEmpty(this.data.name)
        }), c.noticeBoard(this), n(this), s(this);
    },
    onShow: function(t) {
        wx.getShareInfo && this.setData({
            showGroupOnly: !0
        });
    },
    toCover: function() {
        d.buttonClicked(this), wx.navigateTo({
            url: "../cover/cover?nid=" + this.data.nid
        });
    },
    inputTitle: function(t) {
        this.setData({
            titleEmpty: 0 == t.detail.value.length
        });
    },
    clearTitle: function() {
        this.setData({
            title: "",
            titleEmpty: !0
        });
    },
    inputContent: function(t) {
        this.setData({
            contentEmpty: 0 == t.detail.value.length,
            contentText: t.detail.value
        });
    },
    clearContent: function() {
        this.setData({
            content: "",
            contentEmpty: !0
        });
    },
    inputName: function(t) {
        this.setData({
            nameEmpty: 0 == t.detail.value.length
        });
    },
    clearName: function() {
        this.setData({
            name: "",
            nameEmpty: !0
        });
    },
    addPic: function() {
        var t = this;
        t.data.pics.length >= 10 ? d.showModelTips("最多只能上传\b\b\b九张图片") : wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths[0];
                d.showLoading("上传中"), wx.uploadFile({
                    url: l.globalData.host + "/image/v2/upload",
                    filePath: e,
                    name: "file",
                    formData: {},
                    success: function(a) {
                        d.hideLoading();
                        var e = a.data, i = JSON.parse(e).data.url, o = t.data.pics;
                        o.splice(o.length - 1, 0, i), t.setData({
                            pics: o
                        });
                    },
                    fail: function(t) {
                        d.hideLoading(), d.showFailedToast("上传图片失败，请重试");
                    }
                });
            }
        });
    },
    deletePic: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.pics;
        e.splice(a, 1), this.setData({
            pics: e
        });
    },
    openNoticeBoard: function() {
        var t = this.data.noticeBoard;
        t.showUpgradeDialog = 1, this.setData({
            noticeBoard: t,
            textareaHide: !0
        });
    },
    copyUrl: function() {
        var t = "pages/detail/detail?nid=" + this.data.nid;
        wx.setClipboardData({
            data: t,
            success: function(t) {
                d.showModelTips("通知路径复制成功");
            }
        });
    },
    changeAlertStatus: function(t) {
        this.setData({
            alertStatus: t.detail.value
        });
    },
    changeAlertDate: function(t) {
        this.setData({
            alertDate: t.detail.value
        });
    },
    changeAlertTime: function(t) {
        this.setData({
            alertTime: t.detail.value
        });
    },
    changeGroupOnly: function(t) {
        var a = t.detail.value;
        a && d.showModelTips("您已开启了仅限群成员可见，请将通知转发到您想指定的群，仅第一次转发成功的群有效。"), this.setData({
            groupOnly: a
        });
    },
    changeContactStatus: function(t) {
        this.setData({
            contactStatus: t.detail.value
        });
    },
    chooseLocation: function() {
        o(this);
    },
    relationDialog: function() {
        var a = this.data.recommend, e = this;
        wx.showModal({
            title: "温馨提示",
            content: "通知和通讯录关联之后可以方便地查看通讯录成员已读和未读情况。\n点击「创建」开始创建通讯录，完成后再关联通讯录到该通知。",
            confirmText: "\b创建",
            confirmColor: "#1677d2",
            success: function(i) {
                i.confirm ? t(e, a) : i.cancel && console.log("用户点击取消");
            }
        });
    },
    closeRelationDialog: function() {},
    changeMode: function(t) {
        var a = t.detail.value, e = this.data.groupCards, i = this.data.groupCardsIds;
        this.setData({
            modeIndex: a,
            groupChecked: {
                name: e[a],
                gid: i[a]
            }
        });
    },
    createCard: function() {
        d.buttonClicked(this), t(this, this.data.recommend);
    },
    changeFocus: function() {
        this.setData({
            focus: !0
        });
    },
    saveNotice: function(t) {
        var a = t.detail.value.title.trim();
        if (d.isTextEmpty(a)) d.showModelTips("请输入标题"); else {
            var o = t.detail.value.content;
            if (d.isTextEmpty(o)) d.showModelTips("请输入内容"); else {
                var n = t.detail.value.name.trim();
                if (d.isTextEmpty(n)) d.showModelTips("请输入署名"); else {
                    var s = d.hasSensitiveWords(a);
                    if (s) return d.showModelTips("标题包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
                        title: d.replaceAll(a, s)
                    });
                    var c = d.hasSensitiveWords(o);
                    if (c) return d.showModelTips("内容包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
                        content: d.replaceAll(o, c)
                    });
                    var l = d.hasSensitiveWords(n);
                    if (l) return d.showModelTips("署名包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
                        name: d.replaceAll(n, l)
                    });
                    this.setData({
                        title: a,
                        content: o,
                        name: n
                    });
                    var r = "/images/default_cover.jpg" == this.data.cover ? "" : this.data.cover;
                    wx.setStorageSync("cover", r), d.isTextEmpty(this.data.nid) ? e(this) : i(this);
                }
            }
        }
    }
});