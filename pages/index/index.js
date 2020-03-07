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

  onLoad: function() {
      setTimeout(() => {
        // 获取全局请求的数据
        this.setData({
          contactList: app.globalData.contactList
        });
      }, 200);

    // 本地测试接口
    // wx.request({
    //   url: 'http://127.0.0.1:80/test_data.json',
    //   method: 'GET',
    //   success: (res) => {
    //     this.setData({
    //       contactList: res.data.message
    //     });
    //   }
    // })
  },

  onShow: function() {
    
  }
})
