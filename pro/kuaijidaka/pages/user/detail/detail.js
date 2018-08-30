var e = getApp(), t = e.service, i = e.util;

Page({
    data: {
        shareHidden: !0,
        canUseShareButton: !!wx.canIUse && wx.canIUse("button.open-type.share"),
        signImage: "",
        labelText: {},
        isMine: !1,
        isToday: !1,
        isShare: !1,
        URLCourseHome: "",
        submitData: {},
        showModal: !1,
        modalContent: "",
        notLogin: !1,
        submitId: 0,
        currentAudioType: ""
    },
    customData: {
        options: {},
        currentPath: "",
        backFromArchivementPicture: !1,
        unlockArchivementVisible: !1,
        hasInited: !1,
        afterPreviewingImage: !1
    },
    onLoad: function(s) {
        var o = this, a = this.customData;
        s.submitId = parseInt(s.submitId), a.currentPath = i.getFullPath(this.route, s), 
        a.options = s, a.options.afterPunch = "true" === a.options.afterPunch, t.forUserOnly(a.currentPath, function() {
            var i = e.globalData.collection;
            i && i.courseId == s.courseId ? t.addInviteePointData({
                course_id: i.courseId,
                share_type: i.submitId ? 1 : 2,
                action_type: 1,
                inviter_id: i.inviterId ? i.inviterId : 0,
                submit_id: i.submitId ? i.submitId : 0
            }, function() {
                e.globalData.collection = null, o._setPageAfterLogin();
            }, function() {
                o._setPageAfterLogin();
            }) : o._setPageAfterLogin();
        }, function() {
            i.setDataImproved(o, {
                notLogin: !0,
                submitId: a.options.submitId
            });
        }), this.setData({
            courseType: s.courseType || 0
        });
    },
    onShow: function() {
        var e = this.customData;
        e.backFromArchivementPicture ? this.setData({
            signImageVisible: !!this.data.signImage
        }) : !e.afterPreviewingImage && e.hasInited ? this._getSubmitDetail() : e.afterPreviewingImage = !1;
    },
    onUnload: function() {},
    onShareAppMessage: function(e) {
        var t = this.customData.options.submitId || this.customData.options.submit_id, s = this.customData.options.courseCalendarId || this.customData.options.course_calendar_id, o = this.customData.options.courseId || this.customData.options.course_id;
        return console.log("share:", i.getFullPath(this.route, {
            submitId: t,
            courseCalendarId: s,
            isShare: !0,
            courseId: o
        })), {
            title: this.data.submitData.title,
            desc: "鲸打卡的分享",
            path: i.getFullPath(this.route, {
                submitId: t,
                courseCalendarId: s,
                isShare: !0,
                courseId: o
            })
        };
    },
    shareClick: function(e) {
        this.setData({
            shareHidden: !1
        });
    },
    shareClickclose: function() {
        this.setData({
            shareHidden: !0
        });
    },
    onPullDownRefresh: function() {
        this.data.notLogin || (this._getSubmitDetail(), wx.stopPullDownRefresh());
    },
    _setPageAfterLogin: function() {
        var e = this;
        wx.showShareMenu && wx.showShareMenu({
            withShareTicket: !0
        }), i.setDataImproved(this, {
            isShare: void 0 === this.customData.options.isShare
        }), t.util.showToast("加载中...", "loading", 5e3), t.fetchTopic(this.customData.options.courseCalendarId || this.customData.options.course_calendar_id, function(t) {
            i.setDataImproved(e, {
                auto_unlock_type: t.auto_unlock_type,
                unlock_type: t.unlock_type,
                auto_unlock_threshold: t.auto_unlock_threshold
            });
        }), this._getSubmitDetail();
    },
    closeNO1Praise: function(e) {
        var i = e.detail.formId;
        i && t.submitFormId(i), this.setData({
            NO1PraiseVisible: !1,
            signImageVisible: !!this.data.signImage
        });
    },
    _getSubmitDetail: function(s, o) {
        var a = this;
        t.fetchSubmitDetail(this.customData.options.submit_id || this.customData.options.submitId, function(s) {
            var o = s[0] || {}, n = o.course_type, r = o.course_started_days, c = o.submit_count, u = o.course_calendar_title, h = o.course_calendar_id, d = o.sequence, l = o.sequence_total, m = (o.eval_voice, 
            o.course_id), g = o.created_at, _ = o.start_at, f = o.ended_at, p = o.is_first_submit, v = o.eval_state, I = o.record_at, D = o.create_achieve_card, w = o.off_day_count, b = a.customData, T = b.options, P = b.options, y = P.afterPunch, S = P.submitId;
            T.daySignType && t.collectDataShare({
                course_id: parseInt(m),
                type: "s" === T.daySignType ? 2 : 3
            });
            var k = Math.floor((new Date(f).getTime() - new Date(_).getTime()) / 1e3 / 60 / 60 / 24) + 1;
            k -= w || 0, b.unlockArchivementVisible = !b.hasInited && y && 1 == D && (2 === n ? d === l : 1 !== n && c === k);
            var A = !b.unlockArchivementVisible && !b.hasInited && y && p, C = y ? t.config.HOST + "signday/info2?submit_id=" + S + "&scene=" + a._getScene("s") : "", M = !b.hasInited && y && !A && !b.unlockArchivementVisible;
            wx.setNavigationBarTitle({
                title: o.title
            });
            var x = o.user_id === e.globalData.loginUser.user_id, L = i.currentBeijingTime() === i.getYYMMDD(g), E = !!b.options.isShare, U = !!v, V = {
                topTitle: "第" + r + "天",
                mainButton: U ? "去挑战" : !x && L ? "我要打卡" : "查看其它打卡"
            }, H = {
                topTitle: "" + u,
                mainButton: U ? "去挑战" : x ? "查看其它作业" : "我要提交作业"
            }, B = {
                topTitle: "第" + d + "课",
                mainButton: U ? "去挑战" : x ? "查看其它打卡" : "我要打卡"
            }, F = 2 === n ? B : 1 === n ? H : V, j = "", N = "/pages/user/course_overview/course_overview?courseId=" + m + "&courseType=" + n;
            t.checkCoursePermission(m, function(e) {
                j = e ? N : 2 === n ? N : 1 === n ? "/pages/user_homework/home/home?courseId=" + m + "&courseCalendarId=" + h : "/pages/user/home/home?courseId=" + m + "&witchDay=" + I.split("T")[0], 
                a.setData({
                    URLCourseHome: j
                });
            }, function() {
                j = N, a.setData({
                    URLCourseHome: j
                });
            }), i.setDataImproved(a, {
                submitData: o,
                isEval: U,
                labelText: F,
                isMine: x,
                isToday: L,
                isShare: E,
                URLCourseHome: j,
                NO1PraiseVisible: A,
                signImage: C,
                signImageVisible: M,
                updatedAt: o.created_at.split("+")[0].replace("T", " ")
            }, !0, function() {
                b.unlockArchivementVisible && (a.customData.backFromArchivementPicture = !0, a._drawAchievementPicture());
            });
        }, function(e) {
            "code" !== e.errType || 119 !== e.errMsg ? t.util.showError("获取失败：" + e.errMsg, a) : t.util.showError("此内容已经被删除", a);
        }, function() {
            t.util.hideToast(), a.customData.hasInited = !0;
        });
    },
    _drawAchievementPicture: function() {
        if (this.customData.unlockArchivementVisible) {
            var e = this.data.submitData, s = e.course_id, o = e.course_type, a = this._getAchieveScene(s, o);
            i.showToast("正在生成...", "loading", 5e3), t.fetchAchievementPicture({
                course_id: s,
                scene: a,
                is_new: 1
            }, function(e) {
                wx.previewImage({
                    urls: [ i.formatBase64Image(e) ]
                });
            }, function(e) {
                wx.showModal({
                    title: "错误",
                    content: "生成失败:" + e.errMsg,
                    showCancel: !1
                });
            }, function() {
                i.hideToast();
            });
        } else i.showError("尚未完成课程，无法获取成就卡", this);
    },
    _getAchieveScene: function(e, t) {
        var i = [];
        switch (t) {
          case 0:
            i = [ "c", e, "" ].join("z");
            break;

          case 1:
            i = "h" + (i = [ e ].join("z"));
            break;

          case 2:
            i = "j" + (i = [ e ].join("z"));
        }
        return i;
    },
    daySignPicture: function() {
        var e = t.config.HOST + "signday/info2?submit_id=" + this.customData.options.submitId + "&scene=" + this._getScene("s");
        this.customData.afterPreviewingImage = !0, wx.previewImage({
            urls: [ e ]
        });
    },
    longPicture: function() {
        var e = this, s = this.customData.options;
        i.showToast("正在生成...", "loading", 5e3), t.fetchLongPicture(s.submit_id || s.submitId, this._getScene("l"), function(t) {
            i.hideToast(), e.customData.afterPreviewingImage = !0, wx.previewImage({
                urls: [ t.submit_img_url ]
            });
        }, function(e) {
            i.hideToast(), wx.showModal({
                title: "错误",
                content: "生成失败：" + e.errMsg,
                showCancel: !1
            });
        });
    },
    _getScene: function(e) {
        var t = this.customData.options, i = [ t.submitId, t.courseId, t.courseCalendarId, e ].join("z");
        return console.log("scene:", "d" + i), "d" + i;
    },
    getAchievementCard: function() {
        var e = this, s = this.customData.options;
        t.util.showToast("加载中...", "loading", 5e3), t.fetchLongPictureEval(s.submitId || s.submit_id, this._getScene("a"), function(t) {
            i.hideToast(), e.customData.afterPreviewingImage = !0, wx.previewImage({
                urls: [ t.eval_achievement_card ]
            });
        }, function(t) {
            i.hideToast(), "code" === t.errType && 107 === t.errMsg ? i.showError("只能生成自己测评的成就卡", e) : i.showError("生成失败：" + t.errMsg, e);
        });
    },
    assessAgain: function() {
        var e = this;
        i.showToast("重新评测...", "loading", 5e3), t.retryEval(this.customData.options.submitId, function(t) {
            e._getSubmitDetail();
        }, function(t) {
            var s = t.errType, o = t.errMsg;
            "code" === s ? 427 === o ? i.showError("评测失败：音频文件无效,请重新录音", e) : 424 === o ? wx.showModal({
                title: "提示",
                content: "语音评测额度不足，请联系管理员",
                showCancel: !1,
                confirmText: "我知道了"
            }) : i.showError("评测失败：" + t.errText, e) : i.showError("评测失败：" + t.errText, e);
        }, function() {
            i.hideToast();
        });
    },
    markPreview: function() {
        console.log("event preview pic"), this.customData.afterPreviewingImage = !0;
    },
    goUnlockHome: function() {
        var i = this, s = this.data, o = s.submitData, a = s.isShare, n = o.sequence + 1, r = "/pages/user/unlock/unlock?courseId=" + o.course_id + "&courseNum=" + n, c = function() {
            a ? wx.redirectTo({
                url: r
            }) : (e.globalData.unlock_data = {
                courseNum: n
            }, wx.navigateBack({
                delta: 1
            }));
        };
        t.submitCheck({
            course_id: o.course_id
        }, function(s) {
            var a = "";
            if (s.need_password && s.trial_count > 0 && s.trial_count == o.sequence) {
                switch (s.permit_type) {
                  case 1:
                    a = "输入密码";
                    break;

                  case 3:
                    a = "加入课程群";
                    break;

                  case 4:
                    a = "购买课程";
                }
                i.setData({
                    modalContent: "你已完成所有体验课，如需继续参与，需" + a + "。",
                    showModal: !0
                }), i.modalConfirm = function() {
                    i.setData({
                        showModal: !1
                    }), t.permissionChecker({
                        that: i,
                        courseID: o.course_id,
                        noTrialPass: !0
                    }, function() {
                        c(), e.globalData.permissionPassed = !0;
                    });
                }, i.moadlCancel = function() {
                    i.setData({
                        showModal: !1
                    });
                };
            } else c();
        });
    },
    loginSuccess: function() {
        i.setDataImproved(this, {
            notLogin: !1
        }), this._setPageAfterLogin();
    },
    setAudioType: function(t) {
        this.setData({
            currentAudioType: e.globalData.currentAudioType
        });
    }
});