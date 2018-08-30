var t = getApp(), e = t.service;

t.util;

Component({
    properties: {
        scene: {
            type: String,
            value: "normal"
        },
        text: {
            type: String,
            value: ""
        },
        buttonStyle: {
            type: String,
            value: ""
        }
    },
    data: {
        userType: 0
    },
    attached: function() {
        t.globalData.loginUser.user_type && this.setData({
            userType: t.globalData.loginUser.user_type
        });
    },
    methods: {
        toggleAdmin: function() {
            var r = t.globalData.loginUser;
            1 != this.data.userType && 1 == r.group_id_status && e.switchUserLoginType("admin", function() {
                wx.redirectTo({
                    url: "/pages/admin/operation/operation"
                });
            });
        },
        toHome: function() {
            "my" === t.globalData.currentIndex ? wx.redirectTo({
                url: "/pages/user/my/my"
            }) : wx.redirectTo({
                url: "/pages/user_sub/to_do_task/to_do_task"
            });
        },
        buttonEvent: function() {
            this.triggerEvent("suspendEvent");
        }
    }
});