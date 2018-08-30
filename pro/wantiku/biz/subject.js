var t = require("../utils/http.js"), e = require("../bizConfig/subjectPackage.js"), n = require("../bizConfig/subjectAll.js"), u = (getApp(), 
{
    getSubjects: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n = {
            SubjectMergerId: 538
        };
        t.Get("/api/subject/UserSubjectNew", {}, function(t) {
            "function" == typeof e && e(t.SubjectEntities);
        }, null, n);
    },
    getParentSubjects: function(t, e) {
        var u = n;
        u && u.length > 0 && u.forEach(function(n) {
            n.GroupId == t && "function" == typeof e && e(n.SubjectEntities);
        });
    },
    getGroupSubjects: function(t, n) {
        var u = e;
        u && u.length > 0 && u.forEach(function(e) {
            e.GroupId == t && "function" == typeof n && n(e.SubjectEntities);
        });
    },
    getClassSubjects: function(t, e) {
        var u = n;
        if (u && u.length > 0) for (var c = 0; c < u.length; c++) {
            var i = u[c], o = [];
            if (i && i.SubjectEntities) {
                for (var r = 0; r < i.SubjectEntities.length; r++) {
                    var s = i.SubjectEntities[r];
                    s.SubjectParentId == t && o.push(s);
                }
                o.length > 0 && "function" == typeof e && e(o);
            }
        }
    },
    saveSubjectParent: function(e, n) {
        t.Post("/api/subject/UserSaveParentSubject", e, function() {
            "function" == typeof n && n();
        });
    },
    saveSubject: function(e, n, u) {
        var c = {
            csubjectId: e,
            csubjectName: n
        };
        t.Post("/api/subject/UserSelectSubject", c, function() {
            "function" == typeof u && u();
        });
    }
});

module.exports = u;