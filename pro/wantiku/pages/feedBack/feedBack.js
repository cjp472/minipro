var t = require("../../biz/feedback.js"), a = require("../../config.js");

Page({
    data: {
        theme: a.UIConfig.Theme,
        canSubmit: !1
    },
    onLoad: function(t) {},
    submit: function(a) {
        var e = a.detail.value.content, i = a.detail.value.contact;
        t.feedBackBiz.submit(e, i, function(t) {
            wx.navigateTo({
                url: "../feedBack/chat/chat"
            });
        });
    },
    input: function(t) {
        var a = t.detail.value;
        a && !this.data.canSubmit && this.setData({
            canSubmit: !0
        }), !a.length && this.data.canSubmit && this.setData({
            canSubmit: !1
        });
    }
});