module.exports = {
    userInputStatic: function() {
        if ("password" == (t = this.data.effect.userInput)) t = "text"; else var t = "password";
        this.setData({
            "effect.userInput": t,
            "effect.focus": !0
        });
    },
    selectNext: function() {
        this.setData({
            "effect.selectNextIndex": 1
        });
    },
    onFocus: function() {
        this.setData({
            inputFocus: !0
        }), clearAnimateJs.call(this);
    },
    userKeydown: function(t) {
        for (var e = t.detail.value, s = [], u = 0; u < e.length; u++) s.push(e.substr(u, 1));
        this.setData({
            userInputCode: s
        }), console.log(s);
    }
};