var s = getApp(), t = s.service, o = s.util;

Component({
    properties: {
        denyReason: {
            type: Number,
            value: 3
        },
        tips: {
            type: String,
            value: ""
        },
        codeImg: {
            type: String,
            value: ""
        },
        courseId: {
            type: Number,
            value: 1
        }
    },
    ready: function() {
        this.setData({
            is_custom_on: s.globalData.loginUser.is_custom_on
        });
    },
    data: {
        is_custom_on: 1,
        showModal: !1,
        modalContent: '进入客服消息后，发送"6"获取课程密码链接'
    },
    attached: function() {
        this.customData = {
            password: ""
        };
    },
    methods: {
        inputPassword: function(s) {
            this.customData.password = s.detail.value;
        },
        checkPassword: function() {
            var s = this;
            "" !== this.customData.password ? t.checkPassword(this.data.courseId, this.customData.password, function(t) {
                s.customData.password = "", s.triggerEvent("permissionpass", {});
            }, function(t) {
                var a = t.errType, e = t.errMsg;
                "code" === a && 405 === e ? o.showError("密码错误", s) : o.showError("校验密码失败：" + t.errMsg, s);
            }) : o.showError("请输入密码", this);
        },
        openModalBox: function() {
            this.setData({
                showModal: !0
            });
        },
        modalConfirm: function() {
            this.setData({
                showModal: !1
            });
        }
    }
});