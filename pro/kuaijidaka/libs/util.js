function t(t) {
    var e = t ? new Date(t) : new Date(), n = e.getTimezoneOffset(), i = e.getTime() + 6e4 * (n - -480);
    return new Date(i);
}

function e(t, e) {
    var n = getApp().util.config.staticPictureBase, i = [ t, e >= 2 ? 2 : 1 ].join(""), a = {
        "01": n + "default-cover-calendar.png",
        "02": n + "default-cover-calendar-admin.png",
        11: n + "default-cover-homework.png",
        12: n + "default-cover-homework-admin.png",
        21: n + "default-cover-unlock.png",
        22: n + "default-cover-unlock-admin.png"
    };
    return a[i] ? a[i] : "";
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, i = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
};

module.exports = {
    storage: function(t, e, n) {
        !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
        var i = !1;
        switch (t) {
          case "set":
            try {
                wx.setStorageSync(e, n), i = !0;
            } catch (t) {
                t.error;
            }
            break;

          case "get":
            try {
                i = wx.getStorageSync(e);
            } catch (t) {
                t.error;
            }
            break;

          case "remove":
            try {
                wx.removeStorageSync(e), i = !0;
            } catch (t) {
                t.error;
            }
        }
        return i;
    },
    log: function() {
        var t;
        "dev" === this.config.env && (t = console).log.apply(t, arguments);
    },
    showModal: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "系统提示", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "确定", a = arguments[4];
        "" == e && (e = ""), wx.showModal({
            title: t,
            content: e,
            showCancel: n,
            confirmText: i,
            success: function(t) {
                return "function" == typeof a && a(t);
            }
        });
    },
    showToast: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "加载中...", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "loading", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3e5;
        wx.showToast({
            title: t,
            mask: !0,
            icon: e,
            duration: n
        });
    },
    hideToast: function() {
        wx.hideToast();
    },
    getNetworkType: function(t) {
        wx.getNetworkType({
            success: function(e) {
                return "function" == typeof t && t(e);
            },
            fail: function() {
                var e = {
                    errMsg: "getNetworkType:fail",
                    networkType: "error"
                };
                return "function" == typeof t && t(e);
            }
        });
    },
    getAudioCtx: function(t) {
        var e = this.globalData.audioCtxs, n = e.filter(function(e) {
            return e.audioCtxID === t;
        })[0];
        if (n) return n;
        var i = wx.createInnerAudioContext();
        if (i.audioCtxID = t, i.obeyMuteSwitch = !1, e.length >= 5) {
            var a = e.shift();
            a.destroy(), a.destroied = !0;
        }
        return e.push(i), i;
    },
    getRecorderManager: function() {
        return this.globalData.recorderManager || (this.globalData.recorderManager = wx.getRecorderManager()), 
        this.globalData.recorderManager;
    },
    stopVoicePlay: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this.globalData.audioCtxs.filter(function(t) {
            return !t.paused && !t.destroied;
        }).forEach(function(t) {
            t.stop && t.stop();
        }), t && this.globalData.backgroundAudioManager && this.globalData.backgroundAudioManager.pause();
    },
    pauseVoicePlay: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this.globalData.audioCtxs.filter(function(t) {
            return !t.paused && !t.destroied;
        }).forEach(function(t) {
            t.pause && t.pause();
        }), t && this.globalData.backgroundAudioManager && this.globalData.backgroundAudioManager.pause();
    },
    setDataImproved: function(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], a = arguments[3];
        if (clearTimeout(t._setDataTimer), n) {
            var r = i({}, t._dataToSet, e);
            t._dataToSet = null, t.setData(r, function() {
                "function" == typeof a && a();
            });
        } else t._dataToSet = i({}, t._dataToSet, e), t._setDataTimer = setTimeout(function() {
            if (t._dataToSet) {
                var e = i({}, t._dataToSet);
                t._dataToSet = null, t.setData(e, function() {
                    "function" == typeof a && a();
                });
            }
        }, 100);
    },
    getFullPath: function(t, e) {
        return ("/" === t.slice(0, 1) ? t : "/" + t) + "?" + Object.keys(e).map(function(t) {
            return t + "=" + e[t];
        }).join("&");
    },
    changePictureQuality: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "origin";
        if (!t) return "";
        var n = t.split("?")[0];
        return "small" === e ? n + "?x-oss-process=image/resize,m_fill,h_150,w_150" : "small_long" == e ? n + "?x-oss-process=image/resize,w_500" : n;
    },
    currentBeijingTime: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, n = t().getTime() + 24 * e * 3600 * 1e3, i = new Date(n), a = i.getMonth(), r = i.getDate();
        return a = a < 9 ? "-0" + (a + 1) + "-" : "-" + (1 + a) + "-", r < 10 && (r = "0" + r), 
        i.getFullYear() + "" + a + r;
    },
    currentBeijingTimeFull: function(e) {
        var n = t(e), i = n.getMonth(), a = n.getDate(), r = n.getHours(), o = n.getMinutes(), s = n.getSeconds();
        return i = i < 9 ? "-0" + (i + 1) + "-" : "-" + (1 + i) + "-", a < 10 && (a = "0" + a), 
        r < 10 && (r = "0" + r), o < 10 && (o = "0" + o), s < 10 && (s = "0" + s), n.getFullYear() + "" + i + a + "T" + r + ":" + o + ":" + s + "+08:00";
    },
    showError: function(t, e) {
        e.animation = wx.createAnimation(), e.animation.translate(0, 44).step(), e.setData({
            tipType: "error",
            errorMessage: t,
            animation: e.animation.export()
        }), setTimeout(function() {
            e.animation.translate(0, 0).step(), e.setData({
                errorMessage: "",
                animation: e.animation.export()
            });
        }, 3e3);
    },
    showSuccess: function(t, e) {
        e.animation = wx.createAnimation(), e.animation.translate(0, 44).step(), e.setData({
            tipType: "successV2",
            errorMessage: t,
            animation: e.animation.export()
        }), setTimeout(function() {
            e.animation.translate(0, 0).step(), e.setData({
                errorMessage: "",
                animation: e.animation.export()
            });
        }, 3e3);
    },
    getYYMMDD: function(t) {
        return "string" == typeof t ? t.split("T")[0] : "";
    },
    getHHMM: function(t) {
        return "string" == typeof t ? t.split("T")[1].slice(0, 5) : "";
    },
    getMMSS: function(t) {
        var e = Math.floor(t / 60), n = t % 60;
        return e = e < 10 ? "0" + e : e, n = n < 10 ? "0" + n : n, e + ":" + n;
    },
    getEvalResultHTML: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "zh", i = [], a = [ "32", "64", "128" ], r = function(t) {
            return "<div style='color:#ff7474;display:inline;'>" + t + "</div>";
        }, o = function(t) {
            return "<div style='color:#8b97a4;display:inline;'>" + t + "</div>";
        }, s = "zh" === n ? function(t) {
            return "16" === t.dp_message ? o(t.text) : a.indexOf(t.dp_message) > -1 ? r(t.text) : t.text;
        } : function(t) {
            return 0 === t.score ? o(t.text) : t.score < 6 ? r(t.text) : t.text;
        };
        return t.forEach(function(t) {
            if ("sil" != t.text) {
                var n = e.indexOf(t.text);
                n > -1 ? (i.push(e.slice(0, n), s(t)), e = e.slice(n + t.text.length)) : i.push(s(t), " ");
            }
        }), i.concat(e).join("");
    },
    dateDiff: function(t, e) {
        var n = t.split("-"), i = new Date();
        i.setFullYear(n[0], n[1] - 1, n[2]);
        var a = i.getTime(), r = e.split("-"), o = new Date();
        o.setFullYear(r[0], r[1] - 1, r[2]);
        var s = (a - o.getTime()) / 864e5;
        return Math.ceil(s);
    },
    getDateFromCurrentDate: function(t, e) {
        var n, i;
        console.log(new Date(Date.parse(t.replace(/-/g, "/"))));
        var a = new Date(Date.parse(t.replace(/-/g, "/")));
        a.setDate(a.getDate() + e);
        var r = a.getFullYear(), o = a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1, s = a.getDate() < 10 ? "0" + a.getDate() : a.getDate();
        switch (n = r + "-" + o + "-" + s, i = new Date(r + "/" + o + "/" + s).getDay()) {
          case 0:
            i = "日";
            break;

          case 1:
            i = "一";
            break;

          case 2:
            i = "二";
            break;

          case 3:
            i = "三";
            break;

          case 4:
            i = "四";
            break;

          case 5:
            i = "五";
            break;

          case 6:
            i = "六";
        }
        return {
            yymmdd: n,
            week: i
        };
    },
    generateBeijingTime: function(t) {
        var e = t ? new Date(t) : new Date(), n = e.getTimezoneOffset(), i = e.getTime() + 6e4 * (n - -480);
        return new Date(i);
    },
    tTimeFormat: function(t) {
        return t.split("T")[0];
    },
    yymmdd: function(t) {
        return t.split("T")[0] + " " + t.split("T")[1].split("+")[0];
    },
    checkBeforDelete: function(t) {
        var e = this.app.globalData.uploadingTaskArray, n = this.app.globalData.preparingUploadArray, i = !1;
        return e.map(function(n, a) {
            n.filePath === t && (e[a].uploadTask.abort(), e.splice(a, 1), i = !0);
        }), n.map(function(e, a) {
            e.file === t && (n.splice(a, 1), i = !0);
        }), i;
    },
    getmmdd: function(t) {
        var e = t.split("T")[0].split("-");
        return e[1] + "." + e[2];
    },
    toDecimal2: function(t) {
        var e = parseFloat(t);
        if (isNaN(e)) return !1;
        var n = (e = Math.round(100 * t) / 100).toString(), i = n.indexOf(".");
        for (i < 0 && (i = n.length, n += "."); n.length <= i + 2; ) n += "0";
        return n;
    },
    passDataToPage: function(t, e, n) {
        var i = {};
        i[t] = n, this.globalData.onshowData[e] = i;
    },
    getOnshowData: function(t, e) {
        var n = this.globalData.onshowData;
        return n[t] && n[t][e] ? n[t][e] : null;
    },
    clearOnshowData: function(t, e) {
        var n = this.globalData.onshowData;
        n[t] && n[t][e] && (n[t][e] = null);
    },
    debounce: function(t) {
        function e() {
            return new Date().getTime();
        }
        function i(e) {
            var n = l, i = f;
            return l = f = void 0, b = e, m = t.apply(i, n);
        }
        function a(t) {
            return b = t, d = setTimeout(s, h), D ? i(t) : m;
        }
        function r(t) {
            var e = t - b, n = h - (t - p);
            return T ? nativeMin(n, g - e) : n;
        }
        function o(t) {
            var e = t - p, n = t - b;
            return void 0 === p || e >= h || e < 0 || T && n >= g;
        }
        function s() {
            var t = e();
            if (o(t)) return u(t);
            d = setTimeout(s, r(t));
        }
        function u(t) {
            return d = void 0, y && l ? i(t) : (l = f = void 0, m);
        }
        function c() {
            var t = e(), n = o(t);
            if (l = arguments, f = this, p = t, n) {
                if (void 0 === d) return a(p);
                if (T) return d = setTimeout(s, h), i(p);
            }
            return void 0 === d && (d = setTimeout(s, h)), m;
        }
        var l, f, g, m, d, p, h = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2e3, v = arguments[2], b = 0, D = !0, T = !1, y = !1;
        if ("function" != typeof t) throw new TypeError(FUNC_ERROR_TEXT);
        return h = Number(h) || 0, "object" == (void 0 === v ? "undefined" : n(v)) && (D = !!v.leading, 
        g = (T = "maxWait" in v) ? nativeMax(Number(v.maxWait) || 0, h) : g, y = "trailing" in v ? !!v.trailing : y), 
        c.cancel = function() {
            void 0 !== d && clearTimeout(d), b = 0, l = p = f = d = void 0;
        }, c.flush = function() {
            return void 0 === d ? m : u(e());
        }, c;
    },
    compareVersion: function(t, e) {
        t = t.split("."), e = e.split(".");
        for (var n = Math.max(t.length, e.length); t.length < n; ) t.push("0");
        for (;e.length < n; ) e.push("0");
        for (var i = 0; i < n; i++) {
            var a = parseInt(t[i]), r = parseInt(e[i]);
            if (a > r) return 1;
            if (a < r) return -1;
        }
        return 0;
    },
    showShareMenu: function() {
        wx.showShareMenu && wx.showShareMenu({
            withShareTicket: !0,
            fail: function(t) {
                console.log("showShareMenu failed: " + JSON.stringify(t));
            }
        });
    },
    stopVideoPlay: function() {
        var t = this.globalData.videoCtx;
        t && t.pause && t.pause();
    },
    setSubmitListObj: function(t) {
        this.globalData.submitListObj = t;
    },
    getSubmitListObj: function() {
        return this.globalData.submitListObj;
    },
    clearSubmitListObj: function() {
        this.globalData.submitListObj = null;
    },
    updateSubmitListObj: function(t, e, n) {
        var i = this.getSubmitListObj();
        if (i) {
            i.submit_list = i.submit_list || [], i.my_submit = i.my_submit || {};
            var a = i.submit_list, r = i.my_submit;
            "comment" === t && (e ? function(t) {
                var e = a.find(function(e) {
                    return e.submit_id === t.submitId;
                });
                e ? (e.comments = e.comments || [], e.comments.push(t.data)) : r && r.submit_id === t.submitId && (r.comments = r.comments || [], 
                r.comments.push(t.data));
            }(n) : function(t) {
                var e = a.find(function(e) {
                    return e.submit_id === t.submitId;
                }), n = t.data.comment_id;
                if (e) {
                    e.comments = e.comments || [];
                    var i = e.comments.findIndex(function(t) {
                        return t.comment_id === n;
                    });
                    e.comments.splice(i, 1);
                } else if (r && r.submit_id === t.submitId) {
                    r.comments = r.comments || [];
                    var o = r.comments.findIndex(function(t) {
                        return t.comment_id === n;
                    });
                    r.comments.splice(o, 1);
                }
            }(n)), "praise" === t && (e ? function(t) {
                var e = a.find(function(e) {
                    return e.submit_id === t.submitId;
                });
                t.data.user_id, e ? (e.praises = e.praises || [], e.praises.push(t.data)) : r && r.submit_id === t.submitId && (r.praises = r.praises || [], 
                r.praises.push(t.data));
            }(n) : function(t) {
                var e = a.find(function(e) {
                    return e.submit_id === t.submitId;
                }), n = t.data.user_id;
                if (e) {
                    e.praises = e.praises || [];
                    var i = e.praises.findIndex(function(t) {
                        return t.user_id === n;
                    });
                    e.praises.splice(i, 1);
                } else if (r && r.submit_id === t.submitId) {
                    r.praises = r.praises || [];
                    var o = r.praises.findIndex(function(t) {
                        return t.user_id === n;
                    });
                    r.praises.splice(o, 1);
                }
            }(n));
        }
    },
    getTime: function(t) {
        var e = t.split("+")[0].split("T"), n = e[0].split("-"), i = e[1].split(":");
        return new Date(parseInt(n[0]), parseInt(n[1]) - 1, parseInt(n[2]), parseInt(i[0]), parseInt(i[1]), parseInt(i[2])).getTime();
    },
    bytesCount: function(t) {
        return t.replace(/[^\u0000-\u00ff]/g, "aa").length;
    },
    formatBase64Image: function(t) {
        return "data:image/jpeg;base64," + t;
    },
    Color: function() {
        this.HexToRgb = function(t) {
            for (var e = (t = t.replace("#", "")).match(/../g), n = 0; n < 3; n++) e[n] = parseInt(e[n], 16);
            return e;
        }, this.RgbToHex = function(t) {
            for (var e = t.toString().match(/\d+/g), n = "#", i = 0; i < 3; i++) n += ("0" + Number(e[i]).toString(16)).slice(-2);
            return n;
        }, this.getDarkColor = function(t, e) {
            for (var n = this.HexToRgb(t), i = 0; i < 3; i++) n[i] = Math.floor(n[i] * (1 - e));
            return this.RgbToHex(n[0].toString() + ", " + n[1].toString() + "," + n[2].toString());
        }, this.getLightColor = function(t, e) {
            for (var n = this.HexToRgb(t), i = 0; i < 3; i++) n[i] = Math.floor((255 - n[i]) * e + n[i]);
            return this.RgbToHex(n[0].toString() + ", " + n[1].toString() + "," + n[2].toString());
        };
    },
    hasAuthorized: function(t, e, n) {
        wx.getSetting({
            success: function(i) {
                i.authSetting[t] ? "function" == typeof e && e() : "function" == typeof n && n();
            }
        });
    },
    getDefaultCover: e,
    numToCN: function(t) {
        for (var e = [ "零", "一", "二", "三", "四", "五", "六", "七", "八", "九" ], n = [ "", "十", "百", "千" ], i = "", a = "", r = 0, o = !0; t > 0; ) {
            var s = t % 10;
            0 === s ? o || (o = !0, a = e[s] + a) : (o = !1, i = e[s], a = (i += n[r]) + a), 
            r++, t = Math.floor(t / 10);
        }
        return a;
    },
    getCourseCover: function(t, n, i) {
        return n = parseInt(n), "cutScreen" === t ? "" : t || e(n, i);
    }
};