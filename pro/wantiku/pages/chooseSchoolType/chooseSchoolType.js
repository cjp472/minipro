require("../../utils/util.js");

var e = require("../../config.js"), a = require("../../biz/subject.js"), t = getApp();

Page({
    data: {
        theme: e.UIConfig.Theme,
        list: [ {
            groupId: 8,
            groupName: "会计类",
            style: "m2",
            hoverStyle: "g2"
        }, {
            groupId: 4,
            groupName: "工程类",
            style: "m3",
            hoverStyle: "g3"
        }, {
            groupId: 9,
            groupName: "医学类",
            style: "m4",
            hoverStyle: "g4"
        }, {
            groupId: 16,
            groupName: "教师类",
            style: "m7",
            hoverStyle: "g7"
        }, {
            groupId: 13,
            groupName: "公考类",
            style: "m8",
            hoverStyle: "g8"
        }, {
            groupId: 10,
            groupName: "学历类",
            style: "m6",
            hoverStyle: "g6"
        }, {
            groupId: 6,
            groupName: "资格类",
            style: "m5",
            hoverStyle: "g5"
        }, {
            groupId: 15,
            groupName: "外语类",
            style: "m9",
            hoverStyle: "g9"
        }, {
            groupId: 11,
            groupName: "金融类",
            style: "m1",
            hoverStyle: "g1"
        } ],
        listStyes: {
            49: {
                0: "icon-icon_chujihuiji",
                1: "icon-icon_zhongjihuijizhi1"
            },
            70: {
                0: "icon-icon_zhuchehuiji"
            },
            422: {
                0: "icon-CombinedShape"
            },
            14: {
                0: "icon-icon_chujijingjishi",
                1: "icon-icon_jingjishi"
            },
            3: {
                0: "icon-icon_yijian"
            },
            7: {
                0: "icon-icon_erjian"
            },
            8: {
                0: "icon-icon_zaojiashi"
            },
            515: {
                0: "icon-icon_yijixiaofangshi",
                1: "icon-icon_erjixiaofangshi"
            },
            454: {
                0: "icon-icon_hushi1"
            },
            804: {
                0: "icon-icon_hushi"
            },
            404: {
                0: "icon-icon_yaoshi"
            },
            441: {
                0: "icon-icon_yishi"
            },
            459: {
                0: "icon-icon_weishengzige",
                1: "icon-icon_zhongjiweisheng1",
                2: "icon-icon_zhongjiweisheng"
            },
            443: {
                0: "icon-icon_jiaoshizige"
            },
            719: {
                0: "icon-icon_jiaoshizhaopin"
            },
            432: {
                0: "icon-icon_gongwuyuan"
            },
            715: {
                0: "icon-icon_shiyedanwei"
            },
            549: {
                0: "icon-icon_zikao"
            },
            649: {
                0: "icon-icon_chengrengaokao",
                1: "icon-icon_chengrengaokao_"
            },
            417: {
                0: "icon-icon_kaoyan"
            },
            12: {
                0: "icon-icon_sifakaoshi"
            },
            650: {
                0: "icon-icon_renli"
            },
            795: {
                0: "icon-icon_chujigongzuozhe",
                1: "icon-icon_zhongjishehuigo"
            },
            83: {
                0: "icon-icon_siji"
            },
            532: {
                0: "icon-icon_jijincongye"
            },
            58: {
                0: "icon-icon_zhengquancongye"
            },
            435: {
                0: "icon-icon_yinhangcongye"
            },
            721: {
                0: "icon-icon_yinhangzhaopin"
            }
        },
        button: 1,
        backTab: 1,
        scrollIndex: 0,
        classScrollTop: 0,
        storageSubjectParentName: "",
        subjectIndex: ""
    },
    _data: {
        top: "",
        viewstartop: []
    },
    onLoad: function(e) {
        e.backTab && this.setData({
            backTab: e.backTab
        }), e.pageIndex && this.setData({
            pageIndex: e.pageIndex
        }), this.initSubjet(), this.listenerStorageGet(), wx.showLoading({
            title: "加载中"
        }), setTimeout(function() {
            wx.hideLoading();
        }, 800);
    },
    localStorageSubject: function() {
        var e = this, a = this, i = t.globalData.subject.SubjectParentName;
        a.data.minsubject.forEach(function(a) {
            for (var t = 0; t < a.subjectList.length; t++) if (i == a.subjectList[t].SubjectName) {
                var o = a.index;
                e.setData({
                    subjectIndex: o
                });
            }
        });
    },
    onReady: function() {
        this.localStorageSubject();
    },
    clickchoose: function(e) {
        var a = e.target.dataset.index, t = this.data.scrollTopList;
        this.setData({
            classScrollTop: t[a]
        });
    },
    bindscrolltoupper: function(e) {},
    bindscroll: function(e) {
        for (var a = e.detail.scrollTop, t = e.detail.scrollTop + 10, i = this.data.scrollTopList, o = 0, n = 0; n < i.length; n++) {
            if (t >= i[n] && t < i[n + 1]) {
                o = n;
                break;
            }
            o = !i[n + 1] && t > 0 ? n : 0;
        }
        this.setData({
            scrollIndex: o,
            subjectscrollTop: a
        });
    },
    initClassScrollTop: function() {
        var e = [], a = this, t = wx.createSelectorQuery();
        t.selectAll(".sub_content_right_sbox").boundingClientRect(), t.exec(function(t) {
            t[0].forEach(function(a) {
                e.push(a.top);
            }), a.setData({
                scrollTopList: e
            });
            var i = a.data.subjectIndex;
            a.setData({
                classScrollTop: e[i]
            });
        });
    },
    initSubjet: function(e) {
        for (var t = this, i = this, o = [], n = 0; n < this.data.list.length; n++) !function() {
            var e = t.data.list[n], i = {};
            i.index = n, i.groupName = e.groupName, a.getParentSubjects(e.groupId, function(e) {
                i.subjectList = e, o.push(i);
            });
        }();
        i.setData({
            minsubject: o
        }), setTimeout(function() {
            i.initClassScrollTop();
        }, 1e3);
    },
    chooseSubject: function(i) {
        var o = this, n = i.currentTarget.dataset, c = parseInt(n.parentid), s = parseInt(n.level), r = n.parentname;
        o.setData({
            storageSubjectParentName: r
        }), t.setParentSubject(c, s, r), a.getSubjects(function(i) {
            if (i.length > 0) {
                t.setSubject(i[0].SubjectId, i[0].SubjectName);
                var n = {
                    cSubjectParentId: c,
                    cSubjectParentName: r,
                    cSubjectLevel: s,
                    cSubjectId: i[0].SubjectId,
                    cSubjectName: i[0].SubjectName
                };
                a.saveSubjectParent(n);
                var u = "../index/index";
                if (3 == o.data.backTab) return void wx.switchTab({
                    url: u
                });
                if (4 == o.data.backTab) return console.log("backTab4"), void wx.redirectTo({
                    url: "../../pages/examInfo/examInfo/examInfo?IsShare=1&pageIndex=" + o.data.pageIndex
                });
                if (2 == o.data.backTab && (u = "../mine/mine"), console.log(t.getExamRegionType()), 
                1 == t.getExamRegionType() && 0 == t.globalData.userArea.UserAreaId) wx.reLaunch({
                    url: "../selectExamArea/selectExamArea"
                }); else if (2 == t.getExamRegionType() && 0 == t.globalData.userArea.InstitutionAreaId) wx.reLaunch({
                    url: "../selectExamArea/selectExamArea"
                }); else if (1 == o.data.backTab) wx.switchTab({
                    url: u
                }); else {
                    var l = e.PackageInfo.PackageLevel == e.PackageLevel.All ? 2 : 1;
                    wx.navigateBack({
                        delta: l
                    });
                }
            }
        });
    },
    listenerStorageGet: function() {
        var e = this, a = t.globalData.subject.SubjectParentName;
        e.setData({
            storageSubjectParentName: a
        });
    },
    choose: function(e) {
        var a = this, t = "../chooseSubject/chooseSubject?groupId=" + e.currentTarget.dataset.id + "&pageTitle=" + e.currentTarget.dataset.name + "&backTab=" + a.data.backTab;
        1 == a.data.backTab ? wx.redirectTo({
            url: t
        }) : wx.navigateTo({
            url: t
        });
    }
});