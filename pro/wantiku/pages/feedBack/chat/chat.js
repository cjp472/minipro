var t = require("../../../biz/feedback.js"), e = require("../../../biz/user.js"), a = getApp();

Page({
    data: {
        list: [],
        msgInfo: "",
        height: "",
        msgImg: "",
        imgHide: !1,
        pageIndex: 1,
        avatarImg: "../canvas/icon_touxiang@3x.png",
        disable: !1,
        formId: "",
        inputState: !1,
        confirmState: !1
    },
    _data: {
        disableMsg: !1
    },
    onLoad: function(t) {
        this.getItemHeight(), this.msgList();
        var e = this;
        a.checkContextWithShareOptions(t, function() {
            t.IsShare && e.setData({
                IsShare: t.IsShare
            });
        });
    },
    onShow: function() {},
    bindscroll: function(t) {},
    goBackIndex: function() {
        wx.reLaunch({
            url: "../../index/index"
        });
    },
    getItemHeight: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                console.log(e.windowHeight), t.setData({
                    height: 2 * e.windowHeight - 100 + "rpx",
                    scrollTop: e.windowHeight
                });
            }
        });
    },
    sendSubmit: function(e) {
        var a = this, i = e.detail.target.dataset.id, n = e.detail.formId;
        if (this.data.formId = n, "1" == i) {
            if (!this.data.msgInfo) return;
            if (this.data.msgInfo) {
                var s = {
                    AdminId: 0,
                    AdminPicUrl: "http://www.exam8.com/API/yingyong/images/wantiku.png",
                    CreateDate: "2018-04-19T16:49:21.533",
                    DateStr: "2018-04-19 16:49:21",
                    FBContent: this.data.msgInfo,
                    FBPicUrl: null,
                    IsReply: 0,
                    MinAppPackageId: 0,
                    Mobile: null,
                    NickName: null,
                    PhotoUrl: "",
                    PicRatio: 0,
                    ReplayCount: 0,
                    ReplayId: 0,
                    SubjectName: null,
                    SubjectParentId: 538,
                    UserFBId: 1021708,
                    UserId: 19037714,
                    UserName: null,
                    sign: 0
                };
                a.data.list.push(s);
                a.setData({
                    list: a.data.list
                });
            }
            t.msgInfo({
                FBContent: a.data.msgInfo
            }, function(t) {
                setTimeout(function() {
                    a.msgList();
                }, 1e3), a.formIdMsg(n);
            }), this.setData({
                msgInfo: null
            });
        } else "0" == i && wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var e = t.tempFilePaths, i = {
                    AdminId: 0,
                    AdminPicUrl: "http://www.exam8.com/API/yingyong/images/wantiku.png",
                    CreateDate: "2018-04-19T16:49:21.533",
                    DateStr: "2018-04-19 16:49:21",
                    FBContent: null,
                    FBPicUrl: !0,
                    IsReply: 0,
                    MinAppPackageId: 0,
                    Mobile: null,
                    NickName: null,
                    PhotoUrl: "",
                    PicRatio: 0,
                    ReplayCount: 0,
                    ReplayId: 0,
                    SubjectName: null,
                    SubjectParentId: 538,
                    UserFBId: 1021708,
                    UserId: 19037714,
                    UserName: null,
                    sign: 0
                };
                a.data.list.push(i);
                a.setData({
                    list: a.data.list
                }), a.upload(e), a.formIdMsg(n);
            }
        });
    },
    formIdMsg: function(e) {
        var i = {
            FormId: e,
            OpenId: a.globalData.userData.OpenId,
            CommonParams: a.generateShareOptions(),
            Type: 2
        };
        t.msgFormId(i, function(t) {
            console.log("msgFormId", t);
        });
    },
    msgList: function() {
        var e = this;
        t.msgList({
            Pageindex: this.data.pageIndex
        }, function(t) {
            var a = t.FeedbackList.reverse();
            e.setData({
                list: a
            });
        });
    },
    msgInfo: function(t) {
        this.data.msgInfo = t.detail.value, this.data.msgInfo ? this.setData({
            disable: !0
        }) : this.setData({
            disable: !1
        });
    },
    imagesEnlarge: function(t) {
        var e = t.currentTarget.dataset.imgUrl;
        wx.previewImage({
            current: e,
            urls: [ e ]
        });
    },
    upload: function(t) {
        var a = this, i = t[0];
        e.msgImageInfo(i, function(t) {
            console.log(t), 1 == t.MsgCode ? (wx.showToast({
                title: "图片发送成功",
                duration: 2e3
            }), a.msgList(), a.setData({
                msgImg: t.Url
            })) : wx.showToast({
                title: "头像上传失败",
                image: "/images/icon/icon_tip.png",
                duration: 2e3
            });
        });
    },
    bindscrolltoupper: function() {},
    inputGetFocus: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                inputState: !0
            });
        }, 180), this.setData({
            confirmState: !0
        });
    },
    inputCloseFocus: function() {
        this.setData({
            confirmState: !1,
            inputState: !1
        });
    }
});