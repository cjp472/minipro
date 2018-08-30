var e = getApp(), t = e.service;

e.util;

Component({
    properties: {
        btnStyle: {
            type: String,
            value: ""
        },
        colorTheme: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        getUserInfo: function(e) {
            var n = this, i = e.detail;
            i.errMsg.indexOf("ok") > -1 && t.signIn(i, function() {
                n.triggerEvent("loginSuccess");
            }, function(e) {
                wx.showModal({
                    title: "错误",
                    content: "登录失败：" + e.errText + "，请重试",
                    showCancel: !1
                });
            });
        }
    }
});