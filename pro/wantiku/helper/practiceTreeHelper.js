var e = {
    convertTreeData: function(e) {
        var t = this;
        return {
            siteId: e.ExamSiteId,
            siteName: e.ExamSiteName,
            parentId: e.ExamParentId,
            starCount: t.caculateStarCount(Math.ceil(e.StarCount / 20)),
            siteLevel: e.SiteLevel,
            totalQuestions: e.TotalQuestions,
            userTotalQuestions: e.UserTotalQuestions,
            BuyState: e.BuyState,
            collspan: !0,
            display: !1,
            style: "yjbg",
            needBuy: e.ChapterPrice > 0 && (0 === e.BuyState || -1 === e.BuyState),
            hasNext: !1,
            hasPrev: !1,
            hasChildren: !1,
            parentHasNext: !1,
            rootId: 0,
            ExamSiteId: e.ExamSiteId
        };
    },
    caculateStarCount: function(e) {
        e = e > 5 ? 5 : e;
        for (var t = [ 0, 0, 0, 0, 0 ], a = 0; a < e; a++) t[a] = 1;
        return t;
    },
    caculateNodeStyle: function(e) {
        return 1 == e.siteLevel ? e.hasChildren && e.collspan ? "class-one" : e.hasChildren && !e.collspan ? "class-one open" : e.hasChildren ? "yjwbbg" : "class-one circle" : 2 == e.siteLevel ? !e.hasChildren && e.hasNext ? "class-three" : e.hasChildren || e.hasNext ? e.hasChildren && e.hasNext && e.collspan ? "class-two" : e.hasChildren && !e.hasNext && e.collspan ? "class-two last" : e.hasChildren && !e.collspan ? "class-two open" : "class-two last" : "class-three last" : 3 == e.siteLevel ? e.hasNext || e.parentHasNext ? "class-three" : "class-three last" : "yjwbbg";
    },
    initChapterTree: function(e) {
        if (e) {
            for (var t = this, a = [], s = e.SiteQuestionUserList ? e.SiteQuestionUserList : e.SpecialTreeList, r = 0; r < s.length; r++) {
                var i = s[r], n = [], l = t.convertTreeData(i);
                if (l.display = !0, l.rootId = l.siteId, l.hasChildren = i.SiteQuestionUserList && i.SiteQuestionUserList.length > 0, 
                l.hasChildren || (l.collspan = !1), l.style = t.caculateNodeStyle(l, null), n.push(l), 
                l.hasChildren) for (var o = 0; o < i.SiteQuestionUserList.length; o++) {
                    var h = i.SiteQuestionUserList[o], u = t.convertTreeData(h);
                    if (u.display = !1, u.rootId = l.siteId, u.BuyState = l.BuyState, u.hasChildren = h.SiteQuestionUserList && h.SiteQuestionUserList.length > 0, 
                    u.hasChildren || (u.collspan = !1), o > 0 && (u.hasPrev = !0), o < i.SiteQuestionUserList.length - 1 && (u.hasNext = !0), 
                    u.style = t.caculateNodeStyle(u), n.push(u), u.hasChildren) for (var d = 0; d < h.SiteQuestionUserList.length; d++) {
                        var c = h.SiteQuestionUserList[d], v = t.convertTreeData(c);
                        v.display = !1, v.rootId = l.siteId, v.BuyState = l.BuyState, v.collspan = !1, d > 0 && (v.hasPrev = !0), 
                        d < h.SiteQuestionUserList.length - 1 && (v.hasNext = !0), v.parentHasNext = u.hasNext, 
                        v.style = t.caculateNodeStyle(v), n.push(v);
                    }
                }
                a.push({
                    subTree: n,
                    rootId: i.ExamSiteId
                });
            }
            return a;
        }
    },
    initErrorTree: function(e) {
        if (e) {
            for (var t = this, a = [], s = e.ErrorList, r = 0; r < s.length; r++) {
                var i = s[r], n = [], l = t.convertTreeData(i);
                if (l.display = !0, l.rootId = l.siteId, l.hasChildren = i.ErrorList && i.ErrorList.length > 0, 
                l.hasChildren || (l.collspan = !1), l.style = t.caculateNodeStyle(l, null), n.push(l), 
                l.hasChildren) for (var o = 0; o < i.ErrorList.length; o++) {
                    var h = i.ErrorList[o], u = t.convertTreeData(h);
                    if (u.display = !1, u.rootId = l.siteId, u.hasChildren = h.ErrorList && h.ErrorList.length > 0, 
                    u.hasChildren || (u.collspan = !1), o > 0 && (u.hasPrev = !0), o < i.ErrorList.length - 1 && (u.hasNext = !0), 
                    u.style = t.caculateNodeStyle(u), 0 != o || l.videoId || l.needBuy || !u.videoId || (l.viewSite = t.setViewData(u)), 
                    u.needBuy = l.needBuy, u.viewSite = t.setViewData(u), n.push(u), u.hasChildren) for (var d = 0; d < h.ErrorList.length; d++) {
                        var c = h.ErrorList[d], v = t.convertTreeData(c);
                        v.display = !1, v.rootId = l.siteId, v.collspan = !1, d > 0 && (v.hasPrev = !0), 
                        d < h.ErrorList.length - 1 && (v.hasNext = !0), v.parentHasNext = u.hasNext, v.style = t.caculateNodeStyle(v), 
                        v.needBuy = l.needBuy, v.viewSite = t.setViewData(v), n.push(v);
                    }
                }
                a.push({
                    subTree: n,
                    rootId: i.ExamSiteId
                });
            }
            return a;
        }
    },
    initFavorTree: function(e) {
        if (e) {
            for (var t = this, a = [], s = e.FavorEntityList, r = 0; r < s.length; r++) {
                var i = s[r], n = [], l = t.convertTreeData(i);
                if (l.display = !0, l.rootId = l.siteId, l.hasChildren = i.FavorEntityList && i.FavorEntityList.length > 0, 
                l.hasChildren || (l.collspan = !1), l.style = t.caculateNodeStyle(l, null), n.push(l), 
                l.hasChildren) for (var o = 0; o < i.FavorEntityList.length; o++) {
                    var h = i.FavorEntityList[o], u = t.convertTreeData(h);
                    if (u.display = !1, u.rootId = l.siteId, u.hasChildren = h.FavorEntityList && h.FavorEntityList.length > 0, 
                    u.hasChildren || (u.collspan = !1), o > 0 && (u.hasPrev = !0), o < i.FavorEntityList.length - 1 && (u.hasNext = !0), 
                    u.style = t.caculateNodeStyle(u), 0 != o || l.videoId || l.needBuy || !u.videoId || (l.viewSite = t.setViewData(u)), 
                    u.needBuy = l.needBuy, u.viewSite = t.setViewData(u), n.push(u), u.hasChildren) for (var d = 0; d < h.FavorEntityList.length; d++) {
                        var c = h.FavorEntityList[d], v = t.convertTreeData(c);
                        v.display = !1, v.rootId = l.siteId, v.collspan = !1, d > 0 && (v.hasPrev = !0), 
                        d < h.FavorEntityList.length - 1 && (v.hasNext = !0), v.parentHasNext = u.hasNext, 
                        v.style = t.caculateNodeStyle(v), v.needBuy = l.needBuy, v.viewSite = t.setViewData(v), 
                        n.push(v);
                    }
                }
                a.push({
                    subTree: n,
                    rootId: i.ExamSiteId
                });
            }
            return a;
        }
    },
    transTree: function(e) {
        var t = [];
        for (var a in e) t = t.concat(e[a].subTree);
        return t;
    },
    initChapterProgress: function(e) {
        if (e) return {
            ExamSiteId: e.ExamSiteId,
            ExamSiteName: this.caculateExamSiteName(e.ExamSiteName)
        };
    },
    caculateExamSiteName: function(e) {
        if (!e || 0 == e.length) return "";
        if (1 == e.length) return e[0];
        var t = "";
        for (var a in e) t += e[a], e.length;
        return t;
    },
    setViewData: function(e) {
        return {
            siteId: e.siteId,
            siteName: e.siteName,
            courseId: e.courseId,
            lectureImageUrl: e.lectureImageUrl,
            lectureImageCount: e.lectureImageCount,
            needBuy: e.needBuy,
            videoId: e.videoId,
            courseSize: e.courseSize,
            LectureURL: e.LectureURL
        };
    }
};

module.exports = e;