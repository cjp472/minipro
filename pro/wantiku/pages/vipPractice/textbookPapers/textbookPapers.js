var e = require("../../../helper/practiceTreeHelper.js"), t = require("../../../helper/treeHelper.js"), a = getApp(), r = require("../../../config.js"), o = require("../../../utils/tourist.js"), s = require("../../../utils/getSetStorage.js"), i = require("../../../biz/vipPractice"), n = require("../../../biz/groupBuy.js"), u = require("../../../utils/xnSDK.js"), l = require("../../../utils/xnUtils.js");

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
        toUrl: "",
        courseShareName: "章节智能",
        courseRefresh: !1,
        IsSaleSuccessRefresh: !1,
        progressName: [],
        ifHongb: "",
        openGroupId: "",
        IsShare: "",
        XNConfigInfo: l.getXNConfigInfo(),
        isIos: a.globalData.SystemInfo.iOS
    },
    _data: {
        siteId: ""
    },
    onLoad: function(t) {
        var r = this;
        this.setData({
            options: t
        }), wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 6e3,
            mask: !0
        }), a.checkContextWithShareOptions(t, function() {
            i.strengtheningTest(function(t) {
                var a = e.initChapterTree(t);
                r.data.tree = a;
                var o = e.transTree(a), s = e.initChapterProgress(t), i = r.segmentation(t.ExamSiteName);
                console.log(o), r.setData({
                    treeData: o,
                    progress: s,
                    progressName: i
                }), wx.hideToast();
            }), t.IsShare && n.getGroupon(function(e) {
                r.setData({
                    ifHongb: e.HasGroupon,
                    openGroupId: e.Groupon.Id,
                    IsShare: t.IsShare
                });
            });
        });
    },
    onShow: function() {
        var a = this, r = a.data.courseRefresh;
        (r || this.data.IsSaleSuccessRefresh) && i.strengtheningTest(function(o) {
            var s = e.initChapterTree(o);
            a.data.tree = s;
            var i = e.transTree(s), n = a.data.treeData;
            t.saveOpenStyle(n, i);
            var u = e.initChapterProgress(o), l = a.segmentation(o.ExamSiteName);
            a.setData({
                treeData: i,
                progress: u,
                progressName: l
            }), r || a.formSubmit(), wx.hideToast();
        }), a.data.XNConfigInfo = l.getXNConfigInfo(), u.callTrail({
            originId: a.data.XNConfigInfo.AppId,
            siteId: "kf_9644"
        });
    },
    onShareAppMessage: function() {
        var e = this, t = "/pages/vipPractice/textbookPapers/textbookPapers";
        return t += "?" + a.generateShareOptions(), console.log(t), {
            title: a.globalData.subject.SubjectName + "教材强化练习",
            path: t,
            success: function(t) {
                s.setStorage(a.globalData.ExamType.chapterTest), e.setData({
                    zjShareSuccess: !0
                }), e.data.sharePractice && (e.setData({
                    sharePractice: !1
                }), wx.navigateTo({
                    url: e.data.toUrl
                }));
            },
            fail: function(e) {}
        };
    },
    bindCourse: function(t) {
        for (var a = t.currentTarget.dataset.rootid, r = t.currentTarget.dataset.siteid, o = (t.currentTarget.dataset.level, 
        t.currentTarget.dataset.parentid, this), s = o.data.tree, i = !1, n = 0; n < s.length; n++) {
            var u = s[n];
            if (u.rootId == a) for (var l = 0; l < u.subTree.length; l++) {
                var d = u.subTree[l];
                if (d.siteId != r || 3 == d.siteLevel) d.parentId != r ? d.rootId == r && d.rootId != d.siteId && (d.display = !i) : (d.display = !d.display, 
                d.style = e.caculateNodeStyle(d), i = i || d.collspan); else {
                    if (!d.hasChildren) continue;
                    d.collspan = !d.collspan, d.style = e.caculateNodeStyle(d), i = i || d.collspan;
                }
            }
        }
        var c = e.transTree(s);
        o.data.tree = s, o.setData({
            treeData: c
        });
    },
    catchtapSubmit: function() {},
    formSubmit: function(e) {
        var t = this, r = a.globalData.ExamType.textbookTest, s = a.globalData.userData.HasLogin, i = e.detail.target.dataset, n = i.siteid, u = i.rootId, l = (i.siteLevel, 
        i.continue), d = e.detail.formId, c = i.buyState, g = this.data.progress.ExamSiteId, p = this.data.treeData;
        if (!this.data.isIos || 1 == c) {
            if (g > 0 && "toLearn" == l) for (var h = 0; h < p.length; h++) if (p[h].ExamSiteId !== g) ; else if (1 !== (c = p[h].BuyState)) return void wx.showModal({
                content: "已过期，请重新购买",
                showCancel: !1
            });
            var f = "../../../pages/papers/papers?examType=" + r + "&paperId=" + n + "&formId=" + d, S = "../../chaterVideoOrder/chaterVideoOrder?rootSiteId=" + u + "&type=textbookPapers";
            1 == c ? (a.globalData.ExamSiteId = n, 0 == o.availabilityQuantity(r) ? a.gotoLogin(f, 1) : wx.navigateTo({
                url: f
            }), t.setData({
                courseRefresh: !0
            })) : s ? wx.navigateTo({
                url: S
            }) : (t.data.courseRefresh = !0, a.gotoLogin(S, 1));
        }
    },
    goBackIndex: function() {
        wx.reLaunch({
            url: "../../index/index"
        });
    },
    formSubmitHongBao: function(e) {
        var t = e.detail.formId, a = this.data.openGroupId;
        wx.navigateTo({
            url: "../../group/groupBuy/groupBuy?formId=" + t + "&grouponid=" + a
        });
    },
    segmentation: function(e) {
        if (e) return e.map(function(t, a) {
            return a < e.length - 1 && (t += " > "), t;
        });
    }
});