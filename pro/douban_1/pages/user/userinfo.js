var r, t = function(r, t) {
    function e() {
        this.constructor = r;
    }
    for (var n in t) o.call(t, n) && (r[n] = t[n]);
    return e.prototype = t.prototype, r.prototype = new e(), r.__super__ = t.prototype, 
    r;
}, o = {}.hasOwnProperty;

r = require("../../lib/hardcore/scripts/userinfo_base").UserInfoPageBase, function(o) {
    function e() {
        return e.__super__.constructor.apply(this, arguments);
    }
    t(e, r), e.prototype.onLoad = function(r) {
        return r.type = "movie", e.__super__.onLoad.call(this, r);
    }, e.register();
}();