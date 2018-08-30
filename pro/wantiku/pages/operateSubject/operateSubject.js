require("../../biz/subject.js");

var e = require("../../biz/operatShare"), a = getApp();

Page({
    data: {
        list: [],
        options: {},
        iPhoneX: a.globalData.SystemInfo.iPhoneX,
        shareName: "",
        typeName: ""
    },
    onLoad: function(e) {
        var a = {};
        a.SubjectParentId = e.Sp, a.SubjectLevel = e.Sl, a.type = e.Ty, this.data.options = a, 
        this.french(a), console.log("options", this.data.iPhoneX);
    },
    onShow: function() {},
    bindChoose: function() {
        wx.redirectTo({
            url: "../chooseSchoolType/chooseSchoolType?backTab=1&selectexam=true"
        });
    },
    french: function(a) {
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 6e3,
            mask: !0
        });
        var t = this, o = a.type;
        1 == o ? e.zhentiInfo(a.SubjectParentId, 1, a.SubjectLevel, function(e) {
            var a = e.Data[0].SubjectParentName;
            t.data.typeName = "真题模考", t.data.shareName = t.removeField(a) + t.data.typeName, 
            wx.setNavigationBarTitle({
                title: t.data.shareName
            }), wx.hideToast(), t.setData({
                list: e.Data,
                typeName: t.data.typeName
            });
        }) : 2 == o ? e.tikuInfo(a.SubjectParentId, a.SubjectLevel, function(e) {
            var a = e.Data[0].SubjectParentName;
            t.data.typeName = "题库", t.data.shareName = t.removeField(a) + t.data.typeName, wx.setNavigationBarTitle({
                title: t.data.shareName
            }), wx.hideToast(), t.setData({
                list: e.Data,
                typeName: t.data.typeName
            });
        }) : 3 == o ? e.chapterCourseInfo(a.SubjectParentId, a.SubjectLevel, function(e) {
            var a = e.Data[0].SubjectParentName;
            t.data.typeName = "章节课", t.data.shareName = t.removeField(a) + t.data.typeName, 
            wx.setNavigationBarTitle({
                title: t.data.shareName
            }), t.setData({
                list: e.Data,
                typeName: t.data.typeName
            }), wx.hideToast();
        }) : 4 == o ? e.zhentiInfo(a.SubjectParentId, 0, a.SubjectLevel, function(e) {
            var a = e.Data[0].SubjectParentName;
            t.data.typeName = "章节练习", t.data.shareName = t.removeField(a) + t.data.typeName, 
            wx.setNavigationBarTitle({
                title: t.data.shareName
            }), t.setData({
                list: e.Data,
                typeName: t.data.typeName
            }), wx.hideToast();
        }) : 5 == o && e.mokaoInfo(a.SubjectParentId, a.SubjectLevel, function(e) {
            var a = e.Data[0].SubjectParentName;
            t.data.typeName = "巩固模考", t.data.shareName = t.removeField(a) + t.data.typeName, 
            wx.setNavigationBarTitle({
                title: t.data.shareName
            }), t.setData({
                list: e.Data,
                typeName: t.data.typeName
            }), wx.hideToast();
        });
    },
    removeField: function(e) {
        if (e) return e.replace("万题库", "");
    },
    getToChoose: function(e) {
        console.log(e);
        var a = this.data.options, t = "../../pages/index/index?IsShare=1&SubjectId=" + e.currentTarget.dataset.id + "&SubjectName=" + e.currentTarget.dataset.name + "&SubjectParentName=" + this.removeField(e.currentTarget.dataset.parentname) + "&SubjectParentId=" + a.SubjectParentId + "&SubjectLevel=" + a.SubjectLevel + "&type=" + a.type;
        wx.reLaunch({
            url: t
        });
    },
    onShareAppMessage: function() {
        var e = this, a = "/pages/operateSubject/operateSubject";
        return a += "?Sp=" + e.data.options.SubjectParentId, a += "&Sl=" + e.data.options.SubjectLevel, 
        a += "&Ty=" + e.data.options.type, console.log(a), {
            title: e.data.shareName,
            path: a
        };
    }
});