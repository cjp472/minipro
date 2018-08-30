function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var a = getApp(), e = a.service, s = a.util, i = {
    1: {
        content: "学习次数",
        units: "总次数",
        unit: "次"
    },
    2: {
        content: "评分",
        units: "总评分",
        unit: "分"
    },
    3: {
        content: "测评分",
        units: "总测评分",
        unit: "分"
    },
    4: {
        content: "获赞",
        units: "总次数",
        unit: "次"
    },
    5: {
        content: "积分",
        units: "总积分",
        unit: "分"
    },
    6: {
        content: "答题总分",
        units: "总分",
        unit: "分"
    },
    7: {
        content: "邀请人数",
        units: "总人数",
        unit: "人"
    },
    8: {
        content: "邀请学习次数",
        units: "总人数",
        unit: "人"
    }
}, r = {
    WEEK: 1,
    ALL: 0,
    LAST_WEEK: 2
}, n = {};

n[r.WEEK] = {
    value: r.WEEK,
    text: "本周排行榜",
    className: "tab--week"
}, n[r.ALL] = {
    value: r.ALL,
    text: "总排行榜",
    className: "tab--all"
}, n[r.LAST_WEEK] = {
    value: r.LAST_WEEK,
    text: "上周排行榜",
    className: "tab--last-week"
}, Page({
    data: {
        isLoadingMore: !1,
        maxOffset: !1,
        popup: !1,
        RANK_RULE: i,
        title: "",
        items: [],
        userData: {},
        intrgral_setting: "",
        integral_switch: "",
        submit_user: "",
        rankTypeSelect: [ 5, 4, 2, 3, 6, 1, 7, 8 ],
        RANK_TYPE: r,
        rankTypes: n,
        rankTypeChosen: r.ALL,
        rankTypeOthers: [ r.WEEK, r.LAST_WEEK ],
        rank_type: 0,
        offset: 0,
        limit: 10,
        rankTypeText: "学习次数",
        rankText: "次",
        hasNoData: !0,
        isOffsetLocked: !1,
        isUser: !0,
        adminClass: "",
        usertypeClass: "",
        rankRule: -1,
        sortOptionsHidden: !0,
        canIUseShareButton: !!wx.canIUse && wx.canIUse("button.open-type.share"),
        shareHidden: !0,
        eval_state: 0,
        invitationRank: !1,
        answer_state: 0,
        courseType: 0,
        shutDown: 0,
        teamId: 0,
        hideIwant: !0,
        _isBack: !1,
        _isGettingData: !1,
        _rankType: 0,
        _options: {},
        _currentPath: "",
        _loginUser: {},
        _courseDetail: {}
    },
    customData: {
        isLoading: !1,
        teamId: 0
    },
    onLoad: function(t) {
        var i = this;
        this.customData.course = t, console.log(t);
        this.setData({
            is_bind_partner: !!a.globalData.loginUser.is_bind_partner
        }), this.data._options = t, this.data._currentPath = s.getFullPath(this.route, t), 
        e.forAllUser(this.data._currentPath, function() {
            i.data._loginUser = a.globalData.loginUser;
            i.data._loginUser;
            t.isShare || t.isFromInvite ? e.permissionChecker({
                that: i,
                courseID: t.course_id,
                hasPermission: t.hasPermission
            }, function() {
                i._setupPage();
            }, function(a) {
                "pay" === a.errType ? wx.navigateTo({
                    url: "/pages/user/course_overview/course_overview?courseId=" + t.course_id + "&toPay=true&courseType=" + i.data.courseType
                }) : wx.redirectTo({
                    url: "/pages/user/my/my"
                });
            }) : i._setupPage();
        });
    },
    onShow: function() {
        this.data._isBack && this.initData("refresh");
    },
    onHide: function() {
        this.data._isBack = !0;
    },
    _setupPage: function() {
        var a = this, i = this.data, n = i._options, o = i._loginUser;
        this.data._rankRule = n.rank_rule || -1, this.data.invitationRank = 7 == n.rank_rule || 8 == n.rank_rule, 
        e.fetchCourseDetail(n.course_id, function(i) {
            if (i.shut_down && 1 === o.user_type_login && a.setData({
                shutDown: 1
            }), a.data._courseDetail = i, 1 !== o.user_type_login) {
                var u = [].concat(t(i.manager_user_ids.split(",").map(function(t) {
                    return parseInt(t);
                })), [ i.holded_by_user_id ]);
                3 === o.user_type_login || u.indexOf(o.user_id) >= 0 ? (wx.setNavigationBarColor && wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: "#4f598f"
                }), s.setDataImproved(a, {
                    isUser: !1,
                    adminClass: "admin",
                    usertypeClass: "adminetype"
                })) : e.switchUserLoginType("user");
            }
            a.data._rankType = n.rank_type || r.ALL, s.setDataImproved(a, {
                courseType: i.course_type,
                teamId: i.team_id
            }), a.initData();
        });
    },
    initData: function() {
        var a = this, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "refresh";
        "refresh" === r && (this.data.offset = 0, this.data.maxOffset = !1);
        var n = this.data, o = n._rankType, u = n._rankRule, c = n.offset, d = n.limit, _ = n._options, h = n.invitationRank, l = this.customData.teamId;
        this.data.maxOffset || (this.setData({
            isLoadingMore: !0
        }), e.fetchRankingList(_.course_id, {
            offset: c,
            limit: d,
            rank_type: o,
            rank_rule: u,
            team_id: l
        }, function(e) {
            a.data._isGettingData = !1, a.customData.isLoading = !1, a.setData({
                isLoadingMore: !1
            }), e.rank_data = e.rank_data || [];
            var n = e.rank_data, o = e.user, u = e.rank_rule, c = e.integral_switch, d = e.result_answer, _ = e.result_eval;
            a.setData({
                integral_switch: c
            }), 0 == c && s.showModal("提示", "本课程暂未开通排行榜", !1, "我知道了", function(t) {
                return wx.navigateBack({
                    delta: 1
                }), !1;
            });
            var l = e.intrgral_setting;
            if (l) try {
                (l = JSON.parse(l)).user_integral_show_type = l.user_integral_show_type.split(",");
            } catch (t) {
                l = "";
            }
            o.record.indexOf(".") > -1 && (o.record = Number(o.record).toFixed(1)), n.forEach(function(t) {
                t.record.indexOf(".") > -1 && (t.record = Number(t.record).toFixed(1));
            }), ("" === o.record && (3 == u || 2 == u) || o.rank_num <= 0) && (o.rank_num = "-", 
            o.record = "0");
            var f = i[u].units, p = i[u].unit, g = i[u].content;
            if (0 === a.data.offset) for (var m = 0; m < 3; m++) void 0 !== n[m] && (n[m].raceClass = "no" + (m + 1));
            var k = "loadmore" === r ? [].concat(t(a.data.items), t(n)) : n, v = 0 === k.length;
            a.data.isOffsetLocked = k.length === e.count, a.setData({
                result_answer: d,
                result_eval: _,
                intrgral_setting: l,
                rankTypeText: f,
                rankText: p,
                sortType: g,
                items: k,
                hasNoData: v,
                rankRule: u,
                title: e.course_name,
                sortOptionsHidden: !0,
                eval_state: e.eval_state,
                answer_state: e.answer_state,
                userData: o,
                submit_user: e.submit_user,
                invitationRank: h,
                isTeam: !!a.customData.teamId
            }), wx.setNavigationBarTitle({
                title: e.course_name
            }), 0 == e.rank_data.length && a.setData({
                maxOffset: !0
            }), a.setData({
                hideIwant: !1
            });
        }, function(t) {
            a.data._isGettingData = !1, a.customData.isLoading = !1, s.showError(t.errMsg, a), 
            a.setData({
                isLoadingMore: !1
            });
        }));
    },
    onReachBottom: function() {
        this.data.isOffsetLocked || (this.data.offset = this.data.items.length, this.data.offset > 5 && this.initData("loadmore"));
    },
    changeRankType: function(t) {
        if (!this.customData.isLoading) {
            this.setData({
                maxOffset: !1
            }), this.customData.isLoading = !0;
            var a = this.data, e = a.rankTypeOthers, i = a.rankTypeChosen, r = t.currentTarget.dataset.ranktype;
            e.splice(e.indexOf(r), 1, i), s.setDataImproved(this, {
                rankTypeOthers: e,
                rankTypeChosen: r
            }), this.data._rankType = r, this.data.items = [], this.data.offset = 0, this.data.isOffsetLocked = !1, 
            this.initData();
        }
    },
    onShareAppMessage: function() {
        var t = this.data, a = t.title, s = t.rank_type, i = t._options, r = (t.courseType, 
        t.rankRule), n = "/pages/user/weekly/weekly?course_id=" + i.course_id + "&rank_type=" + s + "&isShare=true&rank_rule=" + r;
        return {
            title: "“" + a + "”排行榜",
            imageUrl: e.getPictureResources().pictureForSharingRank,
            desc: "鲸打卡的分享",
            path: n
        };
    },
    goToRecords: function(t) {
        var a = this.data, e = a._options, s = a.isUser;
        if (!a._courseDetail.is_hide || !s) {
            var i = t.currentTarget.dataset.userid, r = s ? "/pages/user_sub/records_of_course/records_of_course" : "/pages/admin_sub/records_of_course/records_of_course";
            wx.navigateTo({
                url: r + "?courseId=" + e.course_id + "&userId=" + i
            });
        }
    },
    _setThemeColor: function() {
        var t = a.globalData.loginUser;
        t && (2 !== t.user_type_login && 3 !== t.user_type_login || wx.setNavigationBarColor && (wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#4f598f"
        }), this.setData({
            usertypeClass: "adminetype"
        })));
    },
    toAchievement: function() {
        var t = this, a = this.data, i = a._options, r = a.title, n = a.submit_user, o = a.userData;
        s.showToast("正在生成...", "loading", 3e3), e.fetchRankingPicture({
            course_name: r,
            submit_num: n,
            ranking_num: o.rank_num,
            scene: "g" + i.course_id
        }, function(t) {
            wx.previewImage({
                urls: [ t.leaderboard_img_url ]
            });
        }, function(a) {
            s.showError("生成失败：" + a.errMsg, t);
        }, function() {
            s.hideToast();
        });
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
    toggleSortOptions: function() {
        this.setData({
            sortOptionsHidden: !this.data.sortOptionsHidden
        });
    },
    changeSortType: function(t) {
        var a = t.target.dataset.sorttype;
        this.data._isGettingData || a === this.data.rankRule || (this.data._isGettingData = !0, 
        this.data.items = [], this.data.offset = 0, this.data.isOffsetLocked = !1, a = parseInt(a), 
        this.data._rankRule = a, this.data.invitationRank = 7 === a || 8 === a, this.setData({
            maxOffset: !1
        }), this.initData());
    },
    showIntegrationRule: function() {
        this.setData({
            popup: !0
        });
    },
    closePopup: function() {
        this.setData({
            popup: !1
        });
    },
    rankInTeam: function() {
        this.customData.teamId = this.data.teamId, this.initData();
    },
    rankInAll: function() {
        this.customData.teamId = 0, this.initData();
    },
    iWant: function() {
        var t = this.customData.course;
        console.log(t);
        t.course_type;
        var a = void 0;
        a = "/pages/user/course_overview/course_overview?courseId=" + t.course_id + "&courseType=" + t.course_type, 
        wx.navigateTo({
            url: a
        });
    }
});