var t, e, r, o, n = function(t, e) {
    function r() {
        this.constructor = t;
    }
    for (var o in e) i.call(e, o) && (t[o] = e[o]);
    return r.prototype = e.prototype, t.prototype = new r(), t.__super__ = e.prototype, 
    t;
}, i = {}.hasOwnProperty;

o = require("../../lib/hardcore/scripts/subject_utils"), r = require("../../lib/hardcore/scripts/requests"), 
t = require("../../lib/hardcore/scripts/base_view"), e = require("../../common/data/index-columns"), 
function(i) {
    function s() {
        return s.__super__.constructor.apply(this, arguments);
    }
    n(s, t), s.prototype.data = {
        columns: e.columns
    }, s.prototype.emptyClickCount = 0, s.prototype.onLoad = function(t) {
        var e, n, i, u, c, a, p;
        for (s.__super__.onLoad.call(this, t), c = this, p = [], n = i = 0, u = (a = this.data.columns).length; i < u; n = ++i) e = a[n], 
        p.push(function(t, e, n) {
            return r.get({
                path: "/v2/subject_collection/" + n + "/items",
                data: {
                    count: 7
                },
                loadingKey: e,
                page: c
            }).then(function(e) {
                var r, n, i;
                return n = function() {
                    var t, n, i, s;
                    for (s = [], t = 0, n = (i = e.subject_collection_items).length; t < n; t++) r = i[t], 
                    s.push(o.unifyFields(r));
                    return s;
                }(), c.setData(((i = {})["columns[" + t + "].items"] = n, i));
            });
        }(n, e.name, e.collection_tag));
        return p;
    }, s.prototype.onShareAppMessage = function() {
        return {
            title: "豆瓣评分",
            desc: "豆瓣评分提供最新的电影介绍及评论，包括上映影片的影讯查询。你可以记录想看、在看和看过的电影电视剧,顺便打分、写影评。",
            path: "/pages/index/index"
        };
    }, s.register();
}();