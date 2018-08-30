var e = require("./sio.js"), t = {
    io: null,
    ioInited: !1,
    handler: {},
    on: function(e, t) {
        return "string" == typeof e && "function" == typeof t && (this.handler[e] = t, !0);
    },
    emit: function(e, t) {
        var s = this.handler[e];
        s && s.call(this, t);
    },
    loginResult: {},
    roomId: "",
    userId: "",
    loginSuccess: !1,
    login: function(e) {
        var t = this, s = this;
        wx.request({
            data: {
                userid: e.userId,
                roomid: e.roomId,
                viewername: e.userName,
                viewertoken: e.password
            },
            method: "GET",
            url: "https://view.csslcloud.net/api/room/login",
            success: function(i) {
                if (s.loginResult = i.data.datas, i.data.success) {
                    var o = s.loginResult.viewer.key;
                    s.src = "wss://" + s.loginResult.pusherNode.primary + "/" + e.roomId + "?sessionid=" + o, 
                    s.roomId = e.roomId, s.userId = e.userId, s.loginSuccess = !0, e.success.call(t);
                } else e.fail && e.fail.call(t, "login error");
            },
            fail: function() {
                e.fail && e.fail.call(this);
            }
        });
    },
    getVideoSrc: function(e, t) {
        var s = this;
        s.loginSuccess ? wx.request({
            data: {
                userid: s.userId,
                roomid: s.roomId
            },
            method: "GET",
            url: "https://zeus.csslcloud.net/api/hls/play",
            success: function(s) {
                return "OK" != s.data.result ? void (e && e.call(t, {
                    success: !1,
                    msg: "请求失败"
                })) : 0 == !s.data.live.status ? void (e && e.call(t, {
                    success: !1,
                    msg: "直播还未开始"
                })) : void (e && e.call(t, {
                    success: !0,
                    src: s.data.live.m3u8
                }));
            },
            fail: function() {}
        }) : e && e.call(t, {
            success: !1,
            msg: "请求失败"
        });
    },
    getHistory: function() {
        var e = this;
        wx.request({
            data: {
                userid: e.userId,
                roomid: e.roomId
            },
            method: "GET",
            url: "https://view.csslcloud.net/api/view/info",
            success: function(t) {
                var s = t.data;
                if (s.success && s.datas) {
                    var i = s.datas.meta;
                    if (i) {
                        var o = i.pageChange;
                        if (o && o.length) {
                            o.sort(function(e, t) {
                                return parseInt(e.time) - parseInt(t.time);
                            });
                            var n = {
                                action: "page_change",
                                time: 0,
                                value: o.pop()
                            };
                            e.emit("page_change", n);
                        }
                    }
                }
            },
            fail: function() {}
        });
    },
    connectIO: function() {
        var t = this;
        t.io = e.default(t.src), t.io.on("connect", function() {
            t.ioInited || (t.initAllListeners(t.io), t.ioInited = !0);
        });
    },
    closeIO: function() {
        this.io.close(), this.ioInited = !1;
    },
    initAllListeners: function(e) {
        var t = this, s = this;
        s.getHistory(), e.on("publish_stream", function(e) {
            var t = JSON.parse(e);
            setTimeout(function() {
                s.emit("publish_stream", t);
            }, 1e4);
        }), e.on("end_stream", function(e) {
            var t = JSON.parse(e);
            setTimeout(function() {
                s.emit("end_stream", t);
            }, 1e4);
        }), e.on("chat_message", function(e) {
            var t = JSON.parse(e);
            s.emit("chat_message", t);
        }), e.on("page_change", function(e) {
            var t = JSON.parse(e);
            setTimeout(function() {
                s.emit("page_change", t);
            }, 1e4);
        }), e.on("draw", function(e) {
            var t = JSON.parse(e);
            setTimeout(function() {
                s.emit("draw", t);
            }, 1e4);
        }), e.on("room_user_count", function(e) {
            s.emit("room_user_count", e);
        }), setTimeout(function() {
            try {
                t.io.emit("room_user_count");
            } catch (e) {}
        }, 1500), setInterval(function() {
            try {
                t.io.emit("room_user_count");
            } catch (e) {}
        }, 15e3);
    },
    sendMsg: function(e) {
        this.io.emit("chat_message", e);
    }
};

module.exports = t;