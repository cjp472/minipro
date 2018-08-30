function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

for (var e = getApp(), a = e.service, i = e.util, s = [], o = [], c = [ "周一", "周二", "周三", "周四", "周五", "周六", "周日" ], n = [], u = 0; u < 7; u++) {
    var r = {
        title: c[u],
        selected: !1,
        id: u
    };
    n.push(r);
}

for (var f = 0; f < 24; f++) s.push(f < 10 ? "0" + f : f + "");

for (var h = 0; h < 60; h++) o.push(h < 10 ? "0" + h : h + "");

Page({
    data: {
        weekText: "每天",
        noticeState: 0,
        showSetting: 0,
        weeks: n,
        minites: o,
        hours: s
    },
    customData: {
        options: {},
        selectedWeek: [],
        fetchData: {
            time: "",
            week: [],
            state: 1
        },
        defaultData: {
            time: "",
            weeks: [],
            state: 0
        }
    },
    onLoad: function(t) {
        this.customData.options = t, this.initNoticeData();
    },
    onShow: function() {},
    initNoticeData: function() {
        var t = this, e = this;
        a.getNoticeConfig(function(e) {
            var a = e.weeks, s = e.time, o = e.state;
            if (s) {
                var c = s.split(":");
                t.customData.fetchData.time = s, t.customData.defaultData.time = s, i.setDataImproved(t, {
                    time: s,
                    value: c
                });
            } else {
                var n = new Date(), u = n.getHours(), r = n.getMinutes();
                t.customData.fetchData.time = (u > 10 ? u : "0" + u) + ":" + (r > 10 ? r : "0" + r), 
                t.customData.defaultData.time = (u > 10 ? u : "0" + u) + ":" + (r > 10 ? r : "0" + r), 
                i.setDataImproved(t, {
                    time: t.customData.fetchData.time,
                    value: [ u, r ]
                });
            }
            i.setDataImproved(t, {
                noticeState: o,
                showSetting: 1 == o
            });
            var f = t.data.weeks;
            if (a && a.length > 0) {
                var h = "", m = 0;
                a.forEach(function(t) {
                    f[parseInt(t)].selected = !0, h += f[parseInt(t)].title + "、", m++;
                }), h = t.formatWeekText(m, h), t.customData.fetchData.weeks = a, t.customData.defaultData.weeks = a, 
                i.setDataImproved(t, {
                    weeks: f,
                    weekText: h
                });
            } else f = f.map(function(t) {
                return t.selected = !0, t;
            }), t.customData.fetchData.weeks = [ 0, 1, 2, 3, 4, 5, 6 ], t.customData.defaultData.weeks = [ 0, 1, 2, 3, 4, 5, 6 ], 
            i.setDataImproved(t, {
                weeks: f
            });
        }, function(t) {
            i.showError(t, e);
        });
    },
    formatWeekText: function(t, e) {
        switch (t) {
          case 0:
            e = "永不";
            break;

          case 7:
            e = "每天";
            break;

          default:
            e = e.slice(0, e.length - 1);
        }
        return e;
    },
    resetNoticeData: function() {
        var e, a = this.data.weeks, s = "", o = 0, c = this.customData.defaultData.weeks;
        a.forEach(function(t) {
            t.selected = !1;
        }), c.forEach(function(t) {
            a[parseInt(t)].selected = !0, s += a[parseInt(t)].title + "、", o++;
        }), s = this.formatWeekText(o, s), i.setDataImproved(this, (e = {
            weeks: this.customData.defaultData.weeks,
            time: this.customData.defaultData.time
        }, t(e, "weeks", a), t(e, "weekText", s), e));
    },
    NoticeStateChange: function(t) {
        var e = t.detail.value;
        e ? (this.resetNoticeData(), i.setDataImproved(this, {
            showSetting: !0,
            noticeState: e
        })) : this.cancelNotice();
    },
    timerChange: function(t) {
        var e = t.detail.value, a = (e = e.map(function(t) {
            return t = t < 10 ? "0" + t : t + "";
        })).toString().replace(",", ":");
        i.setDataImproved(this, {
            value: e,
            time: a
        }), this.customData.fetchData.time = a;
    },
    weekSelected: function(e) {
        var a, s = e.currentTarget.dataset.index, o = this.data.weeks, c = o[s];
        c.selected = !c.selected;
        var n = "", u = 0, r = [];
        o.forEach(function(t, e) {
            t.selected && (n += t.title + "、", u++, r.push(t.id));
        }), n = this.formatWeekText(u, n), this.customData.fetchData.weeks = r, i.setDataImproved(this, (a = {}, 
        t(a, "weeks[" + s + "]", c), t(a, "weekText", n), a));
    },
    tapSubmit: function() {
        this._fetchSubmit(1);
    },
    cancelNotice: function() {
        this._fetchSubmit(0);
    },
    _fetchSubmit: function(t) {
        var e = this, s = this, o = {
            weekDayToRemind: t ? this.customData.fetchData.weeks.join(",") : this.customData.defaultData.weeks.join(","),
            openRemind: t,
            hourToRemind: this.customData.fetchData.time
        };
        a.setNoticeConfig(o, function(t) {
            e.initNoticeData(), i.showToast("保存设置成功", "success", 2e3);
        }, function(t) {
            i.showError(t, s);
        });
    }
});