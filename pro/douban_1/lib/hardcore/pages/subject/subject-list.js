var e, t, s, r, o, i, n = function(e, t) {
    function s() {
        this.constructor = e;
    }
    for (var r in t) a.call(t, r) && (e[r] = t[r]);
    return s.prototype = t.prototype, e.prototype = new s(), e.__super__ = t.prototype, 
    e;
}, a = {}.hasOwnProperty;

i = require("../../scripts/subject_utils"), e = require("../../scripts/base_view"), 
o = require("../../scripts/requests"), t = require("../../scripts/reach_bottom_data_loader"), 
r = require("../../../../common/data/index-columns"), s = {
    mark: "想看",
    doing: "在看",
    done: "看过"
}, function(a) {
    function u() {
        return u.__super__.constructor.apply(this, arguments);
    }
    n(u, e), u.prototype.data = {
        subject_list: {
            items: [],
            total: 1,
            hasmore: !0
        },
        type: ""
    }, u.prototype.loader = null, u.prototype.onLoad = function(e) {
        var s, n, a, c, p, l;
        switch (u.__super__.onLoad.call(this, e), e.mode, l = e.type, this.setData({
            type: l
        }), e.mode) {
          case "search":
            a = "/v2/search", n = {
                q: e.search,
                type: e.type
            }, c = "subjects", p = i.unifyFields;
            break;

          case "column":
            a = "/v2/subject_collection/" + r.get_column_by_name(e.column).collection_tag + "/items", 
            n = {}, c = "subject_collection_items", p = i.unifyFields;
            break;

          case "user_interests":
            a = "/v2/user/" + e.user_id + "/interests", n = {
                type: e.type,
                status: e.status
            }, c = "interests", p = function(e) {
                return i.unifyFields(e.subject);
            };
            break;

          case "discovery":
            a = "/" + e.type + "/suggestion", n = {}, c = "items", p = i.unifyFields, s = o.frodo_v2;
            break;

          default:
            return;
        }
        return this.loader = new t({
            key: "subject_list",
            page: this,
            request: {
                backend: s,
                path: a,
                data: n
            },
            response: {
                key: c,
                transItemFunc: p
            }
        }), this.loader.requestData();
    }, u.prototype.onReady = function() {
        var e, t, o, i;
        if (u.__super__.onReady.call(this), t = this.opts, e = t.column, t.type, o = t.status, 
        i = function() {
            switch (this.opts.mode) {
              case "search":
                return "搜索结果";

              case "column":
                return r.get_column_by_name(e).title;

              case "user_interests":
                return "全部" + s[o];

              case "discovery":
                return "猜你喜欢";
            }
        }.call(this)) return wx.setNavigationBarTitle({
            title: i
        });
    }, u.prototype.onReachBottom = function() {
        if (this.loader) return this.loader.onReachBottom();
    }, u.register();
}();