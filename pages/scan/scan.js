// pages/scan/scan.js
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
        if (res.tapIndex === 1) {
          wx.navigateTo({
            url: '/pages/camera/camera'
          })
        } else if (res.tapIndex === 0) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
              // tempFilePath可以作为src的属性值显示图片
              this.setData({
                tempImgPath: res.tempFilePaths
              })
              console.log(this.data.tempImgPath)
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