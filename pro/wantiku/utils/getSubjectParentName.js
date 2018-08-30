function r(r) {
    if (Array.isArray(r)) {
        for (var e = 0, u = Array(r.length); e < r.length; e++) u[e] = r[e];
        return u;
    }
    return Array.from(r);
}

var e = require("../biz/subject.js");

module.exports = {
    getSubParentName: function(u, t) {
        for (var o = [ {
            groupId: 8
        }, {
            groupId: 4
        }, {
            groupId: 9
        }, {
            groupId: 16
        }, {
            groupId: 13
        }, {
            groupId: 10
        }, {
            groupId: 6
        }, {
            groupId: 15
        }, {
            groupId: 11
        } ], g = [], n = 0; n < o.length; n++) {
            var a = o[n];
            e.getParentSubjects(a.groupId, function(e) {
                g.push.apply(g, r(e));
            });
        }
        for (n = 0; n < g.length; n++) if (g[n].SubjectParentId == u && g[n].SubjectLevel == t) return g[n].SubjectName;
    }
};