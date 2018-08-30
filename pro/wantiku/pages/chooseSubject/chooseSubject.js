var e = require("../../biz/subject.js"), a = require("../../config.js"), t = (require("../../biz/chapter.js"), 
getApp());

Page({
    data: {
        theme: a.UIConfig.Theme,
        groupId: 9,
        parentSubjects: [],
        kcbtn: 0,
        backTab: 1
    },
    choose: function(e) {
        this.setData({
            kcbtn: e.currentTarget.dataset.id
        });
    },
    onLoad: function(t) {
        t.backTab && this.setData({
            backTab: t.backTab
        });
        var c = this, r = t.groupId, n = t.pageTitle;
        n || (n = a.PackageInfo.AppName), wx.setNavigationBarTitle({
            title: n
        }), c.setData({
            groupId: r
        });
        var s = a.PackageInfo.PackageLevel;
        s == a.PackageLevel.All ? e.getParentSubjects(r, function(e) {
            c.setData({
                parentSubjects: e
            });
        }) : s == a.PackageLevel.Group ? e.getGroupSubjects(a.PackageInfo.GroupId, function(e) {
            c.setData({
                parentSubjects: e
            });
        }) : s == a.PackageLevel.Class && e.getClassSubjects(a.PackageInfo.SubjectParentId, function(e) {
            c.setData({
                parentSubjects: e
            });
        });
    },
    chooseSubject: function(c) {
        var r = this, n = c.currentTarget.dataset, s = parseInt(n.parentid), u = parseInt(n.level), b = n.parentname;
        t.setParentSubject(s, u, b), e.getSubjects(function(c) {
            if (c.length > 0) {
                t.setSubject(c[0].SubjectId, c[0].SubjectName);
                var n = {
                    cSubjectParentId: s,
                    cSubjectParentName: b,
                    cSubjectLevel: u,
                    cSubjectId: c[0].SubjectId,
                    cSubjectName: c[0].SubjectName
                };
                e.saveSubjectParent(n);
                var i = "../index/index";
                if (2 == r.data.backTab && (i = "../mine/mine"), console.log(t.getExamRegionType()), 
                1 == t.getExamRegionType() && 0 == t.globalData.userArea.UserAreaId) wx.reLaunch({
                    url: "../selectExamArea/selectExamArea"
                }); else if (2 == t.getExamRegionType() && 0 == t.globalData.userArea.InstitutionAreaId) wx.reLaunch({
                    url: "../selectExamArea/selectExamArea"
                }); else if (1 == r.data.backTab) wx.switchTab({
                    url: i
                }); else {
                    var g = a.PackageInfo.PackageLevel == a.PackageLevel.All ? 2 : 1;
                    wx.navigateBack({
                        delta: g
                    });
                }
            }
        });
    }
});