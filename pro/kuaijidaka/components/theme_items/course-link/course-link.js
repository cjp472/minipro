var e = getApp(), r = e.service, s = e.util;

Component({
    properties: {
        courseId: {
            type: Number,
            value: 0
        },
        appId: {
            type: String,
            value: ""
        }
    },
    data: {
        courseName: ""
    },
    created: function() {
        this.customData = {
            courseDetail: {}
        };
    },
    attached: function() {
        var e = this, t = this.data.courseId;
        r.fetchCourseDetail(t, function(r) {
            e.customData.courseDetail = r, e.setData({
                courseName: r.title
            });
        }, function(r) {
            s.showError("获取课程详情失败" + r.errText + ",请刷新页面", e);
        });
    },
    methods: {
        toCourse: function() {
            var e = this.data, r = e.courseId, t = (e.appId, this.customData.courseDetail), o = t.course_type, u = t.ended_at, i = t.start_at, c = t.summary_enabled, a = t.is_submited, n = t.unlock_number, p = void 0, d = void 0;
            d = u.split("T")[0] < s.currentBeijingTime() ? u.split("T")[0] : i.split("T")[0] > s.currentBeijingTime() ? i.split("T")[0] : s.currentBeijingTime(), 
            0 === o ? p = s.getYYMMDD(i) > s.currentBeijingTime() && c ? "/pages/user/course_overview/course_overview?courseId=" + r + "&courseType=0" : "/pages/user/home/home?courseId=" + r + "&witchDay=" + d : 1 === o ? p = !a && c ? "/pages/user/course_overview/course_overview?courseId=" + r + "&courseType=1" : "/pages/user_homework/homework_list/homework_list?courseId=" + r + "&type=redirect" : 2 === o && (p = a ? "/pages/user/unlock/unlock?courseId=" + r + "&courseNum=" + (parseInt(n) + 1) : "/pages/user/course_overview/course_overview?courseId=" + r + "&courseType=2"), 
            wx.navigateTo({
                url: p
            });
        }
    }
});