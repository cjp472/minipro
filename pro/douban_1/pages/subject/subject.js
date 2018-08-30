var t, e, n, r, o, a = function(t, e) {
    function n() {
        this.constructor = t;
    }
    for (var r in e) s.call(e, r) && (t[r] = e[r]);
    return n.prototype = e.prototype, t.prototype = new n(), t.__super__ = e.prototype, 
    t;
}, s = {}.hasOwnProperty;

e = require("../../lib/hardcore/scripts/account"), r = require("../../lib/hardcore/scripts/subject_utils"), 
n = require("../../lib/hardcore/scripts/requests"), t = require("../../lib/hardcore/scripts/base_view"), 
function(s) {
    function i() {
        return i.__super__.constructor.apply(this, arguments);
    }
    a(i, t), i.prototype.data = {
        movie: {},
        short_comment: {
            items: [],
            total: 1
        },
        review: {
            items: [],
            total: 1
        },
        mark_status: "unmark",
        mark_btns: [],
        show_launch_app: !1
    }, i.prototype.onLoad = function(t) {
        var e, a, s;
        return i.__super__.onLoad.call(this, t), e = (t = o(t)).id, s = t.type, a = this, 
        n.get({
            path: "/v2/" + s + "/" + e,
            loadingKey: "subject",
            page: this
        }).then(function(t) {
            var e, n, o, s, i, u, c;
            for (wx.setNavigationBarTitle({
                title: t.title
            }), t.rating = r.rating(t.rating, t.null_rating_reason), i = 0, c = (e = [ "durations", "genres", "pubdate", "countries" ]).length; i < c; i++) t[(u = e[i]) + "_str"] = t[u].join(" / ");
            return o = function() {
                var e, n, r, o;
                for (o = [], e = 0, n = (r = t.directors).length; e < n; e++) s = r[e], o.push(s.name + "(导演)");
                return o;
            }().concat(function() {
                var e, r, o, a;
                for (a = [], e = 0, r = (o = t.actors.slice(0, 3)).length; e < r; e++) n = o[e], 
                a.push(n.name);
                return a;
            }()), t.actors_str = o.join(" / "), a.setData({
                movie: t
            });
        }), n.frodo_v2.get({
            path: "/" + s + "/" + e + "/interests",
            data: {
                count: 5,
                following: 1
            },
            loadingKey: "interests",
            page: this
        }).then(function(t) {
            var e;
            return a.setData({
                "short_comment.items": function() {
                    var n, o, a, s;
                    for (s = [], n = 0, o = (a = t.interests).length; n < o; n++) e = a[n], s.push(r.parseInterest(e));
                    return s;
                }(),
                "short_comment.total": t.total
            });
        }), n.frodo_v2.get({
            path: "/" + s + "/" + e + "/reviews",
            data: {
                count: 3
            },
            loadingKey: "reviews",
            page: this
        }).then(function(t) {
            var e;
            return a.setData({
                "review.items": function() {
                    var n, o, a, s;
                    for (s = [], n = 0, o = (a = t.reviews).length; n < o; n++) e = a[n], s.push(r.parseReview(e));
                    return s;
                }(),
                "review.total": t.total
            });
        }), n.frodo_v2.get({
            path: "/" + s + "/" + e + "/rating",
            loadingKey: "rating",
            page: this
        }).then(function(t) {
            return a.setData({
                following: t.following
            });
        });
    }, i.prototype.onShow = function() {
        var t, r, o, a, s, i;
        return a = this.opts, r = a.id, i = a.type, o = this, e.getAccountInfo().then(function() {
            return n.frodo_v2.get({
                path: "/" + i + "/" + r + "/interest",
                loadingKey: "interest",
                page: o
            }).then(function(t) {
                return o.updateMarkStatus(t.status);
            });
        }).catch(function(t) {
            return o.updateMarkStatus("unmark");
        }), t = getApp(), console.log("subject on show. app scene:", t.scene), s = 1036 === t.scene, 
        console.log("show launch app:", s), this.setData({
            show_launch_app: s
        });
    }, i.prototype.onMarkButtonClicked = function(t) {
        var r, o, a, s, i;
        if (r = t.currentTarget.dataset.action, s = this.opts, o = s.id, i = s.type, a = this, 
        "undone" !== r) return e.getUserInfo().then(function(t) {
            if (t.is_normal || t.is_phone_bound) switch (r) {
              case "mark":
              case "doing":
              case "done":
                return wx.navigateTo({
                    url: "/lib/hardcore/pages/subject/mark?action=" + r + "&id=" + o + "&type=" + i
                });

              case "unmark":
                return n.frodo_v2.post({
                    path: "/" + i + "/" + o + "/" + r,
                    loadingKey: "mark",
                    page: a
                }).then(function(t) {
                    return a.updateMarkStatus(t.status);
                });
            } else wx.navigateTo({
                url: "/lib/hardcore/pages/user/bind-phone"
            });
        }).catch(function(t) {
            switch (t.type) {
              case "no_token":
                return wx.navigateTo({
                    url: "/lib/hardcore/pages/user/password-login"
                });

              case "user_not_phone_bound":
                return wx.showModal({
                    title: "无法标记",
                    content: "未绑定手机的用户无法进行此操作",
                    showCancel: !1
                });
            }
        });
        wx.showToast({
            title: "已看过"
        });
    }, i.prototype.onShareAppMessage = function() {
        var t;
        if (t = this.data.movie) return {
            title: t.title,
            desc: t.intro,
            path: "/pages/subject/subject?type=" + t.type + "&id=" + t.id
        };
    }, i.prototype.updateMarkStatus = function(t) {
        var e, n;
        return n = this.opts.type, e = [], "unmark" === t && e.push({
            action: "mark",
            name: "想看"
        }), "mark" === t && e.push({
            action: "unmark",
            name: "取消想看"
        }), "tv" === n && "done" !== t && e.push({
            action: "doing",
            name: "在看"
        }), "done" !== t && e.push({
            action: "done",
            name: "看过"
        }), "done" === t && e.push({
            action: "unmark",
            name: "取消看过"
        }), this.setData({
            mark_status: t,
            mark_btns: e
        });
    }, i.prototype.launchAppError = function(t) {
        return console.log("launch app error:", t), wx.showModal({
            title: "打开失败",
            content: t.detail.errMsg,
            showCancel: !1
        });
    }, i.register();
}(), o = function(t) {
    var e, n, o, a;
    if (t.widgetData) {
        a = r.parseWidgetData(t.widgetData);
        try {
            o = (e = a.movie_infos[0]).subject_type, n = e.subject_id, t.type = o, t.id = n;
        } catch (t) {}
    }
    return t;
};