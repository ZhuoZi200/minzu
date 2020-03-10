// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },

  logout: () => {
    wx.showModal({
      content: '确定要退出登录吗',
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        if(res.confirm) {
          wx.getSetting({
            success(res) {
              // res.authSetting['scope.userInfo'] = false;
              try {
                wx.removeStorageSync('userInfo');
                const pages = getCurrentPages();
                const prevPage = pages[pages.length - 2];
                prevPage.setData({
                  userInfo: wx.getStorageSync('userInfo')
                });
                wx.navigateBack({
                  delta: 2
                })
              } catch (e) {
                // Do something when catch error
              }
            }
          })
        } else if(res.cancel) {

        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})