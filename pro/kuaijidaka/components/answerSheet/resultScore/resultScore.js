var t = getApp(), a = (t.service, t.util);

Component({
    options: {
        multipleSlots: !0
    },
    relations: {
        "./choice/choice": {
            type: "child"
        }
    },
    properties: {
        listArray: {
            type: Array,
            value: [],
            observer: function(t) {
                this._transformAnswer();
            }
        },
        fromWrong: {
            type: Boolean,
            value: !1
        },
        classList: {
            type: Array,
            value: [],
            observer: function(t, a) {
                if (t.length != a.length) {
                    for (var e = 0; e < this.data.classList.length; e++) this.data.classList[e] = "第" + (parseInt(e) + parseInt(1)) + "课时";
                    this.setData({
                        classList: this.data.classList
                    });
                }
            }
        }
    },
    data: {
        questionArray: [],
        select: 0,
        qsIndex: 0,
        scrollTo: 0,
        answer_content: "",
        standard_answer: "",
        answer_correct: !1,
        classHour: 0
    },
    created: function() {
        this.customData = {
            alreadyRead: !1
        };
    },
    ready: function() {
        this._transformAnswer();
    },
    methods: {
        tips: function() {
            wx.getStorageSync("readTips2") || this.customData.alreadyRead || this.data.fromWrong || this.setData({
                modalContent: "已开通错题本功能，可以在“个人中心—我的错题”查看，支持重做错题。",
                cancelText: "不再提醒",
                confirmColor: "#22dd82",
                confirmText: "我知道了",
                contentColor: "#3b4856",
                cancelColor: "#8897a5",
                showModal: !0
            });
        },
        modalCancel: function() {
            this.setData({
                showModal: !1
            }), wx.setStorage({
                key: "readTips2",
                data: !0
            });
        },
        modalConfirm: function() {
            this.customData.alreadyRead = !0, this.setData({
                showModal: !1
            });
        },
        select: function(t) {
            var a = this, e = t.currentTarget.dataset.index;
            this.tips(), a._switchTab(e);
        },
        _switchTab: function(t) {
            var e = this;
            a.stopVideoPlay(), e.setData({
                select: t,
                qsIndex: 0,
                scrollTo: t - 2 >= 0 ? t - 2 : 0
            }), e._transformAnswer(!0);
        },
        _transformAnswer: function() {
            var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], a = this, e = a.data.select, s = a.data.qsIndex;
            if (t) {
                var r = a.data.listArray[e].question_list.map(function(t) {
                    if (1 == t.kind || 2 == t.kind || 4 == t.kind || 5 == t.kind) {
                        var a = [], e = [];
                        try {
                            a = JSON.parse(t.standard_answer), e = JSON.parse(t.answer_content);
                        } catch (t) {
                            a = [], e = [];
                        }
                        if (1 != t.kind && 2 != t.kind || (e && e.join("") == a.join("") || 0 == a.length ? t.answer_correct = !0 : t.answer_correct = !1), 
                        4 == t.kind) for (var s = 0; s < e.join("").length; s++) (!!e.join("") && a.join("").indexOf(e.join("")[s])) < 0 && a.length > 0 ? t.answer_correct = !1 : t.answer_correct = !0;
                        if (5 == t.kind) if (t.answer_correct = !1, t.order_status) {
                            for (var r = 0; r < e.length; r++) for (var n = 0; n < a.length; n++) if (e[r].trim().replace(/\s+/g, " ") && e[r].trim().replace(/\s+/g, " ") == a[n].trim().replace(/\s+/g, " ")) {
                                t.answer_correct = !0;
                                var i = e[n];
                                e[n] = e[r], e[r] = i;
                            }
                            t.answer_content = JSON.stringify(e);
                        } else for (var o = 0; o < e.length; o++) if (e[o].trim().replace(/\s+/g, " ") && e[o].trim().replace(/\s+/g, " ") == a[o].trim().replace(/\s+/g, " ")) {
                            t.answer_correct = !0;
                            break;
                        }
                    }
                    return t;
                });
                this.setData({
                    questionArray: r
                });
            }
            if (1 == a.data.listArray[e].question_list[s].kind || 2 == a.data.listArray[e].question_list[s].kind || 4 == a.data.listArray[e].question_list[s].kind || 5 == a.data.listArray[e].question_list[s].kind) {
                var n = "", i = "";
                try {
                    i = JSON.parse(a.data.listArray[e].question_list[s].standard_answer).join(""), n = JSON.parse(a.data.listArray[e].question_list[s].answer_content).join("");
                } catch (t) {
                    n = "", i = "";
                }
                this.setData({
                    answer_content: n,
                    standard_answer: i
                });
            }
        },
        switchQs: function(t) {
            var e = this, s = (e.data.select, t.currentTarget.dataset.index);
            this.tips(), e.setData({
                qsIndex: s
            }), a.stopVideoPlay(), e._transformAnswer(!1);
        },
        bindClassChange: function(t) {
            if (this.data.classHour == parseInt(t.detail.value)) return !1;
            this.setData({
                classHour: parseInt(t.detail.value)
            }), this.triggerEvent("classChange", {
                index: parseInt(t.detail.value)
            });
        }
    }
});