getApp();

var r = {
    info: function(r) {},
    error: function(r) {
        return void console.error(r);
    }
};

module.exports = r;