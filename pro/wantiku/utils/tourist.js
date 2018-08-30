function t(t, a) {
    try {
        var e = wx.getStorageSync(t);
        e ? e += 1 : e = 1, e >= a && (e = a), wx.setStorage({
            key: t,
            data: e
        });
    } catch (t) {}
}

function a(t, a) {
    var e = 0;
    try {
        (e = (e = wx.getStorageSync(t)) ? a - e : a) < 0 && (e = 0);
    } catch (t) {}
    return e;
}

var e = getApp(), o = {
    fastTest: "fastTest",
    chapterTest: "chapterTest",
    zhentiTest: "zhentiTest",
    solidifyTest: "solidify",
    chapterVideo: "chapterVideo",
    wrongSee: "wrongSee",
    collectionSee: "collectionSee",
    historySee: "historySee"
};

module.exports = {
    TouristStorageKey: o,
    addTouristQuantity: function(a) {
        e.globalData.userData.HasLogin || (console.log("游客" + o.fastTest), a == e.globalData.ExamType.fastTest ? t(o.fastTest, e.globalData.TouristQuantity.fastTestQuantity) : a == e.globalData.ExamType.chapterTest ? t(o.chapterTest, e.globalData.TouristQuantity.chapterTestQuantity) : a == e.globalData.ExamType.zhentiTest ? t(o.zhentiTest, e.globalData.TouristQuantity.zhentiTestQuantity) : a == e.globalData.ExamType.solidifyTest ? t(o.solidifyTest, e.globalData.TouristQuantity.solidifyTestQuantity) : a == e.globalData.ExamType.wrongSee ? t(o.wrongSee, e.globalData.TouristQuantity.wrongSeeQuantity) : a == e.globalData.ExamType.collectionSee ? t(o.collectionSee, e.globalData.TouristQuantity.collectionSeeQuantity) : a == e.globalData.ExamType.historySee ? t(o.historySee, e.globalData.TouristQuantity.historySeeQuantity) : a == e.globalData.VideoType.chapterVideo && t(o.chapterVideo, e.globalData.TouristQuantity.chapterVideoQuantity));
    },
    availabilityQuantity: function(t) {
        if (e.globalData.userData.HasLogin) return 1e3;
        var i = 0;
        return t == e.globalData.ExamType.fastTest ? i = a(o.fastTest, e.globalData.TouristQuantity.fastTestQuantity) : t == e.globalData.ExamType.chapterTest ? i = a(o.chapterTest, e.globalData.TouristQuantity.chapterTestQuantity) : t == e.globalData.ExamType.zhentiTest ? i = a(o.zhentiTest, e.globalData.TouristQuantity.zhentiTestQuantity) : t == e.globalData.ExamType.solidifyTest ? i = a(o.solidifyTest, e.globalData.TouristQuantity.solidifyTestQuantity) : t == e.globalData.ExamType.wrongSee ? i = a(o.wrongSee, e.globalData.TouristQuantity.wrongSeeQuantity) : t == e.globalData.ExamType.collectionSee ? i = a(o.collectionSee, e.globalData.TouristQuantity.collectionSeeQuantity) : t == e.globalData.ExamType.historySee ? i = a(o.historySee, e.globalData.TouristQuantity.historySeeQuantity) : t == e.globalData.VideoType.chapterVideo && (i = a(o.chapterVideo, e.globalData.TouristQuantity.chapterVideoQuantity)), 
        i;
    }
};