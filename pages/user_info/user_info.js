// pages/user_info/user_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    btnName: '更改',
    isInput: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  changeName: function() {
    this.setData({
      btnName: this.data.isInput ? '更改' : '确定',
      isInput: !this.data.isInput
    });
  },

  listenInput: function(e) {
    console.log(e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  }
})