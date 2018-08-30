function e(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function t(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

function r(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var n = function e(t, r, n) {
    null === t && (t = Function.prototype);
    var i = Object.getOwnPropertyDescriptor(t, r);
    if (void 0 === i) {
        var o = Object.getPrototypeOf(t);
        return null === o ? void 0 : e(o, r, n);
    }
    if ("value" in i) return i.value;
    var a = i.get;
    if (void 0 !== a) return a.call(n);
}, i = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), o = function() {
    function e() {
        r(this, e), this.loginState = !1, this.urls = {}, this.resultStr = "", this.userInfo = {}, 
        this.action = "save", this.config = {
            agentServer: "https://bwx3.ntalker.com/"
        };
    }
    return i(e, [ {
        key: "replaceProtocol",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            return e ? e.replace(/^https?:\/\//gi, t ? "https://" : "http://") : "";
        }
    }, {
        key: "_getAction",
        value: function() {
            this.action = "action";
        }
    }, {
        key: "_setLoginState",
        value: function() {
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : flase;
            console.log("设置了登陆状态"), this.loginState = !0;
        }
    }, {
        key: "getCurrentPagesUrl",
        value: function() {
            return new Promise(function(e, t) {
                var r = getCurrentPages();
                e(0 == r.length ? "pages/default/index" : r.shift());
            });
        }
    }, {
        key: "wChatUserInfo",
        value: function() {
            var e = this;
            return new Promise(function(t, r) {
                wx.login({
                    success: function(n) {
                        if (console.log("XiaoNeng:BasicSdk.wChatUserInfo->login", "logind"), n.code) {
                            n.code;
                            e.code = n.code, wx.getUserInfo({
                                withCredentials: !0,
                                lang: "zh_CN",
                                success: function(r) {
                                    var n = r.userInfo;
                                    e.encryptedData = r.encryptedData || r.signature || "", e.iv = r.iv, console.log("XiaoNeng:BasicSdk.wChatUserInfo->getUserInfo", r), 
                                    e.uname = n.nickName, e.userInfo = n, t(r);
                                },
                                fail: function(t) {
                                    console.log("XiaoNeng:BasicSdk.wChatUserInfo->getUserInfo", "get user info fail!" + t.errMsg), 
                                    e.uname = "geust", r("获取用户登录态失败！");
                                }
                            });
                        } else console.log("XiaoNeng:BasicSdk.wChatUserInfo->login", "login fail!" + n.errMsg), 
                        r("获取用户登录态失败！");
                    }
                });
            });
        }
    }, {
        key: "_getUid",
        value: function() {
            var e = this.pcid, t = this.siteId;
            e && t && (this.uid = t + "_ISME9754_" + e.substr(0, 21));
        }
    }, {
        key: "_randomChar",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            if (!e) return new Error("strLength is null in _randomChar");
            for (var t = "", r = 0; r < e; r++) t += parseInt(15 * Math.random()).toString(16);
            return t;
        }
    }, {
        key: "_getTime",
        value: function() {
            return new Date().getTime();
        }
    }, {
        key: "_getTimestamp",
        value: function() {
            this.timeTamp = this._getTime();
        }
    }, {
        key: "_getPcid",
        value: function() {
            var e = [ "guest" + this._randomChar(8), this._randomChar(4), this._randomChar(4), this._randomChar(4), this._getTime().toString(16).toUpperCase().substr(-8) + this._randomChar(4) ].join("");
            this.pcid = e;
        }
    }, {
        key: "_getDevice",
        value: function() {
            this.device = 1;
        }
    }, {
        key: "_getPageId",
        value: function() {
            var e = new Date().getTime();
            this.pageid = e;
        }
    }, {
        key: "_getSid",
        value: function() {
            var e = new Date().getTime();
            this.sid = e + this._randomChar(6);
        }
    }, {
        key: "_getScr",
        value: function() {
            var e = this;
            wx.getSystemInfo({
                success: function(t) {
                    e.scr = t.screenWidth + "*" + t.screenHeight;
                },
                fail: function() {
                    e.scr = null;
                }
            });
        }
    }, {
        key: "_getIsVip",
        value: function() {
            this.isvip = 0;
        }
    }, {
        key: "_getUserLevel",
        value: function() {
            this.userlevel = 0;
        }
    }, {
        key: "jsonToXML",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            if (e) {
                var t = [ "<xml>" ], r = [ "action", "url", "siteid", "uname", "device", "isvip", "userlevel", "sid", "pageid", "scr" ];
                for (var n in e) "CreateTime" === n ? t.push("<CreateTime>" + e[n] + "</CreateTime>") : "MsgId" === n ? t.push("<MsgId>" + e[n] + "</MsgId>") : r.indexOf(n) > -1 || t.push("<", n, "><![CDATA[" + e[n] + "]]></", n, ">");
                return t.push("</xml>"), t.join("");
            }
        }
    } ]), e;
}(), a = new (function(a) {
    function s() {
        return r(this, s), e(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this));
    }
    return t(s, o), i(s, [ {
        key: "getCurrentPath",
        value: function() {
            return n(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "getCurrentPagesUrl", this).call(this);
        }
    }, {
        key: "getTrackData",
        value: function(e) {
            var t = Object({
                IV: this.iv,
                FromUserName: this.uid,
                ToUserName: this.originId,
                CreateTime: this.timeTamp,
                MsgId: this.pcid,
                EncryptedData: this.encryptedData,
                JsCode: this.code,
                MsgType: "userinfo",
                action: this.action,
                url: this.currentUrl,
                siteid: this.siteid,
                uname: this.uname,
                device: this.device,
                isvip: this.isvip,
                userlevel: this.userlevel,
                sid: this.sid,
                pageid: this.pageid,
                scr: this.scr
            }, e), r = this.jsonToXML(t);
            return console.log("XiaoNeng:TrackSDK.callTrail data: ", t), r;
        }
    }, {
        key: "callTrail",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (console.log("XiaoNeng:TrackSDK.callTrail", " params:", t), t.originId && "" !== t.originId) {
                if (t.siteId && "" != t.siteId && /\w+\_\d+/gi.test(t.siteId)) return this.originId = t.originId, 
                this.siteId = t.siteId, this.agentServer = t.agentServer || this.config.agentServer, 
                this.getCurrentPath().then(function(t) {
                    return e.currentUrl = t, console.log("XiaoNeng:TrackSDK.callTrail", " getCurrentPath", e.currentUrl), 
                    e.agentServer;
                }).then(function() {
                    if (e._getAction(), e._getDevice(), e._getIsVip(), e._getUserLevel(), e._getSid(), 
                    e._getPcid(), e._getPageId(), e._getScr(), e._getTimestamp(), e._getUid(), e.agentUrl = e.replaceProtocol(e.agentServer) + "/agent/xcx", 
                    e.agentUrl) return n(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "userInfo", e) && n(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "userInfo", e).nickName ? n(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "userInfo", e) : (e.useInfoPromise || (e.useInfoPromise = e.wChatUserInfo()), 
                    e.useInfoPromise);
                    console.error("XiaoNeng:TrackSDK.callTrail", "agentUrl is null!");
                }).then(function(r) {
                    var n = e.getTrackData(t);
                    console.log("XiaoNeng:TrackSDK.callTrail", "XMLData", n), wx.request({
                        url: e.agentUrl,
                        data: n,
                        method: "POST",
                        success: function(e) {
                            console.log("XiaoNeng:TrackSDK.callTrail", "complete", e);
                        },
                        fail: function() {
                            console.error("XiaoNeng:TrackSDK.callTrail", "fail");
                        }
                    });
                }).catch(function(e) {
                    console.error("XiaoNeng:TrackSDK.callTrail", e);
                }), !0;
                console.log("XiaoNeng:TrackSDK.callTrail", "siteId is null or error");
            } else console.log("XiaoNeng:TrackSDK.callTrail", "originId is null");
        }
    } ]), s;
}())();

module.exports = a;