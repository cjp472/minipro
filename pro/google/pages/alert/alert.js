var e = require("../../common/initState.js"), t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../../game/eventlog.js")), r = require("../../libs/av-live-query-weapp-min").User, a = require("../../libs/underscore/underscore.modified");

Page({
    data: {
        abnormalAccount: !1
    },
    onLoad: function(n) {
        if (a.find(getApp().alert, function(e) {
            return "abnormal" === e.get("type");
        })) {
            this.setData({
                abnormalAccount: !0
            });
            var i = t.getContext().data();
            i.user_id = r.current().id, t.logEvent("abnormal", i);
        } else getApp().alert = void 0, getApp().setInitState(e.InitState.SUCCESS), wx.redirectTo({
            url: "/pages/home/home"
        });
    }
});