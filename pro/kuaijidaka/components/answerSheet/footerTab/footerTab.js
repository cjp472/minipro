var t = getApp(), a = t.service, e = t.util, i = null;

Component({
    properties: {
        allQsNum: {
            type: Number,
            value: 0
        },
        qsNum: {
            type: Number,
            value: 0
        },
        chapterNum: {
            type: Number,
            value: 1
        },
        chapter: {
            type: Number,
            value: 0,
            observer: function(t, a) {
                var e = this;
                t && e._init();
            }
        },
        length: {
            type: Number,
            value: 0
        },
        index: {
            type: Number,
            value: 0,
            observer: function(t, a) {
                var e = this;
                t && e._init();
            }
        },
        finish: {
            type: Boolean,
            value: !1
        },
        page: {
            type: String,
            value: "default"
        },
        showAnswer: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        previous: !1,
        next: !1,
        submit: !1
    },
    ready: function() {
        this._init();
    },
    methods: {
        _init: function() {
            var t = this;
            "default" == t.data.page || "error" == t.data.page ? 0 == t.data.index && 0 == t.data.chapter ? t.setData({
                previous: !1,
                next: !0
            }) : t.data.chapter == t.data.chapterNum - 1 && t.data.index == t.data.length - 1 && t.setData({
                previous: !1,
                next: !1,
                submit: !0
            }) : "admin" == t.data.page && (0 == t.data.index && 0 == t.data.chapter ? t.setData({
                previous: !1,
                next: !0
            }) : t.data.chapter == t.data.chapterNum - 1 && t.data.index == t.data.length - 1 && t.setData({
                previous: !0,
                next: !1
            }));
        },
        previous: function(t) {
            var a = this;
            clearTimeout(i), i = setTimeout(function() {
                a.data.index <= 0 ? (a.data.chapter > 0 ? (a.data.chapter--, a.setData({
                    previous: !0,
                    next: !1
                }), a.triggerEvent("previous", {
                    index: 0,
                    chapter: a.data.chapter
                })) : a.setData({
                    previous: !1,
                    next: !0
                }), a._init()) : (a.data.index--, a.setData({
                    previous: !0,
                    next: !1
                }), a.triggerEvent("previous", {
                    index: a.data.index,
                    chapter: a.data.chapter
                }), a._init());
            }, 300);
        },
        next: function(t) {
            var a = this;
            clearTimeout(i), i = setTimeout(function() {
                "default" == a.data.page || "error" == a.data.page ? (a.data.index === a.data.length - 1 ? a.data.chapter < a.data.chapterNum - 1 && a.data.finish ? (a.data.chapter++, 
                a.setData({
                    previous: !1,
                    next: !0
                }), a.triggerEvent("next", {
                    index: 0,
                    chapter: a.data.chapter
                })) : (e.showModal("提示", "本章节还有未完成的题目，完成后才能进入下一章", !1), a.setData({
                    previous: !0,
                    next: !1
                }), a.triggerEvent("next", {
                    index: a.data.index,
                    chapter: a.data.chapter,
                    action: 1
                })) : (a.data.index++, a.setData({
                    previous: !1,
                    next: !0
                }), a.triggerEvent("next", {
                    index: a.data.index,
                    chapter: a.data.chapter
                })), a._init()) : "admin" == a.data.page && (a.data.index === a.data.length - 1 ? a.data.chapter < a.data.chapterNum - 1 && (a.data.chapter++, 
                a.setData({
                    previous: !1,
                    next: !0
                }), a.triggerEvent("next", {
                    index: 0,
                    chapter: a.data.chapter
                })) : (a.data.index++, a.setData({
                    previous: !1,
                    next: !0
                }), a.triggerEvent("next", {
                    index: a.data.index,
                    chapter: a.data.chapter
                })), a._init());
            }, 300);
        },
        submit: function(t) {
            var a = this;
            clearTimeout(i), i = setTimeout(function() {
                a.data.finish ? a.triggerEvent("submit", {}) : (e.showModal("提示", "本章节还有未完成的题目，请完成后再提交", !1), 
                this.triggerEvent("submit", {
                    index: a.data.index,
                    chapter: a.data.chapter
                }));
            }, 300);
        },
        geFormId: function(t) {
            var e = this, i = t.detail.formId;
            t.detail.target.dataset.type;
            "submit" ? e.data.finish && a.submitFormId(i) : a.submitFormId(i);
        },
        goBack: function() {
            this.triggerEvent("back", {});
        }
    }
});