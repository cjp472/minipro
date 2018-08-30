var e = null;

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        allQsNum: {
            type: Number,
            value: 0
        },
        qsNum: {
            type: Number,
            value: 0
        },
        index: {
            type: Number,
            value: 0,
            observer: function(e, t) {
                var i = this;
                e != t && i._switchTab(i.data.index);
            }
        },
        chapter: {
            type: Number,
            value: 0,
            observer: function(e, t) {
                e != t && this.setData({
                    submited: 0
                });
            }
        },
        chapterNum: {
            type: Number,
            value: 0
        },
        listArray: {
            type: Array,
            value: []
        },
        finish: {
            type: Boolean,
            value: !1
        },
        showAnswer: {
            type: Boolean,
            value: !1
        },
        page: {
            type: String,
            value: "default"
        }
    },
    data: {
        submited: 0,
        select: 0,
        scrollTo: 0,
        evalRecord: {
            eval_voice_id: null,
            voice_url: null,
            score: null
        }
    },
    methods: {
        select: function(e) {
            var t = this, i = e.currentTarget.dataset.index;
            t._switchTab(i);
        },
        _switchTab: function(e) {
            this.setData({
                select: e,
                index: e,
                scrollTo: e - 2 >= 0 ? e - 2 : 0
            });
        },
        setIndex: function(t) {
            var i = this;
            clearTimeout(e), e = setTimeout(function() {
                i.select(t), i.triggerEvent("indexChange", t.currentTarget.dataset);
            }, 300);
        },
        next: function(e) {
            var t = this;
            1 == (e.detail.action || 0) && (t.setData({
                submited: t.data.submited + 1
            }), this.triggerEvent("scrollTo", "scroll")), this.triggerEvent("next", e.detail);
        },
        previous: function(e) {
            this.triggerEvent("previous", e.detail);
        },
        submit: function(e) {
            var t = this;
            t.data.finish ? t.triggerEvent("submit") : t.setData({
                submited: t.data.submited + 1
            });
        },
        answer: function(e) {
            this.triggerEvent("answer", e.detail);
        },
        goBack: function() {
            this.triggerEvent("footerBack", {});
        }
    }
});