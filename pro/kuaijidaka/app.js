var e = require("./libs/config.js"), a = require("./libs/util.js"), t = require("./libs/mixins.js"), i = require("./libs/service.js");

App({
    service: i,
    util: a,
    config: e,
    mixins: t,
    onLaunch: function(e) {
        this.service.config = this.config, this.service.util = this.util, this.service.globalData = this.globalData, 
        this.util.config = this.config, this.util.globalData = this.globalData, this.service.checkLocalPunch({
            action: "remove"
        }, "fn", "answerData"), this.service.checkLocalPunch({
            action: "remove"
        }, "fn"), this.util.storage("remove", "handwriting");
        var a = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
        this.globalData.extConfig = a, this.globalData.extAppID = a.extAppid || "", this.globalData.SDKVersion = "0.0.0";
        try {
            this.globalData.SDKVersion = wx.getSystemInfoSync().SDKVersion;
        } catch (e) {
            console.log(e);
        }
    },
    onShow: function(e) {
        e && 1044 == e.scene ? (this.globalData.shareTicket = e.shareTicket, console.log("shareTicket:", e.shareTicket)) : this.globalData.shareTicket = "", 
        this.globalData.recordManagerPause && (this.globalData.recorderManager.resume(), 
        this.globalData.recordManagerPause = !1);
    },
    onHide: function() {
        console.log("on app hide");
    },
    onError: function(e) {
        console.log("app error: " + JSON.stringify(e));
    },
    globalData: {
        tag_list_js: {
            activity_lists: [],
            custom_tag_list: [],
            tag_list: [],
            member_list: []
        },
        calendar_data: {
            courseId: "",
            course_name: "",
            record_at: "",
            day: "",
            week: ""
        },
        homework_list_data: {
            courseId: "",
            course_calendar_id: ""
        },
        comment_data: {
            comment_id: "",
            clickType: "",
            index: "",
            content: "",
            score: ""
        },
        detail_priase: {
            _type: "",
            flag: "",
            idx: ""
        },
        comments_data: {},
        msg_data: {
            navback: ""
        },
        modify_data: {
            user_name: ""
        },
        shareTicket: "",
        shareInfoMap: {},
        hasSuggestedUpdate: 0,
        recordUser: "",
        apsid: "",
        extAppID: "",
        loginUser: {},
        navback: {
            page: "",
            data: ""
        },
        unlock_data: {
            courseId: "",
            courseNum: 1,
            courseTotal: 1
        },
        audioCtxs: [],
        videoCtx: "",
        link_website: "",
        extConfig: {},
        uploadingTaskArray: [],
        preparingUploadArray: [],
        uploadImageSizeMax: 8,
        uploadVideoSizeMax: 200,
        isRecording: !1,
        recorderManager: "",
        onshowData: {},
        justPunched: !1,
        permissionPassed: !1,
        wrongQuestion: {},
        unexpectedRecordStop: !1,
        weatherResult: null,
        currentIndex: "my",
        readingOptions: {
            text: "",
            url: ""
        },
        alreadyReadTopicList: [],
        recordManagerPause: !1,
        auditing: !1,
        collection: null
    }
});