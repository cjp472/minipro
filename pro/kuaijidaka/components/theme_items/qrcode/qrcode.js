Component({
    properties: {
        picture_url: {
            type: String,
            value: "",
            observer: function(t, e) {
                this.setData({
                    sessionFrom: "qrcodeurl=" + t + "&title=" + this.data.title,
                    is_custom_on: getApp().globalData.loginUser.is_custom_on
                });
            }
        },
        editedWidth: {
            type: Number,
            value: 630
        },
        editedHeight: {
            type: Number,
            value: 630
        },
        title: {
            type: String,
            value: ""
        },
        applyType: {
            type: String,
            value: ""
        }
    },
    data: {
        is_custom_on: 0,
        sessionFrom: "",
        showModal: !1,
        modalContent: "进入客服消息，发送“6”获取二维码链接"
    },
    attached: function() {
        this.setData({
            sessionFrom: "qrcodeurl=" + this.data.picture_url + "&title=" + this.data.title,
            is_custom_on: getApp().globalData.loginUser.is_custom_on
        });
    },
    methods: {
        recognizeQR: function() {
            1 == this.data.is_custom_on && this.setData({
                showRecSheet: !0
            });
        },
        closeRecSheet: function() {
            this.setData({
                showRecSheet: !1
            });
        },
        pcPreviewQr: function(t) {
            this.triggerEvent("previewQr", {
                src: t.currentTarget.dataset.url
            });
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