require("../../utils/util.js");

var e = require("../../config.js");

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
        button: 1,
        backTab: 1
    },
    onLoad: function(e) {
        e.backTab && this.setData({
            backTab: e.backTab
        });
    },
    choose: function(e) {
        var t = this, a = "../chooseSubject/chooseSubject?groupId=" + e.currentTarget.dataset.id + "&pageTitle=" + e.currentTarget.dataset.name + "&backTab=" + t.data.backTab;
        1 == t.data.backTab ? wx.redirectTo({
            url: a
        }) : wx.navigateTo({
            url: a
        });
    }
});