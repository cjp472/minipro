var e, t, r, o, s, i = function(e, t) {
    function r() {
        this.constructor = e;
    }
    for (var o in t) n.call(t, o) && (e[o] = t[o]);
    return r.prototype = t.prototype, e.prototype = new r(), e.__super__ = t.prototype, 
    e;
}, n = {}.hasOwnProperty;

s = require("../../scripts/subject_utils"), o = require("../../scripts/requests"), 
e = require("../../scripts/base_view"), t = require("../../scripts/reach_bottom_data_loader"), 
r = require("../../scripts/models/review").ReviewModel, function(n) {
    function a() {
        a.__super__.constructor.apply(this, arguments), this.model = null;
    }
    i(a, e), a.prototype.data = {
        review: {},
        comment_list: {
            items: [],
            total: 0,
            hasmore: !0
        }
    }, a.prototype.loader = null, a.prototype.onLoad = function(e) {
        var i, n;
        return a.__super__.onLoad.call(this, e), i = e.id, n = this, o.get({
            path: "/v2/review/" + i,
            loadingKey: "review",
            page: this
        }).then(function(e) {
            return n.model = new r(e), n.setData({
                review: n.model.json()
            });
        }), this.loader = new t({
            key: "comment_list",
            page: this,
            request: {
                path: "/v2/review/" + i + "/comments"
            },
            response: {
                key: "comments",
                transItemFunc: s.parseComment
            }
        }), this.loader.requestData();
    }, a.prototype.onReachBottom = function() {
        if (this.loader) return this.loader.onReachBottom();
    }, a.register();
}();