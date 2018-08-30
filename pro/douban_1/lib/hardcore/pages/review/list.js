var t, e, r, o = function(t, e) {
    function r() {
        this.constructor = t;
    }
    for (var o in e) s.call(e, o) && (t[o] = e[o]);
    return r.prototype = e.prototype, t.prototype = new r(), t.__super__ = e.prototype, 
    t;
}, s = {}.hasOwnProperty;

r = require("../../scripts/subject_utils"), t = require("../../scripts/base_view"), 
e = require("../../scripts/reach_bottom_data_loader"), function(s) {
    function i() {
        return i.__super__.constructor.apply(this, arguments);
    }
    o(i, t), i.prototype.data = {
        review_list: {
            items: [],
            total: 1,
            hasmore: !0
        }
    }, i.prototype.loader = null, i.prototype.onLoad = function(t) {
        return i.__super__.onLoad.call(this, t), this.loader = new e({
            key: "review_list",
            page: this,
            request: {
                path: "/v2/" + t.type + "/" + t.id + "/reviews"
            },
            response: {
                key: "reviews",
                transItemFunc: r.parseReview
            }
        }), this.loader.requestData();
    }, i.prototype.onReachBottom = function() {
        if (this.loader) return this.loader.onReachBottom();
    }, i.register();
}();