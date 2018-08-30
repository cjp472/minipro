function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var n = t[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t;
    };
}(), n = require("../config.js"), r = e(require("./rpcLayer.js")), i = e(require("../../game/utils.js")), a = void 0, u = function() {
    function e() {
        return t(this, e), a || (a = this, this.count = 0), a;
    }
    return o(e, [ {
        key: "sendRequest",
        value: function(e, t) {
            wx.showLoading && wx.showLoading({
                title: "生成长图中"
            }), r.wxDownloadFile("generateLongImage", n.config.generate_image_api + i.toParamStr(e), function(e) {
                wx.hideLoading && wx.hideLoading();
                var o = e.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function(e) {
                        t(o);
                    },
                    fail: function(e) {
                        console.log("Save image failed. Error:", e);
                    }
                });
            }, function(e) {
                throw wx.hideLoading && wx.hideLoading(), wx.showToast({
                    title: "生成长图失败",
                    image: "/assets/icon/cross.svg",
                    duration: 2e3
                }), new Error(e);
            });
        }
    } ], [ {
        key: "checkSaveImagePermission",
        value: function(e) {
            wx.authorize({
                scope: "scope.writePhotosAlbum",
                success: e,
                fail: function(t) {
                    console.log("Requesting scope.writePhotosAlbum failed. err: ", t), wx.showModal({
                        title: "没有授权",
                        content: "点击“确定”前往设置页面给予“保存到相册”的权限",
                        success: function(t) {
                            t.confirm && wx.openSetting({
                                success: function(t) {
                                    return t.authSetting["scope.writePhotosAlbum"] ? e() : "";
                                }
                            });
                        }
                    });
                }
            });
        }
    }, {
        key: "getShareCardRequest",
        value: function(e, t) {
            return e.recordId ? e.mode = "shareCardWithRecord" : void 0 !== e.roundNumber && (e.mode = "shareCardWithRoundNumber"), 
            n.config.generate_share_card_api + i.toParamStr(e);
        }
    }, {
        key: "generateShareResult",
        value: function(e, t) {
            a.sendRequest(e, t);
        }
    } ]), e;
}();

exports.default = u, new u();