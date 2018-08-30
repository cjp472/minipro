Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e) {
    return new Promise(function(n, t) {
        wx.downloadFile({
            url: e,
            success: function(e) {
                n(e);
            },
            fail: function(e) {
                t(e);
            }
        });
    });
};