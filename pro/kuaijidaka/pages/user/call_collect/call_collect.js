var t = getApp(), e = t.service, a = t.util;

Page({
    data: {
        currentAudioType: "",
        realCallList: [],
        collectList: [],
        showExplain: !1,
        notMy: !1,
        canCall: !1,
        afterCall: !1,
        callFull: !1,
        callEnd: !1,
        callSuccess: !1,
        callTargetRemain: "",
        winnerList: [],
        hybridJson: "",
        title: "",
        userAvatar: "",
        noMore: !1,
        auditing: !1,
        hasOverview: !1
    },
    customData: {
        options: {},
        limit: 10,
        courseType: 0,
        posterUrl: ""
    },
    onLoad: function(t) {
        var s = this;
        e.forAllUser(a.getFullPath(this.route, t), function() {
            t.courseId = parseInt(t.courseId), t.shareUserId = parseInt(t.shareUserId), t.activityId = parseInt(t.activityId), 
            s.customData.options = t, s.initPage();
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#ffffff"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.initPage(), this.setData({
            noMore: !1
        });
    },
    onReachBottom: function() {
        var t = this.data, e = t.callFull, a = t.callEnd, s = t.callSuccess;
        !e && !a || s || this.fetchCallWinner(10, this.data.winnerList.length);
    },
    onShareAppMessage: function() {
        var e = this.customData.options, a = e.courseId, s = e.shareUserId, i = e.activityId;
        return {
            title: "快来帮我获取" + this.data.title + "课程的学习权限",
            desc: "鲸打卡的分享",
            path: "/pages/user/call_collect/call_collect?courseId=" + a + "&shareUserId=" + (s || t.globalData.loginUser.user_id) + "&activityId=" + i,
            imageUrl: "http://static3topen.jingdaka.com/images/call-share-cover.png"
        };
    },
    setAudioType: function(e) {
        this.setData({
            currentAudioType: t.globalData.currentAudioType
        });
    },
    hideExplain: function() {
        this.setData({
            showExplain: !1
        });
    },
    showExplain: function() {
        this.setData({
            showExplain: !0
        });
    },
    initPage: function() {
        var e = t.globalData.loginUser, a = e.user_type_login, s = e.user_id, i = this.customData.options.shareUserId, r = i || s;
        this.setData({
            auditing: t.globalData.auditing,
            isAdmin: 2 === a || 3 === a,
            notMy: s !== parseInt(r)
        }), this.getCourseDetail(), this.getCallDetail();
    },
    getCourseDetail: function() {
        var t = this;
        e.fetchCourseDetail(this.customData.options.courseId, function(e) {
            t.customData.courseType = e.course_type;
            var a = void 0;
            if (e.pay_after_json || e.pay_json) try {
                a = JSON.parse(e.pay_after_json || e.pay_json);
            } catch (t) {
                wx.showToast({
                    title: "解析文本错误"
                });
            }
            t.setData({
                hasOverview: !!(a && a.length > 1),
                hybridJson: e.pay_after_json || e.pay_json,
                title: e.title
            });
        }, function(e) {
            a.showError("获取课程详情失败" + jdkErr.errMsg, t);
        });
    },
    getCallDetail: function(s) {
        var i = this, r = this.customData.options, o = r.shareUserId, n = r.activityId;
        e.fetchCallDetail({
            activity_id: n,
            share_user_id: o || t.globalData.loginUser.user_id,
            pagefrom: 1
        }, function(t) {
            var e = t.publish_status, a = t.free_left, r = t.call_user, o = t.target, n = t.user_avatar, l = t.is_user_call, c = t.shareuser_has_permit, u = o - r.length < 0 ? 0 : o - r.length, h = void 0, d = [];
            for (h = 0; h < u; h++) d[h] = {};
            var f = 0 === a, p = 2 === e, g = c, v = r.concat(d);
            i.setData({
                afterCall: l || g,
                canCall: !!s || !l && !g,
                userAvatar: n,
                realCallList: r,
                callFull: f,
                callEnd: p,
                callSuccess: g,
                collectList: v,
                callTargetRemain: u
            }), !f && !p || g || i.fetchCallWinner(10, 0);
        }, function(t) {
            a.showError("获取活动详情失败" + t.errText, i);
        });
    },
    fetchCallWinner: function(t, s) {
        var i = this;
        if (!this.data.noMore) {
            var r = this.customData.options.courseId;
            e.fetchCallWinner({
                course_id: r,
                limit: t,
                offset: s
            }, function(e) {
                e.user_list = e.user_list.map(function(t) {
                    var e = t.created_at.split("T");
                    return t.created_at = e[0] + " " + e[1].substring(0, 8), t;
                }), i.setData({
                    winnerList: 0 === s ? e.user_list : i.data.winnerList.concat(e.user_list),
                    noMore: t > e.user_list.length
                });
            }, function(t) {
                a.showError("获取免费名单失败" + t.errText, i);
            });
        }
    },
    toCourseOverview: function() {
        var t = this.customData.courseType, e = this.customData.options, a = e.isFrom, s = e.courseId;
        e.shareUserId;
        "overview" === a ? wx.navigateBack({
            delta: 1
        }) : wx.navigateTo({
            url: "/pages/user/course_overview/course_overview?courseId=" + s + "&courseType=" + t
        });
    },
    callSomeone: function() {
        var t = this, s = this.customData.options, i = (s.courseId, s.shareUserId), r = s.activityId, o = this.data;
        o.callFull, o.callEnd;
        e.callSomeone({
            share_user: i,
            activity_id: r
        }, function(e) {
            t.setData({
                afterCall: !0
            }), t.getCallDetail(!0);
        }, function(e) {
            "code" !== e.errType || 1300 !== e.errMsg && 1301 !== e.errMsg && 1305 !== e.errMsg ? (t.initPage(), 
            a.showError(e.errText, t)) : wx.showModal({
                title: "提示",
                content: e.errText,
                showCancel: !1,
                success: function(e) {
                    e.confirm && t.initPage();
                }
            });
        });
    },
    fetchPoster: function() {
        var t = this;
        if (this.customData.posterUrl) wx.previewImage({
            urls: [ this.customData.posterUrl ]
        }); else {
            var s = this.customData.options, i = s.courseId, r = "t" + i + "z" + s.shareUserId + "z" + s.activityId;
            a.showToast("正在生成...", "loading", 3e3), e.fetchActivityPoster({
                type: 1,
                course_id: i,
                scene: r
            }, function(e) {
                a.hideToast(), t.customData.posterUrl = "data:image/gif;base64," + e, wx.previewImage({
                    urls: [ "data:image/gif;base64," + e ]
                });
            }, function(e) {
                a.hideToast(), a.showError("获取海报失败" + e.errText, t);
            });
        }
    },
    getFormId: function(t) {
        e.submitFormId(t.detail.formId);
    }
});