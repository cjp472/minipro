var a = require("../../utils/util");

Component({
    properties: {
        album: {
            type: Object,
            value: {}
        }
    },
    data: {
        albumCoverDefault: "//s1.xmcdn.com/css/img/common/default/user100.jpg"
    },
    attached: function() {},
    methods: {
        toAlbumDetail: function(e) {
            var t = e.currentTarget.dataset.albumId;
            (0, a.jumpTo)({
                url: "/pages/paidPackage/pages/albumDetailPaid/albumDetailPaid?albumId=" + t + "&ispaid=1"
            });
        }
    }
});