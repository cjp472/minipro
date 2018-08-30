Object.defineProperty(exports, "__esModule", {
    value: !0
});

var F = {
    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
    phone: /^1\d{10}$/,
    checkcode: /^\d{6}$/i
};

exports.default = {
    email: function(u) {
        return F.email.test(u);
    },
    phone: function(u) {
        return F.phone.test(u);
    },
    password: function(F) {
        return this.lengthBetween(F, 6, 16) && F.split("").every(this.checkMode);
    },
    checkMode: function(F) {
        return /^\w$/.test(F) || "~!@#$%^&*()_+`-={}|:\"<>?[]\\;',./".indexOf(F) >= 0;
    },
    checkcode: function(u) {
        return F.checkcode.test(u);
    },
    empty: function(F) {
        return "" === F;
    },
    lengthBetween: function(F, u, e) {
        return F && F.length > u - 1 && F.length < e + 1;
    },
    equal: function(F, u) {
        return F === u;
    }
};