var e = require("../../biz/subject.js"), i = require("../../config.js"), a = getApp();

Page({
    data: {
        theme: i.UIConfig.Theme,
        bottom: !1,
        subjects: [],
        viewHeight: 1e7,
        bottomTHD: 10,
        onlyPackage: !1,
        SubjectParentname: "",
        publicData: [],
        majorData: [],
        isTotal: !0,
        subjetIcon: "",
        presentPackageLevel: "",
        singlePackage: ""
    },
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
    heightData: {
        isInit: !1,
        currentHeigt: 0,
        bottomHeight: 1e7
    },
    onLoad: function(i) {
        var n = this;
        a.setTitleWithSubjectParentName(), e.getSubjects(function(e) {
            var i = e.length > 8;
            n.setData({
                subjects: e,
                bottom: i
            }), n.getNewData();
        }), wx.getStorage({
            key: "header",
            success: function(e) {
                var i = e.data.SubjectLevel, a = e.data.SubjectParentId, t = n.listStyes[a][i];
                n.setData({
                    subjetIcon: t
                });
            }
        }), n.presentPackageState();
    },
    onReady: function() {
        this.BigpackgeName();
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    bindChoose: function(i) {
        var n = i.currentTarget.dataset.id, t = i.currentTarget.dataset.name;
        if (n != a.globalData.header.SubjectId) {
            a.setSubject(n, t);
            var o = {
                cSubjectParentId: a.globalData.header.SubjectParentId,
                cSubjectParentName: a.globalData.subject.SubjectParentName,
                cSubjectLevel: a.globalData.header.SubjectLevel,
                cSubjectId: n,
                cSubjectName: t
            };
            e.saveSubjectParent(o);
        }
        wx.navigateBack({
            delta: 1
        });
    },
    bindBottom: function(e) {
        this.heightData.isInit = !0, this.setData({
            bottom: !1
        });
    },
    bindscroll: function(e) {},
    chooseTest: function() {
        var e = this;
        e.data.presentPackageLevel == i.PackageLevel.All ? wx.navigateTo({
            url: "../chooseSchoolType/chooseSchoolType"
        }) : (e.data.presentPackageLevel == i.PackageLevel.Group || i.PackageLevel.Class) && wx.navigateTo({
            url: "../chooseSubject/chooseSubject"
        });
    },
    BigpackgeName: function() {
        var e = this;
        wx.getStorage({
            key: "subject",
            success: function(i) {
                e.setData({
                    SubjectParentname: i.data.SubjectParentName
                });
            }
        });
    },
    getNewData: function() {
        for (var e = this, i = e.data.subjects, a = [], n = [], t = 0, o = 0, c = 0; c < i.length; c++) 1 == i[c].IsOption ? t++ : o++, 
        i[c].IsOption ? e.setData({
            isTotal: !1
        }) : e.setData({
            isTotal: !0
        }), 0 == i[c].IsOption ? a.push(i[c]) : n.push(i[c]);
        t != i.length && o != i.length || e.setData({
            isTotal: !0
        }), e.setData({
            publicData: a,
            majorData: n
        });
    },
    presentPackageState: function() {
        var e = i.PackageInfo.PackageLevel, a = i.PackageLevel.All, n = i.PackageLevel.Group, t = i.PackageLevel.Class, o = i.PackageLevel.Single;
        (e == a || n || t) && this.setData({
            singlePackage: !1,
            presentPackageLevel: e
        }), e == o && this.setData({
            singlePackage: !0,
            presentPackageLevel: e
        });
    }
});