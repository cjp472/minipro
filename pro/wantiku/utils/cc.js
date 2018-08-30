var t = require("md5-utf8.js"), e = "FC811B3AFE595DA3", o = "yNi9lcZsuUi2Fe1IaZeAwkflrUgHGTb0", a = "2ADA6249FCE66910", s = "6jKeLeYxQ3RE159i1cnnZQvw3WKwIjqa";

module.exports = function(l) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    arguments[2] && (e = a, o = s), wx.request({
        url: "https://p.bokecc.com/api/system/localtime?format=json",
        method: "GET",
        header: {
            "content-type": "json"
        },
        success: function(a) {
            var s = a.statusCode;
            if (a.errMsg, a.data, 200 == s) {
                var n = a.data.system.time, c = "";
                c += "format=json", c += "&hlsflag=1", c += "&httpsflag=1", c += "&userid=" + e;
                var r = (c += "&videoid=" + l) + "&time=" + n + "&hash=" + t(c + "&time=" + n + "&salt=" + o);
                wx.request({
                    url: "https://p.bokecc.com/api/mobile?" + r,
                    data: {},
                    method: "GET",
                    header: {
                        "content-type": "json"
                    },
                    success: function(t) {
                        if (200 == t.statusCode) {
                            var e = t.data;
                            console.log(e);
                            var o = e.video.copy, a = o[0];
                            80 == a.quality && (a = o[1]), console.log(a);
                            for (var s in o) {
                                var n = o[s];
                                80 != n.quality && n.quality > a.quality && (a = n);
                            }
                            console.log(l), console.log(a.playurl);
                            var c = a.playurl;
                            c = c.replace("http://", "https://"), "function" == typeof i && i(c);
                        }
                    },
                    fail: function() {},
                    complete: function() {}
                });
            }
        },
        fail: function() {},
        complete: function() {}
    });
};