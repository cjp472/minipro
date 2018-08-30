getApp();

var e = require("../../utils/common.js"), t = require("../../utils/login.js");

Page({
    data: {
        receiver: "",
        phone: "",
        region: [ "", "", "" ],
        detail_address: "",
        is_choose: !0
    },
    onLoad: function(e) {
        this.checkStudentId(), e.address_id && (this.setData({
            address_id: e.address_id
        }), this.showAddress());
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    checkStudentId: function() {
        t.hasStudentID() || wx.navigateTo({
            url: "../login/login"
        });
    },
    receiverInput: function(e) {
        this.setData({
            receiver: e.detail.value
        });
    },
    phoneInput: function(e) {
        this.setData({
            phone: e.detail.value
        });
    },
    detailAddressInput: function(t) {
        this.setData({
            detail_address: t.detail.value
        }), 34 == t.detail.value.length && e.tip("详细地址不能超过34个字符");
    },
    address: function() {
        var t = wx.getStorageSync("student_id");
        if ("" == this.data.receiver) return e.tip("请输入收货人"), !1;
        var a = this.data.phone;
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(a)) return e.tip("请输入正确的手机号"), !1;
        if ("" == this.data.detail_address) return e.tip("请输入详细地址"), !1;
        this.data.address_id || this.setData({
            address_id: 0
        });
        var d = {
            student_id: t,
            receiver: this.data.receiver,
            phone: this.data.phone,
            province: this.data.region[0],
            city: this.data.region[1],
            area: this.data.region[2],
            detail_address: this.data.detail_address,
            address_id: this.data.address_id
        };
        e.globalRequest(d, "index/student/updateaddress", function(t) {
            200 == t.statusCode ? 0 == t.data.retcode ? wx.navigateBack({}) : e.tip(t.data.message) : e.tip(t.errMsg);
        });
    },
    bindRegionChange: function(e) {
        console.log(e), this.setData({
            region: e.detail.value,
            is_choose: !1
        });
    },
    showAddress: function() {
        var t = this, a = {
            student_id: wx.getStorageSync("student_id"),
            address_id: t.data.address_id
        };
        e.globalRequest(a, "index/student/editaddress", function(a) {
            if (200 == a.statusCode) if (0 == a.data.retcode) {
                var d = a.data.data;
                t.setData({
                    receiver: d.receiver,
                    phone: d.phone,
                    detail_address: d.detail_address,
                    region: [ d.province, d.city, d.area ]
                });
            } else e.tip(a.data.message); else e.tip(a.errMsg);
        });
    },
    confirmDelete: function() {
        var t = this, a = wx.getStorageSync("student_id"), d = t.data.address_id;
        t.setData({
            del_address_id: d
        });
        var s = {
            student_id: a,
            address_id: d
        };
        e.globalRequest(s, "index/student/deladdress", function(a) {
            if (200 == a.statusCode) if (0 == a.data.retcode) {
                a.data.data;
                e.tip("删除成功");
                var d = wx.getStorageSync("address_id");
                t.data.del_address_id == d && wx.removeStorageSync("address_id"), wx.navigateBack({});
            } else e.tip(a.data.message); else e.tip(a.errMsg);
        });
    },
    deleteAddress: function() {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "确定要删除收货地址信息吗？",
            success: function(t) {
                t.confirm ? e.confirmDelete() : t.cancel;
            }
        });
    }
});