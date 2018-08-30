var e = {
    toHome: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    toLogin: function() {
        wx.navigateTo({
            url: "/pages/user/userLogin"
        });
    }
};

module.exports = e;