var e = require("../../helper/practiceTreeHelper.js"), a = getApp(), t = require("../../biz/practice.js"), r = require("../../config.js"), o = require("../../utils/tourist.js"), s = require("../../biz/groupBuy.js"), i = require("../../utils/getSetStorage.js"), n = (require("../../biz/chapter.js"), 
require("../../helper/treeHelper.js"));

Page({
    data: {
        buyState: r.buyState,
        theme: r.UIConfig.Theme,
        tree: [],
        treeData: [],
        progress: {
            ExamSiteId: 0
        },
        iPhoneX: a.globalData.SystemInfo.iPhoneX,
        sharePractice: !1,
        zjShareSuccess: !1,
        shareCallBack: !1,
        toUrl: "",
        courseShareName: "章节智能",
        courseRefresh: !1,
        ExamSiteNameList: []
    },
    onLoad: function(r) {
        var o = this;
        this.setData({
            options: r
        }), wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 6e3,
            mask: !0
        }), a.checkContextWithShareOptions(r, function() {
            t.getPracticeChapper(function(a) {
                console.log(a);
                var t = e.initChapterTree(a);
                o.data.tree = t;
                var r = e.transTree(t), s = e.initChapterProgress(a), i = a.ExamSiteName.join(" > ");
                o.setData({
                    treeData: r,
                    progress: s,
                    ExamSiteNameList: i
                }), wx.hideToast();
            }), r.IsShare && s.getGroupon(function(e) {
                o.setData({
                    ifHongb: e.HasGroupon,
                    openGroupId: e.Groupon.Id,
                    IsShare: r.IsShare
                });
            });
        });
        var n = i.getStorageSync(a.globalData.ExamType.chapterTest);
        o.setData({
            zjShareSuccess: n
        });
    },
    onShareAppMessage: function() {
        var e = this, t = "/pages/practiceChapter/practiceChapter";
        return t += "?" + a.generateShareOptions(), console.log(t), i.setStorage(a.globalData.ExamType.chapterTest), 
        e.setData({
            zjShareSuccess: !0,
            shareCallBack: !0
        }), {
            title: a.globalData.subject.SubjectName + "章节智能练习",
            path: t,
            success: function(e) {},
            fail: function(e) {}
        };
    },
    bindCourse: function(a) {
        for (var t = a.currentTarget.dataset.rootid, r = a.currentTarget.dataset.siteid, o = (a.currentTarget.dataset.level, 
        a.currentTarget.dataset.parentid, this), s = o.data.tree, i = !1, n = 0; n < s.length; n++) {
            var c = s[n];
            if (c.rootId == t) for (var u = 0; u < c.subTree.length; u++) {
                var l = c.subTree[u];
                if (l.siteId != r || 3 == l.siteLevel) l.parentId != r ? l.rootId == r && l.rootId != l.siteId && (l.display = !i) : (l.display = !l.display, 
                l.style = e.caculateNodeStyle(l), i = i || l.collspan); else {
                    if (!l.hasChildren) continue;
                    l.collspan = !l.collspan, l.style = e.caculateNodeStyle(l), i = i || l.collspan;
                }
            }
        }
        var p = e.transTree(s);
        o.data.tree = s, o.setData({
            treeData: p
        });
    },
    onShow: function() {
        var a = this;
        a.data.courseRefresh && t.getPracticeChapper(function(t) {
            var r = e.initChapterTree(t);
            a.data.tree = r;
            var o = e.transTree(r), s = e.initChapterProgress(t), i = t.ExamSiteName.join(" > "), c = a.data.treeData;
            n.saveOpenStyle(c, o), a.setData({
                treeData: o,
                progress: s,
                courseRefresh: !1,
                ExamSiteNameList: i
            });
        });
    },
    onReady: function() {},
    formSubmit: function(e) {
        var t = this;
        console.log(e);
        var r = a.globalData.ExamType.chapterTest, s = e.detail.target.dataset.siteid, i = e.detail.formId;
        a.globalData.ExamSiteId = s;
        var n = "../../pages/papers/papers?examType=" + r + "&paperId=" + s + "&formId=" + i;
        0 == o.availabilityQuantity(r) ? a.gotoLogin(n, 1) : wx.navigateTo({
            url: n
        }), t.setData({
            courseRefresh: !0
        });
    },
    catchtapSubmit: function() {},
    goBackIndex: function() {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    formSubmitHongBao: function(e) {
        var a = e.detail.formId, t = this.data.openGroupId;
        wx.navigateTo({
            url: "../group/groupBuy/groupBuy?formId=" + a + "&grouponid=" + t
        });
    },
    onbtnShera: function() {},
    shareBoxBackground: function() {
        console.log("点击背景"), this.setData({
            sharePractice: !1
        });
    }
});