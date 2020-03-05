//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    contactList: [],
    
    imgUrls: [
      '/images/minzu1.jpg',
      '/images/minzu2.jpg',
      '/images/minzu3.jpg'
    ]
  },

  //点击切换隐藏和显示
  toggleBtn: function (event) {
    var that = this;
    var toggleBtnVal = that.data.uhide;
    var itemId = event.currentTarget.id;
    if (toggleBtnVal == itemId) {
      that.setData({
        uhide: 0
      })
    } else {
      that.setData({
        uhide: itemId
      })
    }
  }
})
