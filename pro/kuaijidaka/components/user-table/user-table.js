var e = getApp(), o = e.service, t = e.util;

Component({
    properties: {
        current: {
            type: String,
            value: ""
        },
        stopBeforeLogin: {
            type: Boolean,
            value: !1
        },
        showDiscovery: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    attached: function() {
        var t = this;
        void 0 === e.globalData.discoveryOn ? o.fetchDiscoveryDetail({
            app_id: e.globalData.extAppID,
            page_no: 0,
            page_size: 10
        }, function(o) {
            e.globalData.discoveryOn = 1 === o.open_discover, t.setData({
                showDiscovery: !0 === e.globalData.discoveryOn
            });
        }, function(e) {
            wx.showToast({
                title: "获取发现页设置失败（" + e.errText + "）",
                icon: "none"
            });
        }) : this.setData({
            showDiscovery: !0 === e.globalData.discoveryOn
        });
    },
    methods: {
        getFormId: function(e) {
            var t = e.detail.formId;
            o.submitFormId(t);
        },
        goCenter: function(t) {
            var r = t.detail, a = t.currentTarget.dataset, n = (a.isbanner, a.courseid, function() {
                wx.redirectTo({
                    url: "/pages/user_sub/center/center"
                });
            });
            r.errMsg.indexOf("ok") > -1 && (e.globalData.loginUser.apsid ? n() : o.signIn(r, function() {
                n();
            }, function(e) {
                wx.showModal({
                    title: "错误",
                    content: "登录失败：" + e.errText + "，请重试",
                    showCancel: !1
                });
            }));
        },
        goCard: t.debounce(function() {
            "my" === e.globalData.currentIndex ? wx.redirectTo({
                url: "/pages/user/my/my"
            }) : wx.redirectTo({
                url: "/pages/user_sub/to_do_task/to_do_task"
            });
        }, 500),
        goDiscovery: t.debounce(function() {
            wx.redirectTo({
                url: "/pages/user/discovery/discovery"
            });
        }, 500)
    }
});