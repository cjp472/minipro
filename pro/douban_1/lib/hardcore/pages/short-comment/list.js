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
    function a() {
        return a.__super__.constructor.apply(this, arguments);
    }
    o(a, t), a.prototype.data = {
        subject: {},
        sort: "latest",
        comment_list: {
            items: [],
            total: 1,
            hasmore: !0
        }
    }, a.prototype.loader = null, a.prototype.onLoad = function(t) {
        return a.__super__.onLoad.call(this, t), this.loader = new e({
            key: "comment_list",
            page: this,
            request: {
                path: "/v2/" + t.type + "/" + t.id + "/interests",
                data: {
                    order_by: this.data.sort
                }
            },
            response: {
                key: "interests",
                transItemFunc: r.parseInterest
            }
        }), this.loader.requestData();
    }, a.prototype.onSortOptionClicked = function(t) {
        var e;
        return e = t.currentTarget.dataset, this.setData({
            sort: e.sort
        }), this.loader.opts.request.data.order_by = e.sort, this.loader.requestData();
    }, a.prototype.onReachBottom = function() {
        if (this.loader) return this.loader.onReachBottom();
    }, a.register();
}();