var t = getApp(), e = {
    fastTest: "fastTest_deblocking",
    chapterTest: "chapterTest_deblocking",
    zhentiTest: "zhentiTest_deblocking",
    solidifyTest: "solidify_deblocking"
};

module.exports = {
    getStorageSync: function(a) {
        var s = "";
        a == t.globalData.ExamType.fastTest ? s = e.fastTest : a == t.globalData.ExamType.chapterTest ? s = e.chapterTest : a == t.globalData.ExamType.zhentiTest ? s = e.zhentiTest : a == t.globalData.ExamType.solidifyTest && (s = e.solidifyTest);
        var T = !1;
        try {
            (T = wx.getStorageSync(s)) && "" != T || (T = !1);
        } catch (t) {}
        return T;
    },
    setStorage: function(a) {
        var s = "";
        a == t.globalData.ExamType.fastTest ? s = e.fastTest : a == t.globalData.ExamType.chapterTest ? s = e.chapterTest : a == t.globalData.ExamType.zhentiTest ? s = e.zhentiTest : a == t.globalData.ExamType.solidifyTest && (s = e.solidifyTest), 
        console.log(s), wx.setStorage({
            key: s,
            data: !0
        });
    }
};