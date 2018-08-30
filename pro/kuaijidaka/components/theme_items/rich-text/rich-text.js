var t = getApp(), e = (t.service, t.util);

Component({
    properties: {
        richTextContent: {
            type: String,
            value: ""
        },
        applyType: {
            type: String,
            value: ""
        }
    },
    data: {
        copyContent: "",
        copyState: !1,
        isLargeCopyData: !1
    },
    ready: function() {},
    methods: {
        showActionSheet: function(t) {
            var e = this;
            wx.showActionSheet({
                itemList: [ "复制文本" ],
                success: function(t) {
                    switch (t.tapIndex) {
                      case 0:
                        e.showCopyBox();
                    }
                }
            });
        },
        showCopyBox: function() {
            var t = this.data.richTextContent;
            [ /<(\S*?)[^>]*>.*?|<.*? >/g, /&quot/g, /&amp/g, /&lt/g, /&gt/g, /&nbsp/g, /&iexcl/g, /&cent/g, /&pound/g, /&copy/g ].forEach(function(e) {
                t = t.replace(e, "");
            }), e.setDataImproved(this, {
                copyContent: t,
                isLargecopyData: t.length > 100,
                copyState: !0
            });
        },
        modalConfirm: function() {
            wx.setClipboardData({
                data: this.data.copyContent,
                success: function() {
                    wx.showToast({
                        title: "已复制"
                    });
                }
            }), e.setDataImproved(this, {
                copyState: !1
            });
        },
        modalCancel: function() {
            e.setDataImproved(this, {
                copyState: !1,
                copyContent: ""
            });
        }
    }
});