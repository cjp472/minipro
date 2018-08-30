Component({
    properties: {
        title: {
            type: String,
            value: "提示"
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
        isLargeContent: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        modalCancel: function() {
            this.triggerEvent("modalCancel");
        },
        modalConfirm: function() {
            this.triggerEvent("modalConfirm");
        }
    }
});