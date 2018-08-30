Component({
    properties: {
        submitCount: {
            type: Number,
            value: 0
        },
        isEval: {
            type: Boolean,
            value: !0
        },
        resetTrigger: {
            type: Boolean,
            value: !1,
            observer: function(e, t) {
                e && this.setData({
                    orderType: 0,
                    searchName: "",
                    noRemark: 0
                });
            }
        }
    },
    data: {
        orderType: 0,
        orderTypes: {
            DEFAULT: 0,
            PRAISE: 1,
            SCORE: 2,
            TIME: 3,
            EVAL: 4
        },
        submit_txt: "已提交",
        orderTypeText: {
            0: "时间倒序",
            1: "点赞排序",
            2: "评分排序",
            3: "时间正序",
            4: "评测分排序"
        },
        searchName: "",
        noRemark: !1
    },
    methods: {
        toggleRemark: function(e) {
            var t = this, r = e.detail.choosed;
            this.setData({
                noRemark: e.detail.choosed,
                submit_txt: r ? "未点评" : "已提交"
            }, function() {
                t.triggerEvent("changeSort", {
                    order_type: t.data.orderType,
                    search_user_name: t.data.searchName,
                    no_remark: e.detail.choosed ? 1 : 0
                }, {
                    bubbles: !0
                });
            });
        },
        searchStudent: function(e) {
            var t = this;
            this.setData({
                searchName: e.detail.value
            }, function() {
                t.triggerEvent("changeSort", {
                    order_type: t.data.orderType,
                    search_user_name: e.detail.value,
                    no_remark: t.data.noRemark ? 1 : 0
                }, {
                    bubbles: !0
                });
            });
        },
        toggleOrder: function(e) {
            var t = this;
            this.setData({
                orderType: e.currentTarget.dataset.ordertype
            }, function() {
                t.triggerEvent("changeSort", {
                    order_type: e.currentTarget.dataset.ordertype,
                    search_user_name: t.data.searchName,
                    no_remark: t.data.noRemark ? 1 : 0
                }, {
                    bubbles: !0
                });
            });
        }
    }
});