getApp();

var t = require("../../utils/common.js"), i = require("../../utils/login.js");

Page({
    onShow: function() {
        this.checkStudentId(), this.publicList();
    },
    checkStudentId: function() {
        i.hasStudentID() || wx.navigateTo({
            url: "../login/login"
        });
    },
    publicList: function() {
        var i = this, e = {
            student_id: wx.getStorageSync("student_id")
        };
        t.globalRequest(e, "index/student/publiclist", function(e) {
            if (200 == e.statusCode) if (0 == e.data.retcode) {
                var s = e.data.data;
                i.setData({
                    publicList: s,
                    publicListLength: s.length
                });
            } else t.tip(e.data.message); else t.tip(e.errMsg);
        });
    },
    myPublicList: function(t) {
        var i = "../mypubliclist/mypubliclist?goods_id=" + t.currentTarget.dataset.goods_id;
        wx.navigateTo({
            url: i
        });
    }
});