var t = getApp(), a = t.service, s = t.util;

Page({
    data: {
        shareHidden: !0,
        userName: "",
        className: "",
        classMember: 0,
        avatar: "",
        groupName: "",
        btnTxt: "去分享",
        canUseShareButton: !!wx.canIUse && wx.canIUse("button.open-type.share")
    },
    customData: {
        inviteCode: "",
        hasInited: !1,
        options: {}
    },
    onLoad: function(t) {
        var e = this;
        a.forAdminOnly(s.getFullPath(this.route, t), function() {
            s.showToast("加载中...", "loading"), e.customData.options = t, e._generateInvitationCode();
        });
    },
    onReady: function() {},
    onShow: function() {
        this.customData.hasInited && this._generateInvitationCode();
    },
    onHide: function() {
        console.log("onHide");
    },
    onUnload: function() {},
    onShareAppMessage: function() {
        return this._generateInvitationCode(), console.log("/pages/user/class_invitation_card/class_invitation_card?invite_code=" + this.customData.inviteCode + "&class_id=" + this.customData.options.class_id), 
        {
            title: "邀请函",
            desc: "来自鲸打卡的邀请函",
            path: "/pages/user_sub/class_invitation_card/class_invitation_card?invite_code=" + this.customData.inviteCode + "&class_id=" + this.customData.options.class_id
        };
    },
    shareClick: function() {
        this.setData({
            shareHidden: !1
        });
    },
    shareClickclose: function() {
        this.setData({
            shareHidden: !0
        });
    },
    _generateInvitationCode: function() {
        var t = this, e = this.customData.options, n = {
            invite_num: parseInt(e.counts),
            class_id: parseInt(e.class_id)
        };
        a.generateClassInvitation(n, function(a) {
            t.setData({
                userName: a.user_name,
                avatar: a.avatar_url,
                className: a.class_name,
                classMember: a.class_members
            }), t.customData.inviteCode = a.invite_code;
        }, function(a) {
            s.showError("生成邀请码失败：" + a.errMsg, t);
        }, function() {
            t.customData.hasInited = !0, s.hideToast();
        });
    }
});