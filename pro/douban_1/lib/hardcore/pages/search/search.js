var t, e, r, s, n, o, i, a, u, c, h, p = [].indexOf || function(t) {
    for (var e = 0, r = this.length; e < r; e++) if (e in this && this[e] === t) return e;
    return -1;
}, y = function(t, e) {
    function r() {
        this.constructor = t;
    }
    for (var s in e) l.call(e, s) && (t[s] = e[s]);
    return r.prototype = e.prototype, t.prototype = new r(), t.__super__ = e.prototype, 
    t;
}, l = {}.hasOwnProperty;

a = require("../../scripts/subject_utils"), i = require("../../scripts/requests"), 
t = require("../../scripts/base_view"), o = require("../../scripts/pwx"), r = /^(\w+):\/\/([^\/]+)\/(\w+)\/(\d+)$/, 
n = function(t) {
    var e;
    return e = t.uri.match(r), t.type = e[3], t.id = e[4], t;
}, e = function() {
    function t() {}
    var e;
    return e = "search-history", t.prototype.push = function(t) {
        return this.get().then(function(r) {
            if (p.call(r, t) < 0) return r.unshift(t), o.setStorage({
                key: e,
                data: r.slice(0, 10)
            });
        });
    }, t.prototype.get = function() {
        return o.getStorage({
            key: e
        }).then(function(t) {
            return t || [];
        }, function() {
            return [];
        });
    }, t.prototype.clear = function() {
        return o.removeStorage({
            key: e
        });
    }, t;
}(), c = function(t) {
    var e, r;
    return r = [], (e = a.unifyFields(t)).rating.null_reason ? r.push(e.rating.null_reason) : r.push(e.rating.value + "分"), 
    t.author && (r = r.concat(t.author)), t.genres && (r = r.concat(t.genres)), t.pubdate && (r = r.concat(t.pubdate)), 
    e.short_description = r.join("/"), e;
}, function(r) {
    function s() {
        return s.__super__.constructor.apply(this, arguments);
    }
    y(s, t), s.prototype.data = {
        results: [],
        history: [],
        hot_words: [],
        loading: {},
        search: "",
        focus: !1,
        exact_match: !1
    }, s.prototype.emptyClickCount = 0, s.prototype.searchTimer = null, s.prototype.search = "", 
    s.prototype.history = new e(), s.prototype.onLoad = function(t) {
        var e;
        return s.__super__.onLoad.call(this, t), t = h(t), this.requestHotWords(), this.loadHistory(), 
        t.search ? (e = decodeURIComponent(t.search), this.setData({
            search: e,
            focus: !1,
            exact_match: !0
        }), this.requestSearch(e)) : this.setData({
            focus: !0
        });
    }, s.prototype.loadHistory = function() {
        var t;
        return t = this, this.history.get().then(function(e) {
            return t.setData({
                history: e.slice(0, 5)
            });
        });
    }, s.prototype.requestHotWords = function() {
        var t;
        return t = this, i.get({
            path: "/v2/search/hots",
            data: {
                type: this.opts.type
            },
            loadingKey: "hot_words",
            page: this
        }).then(function(e) {
            var r;
            return t.setData({
                hot_words: function() {
                    var t, s, o, i;
                    for (i = [], t = 0, s = (o = e.items.slice(0, 5)).length; t < s; t++) r = o[t], 
                    i.push(n(r));
                    return i;
                }()
            });
        });
    }, s.prototype.onSearchConfirm = function(t) {
        var e;
        return "" !== (e = t.detail.value) ? ("v17622481929" === e && this.showDebugMessage(), 
        this.emptyClickCount = 0, this.history.push(e), this.setData({
            history: this.history.get().slice(0, 5)
        })) : ++this.emptyClickCount >= 7 ? this.showDebugMessage() : void 0;
    }, s.prototype.onSearchInput = function(t) {
        var e, r;
        e = t.detail.value, this.searchTimer && (clearTimeout(this.searchTimer), this.searchTimer = null), 
        e ? this.searchTimer = setTimeout((r = this, function() {
            return r.requestSearch(e);
        }), 300) : this.setData({
            results: []
        });
    }, s.prototype.onClearHistoryClicked = function() {
        return this.history.clear(), this.setData({
            history: []
        });
    }, s.prototype.onHistoryItemClicked = function(t) {
        var e;
        return e = t.currentTarget.dataset.word, this.setData({
            search: e
        }), this.requestSearch(e);
    }, s.prototype.onSearchItemClicked = function() {
        var t;
        return t = this, this.history.push(this.search).then(function() {
            return t.loadHistory();
        });
    }, s.prototype.onCancelSearchClicked = function() {
        return getCurrentPages().length > 1 ? wx.navigateBack() : wx.reLaunch({
            url: "/pages/index/index"
        });
    }, s.prototype.requestSearch = function(t) {
        var e;
        return e = this, this.data.exact_match && "movie" === this.opts.type ? i.movie.get({
            path: "/weixin/search",
            data: {
                q: t
            },
            loadingKey: "search",
            page: this
        }).then(function(r) {
            var s, n;
            return n = function() {
                var t, e, n, o;
                for (o = [], t = 0, e = (n = r.items).length; t < e; t++) s = n[t], o.push(u(s));
                return o;
            }(), e.setSearchResult(t, n);
        }) : i.get({
            path: "/v2/search",
            data: {
                q: t,
                type: this.opts.type
            },
            loadingKey: "search",
            page: this
        }).then(function(r) {
            var s, n;
            return n = function() {
                var t, e, n, o;
                for (o = [], t = 0, e = (n = r.subjects).length; t < e; t++) s = n[t], o.push(c(s));
                return o;
            }(), e.setSearchResult(t, n);
        });
    }, s.prototype.setSearchResult = function(t, e) {
        return this.search = t, this.setData({
            results: e
        });
    }, s.prototype.showDebugMessage = function() {
        var t;
        return t = getApp(), wx.showModal({
            title: "dump info",
            content: JSON.stringify(t.package),
            showCancel: !1
        });
    }, s.register();
}(), h = function(t) {
    var e, r, n, o;
    return t.wxParamData && (e = a.parseWidgetData(t.wxParamData), n = (r = s(e)).search, 
    (o = r.type) && (t.type = o), n && (t.search = n)), t;
}, s = function(t) {
    var e, r, s, n;
    switch (t.type) {
      case 11039:
      case 11038:
        for (e = 0, r = (s = t.slot_list).length; e < r; e++) if ("movie_name" === (n = s[e]).key) return {
            search: n.value,
            type: "movie"
        };
    }
    return {};
}, u = function(t) {
    var e, r, s;
    return e = t.subject_id, s = t.subject_type, r = [], t.rating ? r.push(t.rating + "分") : r.push("暂无评分"), 
    t.type && (r = r.concat(t.type)), {
        id: e,
        type: s,
        name: t.title,
        avatar: t.cover,
        year: t.year,
        short_description: r.join("/"),
        url: "/pages/subject/subject?type=" + s + "&id=" + e
    };
};