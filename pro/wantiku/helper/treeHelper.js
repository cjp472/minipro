var e = {
    saveOpenStyle: function(e, t) {
        if (e && t) for (var s = 0; s < e.length; s++) t[s].display = e[s].display, t[s].collspan = e[s].collspan, 
        t[s].style = e[s].style;
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
    },
    convertTreeData: function(e) {
        return {
            siteId: e.ChapterCourseSiteId,
            siteName: e.CourseSiteName,
            courseId: e.ChapterCourseId,
            parentId: e.ChapterCourseParentSiteId,
            userCount: e.LearnUserCount,
            learnDur: Math.floor(e.LearnDurationLen / 60),
            duration: Math.floor(e.DurationLen / 60),
            siteLevel: e.SiteLevel,
            courseSize: e.CourseSize,
            videoId: e.VideoId,
            lectureImageUrl: e.LectureImageUrl,
            lectureImageCount: e.ImageCount,
            nSiteId: e.ChapterCourseSiteId,
            LectureURL: e.LectureURL,
            RealCoursePrice: e.RealCoursePrice,
            LearnUserCount: e.LearnUserCount,
            needBuy: e.RealCoursePrice > 0 && 0 == e.BuyState,
            IsLockVideo: e.IsLockVideo,
            viewSite: {},
            collspan: !0,
            display: !1,
            style: "yjbg",
            hasNext: !1,
            hasPrev: !1,
            hasChildren: !1,
            parentHasNext: !1,
            rootId: 0
        };
    },
    caculateNodeStyle: function(e) {
        return 1 == e.siteLevel ? e.hasChildren && e.collspan ? "class-one" : e.hasChildren && !e.collspan ? "class-one open" : e.hasChildren ? "yjwbbg" : "class-one circle" : 2 == e.siteLevel ? !e.hasChildren && e.hasNext ? "class-three" : e.hasChildren || e.hasNext ? e.hasChildren && e.hasNext && e.collspan ? "class-two" : e.hasChildren && !e.hasNext && e.collspan ? "class-two last" : e.hasChildren && !e.collspan ? "class-two open" : "class-two last" : "class-three last" : 3 == e.siteLevel ? e.hasNext || e.parentHasNext ? "class-three" : "class-three last" : "yjwbbg";
    },
    initTree: function(e) {
        if (e) {
            for (var t = this, s = (e.LastestCourseHistory.ChapterCourseSiteId, []), r = 0; r < e.CourseSiteList.length; r++) {
                var a = e.CourseSiteList[r], i = [], o = t.convertTreeData(a);
                if (o.display = !0, o.rootId = o.siteId, o.hasChildren = a.CourseSiteList && a.CourseSiteList.length > 0, 
                o.hasChildren || (o.collspan = !1), o.style = t.caculateNodeStyle(o, null), o.viewSite = t.setViewData(o), 
                i.push(o), o.hasChildren) for (var l = 0; l < a.CourseSiteList.length; l++) {
                    var n = a.CourseSiteList[l], u = t.convertTreeData(n);
                    if (u.display = !1, u.rootId = o.siteId, u.hasChildren = n.CourseSiteList && n.CourseSiteList.length > 0, 
                    u.RealCoursePrice = o.RealCoursePrice, u.hasChildren || (u.collspan = !1), l > 0 && (u.hasPrev = !0), 
                    l < a.CourseSiteList.length - 1 && (u.hasNext = !0), u.style = t.caculateNodeStyle(u), 
                    0 != l || o.viewSite.videoId || o.needBuy || !u.videoId || (o.viewSite = t.setViewData(u)), 
                    u.needBuy = o.needBuy, u.viewSite = t.setViewData(u), i.push(u), u.hasChildren) for (var d = 0; d < n.CourseSiteList.length; d++) {
                        var c = n.CourseSiteList[d], h = t.convertTreeData(c);
                        h.display = !1, h.rootId = o.siteId, h.collspan = !1, h.RealCoursePrice = o.RealCoursePrice, 
                        d > 0 && (h.hasPrev = !0), d < n.CourseSiteList.length - 1 && (h.hasNext = !0), 
                        h.parentHasNext = u.hasNext, h.style = t.caculateNodeStyle(h), 0 != d || u.viewSite.videoId || o.needBuy || !h.videoId || (u.viewSite = t.setViewData(h), 
                        o.viewSite.videoId || (o.viewSite = t.setViewData(h))), h.needBuy = o.needBuy, h.viewSite = t.setViewData(h), 
                        i.push(h);
                    }
                }
                s.push({
                    subTree: i,
                    rootId: a.ChapterCourseSiteId
                });
            }
            return s;
        }
    },
    findCourse: function(e, t) {
        if (null == t || !(t instanceof Array)) return null;
        for (var s = 0; s < t.length; s++) for (var r = t[s], a = 0; a < r.subTree.length; a++) {
            var i = r.subTree[a];
            if (i.siteId == e) return i;
        }
        return null;
    },
    getImageList: function(e, t) {
        var s = [], r = "", a = "";
        if (e) {
            var i = e.lastIndexOf(".");
            i > 0 && (r = e.substr(0, i), a = e.substr(i, e.length));
        }
        if (r && t > 0) for (var o = 0; o < t; o++) s.push(r + "-" + o + a);
        return s;
    },
    transTree: function(e) {
        var t = [];
        for (var s in e) t = t.concat(e[s].subTree);
        return t;
    }
};

module.exports = e;