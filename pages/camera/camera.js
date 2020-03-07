// pages/camera/camera.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempImgPath: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  takePhotos: function() {
    wx.createCameraContext().takePhoto({
      quality: 'high',
      success: (res) => {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];  // 获取上一个页面实例
        prevPage.setData({
          tempImgPath: res.tempImagePath  // 将照片的临时路径存放在上一个页面的data中
        });
        this.setData({
          tempImgPath: res.tempImagePath  // 将照片的临时路径存放在上一个页面的data中
        });
        // console.log(res.tempImagePath)
        // console.log("转base64之后")
        // console.log(wx.arrayBufferToBase64(res.tempImagePathr))
        wx.navigateBack({
          delta: 1
        });
        // 将图像临时路径作为方法参数，识别图像
        app.scanImg(this.data.tempImgPath);
      }
    });
  }
})