var t = require("../../helper/practiceTreeHelper.js"), e = require("../../biz/practice.js"), a = require("../../biz/vipPractice.js"), i = require("../../config.js"), r = require("../../utils/tourist.js"), o = require("../../utils/practiceModle.js"), n = getApp();

Page({
    data: {
        theme: i.UIConfig.Theme,
        tree: [],
        treeData: [],
        paperData: [],
        empty: !1,
        reciteModle: !1,
        totalCount: 0,
        loading: !0,
        configColor: i.UIConfig.color,
        btnAnimationState: !1,
        chooseType: 1,
        showModuleState: !1,
        scrollX: 0,
        practiceCollection: !1
    },
    onLoad: function(t) {
        var e = !1;
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 6e3,
            mask: !0
        }), t.examType == n.globalData.ExamType.collectionSee && ("收藏", e = !0), this.setData({
            examType: t.examType,
            practiceCollection: e
        }), this.getTags();
    },
    getTags: function() {
        var t = this;
        e.getTags(function(e) {
            1 === e.MsgCode && t.setData({
                navList: e.Funcs
            }), setTimeout(function() {
                t.initNavListWidth();
            }, 300);
        });
    },
    initNavListWidth: function() {
        var t = this, e = 0, a = {
            boxWidth: 0,
            navWidth: []
        };
        wx.createSelectorQuery().selectAll(".nav-item,.paper-nav-list").boundingClientRect(function(i) {
            i.forEach(function(t, i) {
                0 === i ? a.boxWidth = t.width : (e += t.width, a.navWidth.push(e));
            }), t.setData({
                navListScroll: a
            });
        }).exec();
    },
    bindCourse: function(e) {
        for (var a = e.currentTarget.dataset.rootid, i = e.currentTarget.dataset.siteid, r = (e.currentTarget.dataset.level, 
        e.currentTarget.dataset.parentid, this), o = r.data.tree, n = !1, s = 0; s < o.length; s++) {
            var c = o[s];
            if (c.rootId == a) for (var l = 0; l < c.subTree.length; l++) {
                var u = c.subTree[l];
                if (u.siteId != i || 3 == u.siteLevel) u.parentId != i ? u.rootId == i && u.rootId != u.siteId && (u.display = !n) : (u.display = !u.display, 
                u.style = t.caculateNodeStyle(u), n = n || u.collspan); else {
                    if (!u.hasChildren) continue;
                    u.collspan = !u.collspan, u.style = t.caculateNodeStyle(u), n = n || u.collspan;
                }
            }
        }
        var d = t.transTree(o);
        r.data.tree = o, r.setData({
            treeData: d
        });
    },
    onShow: function() {
        var t = this.data.practiceCollection;
        this.setData({
            reciteModle: n.globalData.PracticeModle.reciteModle
        }), wx.setNavigationBarTitle({
            title: t ? "收藏" : "错题"
        }), this.initTreeData();
    },
    onReady: function() {},
    paperOrderConfirm: function(t) {
        var e = this, i = "";
        switch (t) {
          case 20:
            i = "/api/vip/SprintOrderConfirm";
            break;

          case 45:
            i = "/api/vip/LastNOrderConfirm";
            break;

          case 40:
            i = "/api/vip/TopicPaperOrderConfirm";
        }
        a.paperOrderConfirm(i, function(t) {
            if (console.log(t), 1 == t.MsgCode) {
                var i = t.NotifyAsync, r = t.OrderNo, o = n.globalData.userData.OpenId;
                a.getPayWeixinData(o, r, i, function(t) {
                    if (console.log(t), 1 == t.MsgCode) {
                        var a = t.PayPartnerInfoNew.nonceStr, i = t.PayPartnerInfoNew.paySign, r = (t.PayPartnerInfoNew.prepayId, 
                        t.PayPartnerInfoNew.signType), o = t.PayPartnerInfoNew.timeStamp;
                        wx.requestPayment({
                            timeStamp: o,
                            nonceStr: a,
                            package: t.PayPartnerInfoNew.package,
                            signType: r,
                            paySign: i,
                            success: function() {
                                wx.showToast({
                                    title: "支付成功",
                                    icon: "success",
                                    duration: 1500
                                }), e.initTreeData();
                            },
                            fail: function() {
                                wx.showModal({
                                    title: "提示",
                                    content: "支付失败",
                                    showCancel: !1,
                                    confirmText: "知道了",
                                    success: function(t) {}
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    bindPractice: function(t) {
        var e = t.currentTarget.dataset.siteid, a = t.currentTarget.dataset.needbuy, i = t.currentTarget.dataset.sitelevel || !1, o = this.data.examType, s = this.data.chooseType, c = "";
        if (0 == r.availabilityQuantity(o)) n.gotoLogin("", 1); else {
            if (a) {
                if (10 != s) return void this.paperOrderConfirm(s);
                if (1 != i) return;
                c = "../../pages/chaterVideoOrder/chaterVideoOrder?rootSiteId=" + e + "&type=textbookPapers";
            } else c = "../../pages/papersAnalysis/papersAnalysis?examType=" + o + "&paperId=" + e + "&examPaperType=" + s;
            console.log("url", c), wx.navigateTo({
                url: c
            });
        }
    },
    rciteModleChangeJs: function(t) {
        var e = t.detail.value;
        this.setData({
            reciteModle: e
        }), o.setStorageReciteModle(n, e), this.checkoutBtn();
    },
    checkoutBtn: function() {
        var t = this;
        this.setData({
            btnAnimationState: !0
        }), this.data.btnAnimation && clearTimeout(this.data.btnAnimation);
        var e = setTimeout(function() {
            t.setData({
                btnAnimationState: !1
            });
        }, 100);
        this.setData({
            btnAnimation: e
        });
    },
    onALlErroQuestionJs: function() {
        var t = this.data.examType, e = this.data.chooseType, a = this.data.paperData.BuyStatus || !1, i = this.data.treeData, o = "";
        if (0 == r.availabilityQuantity(t)) n.gotoLogin("", 1); else {
            if (a) return void this.paperOrderConfirm(e);
            if (10 == e && this.eachTreeDataBuyStatus(i)) {
                var s = (this.data.practiceCollection, "您有过期的收藏，请购买后练习");
                return void wx.showModal({
                    title: "提示",
                    content: s,
                    showCancel: !1,
                    confirmText: "知道了",
                    success: function(t) {}
                });
            }
            o = "../papersAnalysis/papersAnalysis?examType=" + t + "&allQustions=" + !0 + "&examPaperType=" + e, 
            console.log("url", o), wx.navigateTo({
                url: o
            });
        }
    },
    chooseSubjectType: function(t) {
        var e = t.currentTarget.dataset.type;
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 6e3,
            mask: !0
        }), this.setData({
            chooseType: e,
            treeData: [],
            paperData: []
        }), this.initTreeData(), this.initNavScrollX(e);
    },
    initTreeData: function() {
        var a = this, i = this.data.chooseType, r = this.data.practiceCollection, o = "", n = "", s = [], c = [];
        r ? (o = e.getFavorTree, n = e.getFavorPaper) : (o = e.getErrorTree, n = e.getErrorPaper), 
        1 == i || 10 == i || 30 == i ? o(i, function(e) {
            var i = void 0, o = e.TotalCount;
            i = r ? t.initFavorTree(e) : t.initErrorTree(e), a.data.tree = i, s = t.transTree(i), 
            a.setData({
                empty: 0 === s.length,
                loading: !1
            }), a.setData({
                treeData: s,
                totalCount: o
            }), wx.hideToast();
        }) : n(i, function(t) {
            var e = t.TotalCount;
            c = a.initPracticePaper(t), a.setData({
                empty: 0 === c.papers.length,
                loading: !1
            }), a.setData({
                paperData: c,
                totalCount: e
            }), wx.hideToast();
        });
    },
    initPracticePaper: function(t) {
        var e = {};
        if (1 == t.MsgCode) {
            var a = t.Papers;
            1 !== t.StatusInfo.BuyStatus ? e.BuyStatus = !0 : e.BuyStatus = !1, e.papers = a;
        }
        return e;
    },
    togglePaperModule: function(t) {
        console.log(t.currentTarget.dataset);
        var e = t.currentTarget.dataset.state;
        this.setData({
            showModuleState: e
        });
    },
    eachTreeDataBuyStatus: function(t) {
        return t.some(function(t) {
            return !0 === t.needBuy;
        });
    },
    initNavScrollX: function(t) {
        this.data.scrollLeft;
        var e = this.data.navListScroll.boxWidth, a = 0, i = (a = this.data.navListScroll.navWidth[this.data.navList.findIndex(function(e) {
            return t === e.examPaperType;
        })]) - e;
        i <= 0 ? i = 0 : i += 50, this.setData({
            scrollX: i
        });
    },
    getNavScrollX: function(t) {
        var e = t.detail.scrollLeft;
        this.setData({
            scrollLeft: e
        });
    }
});