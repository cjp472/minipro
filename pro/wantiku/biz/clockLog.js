function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var c = n[t];
            c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), 
            Object.defineProperty(e, c.key, c);
        }
    }
    return function(n, t, c) {
        return t && e(n.prototype, t), c && e(n, c), n;
    };
}(), t = require("../utils/http.js"), c = (exports.CheckInReport = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return new Promise(function(n, c) {
        t.Get("/api/checkin/CheckInReport", e, function(e) {
            n(e);
        }, function(e) {
            c(e);
        });
    });
}, function() {
    function c(n) {
        e(this, c), this.CircleID = n;
    }
    return n(c, [ {
        key: "circleClock",
        value: function(e, n) {
            var c = {
                "content-type": "application/json"
            };
            t.Post("/api/checkin/CheckInCircle", e, function(e) {
                n && n(e);
            }, null, c);
        }
    }, {
        key: "CheckInReport",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise(function(n, c) {
                t.Get("/api/checkin/CheckInReport", e, function(e) {
                    n(e);
                }, function(e) {
                    c(e);
                });
            });
        }
    }, {
        key: "CheckInCompleteType",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise(function(n, c) {
                t.Get("/api/checkin/CheckInCompleteType", e, function(e) {
                    n(e);
                }, function(e) {
                    c(e);
                });
            });
        }
    }, {
        key: "GetCheckInCircle",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise(function(n, c) {
                t.Post("/api/checkin/CompleteCheckIn", e, function(e) {
                    n(e);
                }, function(e) {
                    c(e);
                }, null);
            });
        }
    }, {
        key: "allCitcleTheme",
        value: function(e) {
            return new Promise(function(n, c) {
                t.Get("/api/checkin/GetCheckInHistoryTheme", e, function(e) {
                    n(e);
                }, function(e) {
                    c(e);
                });
            });
        }
    }, {
        key: "paperClock",
        value: function(e) {
            var n = {
                "content-type": "application/json"
            };
            return new Promise(function(c, i) {
                t.Post("/api/checkin/CheckInQuestions", e, function(e) {
                    c(e);
                }, function(e) {
                    i(e);
                }, n);
            });
        }
    }, {
        key: "getClockLog",
        value: function(e, n, c) {
            var i = {
                CircleID: this.CircleID,
                ThemeId: e || 0,
                pageCount: n
            };
            t.Get("/api/checkin/GetCheckInLog", i, function(e) {
                c && c(e);
            }, function(e) {
                c && c(e);
            });
        }
    }, {
        key: "getClockDetail",
        value: function(e, n) {
            var c = {
                CircleID: this.CircleID
            };
            t.Get("/api/checkin/GetCheckInCircleDetail", c, function(n) {
                e && e(n);
            }, function(e) {
                n && n(e);
            });
        }
    }, {
        key: "deleteClockLog",
        value: function(e, n) {
            var c = {
                checkInLogId: e
            };
            t.Post("/api/checkin/DeleteCheckInLog", c, function(e) {
                n && n(e);
            });
        }
    }, {
        key: "likeClockLog",
        value: function(e, n) {
            var c = {
                checkInLogId: e,
                cancel: n
            };
            return new Promise(function(e, n) {
                t.Post("/api/checkin/LikeCheckInLog", c, function(n) {
                    e(n);
                }, function(e) {
                    n(e);
                });
            });
        }
    }, {
        key: "joinClockCircle",
        value: function(e) {
            var n = {
                circleId: this.CircleID
            };
            t.Post("/api/checkin/JoinCircle", n, function(n) {
                e && e(n);
            });
        }
    }, {
        key: "getNearUser",
        value: function(e) {
            var n = {
                CircleID: this.CircleID
            };
            t.Get("/api/checkin/GetRecentCheckInUser", n, function(n) {
                e && e(n);
            });
        }
    }, {
        key: "getPaperList",
        value: function(e) {
            return new Promise(function(n, c) {
                t.Get("/api/checkin/GetCheckInQuestion", e, function(e) {
                    n(e);
                }, function(e) {
                    c(e);
                });
            });
        }
    } ]), c;
}());

exports.default = c;