//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 缓存判断
    const cacheData = wx.getStorageSync('newsData');
    if(!cacheData) {
      console.log("缓存数据为空，需要重新发送请求");
      this.getNetData();
    } else {
      // 已存在缓存数据，无需重复发送请求，但需判断缓存是否过期
      if (Date.now() - wx.getStorageSync('newsData').time > 1000*15) {
        console.log("缓存已过期，需重新请求");
        this.getNetData();
      } else {
        console.log("缓存未过期，可直接使用缓存");
        this.globalData.contactList = wx.getStorageSync('newsData').data;
      }
    }
    console.log(wx.getStorageSync('newsData'));
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })  
  },
  // 网络接口测试
  getNetData() {
    wx.request({
      url: 'https://3g.163.com/touch/reconstruct/article/list/BBM54PGAwangning/0-20.html',
      method: 'GET',
      success: (res) => {
        let data = res.data + 'hahihuheho';
        data = data.replace('artiList(', '').replace(')hahihuheho', '');
        // 将请求到的数据赋值给全局变量
        this.globalData.contactList = JSON.parse(data).BBM54PGAwangning;
        wx.setStorageSync('newsData', { time: Date.now(), data: this.globalData.contactList });
      }
    })
  },
  globalData: {
    userInfo: null,
    contactList: null
  }
})