// pages/user_info/user_info.js
const app = getApp();
const userInfo = wx.getStorageSync('userInfo');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnName: '更改',
    isInput: false,
    nickName: '',
    genders: [
      { label: '男', value: 1, checked: true },
      { label: '女', value: 2, checked: false }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow: function() {
    const genders = this.data.genders;
    // 使用缓存初始化表单数据
    if(userInfo.gender == 1) {
      genders[0].checked = true;
      genders[1].checked = false;
      console.log(genders)
    } else if (userInfo.gender == 2) {
      genders[0].checked = false;
      genders[1].checked = true;
      console.log(genders)
    }
    // 渲染表单数据
    this.setData({
      nickName: userInfo.nickName,
      genders
    })
  },

  changeName() {
    // 根据用户操作修改按钮状态以及文本框可编辑状态
    this.setData({
      btnName: this.data.isInput ? '更改' : '确定',
      isInput: !this.data.isInput
    });
    // 判断昵称输入框是否为可编辑状态（其实是判断按钮状态）
    if(!this.data.isInput) {
      userInfo.nickName = this.data.nickName;
      wx.setStorageSync('userInfo', userInfo);
    }
  },

  // 性别单选框被修改
  radioChange(e) {
    console.log(e.detail.value)
    userInfo.gender = e.detail.value;
    wx.setStorageSync('userInfo', userInfo);
  },

  listenInput(e) {
    // 监听输入框的内容，实现双向数据绑定
    this.setData({
      nickName: e.detail.value
    })
  }
})