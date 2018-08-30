function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
    }
    return Array.from(e);
}

function t() {
    var e = new Date(), t = e.getMonth(), n = e.getDate(), o = e.getHours(), a = e.getMinutes(), i = e.getSeconds();
    return t = t < 9 ? "-0" + (t + 1) + "-" : "-" + (1 + t) + "-", n < 10 && (n = "0" + n), 
    o < 10 && (o = "0" + o), a < 10 && (a = "0" + a), i < 10 && (i = "0" + i), e.getFullYear() + "" + t + n + "T" + o + ":" + a + ":" + i + "+08:00";
}

function n(e) {
    var t = e ? new Date(e) : new Date(), n = t.getTimezoneOffset(), o = t.getTime() + 6e4 * (n - -480);
    return new Date(o);
}

function o(e, t) {
    wx.login({
        success: function(n) {
            var o = n.code;
            wx.request({
                url: r.get_jscode2session,
                data: {
                    code: o,
                    ext_appid: wx.getExtConfigSync().extAppid
                },
                success: function(n) {
                    var o = n.data;
                    0 === o.err_code ? e && e(o.data.apsid) : (wx.hideLoading(), wx.showModal({
                        title: "错误",
                        content: "登录失败：" + n.errMsg,
                        showCancel: !1
                    }), t && t(o.err_msg));
                },
                fail: function(e) {
                    wx.hideLoading(), wx.showModal({
                        title: "错误",
                        content: "网络连接错误" + e.errMsg,
                        showCancel: !1
                    }), t && t(e.errMsg);
                }
            });
        },
        fail: function(e) {
            wx.hideLoading(), wx.showModal({
                title: "错误",
                content: "获取微信登录凭证失败",
                showCancel: !1
            }), t && t(e.errMsg);
        }
    });
}

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, i = require("./interface.js"), r = i.imp(), c = getApp();

c.service, c.util;

