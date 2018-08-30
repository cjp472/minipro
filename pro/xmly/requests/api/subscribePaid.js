Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
}, t = require("../request"), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./postImplicitAccessToken")), n = require("../../constants/constants"), i = require("../../utils/util"), o = wx.getStorageSync("DEVICE_ID"), c = {
    app_key: n.APP_KEY,
    device_id: o,
    client_os_type: 3
};

exports.default = function(o, a) {
    var s = wx.getStorageSync("implicitToken");
    if (s && +new Date() < s.deadline) {
        var u = {
            access_token: s.access_token,
            operation_type: o,
            album_id: a
        }, _ = (0, i.calcuSig)(e({}, c, u), n.APP_SECRET);
        return (0, t.post)(n.OPEN_API_BASE + "/subscribe/add_or_delete", e({}, c, u, {
            sig: _
        }));
    }
    return (0, r.default)().then(function(e) {
        var t = e;
        return console.log(3, e), t.deadline = +new Date() + 1e3 * t.expires_in, wx.removeStorageSync("implicitToken"), 
        wx.setStorageSync("implicitToken", t), t.access_token;
    }).then(function(r) {
        var s = {
            access_token: r,
            operation_type: o,
            album_id: a
        }, u = (0, i.calcuSig)(e({}, c, s), n.APP_SECRET);
        return (0, t.post)(n.OPEN_API_BASE + "/subscribe/add_or_delete", e({}, c, s, {
            sig: u
        }));
    });
};