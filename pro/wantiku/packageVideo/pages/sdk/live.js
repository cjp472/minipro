var e, t, n, o, a, l, i, s, r, c, d, u, m, g, p, h, f, v, N, y, b, A, T, k, I, x, O, w, S, j, C, D, U, X, E, L, _, R, B, F, q, V, P, W, M, Q, J, H, z, K = require("./gssdk"), G = getApp(), Y = K.GS, Z = K.task, ee = K.tool, te = K.DOMParser, ne = !1, oe = !1, ae = !1, le = !1, ie = !1, se = !1, re = !1, ce = null, de = {
    PUSH_QA: "onTagAudio",
    ANSWER_QA: "onQAHighlight",
    CANCEL_QA: "onCancelHighlight"
}, ue = !1, me = null, ge = null, pe = null, he = null, fe = null, ve = null, Ne = null, ye = null, be = null, Ae = null, Te = !1, ke = {}, Ie = 0, xe = 0, Oe = !0, we = {
    USER_STATUS_DEFAULT: 0,
    USER_STATUS_HAVE_AUDIO: 1,
    USER_STATUS_HAVE_VIDEO: 2,
    USER_STATUS_OPEN_AUDIO: 4,
    USER_STATUS_OPEN_VIDEO: 8,
    USER_STATUS_MUTE_AUDIO: 16,
    USER_STATUS_MUTE_VIDEO: 32,
    USER_REQUEST_UPGRADE: 64,
    USER_STATUS_MUTE_CHAT: 128,
    USER_STATUS_FOCUS: 256,
    USER_STATUS_ROLLCALL_START: 512,
    USER_STATUS_ROLLCALL_RESULT: 1024,
    ROLLCALL_NOT_START: 0,
    ROLLCALL_STARTING: 1024,
    ROLLCALL_PRESENT: 512,
    ROLLCALL_ABSENT: 1536,
    WEB_AUDIO_INVITE: 2048,
    WEB_AUDIO_CHATTING: 4096,
    isFilterQuestion: !1,
    isWantToUpgrade: !1,
    isFocus: !0,
    isActive: NaN,
    isMute: !1,
    isAudioInviting: !1,
    isAudioChatting: !1
}, Se = !0, je = 1, Ce = "", De = !1, Ue = 0, Xe = "", Ee = !1, Le = new Array(), _e = null, Re = 0, Be = {
    isWebcastClosed: !1,
    isVideoEnd: !1,
    isVideoWaiting: !1
}, Fe = !1, qe = Ve, Ve = 1e4, Pe = !1, We = !1, Me = {
    sendNum: 0,
    isWebsocket: !0,
    startIntervalTime: null,
    intervalNum: 0
}, Qe = !1, Je = !1, He = !1, ze = !1, Ke = !1, $e = "", Ge = "-1", Ye = 0, Ze = "", et = !1, tt = !1, nt = !1, ot = !1, at = !1, lt = !0, it = !1, st = !1, rt = "", ct = "", dt = -1, ut = !1, mt = "", gt = 0, pt = !1, ht = "http://", ft = "", vt = !1, Nt = null, yt = "", bt = "", At = !1, Tt = 0, kt = {
    authorized: "License 不足",
    unopen: "直播未开始",
    open: "已经开始直播请点击！",
    ended: "直播已经结束！",
    pause: "直播即将进入暂停状态！",
    resume: "直播即将重新开始播放！",
    report: "当前帐号正在登录该直播，请确认后重新登录！"
}, It = !1, xt = !1, Ot = !0, wt = null, St = !0, jt = !1, Pe = !1, Ct = "", Dt = null, Ut = !1, Xt = function() {}, Et = new Array(), Lt = {
    refresh: function() {
        ee.checkObjectIsNull(_e) || (_e.close && _e.close(), _e = null), wt && Y.clearChannel(), 
        Me.startIntervalTime = 0, M = !1, At = !1, ze = !1, clearInterval(void 0), ee.checkObjectIsNull(T) || clearTimeout(T), 
        ee.checkObjectIsNull(k) || clearTimeout(k), Ue = 0, gt = 0, pt = !1, St = !1, jt = !0, 
        Fe = !1, ot = !1, ae = !1, Ae = null, oe = !1, oe = !1, le = !1, re = !1, ne = !1, 
        ie = !1, we.isFilterQuestion = !1, we.isWantToUpgrade = !1, we.isFocus = !0, we.isMute = !1, 
        we.isAudioInviting = !1, we.isAudioChatting = !1, Se = !0, De = !1, Ee = !1, Be = {
            isWebcastClosed: !1,
            isVideoEnd: !1,
            isVideoWaiting: !1
        }, Pe = !1, We = !1, Me = {
            sendNum: 0,
            isWebsocket: !0,
            startIntervalTime: null,
            intervalNum: 0
        }, Qe = !1, Je = !1, He = !1, Ke = !1, et = !1, tt = !1, nt = !1, at = !1, lt = !0, 
        it = !1, st = !1, ut = !1, vt = !1, It = !1, xt = !1, Ot = !0, Ge = "-1", Ne = null, 
        Dt = null, ve = null, D = "", U = "", Ut = !1, i && Lt.sendLeaveInfo();
    },
    init: function(n, o) {
        Nt = G.globalData.channel, M = !0, wt = Nt.id, pt = !1, St = !0, jt = !1;
        var a = {};
        ee.checkObjectIsNull(n.site) && (a.api = "init", a.param = n.site, a.explain = "Parameter site miss", 
        a.type = 2), ee.checkObjectIsNull(n.ownerid) && (a.api = "init", a.param = n.ownerid, 
        a.explain = "Parameter ownerid miss", a.type = 2), ee.checkObjectIsNull(n.authcode) && (a.api = "init", 
        a.param = n.authcode, a.explain = "Parameter authcode miss", a.type = 2), ee.checkObjectIsNull(n.uid) && (n.uid = ""), 
        ee.checkObjectIsNull(n.uname) && (n.uname = ""), ee.checkObjectIsNull(n.encodetype) && (n.encodetype = ""), 
        ee.checkObjectIsNull(n.password) && (n.password = ""), ee.checkObjectIsNull(n.stream) && (n.stream = ""), 
        ee.checkObjectIsNull(n.ownerid) && (n.ownerid = ""), ee.checkObjectIsNull(n.ctx) && (n.ctx = "webcast"), 
        ee.checkObjectIsNull(n.authcode) && (n.authcode = ""), ee.checkObjectIsNull(n.istest) && (n.istest = !1), 
        ee.checkObjectIsNull(n.k) && (n.k = "");
        var l;
        l = n.istest ? "http://" : "https://", "training" === n.ctx ? (l = l + n.site + "/sdk/site/sdk/tra/wxconfig", 
        S = 1) : (l = l + n.site + "/sdk/site/sdk/wxconfig", S = 0), l = l + "?ownerid=" + n.ownerid + "&authcode=" + n.authcode + "&uid=" + n.uid + "&uname=" + n.uname + "&encodetype=" + n.encodetype + "&password=" + n.password + "&stream=" + n.stream + "&istest=" + n.istest + "&k=" + n.k, 
        console.log("init url:" + l), wx.request({
            url: l,
            header: {
                "content-type": "application/json",
                "cache-control": "no-cache"
            },
            success: function(l) {
                var i = l.data;
                if ("success" == i.type) {
                    At = !0, O = n.ownerid, j = i.userId, C = i.uname, w = i.siteid, D = i.idc, U = i.ipowner, 
                    X = i.mainidc, E = i.connectALBSvr, ft = i.connectBakALBSvr, L = i.needVisitALB, 
                    _ = i.optimization, R = i.gcDomain, B = i.gcPort, F = i.array, Q = new Array();
                    for (r = 0; r < F.length; r++) null != F[r].pingUrl && "" != F[r].pingUrl && Q.push({
                        id: F[r].id,
                        code: F[r].code,
                        supported: F[r].supported,
                        name: F[r].name,
                        mainIdc: F[r].mainIdc,
                        selected: !1,
                        description: F[r].description
                    });
                    y = i.videoStatus, x = encodeURIComponent(i.confname), H = i.confname, I = i.confpassword, 
                    V = i.stream, Tt = i.submitInterval, N = i.docPrefix, Ct = i.wordsFilterApi, n.istest || (bt = i.wxx_api, 
                    yt = i.wxx_ws), i.sslSupport && (E = bt + i.connectALBSvr.split(":")[0], ft = bt + i.connectBakALBSvr, 
                    ht = "https://"), e = ht + E + "/albcmd/ping?siteid=" + w + "&responsetype=json&confid=" + O + "&confname=" + x + "&confpasswd=" + I + "&servicetype=" + S + "&userid=" + j + "&idc=" + D + "&ipowner=" + U + "&failover=" + vt + "&mainidc=" + X + "&t=" + Math.random() + "&callback=?", 
                    "" != ft && (t = ht + ft + "/albcmd/ping?siteid=" + w + "&responsetype=json&confid=" + O + "&confname=" + x + "&confpasswd=" + I + "&servicetype=" + S + "&userid=" + j + "&idc=" + D + "&ipowner=" + U + "&failover=" + vt + "&mainidc=" + X + "&t=" + Math.random() + "&callback=?", 
                    Ee = !0), _ && (e = ht + E + "/albcmd/ping?siteid=" + w + "&responsetype=json&confid=" + O + "&confname=" + x + "&confpasswd=" + I + "&servicetype=" + S + "&userid=" + j + "&failover=" + vt + "&mainidc=" + X + "&t=" + Math.random() + "&callback=?", 
                    Ee && (t = ht + ft + "/albcmd/ping?siteid=" + w + "&responsetype=json&confid=" + O + "&confname=" + x + "&confpasswd=" + I + "&servicetype=" + S + "&userid=" + j + "&failover=" + vt + "&mainidc=" + X + "&t=" + Math.random() + "&callback=?")), 
                    o.call(void 0, {
                        userid: j,
                        channel: Nt
                    });
                    for (var s = [ "submitChat", "submitQuestion", "submitVote", "submitChatTo", "submitRollcall", "submitNetChoice", "requireNetSettings", "onPublicChat", "onPriChat" ], r = 0; r < s.length; r++) _t.bind(s[r]);
                    q = new Z({
                        executedImmediately: i.realTimeHlsEnabled,
                        hTasks: []
                    }), _t.send("onDataReady", {
                        minInterval: Tt
                    }), q.addTaskFunction("ppt_module", function(e) {
                        _t.send("onDocChange", e);
                    }, null), q.addTaskFunction("anno_sdk", function(e) {
                        _t.send("onAnnotation", e);
                    }, null), q.addTaskFunction("annoFirst", function(e) {
                        _t.send("onInitAnno", e);
                    }, null), Lt.visitALB();
                } else a.api = "init", a.param = i, a.explain = "Background check is not passed:" + JSON.stringify(i) + "-----type:" + i.type + "-----desc:" + i.desc, 
                a.type = 1, ee.checkObjectIsNull(a) || _t.send("onAPIError", a);
            },
            fail: function(e) {
                a.api = "init", a.param = "site:" + n.site, a.explain = "fail:" + e.errMsg, a.type = 1, 
                ee.checkObjectIsNull(a) || _t.send("onAPIError", a);
            }
        });
    },
    getIDCArray: function() {
        var e = new Array();
        if (1 != L) return e;
        for (var t = 0; t < Q.length; t++) if ("true" != Q[t].mainIdc) {
            var n = {};
            n.selected = D == Q[t].code, n.label = Q[t].description, e.push(n);
        }
        return e;
    },
    visitALB: function() {
        ee.checkObjectIsNull(e) || "https://" != ht || -1 != e.indexOf("sslsupport = true") || (e = e.replace("http://", ht), 
        e = e.replace("callback=?", "sslsupport=true") + "&callback=?"), ee.checkObjectIsNull(t) || "https://" != ht || -1 != t.indexOf("sslsupport = true") || (t = t.replace("http://", ht), 
        t = t.replace("callback=?", "sslsupport=true") + "&callback=?"), !ee.checkObjectIsNull(e) && e.indexOf("hls=true") < 0 && (e = e.replace("callback=?", "hls=true") + "&callback=?"), 
        !ee.checkObjectIsNull(t) && t.indexOf("hls=true") < 0 && (t = t.replace("callback=?", "hls=true") + "&callback=?"), 
        1 != L ? Lt.ALBNextFn({
            connectsvr: R,
            topsvr: R + ":" + B
        }) : pt || (gt < 3 ? (ee.checkObjectIsNull(e) ? console.log("[visitALB]The ALBurl is undefined.") : (console.log("[visitALB] the url is: " + e), 
        gt++, Lt.getJSON(e), mt = ht + ft, k = setTimeout(Lt.visitALB, 1e4)), console.log("ALBTimeoutObj" + k)) : (console.log("checkObjectIsNull(ALBBakUrl):" + ee.checkObjectIsNull(t) + ";isOpenBak:" + Ee + ";result:" + (ee.checkObjectIsNull(t) || !Ee)), 
        ee.checkObjectIsNull(t) || !Ee ? (console.log("[ALBBakUrl]The ALBBakUrl is undefined,to  alburl,alburl:" + e), 
        gt++, Lt.getJSON(e), gt = 0, mt = ht + E, k = setTimeout(Lt.visitALB, 1e4)) : (console.log("[ALBBakUrl] the ALBBakUrl is: " + t), 
        gt++, Lt.getJSON(t), gt = 0, mt = ht + ft, k = setTimeout(Lt.visitALB, 1e4))));
    },
    pingresult: function(e) {
        if (console.log("pingresultpingresult:" + e), ee.checkObjectIsNull(k) || clearTimeout(k), 
        ee.checkObjectIsNull(T) || (console.log("[pingresult]The ALBTimeoutResultObj:" + T), 
        clearTimeout(T)), pt) console.log("[pingresult]Visit ALB already back is success."); else {
            gt--, console.log("[pingresult]Visit ALB success.");
            var t = {};
            ee.checkObjectIsNull(e) ? t.result = "-1" : (t = e, console.log(t.connectsvr)), 
            "-1" == t.result ? console.log("[pingresult]Return the results no data") : "2" == t.result || "4" == t.result ? (console.log("[pingresult]LAB connection failure, the reason is " + t.result), 
            T = setTimeout(Lt.visitALB, 1e4), console.log("[pingresult]LAB connection failure, the reason is " + t.result), 
            T = setTimeout(Lt.visitALB, 1e4)) : "5" == t.result ? (console.log("[pingresult]LAB connection failure, the reason is " + t.result), 
            Lt.jumpTipInfo("no_enough_authorized"), A = function() {}) : "3" == t.result || "6" == t.result ? (console.log("[pingresult]LAB connection failure, the reason is " + t.result), 
            oe ? T = setTimeout(Lt.visitALB, 1e4) : (Lt.jumpTipInfo("live_unopen"), A = function() {}, 
            T = setTimeout(Lt.visitALB, 1e4))) : "0" == t.result && (pt = !0, D = t.idcid, ut = !0, 
            U = t.ipowner, Lt.ALBNextFn(t));
        }
    },
    iosVersion: function(e) {
        var t = e.split(" "), n = 0;
        if (t && t.length > 1) {
            var o = t[1], a = o.indexOf(".");
            a > 0 && (n = o.substr(0, a), n = isNaN(n) ? 0 : Number(n));
        }
        return n;
    },
    ALBNextFn: function(e) {
        dt = -1, ee.checkObjectIsNull(e.topsvr) || (ct = e.topsvr), b = bt + e.connectsvr;
        var t = "";
        wx.getSystemInfo({
            success: function(e) {
                (t = e.model).toLowerCase().indexOf("iphone") >= 0 ? (Ye = Lt.iosVersion(e.system), 
                rt = !1, t = 24) : (rt = !0, t = 23);
            }
        });
        var n = ht + b + "/httpstreamcmd/open/" + O + "?servicetype=" + S + "&topsvr=" + ct + "&userid=" + j + "&siteid=" + w + "&username=" + encodeURIComponent(C) + "&failover=" + it + "&jointype=" + t, o = "open/" + O + "?servicetype=" + S + "&topsvr=" + ct + "&userid=" + j + "&siteid=" + w + "&username=" + encodeURIComponent(C) + "&failover=" + ot + "&jointype=" + t;
        if (e.forcehttp && "" == bt && (Xe = e.cdn1, Ze = e.cdn2, (void 0 != Xe && "" != ee.trim(Xe) || void 0 != Ze && "" != ee.trim(Ze)) && (o += "&cdn=true", 
        n += "&cdn=true", De = !0)), o += "&callback=?", n += "&callback=?", Fe) Lt.visitWebUrl(n); else try {
            var a = {};
            a.path = "gensee_websocket", ee.checkObjectIsNull(_e) || _e.close && _e.close(), 
            "https://" == ht ? (a.connect = "wss://" + b, a.port = "443") : (a.connect = "ws://" + b, 
            a.port = "80"), "" != yt && yt != bt && (a.connect = a.connect.replace(bt, yt)), 
            (_e = wx.connectSocket({
                url: a.connect + ":" + a.port + "/gensee_websocket"
            })).onOpen(function() {
                We = !0, console.log("WebSocket连接已打开！"), st = !0, clearTimeout(k), clearTimeout(T), 
                clearInterval(void 0), setTimeout(function() {
                    at || (console.log("[websocket]:websock is not accept message"), lt = !1, ee.checkObjectIsNull(_e) || _e.close && _e.close());
                }, 1e4), _e.send({
                    data: o,
                    success: function() {
                        return console.log("success"), !0;
                    },
                    fail: function() {
                        console.log("fail");
                    }
                });
            }), _e.onMessage(function(e) {
                console.log("收到服务器信息：" + e.data);
                try {
                    Lt.evalstr(e.data);
                } catch (e) {
                    console.log("deal data is exception," + e);
                }
            }), Xt = function() {
                clearInterval(void 0), Ue = 0, st = !1, We = !1, Lt.expire();
            }, _e.onClose(function(e) {
                console.log("WebSocket 已关闭！:" + JSON.stringify(e)), _e = null, Xt();
            }), _e.onError(function(e) {
                console.log("WebSocket连接打开失败，请检查！：" + JSON.stringify(e)), Fe = !0;
            });
        } catch (e) {
            console.log(e), Lt.visitWebUrl(n);
        }
    },
    visitWebUrl: function(e) {
        ee.checkObjectIsNull(e) ? console.log("[visitWebUrl] the url is undefined.") : (console.log("[visitWebUrl] the url is: " + e), 
        Lt.getJSON(e));
    },
    joinresult: function(e) {
        at = !0, console.log("[joinresult]the callback is success."), ee.checkObjectIsNull(e) ? console.log("[joinresult] the data is undefined.") : "0" == e.result ? (vt = "true", 
        ot = "true", console.log("6执行joinresult " + JSON.stringify(e)), "2" == y ? (console.log("61执行joinresult " + JSON.stringify(e)), 
        Lt.timeoutDeal(e)) : setTimeout(function() {
            Lt.timeoutDeal(e);
        }, 1e4)) : "1" == e.result ? (_e.onError(function(e) {
            clearInterval(void 0);
        }), console.log("[[joinresult connection alb]]Join in webcast is fail,the reason is " + e.result + ";to connection alb."), 
        Lt.jumpTipInfo("no_enough_authorized")) : "2" == e.result ? (console.log("[[joinresult connection alb]]Join in webcast is fail,the reason is " + e.result + ";to connection alb."), 
        Lt.jumpTipInfo("report_login")) : "3" == e.result ? (console.log("subserver alb no connect" + e.result), 
        Lt.jumpTipInfo("lock_ip")) : "4" == e.result ? (console.log("subserver alb no connect" + e.result), 
        Lt.expire()) : (console.log("[joinresult]Join in webcast is fail,the reason is " + e.result), 
        Lt.jumpTipInfo(JUMPTYPE_TIP_NOT_ENOUGH));
    },
    timeoutDeal: function(e) {
        if (ot) try {
            _t.send("onAnnoClear", {});
        } catch (e) {
            console.log(e.message);
        }
        console.log("7执行timeoutDeal " + JSON.stringify(e)), console.log("[joinresult]Join in webcast is success:" + JSON.stringify(e)), 
        n = e.sessionid, ee.checkObjectIsNull(e.lowvideourl) || "" == e.lowvideourl || (nt = !0), 
        Lt.urlCdnDetail(e.streamurl, e.audioonlyurl, e.lowvideourl), tt ? (console.log("[joinresult]the sessionInvalid is true"), 
        tt = !1, ee.checkObjectIsNull(e.audioonlyurl) || (et = !0), Lt.videoFn(f, h, v), 
        Lt.audioFn(f, h, v)) : (Lt.audioFn(f, h, v), Lt.videoFn(f, h, v)), Lt.joinwebcastNextFn(e);
    },
    videoFn: function(e, t, n) {
        if (console.log("5执行videoFn " + e), "-1" == Ge) {
            Ge = V;
            var o = {};
            o.target = "", o.option = "multistream", o.enable = nt, _t.send("onSetting", o);
        }
        p = "0" == Ge && nt ? h : f, g = v, console.log("[videoFn] The play url :" + p + ";videoUrl=" + f + ";lowvideoUrl=" + h + ";audioUrl=" + v), 
        De && Lt.urlChangeDetail() && (p = "0" == Ge && nt ? h : f, g = v, console.log("cdn change:" + p)), 
        _t.send("onVideoUrl", p), Ke = !0, Lt.jumpTipInfo("could_start_play"), A = function() {};
    },
    audioFn: function(e, t, n) {
        z = v, g = e, console.log("[audioFn] The audio url :" + v + ";playAudioUrl=" + z + ";audio=" + g), 
        De && Lt.urlChangeDetail() && (z = v, g = f, console.log("cdn change:" + z)), _t.send("onAudioUrl", z), 
        Ke = !0, Lt.jumpTipInfo("could_start_play"), A = function() {};
    },
    urlChangeDetail: function() {
        console.log("url change before:" + f + h + v);
        var e = !0;
        if (void 0 != Xe && "" != ee.trim(Xe) && Xe.indexOf(".m3u8") < 0 && f.indexOf(Xe.replace("https://", "").replace("http://", "") + "/") >= 0 && void 0 != Ze && "" != ee.trim(Ze)) {
            var t = Xe.replace("https://", "").replace("http://", ""), n = Ze.replace("https://", "").replace("http://", "");
            f = f.replace(t + "/", n + "/"), void 0 != h && "" != ee.trim(h) && (h = h.replace(t + "/", n + "/")), 
            v = v.replace(t + "/", n + "/"), Ce = Ce.replace(t + "/", n + "/");
        } else e = !1;
        return e && console.log("url change after:" + f + h + v), e;
    },
    urlFileName: function(e) {
        if (ee.checkObjectIsNull(e) || "" == ee.trim(e)) return "";
        var t = e.lastIndexOf("/");
        return t > -1 ? e.substring(t + 1) : e;
    },
    urlCdnDetail: function(e, t, o) {
        var a, l;
        ee.checkObjectIsNull(ct) || (a = ct.split(":")), ee.checkObjectIsNull(a) || (l = a[0]);
        var i = Lt.urlFileName(e), s = Lt.urlFileName(t), r = Lt.urlFileName(o);
        De ? void 0 != Xe && "" != ee.trim(Xe) ? Xe.indexOf(".m3u8") > 0 ? (Ce = "https://" == ht ? "https://" : "http://", 
        $e = (Ce += b + "/httpstream/" + O + "/") + "anno.xml?t=" + new Date().getTime(), 
        i = urlFileName(Xe), f = Xe.indexOf("http://") < 0 && Xe.indexOf("https://") < 0 ? ht + Xe : 0 == Xe.indexOf("http://") && "http://" != ht ? Xe.replace("http://", ht) : 0 == Xe.indexOf("https://") && "https://" != ht ? Xe.replace("https://", ht) : Xe, 
        v = f.replace(i, s), "" != r && (h = f.replace(i, r))) : (Ce = Xe.indexOf("http://") < 0 && Xe.indexOf("https://") < 0 ? ht + Xe : 0 == Xe.indexOf("http://") && "http://" != ht ? Xe.replace("http://", ht) : 0 == Xe.indexOf("https://") && "https://" != ht ? Xe.replace("https://", ht) : Xe, 
        f = (Ce += "/" + l + "/httpstream/" + O + "/") + i, v = Ce + s, "" != r && (h = Ce + r), 
        $e = Ce + "anno.xml") : void 0 != Ze && "" != Ze.trim() && (Ce = Ze.indexOf("http://") < 0 && Ze.indexOf("https://") < 0 ? ht + Xe : 0 == Ze.indexOf("http://") && "http://" != ht ? Ze.replace("http://", ht) : 0 == Ze.indexOf("https://") && "https://" != ht ? Ze.replace("https://", ht) : Ze, 
        f = (Ce += "/" + l + "/httpstream/" + O + "/") + i, v = Ce + s, "" != r && (h = Ce + r), 
        $e = Ce + "anno.xml") : (Ce = "https://" == ht ? "https://" : "http://", f = (Ce += b + "/httpstream/" + O + "/") + i + "?sessionid=" + n + "&t=" + new Date().getTime(), 
        v = Ce + s + "?sessionid=" + n + "&t=" + new Date().getTime(), "" != r && (h = Ce + r + "?sessionid=" + n + "&t=" + new Date().getTime()), 
        $e = Ce + "anno.xml?t=" + new Date().getTime(), Ye >= 11 && void 0 != N && "" != ee.trim(N) && (Ce = ht + N.replace("http://", "").replace("https://", "") + "/" + l + "/httpstream/" + O + "/"));
    },
    onSocketMessage: function(e) {
        console.log("[websocket send]message:" + e);
        var t = !1;
        return ee.checkObjectIsNull(_e) || _e.readyState == We && (console.log("type=websocket:[send The message]" + e), 
        _e.send({
            data: e
        }), t = !0), console.log("[websocket send]result:" + t), t;
    },
    joinwebcastNextFn: function(e) {
        _t.send("onStart", {}), _t.send("onTitle", {
            content: H
        }), console.log("[joinwebcastNextFn]The video is already start play."), o = ht + b + "/httpstreamcmd/keepalive/" + O + "?sessionid=" + e.sessionid + "&t=" + Math.random(), 
        a = ht + b + "/httpstreamcmd/play/" + O + "?sessionid=" + e.sessionid + "&t=" + Math.random() + "&callback=?", 
        l = ht + b + "/httpstreamcmd/send/" + O + "?sessionid=" + e.sessionid + "&t=" + Math.random(), 
        i = ht + b + "/httpstreamcmd/close/" + O + "?sessionid=" + e.sessionid + "&t=" + Math.random() + "&callback=?", 
        s = ht + b + "/httpstreamcmd/resetinittime/" + O + "?sessionid=" + e.sessionid + "&t=" + Math.random() + "&callback=?", 
        r = "keepalive/" + O + "?sessionid=" + e.sessionid + "&t=" + Math.random(), c = "play/" + O + "?sessionid=" + e.sessionid + "&t=" + Math.random() + "&callback=?", 
        d = "send/" + O + "?sessionid=" + e.sessionid + "&t=" + Math.random(), u = "close/" + O + "?sessionid=" + e.sessionid + "&t=" + Math.random() + "&callback=?", 
        m = "resetinittime/" + O + "?sessionid=" + e.sessionid + "&t=" + Math.random() + "&callback=?", 
        Je = !1, Lt.toldPlay(), He && (ze = !1, Lt.toldPlay(), He = !1), Lt.polling(o, !0), 
        Lt.getAnnoHis();
    },
    polling: function(e, t) {
        setTimeout(function() {
            Je ? console.log("[polling]The closeKeepLive is true.") : (console.log("[polling IntervalTime]:" + new Date().getTime() + ";" + Me.intervalNum), 
            Me.intervalNum++, Lt.sendKeepLive(e, t));
        }, 0);
    },
    getAnnoHis: function() {
        $e.length > 0 && Lt.getXmlData($e);
    },
    getXmlData: function(e) {
        wx.request({
            url: e,
            dateType: "xml",
            success: function(e) {
                console.log("[getXmlData] Ajax is success.");
                var t = Pt.parseXml(e.data);
                console.log("[getXmlData] The xml analytical result:" + t), Pt.analysisHisAnno(t);
            },
            error: function() {
                console.log("[getXmlData]The xmlUrl:" + e + " is error.");
            }
        });
    },
    getJsonP: function(e) {
        console.log("getJsonP url:" + e), wx.request({
            type: "get",
            async: !0,
            url: e,
            dataType: "json",
            timeout: 15e3,
            success: function(e) {
                if (console.log("getjsonp data success:" + JSON.stringify(e)), ee.checkObjectIsNull(e.data) || "" == e.data) Lt.sendKeepLive(Me.url, Me.isPolling); else if (e.data.indexOf("expire") > -1) t = e.data.replace("expire(", "").replace(")", "").trim(), 
                console.log("getJaonP:" + t), Lt.expire(); else if (e.data.indexOf("metadata") > -1) {
                    var t = e.data;
                    t = t.replace("metadata(", "").replace(")", "").trim(), Lt.metadata(t);
                }
            },
            fail: function(e) {
                console.log("getjsonp fail:" + JSON.stringify(e)), Lt.sendKeepLive(Me.url, Me.isPolling), 
                Ue += 1;
            }
        });
    },
    sendKeepLive: function(e, t) {
        Qe = !0;
        var n = e, o = G.globalData.currentTime - 0;
        if (Me.startIntervalTime = new Date().getTime(), e = e.indexOf("?") > 0 ? e + "&lasttimestamp=" + dt + "&playtime=" + o + "&waitnum=1&sign=" + Me.startIntervalTime + "&callback=?" : e + "?lasttimestamp=" + dt + "&playtime=" + o + "&waitnum=1&sign=" + Me.startIntervalTime + "&callback=?", 
        console.log("[polling]the currentTime:" + o + ";waitnum:" + je), ee.checkObjectIsNull(e)) console.log("[polling]The url is undefined."); else {
            console.log("The send websocket" + (!ee.checkObjectIsNull(_e) && We)), !ee.checkObjectIsNull(_e) && We ? (Pe || (Xt = function() {
                Je = !1, Lt.sendKeepLive(n, t);
            }, Pe = !0), Lt.onSocketMessage(r) ? (Je = !0, Me.isWebsocket = !0, Ue = 0, console.log("send websocket cmd")) : (console.log("[polling]The url is :" + e + ",the interval time:" + qe), 
            Me.sendNum = Me.sendNum + 1, console.log("[pollingObject.sendNum]" + Me.sendNum), 
            Me.isWebsocket = !1, console.log("[send time]" + new Date().getTime()), Lt.getJsonP(e))) : st && !We ? (Me.isWebsocket = !1, 
            Fe = !0, Lt.expire()) : (Me.sendNum = Me.sendNum + 1, console.log("[pollingObject.sendNum]" + Me.sendNum), 
            Me.isWebsocket = !1, console.log("[send time]" + new Date().getTime()), Lt.getJsonP(e));
            var a = !1;
            0 == Ue ? Ue = new Date().getTime() : Ue > 10 && (a = !0), a && (console.log("[polling] the gsonp is not result"), 
            clearInterval(void 0), Ue = 0, Lt.expire());
        }
        Me.url = n, Me.isPolling = t, Qe = !1;
    },
    expire: function() {
        St && (Be.isWebcastClosed || ne || re || (clearInterval(void 0), (e = "http://" == ht ? "http://" + E + "/albcmd/ping?siteid=" + w + "&responsetype=json&confid=" + O + "&confname=" + x + "&confpasswd=" + I + "&servicetype=" + S + "&userid=" + j + "&idc=" + D + "&ipowner=" + U + "&failover=" + vt + "&mainidc=" + X + "&t=" + Math.random() + "&callback=?" : "https://" + E + "/albcmd/ping?siteid=" + w + "&responsetype=json&confid=" + O + "&confname=" + x + "&confpasswd=" + I + "&servicetype=" + S + "&userid=" + j + "&idc=" + D + "&ipowner=" + U + "&failover=" + vt + "&mainidc=" + X + "&t=" + Math.random() + "&sslsupport=true&callback=?").indexOf("hls=true") < 0 && (e = e.replace("callback=?", "hls=true") + "&callback=?"), 
        Ee && (t = "http://" == ht ? "http://" + ft + "/albcmd/ping?siteid=" + w + "&responsetype=json&confid=" + O + "&confname=" + x + "&confpasswd=" + I + "&servicetype=" + S + "&userid=" + j + "&idc=" + D + "&ipowner=" + U + "&failover=" + vt + "&mainidc=" + X + "&t=" + Math.random() + "&callback=?" : "https://" + ft + "/albcmd/ping?siteid=" + w + "&responsetype=json&confid=" + O + "&confname=" + x + "&confpasswd=" + I + "&servicetype=" + S + "&userid=" + j + "&idc=" + D + "&ipowner=" + U + "&failover=" + vt + "&mainidc=" + X + "&t=" + Math.random() + "&sslsupport=true&callback=?").indexOf("hls=true") < 0 && (t = t.replace("callback=?", "hls=true") + "&callback=?"), 
        !ee.checkObjectIsNull(_e) && We ? (console.log("[websocket expire]"), Xt = function() {
            console.log("[expire]The closed webserver."), Je = !0, He = !0, Fe = !1, je = 0, 
            tt = !0, M = !1, ee.checkObjectIsNull(pt) || ee.checkObjectIsNull(gt) || (pt = !1, 
            gt--), Lt.visitALB();
        }, We && (ee.checkObjectIsNull(_e) || _e.close && (_e.close(), _e = null))) : (Je = !0, 
        console.log("[expire]The closeKeepLive is seted true."), He = !0, je = 0, tt = !0, 
        Re = new Date().getTime(), console.log("[expire]pollingSendTimeExpire:" + Re), ee.checkObjectIsNull(pt) || ee.checkObjectIsNull(gt) || (pt = !1, 
        gt--), q.executeAllTask(), Lt.visitALB())));
    },
    dealChat: function() {},
    metadata: function(e) {
        var e = JSON.parse(e);
        if (!Me.isWebsocket && !ee.checkObjectIsNull(e.sign) && e.sign - Re <= 0) console.log("[metadata] the this polling,before expire.resultObj.sign:" + e.sign + ";pollingSendTimeExpire:" + Re); else {
            if (console.log("[start deal time]resultObj.sign：" + e.sign + ";pollingSendTimeExpire:" + Re), 
            console.log("[start deal time]" + new Date().getTime()), console.log("[metadata]The metadata is executed,content:" + e), 
            console.log("[pollingObject.sendNum]" + Me.sendNum), Me.isWebsocket || (Me.sendNum = Me.sendNum - 1, 
            console.log("[clear polling]"), console.log("[timeoutnum_add]" + new Date() + ";" + Me.sendNum)), 
            Ue = 0, ee.checkObjectIsNull(e)) console.log("[metadata]The resultObj is undefined."); else {
                void 0 != e.lasttimestamp && (dt = e.lasttimestamp);
                e.timestamp;
                if (ee.checkObjectIsNull(e.inittimestamp) || (Ie = e.inittimestamp), console.log("[sendKeepLive liveDemandStartParamFn]" + e.vod), 
                !ee.checkObjectIsNull(e.data)) for (var t = 0; t < e.data.length; t++) {
                    var n = e.data[t];
                    try {
                        Lt.distributionFn(n);
                    } catch (e) {
                        console.log("错误信息：" + e);
                    }
                }
            }
            console.log("[pollingObject.sendNum]:" + Me.sendNum + "[pollingObject.intervalNum]" + Me.intervalNum), 
            console.log("[end deal time]" + new Date().getTime() + ";" + !Me.isWebsocket), !Me.isWebsocket && M && (console.log("[sendKeepLive]pollingObject.startIntervalTime:" + Me.startIntervalTime + ";resultObj.sign:" + e.sign), 
            Me.startIntervalTime - 0 == e.sign - 0 && Lt.sendKeepLive(Me.url, Me.isPolling));
        }
    },
    distributionFn: function(e) {
        if (console.log("[distributionFn]The type is :" + e.type), console.log("[data inittimestamp]" + Ie), 
        "document" == e.type) (n = Pt.analysisPpt(e.content)).inittimestamp = Ie, Vt.pptDealFunction(n); else if ("annotation" == e.type) (n = Pt.analysisAnno(e.content)).inittimestamp = Ie, 
        Vt.annoDealFunction(n); else if ("qa" == e.type) {
            var t = Pt.analysisQaType(e.content);
            if ("qa" == t) (n = Pt.analysisQa(e.content)).inittimestamp = Ie, Lt.qaDealFunction(n); else if ("qahistroy" == t) {
                var n = Pt.analysisQaList(e.content);
                Lt.qaListDealFunction(n);
            }
        } else if ("vote" == e.type) {
            var o = Pt.analysisVote(e.content);
            o.inittimestamp = Ie;
            for (i = 0; i < o.contentArray.length; i++) {
                a = o.contentArray[i];
                ee.checkObjectIsNull(a.timestamp) || a.timestamp - 0 < o.inittimestamp - 0 || a.timestamp - o.inittimestamp, 
                _t.send("onVote", a);
            }
            for (i = 0; i < o.resultArray.length; i++) {
                var a = o.resultArray[i];
                ee.checkObjectIsNull(a.timestamp) || a.timestamp - 0 < o.inittimestamp - 0 || a.timestamp - o.inittimestamp, 
                a.skip = void 0, _t.send("onVoteResult", a);
            }
        } else if ("survery" == e.type) (n = Pt.analysisSurvey(e.content)).inittimestamp = Ie, 
        _t.send("onSurvey", n); else if ("ems" == e.type) (n = Pt.analysisEms(e.content)).inittimestamp = Ie, 
        Lt.emsDealFunction(n); else if ("lottery" == e.type) (n = Lt.lottery(e.content)).inittimestamp = Ie, 
        Lt.lotteryDealFunction(n); else if ("videoparam" == e.type) (n = Pt.analysisVideoParam(e.content)).inittimestamp = Ie, 
        _t.send("onVideoConfig", n); else if ("usernum" == e.type) {
            var l = Pt.analysisUsernum(e.content);
            (n = {}).inittimestamp = Ie;
            for (var i = 0; i < l.length; i++) {
                var s = l[i];
                s.num - 0 > 0 ? (_t.send("onUserOnline", {
                    count: s.num
                }), null != Dt && Dt || (Dt = !0, _t.send("onSetting", {
                    enable: !0,
                    target: "all",
                    option: "onlineuser"
                }))) : (null == Dt || Dt) && (Dt = !1, _t.send("onSetting", {
                    enable: !1,
                    target: "all",
                    option: "onlineuser"
                }));
            }
        }
    },
    qaListDealFunction: function(e) {
        var t = {};
        t.list = new Array();
        for (var n = 0; n < e.list.length; n++) {
            for (var o = e.list[n], a = new Array(), l = 0; l < e.list.length; l++) e.list[l].id == o.id && (a.push(e.list[l]), 
            e.list.splice(l, 1), l--);
            if (!a[a.length - 1].remove) for (var i = 0; i < a.length; i++) a[i].remove || (0 == i ? t.list.push(a[i]) : "" != a[i].answer && t.list.push(a[i]));
            n--;
        }
        _t.send("onQAList", t);
    },
    lottery: function(e) {
        var t = {};
        t.array = new Array();
        for (var n = Pt.parseXml(e).documentElement.getElementsByTagName("lottery"), o = 0; o < n.length; o++) {
            var a = {}, l = n[o];
            a.cmd = Pt.getXmlNodeAttr(l, "cmd"), a.timestamp = Pt.dealStartTime(Pt.getXmlNodeAttr(l, "timestamp")), 
            a.info = Pt.getXmlNodeAttr(l, "info"), t.array.push(a);
        }
        return t;
    },
    evalstr: function(e) {
        console.log("evalstr:" + e);
        var t = e.split("({");
        switch (console.log(t), t[0]) {
          case "pingresult":
            n = e.replace("pingresult(", "").replace("})", "}");
            console.log(n);
            o = JSON.parse(n);
            Lt.pingresult(o);
            break;

          case "joinresult":
            var n = e.replace("joinresult(", "").replace("})", "}"), o = JSON.parse(n);
            Lt.joinresult(o);
            break;

          case "metadata":
            n = e.replace("metadata(", "").replace("})", "}");
            Lt.metadata(n);
        }
    },
    getJSON: function(e) {
        wx.request({
            url: e,
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log("getJSON success:" + e.data);
                try {
                    Lt.evalstr(e.data);
                } catch (e) {
                    console.log("deal data is exception," + e);
                }
            },
            fail: function(e) {
                console.log("getJSON fail:" + JSON.stringify(e));
            }
        });
    },
    lotteryDealFunction: function(e) {
        for (var t = e.array, n = 0; n < t.length; n++) {
            var o = {}, a = t[n];
            1 == a.cmd ? o.action = "start" : 2 == a.cmd ? o.action = "stop" : 3 == a.cmd && (o.action = "abort"), 
            o.user = a.info, _t.send("onLottery", o);
        }
    },
    qaDealFunction: function(e) {
        var t = e.qaArray;
        for (o in t) {
            var n = t[o];
            1 != n.removed && "true" != n.removed ? (n.cmd = void 0, n.publishtimestamp = void 0, 
            _t.send("onQA", n)) : _t.send("onQARemove", {
                id: n.id
            });
        }
        if (e.pushQaList) for (var o = 0; o < e.pushQaList.length; o++) {
            var a = e.pushQaList[o], l = de.PUSH_QA;
            "cancelHighlight" == a.cmd && (l = de.CANCEL_QA), "highlight" == a.cmd && (l = de.ANSWER_QA), 
            _t.send(l, {
                id: a.questionid
            });
        }
    },
    emsDealFunction: function(e) {
        console.log("[emsDealFunction]start");
        for (var t = 0; t < e.length; t++) {
            var n = e[t], o = "", a = "";
            if ("publicMsg" == n.type) o = "onMessage", a = {
                content: n.content
            }; else if ("close" == n.type) a = {}, o = "onStop", Ae = "stop", Lt.jumpTipInfo("video_ended"); else if ("pause" == n.type) a = {}, 
            o = "onPause", Ae = "pause"; else if ("ejectUser" == n.type || "ejectdup" == n.type) o = "onKickOut", 
            Ae = "kickout", "ejectUser" == n.type ? a = {
                reason: "0"
            } : "ejectdup" == n.type && (a = {
                reason: "1"
            }), Lt.jumpTipInfo("report_login"); else if ("start" == n.type) a = {}, o = "onStart"; else if ("rollCall" == n.type) {
                if (ye = null, o = "onRollcall", n.timeout >= 0) {
                    var l = new Date().getTime() + Math.random();
                    l = Math.round(1e5 * l), a = {
                        timeout: n.timeout,
                        id: l
                    }, (he = {
                        timeout: n.timeout,
                        id: l
                    }).deal = !1, clearTimeout(fe), fe = setTimeout(function() {
                        null == he || he.deal || (qt.sendRollCall(3), he = null);
                    }, 1e3 * a.timeout);
                } else qt.sendRollCall(3);
                qt.sendRollCall(1);
            } else if ("rollCall2" == n.type) {
                if (!(n.timeout >= 0)) continue;
                ye = "rollCall2", o = "onRollcall", a = {
                    timeout: n.timeout,
                    id: n.senderid
                }, (he = {
                    timeout: n.timeout,
                    id: n.senderid
                }).deal = !1;
            } else {
                if ("chat" == n.type) {
                    (s = n).type = void 0, _t.send("onPriChat", s);
                    continue;
                }
                if ("chat_all" == n.type) {
                    (s = n).type = void 0, Ft.loadChat(s);
                    continue;
                }
                if ("chat_third" == n.type) {
                    var i = {}, s = n;
                    i.richtext = n.richtext, i.type = void 0, i.senderId = void 0, i.senderUid = void 0, 
                    i.role = void 0;
                    _t.send("onThirdPartChat", {
                        content: i
                    });
                    continue;
                }
                if ("muteChat" == n.type) {
                    a = {}, 1 == n.on ? (a.enable = !1, qt.sendFocus({
                        isFilterQuestion: !0
                    })) : 0 == n.on && (a.enable = !0, qt.sendFocus({
                        isFilterQuestion: !1
                    })), a.type = void 0, a.target = "self", a.option = "question", o = "onSetting";
                    var r = a.enable;
                    _t.send(o, {
                        enable: r,
                        target: "self",
                        option: "chat"
                    });
                } else if ("qaenable" == n.type) a = {}, "false" == n.enable ? (Se = !1, a.enable = !1) : "true" == n.enable && (Se = !0, 
                a.enable = !0), a.type = void 0, a.target = "all", a.option = "question", o = "onSetting"; else if ("chatenable" == n.type) a = {}, 
                "false" == n.enable ? (Oe = !1, a.enable = !1) : "true" == n.enable && (Oe = !0, 
                a.enable = !0), a.type = void 0, a.target = "all", a.option = "chat", o = "onSetting"; else {
                    if ("onRosterInfolist" == n.type) {
                        console.log("[onRosterInfolist]:" + n.list.length), n.list.length > 0 && _t.send("onUserList", {
                            list: n.list
                        }), n.joinList.length > 0 && _t.send("onUserJoin", {
                            list: n.joinList
                        }), n.leaveList.length > 0 && _t.send("onUserLeave", {
                            list: n.leaveList
                        }), n.updateList.length > 0 && _t.send("onUserUpdate", {
                            list: n.updateList
                        }), n.disabled ? _t.send("onSetting", {
                            enable: !1,
                            target: "all",
                            option: "userlist"
                        }) : null != Ne && Ne || _t.send("onSetting", {
                            enable: !0,
                            target: "all",
                            option: "userlist"
                        }), Ne = !n.disabled;
                        continue;
                    }
                    if ("resume" == n.type) a = {}, o = "onPlay", Ae = "resume", console.log("[emsDealFunction]:resume:"), 
                    se = !0, q.executeAllTask(), Lt.toldPlay(); else {
                        if ("user.rostrum" == n.type) {
                            a = {
                                hostid: n.globaluserid
                            }, console.log("[onUserHost]:"), null == pe && ("0" == a.hostid && a.hostid - 0 == 0 || (null == be ? be = setTimeout(function() {
                                Te = !0, null == me || G.globalData.currentTime <= me ? (console.log("[resetvideo]is start:" + new Date() + ";" + new Date().getTime()), 
                                q.executeAllTask()) : console.log("[resetvideo]is null.");
                            }, 1e4) : (clearTimeout(be), q.executeAllTask())));
                            continue;
                        }
                        if ("user.asker" == n.type) {
                            a = {
                                askerid: n.globaluserid
                            }, console.log("[onUserAsker]:"), null == ge && ("0" == a.askerid && a.askerid - 0 == 0 || (null == be ? be = setTimeout(function() {
                                Te = !0;
                                getMediaObje();
                                null == me || G.globalData.currentTime <= me ? (console.log("[resetvideo]is start:" + new Date() + ";" + new Date().getTime()), 
                                q.executeAllTask()) : console.log("[resetvideo]is null.");
                            }, 1e4) : (clearTimeout(be), q.executeAllTask())));
                            continue;
                        }
                        if ("class.mode" == n.type) o = "onClassMode", a = {
                            mode: n.mode
                        }; else if ("RoleStatus" == n.type) o = "onRoleStatus", a = {
                            hostid: n.hostid,
                            hostname: n.hostname,
                            presid: n.presid,
                            presname: n.presname
                        }; else if ("tip" == n.type) o = "onRewardMessage", a = {
                            id: n.content.id,
                            amount: n.content.amount,
                            userid: n.content.userid,
                            username: n.content.username
                        }; else {
                            if ("delchat" != n.type) continue;
                            o = "onChatRemove", a = {
                                censorList: n.censorList
                            };
                        }
                    }
                }
            }
            _t.send(o, a);
        }
    },
    toldPlay: function() {
        if (console.log("执行toldplay"), At) {
            q.start(), console.log("[toldPlay] initFlag:" + At);
            var e = a;
            if ("stop" != Ae && "kickout" != Ae) return ze ? (console.log("[toldPlay]To play video or audio"), 
            !0) : Ke ? ee.checkObjectIsNull(e) ? (console.log("[toldPlay]The url is undefined."), 
            !1) : (void 0 !== _e && Lt.onSocketMessage(c) ? (ue = !0, console.log("send websocket toldPlay cmd")) : (console.log("send websocket is fail."), 
            Me.sendNum = Me.sendNum + 1, Lt.getJSON(e), console.log("[told play url]：" + e)), 
            ze = !0, !0) : (console.log("[toldPlay] The video url is unload."), !1);
            console.log("[toldPlay] fail the video is ended or the user is kickouted");
        } else console.log("media init fail");
    },
    jumpTipInfo: function(e) {
        "live_unopen" != e || oe ? "no_enough_authorized" != e || ae ? "could_start_play" == e && oe && !le ? le = !0 : "video_ended" != e || re || ne ? "pause" == e ? se || (ie = !0, 
        se = !0) : "resume" == e && ie ? (ie = !1, se = !1) : "report_login" == e ? (ne = !0, 
        Lt.closedAllInfo(), Lt.sendLeaveInfo()) : "lock_ip" == e && _t.send("onStatus", {
            type: 8,
            explain: "该用户已被封，加入失败"
        }) : (Lt.closedAllInfo(), re = !0) : (_t.send("onStatus", {
            type: 1,
            explain: kt.authorized
        }), ae = !0) : (_t.send("onStatus", {
            type: 2,
            explain: kt.unopen
        }), oe = !0);
    },
    closedAllInfo: function() {
        clearInterval(void 0), ee.checkObjectIsNull(_e) || _e.close({
            fail: function(e) {
                console.log("closed" + e);
            }
        });
    },
    pauseDetail: function() {
        q.executeAllTask(), W = setInterval(function() {
            q.executeAllTask();
        }, 1e3), It = !0;
    },
    initBindPause: function() {
        ce = "pause", ze = !1, ze = !1, console.log("[initBindPause]The video is " + ze), 
        ke.pauseTimeDate = new Date().getTime(), ke.pauseVideoTime = G.globalData.currentTime, 
        ke.isPause = !0, P = setTimeout(Lt.pauseDetail, 1e4);
    },
    resetInitTime: function() {
        try {
            var e = s;
            if (xt) return void console.log("[the live is end]");
            if (Ke) {
                if (ee.checkObjectIsNull(e)) return console.log("[toldPlay]The url is undefined."), 
                !1;
                var t = m;
                return null !== _e && onSocketMessage(t) || (console.log("send websocket is fail."), 
                Me.sendNum = Me.sendNum + 1, console.log("toldPlay url " + e), Lt.getJSON(e), q.executeAllTask(), 
                console.log("[told resetInitTime url]：" + s)), !0;
            }
            return console.log("[toldPlay] The video url is unload."), !1;
        } catch (e) {
            return console.log("Throw the exception" + e), !1;
        }
    },
    initBindPlay: function() {
        if (P && clearTimeout(P), It) {
            W && clearInterval(W), q.executeAllTask();
            var e = z.indexOf("&t=") + 3;
            z = e > 2 ? z.substring(0, e) + new Date().getTime() : z, console.log("刷新playAudiourl-----------" + z);
            var t = p.indexOf("&t=") + 3;
            p = t > 2 ? p.substring(0, t) + new Date().getTime() : p, console.log("刷新playMediaUrl-----------" + p), 
            _t.send("onVideoUrl", p), _t.send("onAudioUrl", z);
            var n = Lt.resetInitTime();
            console.log("刷新resetinittime-----------" + n), It = !1;
        }
    },
    initBindEnded: function() {
        ce = "ended", console.log("[ended]videoEnd.isWebcastClosed is " + Be.isWebcastClosed), 
        Be.isWebcastClosed ? (xt = !0, console.log("[ended]" + xt), Lt.jumpTipInfo("video_ended"), 
        console.log("[ended]" + $("#null").attr("src")), A = function() {}) : Be.isVideoEnd = !0;
    },
    initBindWaiting: function() {
        console.log("[waiting]The waiting "), Be.isWebcastClosed ? (Lt.jumpTipInfo("video_ended"), 
        A = function() {}) : (je++, console.log("videoEnd.isVideoWaiting: " + Be.isVideoWaiting), 
        Be.isVideoWaiting = !0);
    },
    initBindPlaying: function() {
        console.log("initBindPlaying"), Ut || "pause" == Ae || _t.send("onPlay", {}), Ut = !0, 
        Ot && (_t.send("onStatus", {
            type: 9,
            explain: "视频第一次缓冲播放开始"
        }), Ot = !1), me = G.globalData.currentTime, console.log("videoEnd.isVideoWaiting: " + Be.isVideoWaiting), 
        Be.isVideoWaiting = !1, ce = "play";
    },
    sendLeaveInfo: function() {
        console.log("[sendLeaveInfo]The url" + i), Lt.getJSON(i);
    }
}, _t = {
    defaultObj: {
        chatSubmitDate: new Array(),
        qaSubmitDate: new Array()
    },
    getSubmitDate: function(e, t) {
        var n;
        if (e.length > 0) for (var o = 0; e.length > o; o++) {
            var a = e[o];
            if (a.frameName == t) {
                n = a;
                break;
            }
        }
        return ee.checkObjectIsNull(n) && (n = {
            frameName: t,
            submitDate: 0
        }, e.push(n)), n;
    },
    send: function(e, t) {
        Nt.send(e, t);
    },
    bind: function(e, t) {
        "submitchat" == e.toLowerCase() && Nt.bind("submitChat", function(e) {
            var t = new Date().getTime(), n = {};
            if ("" != Tt && Tt - 0 > 1 && (n = _t.getSubmitDate(_t.defaultObj.chatSubmitDate), 
            1e3 * Tt > t - n.submitDate)) return ee.isFunction(e.cb) && e.cb.call(void 0, {
                data: e.data,
                result: !1
            }), !1;
            n.submitDate = t;
            var o = qt.sendChatDataAll(e.data);
            e.data.uuidStr = o, ee.isFunction(e.cb) && e.cb.call(void 0, {
                data: e.data,
                result: !0
            });
        }), "submitquestion" == e.toLowerCase() && Nt.bind("submitQuestion", function(e) {
            var t = new Date().getTime();
            e.data.id = ee.createUUID();
            var n = {};
            "" != Tt && Tt - 0 > 1 && (n = _t.getSubmitDate(_t.defaultObj.qaSubmitDate), 1e3 * Tt > t - n.submitDate) ? ee.isFunction(e.cb) && e.cb.call(void 0, {
                data: e.data,
                result: !1
            }) : (n.submitDate = t, qt.sendData(e.data), ee.isFunction(e.cb) && e.cb.call(void 0, {
                data: e.data,
                result: !0
            }));
        }), "submitchatto" == e.toLowerCase() && Nt.bind("submitChatTo", function(e) {
            var t = new Date().getTime(), n = {};
            if ("" != Tt && Tt - 0 > 1 && (n = _t.getSubmitDate(_t.defaultObj.chatSubmitDate), 
            1e3 * Tt > t - n.submitDate)) return ee.isFunction(e.cb) && e.cb.call(void 0, {
                data: e.data,
                result: !1
            }), !1;
            n.submitDate = t, qt.sendChatData(e.data), ee.isFunction(e.cb) && e.cb.call(void 0, {
                data: e.data,
                result: !0
            });
        }), "submitvote" == e.toLowerCase() && Nt.bind("submitVote", function(e) {
            qt.submitVote(e.data);
        }), "submitrollcall" == e.toLowerCase() && Nt.bind("submitRollcall", function(e) {
            qt.submitRollcall(e.data);
        }), "submitnetchoice" == e.toLowerCase() && Nt.bind("submitNetChoice", function(e) {
            qt.submitNetChoice(e.data);
        }), "requirenetsettings" == e.toLowerCase() && Nt.bind("requireNetSettings", function(e) {
            _t.send("onNetSettings", Lt.getIDCArray());
        });
    }
}, Rt = new Array(), Bt = "", Ft = {
    loadChat: function(e) {
        Rt.push(e), "" == Bt && (Bt = setTimeout(Ft.txt_echo, 100));
    },
    txt_echo: function() {
        _t.send("onPublicChat", Rt), clearTimeout(Bt), Bt = "", Rt = new Array();
    }
}, qt = {
    escapeContent: function(e) {
        if (!ee.checkObjectIsNull(e)) {
            var t = qt.replayFontSetting(e);
            e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = t.richtext).replace(/\$/gi, "$0")).replace(/\<div\>/gi, "")).replace(/\<\/div\>/gi, "$br")).replace(/\<p\>/gi, "")).replace(/\<\/p\>/gi, "$br")).replace(/\<br\/\>/gi, "$br")).replace(/\<br\>/gi, "$br")).replace(/\</gi, "&lt;")).replace(/\</gi, "&lt;")).replace(/\>/gi, "&gt;")).replace(/["]/gi, "&quot;")).replace(/[']/gi, "&#39;")).replace(/\//gi, "&#47;")).replace(/\\/gi, "&#92;")).replace(/\$br/gi, "<br/>")).replace(/\$0/gi, "$"), 
            e = t.startReplaceContent + e + t.endReplaceContent;
        }
        return e;
    },
    replayFontSetting: function(e) {
        var t = {};
        if (t.richtext = e, t.startReplaceContent = "", t.endReplaceContent = "", 0 == e.indexOf("<font")) {
            var n = e.indexOf(">"), o = e.substring(0, n + 1), a = e.indexOf("</font>");
            if (a > 0 && a + "</font>".length == e.length) {
                var l = e.substring(a);
                t.richtext = e.substring(n + 1, a), t.startReplaceContent = o, t.endReplaceContent = l;
            }
        }
        return t;
    },
    sendFocus: function(e) {
        var t = xe, n = ee.extend({}, we, e);
        we = n, console.log("[sendFocus]the ");
        var o = 1 == t ? n.ROLLCALL_STARTING : 2 == t ? n.ROLLCALL_PRESENT : 3 == t ? n.ROLLCALL_ABSENT : 0, a = !(n.isMute && !n.isAudioChatting) && (isNaN(n.isActive) ? n.isFocus : 1 == n.isActive), l = (n.isFilterQuestion ? n.USER_STATUS_MUTE_CHAT : n.USER_STATUS_DEFAULT) | (n.isWantToUpgrade ? n.USER_REQUEST_UPGRADE : n.USER_STATUS_DEFAULT) | (a ? n.USER_STATUS_DEFAULT : n.USER_STATUS_FOCUS) | o | (n.isAudioInviting ? n.WEB_AUDIO_INVITE : n.USER_STATUS_DEFAULT) | (n.isAudioChatting ? n.WEB_AUDIO_CHATTING : n.USER_STATUS_DEFAULT), i = Wt.createXml({
            nodeName: "module",
            attrArray: [ {
                name: "name",
                value: "ems"
            } ]
        }, "UTF-8"), s = Wt.createNode({
            nodeName: "focus",
            attrArray: [ {
                name: "userstatus",
                value: l
            } ]
        }), i = Wt.addNode(i, s);
        console.log("[sendRollCall]The data is " + i), qt.sendContentByJson("&data=" + encodeURIComponent(i) + "&callback=?&lasttimestamp=" + dt);
    },
    submitQuestion: function(e) {
        ee.checkObjectIsNull(e) || ee.checkObjectIsNull(e.content) ? qt.sendErrorInfo({
            api: "submitQuestion",
            param: e,
            explain: "format error.",
            type: 2
        }) : qt.sendData(e);
    },
    sendErrorInfo: function(e) {
        _t.send("onAPIError", e);
    },
    chatFilterByRichtext: function(e, t) {
        if (!we.isFilterQuestion && Oe) {
            var n = new Date().getTime();
            wx.request({
                url: Ct + "/wordfilter/query?siteid=" + w + "&confid=" + O + "&servicetype=" + S + "&text=" + encodeURIComponent(e) + "&timestamp=" + n,
                header: {
                    "content-type": "application/json"
                },
                success: function(e) {
                    var n = e.data;
                    "0" == n.rc ? (t.richtext = n.text, qt.emotionContent(t)) : "1002" == n.rc ? console.log("Text filtering failed.") : console.log("the status of data is unknown:" + n.rc), 
                    qt.sendChatData(t);
                },
                complete: function(e) {},
                fail: function(e) {
                    qt.emotionContent(t), qt.sendChatData(t);
                }
            });
        } else console.log("The send chat Data is fail,the user is mute.");
    },
    chatFilterByContent: function(e, t) {
        if (!we.isFilterQuestion && Oe) {
            var n = new Date().getTime();
            wx.request({
                url: Ct + "/wordfilter/query?siteid=" + w + "&confid=" + O + "&servicetype=" + S + "&text=" + encodeURIComponent(e) + "&timestamp=" + n,
                header: {
                    "content-type": "application/json"
                },
                success: function(e) {
                    var n = e.data;
                    "0" == n.rc ? (t.content = n.text, qt.emotionRichtext(t)) : "1002" == n.rc ? console.log("Text filtering failed.") : console.log("the status of data is unknown:" + n.rc), 
                    qt.sendChatData(t);
                },
                complete: function(e) {},
                fail: function(e) {
                    qt.emotionRichtext(t), qt.sendChatData(t);
                }
            });
        } else console.log("The send chat Data is fail,the user is mute.");
    },
    submitChatTo: function(e) {
        ee.checkObjectIsNull(e.security) || "default" == e.security ? (ee.checkObjectIsNull(e.richtext) || (e.richtext = e.richtext.replace(/\<script/gi, ""), 
        e.richtext = e.richtext.replace(/&lt;script/gi, "")), ee.checkObjectIsNull(e.content) || (e.content = e.content.replace(/\<script/gi, ""), 
        e.content = e.content.replace(/&lt;script/gi, "")), ee.checkObjectIsNull(e.richtext) || "" == e.richtext ? "" != Ct ? qt.chatFilterByContent(e.content, e) : (qt.emotionRichtext(e), 
        qt.sendChatData(e)) : "" != Ct ? qt.chatFilterByRichtext(e.richtext, e) : (qt.emotionContent(e), 
        qt.sendChatData(e))) : ee.checkObjectIsNull(e.richtext) || "" == e.richtext ? "" != Ct ? qt.chatFilterByContent(e.content, e) : (qt.emotionRichtext(e), 
        qt.sendChatData(e)) : (e.richtext = qt.escapeContent(e.richtext), "" != Ct ? qt.chatFilterByRichtext(e.richtext, e) : (qt.emotionContent(e), 
        qt.sendChatData(e)));
    },
    chatAllFilterByContent: function(e, t) {
        if (!we.isFilterQuestion && Oe) {
            var n = new Date().getTime();
            wx.request({
                url: Ct + "/wordfilter/query?siteid=" + w + "&confid=" + O + "&servicetype=" + S + "&text=" + encodeURIComponent(e) + "&timestamp=" + n,
                header: {
                    "content-type": "application/json"
                },
                success: function(e) {
                    "0" == data.rc ? (t.content = data.text, qt.emotionRichtext(t)) : "1002" == data.rc ? console.log("Text filtering failed.") : console.log("the status of data is unknown:" + data.rc), 
                    qt.sendChatDataAll(t);
                },
                complete: function(e) {},
                fail: function(e) {
                    qt.emotionRichtext(t), qt.sendChatDataAll(t);
                }
            });
        } else console.log("The send chat Data is fail,the user is mute.");
    },
    chatAllFilterByRichtext: function(e, t) {
        if (!we.isFilterQuestion && Oe) {
            var n = new Date().getTime();
            wx.request({
                url: Ct + "/wordfilter/query?siteid=" + w + "&confid=" + O + "&servicetype=" + S + "&text=" + encodeURIComponent(e) + "&timestamp=" + n,
                header: {
                    "content-type": "application/json"
                },
                success: function(e) {
                    var n = e.data;
                    "0" == n.rc ? (t.richtext = n.text, qt.emotionContent(t)) : "1002" == n.rc ? console.log("Text filtering failed.") : console.log("the status of data is unknown:" + n.rc), 
                    qt.sendChatDataAll(t);
                },
                complete: function(e) {},
                fail: function(e) {
                    qt.emotionContent(t), qt.sendChatDataAll(t);
                }
            });
        } else console.log("The send chat Data is fail,the user is mute.");
    },
    replace: function(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            e = e.replace(o[0], o[1]);
        }
        return e;
    },
    emotionRichtext: function(e) {
        e.richtext = qt.replace(e.content, [ [ /&/gi, "&amp;" ] ]), e.richtext = qt.replace(e.richtext, [ [ /\</gi, "&lt;" ], [ /\>/gi, "&gt;" ], [ /\n/g, "<br/>" ], [ /["]/gi, "&quot;" ], [ /[']/gi, "&#39;" ], [ /\//gi, "&#47;" ], [ /\\/gi, "&#92;" ] ]);
    },
    emotionContent: function(e) {
        e.content = qt.replace(e.richtext, [ [ /&quot;/gi, '"' ], [ /&#39;/gi, "'" ], [ /&#47;/gi, "/" ], [ /&#92;/gi, "\\" ], [ /&amp;/gi, "&" ], [ /&nbsp;/gi, " " ], [ /\<br\>/gi, String.fromCharCode(10) ], [ /&lt;/gi, "<" ], [ /&gt;/gi, ">" ], [ /\<br\/\>/gi, String.fromCharCode(10) ], [ /\<\/div\>/gi, String.fromCharCode(10) ], [ /\<div\>/gi, "" ], [ /\<p\>/gi, "" ], [ /\<\/p\>/gi, String.fromCharCode(10) ] ]);
    },
    submitChat: function(e) {
        ee.checkObjectIsNull(e.security) || "default" == e.security ? (ee.checkObjectIsNull(e.richtext) || (e.richtext = e.richtext.replace(/\<script/gi, ""), 
        e.richtext = e.richtext.replace(/&lt;script/gi, "")), ee.checkObjectIsNull(e.content) || (e.content = e.content.replace(/\<script/gi, ""), 
        e.content = e.content.replace(/&lt;script/gi, "")), ee.checkObjectIsNull(e.richtext) || "" == e.richtext ? "" != Ct ? qt.chatAllFilterByContent(e.content, e) : (qt.emotionRichtext(e), 
        qt.sendChatDataAll(e)) : "" != Ct ? qt.chatAllFilterByRichtext(e.richtext, e) : (qt.emotionContent(e), 
        qt.sendChatDataAll(e))) : ee.checkObjectIsNull(e.richtext) || "" == e.richtext ? "" != Ct ? qt.chatAllFilterByContent(e.content, e) : (qt.emotionRichtext(e), 
        qt.sendChatDataAll(e)) : (e.richtext = qt.escapeContent(e.richtext), "" != Ct ? qt.chatAllFilterByRichtext(e.richtext, e) : (qt.emotionContent(e), 
        qt.sendChatDataAll(e)));
    },
    qaFilter: function(e, t) {
        wx.request({
            url: Ct + "/wordfilter/query?siteid=" + w + "&confid=" + O + "&servicetype=" + S + "&text=" + encodeURIComponent(e.content) + "&timestamp=" + t,
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var n = t.data;
                "0" == n.rc ? e.content = n.text : "1002" == n.rc ? console.log("Text filtering failed.") : console.log("the status of data is unknown:" + n.rc), 
                qt.sendDataFilter(e);
            },
            complete: function(e) {},
            fail: function(t) {
                qt.sendDataFilter(e);
            }
        });
    },
    sendData: function(e) {
        if (!we.isFilterQuestion && Se) {
            var t = new Date().getTime();
            "" != Ct ? qt.qaFilter(e, t) : qt.sendDataFilter(e);
        }
    },
    sendDataFilter: function(e) {
        var t = "";
        t = e.id ? e.id : ee.createUUID();
        var n = Wt.createXml({
            nodeName: "module",
            attrArray: [ {
                name: "name",
                value: "qa"
            }, {
                name: "userid",
                value: j
            } ]
        }, "UTF-8"), o = Wt.createNode({
            nodeName: "qamsg",
            value: e.content,
            attrArray: [ {
                name: "name",
                value: C
            }, {
                name: "id",
                value: t
            } ]
        }, !0), n = Wt.addNode(n, o);
        return console.log("[sendData]The send content is:" + n), !ee.checkObjectIsNull(l) && (qt.sendContentByJson("&data=" + encodeURIComponent(n) + "&callback=?&lasttimestamp=" + dt), 
        !0);
    },
    sendChatData: function(e) {
        if (console.log(" wo shi sendchatdata"), !we.isFilterQuestion && Oe) {
            var t = Wt.createXml({
                nodeName: "module",
                attrArray: [ {
                    name: "name",
                    value: "chat"
                }, {
                    name: "userid",
                    value: e.receiverId
                } ]
            }, "UTF-8"), n = Wt.createNodeText({
                nodeName: "ems",
                value: e.content,
                textArray: [ {
                    nodeName: "richtext",
                    value: e.richtext
                } ],
                attrArray: [ {
                    name: "type",
                    value: "chat"
                }, {
                    name: "sender",
                    value: C
                }, {
                    name: "senderId",
                    value: j
                }, {
                    name: "group",
                    value: "0"
                } ]
            }), t = Wt.addNode(t, n);
            console.log("[sendData]The send content is:" + t), qt.sendContentByJson("&data=" + encodeURIComponent(t) + "&callback=?&lasttimestamp=" + dt);
        } else console.log("The send chat Data is fail,the user is mute.");
    },
    sendContentByJson: function(e) {
        !ee.checkObjectIsNull(_e) && We ? Lt.onSocketMessage(d + e) ? console.log("The websocketServer send content is success.") : (console.log("The websocketServer send content is fail."), 
        Lt.getJSON(l + e)) : (console.log("The websocketServer cann't send content."), Lt.getJSON(l + e));
    },
    sendChatDataAll: function(e) {
        if (!we.isFilterQuestion && Oe) {
            var t = "";
            t = e.id ? e.id : ee.createUUID();
            var n = Wt.createXml({
                nodeName: "module",
                attrArray: [ {
                    name: "name",
                    value: "groupchat"
                } ]
            }, "UTF-8"), o = Wt.createNodeText({
                nodeName: "ems",
                value: e.content,
                textArray: [ {
                    nodeName: "richtext",
                    value: e.richtext
                } ],
                attrArray: [ {
                    name: "type",
                    value: "chat"
                }, {
                    name: "sender",
                    value: C
                }, {
                    name: "senderId",
                    value: j
                }, {
                    name: "group",
                    value: "1"
                }, {
                    name: "id",
                    value: t
                } ]
            }), n = Wt.addNode(n, o);
            return console.log("[sendData]The send content is:" + n), qt.sendContentByJson("&data=" + encodeURIComponent(n) + "&callback=?&lasttimestamp=" + dt), 
            t;
        }
        console.log("The send chat Data is fail,the user is mute.");
    },
    submitVote: function(e) {
        e.rootType = "vote";
        var t = qt.checkVote(e);
        t.result ? qt.sendVoteOrSurvery([ qt.dealVoteSubmit(e) ]) : qt.sendErrorInfo({
            api: "submitVote",
            param: e,
            explain: t.explain,
            type: t.type
        });
    },
    checkVote: function(e) {
        if (ee.checkObjectIsNull(e)) return {
            result: !1,
            type: 2,
            explain: "lack attribute"
        };
        if (ee.checkObjectIsNull(e.id) || ee.checkObjectIsNull(e.questions)) return {
            result: !1,
            type: 2,
            explain: "lack attribute"
        };
        if (ee.checkObjectIsNull(e.questions.length) || e.questions.length <= 0) return {
            result: !1,
            type: 1,
            explain: "format error"
        };
        for (var t = 0; t < e.questions.length; t++) {
            var n = e.questions[t];
            if (ee.checkObjectIsNull(n.type)) return {
                result: !1,
                type: 2,
                explain: "lack attribute"
            };
            if ("text" == n.type) {
                if (ee.checkObjectIsNull(n.text)) return {
                    result: !1,
                    type: 2,
                    explain: "lack attribute"
                };
            } else {
                if ("multi" != n.type && "single" != n.type) return {
                    result: !1,
                    type: 1,
                    explain: "the value of type is wrong."
                };
                if (ee.checkObjectIsNull(n.items)) return {
                    result: !1,
                    type: 2,
                    explain: "lack attribute"
                };
                if (ee.checkObjectIsNull(n.items.length) || n.items.length <= 0) return {
                    result: !1,
                    type: 1,
                    explain: "format error"
                };
                for (var o = 0; o < n.items[o]; o++) {
                    var a = n.items[o];
                    if (ee.checkObjectIsNull(a.selected) || ee.checkObjectIsNull(a.id)) return {
                        result: !1,
                        type: 2,
                        explain: "lack attribute"
                    };
                }
            }
        }
        return {
            result: !0
        };
    },
    dealVoteSubmit: function(e) {
        var t = {};
        t.rootType = e.rootType, t.ver = e.ver, t.id = e.id, t.question = new Array();
        for (var n = 0; n < e.questions.length; n++) {
            var o = e.questions[n], a = {};
            if (a.id = o.id, a.items = new Array(), "text" == o.type) a.items.push({
                text: o.text
            }); else for (var l = 0; l < o.items.length; l++) {
                var i = o.items[l];
                "true" != i.selected && 1 != i.selected || a.items.push({
                    id: i.id,
                    index: l
                });
            }
            t.question.push(a);
        }
        return t;
    },
    sendVoteOrSurvery: function(e) {
        for (var t = qt.generationDate(e), n = 0; n < t.length; n++) {
            var o = t[n];
            "service" == o.type && qt.sendContentByJson("&callback=?&lasttimestamp=" + dt + "&data=" + encodeURIComponent(o.xmlContent));
        }
    },
    generationDate: function(e) {
        for (var t = new Array(), n = 0; n < e.length; n++) {
            var o = {
                type: "service",
                xmlContent: qt.createServiceXml(e[n])
            };
            t.push(o);
        }
        return t;
    },
    createWebXml: function(e) {
        var t = "voteSubmit", n = "vote" == e.rootType;
        n || (t = "surveySubmit");
        for (var o = Wt.createXml({
            nodeName: t,
            attrArray: [ {
                name: "siteid",
                value: w
            }, {
                name: "userid",
                value: j
            }, {
                name: "username",
                value: C
            }, {
                name: "confid",
                value: O
            }, {
                name: "live",
                value: "true"
            } ]
        }, "UTF-8"), a = Wt.createNode({
            nodeName: "command",
            attrArray: [ {
                name: "id",
                value: e.id
            } ]
        }), l = e.questions, i = 0; i < l.length; i++) {
            for (var s = l[i], r = Wt.createNode({
                nodeName: "question",
                attrArray: [ {
                    name: "id",
                    value: s.id
                } ]
            }), c = 0; c < s.items.length; c++) {
                var d = s.items[c];
                if (ee.checkObjectIsNull(d.text)) {
                    u = Wt.createNode({
                        nodeName: "item",
                        attrArray: [ {
                            name: "idx",
                            value: d.index
                        } ]
                    });
                    r = Wt.addNode(r, u);
                } else {
                    if (n) u = Wt.createNode({
                        nodeName: "item",
                        value: d.text,
                        attrArray: [ {
                            name: "idx",
                            value: 0
                        } ]
                    }); else var u = Wt.createNode({
                        nodeName: "item",
                        value: d.text
                    });
                    r = Wt.addNode(r, u);
                }
            }
            a = Wt.addNode(a, r);
        }
        return o = Wt.addNode(o, a), console.log("[createWebXml]The content:" + o), o;
    },
    createServiceXml: function(e) {
        for (var t = Wt.createXml({
            nodeName: "module",
            attrArray: [ {
                name: "name",
                value: "vote"
            }, {
                name: "userid",
                value: j
            }, {
                name: "site",
                value: w
            }, {
                name: "live",
                value: "true"
            }, {
                name: "confid",
                value: O
            }, {
                name: "username",
                value: C
            }, {
                name: "ver",
                value: e.ver
            } ]
        }, "UTF-8"), n = Wt.createNode({
            nodeName: "command",
            attrArray: [ {
                name: "id",
                value: e.id
            }, {
                name: "type",
                value: "submit"
            }, {
                name: "userid",
                value: j
            } ]
        }), o = e.question, a = 0; a < o.length; a++) {
            for (var l = o[a], i = Wt.createNode({
                nodeName: "question",
                attrArray: [ {
                    name: "id",
                    value: l.id
                } ]
            }), s = 0; s < l.items.length; s++) {
                var r = l.items[s];
                if (ee.checkObjectIsNull(r.text)) {
                    c = Wt.createNode({
                        nodeName: "item",
                        attrArray: [ {
                            name: "id",
                            value: r.id
                        }, {
                            name: "idx",
                            value: r.index
                        } ]
                    });
                    i = Wt.addNode(i, c);
                } else {
                    var c = Wt.createNode({
                        nodeName: "item",
                        value: r.text,
                        attrArray: [ {
                            name: "idx",
                            value: 0
                        }, {
                            name: "id",
                            value: ""
                        } ]
                    });
                    i = Wt.addNode(i, c);
                }
            }
            n = Wt.addNode(n, i);
        }
        return t = Wt.addNode(t, n), console.log("[createServiceXml]The content:" + t), 
        t;
    },
    submitRollcall: function(e) {
        null != he && he.id == e.id && (clearTimeout(fe), he = null, "rollCall2" == ye ? qt.sendRollCallACK(e.id) : qt.sendRollCall(2));
    },
    sendRollCallACK: function(e) {
        var t = Wt.createXml({
            nodeName: "module",
            attrArray: [ {
                name: "name",
                value: "rollCall2Ack"
            } ]
        }, "UTF-8"), n = Wt.createNode({
            nodeName: "ems",
            attrArray: [ {
                name: "type",
                value: "rollCall2Ack"
            }, {
                name: "senderId",
                value: e
            }, {
                name: "destid",
                value: e
            }, {
                name: "time",
                value: new Date().getTime()
            } ]
        }), t = Wt.addNode(t, n);
        console.log("[sendRollCallACK]The data is " + t), qt.sendContentByJson("&data=" + encodeURIComponent(t) + "&callback=?&lasttimestamp=" + dt);
    },
    sendRollCall: function(e, t) {
        xe = e;
        var n = ee.extend({}, we, t);
        we = n;
        var o = 1 == e ? n.ROLLCALL_STARTING : 2 == e ? n.ROLLCALL_PRESENT : 3 == e ? n.ROLLCALL_ABSENT : 0, a = !(n.isMute && !n.isAudioChatting) && (isNaN(n.isActive) ? n.isFocus : 1 == n.isActive), l = (n.isFilterQuestion ? n.USER_STATUS_MUTE_CHAT : n.USER_STATUS_DEFAULT) | (n.isWantToUpgrade ? n.USER_REQUEST_UPGRADE : n.USER_STATUS_DEFAULT) | (a ? n.USER_STATUS_DEFAULT : n.USER_STATUS_FOCUS) | o | (n.isAudioInviting ? n.WEB_AUDIO_INVITE : n.USER_STATUS_DEFAULT) | (n.isAudioChatting ? n.WEB_AUDIO_CHATTING : n.USER_STATUS_DEFAULT), i = Wt.createXml({
            nodeName: "module",
            attrArray: [ {
                name: "name",
                value: "ems"
            } ]
        }, "UTF-8"), s = Wt.createNode({
            nodeName: "rollcall",
            attrArray: [ {
                name: "userstatus",
                value: l
            } ]
        }), i = Wt.addNode(i, s);
        console.log("[sendRollCall]The data is " + i), qt.sendContentByJson("&data=" + encodeURIComponent(i) + "&callback=?&lasttimestamp=" + dt);
    },
    submitNetChoice: function(e) {
        qt.choosePriorNetwork(e.label);
    },
    choosePriorNetwork: function(n) {
        for (var o = Q, a = null, l = 0; l < o.length; l++) if (n == o[l].description) {
            a = o[l];
            break;
        }
        null != a && D != a.code && (D = a.code, U = a.supported, _t.send("onNetSettings", Lt.getIDCArray()), 
        e = ht + E + "/albcmd/ping?siteid=" + w + "&responsetype=json&confid=" + O + "&confname=" + x + "&confpasswd=" + I + "&servicetype=" + S + "&userid=" + j + "&idc=" + a.code + "&ipowner=" + a.supported + "&failover=" + vt + "&mainidc=" + X + "&t=" + Math.random() + "&callback=?", 
        Ee && (t = ht + ft + "/albcmd/ping?siteid=" + w + "&responsetype=json&confid=" + O + "&confname=" + x + "&confpasswd=" + I + "&servicetype=" + S + "&userid=" + j + "&idc=" + a.code + "&ipowner=" + a.supported + "&failover=" + vt + "&mainidc=" + X + "&t=" + Math.random() + "&callback=?"), 
        Lt.expire());
    }
}, Vt = {
    annoFirstDealFunction: function(e, t) {
        q.addTask("annoFirst", e, null, null);
    },
    pptDealFunction: function(e) {
        for (n = 0; n < e.pageArray.length; n++) {
            var t = e.pageArray[n];
            if (console.log("[pptDealFunction]page.starttimestamp :" + t.starttimestamp + ";**" + e.inittimestamp), 
            null != ve && ve == t.hls) return;
            if (ve = t.hls, q.addTask("ppt_module", t, t.starttimestamp - e.inittimestamp, null), 
            Et.length > 0) {
                for (var n = 0; n < Et.length; n++) {
                    var o = Et[n];
                    ve != o.hls && (Et.splice(n, 1), n--);
                }
                Vt.annoFirstDealFunction(Et), Et = new Array();
            }
            jt && (ve = null);
        }
    },
    annoDealFunction: function(e) {
        for (n = 0; n < e.annoArray.length; n++) {
            var t = e.annoArray[n];
            console.log("[annoDealFunction]page.starttimestamp :" + t.starttimestamp + ";**" + e.inittimestamp);
            for (var n = 0; n < t.annoArray.length; n++) {
                var o = t.annoArray[n];
                null != ve && ve != o.hls && (t.annoArray.splice(n, 1), n--);
            }
            q.addTask("anno_sdk", t, t.starttimestamp - e.inittimestamp, null);
        }
    }
}, Pt = {
    sortPpt: function(e) {
        for (var t = 0; t < e.length - 1; t++) for (var n = 0; n < e.length - 1 - t; n++) if (e[n].starttimestamp - e[n + 1].starttimestamp > 0) {
            var o = e[n];
            e[n] = e[n + 1], e[n + 1] = o;
        }
        return e;
    },
    analysisAnno: function(e) {
        console.log("[analysisAnno] The content is:" + e);
        for (var t = {}, o = new Array(), a = Pt.parseXml(e).documentElement.getElementsByTagName("command"), l = 0; l < a.length; l++) {
            var i = {}, s = a[l], r = new Array();
            if (i.id = Pt.getXmlNodeAttr(s, "id"), i.type = Pt.getXmlNodeAttr(s, "type"), i.documentid = Pt.getXmlNodeAttr(s, "documentid"), 
            i.pageid = Pt.getXmlNodeAttr(s, "pageid"), i.color = Pt.getXmlNodeAttr(s, "color"), 
            i.linesize = Pt.getXmlNodeAttr(s, "linesize"), i.fontsize = Pt.getXmlNodeAttr(s, "fontsize"), 
            i.style = Pt.getXmlNodeAttr(s, "style"), i.removed = Pt.getXmlNodeAttr(s, "removed"), 
            i.starttimestamp = 1e3 * Number(Pt.getXmlNodeAttr(s, "timestamp")), i.hls = Ce + i.documentid + "_" + i.pageid + ".png", 
            i.hls.indexOf("?") > 0 ? i.hls = i.hls + "&sessionid=" + n : i.hls = i.hls + "?sessionid=" + n, 
            "2" == i.type) {
                for (var c = s.getElementsByTagName("p"), r = new Array(), d = 0; d < c.length; d++) {
                    var u = Pt.getNodeValue(c[d]);
                    r.push(u);
                }
                i.p = r;
            } else if ("4" == i.type) {
                var c = s.getElementsByTagName("p"), m = s.getElementsByTagName("ep"), g = s.childNodes[5].nodeValue;
                c.length > 0 && (i.p = Pt.getNodeValue(c[0])), m.length > 0 && (i.ep = Pt.getNodeValue(m[0])), 
                i.value = g;
            } else {
                var c = s.getElementsByTagName("p"), m = s.getElementsByTagName("ep");
                c.length > 0 && (i.p = Pt.getNodeValue(c[0])), m.length > 0 && (i.ep = Pt.getNodeValue(m[0]));
            }
            o.push(i);
        }
        var p = (o = Pt.sortPpt(o)).length;
        if (t.annoArray = new Array(), p > 0) {
            for (var h = new Array(), f = "", v = 0, l = 0; l < p; l++) {
                var N = o[l];
                "" == f && (f = N.documentid + "_" + N.pageid, h[v] = new Array()), f == N.documentid + "_" + N.pageid ? h[v].push(N) : (h[v += 1] = new Array(), 
                f = N.documentid + "_" + N.pageid, h[v].push(N));
            }
            if (h.length > 0) {
                var y = h[h.length - 1], b = {};
                b.annoArray = y;
                var A = y.length;
                A > 0 && (b.taskId = y[0].documentid + "_" + y[0].pageid + "_" + y[0].id + "_" + y[0].starttimestamp + "_" + A, 
                G.globalData.currentTime > 5 ? (b.starttimestamp = y[0].starttimestamp, b.stoptimestamp = "") : (b.starttimestamp = Ie, 
                b.stoptimestamp = Ie), t.annoArray.push(b));
            }
        }
        return t;
    },
    analysisQaList: function(e) {
        console.log("[analysisQaList] The content is:" + e);
        var t = Pt.parseXml(e).documentElement, n = {};
        n.list = new Array();
        for (var o = t.getElementsByTagName("qa"), a = 0; a < o.length; a++) {
            var l = o[a], i = {};
            i.id = Pt.getXmlNodeAttr(l, "id"), i.question = Pt.getXmlNodeAttr(l, "question"), 
            i.submitor = Pt.getXmlNodeAttr(l, "questionowner"), "true" == Pt.getXmlNodeAttr(l, "removed") && (i.remove = !0), 
            i.qaownerId = Pt.getXmlNodeAttr(l, "questionownerid"), i.answer = Pt.getXmlNodeAttr(l, "answer"), 
            i.answerBy = Pt.getXmlNodeAttr(l, "answerowner"), i.submitTime = Pt.getXmlNodeAttr(l, "questiontimestamp"), 
            i.answerTime = Pt.getXmlNodeAttr(l, "qaanswertimestamp"), n.list.push(i);
        }
        return n;
    },
    sortQaList: function(e) {
        for (var t = 0; t < e.length - 1; t++) for (var n = 0; n < e.length - 1 - t; n++) if (e[n].submitTime - e[n + 1].submitTime > 0) {
            var o = e[n];
            e[n] = e[n + 1], e[n + 1] = o;
        }
        return e;
    },
    analysisQaType: function(e) {
        var t = Pt.parseXml(e).documentElement;
        return Pt.getXmlNodeAttr(t, "name");
    },
    analysisQa: function(e) {
        console.log("[analysisQa] The content is:" + e);
        var t = {}, n = Pt.parseXml(e).documentElement;
        if ("qahistroy" == Pt.getXmlNodeAttr(n, "name")) return Pt.analysisQaList(e);
        for (var o = new Array(), a = n.getElementsByTagName("qa"), l = new Array(), i = 0; i < a.length; i++) {
            var s = a[i], r = {};
            if (r.publishtimestamp = Pt.dealStartTime(Pt.getXmlNodeAttr(s, "timestamp")), r.id = Pt.getXmlNodeAttr(s, "id"), 
            r.cmd = Pt.getXmlNodeAttr(s, "cmd"), !ee.checkObjectIsNull(r.cmd) && r.cmd.length > 0) {
                if ("cancelHighlight" == r.cmd) {
                    r.questionid = r.id, l.push(r);
                    continue;
                }
                h = s.getElementsByTagName("question")[0];
                if (ee.checkObjectIsNull(h)) continue;
                r.questionid = r.id, r.questionuid = Pt.getXmlNodeAttr(h, "uid"), r.questionowner = Pt.getXmlNodeAttr(h, "name"), 
                r.questionownerid = Pt.getXmlNodeAttr(h, "questionownerid"), r.questiontimestamp = Pt.getXmlNodeAttr(h, "time"), 
                r.question = "";
                for (var c = h.childNodes.length, d = 0; d < c; d++) r.question += ee.trim(h.childNodes[d].nodeValue);
                var u = s.getElementsByTagName("answer");
                if (!ee.checkObjectIsNull(u)) {
                    r.answerList = new Array();
                    for (var m = 0; m < u.length; m++) {
                        var g = u[m], p = {};
                        if (!ee.checkObjectIsNull(g)) {
                            p.answerid = Pt.getXmlNodeAttr(g, "uid"), p.answerowner = Pt.getXmlNodeAttr(g, "name"), 
                            p.answertimestamp = Pt.getXmlNodeAttr(g, "time"), p.answer = "", c = g.childNodes.length;
                            for (d = 0; d < c; d++) p.answer += ee.trim(g.childNodes[d].nodeValue);
                        }
                        r.answerList.push(p);
                    }
                }
                l.push(r);
            } else {
                var h = s.getElementsByTagName("question")[0];
                if (ee.checkObjectIsNull(h)) continue;
                var f = Pt.getXmlNodeAttr(h, "removed");
                r.removed = "true" == f, r.id = Pt.getXmlNodeAttr(h, "id"), r.submitor = Pt.getXmlNodeAttr(h, "user"), 
                r.qaownerId = Pt.getXmlNodeAttr(h, "questionownerid"), r.submitTime = Pt.getXmlNodeAttr(h, "timestamp"), 
                r.question = "";
                for (var c = h.childNodes.length, d = 0; d < c; d++) r.question += ee.trim(h.childNodes[d].nodeValue);
                g = s.getElementsByTagName("answer")[0];
                if (!ee.checkObjectIsNull(g)) {
                    r.answerBy = Pt.getXmlNodeAttr(g, "user"), r.answerTime = Pt.getXmlNodeAttr(g, "timestamp"), 
                    r.answer = "", c = g.childNodes.length;
                    for (d = 0; d < c; d++) r.answer += ee.trim(g.childNodes[d].nodeValue);
                }
                o.push(r);
            }
        }
        return o = Pt.sortQaArray(o), t.qaArray = o, t.pushQaList = l, t;
    },
    sortQaArray: function(e) {
        for (var t = 0; t < e.length - 1; t++) for (var n = 0; n < e.length - 1 - t; n++) if (e[n].publishtimestamp - e[n + 1].publishtimestamp > 0) {
            var o = e[n];
            e[n] = e[n + 1], e[n + 1] = o;
        }
        return e;
    },
    dealStartTime: function(e) {
        return G.globalData.currentTime > 5 ? e : Ie;
    },
    analysisVote: function(e) {
        var t = {};
        console.log("[Vote Ver]The content is:" + e);
        var n = Pt.parseXml(e).documentElement;
        J = Pt.getXmlNodeAttr(n, "ver");
        for (var o = new Array(), a = new Array(), l = n.getElementsByTagName("command"), i = 0; i < l.length; i++) {
            var s = l[i], r = {};
            r.id = Pt.getXmlNodeAttr(s, "id"), r.skip = Pt.getXmlNodeAttr(s, "skip");
            var c = Pt.getXmlNodeAttr(s, "total"), d = "" != c && c.length > 0;
            d && (r.total = c);
            for (var u = s.childNodes, m = 0; m < u.length; m++) if ("subject" == (N = u[m]).nodeName) {
                r.subject = Pt.getNodeValue(N);
                break;
            }
            var g = s.getElementsByTagName("question");
            r.questions = new Array();
            for (m = 0; m < g.length; m++) {
                var p = g[m], h = {};
                h.id = Pt.getXmlNodeAttr(p, "id"), h.type = Pt.getXmlNodeAttr(p, "type");
                var f = p.childNodes;
                d ? h.total = Pt.getXmlNodeAttr(p, "total") : h.answer = Pt.getXmlNodeAttr(p, "answer");
                for (var v = 0; v < f.length; v++) {
                    var N = f[v];
                    if ("subject" == N.nodeName) {
                        h.subject = Pt.getNodeValue(N);
                        break;
                    }
                }
                if ("text" != h.type && h.type.length > 0) {
                    h.score = Pt.getXmlNodeAttr(p, "score");
                    var y = p.getElementsByTagName("item");
                    h.items = new Array();
                    for (var b = 0; b < y.length; b++) {
                        var A = y[b], T = {};
                        T.id = Pt.getXmlNodeAttr(A, "id"), T.option = Pt.getNodeValue(A), d ? T.total = Pt.getXmlNodeAttr(A, "total") : (T.correct = Pt.getXmlNodeAttr(A, "correct"), 
                        T.selected = !1), h.items.push(T);
                    }
                }
                "text" == h.type && (h.text = ""), r.questions.push(h);
            }
            d ? a.push(r) : o.push(r);
        }
        return t.contentArray = o, t.resultArray = a, t;
    },
    analysisSurvey: function(e) {
        t = {};
        console.log("[survey]The content is:" + e);
        for (var t = {}, n = Pt.parseXml(e).documentElement, o = new Array(), a = n.getElementsByTagName("command"), l = 0; l < a.length; l++) {
            var i = a[l], s = {};
            s.rootType = "survey", s.id = Pt.getXmlNodeAttr(i, "id"), s.type = Pt.getXmlNodeAttr(i, "type"), 
            s.skip = Pt.getXmlNodeAttr(i, "skip"), s.timestamp = Pt.getXmlNodeAttr(i, "timestamp");
            for (var r = i.childNodes, c = 0; c < r.length; c++) if ("subject" == (h = r[c]).nodeName) {
                s.subject = Pt.getNodeValue(h);
                break;
            }
            var d = i.getElementsByTagName("question");
            s.question = new Array();
            for (c = 0; c < d.length; c++) {
                var u = d[c], m = {};
                m.id = Pt.getXmlNodeAttr(u, "id"), m.type = Pt.getXmlNodeAttr(u, "type"), m.answer = Pt.getXmlNodeAttr(u, "answer");
                for (var g = u.childNodes, p = 0; p < g.length; p++) {
                    var h = g[p];
                    if ("subject" == h.nodeName) {
                        m.subject = Pt.getNodeValue(h);
                        break;
                    }
                }
                s.question.push(m);
            }
            o.push(s);
        }
        return t.contentArray = o, t;
    },
    getXmlNodeAttr: function(e, t) {
        return e && e.attributes ? null != e.attributes[t] ? e.attributes[t].value : null != e.attributes.getNamedItem(t) ? e.attributes.getNamedItem(t).value : "" : "";
    },
    lastAddress: function(e) {
        var t = (e = e.replace(/(^\s*)|(\s*$)/g, "")).lastIndexOf("/");
        return e.lastIndexOf("/") > 0 ? e.substring(0, t + 1) : e;
    },
    fillUrl: function(e, t) {
        return 0 == (e = e.replace(/(^\s*)|(\s*$)/g, "")).indexOf("http://") || 0 == e.indexOf("https://") ? e : Pt.lastAddress(t) + e;
    },
    getNodeValue: function(e) {
        return e.textContent.replace(/(^\s*)|(\s*$)/g, "");
    },
    analysisRole: function(e) {
        var t = "";
        return "" != e && ((e -= 0) % 2 == 1 && (t += "1,", e -= 1), e % 4 == 2 && (t += "2,", 
        e -= 2), e % 8 == 4 && (t += "4,", e -= 4), e % 16 == 8 && (t += "8,", e -= 8), 
        e - 16 == 0 && (t += "16,"), t.length > 0 && (t = t.substring(0, t.length - 1))), 
        t;
    },
    analysisVideoParam: function(e) {
        for (var t = new Array(), n = Pt.parseXml(e).documentElement.getElementsByTagName("videoparam"), o = 0; o < n.length; o++) {
            var a = {};
            a.width = Pt.getXmlNodeAttr(n[o], "width"), a.height = Pt.getXmlNodeAttr(n[o], "height"), 
            a.isas = Pt.getXmlNodeAttr(n[o], "isas"), t.push(a);
        }
        return t;
    },
    analysisUsernum: function(e) {
        console.log("[analysisUsernum] The content is:" + e);
        for (var t = Pt.parseXml(e), n = new Array(), o = t.documentElement.getElementsByTagName("usernum"), a = 0; a < o.length; a++) {
            var l = {};
            l.timestamp = Pt.getXmlNodeAttr(o[a], "timestamp"), l.num = Pt.getXmlNodeAttr(o[a], "num"), 
            n.push(l);
        }
        return n;
    },
    parseXml: function(e) {
        var t;
        return t = new te().parseFromString(e), e = t;
    },
    analysisEms: function(e) {
        console.log("[ems]" + e);
        var t = {}, n = Pt.parseXml(e).documentElement, o = new Array(), a = new Array(), l = n.getElementsByTagName("ems");
        (ee.checkObjectIsNull(l) || 0 == l.length) && (l = new Array()).push(n);
        for (S = 0; S < l.length; S++) {
            t = {};
            var i = l[S], s = Pt.getXmlNodeAttr(i, "type");
            if (console.log("[ems]" + i), "" != s && void 0 != s && null != s && (t.type = s), 
            "publicMsg" == s) t.content = Pt.getNodeValue(i); else if ("chat" == s) {
                var r = Pt.getXmlNodeAttr(i, "groupid"), c = Pt.getXmlNodeAttr(i, "group");
                if (t.senderRole = Pt.analysisRole(Pt.getXmlNodeAttr(i, "senderRole")), Pt.getXmlNodeAttr(i, "senderId") == j) continue;
                "1" == c ? t.type = "chat_all" : "" != r && (t.type = "2" == c ? "chat_third" : "chat_all"), 
                t.sender = Pt.getXmlNodeAttr(i, "sender"), t.senderId = Pt.getXmlNodeAttr(i, "senderid"), 
                t.senderUid = Pt.getXmlNodeAttr(i, "senderId"), t.id = Pt.getXmlNodeAttr(i, "id");
                var d = i.childNodes;
                if (console.log("[emsChildNodes.length]" + d.length), null == d || d.length <= 1) t.content = Pt.getNodeValue(i); else {
                    t.content = "", t.richtext = "";
                    for (h = 0; h < d.length; h++) {
                        var u = d[h];
                        console.log("[emsChildeNode.nodeName]" + u.nodeName), "richtext" == u.nodeName ? (t.richtext = t.richtext + Pt.getNodeValue(u), 
                        console.log("[analysisEmsObj.richtext]" + t.richtext)) : t.content = t.content + Pt.getNodeValue(u);
                    }
                }
            } else if ("close" == s) t.reason = Pt.getXmlNodeAttr(i, "reason"); else if ("rollCall" == s || "rollCall2" == s) t.timeout = Pt.getXmlNodeAttr(i, "timeout"), 
            t.senderid = Pt.getXmlNodeAttr(i, "senderid"); else if ("muteChat" == s) t.on = Pt.getXmlNodeAttr(i, "on"), 
            t.senderid = Pt.getXmlNodeAttr(i, "senderid"); else if ("onRosterInfolist" == s) {
                console.log("[onRosterInfolist anaysisly]"), t.type = Pt.getXmlNodeAttr(i, "type"), 
                t.senderid = Pt.getXmlNodeAttr(i, "senderid");
                var m = i.getElementsByTagName("RosterInfoDisable");
                t.disabled = !1, console.log("[rosterInfoDisable]" + m.length), null != m && m.length > 0 && (t.disabled = !0);
                for (var g = i.getElementsByTagName("RosterInfoHistroy"), p = new Array(), h = 0; h < g.length; h++) for (var f = g[h].getElementsByTagName("roster"), v = 0; v < f.length; v++) {
                    var N = {}, y = f[v];
                    N.id = Pt.getXmlNodeAttr(y, "id"), N.name = Pt.getXmlNodeAttr(y, "rostername"), 
                    N.chatid = Pt.getXmlNodeAttr(y, "chatuserid");
                    I = Pt.getXmlNodeAttr(y, "userRole");
                    N.role = Pt.analysisRole(I), p.push(N), Lt.gstrue && void 0 != (U = Pt.getXmlNodeAttr(y, "userappinfo")) && (U = ee.decodeHex(U), 
                    userdatas[N.id] = U);
                }
                t.list = p;
                for (var b = i.getElementsByTagName("RosterInfoNotify"), A = new Array(), T = new Array(), k = new Array(), h = 0; h < b.length; h++) for (var f = b[h].getElementsByTagName("roster"), v = 0; v < f.length; v++) {
                    var N = {}, y = f[v];
                    N.id = Pt.getXmlNodeAttr(y, "id"), N.name = Pt.getXmlNodeAttr(y, "rostername"), 
                    N.chatid = Pt.getXmlNodeAttr(y, "chatuserid");
                    var I = Pt.getXmlNodeAttr(y, "userRole");
                    N.role = Pt.analysisRole(I);
                    var x = Pt.getXmlNodeAttr(y, "notifytype");
                    Lt.gstrue && void 0 != (U = Pt.getXmlNodeAttr(y, "userappinfo")) && (U = ee.decodeHex(U), 
                    userdatas[N.id] = U), "0" == x ? A.push(N) : "1" == x ? T.push(N) : "2" == x && k.push(N);
                }
                t.leaveList = T, t.joinList = A, t.updateList = k;
            } else if ("qaenable" == s) t.enable = Pt.getXmlNodeAttr(i, "enable"); else if ("chatenable" == s) t.enable = Pt.getXmlNodeAttr(i, "enable"); else if ("user.rostrum" == s || "user.asker" == s) t.globaluserid = Pt.getXmlNodeAttr(i, "globaluserid"), 
            t.senderid = Pt.getXmlNodeAttr(i, "senderid"), "0" != t.senderid && t.senderid - 0 != 0 || ("user.rostrum" == s && (ge = null), 
            "user.asker" == s && (pe = null)); else if ("class.mode" == s) t.mode = Pt.getXmlNodeAttr(i, "mode"), 
            t.senderid = Pt.getXmlNodeAttr(i, "senderid"); else if ("user.app.info" == s) {
                for (var O = i.getElementsByTagName("user"), w = new Array(), S = 0; S < O.length; S++) {
                    var C = O[S], D = Pt.getXmlNodeAttr(C, "globaluserid"), U = Pt.getXmlNodeAttr(C, "userappinfo");
                    void 0 != U && (U = ee.decodeHex(U), userdatas[D] = U);
                    for (var X = !1, h = 0; h < w.length; h++) w[h] == D && (X = !0);
                    X || w.push(D);
                }
                M = "";
                w.sort(function(e, t) {
                    return e - t;
                });
                for (S = 0; S < w.length; S++) M += "_" + w[S];
                for (S = 0; S < Le.length; S++) if (Le[S].keys == M) {
                    for (h = 0; h <= S; h++) for (var E = Le[h].chats, L = new Array(), v = 0; v < E.length; v++) (Q = E[v]).inittimestamp = Ie, 
                    void 0 != userdatas[Q.senderUid] && (Q.userdata = userdatas[Q.senderUid]), L.push(Q);
                    Le.splice(0, S + 1), Lt.emsDealFunction(L);
                    break;
                }
            } else if ("RoleStatus" == s) t.hostid = Pt.getXmlNodeAttr(i, "hostglobaluserid"), 
            t.hostname = Pt.getXmlNodeAttr(i, "hostusername"), t.presid = Pt.getXmlNodeAttr(i, "preglobaluserid"), 
            t.presname = Pt.getXmlNodeAttr(i, "preusername"); else if ("hongbao.key" == s) {
                var _ = i.getElementsByTagName("broadmessage")[0], R = Pt.getXmlNodeAttr(_, "type");
                if ("hongbao" == R) {
                    var B = _.getElementsByTagName("hongbao")[0], F = Pt.getXmlNodeAttr(B, "type"), q = {};
                    "create" == F ? (t.type = "hbcreate", q.type = Pt.getXmlNodeAttr(B, "hongbaotype"), 
                    q.hbid = Pt.getXmlNodeAttr(B, "id"), q.username = Pt.getNodeValue(B.getElementsByTagName("username")[0]), 
                    q.comment = Pt.getNodeValue(B.getElementsByTagName("comment")[0])) : "grab" == F && (t.type = "hbgrabmsg", 
                    Pt.getXmlNodeAttr(B, "hongbaotype") >= 2 ? q.type = 1 : q.type = 0, q.hbid = Pt.getXmlNodeAttr(B, "id"), 
                    q.userid = Pt.getXmlNodeAttr(B, "userid"), q.amount = Pt.getXmlNodeAttr(B, "amount"), 
                    q.username = Pt.getNodeValue(B.getElementsByTagName("username")[0])), t.content = q;
                } else if ("tip" == R) {
                    var V = _.getElementsByTagName("tip")[0];
                    t.type = "tip";
                    var P = {};
                    P.id = Pt.getXmlNodeAttr(V, "id"), P.userid = Pt.getXmlNodeAttr(V, "userid"), P.amount = Pt.getXmlNodeAttr(V, "amount"), 
                    P.username = Pt.getNodeValue(V.getElementsByTagName("username")[0]), t.content = P;
                }
            }
            ee.isEmptyObject(t) || o.push(t);
        }
        if (Lt.gstrue && a.length > 0) {
            var W = !0, M = "", w = new Array(), Q = {};
            Q.timestamp = new Date().getTime();
            for (S = 0; S < a.length; S++) if (void 0 == userdatas[a[S].senderUid]) {
                W = !1;
                for (var X = !1, h = 0; h < w.length; h++) w[h] == a[S].senderUid && (X = !0);
                X || w.push(a[S].senderUid);
            } else a[S].userdata = userdatas[a[S].senderUid];
            w.sort(function(e, t) {
                return e - t;
            });
            for (S = 0; S < w.length; S++) M += "_" + w[S];
            Q.hasInfo = W, Q.keys = M, Q.chats = a, Le.push(Q), w.length > 0 && sendUserData(w);
        }
        var J = n.getElementsByTagName("chatcensor");
        if (!ee.checkObjectIsNull(J) && J.length > 0) {
            var H = {};
            H.censorList = new Array(), H.type = "delchat";
            for (S = 0; S < J.length; S++) {
                var z = {}, i = J[S], s = Pt.getXmlNodeAttr(i, "type");
                console.log("[chatcensor]" + i), "msg" == s ? (z.type = "chat", z.id = Pt.getXmlNodeAttr(i, "id"), 
                H.censorList.push(z)) : "user" == s && (z.type = "user", z.id = Pt.getXmlNodeAttr(i, "id"), 
                H.censorList.push(z));
            }
            if (H.censorList.length > 0 && (o.push(H), Lt.gstrue)) for (h = 0; h < H.censorList.length; h++) {
                var K = H.censorList[h];
                if ("msg" == K.type) {
                    for (v = 0; v < Le.length; v++) for (var E = Le[v], $ = 0; $ < E.length; $++) if (E[$].id == K.id) {
                        E.splice($, 1), 0 == E.length && Le.splice(v, 1);
                        break;
                    }
                } else if ("user" == K.type) for (v = 0; v < Le.length; v++) for (var E = Le[v], $ = 0; $ < E.length; $++) E[$].senderUid == K.id && (E.splice($, 1), 
                $--, 0 == E.length && (Le.splice(v, 1), v--));
            }
        }
        return o;
    },
    analysisHisAnno: function(e) {
        console.log("[analysisAnno] The content is:" + e);
        for (var t = new Array(), o = e.documentElement.getElementsByTagName("command"), a = 0; a < o.length; a++) {
            var l = {}, i = o[a], s = new Array();
            if (l.id = Pt.getXmlNodeAttr(i, "id"), l.type = Pt.getXmlNodeAttr(i, "type"), l.documentid = Pt.getXmlNodeAttr(i, "documentid"), 
            l.pageid = Pt.getXmlNodeAttr(i, "pageid"), l.color = Pt.getXmlNodeAttr(i, "color"), 
            l.linesize = Pt.getXmlNodeAttr(i, "linesize"), l.fontsize = Pt.getXmlNodeAttr(i, "fontsize"), 
            l.style = Pt.getXmlNodeAttr(i, "style"), l.removed = Pt.getXmlNodeAttr(i, "removed"), 
            l.starttimestamp = 1e3 * Number(Pt.getXmlNodeAttr(i, "timestamp")), l.stoptimestamp = Number(l.starttimestamp) + 1, 
            l.hls = Ce + l.documentid + "_" + l.pageid + ".png?sessionid=" + n, "2" == l.type) {
                for (var r = i.getElementsByTagName("p"), s = new Array(), c = 0; c < r.length; c++) {
                    var d = Pt.getNodeValue(r[c]);
                    s.push(d);
                }
                l.p = s;
            } else if ("4" == l.type) {
                var r = i.getElementsByTagName("p"), u = i.getElementsByTagName("ep"), m = Pt.getNodeValue(i);
                r.length > 0 && (l.p = Pt.getNodeValue(r[0]), m = m.replace(l.p, "")), u.length > 0 && (l.ep = Pt.getNodeValue(u[0]), 
                m = m.replace(l.ep, "")), l.value = m;
            } else {
                var r = i.getElementsByTagName("p"), u = i.getElementsByTagName("ep");
                r.length > 0 && (l.p = Pt.getNodeValue(r[0])), u.length > 0 && (l.ep = Pt.getNodeValue(u[0]));
            }
            t.push(l);
        }
        if (t = Pt.sortPpt(t), null != ve) {
            if (t.length > 0) for (a = 0; a < t.length; a++) {
                var g = t[a];
                ve != g.hls && (t.splice(a, 1), a--);
            }
            Vt.annoFirstDealFunction(t), Et = new Array();
        } else Et = t;
    },
    analysisPpt: function(e) {
        console.log("[analysisPpt] The content is:" + e);
        for (var t = {}, o = Pt.parseXml(e).documentElement, a = new Array(), l = o.getElementsByTagName("page"), i = 0; i < l.length; i++) {
            var s = {}, r = l[i];
            s.hls = Pt.fillUrl(Pt.getXmlNodeAttr(r, "hls"), Ce), s.hls.indexOf("?") > 0 ? s.hls = s.hls + "&sessionid=" + n : s.hls = s.hls + "?sessionid=" + n, 
            console.log("[analysisPpt]the hls :" + s.hls), s.height = Pt.getXmlNodeAttr(r, "height"), 
            s.width = Pt.getXmlNodeAttr(r, "width"), s.hlsid = Pt.getXmlNodeAttr(r, "hls").replace(".png", ""), 
            s.taskId = s.hlsid + "_" + Pt.getXmlNodeAttr(r, "starttimestamp"), console.log("media.currentTime:" + G.globalData.currentTime), 
            G.globalData.currentTime > 5 ? (s.starttimestamp = Pt.getXmlNodeAttr(r, "starttimestamp"), 
            s.stoptimestamp = Pt.getXmlNodeAttr(r, "stoptimestamp")) : (s.starttimestamp = Ie, 
            s.stoptimestamp = Ie), a.push(s);
        }
        var c = (a = Pt.sortPpt(a)).length;
        return t.pageArray = new Array(), c > 0 && t.pageArray.push(a[c - 1]), t;
    }
}, Wt = {
    createXml: function(e, t) {
        var n = '<?xml version="1.0" ' + (t = ee.checkObjectIsNull(t) ? "" : 'encoding="' + t + '"') + "?>";
        return ee.checkObjectIsNull(e) || (n += Wt.createNode(e)), n;
    },
    createNode: function(e, t) {
        if (ee.checkObjectIsNull(t) && (t = !0), !ee.checkObjectIsNull(e) && !ee.checkObjectIsNull(e.nodeName)) {
            a = "<" + e.nodeName;
            if (!ee.checkObjectIsNull(e.attrArray)) for (var n = 0; n < e.attrArray.length; n++) {
                var o = e.attrArray[n];
                a += " " + o.name + '="' + o.value + '"';
            }
            var a = a + ">";
            return ee.checkObjectIsNull(e.value) || (t ? a = a + "<![CDATA[" + e.value + "]]>" : a += e.value), 
            a = a + "</" + e.nodeName + ">";
        }
    },
    createNodeText: function(e, t) {
        if (ee.checkObjectIsNull(t) && (t = !0), !ee.checkObjectIsNull(e) && !ee.checkObjectIsNull(e.nodeName)) {
            o = "<" + e.nodeName;
            if (!ee.checkObjectIsNull(e.attrArray)) for (a = 0; a < e.attrArray.length; a++) {
                var n = e.attrArray[a];
                o += " " + n.name + '="' + n.value + '"';
            }
            var o = o + ">";
            if (ee.checkObjectIsNull(e.value) || (t ? o = o + "<![CDATA[" + e.value + "]]>" : o += e.value), 
            !ee.checkObjectIsNull(e.textArray) && e.textArray.length > 0) for (var a = 0; a < e.textArray.length; a++) {
                var l = e.textArray[a];
                ee.checkObjectIsNull(l.nodeName) || (o = o + "<" + l.nodeName + "><![CDATA[", ee.checkObjectIsNull(l.value) || (o += l.value), 
                o = o + "]]></" + l.nodeName + ">");
            }
            return o = o + "</" + e.nodeName + ">";
        }
    },
    addNode: function(e, t, n, o) {
        var a = 0;
        if (ee.checkObjectIsNull(n)) {
            if (-1 == (a = (l = e).lastIndexOf("</"))) return;
        } else {
            ee.checkObjectIsNull(o) && (o = 1);
            for (var l = e, i = 0, s = 0; s < o; s++) {
                if (-1 == (i = l.indexOf(n, i))) return;
                (d = l.lastIndexOf("<", i)) <= (u = l.lastIndexOf("</", i)) && s--, i += n.length;
            }
            if (0 == i) return;
            l = l.substring(i + n.length), a += i + n.length, i = 0;
            for (var r = 0, c = !0; c; ) {
                if (-1 == (i = l.indexOf(n))) return;
                var d = l.lastIndexOf("<", i), u = l.lastIndexOf("</", i);
                d <= u ? r-- : r++, r < 0 && (a += u, c = !1);
            }
        }
        return e.substring(0, a) + t + e.substring(a);
    },
    getXmlNodeAttr: function(e, t) {
        return e && e.attributes ? null != e.attributes[t] ? e.attributes[t].value : null != e.attributes.getNamedItem(t) ? e.attributes.getNamedItem(t).value : "" : "";
    },
    getNodeValue: function(e) {
        return ee.trim(e.textContent);
    }
};

module.exports = Lt;