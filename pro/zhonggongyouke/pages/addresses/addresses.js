getApp();

var t = require("../../utils/common.js"), e = require("../../utils/login.js");

Page({
    onShow: function() {
        this.checkStudentId(), this.addressList();
    },
    checkStudentId: function() {
        e.hasStudentID() || wx.navigateTo({
            url: "../login/login"
        });
    },
    addressList: function() {
        var e = this, s = {
            student_id: wx.getStorageSync("student_id")
        };
        t.globalRequest(s, "index/student/addresslist", function(s) {
            if (200 == s.statusCode) if (0 == s.data.retcode) {
                var d = s.data.data;
                e.setData({
                    addressList: d,
                    addressListLength: d.length
                });
            } else t.tip(s.data.message); else t.tip(s.errMsg);
        });
    },
    editAddress: function(t) {
        var e = "../address/address?address_id=" + t.currentTarget.dataset.address_id;
        wx.navigateTo({
            url: e
        });
    },
    checkAddress: function(t) {
        var e = t.currentTarget.dataset.address_id;
        wx.setStorageSync("address_id", e), wx.navigateBack({});
    }
});