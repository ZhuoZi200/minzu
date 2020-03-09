// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleGetUserInfo: function(e) {
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];  // 获取上一个页面的实例，以便更改其授权数据
    wx.setStorageSync('userInfo', e.detail.userInfo);  // 将用户信息存入缓存中
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    });
    prevPage.setData({
      userInfo: this.data.userInfo
    });
    wx.navigateBack({
      delta: 1
    });
  }
})