Component({
    properties: {
        voice: {
            type: Object,
            value: {}
        },
        text: {
            type: String,
            value: ""
        },
        notes: {
            type: String,
            value: ""
        },
        applyType: {
            type: String,
            value: ""
        }
    },
    data: {
        loginStatus: "user"
    },
    ready: function() {
        this.setData({
            loginStatus: 1 === getApp().globalData.loginUser.user_type_login ? "user" : "admin"
        });
    },
    methods: {}
});