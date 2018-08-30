var e;

e = require("lib/hardcore/scripts/account"), App({
    package: require("build/package"),
    scene: null,
    onLaunch: function(n) {
        return console.log("on launch params:", n), this.scene = parseInt(n.scene), console.log(this.package), 
        e.setup();
    },
    onShow: function(e) {
        return console.log("on show params:", e), this.scene = parseInt(e.scene);
    }
});