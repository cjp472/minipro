var o = require("../../config.js");

getApp();

Page({
    data: {
        theme: o.UIConfig.Theme,
        logoImg: o.UIConfig.LogoImg,
        logoName: o.UIConfig.LogoName,
        isAllPackage: o.PackageInfo.PackageLevel == o.PackageLevel.All,
        company: o.UIConfig.Company,
        website: o.UIConfig.Website
    },
    onLoad: function(e) {
        console.log(o);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});