function e(n) {
    t.showLoading("正在发布评论");
    var o = {
        nid: n.data.nid,
        cid: n.data.cid,
        content: n.data.commentContent,
        reply_id: n.data.replyCommentId || "",
        reply_name: n.data.replyName || "",
        access_token: wx.getStorageSync("accessToken")
    };
    wx.request({
        url: a.globalData.host + "/notice/reply",
        data: o,
        method: "POST",
        success: function(a) {
            if (t.hideLoading(), -500 != a.data.sta) if (0 == a.data.sta) if (a.data.data) {
                t.showToast("评论成功");
                var o = n.data.recordIndex;
                if (-1 != o) {
                    var d = getCurrentPages(), i = d[d.length - 2], s = i.data.commentRecords;
                    s[o].reply.push(a.data.data), i.setData({
                        commentRecords: s,
                        needRefresh: !1
                    });
                }
                wx.navigateBack({
                    delta: 1
                });
            } else t.showFailedToast("评论失败，请重试", a.data.msg); else t.showFailedToast("评论失败，请重试", a.data.msg); else t.login(function() {
                e(n);
            });
        },
        fail: function(e) {
            t.hideLoading(), t.showFailedToast("评论失败，请重试");
        }
    });
}

var t = require("../../utils/util.js"), a = getApp();

Page({
    data: {
        recordIndex: -1,
        recordId: "",
        replyCommentId: "",
        replyName: "",
        replyContent: "",
        commentContent: ""
    },
    onLoad: function(e) {
        this.setData({
            nid: e.nid,
            recordIndex: t.isTextEmpty(e.recordIndex) ? -1 : Number(e.recordIndex),
            cid: e.cid,
            replyCommentId: t.isTextEmpty(e.replyCommentId) ? "" : e.replyCommentId,
            replyName: t.isTextEmpty(e.replyName) ? "" : e.replyName,
            replyContent: t.isTextEmpty(e.replyContent) ? "" : e.replyContent
        }), console.log(this.data);
    },
    inputCommentContent: function(e) {
        this.setData({
            commentContent: e.detail.value
        });
    },
    cancel: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    postComment: function() {
        t.isTextEmpty(this.data.commentContent) ? t.showModelTips("请输入评论内容") : e(this);
    },
    postFormId: function(e) {
        t.postFormId(e.detail.formId);
    }
});