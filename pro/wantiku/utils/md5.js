module.exports = function(n, r) {
    function t(n, r) {
        return n << r | n >>> 32 - r;
    }
    function u(n, r) {
        var t, u, e, o, f;
        return e = 2147483648 & n, o = 2147483648 & r, t = 1073741824 & n, u = 1073741824 & r, 
        f = (1073741823 & n) + (1073741823 & r), t & u ? 2147483648 ^ f ^ e ^ o : t | u ? 1073741824 & f ? 3221225472 ^ f ^ e ^ o : 1073741824 ^ f ^ e ^ o : f ^ e ^ o;
    }
    function e(n, r, t) {
        return n & r | ~n & t;
    }
    function o(n, r, t) {
        return n & t | r & ~t;
    }
    function f(n, r, t) {
        return n ^ r ^ t;
    }
    function c(n, r, t) {
        return r ^ (n | ~t);
    }
    function i(n, r, o, f, c, i, a) {
        return n = u(n, u(u(e(r, o, f), c), a)), u(t(n, i), r);
    }
    function a(n, r, e, f, c, i, a) {
        return n = u(n, u(u(o(r, e, f), c), a)), u(t(n, i), r);
    }
    function s(n, r, e, o, c, i, a) {
        return n = u(n, u(u(f(r, e, o), c), a)), u(t(n, i), r);
    }
    function g(n, r, e, o, f, i, a) {
        return n = u(n, u(u(c(r, e, o), f), a)), u(t(n, i), r);
    }
    function h(n) {
        var r, t = "", u = "";
        for (r = 0; r <= 3; r++) t += (u = "0" + (n >>> 8 * r & 255).toString(16)).substr(u.length - 2, 2);
        return t;
    }
    var l, v, A, d, y, b, m, p, x, C = Array();
    for (C = function(n) {
        for (var r, t = n.length, u = t + 8, e = 16 * ((u - u % 64) / 64 + 1), o = Array(e - 1), f = 0, c = 0; c < t; ) f = c % 4 * 8, 
        o[r = (c - c % 4) / 4] = o[r] | n.charCodeAt(c) << f, c++;
        return r = (c - c % 4) / 4, f = c % 4 * 8, o[r] = o[r] | 128 << f, o[e - 2] = t << 3, 
        o[e - 1] = t >>> 29, o;
    }(n), b = 1732584193, m = 4023233417, p = 2562383102, x = 271733878, l = 0; l < C.length; l += 16) v = b, 
    A = m, d = p, y = x, m = g(m = g(m = g(m = g(m = s(m = s(m = s(m = s(m = a(m = a(m = a(m = a(m = i(m = i(m = i(m = i(m, p = i(p, x = i(x, b = i(b, m, p, x, C[l + 0], 7, 3614090360), m, p, C[l + 1], 12, 3905402710), b, m, C[l + 2], 17, 606105819), x, b, C[l + 3], 22, 3250441966), p = i(p, x = i(x, b = i(b, m, p, x, C[l + 4], 7, 4118548399), m, p, C[l + 5], 12, 1200080426), b, m, C[l + 6], 17, 2821735955), x, b, C[l + 7], 22, 4249261313), p = i(p, x = i(x, b = i(b, m, p, x, C[l + 8], 7, 1770035416), m, p, C[l + 9], 12, 2336552879), b, m, C[l + 10], 17, 4294925233), x, b, C[l + 11], 22, 2304563134), p = i(p, x = i(x, b = i(b, m, p, x, C[l + 12], 7, 1804603682), m, p, C[l + 13], 12, 4254626195), b, m, C[l + 14], 17, 2792965006), x, b, C[l + 15], 22, 1236535329), p = a(p, x = a(x, b = a(b, m, p, x, C[l + 1], 5, 4129170786), m, p, C[l + 6], 9, 3225465664), b, m, C[l + 11], 14, 643717713), x, b, C[l + 0], 20, 3921069994), p = a(p, x = a(x, b = a(b, m, p, x, C[l + 5], 5, 3593408605), m, p, C[l + 10], 9, 38016083), b, m, C[l + 15], 14, 3634488961), x, b, C[l + 4], 20, 3889429448), p = a(p, x = a(x, b = a(b, m, p, x, C[l + 9], 5, 568446438), m, p, C[l + 14], 9, 3275163606), b, m, C[l + 3], 14, 4107603335), x, b, C[l + 8], 20, 1163531501), p = a(p, x = a(x, b = a(b, m, p, x, C[l + 13], 5, 2850285829), m, p, C[l + 2], 9, 4243563512), b, m, C[l + 7], 14, 1735328473), x, b, C[l + 12], 20, 2368359562), p = s(p, x = s(x, b = s(b, m, p, x, C[l + 5], 4, 4294588738), m, p, C[l + 8], 11, 2272392833), b, m, C[l + 11], 16, 1839030562), x, b, C[l + 14], 23, 4259657740), p = s(p, x = s(x, b = s(b, m, p, x, C[l + 1], 4, 2763975236), m, p, C[l + 4], 11, 1272893353), b, m, C[l + 7], 16, 4139469664), x, b, C[l + 10], 23, 3200236656), p = s(p, x = s(x, b = s(b, m, p, x, C[l + 13], 4, 681279174), m, p, C[l + 0], 11, 3936430074), b, m, C[l + 3], 16, 3572445317), x, b, C[l + 6], 23, 76029189), p = s(p, x = s(x, b = s(b, m, p, x, C[l + 9], 4, 3654602809), m, p, C[l + 12], 11, 3873151461), b, m, C[l + 15], 16, 530742520), x, b, C[l + 2], 23, 3299628645), p = g(p, x = g(x, b = g(b, m, p, x, C[l + 0], 6, 4096336452), m, p, C[l + 7], 10, 1126891415), b, m, C[l + 14], 15, 2878612391), x, b, C[l + 5], 21, 4237533241), p = g(p, x = g(x, b = g(b, m, p, x, C[l + 12], 6, 1700485571), m, p, C[l + 3], 10, 2399980690), b, m, C[l + 10], 15, 4293915773), x, b, C[l + 1], 21, 2240044497), p = g(p, x = g(x, b = g(b, m, p, x, C[l + 8], 6, 1873313359), m, p, C[l + 15], 10, 4264355552), b, m, C[l + 6], 15, 2734768916), x, b, C[l + 13], 21, 1309151649), p = g(p, x = g(x, b = g(b, m, p, x, C[l + 4], 6, 4149444226), m, p, C[l + 11], 10, 3174756917), b, m, C[l + 2], 15, 718787259), x, b, C[l + 9], 21, 3951481745), 
    b = u(b, v), m = u(m, A), p = u(p, d), x = u(x, y);
    return 32 == r ? h(b) + h(m) + h(p) + h(x) : h(m) + h(p);
};