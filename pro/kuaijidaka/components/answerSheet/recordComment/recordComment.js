var t = getApp(), e = (t.service, t.util);

Component({
    properties: {
        commont: {
            type: Array,
            value: [],
            observer: function(t, e) {
                t && this._init();
            }
        }
    },
    data: {
        commontJson: []
    },
    ready: function() {
        this._init();
    },
    methods: {
        _init: function() {
            for (var t = this, o = t.data.commont, n = 0; n < o.length; n++) o[n].createdAt = e.yymmdd(o[n].created_at);
            t.setData({
                commontJson: o
            });
        }
    }
});