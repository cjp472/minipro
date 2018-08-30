var t = getApp();

t.service, t.util;

Component({
    properties: {
        title: {
            type: String,
            value: ""
        },
        tips: {
            type: String,
            value: ""
        },
        placeholder: {
            type: String,
            value: ""
        },
        inputValue: {
            type: String,
            value: "",
            observer: function(t, e) {
                this.setData({
                    inputValue: t
                });
            }
        }
    },
    attached: function() {
        this.customData = {};
    },
    data: {
        groupName: ""
    },
    methods: {
        inputValue: function(t) {
            var e = t.detail.value;
            this.customData.value = e && e.trim() || "";
        },
        confirm: function(t) {
            this.triggerEvent("confirm", {
                value: this.customData.value
            });
        },
        cancel: function(t) {
            this.triggerEvent("cancel");
        }
    }
});