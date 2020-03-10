// pages/scan/scan.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempImgPath: '',
    result: '',
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showActionSheet({
      itemList: ['从手机相册选择', '拍照'],
      success: (res) => {
        console.log(res.tapIndex)
        // 用户选择了拍照识别
        if (res.tapIndex === 1) {
          wx.navigateTo({
            url: '/pages/camera/camera'
          })
        } 
        // 用户选择了相册识别
        else if (res.tapIndex === 0) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
              // tempFilePath可以作为src的属性值显示图片
              this.setData({
                tempImgPath: res.tempFilePaths[0],
                isShow: true
              });

              // 将图片编码为base64字符串
              wx.getFileSystemManager().readFile({
                filePath: this.data.tempImgPath,
                encoding: 'base64',
                success: (res) => {
                  console.log("图片转码结果是：");
                  console.log(res);
                  wx.request({
                    url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/logo',
                    data: {
                      access_token: wx.getStorageSync('accessToken').data.access_token,
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
                      // 识别结果健壮性
                      if (res.data.result.length === 0 || res.data.result[0].probability <= 0.5) {
                        this.setData({
                          tempImgPath: '/images/scan_fail.jpg',
                          result: 'logo识别失败~'
                        })
                      } else {
                        this.setData({
                          result: res.data.result[0].name
                        })
                      }
                      // 跳转至识别结果页需要传递两个参数：1.图片临时路径  2.识别结果数据
                      wx.navigateTo({
                        url: `/pages/scan_res/scan_res?path=${this.data.tempImgPath}&result=${this.data.result}`
                      })
                    }
                  })
                }
              })
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})