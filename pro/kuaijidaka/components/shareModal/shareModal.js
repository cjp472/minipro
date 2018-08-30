var t = getApp(), e = t.service, o = t.util, s = t.config;

Component({
    properties: {
        page: {
            type: String,
            value: ""
        },
        courseId: {
            type: Number,
            value: 0
        },
        submitId: {
            type: Number,
            value: 0
        },
        colorTheme: {
            type: String,
            value: ""
        },
        shareUser: {
            type: Number,
            value: 0
        }
    },
    data: {
        courseInfo: {},
        submitInfo: {},
        imgList: [ s.staticPictureBase + "share_img_list1.jpg", s.staticPictureBase + "share_img_list2.jpg", s.staticPictureBase + "share_img_list3.jpg" ]
    },
    ready: function() {
        var t = this.data.page;
        "home" === t ? this._setCourseInfo() : "detail" === t && this._setSubmitInfo(), 
        wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#FFFFFF"
        });
    },
    methods: {
        loginSuccess: function() {
            var t = this;
            this.triggerEvent("loginSuccess"), console.log(t.data.colorTheme), wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: "admin" == t.data.colorTheme ? "#4f598f" : "#22dd82"
            });
        },
        _setCourseInfo: function() {
            var t = this, o = this.data.courseId;
            if (o) {
                var s = {
                    course_id: o
                };
                this.data.shareUser && (s.share_user_id = this.data.shareUser), e.fetchCourseInfo(s, function(e) {
                    t.setData({
                        courseInfo: e
                    });
                }, function() {});
            }
        },
        _setSubmitInfo: function() {
            var t = this, o = this.data.submitId;
            o && e.fetchSubmitInfo(o, function(e) {
                t.setData({
                    submitInfo: e
                });
            }, function() {});
        },
        showTips: function() {
            o.showToast("请点击查看全文以查看音频和图片", "none", 2e3);
        }
    }
});