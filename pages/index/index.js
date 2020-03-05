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
  },

  onLoad: function() {
    // wx.request({
    //   url: 'https://3g.163.com/touch/reconstruct/article/list/BBM54PGAwangning/0-20.html',
    //   method: 'GET',
    //   success: (res) => {
    //     let data = res.data + 'hahihuheho';
    //     data = data.replace('artiList(', '').replace(')hahihuheho', '');
    //     this.setData({
    //       contactList: JSON.parse(data).BBM54PGAwangning
    //     });
    //     console.log(this.contactList);
    //   }
    // })
    wx.request({
      url: 'http://127.0.0.1:80/test_data.json',
      method: 'GET',
      success: (res) => {
        this.setData({
          contactList: res.data.message
        });
      }
    })
  }
})
