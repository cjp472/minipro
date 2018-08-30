module.exports = Behavior({
    properties: {
        submitData: {
            type: Object,
            value: {},
            observer: function(t, e) {
                e && e.submit_id && this._setupData();
            }
        }
    },
    methods: {
        _parent: function() {
            var t = this.getRelationNodes("../submit/submit");
            return console.log("parentNode", t), t && 0 !== t.length ? t[0] : this;
        },
        _sibling: function(t) {
            var e = this._parent().getRelationNodes("../" + t);
            if (e && e.length > 0) return e[0];
        },
        stopPropagation: function(t) {}
    }
});