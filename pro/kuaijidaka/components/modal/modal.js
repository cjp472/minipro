Component({
    properties: {
        title: {
            type: String,
            value: "提示"
        },
        type: {
            type: String,
            value: "modal"
        },
        sessionFrom: {
            type: String,
            value: ""
        },
        content: {
            type: String,
            value: ""
        },
        needCancel: {
            type: Boolean,
            value: !1
        },
        confirmText: {
            type: String,
            value: "确定"
        },
        containerCancel: {
            type: Boolean,
            value: !0
        },
        cancelText: {
            type: String,
            value: "取消"
        },
        confirmColor: {
            type: String,
            value: "#000"
        },
        cancelColor: {
            type: String,
            value: "#000"
        },
        contentColor: {
            type: String,
            value: "#000"
        },
        extraContentStyle: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        modalCancel: function() {
            this.triggerEvent("modalCancel", {}, {
                bubbles: !0,
                composed: !0
            });
        },
        modalConfirm: function() {
            this.triggerEvent("modalConfirm", {}, {
                bubbles: !0,
                composed: !0
            });
        },
        hideModal: function() {
            this.triggerEvent("hideModal", {}, {
                bubbles: !0,
                composed: !0
            });
        }
    }
});