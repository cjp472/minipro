module.exports = {
    setWXGroupAndName: function(e, t, o) {
        var i = e.service, n = e.util, a = e.globalData.shareTicket;
        i.getShareInfo(function(e) {
            i.getWXGroupName({
                course_id: o.course_id,
                encryptedData: e.encryptedData,
                iv: e.iv
            }, function(e) {
                3 !== o.permit_type || e.is_set_wxgroup ? e.wxname || (t.customData.open_gid = e.open_gid, 
                n.setDataImproved(t, {
                    namingInputVisible: !0,
                    namingModal: {
                        title: "群命名",
                        tips: "检测到你从微信群进入课程，可对该群进行命名。群名将会出现在PC管理后台-学员管理页面。命名后，可识别学员从哪个群进入。",
                        placeholder: "请输入12个字符以内的群名"
                    }
                })) : i.setCourseGroup(a, o.course_id, function() {
                    e.wxname ? n.showToast("成功设置群关联", "success", 2e3) : (t.customData.open_gid = e.open_gid, 
                    n.setDataImproved(t, {
                        namingInputVisible: !0,
                        namingModal: {
                            title: "成功设置群关联",
                            tips: "已将该群设为课程群。学员首次学习需点击群里链接。为了方便管理，请命名该群",
                            placeholder: "请输入12个字符以内的群名"
                        }
                    }));
                }, function(e) {
                    i.forceUpdateSession(), wx.showModal({
                        title: "失败",
                        content: "设置微信群课程失败，请重新分享",
                        showCancel: !1,
                        confirmText: "我知道了"
                    });
                });
            });
        });
    }
};