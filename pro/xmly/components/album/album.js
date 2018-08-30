var a = require("../../utils/util");

Component({
    properties: {
        album: {
            type: Object,
            value: {}
        },
        category_name: {
            type: String,
            value: ""
        },
        ispaid: {
            type: String,
            value: ""
        },
        noBorderBottom: {
            type: Boolean,
            value: !1
        },
        hasTotalCount: {
            type: Boolean,
            value: !1
        },
        vertical: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    attached: function() {},
    methods: {
        toAlbumDetail: function(t) {
            var e = t.currentTarget.dataset, l = e.albumId, u = e.ispaid;
            e.isAssistant;
            1 != u ? (0, a.jumpTo)({
                url: "../albumDetail/albumDetail?albumId=" + l
            }) : (0, a.jumpTo)({
                url: "../paidPackage/pages/albumDetailPaid/albumDetailPaid?albumId=" + l + "&ispaid=1"
            });
        }
    }
});