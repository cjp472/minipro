function t(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

function e(t, e, n, o) {
    var r = 0, a = null, i = !1;
    a = setInterval(function() {
        (i = t()) && clearInterval(a), (r += n) > o && (console.log(r), clearInterval(a), 
        e());
    }, n);
}

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), o = e.getMonth() + 1, r = e.getDate(), a = e.getHours(), i = e.getMinutes(), c = e.getSeconds();
        return [ n, o, r ].map(t).join("/") + " " + [ a, i, c ].map(t).join(":");
    },
    objectAssign: function(t, e) {
        var n = {};
        if (t && e) {
            for (var o in t) n[o] = t[o];
            for (var r in e) n[r] = e[r];
        }
        return n;
    },
    setInterval: e,
    isNullOrEmpty: function(t) {
        return "" == t || null == t;
    },
    setIntervalWithTimeout: e,
    randomNumber: function(t) {
        return Math.floor(1e4 * Math.random());
    },
    fortmatPapersTime: function(t) {
        var e = "00:00";
        if ((t = Math.floor(t)) < 10) e = "00:0" + t; else if (t < 60) e = "00:" + t; else {
            var n = t / 60;
            e = (n = parseInt(n)) < 10 ? "0" + n + ":" : n + ":";
            var o = t % 60;
            o < 10 ? e = e + "0" + o : e += o;
        }
        return e;
    },
    array_contain: function(t, e) {
        for (var n = 0; n < t.length; n++) if (t[n] == e) return !0;
        return !1;
    },
    caculateStarCount: function(t) {
        t = t > 5 ? 5 : t;
        for (var e = [ 0, 0, 0, 0, 0 ], n = 0; n < t; n++) e[n] = 1;
        return e;
    },
    getTitleByExamType: function(t) {
        var e = "";
        return 0 == t ? e = "这道题你会吗？不服来战！" : 1 == t ? e = "考点智能练习" : 2 == t ? e = "章节智能练习" : 3 == t ? e = "真题模考" : 4 == t ? e = "错题练习" : 5 == t ? e = "收藏" : 6 == t ? e = "练习历史" : 7 == t ? e = "巩固模考" : 8 == t ? e = "阅后即焚" : 9 == t ? e = "精品3套卷" : 10 == t ? e = "提分密卷" : 11 == t ? e = "高频数据" : 12 == t ? e = "教材强化练习" : 13 == t && (e = "模考大赛"), 
        e;
    },
    getSrcInfoByImages: function(t) {
        var e = {};
        return t.indexOf("?") > 0 && (e.url = t, e.width = parseInt(t.split("?")[1].split("|")[0]), 
        e.height = parseInt(t.split("?")[1].split("|")[1])), e;
    },
    payEndTime: function(e) {
        var n = new Date();
        n.setMonth(n.getMonth() + e);
        var o = n.getFullYear(), r = n.getMonth() + 1, a = n.getDate(), i = n.getHours(), c = n.getMinutes();
        return [ o, r, a ].map(t).join("-") + " " + [ i, c ].map(t).join(":");
    },
    getLocation: function(t, e) {
        wx.getLocation({
            type: "wgs84",
            success: function(n) {
                console.log("getLocation:0");
                var o = n.latitude + "," + n.longitude;
                wx.request({
                    url: "https://apis.map.qq.com/ws/geocoder/v1/",
                    data: {
                        key: "MYLBZ-PPQW3-DOP3U-YUHN2-4EYRQ-C4B4I",
                        location: o
                    },
                    method: "GET",
                    success: function(e) {
                        console.log(e);
                        try {
                            wx.setStorageSync("province", e.data.result.address_component.province);
                        } catch (t) {
                            console.log(t);
                        }
                        console.log("getLocation:2"), t(e.data.result.address_component.province);
                    },
                    fail: function() {
                        console.log("getLocation:erro:0"), e();
                    }
                });
            },
            fail: function(t) {
                console.log("getLocation:erro:1"), e();
            }
        });
    }
};