function e(e) {
    var t = "";
    return e && (t = (t = e.replace(/<\/p>/g, "\n").replace(/<\/br>/g, "\n")).replace(/<[^>]+>/g, "").replace("&nbsp;", " ").replace("&nbsp", " ")), 
    t;
}

module.exports.getSources = function(t) {
    var n = new Object(), r = t, p = /<img.*?(?:>|\/>)/gi, a = /src=[\'\"]?([^\'\"]*)[\'\"]?/i, s = null;
    r && (s = r.match(p));
    var c = new Array();
    if (null == s || 0 == s.length) return n.type = 0, n.content = e(r), c.push(n), 
    c;
    for (var i = 0; i < s.length; i++) if (r) {
        var l = r.split(s[i]);
        "" != l[0] && ((n = new Object()).type = 0, n.content = e(l[0]), c.push(n));
        var u = "";
        for (var h in l) {
            if (h >= l.length - 1) break;
            "" == u ? u += l[parseInt(h) + 1] : u = u + s[i] + l[parseInt(h) + 1];
        }
        r = u;
        var g = new Object();
        g.type = 1;
        var o = s[i].match(a)[1], v = o;
        if (o.indexOf("?") > 0 && (v = o.split("?")[0], g.width = parseInt(parseInt(o.split("?")[1].split("|")[0]) / 1.5), 
        g.height = parseInt(parseInt(o.split("?")[1].split("|")[1]) / 1.5)), g.content = v, 
        c.push(g), i == s.length - 1 && "" != l[1]) {
            var f = new Object();
            f.type = 0, f.content = e(l[1]), c.push(f);
        }
    }
    return c;
};