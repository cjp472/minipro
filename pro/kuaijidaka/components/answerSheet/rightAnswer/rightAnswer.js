Component({
    properties: {
        question: {
            type: Object,
            value: {},
            observer: function(e) {
                if (e.chapter_id) {
                    var n = e;
                    n.answer_content ? (n.answer_content = JSON.parse(n.answer_content).join(""), n.standard_answer = JSON.parse(n.standard_answer).join("")) : (n.answer_content = JSON.parse(n.answer).join(""), 
                    n.standard_answer = JSON.parse(n.standard_answer).join("")), this.setData({
                        questionInfo: n
                    });
                }
            }
        },
        showTimes: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        questionInfo: {}
    },
    methods: {}
});