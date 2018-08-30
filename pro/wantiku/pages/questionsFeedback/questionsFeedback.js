var t = require("../../biz/feedback.js"), e = require("../../config.js");

Page({
    data: {
        theme: e.UIConfig.Theme,
        feedInfoList: [],
        content: "",
        questionId: "",
        btnStatus: !1
    },
    onLoad: function(t) {
        this.data.questionId = t.questionsId;
        var e = [ {
            key: 1,
            state: !1
        }, {
            key: 2,
            state: !1
        }, {
            key: 3,
            state: !1
        }, {
            key: 4,
            state: !1
        }, {
            key: 5,
            state: !1
        } ];
        this.setData({
            feedInfoList: e
        });
    },
    onbindinput: function(t) {
        this.data.content = t.detail.value;
    },
    onFeedbackBtnJs: function(t) {
        var e = t.currentTarget.dataset.postionId, n = this.data.feedInfoList[e];
        n.state = !n.state;
        var a = this.eachInfoList(this.data.feedInfoList);
        this.setData({
            feedInfoList: this.data.feedInfoList,
            btnStatus: a
        });
    },
    eachInfoList: function(t) {
        return t.some(function(t) {
            return !0 === t.state;
        });
    },
    onSubmitJs: function() {
        var e = this.data.btnStatus, n = this.getFeedbackItem(), a = this.data.content;
        e && ("" != n || "" != a ? t.feedBackQuestionBiz.submit(this.data.questionId, n, a, function(t) {
            wx.showToast({
                title: "感谢您的反馈",
                duration: 1e3,
                complete: function(t) {
                    setTimeout(function() {
                        wx.navigateBack({});
                    }, 1e3);
                }
            });
        }) : wx.showToast({
            title: "请选择您的反馈信息",
            image: "../../images/icon/icon_tip.png"
        }));
    },
    getFeedbackItem: function() {
        var t = "";
        for (var e in this.data.feedInfoList) {
            var n = this.data.feedInfoList[e];
            n.state && (t = t + n.key + ",");
        }
        return t;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});