var e = require("app.config.js"), a = require("configs/" + e + ".js"), r = (a.PackageInfo.PackageId, 
{
    VERSION: "1.0.4",
    BASE_URL: "https://weixin.566.com",
    AppStorage: {
        header: "header",
        userInfo: "userInfo",
        subject: "subject",
        userData: "userData",
        userArea: "userArea"
    },
    DefaultHeader: {
        SubjectMergerId: a.PackageInfo.SubjectMergerId,
        SubjectParentId: a.PackageInfo.SubjectParentId,
        SubjectLevel: a.PackageInfo.SubjectLevel,
        SubjectId: a.PackageInfo.SubjectId,
        UserId: 0,
        UserClientType: 102,
        VersionNumber: 3630,
        VersionReview: 1,
        Token: "",
        FakesubjectParentId: 0,
        PackageId: a.PackageInfo.PackageId
    },
    PackageInfo: a.PackageInfo,
    UIConfig: a.UIConfig,
    AppName: e,
    PackageLevel: {
        All: 1,
        Group: 2,
        Class: 3,
        Single: 4
    }
}), c = [ 34 ].some(function(e) {
    return e == a.PackageInfo.PackageId;
});

r.buyState = !c, r.UIConfig.color = function(e) {
    var a = "#81db3e";
    switch (e) {
      case "green":
        a = "#0e9900";
        break;

      case "blue":
        a = "#4380db";
        break;

      case "red":
        a = "#ff5757";
        break;

      case "orange":
        a = "#ff7e00";
        break;

      case "Lightblue":
        a = "#27c1f4";
        break;

      case "wantiku":
        a = "#6fce29";
        break;

      case "yellow":
        a = "#db9b00";
    }
    return a;
}(r.UIConfig.Theme), module.exports = r;