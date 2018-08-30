Component({
    properties: {
        itemName: {
            type: String,
            value: ""
        },
        choosed: {
            type: Boolean,
            value: !1
        },
        page: {
            type: String,
            value: "admin"
        }
    },
    data: {},
    methods: {
        toggleSwitch: function() {
            var e = this;
            this.setData({
                choosed: !this.data.choosed
            }, function() {
                e.triggerEvent("toggleSwitch", {
                    choosed: e.data.choosed
                }, {
                    bubbles: !0,
                    composed: !0
                });
            });
        }
    }
});