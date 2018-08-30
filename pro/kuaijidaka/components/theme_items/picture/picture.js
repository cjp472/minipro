Component({
    properties: {
        pictureUrl: {
            type: String,
            value: ""
        },
        pictureMaxWidth: {
            type: Number,
            value: 630
        },
        editedWidth: {
            type: String,
            value: ""
        },
        editedHeight: {
            type: String,
            value: ""
        },
        applyType: {
            type: String,
            value: ""
        },
        editImg: {
            type: Boolean,
            value: !1
        },
        imgAlign: {
            type: String,
            value: "center"
        },
        readIndex: {
            type: Number,
            value: NaN
        },
        ifCut: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    ready: function() {},
    methods: {
        previewImage: function(e) {
            this.triggerEvent("previewImage", {
                src: e.target.dataset.src,
                index: this.data.readIndex
            });
        }
    }
});