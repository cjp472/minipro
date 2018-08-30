var e = getApp(), t = e.service, o = e.util, n = require("../../../libs/scene-operator.js").sceneOperator;

Page({
    data: {
        topBanner: "",
        discoveryOn: !1,
        discoveryCourseList: [],
        noMore: !1,
        modalOptions: {},
        notAuthorized: !1
    },
    customData: {
        scene: "",
        bannerJump: !1,
        bannerCourseID: 0,
        limit: 10,
        page: 0
    },
    onLoad: function(e) {
        var t = this.customData.limit;
        e.scene ? (this.customData.scene = e.scene, n(e.scene, this)) : this.fetchDiscoveryDetail(t, 0);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var e = this.customData.limit;
        this.setData({
            noMore: !1
        }), this.fetchDiscoveryDetail(e, 0);
    },
    onReachBottom: function() {
        var e = this.customData, t = e.limit, o = e.page;
        this.fetchDiscoveryDetail(t, o + 1);
    },
    onShareAppMessage: function() {
        return {
            title: title,
            desc: "鲸打卡的分享",
            path: "/pages/user/discovery/discovery"
        };
    },
    fetchDiscoveryDetail: function(n, r) {
        var s = this;
        this.data.noMore && r > 0 || (e.util.showToast("加载中...", "loading", 3e3), t.fetchDiscoveryDetail({
            app_id: e.globalData.extAppID,
            page_no: r,
            page_size: n
        }, function(t) {
            0 === t.open_discover ? wx.redirectTo({
                url: "/pages/user/my/my"
            }) : (s.customData.page = r, s.setData({
                discoveryOn: 1 === t.open_discover,
                noMore: t.recommend_course.length < n
            }), 1 === t.open_discover && (s.customData.bannerJump = 1 === t.top_banner_jump_open, 
            s.customData.bannerCourseID = parseInt(t.top_banner_jump_course), s.setData({
                topBanner: t.top_banner_image_url,
                discoveryCourseList: r > 0 ? s.data.discoveryCourseList.concat(t.recommend_course) : t.recommend_course
            }, function() {
                wx.stopPullDownRefresh();
            })), e.util.hideToast());
        }, function(t) {
            "网络错误404" !== t.errText && o.showError("获取发现列表失败（" + t.errText + "）", s), e.util.hideToast();
        }));
    },
    toCourse: function(e, n) {
        var r = this, s = void 0;
        s = e ? this.customData.bannerCourseID : n, t.fetchCourseDetail(s, function(e) {
            var n = e.course_type, r = e.ended_at, i = e.start_at, a = e.summary_enabled, c = e.is_submited, u = e.unlock_number, l = void 0, d = void 0, p = "/pages/user/course_overview/course_overview?courseId=" + s + "&courseType=" + n;
            d = r.split("T")[0] < o.currentBeijingTime() ? r.split("T")[0] : i.split("T")[0] > o.currentBeijingTime() ? i.split("T")[0] : o.currentBeijingTime(), 
            t.checkCoursePermission(s, function(e) {
                e ? l = p : 0 === n ? l = o.getYYMMDD(i) > o.currentBeijingTime() && a ? p : "/pages/user/home/home?courseId=" + s + "&witchDay=" + d : 1 === n ? l = !c && a ? p : "/pages/user_homework/homework_list/homework_list?courseId=" + s + "&type=redirect" : 2 === n && (l = c ? "/pages/user/unlock/unlock?courseId=" + s + "&courseNum=" + (parseInt(u) + 1) : p), 
                wx.navigateTo({
                    url: l
                });
            }, function() {
                wx.navigateTo({
                    url: p
                });
            });
        }, function(e) {
            o.showError("获取课程详情失败" + e.errText + ",请重试", r);
        });
    },
    getUserInfo: function(o) {
        var n = this, r = o.detail, s = o.currentTarget.dataset, i = s.isbanner, a = s.courseid;
        if (r.errMsg.indexOf("ok") > -1) {
            if (!this.customData.bannerJump && i) return;
            e.globalData.loginUser.apsid ? this.toCourse(i, a) : t.signIn(r, function() {
                n.toCourse(i, a);
            }, function(e) {
                wx.showModal({
                    title: "错误",
                    content: "登录失败：" + e.errText + "，请重试",
                    showCancel: !1
                });
            });
        }
    },
    getUserInfo2: function(e) {
        var r = this, s = e.detail;
        s.errMsg.indexOf("ok") > -1 && t.signIn(s, function() {
            o.setDataImproved(r, {
                notAuthorized: !1
            }), n(r.customData.options.scene, r), r.fetchDiscoveryDetail(limit, 0);
        }, function(e) {
            wx.showModal({
                title: "错误",
                content: "登录失败：" + e.errText + "，请重试",
                showCancel: !1
            });
        });
    }
});