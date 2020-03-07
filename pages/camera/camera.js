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
        this.setData({
          tempImgPath: res.tempImagePath
        });

        wx.getFileSystemManager().readFile({
          filePath: this.data.tempImgPath,
          encoding: 'base64',
          success: (res) => {
            console.log("请求到的access_token是：" + wx.getStorageSync('accessToken'));
            wx.request({
              url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/logo',
              data: {
                access_token: wx.getStorageSync('accessToken'),
                image: res.data,
                baike_num: 1
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: (res) => {
                console.log("扫描结果是")
                console.log(res.data)
                var result = res.data.result[0].name;
                // 跳转至识别结果页需要传递两个参数：1.图片临时路径  2.识别结果数据
                wx.navigateTo({
                  url: `/pages/scan_res/scan_res?path=${this.data.tempImgPath}&result=${result}`
                })
              }
            })
          }
        })
      }
    });
  }
})