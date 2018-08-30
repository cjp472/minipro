var e = getApp(), t = require("../../sdk/zrender-helper"), n = require("../../sdk/zrender"), a = require("../../sdk/vod"), i = require("../../sdk/gssdk").GS, s = "", r = "", o = {}, l = void 0, d = 0, p = void 0, h = void 0;

Page({
    data: {
        joinItem: "",
        videoHeight: 205,
        swiperHeight: 500,
        audioSrc: "",
        videoSrc: "",
        autoplay: !0,
        condition: !1,
        docHeight: 0,
        documentUrl: "",
        current: 1,
        isShowQnaire: !1,
        isFullScreen: !1,
        pointer_show: 0,
        voteList: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ],
        voteSingleSel: "../../assets/icons/single.png",
        voteSingleSel2: "../../assets/icons/single2.png",
        voteSingleSel3: "../../assets/icons/single3.png",
        voteMultSel: "../../assets/icons/multiple.png",
        voteMultSel2: "../../assets/icons/multiple2.png",
        voteMultSel3: "../../assets/icons/multiple3.png",
        voteId: [],
        voteAll: [],
        ownerid: "",
        authcode: "",
        uname: ""
    },
    onLoad: function(t) {
        console.log(t), this.channel = i.createChannel(), e.globalData.channel = this.channel, 
        t.item && this.setData({
            joinItem: JSON.parse(t.item)
        }), this.setData({
            ownerid: t.ownerid,
            authcode: t.authcode,
            uname: t.uname
        });
    },
    onReady: function() {
        var n = this, i = !1, s = wx.getSystemInfoSync().windowHeight, r = wx.getSystemInfoSync().windowWidth, o = 9 * r / 16, d = s - 44 - o;
        this.setData({
            videoHeight: o,
            swiperHeight: d
        }), l = r / 1024, this.videoContext = wx.createVideoContext("myVideo"), this.chat = this.selectComponent("#chat"), 
        this.zr && this.zr.dispose(), this.zr = t.createZrender("drawCanvas", r, d), this.channel.bind("onVideoUrl", function(e) {
            console.log("获取到视频地址"), n.setData({
                videoSrc: e.data.mediaUrl
            });
        }), this.channel.bind("onDocChange", function(e) {
            console.log("文档翻页"), p = e.data.height, h = e.data.width;
            var t = r * (p / h);
            l = r / h, n.clearAnno(), n.setData({
                documentUrl: e.data.hls,
                docHeight: t,
                condition: !0
            });
        }), this.channel.bind("onAnno", function(e) {
            console.log("收到标注");
            var t = e.data.annoArray;
            "clear" == e.data.cmd || t.length > 0 && setTimeout(function() {
                n.drawCanvas(t);
            }, 200);
        }), this.channel.bind("onVote", function(e) {
            console.log("收到调查问卷");
            var t = e.data, a = n.data.voteAll, i = n.data.voteId;
            if (n.voteId_in(i, t.id)) return !1;
            if (i.push({
                id: t.id
            }), !n.voteId_in(a, t.id)) for (var s = 0; s < t.questions.length; s++) t.questions[s].answer = "";
            t.type = "question", a.push(t), a.length > 0 && n.videoContext.pause(), n.setData({
                voteId: i,
                voteAll: a,
                isShowQnaire: !0
            });
        }), this.channel.bind("onTitle", function(e) {
            console.log("获取标题"), wx.setNavigationBarTitle({
                title: e.data.content
            });
        }), this.channel.bind("onStatus", function(e) {
            if (console.log("SDK状态通知"), i) return !1;
            i = !0;
            var t = "";
            "1" == e.data.type ? t = "人数已满，您无法加入" : "7" == e.data.type && (t = "人数已满，您无法加入"), 
            "1" != e.data.type && "7" != e.data.type || wx.showModal({
                title: "提示",
                content: t,
                showCancel: !1,
                confirmText: "我知道了",
                confirmColor: "#0078d7",
                success: function() {
                    i = !1, wx.navigateBack({
                        delta: 1
                    });
                }
            });
        }), this.channel.bind("onAPIError", function(e) {
            console.log("报错"), console.log(e), wx.showModal({
                title: "ERROR",
                content: e.data.explain,
                showCancel: !1,
                confirmText: "我知道了",
                confirmColor: "#0078d7"
            });
        }), this.channel.bind("onDataReady", function(e) {
            e.data;
            n.channel.send("setupChatSync", {
                open: !0
            }), n.channel.send("submitQAList", {}), n.videoContext.play();
        }), this.numTen = function(e) {
            return e > 9 ? e : "0" + e;
        }, this.voteId_in = function(e, t) {
            if (0 == e.length) return !1;
            for (var n in e) if (e[n].id == t) return !0;
            return !1;
        }, this.idInCanvas = function(e, t) {
            if ("[object Object]" == !Object.prototype.toString.call(e)) return !1;
            for (var n in e) if (n == t) return !0;
            return !1;
        }, a._open_.init({
            widget: this.channel,
            site: "offcn.gensee.com",
            ctx: "training",
            ownerid: this.data.ownerid,
            authcode: this.data.authcode,
            uname: this.data.uname,
            uid: "",
            encodetype: "",
            password: "",
            k: ""
        }, function(t) {
            console.log("回调"), e.globalData.userInfo.userid = t.userid;
        });
    },
    refreshCanvas: function(e) {
        var t = this;
        t.clearAnno(), t.chat.refreshChat();
    },
    createArrowHead: function(e, t, a) {
        var i, s, r, o, l = parseInt(e[0]), d = parseInt(e[1]), p = parseInt(e[2]), h = parseInt(e[3]), c = p - l, u = h - d, f = Math.atan2(u, c), v = ((f *= 180 / Math.PI) + 30) * Math.PI / 180, g = (f - 30) * Math.PI / 180;
        return i = p - 5 * Math.cos(v), s = h - 5 * Math.sin(v), r = p - 5 * Math.cos(g), 
        o = h - 5 * Math.sin(g), new n.Polygon({
            shape: {
                points: [ [ p, h ], [ i, s ], [ r, o ] ],
                smooth: !1
            },
            style: {
                fill: t,
                stroke: t,
                lineWidth: a
            }
        });
    },
    drawCanvas: function(e) {
        var t = this;
        if (!(e && e.length > 0)) return !1;
        for (var a = 0; a < e.length; a++) {
            var i = new Object();
            if (!t.idInCanvas(o, e[a].id)) {
                for (var d in e[a]) i[d] = e[a][d];
                if (null != i.color) var p = i.color.split(","), h = p[0], c = parseFloat(p[1]);
                if (t.data.pointer_show > 0 && (9 == i.type || 1 == i.type ? ("0" == i.style && 2 != t.data.pointer_show || "1" == i.style && 1 != t.data.pointer_show) && (1 == t.data.pointer_show ? s.setStyle({
                    x: -100,
                    y: -100
                }) : r.setStyle({
                    x: -100,
                    y: -100
                })) : (1 == t.data.pointer_show ? s.setStyle({
                    x: -100,
                    y: -100
                }) : r.setStyle({
                    x: -100,
                    y: -100
                }), t.setData({
                    pointer_show: 0
                }))), 6 == i.type) {
                    i.start_p = i.p.split(","), i.end_p = i.ep.split(",");
                    var u = parseInt(i.end_p[0]) - parseInt(i.start_p[0]), f = parseInt(i.end_p[1]) - parseInt(i.start_p[1]), v = parseInt(i.linesize) * l, g = new n.Rect({
                        shape: {
                            x: parseInt(i.start_p[0]) * l,
                            y: parseInt(i.start_p[1]) * l,
                            width: parseInt(u * l),
                            height: parseInt(f * l)
                        },
                        style: {
                            fill: null,
                            stroke: h,
                            lineWidth: v
                        }
                    });
                    o[i.id] = g, o[i.id].timestamp = i.timestamp, t.zr.add(g);
                } else if (5 == i.type) {
                    i.start_p = i.p.split(","), i.end_p = i.ep.split(",");
                    var u = parseInt(i.end_p[0]) - parseInt(i.start_p[0]), f = parseInt(i.end_p[1]) - parseInt(i.start_p[1]), v = parseInt(i.linesize) * l, m = new n.Ellipse({
                        shape: {
                            cx: (parseInt(i.start_p[0]) + parseInt(i.end_p[0])) / 2 * l,
                            cy: (parseInt(i.start_p[1]) + parseInt(i.end_p[1])) / 2 * l,
                            rx: parseInt(u / 2 * l),
                            ry: parseInt(f / 2 * l)
                        },
                        style: {
                            fill: null,
                            stroke: h,
                            lineWidth: v
                        }
                    });
                    o[i.id] = m, o[i.id].timestamp = i.timestamp, t.zr.add(m);
                } else if (4 == i.type && i.text) {
                    console.log("写文字"), i.start_p = i.p.split(","), i.end_p = i.ep.split(",");
                    var y = parseInt(i.fontsize * l), w = i.text, I = new n.Text({
                        style: {
                            x: parseInt(i.start_p[0]) * l,
                            y: parseInt(i.start_p[1]) * l,
                            text: w,
                            textFill: h,
                            textFont: y + "px Microsoft Yahei",
                            textBaseline: "top"
                        }
                    });
                    o[i.id] = I, o[i.id].timestamp = i.timestamp, t.zr.add(I);
                } else if (3 == i.type) if (0 == i.removed) t.clearAnno(); else {
                    var x = i.removed;
                    o[x] && null != o[x] && t.zr.remove(o[x]), delete o[x];
                } else if ("8" == i.type || "7" == i.type) {
                    i.start_p = i.p.split(","), i.end_p = i.ep.split(",");
                    v = parseInt(i.linesize) * l;
                    if ("0" == i.style || "7" == i.type) {
                        var _ = new n.Line({
                            shape: {
                                x1: parseInt(i.start_p[0]) * l,
                                y1: parseInt(i.start_p[1]) * l,
                                x2: parseInt(i.end_p[0]) * l,
                                y2: parseInt(i.end_p[1]) * l
                            },
                            style: {
                                lineCap: "round",
                                lineWidth: v,
                                stroke: h,
                                lineDash: null
                            }
                        });
                        o[i.id] = _, o[i.id].timestamp = i.timestamp, t.zr.add(_);
                    } else if ("1" == i.style) {
                        var S = new n.Line({
                            shape: {
                                x1: parseInt(i.start_p[0]) * l,
                                y1: parseInt(i.start_p[1]) * l,
                                x2: parseInt(i.end_p[0]) * l,
                                y2: parseInt(i.end_p[1]) * l
                            },
                            style: {
                                lineCap: "butt",
                                lineWidth: v,
                                stroke: h,
                                lineDash: [ 2, 2 ]
                            }
                        });
                        o[i.id] = S, o[i.id].timestamp = i.timestamp, t.zr.add(S);
                    } else if ("2" == i.style) {
                        console.log("有箭头线条");
                        var D = t.createArrowHead([ i.start_p[0] * l, i.start_p[1] * l, i.end_p[0] * l, i.end_p[1] * l ], h, v * l), A = new n.Line({
                            shape: {
                                x1: parseInt(i.start_p[0]) * l,
                                y1: parseInt(i.start_p[1]) * l,
                                x2: parseInt(i.end_p[0]) * l,
                                y2: parseInt(i.end_p[1]) * l
                            },
                            style: {
                                lineCap: "round",
                                lineWidth: v,
                                stroke: h,
                                fill: h
                            }
                        });
                        o[i.id] = [ A, D ], o[i.id].timestamp = i.timestamp, t.zr.add(A), t.zr.add(D);
                    }
                } else if (2 == i.type) {
                    for (var v = parseInt(i.linesize) * l, C = i.p, b = new Array(), M = 0; M < C.length; M++) "[object Array]" === Object.prototype.toString.call(C[M]) ? C[M] = C[M] : C[M] = C[M].split(",");
                    for (var T = 0; T < C.length; T++) b.push([ parseInt(C[T][0]) * l, parseInt(C[T][1]) * l ]);
                    c < 1 && (c = .75);
                    var z = new n.Polyline({
                        style: {
                            lineDash: [ 0, 0 ],
                            opacity: c,
                            stroke: h,
                            lineWidth: v
                        },
                        shape: {
                            points: b,
                            smooth: .5
                        }
                    });
                    o[i.id] = z, o[i.id].timestamp = i.timestamp, t.zr.add(z);
                } else if (9 == i.type || 1 == i.type) {
                    var k;
                    if (k = "[object Array]" === Object.prototype.toString.call(i.p) ? i.p : i.p.split(","), 
                    i.style && 1 == i.style && "" == s) {
                        q = new n.Image({
                            style: {
                                x: parseInt(k[0]) * l,
                                y: parseInt(k[1]) * l,
                                image: "../../assets/icons/point.png",
                                width: 16,
                                height: 16,
                                text: ""
                            }
                        });
                        t.zr.add(q), s = q;
                    } else if (i.style && 0 == i.style && "" == r) {
                        var q = new n.Image({
                            style: {
                                x: parseInt(k[0]) * l,
                                y: parseInt(k[1]) * l,
                                image: "../../assets/icons/pointEx.png",
                                width: 16,
                                height: 16,
                                text: ""
                            }
                        });
                        t.zr.add(q), r = q;
                    } else i.style && 1 == i.style ? s.setStyle({
                        x: parseInt(k[0]) * l,
                        y: parseInt(k[1]) * l
                    }) : r.setStyle({
                        x: parseInt(k[0]) * l,
                        y: parseInt(k[1]) * l
                    });
                    i.style && 1 == i.style ? t.setData({
                        pointer_show: 1
                    }) : t.setData({
                        pointer_show: 2
                    });
                }
            }
        }
    },
    clearAnno: function() {
        var e = this, n = [];
        for (var a in o) o[a] && null != o[a] && (n.push(o[a]), e.zr.remove(o[a]));
        var i = wx.getSystemInfoSync().windowHeight, s = wx.getSystemInfoSync().windowWidth, r = i - 44 - 9 * s / 16;
        e.zr = t.createZrender("drawCanvas", s, r), o = {};
    },
    swiperDemo1: function() {
        this.setData({
            current: 1
        });
    },
    swiperDemo2: function() {
        this.setData({
            current: 2
        });
    },
    swiperDemo3: function() {
        this.setData({
            current: 3
        });
    },
    swiperDemo4: function() {
        this.setData({
            current: 4
        });
    },
    singleTap: function(e) {
        for (var t, n = e.currentTarget.dataset.id, a = e.currentTarget.dataset.qaid, i = this.data.voteAll, s = 0; s < i.length; s++) {
            t = i[s].questions;
            for (var r = 0; r < t.length; r++) {
                var o = t[r];
                if ("single" == o.type && o.id == a) for (var l = 0; l < o.items.length; l++) o.items[l].id == n ? (o.items[l].selected = !0, 
                o.answer = l + 1 + "") : o.items[l].selected = !1;
            }
        }
        this.setData({
            voteAll: i
        });
    },
    multTap: function(e) {
        for (var t, n = e.currentTarget.dataset.id, a = this.data.voteAll, i = 0; i < a.length; i++) {
            t = a[i].questions;
            for (var s = 0; s < t.length; s++) {
                var r = t[s];
                if ("multi" == r.type) {
                    r.answer = "";
                    for (var o = 0; o < r.items.length; o++) r.items[o].id == n && (r.items[o].selected = !r.items[o].selected), 
                    r.items[o].selected && (r.answer += o + 1 + ",");
                    r.answer = r.answer.substring(0, r.answer.length - 1);
                }
            }
        }
        this.setData({
            voteAll: a
        });
    },
    textInput: function(e) {
        for (var t, n = e.currentTarget.dataset.id, a = this.data.voteAll, i = e.detail.value, s = 0; s < a.length; s++) {
            t = a[s].questions;
            for (var r = 0; r < t.length; r++) "text" == t[r].type && t[r].id == n && (t[r].answer = i, 
            t[r].text = i);
        }
        this.setData({
            voteAll: a
        });
    },
    subVote: function(e) {
        for (var t, n = this.data.voteAll, a = e.currentTarget.dataset.id, i = !1, s = 0; s < n.length; s++) if (n[s].id == a) {
            for (var r = 0; r < n[s].questions.length; r++) {
                var o = n[s].questions[r].items;
                if (o) for (var l = 0; l < o.length; l++) if ("true" == o[l].correct) {
                    i = !0;
                    break;
                }
                if (i) break;
            }
            if ("false" == n[s].skip) for (var d = 0; d < n[s].questions.length; d++) if ("" == n[s].questions[d].answer) return wx.showModal({
                title: "提示",
                content: "强制投票需要回答完所有题目",
                showCancel: !1,
                confirmText: "我知道了",
                confirmColor: "#0078d7"
            }), !1;
            t = n[s], i ? n[s].showAns = !0 : n.splice(s, 1);
            break;
        }
        this.channel.send("submitVote", t), 0 == n.length ? (this.videoContext.play(), this.setData({
            voteAll: n,
            isShowQnaire: !1
        })) : this.setData({
            voteAll: n
        });
    },
    closeNaire: function(e) {
        for (var t = e.currentTarget.dataset.id, n = this, a = n.data.voteAll, i = 0; i < a.length; i++) if (a[i].id == t) {
            a.splice(i, 1);
            break;
        }
        0 == a.length ? (n.videoContext.play(), n.setData({
            voteAll: a,
            isShowQnaire: !1
        })) : n.setData({
            voteAll: a
        });
    },
    screenChange: function(e) {
        var t = e.detail.fullScreen;
        this.setData({
            isFullScreen: t
        });
    },
    exitFull: function(e) {
        this.videoContext.exitFullScreen();
    },
    timeupdate: function(t) {
        t.detail.currentTime != d && (e.globalData.currentTime = t.detail.currentTime, a.initMediaEvent.timeRecord(), 
        Math.abs(t.detail.currentTime - d) > 1 && (this.clearAnno(), 0 == t.detail.currentTime ? this.chat.reset() : this.chat.refreshChat(), 
        a.initMediaEvent.timeupdate(), a.initMediaEvent.seeking(), a.initMediaEvent.seeked()), 
        d = t.detail.currentTime, console.log(e.globalData.currentTime));
    },
    playVideo: function(e) {
        a.initMediaEvent.play(), a.initMediaEvent.playing();
    },
    pauseVideo: function(e) {
        a.initMediaEvent.pause();
    },
    endVideo: function(e) {
        a.initMediaEvent.ended();
    },
    onUnload: function(e) {
        a._open_.refresh();
    }
});