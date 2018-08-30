function t(t) {
    var e = !1;
    try {
        var a = wx.getStorageSync(o.reciteModle);
        a && (e = a);
    } catch (t) {}
    console.log(t.globalData.PracticeModle), t.globalData.PracticeModle.reciteModle = e;
}

function e(t) {
    var e = !1;
    try {
        var a = wx.getStorageSync(o.rightDel);
        a && (e = a);
    } catch (t) {}
    console.log(e), t.globalData.PracticeModle.rightDel = e;
}

function a(t) {
    var e = !1;
    try {
        var a = wx.getStorageSync(o.rightSkip);
        a && (e = a);
    } catch (t) {}
    console.log(t.globalData), console.log("-------------"), t.globalData.PracticeModle.rightSkip = e;
}

getApp();

var o = {
    reciteModle: "reciteModle",
    rightDel: "rightDel",
    rightSkip: "rightSkip"
};

module.exports = {
    initpPacticeModle: function(o) {
        t(o), e(o), a(o);
    },
    setStorageReciteModle: function(t, e) {
        t.globalData.PracticeModle.reciteModle = e, wx.setStorage({
            key: o.reciteModle,
            data: e
        });
    },
    setStorageRightDel: function(t, e) {
        t.globalData.PracticeModle.rightDel = e, wx.setStorage({
            key: o.rightDel,
            data: e
        });
    },
    setStorageRightSkip: function(t, e) {
        t.globalData.PracticeModle.rightSkip = e, wx.setStorage({
            key: o.rightSkip,
            data: e
        });
    }
};