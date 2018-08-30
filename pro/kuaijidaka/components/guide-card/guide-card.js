var t = getApp();

Component({
    properties: {
        tips: {
            type: String,
            value: ""
        },
        scene: {
            type: Number,
            value: 1
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
    data: {
        is_custom_on: 1,
        showModal: !1,
        modalContent: '进入客服消息后，发送"6"获取加群链接'
    },
    ready: function() {
        this.setData({
            is_custom_on: t.globalData.loginUser.is_custom_on
        });
    },
    methods: {
        openModalBox: function() {
            this.setData({
                showModal: !0
            });
        },
        modalConfirm: function() {
            this.setData({
                showModal: !1
            });
        },
        goBack: function() {
            getCurrentPages().length > 1 ? wx.navigateBack({
                delta: 1
            }) : "my" === t.globalData.currentIndex ? wx.redirectTo({
                url: "/pages/user/my/my"
            }) : wx.redirectTo({
                url: "/pages/user_sub/to_do_task/to_do_task"
            });
        }
    }
});