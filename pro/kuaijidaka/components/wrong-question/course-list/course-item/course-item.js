var t = getApp(), e = (t.service, t.util);

Component({
    properties: {
        course: {
            type: Object,
            value: {},
            observer: function() {}
        }
    },
    data: {
        animationData: {}
    },
    attached: function() {
        var t = wx.createAnimation({
            duration: 500
        });
        this.customData = {
            animation: t
        };
        var a = this.data.course;
        a.selected = !1, e.setDataImproved(this, {
            course: a
        });
    },
    methods: {
        toggleClass: function() {
            var t = this.data.course;
            t.selected = !t.selected, e.setDataImproved(this, {
                course: t
            });
        }
    }
});