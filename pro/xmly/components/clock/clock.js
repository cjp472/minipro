var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Component({
    properties: {
        initTime: {
            type: Number,
            value: 864e5
        },
        endLabel: {
            type: String,
            value: ""
        },
        unit: {
            type: Boolean,
            value: !1
        },
        millisecond: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        step: 100
    },
    attached: function() {
        var e = this, i = this.data, o = i.step, n = i.initTime;
        console.log(void 0 === n ? "undefined" : t(n), n), this.setData({
            time: n
        }), this.timerId = setInterval(function() {
            e.tick();
        }, o);
    },
    detached: function() {
        clearInterval(this.timerId);
    },
    methods: {
        tick: function() {
            var t = this.data, e = t.time, i = t.step;
            if (e - i <= 0) return this.setData({
                time: 0
            }), clearInterval(this.timerId), void this.triggerEvent("end", {}, {
                bubbles: !0,
                composed: !0
            });
            this.setData({
                time: e - i
            });
        }
    }
});