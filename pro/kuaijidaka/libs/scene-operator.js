var e = getApp(), o = e.service, t = e.util;

module.exports = {
    sceneOperator: function(a, s) {
        if ("e" !== a[0] && "n" !== a[0] && "o" !== a[0] && "p" !== a[0]) {
            var c = a, i = c.split("K");
            switch (console.log(i), c[0]) {
              case "c":
                var n = "";
                if ("z" === c[1]) {
                    var r = c.split("z");
                    n = "/pages/user/home/home?courseId=" + r[1], r[2] && (n += "&witchDay=" + r[2]), 
                    r[3] && (n += "&inviterId=" + r[3], e.globalData.collection = {}, e.globalData.collection.inviterId = parseInt(r[3]), 
                    e.globalData.collection.courseId = r[1]);
                } else {
                    var l = c.substring(9, 13) + "-" + c.substring(13, 15) + "-" + c.substring(15, 17), u = c.substring(17, 21) + "-" + c.substring(21, 23) + "-" + c.substring(23, 25), d = c.substring(25), g = t.currentBeijingTime();
                    g < l && (g = l), g > u && (g = u), n = "/pages/user/home/home?courseId=" + d + "&witchDay=" + g;
                }
                wx.redirectTo({
                    url: n
                });
                break;

              case "d":
                var m = {};
                if ("z" !== c[1]) {
                    var p = c.slice(1).split("z");
                    m = {
                        submitId: p[0],
                        courseId: p[1],
                        courseCalendarId: p[2],
                        daySignType: p[3],
                        isShare: !0
                    };
                } else {
                    var b = c.split("z");
                    m = {
                        submitId: b[2],
                        courseId: b[5],
                        courseCalendarId: b[6],
                        daySignType: b[8],
                        isShare: !0
                    };
                }
                m.submitId && (e.globalData.collection = {}, e.globalData.collection.courseId = m.courseId, 
                e.globalData.collection.submitId = m.submitId), wx.navigateTo({
                    url: t.getFullPath("/pages/user/detail/detail", m),
                    complete: function() {
                        s.customData.isFromQrcode = !0;
                    }
                });
                break;

              case "f":
                c = c.substring(1).split("z"), wx.redirectTo({
                    url: "/pages/user_homework/home/home?courseId=" + c[0] + "&courseCalendarId=" + c[1]
                });
                break;

              case "g":
                c = c.substring(1).split("z"), wx.navigateTo({
                    url: "/pages/user/weekly/weekly?course_id=" + c[0],
                    complete: function() {
                        s.customData.isFromQrcode = !0;
                    }
                });
                break;

              case "h":
                c = (c = c.substring(1)).split("z"), parseInt(c[1]) && (e.globalData.collection = {}, 
                e.globalData.collection.inviterId = parseInt(c[1]), e.globalData.collection.courseId = c[0]), 
                wx.navigateTo({
                    url: "/pages/user_homework/homework_list/homework_list?courseId=" + c[0] + "&type=redirect&origin=qrcode&inviterId=" + c[1],
                    complete: function() {
                        s.customData.isFromQrcode = !0;
                    }
                });
                break;

              case "i":
                c = c.split("z"), wx.navigateTo({
                    url: "/pages/user/course_overview/course_overview?courseId=" + c[1] + "&courseType=" + c[2],
                    complete: function() {
                        s.customData.isFromQrcode = !0;
                    }
                });
                break;

              case "j":
                c = (c = c.substring(1)).split("z"), parseInt(c[1]) && (e.globalData.collection = {}, 
                e.globalData.collection.inviterId = parseInt(c[1]), e.globalData.collection.courseId = c[0]), 
                wx.redirectTo({
                    url: "/pages/user/unlock/unlock?courseId=" + c[0] + "&inviterId=" + c[1]
                });
                break;

              case "l":
                wx.navigateTo({
                    url: "/pages/user_sub/accept_invitation/accept_invitation?invite_code=" + i[2] + "&course_id=" + i[1],
                    complete: function() {
                        s.customData.isFromQrcode = !0;
                    }
                });
                break;

              case "m":
                wx.navigateTo({
                    url: "/pages/user_sub/send_invitation/send_invitation?&course_id=" + i[1] + "&counts=" + i[2] + "&isFromQR=true",
                    complete: function() {
                        s.customData.isFromQrcode = !0;
                    }
                });
                break;

              case "r":
                wx.navigateTo({
                    url: "/pages/user_sub/class_invitation_card/class_invitation_card?invite_code=" + i[2] + "&class_id=" + i[1],
                    complete: function() {
                        s.customData.isFromQrcode = !0;
                    }
                });
                break;

              case "s":
                wx.navigateTo({
                    url: "/pages/user/send_class_invitation_card/send_class_invitation_card?counts=" + i[2] + "&class_id=" + i[1],
                    complete: function() {
                        s.customData.isFromQrcode = !0;
                    }
                });
                break;

              case "t":
                var w = c.substring(1).split("z"), v = "/pages/user/call_collect/call_collect?courseId=" + w[0];
                w[1] && (v += "&shareUserId=" + w[1]), w[2] && (v += "&activityId=" + w[2]), wx.navigateTo({
                    url: v,
                    complete: function() {
                        s.customData.isFromQrcode = !0;
                    }
                });
            }
        } else o.forAllUser("/pages/user/discovery/discovery", function() {
            switch (a[0]) {
              case "e":
                var c = a.slice(1);
                o.bindSuperAdmin(c);
                break;

              case "n":
                if (e.globalData.loginUser.allow_admin_login || 3 === e.globalData.loginUser.user_type) {
                    var i = a.slice(1);
                    wx.showModal({
                        title: "登录PC",
                        content: "PC后台登录确认",
                        showCancel: !0,
                        cancelText: "取消",
                        confirmText: "登录",
                        success: function(e) {
                            e.confirm && o.managerLoginPC(i, function() {
                                t.showToast("登录PC成功", "success", 2e3);
                            }, function(e) {
                                wx.showModal({
                                    title: "失败",
                                    content: e.errText,
                                    showCancel: !1,
                                    confirmText: "我知道了"
                                });
                            });
                        }
                    });
                } else s.setData({
                    modalOptions: {
                        showModal: !0,
                        title: "提示",
                        content: "尚无PC后台登录，请联系超级管理员登录PC后台开启PC登录权限。",
                        needCancel: !1,
                        confirmText: "我知道了",
                        contentColor: "#999",
                        confirmColor: "#4f598f"
                    }
                }), s.modalConfirm = function() {
                    s.setData({
                        "modalOptions.showModal": !1
                    });
                };
                break;

              case "o":
                if (e.globalData.loginUser.allow_login_mobile) {
                    var n = a.slice(1);
                    wx.showModal({
                        title: "登录Mobile端",
                        content: "确认登录Mobile端",
                        showCancel: !0,
                        confirmText: "登录",
                        cancelText: "取消",
                        success: function(e) {
                            e.confirm && o.userMobileLogin(n, function(e) {
                                e && console.log("成功返回"), t.showToast("登录Mobile成功", "success", 2e3);
                            }, function(e) {
                                wx.showModal({
                                    title: "失败",
                                    content: e.errText,
                                    showCancel: !1,
                                    confirmText: "我知道了"
                                });
                            });
                        }
                    });
                } else wx.showModal({
                    title: "错误",
                    content: "请联系管理人员开启权限",
                    showCancel: !1
                });
                break;

              case "p":
                var r = a.slice(1);
                wx.showModal({
                    title: "绑定超级管理员",
                    content: "确认绑定超级管理员",
                    showCancel: !0,
                    confirmText: "绑定",
                    cancelText: "取消",
                    success: function(e) {
                        e.confirm && o.superAdminLogin(r, function() {
                            t.showToast("绑定超级管理员成功", "success", 2e3);
                        }, function(e) {
                            wx.showModal({
                                title: "失败",
                                content: e.errText,
                                showCancel: !1,
                                confirmText: "我知道了"
                            });
                        });
                    }
                });
            }
            s.fetchDiscoveryDetail(limit, 0);
        }, function() {
            var o = e.globalData.extConfig;
            t.setDataImproved(s, {
                companyName: o.companyName || "鲸打卡",
                companyLogo: o.companyLogo || "http://static3topen.jingdaka.com/images/ico_jingdaka.png",
                notAuthorized: !0
            }, !0);
        });
    }
};