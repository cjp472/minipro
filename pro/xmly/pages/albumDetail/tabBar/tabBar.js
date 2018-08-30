function t(t) {
    this.page = t, this.init();
}

getApp();

t.prototype.init = function() {
    this.appendEvents(), this.initData();
}, t.prototype.initData = function() {
    this.page.setData({
        freeTabBar: {
            tab: "detail"
        }
    });
}, t.prototype.appendEvents = function() {
    var t = this.page;
    t.tapTab = function(a) {
        var e = a.currentTarget;
        t.setData({
            freeTabBar: {
                tab: e.id
            }
        });
    };
}, module.exports = t;