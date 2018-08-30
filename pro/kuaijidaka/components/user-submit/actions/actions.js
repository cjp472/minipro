var t = require("../behavior.js"), e = getApp(), i = e.service, a = e.util;

Component({
    behaviors: [ t ],
    relations: {
        "../submit/submit": {
            type: "parent"
        }
    },
    properties: {
        page: {
            type: String,
            value: "home"
        },
        visible: {
            type: String,
            value: "all"
        },
        currentAudioType: {
            type: String,
            value: ""
        }
    },
    data: {
        self: !1,
        isAdmin: !1,
        createdAt: "",
        updatedAt: "",
        hasPraised: !1,
        URLComment: "",
        remarksFormatted: [],
        commentsFormatted: [],
        praisesFormatted: [],
        replyInputVisible: !1,
        commentToReply: {},
        replyIsValid: !1,
        replyText: "",
        replyType: 1,
        pageRecord: "",
        createdAtFull: "",
        inputBottom: 0,
        playingVoice: {
            voice_name: "",
            voice_url: ""
        },
        voiceStatus: {}
    },
    attached: function() {
        this.customData = {}, this._setupData();
    },
    methods: {
        goComment: function(t) {
            wx.navigateTo({
                url: this.data.URLComment
            }), i.submitFormId(t.detail.formId);
        },
        goToAdminComment: function(t) {
            var e = t.detail.formId;
            i.submitFormId(e), wx.navigateTo({
                url: "/pages/admin_sub/comments/comments?submitId=" + this.data.submitData.submit_id
            });
        },
        praiseSubmit: function(t) {
            var s = this;
            i.submitFormId(t.detail.formId), i.setPraise(this.data.submitData.submit_id, !this.data.hasPraised, function(t) {
                var i = s.data, n = i.praisesFormatted, o = i.submitData, r = e.globalData.loginUser, m = r.user_id, d = r.user_name;
                if (s.data.hasPraised) {
                    var u = n.findIndex(function(t) {
                        return t.user_id === m;
                    });
                    n.splice(u, 1), a.updateSubmitListObj("praise", !1, {
                        submitId: o.submit_id,
                        data: {
                            user_id: m,
                            user_name: d
                        }
                    });
                } else a.updateSubmitListObj("praise", !0, {
                    submitId: o.submit_id,
                    data: {
                        user_id: m,
                        user_name: d
                    }
                }), n.push({
                    user_id: m,
                    user_name: d
                });
                s.setData({
                    praisesFormatted: n,
                    hasPraised: !s.data.hasPraised
                });
            });
        },
        closeReply: function() {
            this.setData({
                replyInputVisible: !1
            });
        },
        replyUserComment: function(t) {
            var i = t.currentTarget.dataset.comment;
            this.data.isAdmin || i.user_id !== e.globalData.loginUser.user_id ? this.setData({
                replyInputVisible: !0,
                commentToReply: i,
                replyType: 1
            }) : this._deleteComment(i.comment_id);
        },
        replyAdminComment: function(t) {
            var e = t.currentTarget.dataset.comment;
            wx.navigateTo({
                url: this.data.URLComment + "&replytoType=2&replytoCommentId=" + e.remark_id
            });
        },
        inputReply: function(t) {
            this.setData({
                replyText: t.detail.value,
                replyIsValid: !!t.detail.value
            });
        },
        sendReply: function() {
            var t = this, s = this.data, n = s.replyType, o = s.commentToReply, r = s.submitData, m = s.replyText, d = s.commentsFormatted, u = (e.globalData.loginUser, 
            {
                submit_id: r.submit_id,
                comment_type: n,
                replyto_comment_id: 1 === n ? o.comment_id : o.remark_id,
                content: m
            });
            i.replyComment(u, function(e) {
                a.updateSubmitListObj("comment", !0, {
                    submitId: parseInt(r.submit_id),
                    data: e
                }), d.push(e), t.setData({
                    commentsFormatted: d,
                    replyInputVisible: !1
                });
            }, function(e) {
                a.showError("回复失败：" + e.errMsg, t), t.setData({
                    replyInputVisible: !1
                });
            });
        },
        preview: function(t) {
            var e = t.target.dataset.pictures;
            wx.previewImage({
                current: e[0],
                urls: e
            }), this.triggerEvent("preview", {}, {
                bubbles: !0,
                composed: !0
            });
        },
        deleteRemark: function(t) {
            var e = this;
            if (this.data.isAdmin) {
                var s = t.currentTarget.dataset.comment;
                wx.showModal({
                    title: "确认",
                    content: "是否删除这条点评？",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "删除",
                    success: function(t) {
                        t.confirm && i.adminDeleteRemark(s.remark_id, function(t) {
                            var i = s.remark_id, a = e.data.remarksFormatted, n = a.findIndex(function(t) {
                                return t.remark_id === i;
                            });
                            n > -1 && (a.splice(n, 1), e.setData({
                                remarksFormatted: a
                            }));
                        }, function(t) {
                            "code" === t.errType && 107 === t.errMsg && a.showToast("不能删除他人的点评", "none", 2e3);
                        });
                    }
                });
            }
        },
        deleteComment: function(t) {
            var e = this;
            if (this.data.isAdmin) {
                var s = t.currentTarget.dataset.comment;
                wx.showModal({
                    title: "确认",
                    content: "是否删除这条评论？",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "删除",
                    success: function(t) {
                        t.confirm && i.adminDeleteComment(s.comment_id, function(t) {
                            var i = s.comment_id, a = e.data.commentsFormatted, n = a.findIndex(function(t) {
                                return t.comment_id === i;
                            });
                            n > -1 && (a.splice(n, 1), e.setData({
                                commentsFormatted: a
                            }));
                        }, function(t) {
                            a.showToast("删除失败:" + t.errMsg, "none", 2e3);
                        });
                    }
                });
            }
        },
        _setupData: function() {
            var t = e.globalData, i = t.loginUser.user_id, s = (a.getYYMMDD, a.yymmdd), n = this.data.submitData, o = n.user_id, r = n.created_at, m = n.updated_at, d = n.praises, u = n.submit_id, c = n.remarks, l = n.comments, p = (n.praise, 
            o === i), f = 1 !== t.loginUser.user_type_login, _ = f ? "/pages/admin_sub/records_of_course/records_of_course" : "/pages/user_sub/records_of_course/records_of_course", h = s(r), y = s(r).slice(5, -3), g = s(m).slice(5, -3), b = d && d.some(function(t) {
                return t.user_id === i;
            });
            c && c.forEach(function(t) {
                t.voice_list && t.voice_list.forEach(function(t) {
                    t.speedStyle = 0, t.doPlaying = !1;
                });
            }), l && l.forEach(function(t) {
                t.voice_list && t.voice_list.forEach(function(t) {
                    t.speedStyle = 0, t.doPlaying = !1;
                });
            }), this.setData({
                self: p,
                createdAtFull: h,
                createdAt: y,
                updatedAt: g,
                isAdmin: f,
                pageRecord: _,
                hasPraised: b,
                URLComment: "/pages/user_sub/comment/comment?submitId=" + u + "&type=" + (p ? "self" : "other"),
                remarksFormatted: c || [],
                commentsFormatted: l || [],
                praisesFormatted: d || []
            });
        },
        _deleteComment: function(t) {
            var e = this;
            wx.showActionSheet({
                itemList: [ "删除自己的评论" ],
                success: function(s) {
                    0 === s.tapIndex && i.deleteComment(t, function(i) {
                        a.updateSubmitListObj("comment", !1, {
                            submitId: e.data.submitData.submit_id,
                            data: {
                                comment_id: parseInt(t)
                            }
                        });
                        var s = e.data.commentsFormatted, n = s.findIndex(function(e) {
                            return e.comment_id === t;
                        });
                        s.splice(n, 1), e.setData({
                            commentsFormatted: s
                        });
                    }, function(t) {
                        a.showError("删除失败：" + t.errMsg, e);
                    });
                },
                fail: function(t) {},
                complete: function(t) {}
            });
        },
        inputFocus: function(t) {
            var e = this;
            wx.getSystemInfo({
                success: function(i) {
                    if (i.model.toUpperCase().indexOf("MIX") >= 0) {
                        var a = 48 + t.detail.height;
                        e.setData({
                            inputBottom: a
                        });
                    }
                }
            });
        },
        playAudio: function(t) {
            var e = t.detail;
            e.isPlaying = !0, this.setData({
                showAudioControl: !0,
                playingVoice: e
            });
        },
        stopAudio: function(t) {
            var e = t.detail;
            e.isPlaying = !1, this.setData({
                playingVoice: e
            });
        },
        startPlay: function(t) {
            var e = t.detail;
            e.isPlaying = !0, this.setData({
                playingVoice: e
            });
        },
        stopPlay: function(t) {
            var e = t.detail;
            e.isPlaying = !1, this.setData({
                playingVoice: e
            });
        },
        playEnd: function(t) {
            var e = t.detail;
            e.isPlaying = !1, this.setData({
                playingVoice: e
            });
        },
        setAudioType: function(t) {
            this.triggerEvent("audioType");
        },
        voiceUpdate: function(t) {
            this.setData({
                voiceStatus: t.detail
            });
        }
    }
});