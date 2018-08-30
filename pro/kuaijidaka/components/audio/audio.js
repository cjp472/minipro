function t(t) {
    var e = t.currentTarget.dataset, n = e.src, i = n, o = e.title || "test", r = s;
    g || a(), c.id && c.id !== i && (d = c, l.stop()), c = {
        id: i,
        src: n
    }, l.title = o, l.src = c.src, l.play(), P[e.index].content[0].waitting = !0;
    var u = {};
    u[f] = P, r.setData(u), l.onPlay(function(t) {
        P[e.index].content[0].waitting = !1;
        var n = {};
        n[f] = P, r.setData(n);
    });
}

function e(t) {
    l.pause();
}

function n(t) {}

function i(t) {
    var e = s, n = v[c.id], i = (t.changedTouches[0].clientX - g.left) / g.width * n.duration;
    n.currentPosition = i, r(P, c.id, n);
    var o = {};
    o[f] = P, e.setData(o), l.seek(i);
}

function o(t, e, n) {
    for (var i = 0; i < t.length; i += 1) if (t[i][0][e] === n || t[i][0].voice && t[i][0].voice[e] === n) return i;
    return -1;
}

function r(t, e, n) {
    var i = function(t) {
        var e = Math.floor(t), n = Math.floor(e / 60), i = e % 60;
        return n < 10 && (n = "0" + n), i < 10 && (i = "0" + i), n + ":" + i;
    };
    void 0 !== n.duration && (n.durationFormatted = i(n.duration)), void 0 !== n.currentPosition && (n.currentPositionFormatted = i(n.currentPosition)), 
    n.duration && n.currentPosition && g.width ? n.sliderHandlePosition = n.currentPosition / n.duration * g.width : n.sliderHandlePosition = 0;
    var r = o(p, "voice_url", e);
    r >= 0 && (p[r][0] = u({}, p[r][0], n));
}

function a() {
    wx.createSelectorQuery && wx.createSelectorQuery().select(".audio-slider").boundingClientRect(function(t) {
        g = t;
    }).exec();
}

var u = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
}, c = {}, d = {}, s = void 0, l = void 0, f = void 0, v = {}, g = void 0, p = [], P = void 0;

module.exports = {
    setup: function(a, u) {
        f = u, P = (s = a).data.hybridTheme.pcHybridTheme;
        var g = s, y = getApp().globalData;
        (l = y.backgroundAudioManager) || (l = wx.getBackgroundAudioManager(), y.backgroundAudioManager = l), 
        l.onTimeUpdate(function() {
            wx.getBackgroundAudioPlayerState({
                complete: function(t) {
                    v[c.id] = t, r(0, c.id, t);
                    var e = {};
                    e[f] = P, g.setData(e);
                }
            });
        }), l.onPlay(function() {
            if (d) {
                var t = v[d.id];
                t && (t.currentPosition = 0, t.status = 0, r(0, d.id, t));
            }
            setTimeout(function() {
                wx.getBackgroundAudioPlayerState({
                    complete: function(t) {
                        v[c.id] = t, r(0, c.id, t);
                        var e = {};
                        e[f] = P, g.setData(e);
                    }
                });
            }, 1e3);
        }), l.onPause(function() {
            wx.getBackgroundAudioPlayerState({
                complete: function(t) {
                    v[c.id] = t, r(0, c.id, t);
                    var e = {};
                    e[f] = P, g.setData(e);
                }
            });
        }), l.onStop(function() {
            if (d) {
                var t = v[d.id];
                if (t) {
                    t.currentPosition = 0, t.status = 0, r(0, d.id, t);
                    var e = {};
                    e[f] = P, g.setData(e);
                }
            }
        }), l.onEnded(function() {
            wx.getBackgroundAudioPlayerState({
                complete: function(e) {
                    v[c.id] = e, e.currentPosition = 0, r(0, c.id, e);
                    var n = {};
                    n[f] = P, g.setData(n), l.src = "null.mp3";
                    var i = o(p, "voice_url", c.id);
                    p[i + 1] && t({
                        currentTarget: {
                            dataset: {
                                src: p[i + 1][0].voice_url,
                                title: p[i + 1][0].voice_name,
                                index: i + 1
                            }
                        }
                    });
                }
            });
        }), l.onError(function() {
            wx.getBackgroundAudioPlayerState({
                complete: function(t) {}
            });
        }), g.playAudio = t, g.pauseAudio = e, g.seekAudioStart = n, g.seekAudioEnd = i;
    },
    setAudiosInHybridContent: function(t) {
        p = t.filter(function(t) {
            return "voice" === t.type || "eval" === t.type || "recording" === t.type;
        }).map(function(t) {
            return t.content;
        });
    }
};