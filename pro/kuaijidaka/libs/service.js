function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

function t(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
    }
    return Array.from(e);
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, i = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
    }
    return e;
};

module.exports = {
    request: function(e, t, n, r, s) {
        var o = i({
            "content-type": "application/json"
        }, e.header, {
            apsid: this.globalData.apsid,
            version: this.config.version
        });
        wx.request({
            url: this.config.HOST + e.urlName,
            data: t,
            header: o,
            method: e.method || "POST",
            dataType: e.dataType || "json",
            responseType: e.responseType || "text",
            success: function(e) {
                return "function" == typeof n && n(e);
            },
            fail: function(t) {
                return console.log("请求失败:", e.urlName, JSON.stringify(t)), "function" == typeof r && r(t);
            },
            complete: function(e) {
                return "function" == typeof s && s(e);
            }
        });
    },
    requestGet: function(e, t, n, i, r) {
        this.request({
            urlName: e,
            method: "GET"
        }, t, function(e) {
            var t = e.data, r = e.statusCode;
            r >= 200 && r < 300 ? 0 === t.err_code ? "function" == typeof n && n(t.data) : "function" == typeof i && i({
                errType: "code",
                errMsg: t.err_code || t,
                errText: t.err_msg || t.err_code || t
            }) : "function" == typeof i && i({
                errType: "network",
                errMsg: "网络错误" + r,
                errText: "网络错误" + r
            });
        }, function(e) {
            "function" == typeof i && i({
                errType: "network",
                errMsg: e.errMsg || "网络错误",
                errText: e.errMsg || "网络错误"
            });
        }, function(e) {
            "function" == typeof r && r(e);
        });
    },
    requestPost: function(e, t, n, i, r) {
        this.request({
            urlName: e,
            method: "POST"
        }, t, function(e) {
            var t = e.data, r = e.statusCode;
            r >= 200 && r < 300 ? 0 === t.err_code ? "function" == typeof n && n(t.data) : "function" == typeof i && i({
                errType: "code",
                errMsg: t.err_code || t,
                errText: t.err_msg || t.err_code || t
            }) : "function" == typeof i && i({
                errType: "network",
                errMsg: "网络错误" + r,
                errText: "网络错误" + r
            });
        }, function(e) {
            "function" == typeof i && i({
                errType: "network",
                errMsg: e.errMsg || "网络错误",
                errText: e.errMsg || "网络错误"
            });
        }, function(e) {
            "function" == typeof r && r(e);
        });
    },
    submitFormId: function(e, t) {
        if (e && !(e.indexOf("mock") > -1)) {
            var n = {
                form_id: e
            };
            this.requestPost("user/formid/add", n, t);
        }
    },
    checkLocalPunch: function(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "punchContent", i = this, r = i.util.storage("get", n);
        if ("get" == e.action && "edit" !== e.punchType) if (r) {
            for (var s = !1, o = 0; o < r.length; o++) if (r[o].record_at == e.currenTime.substring(0, 10) && r[o].course_id == e.course_id && r[o].courseCalendarId == e.courseCalendarId) {
                s = !0;
                var u = {
                    content: r[o].content || ""
                };
                "function" == typeof t && t(u);
            }
            if (!s) {
                var a = {
                    content: ""
                };
                "function" == typeof t && t(a);
            }
        } else {
            var c = {
                content: ""
            };
            "function" == typeof t && t(c);
        } else if ("set" == e.action && "edit" != e.punchType) {
            var f = {
                record_at: e.currenTime.substring(0, 10),
                course_id: e.course_id,
                courseCalendarId: e.courseCalendarId,
                content: e.content
            };
            if (r.length > 0) {
                for (var d = !1, l = 0; l < r.length; l++) r[l].record_at === e.currenTime.substring(0, 10) && r[l].course_id === e.course_id && r[l].courseCalendarId === e.courseCalendarId && (r[l].content = f.content, 
                d = !0);
                d || r.push(f);
            } else r = new Array(f);
            i.util.storage("set", n, r);
        } else "remove" == e.action && i.util.storage("remove", n);
    },
    forAllUser: function(e, t, n) {
        this._userLogin(e, "all", t, n);
    },
    forUserOnly: function(e, t, n) {
        var i = this;
        this._userLogin(e, "user_only", function() {
            var n = i.globalData.loginUser;
            2 === n.user_type_login || 3 === n.user_type_login ? (console.log(i._getPairURL(e, "admin")), 
            wx.redirectTo({
                url: i._getPairURL(e, "admin")
            })) : "function" == typeof t && t();
        }, n);
    },
    forAdminOnly: function(e, t, n) {
        var i = this;
        this._userLogin(e, "admin", function() {
            1 === i.globalData.loginUser.user_type_login ? wx.redirectTo({
                url: i._getPairURL(e, "user")
            }) : "function" == typeof t && t();
        }, n);
    },
    forSuperAdminOnly: function(e, t, n) {
        var i = this, r = this;
        this._userLogin(e, "super_admin", function() {
            var e = r.globalData.loginUser, n = e.user_type_login, s = e.user_type;
            3 === n ? "function" == typeof t && t() : 2 === n ? wx.redirectTo({
                url: "/pages/admin/operation/operation"
            }) : 3 === s ? i.switchUserLoginType("admin", function() {
                "function" == typeof t && t();
            }, function() {
                wx.redirectTo({
                    url: "/pages/user/my/my"
                });
            }) : wx.redirectTo({
                url: "/pages/user/my/my"
            });
        }, n);
    },
    collectDataShare: function(e) {
        this.requestGet("user/course_share", e);
    },
    bindSuperAdmin: function(e) {
        this.requestGet("user/open_beadmin", {
            auth_user_scene: e
        });
    },
    fetchCourses: function(e, t, n, i, r) {
        this.requestGet("user/course/list", {
            offset: e,
            limit: t
        }, n, i, r);
    },
    fetchCoursesAdmin: function(e, t, n, i) {
        this.requestGet("manager/course/list", {
            offset: e,
            limit: t
        }, n, i);
    },
    checkCoursePermission: function(e, t, n) {
        var i = function(e, t) {
            "function" == typeof n && n({
                errType: e,
                errMsg: t
            });
        };
        this.requestGet("user/submit_check", {
            course_id: e
        }, function(e) {
            1 !== e.blacklist_state ? 2 !== e.blacklist_state ? e.need_password ? e.trial_count > 0 ? "function" == typeof t && t(!0) : i({
                1: "password",
                3: "wxgroup",
                4: "pay"
            }["" + e.permit_type], e.remark) : "function" == typeof t && t() : i("blacklist_course", "你已被管理员从该课程中移除") : i("blacklist", "你没有该课程的打卡权限，无法打卡");
        }, function(e) {
            i(e.errType, e.errMsg);
        });
    },
    permissionChecker: function(e, t) {
        var n = this, i = e.that, r = e.courseID, s = e.noTrialPass, o = e.hasPermission, u = this.util.setDataImproved, a = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) && n.getShareInfo(function(e) {
                n.joinWXGroup({
                    course_id: r,
                    iv: e.iv,
                    encryptedData: e.encryptedData
                });
            }), "function" == typeof t && t(e);
        }, c = function() {
            wx.showModal({
                title: "提示",
                content: "暂无权限进入该课程",
                showCancel: !1,
                complete: function() {
                    wx.redirectTo({
                        url: "/pages/user/my/my"
                    });
                }
            });
        };
        o ? a() : this.requestGet("user/submit_check", {
            course_id: parseInt(r)
        }, function(e) {
            var t = 4 !== e.permit_type;
            if (1 !== e.blacklist_state) if (2 !== e.blacklist_state) if (e.need_password) if (i.onPermissionPass = function() {
                u(i, {
                    permissionChecker: null
                }), a(!1, t);
            }, !s && e.trial_count > 0) a(!0, !0); else switch (e.permit_type) {
              case 1:
                u(i, {
                    permissionChecker: {
                        denyReason: 3,
                        courseId: parseInt(r),
                        tips: e.remark,
                        permit_image: e.permit_image || ""
                    }
                });
                break;

              case 3:
                n.checkWXGroup(r, function() {
                    a(!1, !0);
                }, function() {
                    u(i, {
                        permissionChecker: {
                            denyReason: 1,
                            courseId: parseInt(r),
                            tips: e.remark,
                            permit_image: e.permit_image || ""
                        }
                    });
                }, function() {
                    c();
                });
                break;

              case 4:
                var o = "/pages/user/course_overview/course_overview?courseId=" + r + "&toPay=true";
                3 === e.valid_state && (o += "&needPayAgain=true"), wx.redirectTo({
                    url: o
                });
            } else a(!1, !0); else u(i, {
                permissionChecker: {
                    denyReason: 2,
                    courseId: parseInt(r),
                    tips: "",
                    permit_image: ""
                }
            }); else c();
        }, function(e) {
            wx.showModal({
                title: "提示",
                content: "网络错误导致验证失败，请稍后重试",
                showCancel: !1,
                complete: function() {
                    wx.redirectTo({
                        url: "/pages/user/my/my"
                    });
                }
            });
        });
    },
    exitCourse: function(e, t, n) {
        this.requestPost("user/course/delete", {
            course_id: e
        }, t, n);
    },
    switchUserLoginType: function(e, t, n) {
        var r = this, s = {
            user: 1,
            admin: 2
        };
        this.requestPost("user/switch_login_type", {
            login_type: s[e]
        }, function(e) {
            r.globalData.loginUser = i({}, r.globalData.loginUser, e), "function" == typeof t && t();
        }, n);
    },
    fetchCourseDetail: function(e, t, n, i) {
        this.requestGet("user/course_detail", {
            course_id: parseInt(e)
        }, t, n, i);
    },
    fetchRankingList: function(e, t, n, r) {
        var s = {
            rank_type: 0,
            rank_rule: 1,
            offset: 0,
            limit: 10
        }, o = i({
            course_id: parseInt(e)
        }, s, t);
        this.requestGet("user/course/ranking", o, n, r);
    },
    fetchSubmitDetail: function(e, t, n, i) {
        this.requestGet("user/submit_detail", {
            submit_id: e
        }, t, n, i);
    },
    setPraise: function(e, t, n, i) {
        var r = t ? "user/submit/praise" : "user/submit/cancel_praise";
        this.requestPost(r, {
            submit_id: parseInt(e)
        }, n, i);
    },
    replyComment: function(e, t, n) {
        e.submit_id = parseInt(e.submit_id), e.replyto_comment_id = parseInt(e.replyto_comment_id), 
        this.requestPost("user/comment", e, t, n);
    },
    checkAuthority: function(e, n, i, r) {
        var s = this;
        this.fetchCourseDetail(e, function(e) {
            var r = e.manager_user_ids.split(",").map(function(e) {
                return parseInt(e);
            }), o = [].concat(t(r), [ e.holded_by_user_id ]).some(function(e) {
                return e === s.globalData.loginUser.user_id;
            });
            3 === s.globalData.loginUser.user_type || o ? "function" == typeof i && i(e) : s.switchUserLoginType("user", function() {
                wx.redirectTo({
                    url: s._getPairURL(n, "user")
                });
            });
        }, function(e) {
            "function" == typeof r && r(e);
        });
    },
    fetchCourseAPPQrcode: function(e, t, n, i) {
        this.requestGet("signday/course_share_qrcode", {
            scene: t,
            course_id: parseInt(e)
        }, n, i);
    },
    checkPassword: function(e, t, n, i) {
        this.requestPost("user/password_check", {
            password: t,
            course_id: parseInt(e)
        }, n, i);
    },
    fetchAchievementPicture: function(e, t, n, i) {
        this.requestGet("signday/submit_achievement_card", e, t, n, i);
    },
    uploadMp3: function(e, t, n, i) {
        this._uploadSingleFile("voice", e, t, n, i);
    },
    uploadImg: function(e, t, n, i) {
        this._uploadSingleFile("pic", e, t, n, i);
    },
    uploadVideo: function(e, t, n, i) {
        this._uploadSingleFile("video", e, t, n, i);
    },
    getLinkInfo: function(e, t, n, i, r) {
        this.requestGet("signday/website_info", {
            web_site: e,
            flag: t
        }, n, i, r);
    },
    fetchRankingPicture: function(e, t, n, r) {
        var s = i({}, e);
        "number" != typeof s.submit_num && (s.submit_num = parseInt(s.submit_num)), "number" != typeof s.ranking_num && (s.ranking_num = parseInt(s.ranking_num)), 
        this.requestGet("signday/leaderboard_info", e, t, n, r);
    },
    getPictureResources: function() {
        var e = "dev" === this.config.env ? "https://static3topen.jingdaka.com/images/" : "https://cdn-qiye.jingdaka.com/images/";
        return {
            videoFirstFrame: e + "video_first_frame.png",
            contactUsQrcode: e + "img_code.jpg",
            subscriptionQrcode: e + "img_code2.png",
            pictureForSharingRank: e + "share_rank_cover.png?v=" + this.config.version,
            shareInformCover: e + "share_inform_cover.png?v=" + this.config.version,
            invitationTemplates: [ e + "inviteCardNew-8.png", e + "inviteCardNew-7.png", e + "inviteCardNew-2.png", e + "inviteCardNew-1.png", e + "inviteCardNew-3.png", e + "inviteCardNew-4.png", e + "inviteCardNew-6.png", e + "inviteCardNew-5.png" ],
            invitationQrCode: e + "invitation_qrcode.png"
        };
    },
    getCourseInform: function(e, t, n, i) {
        this.requestGet("user/course_message", {
            course_calendar_id: parseInt(e.courseCalendarID),
            limit: e.limit || 10,
            offset: e.offset || 0
        }, t, n, i);
    },
    fetchLongPicture: function(e, t, n, i, r) {
        this.requestGet("signday/submit_image", {
            scene: t,
            submit_id: parseInt(e)
        }, n, i, r);
    },
    fetchLongPictureEval: function(e, t, n, i, r) {
        this.requestGet("signday/voice_achievement_card", {
            scene: t,
            submit_id: parseInt(e)
        }, n, i, r);
    },
    deleteComment: function(e, t, n, i) {
        this.requestPost("user/comment/delete", {
            comment_id: e
        }, t, n, i);
    },
    fetchUnlocknumber: function(e, t, n, i) {
        this.requestGet("user/unlocknumber", {
            course_id: parseInt(e)
        }, t, n, i);
    },
    fetchUnlockCalendar: function(t, n, i, r, s) {
        this.requestGet("user/unlock_course_calendar", e({
            course_id: parseInt(t),
            limit: 50,
            offset: n
        }, "offset", n), i, r, s);
    },
    retryEval: function(e, t, n, i) {
        this.requestGet("user/eval_voice", {
            submit_id: parseInt(e)
        }, t, n, i);
    },
    questionTheme: function(e, t, n) {
        this.requestGet("user/get_theme", {
            calendar_id: parseInt(e)
        }, t, n);
    },
    adminQuestionTheme: function(e, t, n) {
        this.requestGet("admin/get_theme", {
            calendar_id: parseInt(e)
        }, t, n);
    },
    fetchSubmitList: function(e, t, n, r) {
        var s = i({
            order_type: 0,
            limit: 10,
            offset: 0
        }, e);
        "number" != typeof s.course_id && (s.course_id = parseInt(s.course_id)), s.course_calendar_id && "number" != typeof s.course_calendar_id && (s.course_calendar_id = parseInt(s.course_calendar_id)), 
        this.requestGet("user/submitlist", s, function(e) {
            e && 0 != e.eval_state && e.submit_list && e.submit_list.forEach(function(e) {
                if (e.eval_voice) {
                    var t = [];
                    try {
                        t = JSON.parse(e.eval_voice.words);
                    } catch (e) {
                        console.log("json parse error:fetchSubmitList(" + e + ")");
                    }
                    t.length > 0 && (e.eval_voice.words = JSON.stringify(t.map(function(e) {
                        return {
                            text: e.text,
                            score: e.score
                        };
                    })));
                }
            }), t(e);
        }, n, r);
    },
    fetchSevenDaysCalenadr: function(e, t, n, i) {
        var r = Array.isArray(t) ? t.join(",") : t;
        this.requestGet("user/sevenday/calendar", {
            course_id: parseInt(e),
            seven_date: r
        }, n, i);
    },
    fetchSevenDaysCalenadrAdmin: function(e, t, n, i) {
        var r = Array.isArray(t) ? t.join(",") : t;
        this.requestGet("manager/sevenday/calendar", {
            course_id: parseInt(e),
            seven_date: r
        }, n, i);
    },
    fetchMessages: function(e, t, n) {
        this.requestGet("remind/by_course", {
            course_id: parseInt(e)
        }, t, n);
    },
    checkWXGroup: function(e, t, n, i) {
        var r = this;
        this.getShareInfo(function(s) {
            r.requestPost("user/verify_wxgroup", {
                course_id: parseInt(e),
                encryptedData: s.encryptedData,
                iv: s.iv
            }, function(e) {
                "function" == typeof t && t(e);
            }, function(e) {
                "code" === e.errType && 107 === e.errMsg ? "function" == typeof n && n() : "function" == typeof i && i(e);
            });
        }, function(e) {
            "function" == typeof n && n();
        });
    },
    fetchTopic: function(e, t, n, i) {
        this.requestGet("user/get_theme", {
            calendar_id: parseInt(e)
        }, t, n, i);
    },
    fetchTopicByDate: function(e, t, n, i) {
        this.requestGet("user/get_theme", {
            course_id: parseInt(e),
            record_at: t
        }, n, i);
    },
    getUserAnswer: function(e, t, n) {
        this.requestGet("user/answer", {
            submit_id: parseInt(e)
        }, t, n);
    },
    submitAnswer: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "0", t = arguments[1], n = arguments[2], i = arguments[3], r = arguments[4], s = arguments[5];
        this.requestPost("0" == e ? "user/submit_paper" : "1" == e ? "user/angin_answer" : "user/submit_exercise_answer", {
            duration: t,
            calendar_id: parseInt(n),
            answer_list: i
        }, r, s);
    },
    setPhoneNumber: function(e, t, n) {
        this.requestPost("user/phone", e, t, n);
    },
    fetchCalendar: function(e, t, n, i) {
        "number" != typeof e.course_id && (e.course_id = parseInt(e.course_id)), this.requestGet("user/course_calendar", e, t, n, i);
    },
    fetchInvitationCodeDetail: function(e, t, n, i, r) {
        this.requestGet("user/invite_code/detail", {
            invite_code: e,
            course_id: t
        }, n, i, r);
    },
    becomeManager: function(e, t, n, i, r) {
        this.requestGet("user/become_manager", {
            invite_code: e,
            course_id: t
        }, n, i, r);
    },
    generateInvitationCode: function(e, t, n, i) {
        this.requestGet("admin/get_invite_code", e, t, n, i);
    },
    becomeAdmin: function(e, t, n, i) {
        this.requestGet("user/become_admin", {
            invite_code: e
        }, t, n, i);
    },
    modifyUser: function(e, t, n, i) {
        this.requestPost("user/info", e, t, n, i);
    },
    addBlacklist: function(e, t, n, i) {
        this.requestPost("manager/blacklist_add", e, t, n, i);
    },
    uploadVoice: function(e, t, i, r) {
        if ("object" === (void 0 === e ? "undefined" : n(e))) {
            var s = this.config.HOST + "voice/uploadmp3", o = this.config.HOST + "voice/upload";
            wx.uploadFile({
                url: "mp3" == e.type ? s : o,
                filePath: e.voiceObj.tempPath,
                name: "file",
                header: {
                    "content-type": "application/json",
                    apsid: this.globalData.apsid
                },
                success: function(n) {
                    var r = void 0;
                    try {
                        r = JSON.parse(n.data);
                    } catch (e) {
                        console.log(JSON.stringify(e)), "function" == typeof i && i({
                            errType: "json",
                            errMsg: JSON.stringify(e)
                        });
                    }
                    r && (0 === r.err_code ? ("hybrid" === e.mode && (e.voiceObj.voiceUrl = this.config.voicePrefix + r.data.voice_name), 
                    e.voiceObj.voiceName = r.data.voice_name, e.voiceObj.success = !0, "function" == typeof t && t(r.data)) : (e.voiceObj.success = !1, 
                    "function" == typeof i && i({
                        errType: "code",
                        errMsg: r.err_code
                    })));
                },
                fail: function(t) {
                    e.voiceObj.success = !1, "function" == typeof i && i({
                        errType: "network",
                        errMsg: t.message || "网络错误"
                    });
                },
                complete: function(e) {
                    "function" == typeof r && r();
                }
            });
        }
    },
    downloadVoice: function(e, t, i, r) {
        "object" === (void 0 === e ? "undefined" : n(e)) && wx.downloadFile({
            url: e.voiceObj.voiceUrl || e.voiceObj.voice_url,
            success: function(n) {
                e.voiceObj.tempPath = n.tempFilePath, "function" == typeof t && t(e.voiceObj);
            },
            fail: function(e) {
                "function" == typeof i && i({
                    errType: "network",
                    errMsg: e.errMsg || "下载失败"
                });
            },
            complete: function(e) {
                "function" == typeof r && r(e);
            }
        });
    },
    fetchNeighborHomeworks: function(e, t, n, i) {
        this.requestGet("user/calendar_title_list", {
            course_calendar_id: parseInt(e)
        }, t, n, i);
    },
    fetchQuestionEvalScore: function(e, t, n, i) {
        this.requestGet("user/question/eval_voice", e, t, n, i);
    },
    fetchSevenUnlockCalendar: function(e, t, n, i, r) {
        this.requestGet("user/unlock/calendar", {
            course_id: parseInt(e),
            sequence_numbers: t
        }, n, i, r);
    },
    setTheme: function(e, t, n, i) {
        this.requestPost("manager/set_theme", e, t, n, i);
    },
    relateCourseToWXGroup: function(e, t, n, i) {
        console.log("relateCourseToWXGroup"), "number" != typeof e.course_id && (e.coruse_id = parseInt(e.course_id)), 
        this.requestPost("manager/set_wxgroup", e, t, n, i);
    },
    setCourseGroup: function(e, t, n, i, r) {
        var s = this;
        this._updateWXSession(function() {
            wx.getShareInfo({
                shareTicket: e,
                complete: function(e) {
                    e.errMsg.split(":").indexOf("ok") <= -1 ? "function" == typeof i && i() : s.relateCourseToWXGroup({
                        course_id: parseInt(t),
                        encryptedData: e.encryptedData,
                        iv: e.iv
                    }, function(e) {
                        "function" == typeof n && n();
                    }, i);
                }
            });
        }, i);
    },
    stickSubmit: function(e, t, n, i, r, s) {
        var o = n ? 2 : 1;
        this.requestPost("manager/course_top", {
            submit_id: parseInt(e),
            course_id: parseInt(t),
            state: o
        }, i, r, s);
    },
    deleteSubmit: function(e, t, n, i) {
        this.requestPost("manager/submit/delete", {
            submit_id: parseInt(e)
        }, t, n, i);
    },
    adminDeleteComment: function(e, t, n, i) {
        this.requestPost("manager/comment/delete", {
            comment_id: parseInt(e)
        }, t, n, i);
    },
    adminDeleteRemark: function(e, t, n, i) {
        this.requestPost("manager/remark/delete", {
            remark_id: parseInt(e)
        }, t, n, i);
    },
    adminRemark: function(e, t, n, i) {
        this.requestPost("manager/remark", e, t, n, i);
    },
    fetchHomeworkList: function(e, t, n, r) {
        var s = i({
            limit: 10,
            offset: 0,
            sort_type: 0
        }, e);
        "number" != typeof s && (s.course_id = parseInt(e.course_id)), this.requestGet("user/course_task", s, t, n, r);
    },
    deleteHomeworkTheme: function(e, t, n, i) {
        this.requestPost("manager/course_task/practice/delete", {
            course_calendar_id: parseInt(e)
        }, t, n, i);
    },
    editHomeworkTheme: function(e, t, n, i) {
        this.requestPost("manager/course_task/practice/edit", e, t, n, i);
    },
    createHomeworkTheme: function(e, t, n, i) {
        this.requestPost("manager/course_task/practice", e, t, n, i);
    },
    stickCourse: function(e, t, n, i, r) {
        this.requestPost("manager/course/set_top", {
            course_id: parseInt(e),
            set: t ? 1 : 0
        }, n, i, r);
    },
    deleteCourse: function(e, t, n, i) {
        this.requestPost("manager/course/delete", {
            course_id: parseInt(e)
        }, t, n, i);
    },
    fetchAdminRemarks: function(e, t, n, i) {
        this.requestGet("manager/my_remarks", e, t, n, i);
    },
    createCalendarCourse: function(e, t, n, i) {
        this.requestPost("manager/course", e, t, n, i);
    },
    modifyCalendarCourse: function(e, t, n, i) {
        this.requestPost("manager/course/edit", e, t, n, i);
    },
    createHomeworkCourse: function(e, t, n, i) {
        this.requestPost("manager/course_task", e, t, n, i);
    },
    modifyHomeworkCourse: function(e, t, n, i) {
        this.requestPost("manager/course_task/edit", e, t, n, i);
    },
    fetchJDKMobile: function(e, t, n) {
        this.requestGet("user/pc_info", {}, e, t, n);
    },
    verifyJDKMobileCode: function(e, t, n, i) {
        this.requestPost("user/pc_verify_code", {
            code: e
        }, t, n, i);
    },
    fetchSubmitRecords: function(e, t, n, i) {
        "number" != typeof e.user_id && (e.user_id = parseInt(e.user_id)), "number" != typeof e.course_id && (e.course_id = parseInt(e.course_id)), 
        this.requestGet("user/submit_list", e, t, n, i);
    },
    managerExportData: function(e, t, n, i) {
        this.requestPost("manager/export/email", e, t, n, i);
    },
    fetchMemberQuota: function(e, t, n) {
        this.requestGet("admin/info", {}, e, t, n);
    },
    fetchManagers: function(e, t, n) {
        this.requestGet("admin/manager_list", {}, e, t, n);
    },
    generateCourseStatistics: function(e, t, n, i, r) {
        this.requestGet("manager/course/share_course_info", {
            scene: t,
            course_id: e
        }, n, i, r);
    },
    sendAssociationInform: function(e, t, n, i, r) {
        this.requestPost("manager/addinformmsg", {
            title: e,
            content: t
        }, n, i, r);
    },
    setCourseInform: function(e, t, n, i) {
        this.requestPost("manager/push_message", e, t, n, i);
    },
    createPayOrder: function(e, t, n, i) {
        var r = this, s = function(e, t, i) {
            "function" == typeof n && n({
                errType: e,
                errMsg: t,
                errText: i || t
            });
        };
        this.requestGet("user/order/create", {
            course_id: parseInt(e)
        }, function(e) {
            r.util.hideToast(), wx.requestPayment({
                timeStamp: e.timeStamp,
                nonceStr: e.nonceStr,
                package: e.package,
                signType: e.signType,
                paySign: e.paySign,
                success: function(n) {
                    "function" == typeof t && t(e.orderNo);
                },
                fail: function(e) {
                    -1 === e.errMsg.indexOf("requestPayment:fail cancel") ? s("wx", "微信支付接口调用失败") : s("cancel", "用户取消支付");
                }
            });
        }, function(e) {
            if (r.util.hideToast(), "code" === e.errType) switch (e.errMsg) {
              case 417:
                s("code", "该课程不是收费课程", e.errText);
                break;

              case 418:
                s("code", "418(" + e.errText + ")", e.errText);
                break;

              case 420:
                s("code", "已支付过该课程", e.errText);
                break;

              case 421:
                s("code", "不在支付时间内", e.errText);
                break;

              default:
                s("code", e.errMsg, e.errText);
            } else s(e.errType, e.errMsg, e.errText);
        }, i);
    },
    checkPayOrder: function(e, t, n, i) {
        this.requestGet("user/order/get", {
            order_no: e
        }, t, n, i);
    },
    submit: function(e, t, n, i) {
        this.requestPost("user/submit", e, t, n, i);
    },
    submitEdit: function(e, t, n, i) {
        var r = function(e, t) {
            "function" == typeof n && n({
                errType: e,
                errMsg: t
            });
        };
        this.requestPost("user/submit/edit", e, t, function(e) {
            406 == e.errMsg ? r("code", "你已打过卡") : 410 == e.errMSg ? r("code", "今天打卡已结束") : r(e.errType, e.errMsg);
        }, i);
    },
    thirdBind: function(e, t, n, i) {
        this.requestPost("user/partner/bind", e, t, n, i);
    },
    thirdUnbind: function(e, t, n) {
        this.requestPost("user/partner/unbind", {}, e, t, n);
    },
    verifyCode: function(e, t, n, i) {
        this.requestGet("user/partner/send/verify_code", e, t, n, i);
    },
    getCodeImg: function(e, t, n) {
        this.requestGet("user/partner/captcha", {}, e, t, n);
    },
    fetchCollectData: function(e, t, n, i) {
        this.requestGet("stats/getInviter", e, t, n, i);
    },
    fetchInvitationImage: function(e, t, n, i) {
        this.requestGet("signday/create_invite", e, t, n, i);
    },
    addInviteePointData: function(e, t, n, i) {
        e.course_id = parseInt(e.course_id) || 0, e.inviter_id = parseInt(e.inviter_id) || 0, 
        e.submit_id = parseInt(e.submit_id) || 0, this.requestPost("stats/addInviteePointData", e, t, n, i);
    },
    collectInviteData: function(e, t, n, i, r) {
        e && this.addInviteePointData({
            course_id: parseInt(t),
            share_type: 2,
            action_type: 1,
            inviter_id: parseInt(e)
        }, n, i, r);
    },
    fetchHandPick: function(e, t, n, i) {
        this.requestGet("user/course_submit_by_top", {
            course_id: e
        }, t, n, i);
    },
    getCertificates: function(e, t, n, i) {
        this.requestGet("user/getUserAchieveList", e, t, n, i);
    },
    joinWXGroup: function(e, t, n, i) {
        console.log("joinwxgroup", e.encryptedData), "number" != typeof e.course_id && (e.course_id = parseInt(e.course_id)), 
        this.requestPost("user/join/wxgroup", e, t, n, i);
    },
    getWrongCourses: function(e, t, n, i) {
        e.aps_user_id = getApp().globalData.loginUser.user_id, this.requestGet("wrong-answer/getWrongCourse", e, t, n, i);
    },
    getWrongCourseCalendars: function(e, t, n, i) {
        e.aps_user_id = getApp().globalData.loginUser.user_id, this.requestGet("wrong-answer/getWrongCalendar", e, t, n, i);
    },
    getWrongQuestionTheme: function(e, t, n) {
        this.requestGet("wrong-answer/getTheme", {
            aps_user_id: getApp().globalData.loginUser.user_id,
            calendar_id: parseInt(e)
        }, t, n);
    },
    getWrongQuestionByCourseId: function(e, t, n) {
        this.requestGet("wrong-answer/getWrongQuestionByCourseId", {
            aps_user_id: getApp().globalData.loginUser.user_id,
            course_id: parseInt(e)
        }, t, n);
    },
    getWrongQuestionUserAnswer: function(e, t, n, i) {
        e.aps_user_id = getApp().globalData.loginUser.user_id, this.requestGet("wrong-answer/getLastWrongAnswer", e, t, n, i);
    },
    submitWrongQuestionAnswer: function(e, t, n, i, r) {
        var s = getApp().globalData.loginUser.user_id;
        this.requestPost("wrong-answer/submitPaperByCourse?aps_user_id=" + s, {
            duration: e,
            course_id: parseInt(t),
            answer_list: n
        }, i, r);
    },
    deleteWrongQuestion: function(e, t, n, i) {
        e.question_ids instanceof Array && (e.question_ids = e.question_ids.join()), e.aps_user_id = getApp().globalData.loginUser.user_id, 
        this.requestGet("wrong-answer/removeWrongAnswerQuestion", e, t, n, i);
    },
    getNoticeConfig: function(e, t, n) {
        var i = {
            aps_user_id: getApp().globalData.loginUser.user_id
        };
        this.requestGet("wrong-answer/getWrongAnswerConfig", i, function(t) {
            var n = {
                week: [],
                time: "",
                state: 0
            };
            null === t.wrongAnswerConfig && (t.wrongAnswerConfig = {}), n.weeks = t.wrongAnswerConfig.week_day_to_remind ? t.wrongAnswerConfig.week_day_to_remind.split(",") : null, 
            n.time = t.wrongAnswerConfig.hour_to_remind, n.state = t.wrongAnswerConfig.open_remind, 
            e(n);
        }, t, n);
    },
    setNoticeConfig: function(e, t, n, i) {
        e.aps_user_id = getApp().globalData.loginUser.user_id, this.requestGet("wrong-answer/setWrongAnswerConfig", e, t, n, i);
    },
    submitCheck: function(e, t, n, i) {
        this.requestGet("user/submit_check", e, t, n, i);
    },
    signIn: function(e, t, n, r) {
        var s = this, o = this.globalData.extAppID;
        this.util.showToast("登录中", "loading", 5e3), wx.login({
            success: function(u) {
                s.requestPost("auth/wxlogin", i({
                    code: u.code,
                    ext_appid: o
                }, e), function(e) {
                    var n = i({}, e, {
                        extAppID: o,
                        ext_appid: o
                    });
                    s.globalData.loginUser = n, s.globalData.apsid = n.apsid, "function" == typeof t && t(n);
                }, n, r);
            },
            fail: function(e) {
                "functions" == typeof n && n({
                    errType: "wx",
                    errText: e.errMsg || "获取微信登录凭证失败"
                });
            },
            complete: function() {
                s.util.hideToast(), "function" == typeof r && r();
            }
        });
    },
    forceUpdateSession: function() {
        var e = this;
        wx.login({
            success: function(t) {
                e.requestGet("auth/jscode2session", {
                    code: t.code,
                    ext_appid: e.globalData.loginUser.extAppID
                });
            }
        });
    },
    managerLoginPC: function(e, t, n, i) {
        this.requestGet("manager/confirmLogin", {
            appUUID: e
        }, t, n, i);
    },
    createCourseInvitation: function(e, t, n, i) {
        this.requestPost("/manager/course/invite", {
            course_id: parseInt(e)
        }, t, n, i);
    },
    useCourseInvitation: function(e, t, n, i) {
        this.requestPost("user/course/invite", {
            invite_code: e
        }, t, n, i);
    },
    nameWXGroup: function(e, t, n, i) {
        this.requestPost("manager/course/wxgroup/set", e, t, n, i);
    },
    getWXGroupName: function(e, t, n, i) {
        var r = this;
        if (getCurrentPages().length > 1) return this.globalData.shareTicket = "", void ("function" == typeof n && n());
        this.requestPost("manager/course/wxgroup/search", e, function(e) {
            r.globalData.shareTicket = "", "function" == typeof t && t(e);
        }, n, i);
    },
    submitCardAnswer: function(e, t, n, i) {
        this.requestPost("user/submit_card", e, t, n, i);
    },
    fetchCardAnswer: function(e, t, n, i) {
        this.requestGet("user/card_answer", {
            submit_id: parseInt(e)
        }, t, n, i);
    },
    fetchSubmitInfo: function(e, t, n, i) {
        this.requestGet("visitor/submit/detail", {
            submit_id: parseInt(e)
        }, t, n, i);
    },
    fetchCourseInfo: function(e, t, n, i) {
        this.requestGet("visitor/course/detail", e, t, n, i);
    },
    fetchCourseInvitation: function(e, t, n, i) {
        this.requestGet("visitor/course/invite", {
            invite_code: e
        }, t, n, i);
    },
    fetchSubmitAround: function(e, t, n, i) {
        this.requestGet("manager/submit/leftrightid", e, t, n, i);
    },
    fetchWeather: function(e, t, n, i) {
        this.requestGet("user/weather", e, t, n, i);
    },
    fetchTaskList: function(e, t, n, i) {
        this.requestGet("user/course/mission", e, t, n, i);
    },
    getCustomForm: function(e, t, n, i) {
        this.requestGet("customform/customFormList", {
            course_id: e
        }, t, n, i);
    },
    submitCustomForm: function(e, t, n, i) {
        this.requestPost("customform/submitCustomFormInfo", e, t, n, i);
    },
    fetchDiscoveryDetail: function(e, t, n, i) {
        this.requestGet("visitor/discover/index", e, t, n, i);
    },
    applyOpen: function(e, t, n, i) {
        this.requestPost("user/register_email", e, t, n, i);
    },
    fetchQuestion: function(e, t, n, i) {
        this.requestGet("user/issue", e, t, n, i);
    },
    fetchQuestionDetail: function(e, t, n, i) {
        this.requestGet("user/issue/detail", e, t, n, i);
    },
    userMobileLogin: function(e, t, n, i) {
        this.requestGet("user/confirmMobileLogin", {
            appUUID: e
        }, t, n, i);
    },
    superAdminLogin: function(e, t, n, i) {
        this.requestGet("user/confirmBecomeAdminLogin", {
            appUUID: e
        }, t, n, i);
    },
    courseNoticeList: function(e, t, n, i) {
        this.requestGet("user/getcoursecalendarinformlist", {
            course_id: parseInt(e.course_id),
            limit: e.limit || 10,
            offset: e.offset || 0
        }, t, n, i);
    },
    changeNoticeAlarm: function(e, t, n, i, r) {
        this.requestPost("user/course/changealarm", {
            course_id: e,
            alarm_state: t
        }, n, i, r);
    },
    generateClassInvitation: function(e, t, n, i) {
        this.requestGet("manager/createClassInvite", e, t, n, i);
    },
    classInvitationDetail: function(e, t, n, i) {
        this.requestGet("user/classInviteDetail", e, t, n, i);
    },
    useClassInvitation: function(e, t, n, i) {
        this.requestGet("user/joinClass", e, t, n, i);
    },
    callSomeone: function(e, t, n, i) {
        this.requestPost("user/call", e, t, n, i);
    },
    fetchCallWinner: function(e, t, n, i) {
        this.requestGet("user/call/verifylist", e, t, n, i);
    },
    fetchCallDetail: function(e, t, n, i) {
        this.requestGet("user/activityinfo", e, t, n, i);
    },
    fetchActivityPoster: function(e, t, n, i) {
        this.requestGet("signday/courseActivityCard", e, t, n, i);
    },
    fetchLeftCount: function(e, t, n, i) {
        this.requestGet("user/getcalendarevelist", e, t, n, i);
    },
    _userLogin: function(e, t, n, i) {
        this.globalData.loginUser.apsid ? "function" == typeof n && n() : this._wxLogin(e, t, function() {
            "function" == typeof n && n();
        }, i);
    },
    _uploadSingleFile: function(e, t, n, i, r) {
        var s = this;
        this._fetchOssToken(e, function(o) {
            var u = s.globalData;
            if (u.uploadingTaskArray.length < 10) {
                var a = o.dir + t.replace("wxfile://", "").replace("http://", "").replace("=", ""), c = {
                    uploadTask: wx.uploadFile({
                        url: o.host,
                        filePath: t,
                        name: "file",
                        header: {
                            "content-type": "application/json",
                            apsid: u.apsid
                        },
                        formData: {
                            key: a,
                            policy: o.policy,
                            OSSAccessKeyId: o.accessid,
                            signature: o.signature,
                            success_action_status: "200"
                        },
                        success: function(e) {
                            200 == e.statusCode ? (a.indexOf("backend_pic/dst/poster/") >= 0 ? a = a.replace("backend_pic/dst/poster/", "") : a.indexOf("backend_voice/") >= 0 ? a = a.replace("backend_voice/", "") : a.indexOf("video/") >= 0 && (a = a.replace("video/", "")), 
                            "function" == typeof n && n(a)) : "function" == typeof i && i({
                                errType: "fail",
                                errMsg: e.errMsg
                            });
                        },
                        fail: function(e) {
                            "function" == typeof i && i({
                                errType: "net",
                                errMsg: e.message || "网络错误"
                            });
                        },
                        complete: function(e) {
                            var o = u.uploadingTaskArray, a = u.preparingUploadArray, c = !1;
                            if (o.map(function(e, n) {
                                e.filePath === t && o.splice(n, 1);
                            }), o.length < 10 && a.length > 0) {
                                var f = a.shift();
                                s._uploadSingleFile(f.fileType, f.file, n, i, r);
                            }
                            0 === u.uploadingTaskArray.length && 0 === u.preparingUploadArray.length && (c = !0), 
                            e.uploadingComplete = c, "function" == typeof r && r(e);
                        }
                    }),
                    filePath: t
                };
                return u.uploadingTaskArray.push(c), c;
            }
            u.preparingUploadArray.push({
                fileType: e,
                file: t
            });
        }, function(e) {
            "function" == typeof i && i({
                errType: "fail",
                errMsg: e.errMsg
            });
        });
    },
    _fetchOssToken: function(e, t, n, i) {
        this.request({
            urlName: "picture/get_oss_token",
            method: "GET"
        }, {
            type: e
        }, function(e) {
            "function" == typeof t && t(e.data);
        }, function(e) {
            "function" == typeof n && n({
                errType: "network",
                errMsg: e.message || "网络错误"
            });
        }, function(e) {
            "function" == typeof i && i(e);
        });
    },
    _uploadFiles: function(e, t, n, i) {
        var r = this, s = null, o = new Array(), u = new Array(), a = new Array();
        r.util.log(e);
        for (var c = 0; c < e.length; c++) !function(t) {
            e[t].indexOf("dakavideos") >= 0 || e[t].indexOf("aliyuncs") >= 0 || e[t].indexOf("/video/") >= 0 ? u.push(e[t]) : r._uploadSingleFile("video", e[t], function(e) {
                o.push(e);
            }, function(n) {
                a.push(e[t]);
            });
        }(c);
        s = setInterval(function() {
            if (a.length + o.length + u.length == e.length) return clearInterval(s), a.length > 0 ? "function" == typeof fn && fn({
                serverError: a,
                code: -1
            }) : "function" == typeof fn && fn({
                serverPaths: o,
                code: 0
            });
        }, 300);
    },
    _wxLogin: function(e, t, n, r) {
        var s = this, o = this, u = function(n) {
            if (s.util.hideToast(), [ "/pages/user/detail/detail", "/pages/user/home/home", "/pages/user/unlock/unlock", "/pages/user_homework/home/home", "/pages/admin/home/home", "/pages/admin_homework/home/home", "/pages/admin/unlock/unlock", "/pages/admin/detail/detail", "/pages/user/course_overview/course_overview" ].indexOf(e.split("?")[0]) > -1) "function" == typeof r && r(); else {
                var i = function() {
                    "string" == typeof e && -1 === e.indexOf("account_login") && wx.redirectTo({
                        url: "/pages/user/account_login/account_login?fromURL=" + encodeURIComponent(e) + "&pageType=" + t
                    });
                };
                "尚未授权" !== n ? wx.showModal({
                    title: "错误",
                    content: n || "登录失败",
                    showCancel: !1,
                    confirmText: "重新登录",
                    complete: function(e) {
                        i();
                    }
                }) : i();
            }
        }, a = function(e) {
            e.isAuditing = 0 === e.audit_state && 0 === s.util.compareVersion(s.config.version, e.audit_version), 
            s.globalData.loginUser = e, s.globalData.apsid = e.apsid, console.log("after login:", JSON.stringify(e)), 
            wx.setStorageSync("userProfile", {
                apsid: e.apsid
            }), wx.setStorageSync("userInfo", e), s.util.hideToast(), "function" == typeof n && n();
        };
        this.util.showToast("登录中...", "loading"), this.util.hasAuthorized("scope.userInfo", function() {
            wx.login({
                success: function(e) {
                    var t = e.code;
                    wx.getUserInfo({
                        withCredentials: !0,
                        lang: "zh_CN",
                        success: function(e) {
                            var n = i({}, e, {
                                code: t,
                                ext_appid: o.globalData.extAppID
                            });
                            o.requestPost("auth/wxlogin?v=" + new Date().getTime(), n, function(e) {
                                o.globalData.auditing = 0 === e.audit_state && o.config.version === e.audit_version, 
                                a(i({}, e, {
                                    extAppID: n.ext_appid
                                }));
                            }, function(e) {
                                u("保存用户信息失败：" + e.errMsg);
                            });
                        },
                        fail: function(e) {
                            u("登录失败：你拒绝了授权");
                        }
                    });
                },
                fail: function(e) {
                    u("获取微信登录凭证失败：" + e.errMsg);
                }
            });
        }, function() {
            u("尚未授权");
        });
    },
    _getPairURL: function(e, t) {
        var n = e && e.split("?")[1] || "", i = "user" === t, r = i ? "/pages/user/my/my" : "/pages/admin/operation/operation";
        if (i) {
            if (-1 != e.indexOf("home/home")) return e.replace(/admin/, "user");
            if (-1 != e.indexOf("detail/detail")) return e.replace(/admin/, "user");
            if (-1 != e.indexOf("unlock/unlock")) return e.replace(/admin/, "user");
            if (-1 != e.indexOf("homework_list/homework_list")) return e.replace(/admin/, "user");
        } else {
            if (-1 != e.indexOf("home/home")) return e.replace(/user/, "admin");
            if (-1 != e.indexOf("detail/detail")) return e.replace(/user/, "admin");
            if (-1 != e.indexOf("unlock/unlock")) return e.replace(/user/, "admin");
            if (-1 != e.indexOf("homework_list/homework_list")) return e.replace(/user/, "admin");
        }
        return n ? r + "?" + n : r;
    },
    _updateWXSession: function(e, t) {
        var n = this, i = this.globalData.loginUser.extAppID;
        wx.login({
            success: function(r) {
                n.requestGet("auth/jscode2session", {
                    code: r.code,
                    ext_appid: i
                }, e, t);
            },
            fail: function(e) {
                "function" == typeof t && t({
                    errType: "wx",
                    errMsg: e.errMsg
                });
            }
        });
    },
    getShareInfo: function(e, t, n) {
        var i = this.globalData, r = i.shareTicket, s = i.shareInfoMap;
        r ? s[r] ? "function" == typeof e && e(s[r]) : this._updateWXSession(function() {
            wx.getShareInfo({
                shareTicket: r,
                complete: function(n) {
                    n.errMsg.split(":").indexOf("ok") <= -1 ? "function" == typeof t && t() : (s[r] = n, 
                    "function" == typeof e && e(s[r]));
                }
            });
        }, function(e) {
            "function" == typeof t && t();
        }) : "function" == typeof t && t();
    }
};