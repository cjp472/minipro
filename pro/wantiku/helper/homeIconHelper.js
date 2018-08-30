var e = getApp(), n = {
    initIconDataList: function(n) {
        console.log(n);
        for (var a in n) {
            var i = n[a];
            switch (i.HasLogin = !0, 18 != i.ExamType && 17 != i.ExamType && 9 != i.ExamType || (i.HasLogin = e.globalData.userData.HasLogin), 
            i.ExamType) {
              case 3:
                i.ExamIconUrlWx = "/images/newIndex/home_icon_zhinenglianxi@2x.png";
                break;

              case 2:
                i.ExamIconUrlWx = "/images/newIndex/home_icon_zhangjielianxi@2x.png";
                break;

              case 0:
                i.ExamIconUrlWx = "/images/newIndex/home_icon_zhentilianxi@2x.png";
                break;

              case 10:
                i.ExamIconUrlWx = "/images/newIndex/home_icon_gonggumokao@2x.png";
                break;

              case 9:
                i.ExamIconUrlWx = "/images/newIndex/home_icon_cuoti@2x.png";
                break;

              case 17:
                i.ExamIconUrlWx = "/images/newIndex/home_icon_shoucang@2x.png";
                break;

              case 18:
                i.ExamIconUrlWx = "/images/newIndex/home_icon_lianxilishi@2x.png";
                break;

              case 7:
                i.ExamIconUrlWx = "/images/newIndex/icon_yuehoujifen.gif";
                break;

              case 16:
                i.ExamIconUrlWx = "/images/newIndex/icon_3taojuan.gif";
                break;

              case 12:
                i.ExamIconUrlWx = "/images/newIndex/icon_mijuan.gif";
                break;

              case 8:
                i.ExamIconUrlWx = "/images/newIndex/home_icon_hight@2x.png";
                break;

              case 6:
                i.ExamIconUrlWx = "/images/newIndex/icon_jiaocaijiaqiang@2x.png";
                break;

              case 20:
                i.ExamIconUrlWx = "/images/newIndex/home_icon_mokao.gif";
            }
        }
        return n;
    }
};

module.exports = n;