module.exports = {
    timeFormat: function(e) {
        return e.split(" ")[0];
    },
    getmmdd: function(e) {
        var t = e.split("T")[0].split("-");
        return t[1] + "." + t[2];
    },
    dateDiff: function(e, t) {
        try {
            var n = e.split("-"), o = new Date();
            o.setFullYear(n[0], n[1] - 1, n[2]);
            var a = o.getTime(), i = t.split("-"), r = new Date();
            r.setFullYear(i[0], i[1] - 1, i[2]);
            var c = (a - r.getTime()) / 864e5;
            return Math.ceil(c);
        } catch (e) {
            return !1;
        }
    },
    hideTel: function(e) {
        return e.slice(0, 3) + " **** " + e.slice(7);
    },
    currentTime: function(e) {
        e = e || 0;
        var t = new Date().getTime() + 24 * e * 3600 * 1e3, n = new Date(t), o = n.getMonth(), a = n.getDate();
        return o = o < 9 ? "-0" + (o + 1) + "-" : "-" + (1 + o) + "-", a < 10 && (a = "0" + a), 
        n.getFullYear() + "" + o + a;
    },
    current: t,
    generateBeijingTime: n,
    currentBeijingTime: function(e) {
        e = e || 0;
        var t = n().getTime() + 24 * e * 3600 * 1e3, o = new Date(t), a = o.getMonth(), i = o.getDate();
        return a = a < 9 ? "-0" + (a + 1) + "-" : "-" + (1 + a) + "-", i < 10 && (i = "0" + i), 
        o.getFullYear() + "" + a + i;
    },
    currentBeijing: function(e) {
        var t = n(e), o = t.getMonth(), a = t.getDate(), i = t.getHours(), r = t.getMinutes(), c = t.getSeconds();
        return o = o < 9 ? "-0" + (o + 1) + "-" : "-" + (1 + o) + "-", a < 10 && (a = "0" + a), 
        i < 10 && (i = "0" + i), r < 10 && (r = "0" + r), c < 10 && (c = "0" + c), t.getFullYear() + "" + o + a + "T" + i + ":" + r + ":" + c + "+08:00";
    },
    tTimeFormat: function(e) {
        return e.split("T")[0];
    },
    doAnimation: function(e, t, n) {
        n.animation = wx.createAnimation(), n.setData({
            tipType: e,
            errorMessage: t
        }), n.animation.translate(0, 44).step(), n.setData({
            animation: n.animation.export()
        }), setTimeout(function() {
            n.animation.translate(0, 0).step(), n.setData({
                animation: n.animation.export()
            });
        }, 3e3);
    },
    yymmdd: function(e) {
        return e.split("T")[0] + " " + e.split("T")[1].split("+")[0];
    },
    dateDiff2: function(e, t, n) {
        var o, a;
        n > e ? (o = e, a = t) : (o = n, a = t);
        try {
            var i = o.split("-"), r = new Date();
            r.setFullYear(i[0], i[1] - 1, i[2]);
            var c = r.getTime(), s = a.split("-"), l = new Date();
            l.setFullYear(s[0], s[1] - 1, s[2]);
            var u = (c - l.getTime()) / 864e5;
            return Math.ceil(u) + 1;
        } catch (e) {
            return !1;
        }
    },
    getDateFromCurrentDate: function(e, t) {
        var n, o, a = new Date(Date.parse(e.replace(/-/g, "/")));
        a.setDate(a.getDate() + t);
        var i = a.getFullYear(), r = a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1, c = a.getDate() < 10 ? "0" + a.getDate() : a.getDate();
        switch (n = i + "-" + r + "-" + c, o = new Date(i + "/" + r + "/" + c).getDay()) {
          case 0:
            o = "日";
            break;

          case 1:
            o = "一";
            break;

          case 2:
            o = "二";
            break;

          case 3:
            o = "三";
            break;

          case 4:
            o = "四";
            break;

          case 5:
            o = "五";
            break;

          case 6:
            o = "六";
        }
        return {
            yymmdd: n,
            week: o
        };
    },
    netWorkCheck: function() {
        wx.getNetworkType({
            success: function(e) {
                e.networkType;
            }
        });
    },
    setObjectData: function(e, t, n, o) {
        var a = e.data[t];
        return a[n] = o, a;
    },
    collectFormID: function(e, t) {
        e && -1 === e.indexOf("mock") && wx.request({
            url: r.collect_form_id,
            data: {
                form_id: e
            },
            header: {
                "content-type": "application/json",
                apsid: t
            },
            method: "POST"
        });
    },
    uploadVoice: function(e) {
        "object" === (void 0 === e ? "undefined" : a(e)) && wx.uploadFile({
            url: "mp3" == e.type ? r.upload_voice_mp3 : r.upload_voice,
            filePath: e.voiceObj.tempPath,
            name: "file",
            header: {
                "content-type": "application/json",
                apsid: e.apsid
            },
            success: function(t) {
                var n = void 0;
                try {
                    n = JSON.parse(t.data);
                } catch (e) {
                    console.log(JSON.stringify(e));
                }
                n ? 0 === n.err_code ? ("hybrid" === e.mode && (e.voiceObj.voiceUrl = r.voicePrefix + n.data.voice_name), 
                e.voiceObj.voiceName = n.data.voice_name, e.voiceObj.success = !0, console.log("common.uploadvoice success:"), 
                e.onSuccess && e.onSuccess(e.voiceObj)) : (e.voiceObj.success = !1, e.onFail && e.onFail(n.err_msg)) : e.onFail && e.onFail("JSON parse error");
            },
            fail: function(t) {
                e.voiceObj.success = !1, e.onFail && e.onFail(t.errMsg);
            },
            complete: function(t) {
                e.onComplete && e.onComplete();
            }
        });
    },
    downloadVoice: function(e) {
        "object" === (void 0 === e ? "undefined" : a(e)) && wx.downloadFile({
            url: e.voiceObj.voiceUrl || e.voiceObj.voice_url,
            success: function(t) {
                console.log("download success"), e.voiceObj.tempPath = t.tempFilePath, e.onSuccess && e.onSuccess(e.voiceObj);
            },
            fail: function(t) {
                console.log("downloadFile failed:" + JSON.stringify(t)), e.onFail && e.onFail(t);
            },
            complete: function(t) {
                e.onComplete && e.onComplete(t);
            }
        });
    },
    request: function(e) {
        var t = {
            url: e.url,
            data: e.data,
            header: e.header,
            method: e.method,
            dataType: e.dataType,
            success: function(t) {
                var n = t.data;
                106 === n.err_code ? (console.log("err_not_login"), o(function(t) {
                    c.globalData.apsid = t, e.header.apsid = t, wx.setStorage({
                        key: "userProfile",
                        data: {
                            apsid: t
                        }
                    }), wx.request(e);
                }, function(e) {
                    console.log(e);
                })) : (0 !== n.err_code && wx.request({
                    url: r.add_debug_log,
                    data: {
                        title: e.url,
                        my_type: "",
                        obj_id: 0,
                        json: JSON.stringify({
                            response: t,
                            request_options: e
                        })
                    },
                    header: e.header,
                    method: "POST",
                    dataType: e.dataType
                }), e.success && e.success(t));
            },
            fail: e.fail,
            complete: e.complete
        };
        wx.request(t);
    },
    updateWxSession: function() {
        console.log("updateWxSession");
        var e = c.globalData.loginUser.extAppID;
        e && wx.login({
            success: function(t) {
                wx.request({
                    url: i.imp().get_jscode2session,
                    data: {
                        code: t.code,
                        ext_appid: e
                    }
                });
            }
        });
    },
    changePictureQuality: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "small";
        if (!e) return "";
        var n = e.split("?")[0];
        return "small" === t ? n + "?x-oss-process=image/resize,m_fill,h_150,w_150" : "small_long" == t ? n + "?x-oss-process=image/resize,m_lfit,h_360,w_360" : n;
    },
    toDecimal2: function(e) {
        var t = parseFloat(e);
        if (isNaN(t)) return !1;
        var n = (t = Math.round(100 * e) / 100).toString(), o = n.indexOf(".");
        for (o < 0 && (o = n.length, n += "."); n.length <= o + 2; ) n += "0";
        return n;
    },
    log4j: function(e) {},
    yymmddhhmm: function(e) {
        var t = e.split("T"), n = t[1].split("+")[0].split(":");
        return t[0] + " " + n[0] + ":" + n[1];
    },
    logPunchcardData: function(n, o) {
        var a = {
            data: n,
            time: t(),
            response: null
        };
        wx.getStorage({
            key: "myPunchcards",
            success: function(t) {
                var n = t.data || [];
                n.length >= 30 && n.pop(), wx.setStorageSync("myPunchcards", [ a ].concat(e(n)));
            },
            fail: function(e) {
                wx.setStorageSync("myPunchcards", [ a ]);
            },
            complete: function() {
                "function" == typeof o && o();
            }
        });
    },
    logResponse: function(e) {
        wx.getStorage({
            key: "myPunchcards",
            success: function(t) {
                var n = t.data, o = n[0];
                o.response || (o.response = e), wx.setStorage({
                    key: "myPunchcards",
                    data: n
                });
            }
        });
    },
    envalExport: function(e) {
        var t = "";
        return e.forEach(function(e, n) {
            "sil" != e.text && (e.score >= 6.5 ? t += e.text + " " : 0 == e.score ? t += "<div style='color: #8b97a4; display: inline'>" + e.text + "</div> " : t += "<div style='color:#ff7474;display:inline'>" + e.text + "</div> ");
        }), t;
    },
    getFullPath: function(e, t) {
        return e + "?" + Object.keys(t).map(function(e) {
            return e + "=" + t[e];
        }).join("&");
    },
    ifToInfo: function() {
        c.globalData.hideLogoJump || wx.navigateTo({
            url: "/pages/admin_sub/intro/intro"
        });
    }
};