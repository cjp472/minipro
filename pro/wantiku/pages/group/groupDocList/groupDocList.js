function o(o, e, t) {
    return e in o ? Object.defineProperty(o, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[e] = t, o;
}

var e, t = require("../../../biz/groupBuy.js"), a = require("../../../config.js"), i = getApp();

Page((e = {
    data: {
        theme: a.UIConfig.Theme,
        showHId: !1,
        storagepdfArr: "",
        ifData: !0,
        savedFilePathObj: {},
        DocumentUrl: "",
        GoodsId: "",
        progress: 0,
        sumSize: 0,
        HasGroupon: !1,
        grouponId: 0,
        GoodsList: [],
        PageIndex: 1,
        TotalSum: 0,
        unit: "KB",
        locationSizeCach: 0,
        delSizeTotal: 8,
        isdelSize: !1,
        IOS: i.globalData.SystemInfo.iOS
    },
    onLoad: function(o) {
        this.initLocationFileSize(), wx.showLoading({
            title: "正在加载"
        }), this.refreshUserGoodsData(this.data.PageIndex, !1);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onedetileData: function(o) {
        var e = this;
        wx.getStorage({
            key: "fileUrlStorage",
            success: function(o) {
                e.setData({
                    savedFilePathObj: o.data
                });
            }
        });
        var t = o.currentTarget.dataset.item, a = t.GoodsId, i = t.DocumentUrl, n = this.data.savedFilePathObj;
        n[a] ? wx.openDocument({
            filePath: n[a],
            success: function() {},
            fail: function() {
                e.downLoadFile({
                    GoodsId: a,
                    DocumentUrl: i
                });
            }
        }) : e.downLoadFile({
            GoodsId: a,
            DocumentUrl: i
        });
    },
    formSubmit: function(o) {
        console.log(o);
        var e = o.detail.formId, t = this.data.grouponId;
        console.log(t), wx.navigateTo({
            url: "../groupBuy/groupBuy?formId=" + e + "&grouponid=" + t
        });
    },
    downLoadFile: function(o) {
        var e = this, t = o.GoodsId, a = o.DocumentUrl;
        this.data.isdelSize = !0;
        var i = this;
        this.setData({
            progress: 0,
            sumSize: 0,
            showHId: !0
        }), wx.downloadFile({
            url: a,
            success: function(o) {
                wx.saveFile({
                    tempFilePath: o.tempFilePath,
                    success: function(o) {
                        wx.openDocument({
                            filePath: o.savedFilePath,
                            success: function() {
                                i.setData({
                                    showHId: !1
                                });
                                var e = i.data.savedFilePathObj;
                                e[t] = o.savedFilePath, wx.setStorage({
                                    key: "fileUrlStorage",
                                    data: e
                                }), i.setData({
                                    savedFilePathObj: e
                                });
                            },
                            fail: function() {
                                wx.showModal({
                                    title: "提示",
                                    showCancel: !1,
                                    content: "文件打开失败，请重试！",
                                    success: function(o) {}
                                });
                            }
                        });
                    }
                });
            }
        }).onProgressUpdate(function(o) {
            var t = o.totalBytesExpectedToWrite, a = Math.floor(t / 1024);
            if (e.data.isdelSize && (e.data.isdelSize = !1, e.data.locationSizeCach = e.data.locationSizeCach + t, 
            console.log("----- this.data.locationSizeCach------"), console.log(e.data.locationSizeCach), 
            e.isDelLocationFile() && e.clearAllLoacation()), a >= 1024) {
                a = (a / 1024).toFixed(1);
                i.setData({
                    unit: "M",
                    sumSize: a
                });
            } else i.setData({
                unit: "KB"
            });
            i.setData({
                progress: o.progress,
                sumSize: a
            });
        });
    }
}, o(e, "onPullDownRefresh", function(o) {
    wx.showNavigationBarLoading(), console.log(o), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
}), o(e, "onReachBottom", function() {
    this.data.GoodsList.length < this.data.TotalSum && (console.log("onReachBottom-refresh"), 
    this.refreshUserGoodsData(this.data.PageIndex + 1, !0));
}), o(e, "refreshUserGoodsData", function(o, e) {
    var a = this;
    t.getUserGoods(o, function(o) {
        var t = o.GoodsList, i = o.Pager.PageIndex, n = o.Pager.TotalSum;
        e && (t = a.data.GoodsList.concat(t)), 0 == t.length ? (a.groupBuyState(), a.setData({
            ifData: !1
        })) : a.setData({
            ifData: !0
        });
        var s = !0;
        t.length < n && (s = !1), a.setData({
            isLoadMore: s
        }), console.log(t), a.setData({
            GoodsList: t,
            PageIndex: i,
            TotalSum: n
        });
    }), wx.hideLoading();
}), o(e, "groupBuyState", function() {
    var o = this;
    t.getGroupon(function(e) {
        console.log(e);
        var t = e.HasGroupon, a = e.Groupon.Id;
        o.setData({
            HasGroupon: t,
            grouponId: a
        });
    });
}), o(e, "isDelLocationFile", function() {
    var o = this.data.locationSizeCach / 1024 / 1024;
    return console.log("allsieToM:" + o), o > this.data.delSizeTotal;
}), o(e, "clearAllLoacation", function() {
    var o = this;
    wx.getSavedFileList({
        success: function(e) {
            o.delLoacationFile(e.fileList);
        }
    }), this.delStorageInfoFile();
}), o(e, "initLocationFileSize", function() {
    var o = this, e = 0;
    wx.getSavedFileList({
        success: function(t) {
            for (var a = 0; a < t.fileList.length; a++) {
                var i = t.fileList[a].size;
                e += i;
            }
            o.data.locationSizeCach = e, console.log(t.fileList);
        }
    });
}), o(e, "delLoacationFile", function(o) {
    var e = this;
    console.log(o);
    for (var t = 0; t < o.length; t++) {
        var a = o[t];
        console.log("success 成功 ： " + a.size + " :: j = " + t), e.data.locationSizeCach = e.data.locationSizeCach - a.size, 
        wx.removeSavedFile({
            filePath: a.filePath,
            success: function(o) {},
            complete: function(o) {}
        });
    }
}), o(e, "delStorageInfoFile", function() {
    var o = this;
    wx.getStorageInfo({
        success: function(e) {
            wx.removeStorage({
                key: "fileUrlStorage",
                success: function(e) {
                    o.data.savedFilePathObj = {};
                }
            });
        }
    });
}), e));