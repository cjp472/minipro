var t = getApp(), e = t.service;

t.util;

Component({
    properties: {
        marginBottom: {
            type: Number,
            value: 40
        },
        marginTop: {
            type: Number,
            value: 40
        }
    },
    data: {
        support: "jdk",
        isUser: !1,
        hideLogoJump: !1,
        timer: null
    },
    ready: function() {
        var t = this, i = getApp().globalData, a = function(i) {
            t.setData({
                hideLogoJump: i.is_hide_logo || 0 === i.audit_state && e.config.version === i.audit_version,
                support: 1 == i.channel ? "jdk" : "ml",
                isUser: 1 === i.user_type_login
            });
        };
        i.loginUser.apsid ? a(i.loginUser) : this.data.timer = setInterval(function() {
            var e = i.loginUser;
            e.apsid && (clearInterval(t.data.timer), a(e));
        }, 1e3);
    },
    detached: function() {
        clearInterval(this.data.timer);
    },
    methods: {
        toInfo: function() {
            wx.navigateTo({
                url: "/pages/admin_sub/intro/intro"
            });
        }
    }
});