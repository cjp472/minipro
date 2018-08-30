var t = require("../../biz/examArea.js"), a = require("../../config.js"), e = getApp();

Page({
    data: {
        theme: a.UIConfig.Theme,
        bottom: !1,
        examAreas: [],
        viewHeight: 1e7,
        bottomTHD: 10,
        backTab: 0
    },
    heightData: {
        isInit: !1,
        currentHeigt: 0,
        bottomHeight: 1e7
    },
    onLoad: function(a) {
        var o = this;
        a.backTab && (o.data.backTab = a.backTab), wx.setNavigationBarTitle({
            title: e.globalData.subject.SubjectParentName
        }), t.getExamArea(function(t) {
            console.log(t);
            var a = t.AreaList, e = a.length > 8;
            o.setData({
                examAreas: a,
                bottom: e
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    bindChoose: function(a) {
        var o = a.currentTarget.dataset.id, i = (a.currentTarget.dataset.name, this);
        wx.showToast({
            title: "正在保存",
            icon: "loading",
            duration: 6e3
        }), t.saveExamArea(o, function(t) {
            console.log(t), 1 == t.MsgCode ? (wx.hideToast(), 1 == e.getExamRegionType() ? e.setGlobalUserAreaId(o) : e.setGlobalInstitutionAreaId(o), 
            console.log(i.data.backTab), 1 == i.data.backTab ? wx.switchTab({
                url: "../index/index"
            }) : (console.log("reLaunch"), wx.switchTab({
                url: "../index/index"
            }))) : wx.showToast({
                title: "保存失败",
                image: "/images/icon/icon_tip.png",
                duration: 2e3
            });
        });
    },
    bindBottom: function(t) {
        this.heightData.isInit = !0, this.setData({
            bottom: !1
        });
    },
    bindscroll: function(t) {}
});