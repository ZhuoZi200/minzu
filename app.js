//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 新闻缓存判断
    const cacheData = wx.getStorageSync('newsData');
    if(!cacheData) {
      console.log("缓存数据为空，需要重新发送请求");
      this.getNetData();
    } else {
      // 已存在缓存数据，无需重复发送请求，但需判断缓存是否过期
      if (Date.now() - cacheData.time > 1000*120) {  // 过期时间定为2分钟
        console.log("缓存已过期，需重新请求");
        this.getNetData();
      } else {
        console.log("缓存未过期，可直接使用缓存");
        this.globalData.contactList = wx.getStorageSync('newsData').data;
      }
    }
    console.log(wx.getStorageSync('newsData'));
    
    // 百度access_token缓存判断
    const accessToken = wx.getStorageSync('accessToken');
    if (!accessToken) {
      console.log("accessToken不存在缓存，需要获取");
      this.getAccessToken();
    } else if (Date.now() - accessToken.time > 1000*accessToken.data.expires_in) {
      console.log("accessToken已过期，过期累计时间" + (Date.now() - accessToken.time) + "，需要重新获取");
      this.getAccessToken();
    }
    
    // 获取用户code并向服务器换取openid（主要）, sessionKey, unionId
    wx.login({
      success: res => {
        console.log("获取到的code为：")
        console.log(res)
        wx.request({
          url: 'http://106.52.192.123/get_openid.php',
          data: {
            code: res.code
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log("获取成功")
            console.log(res)
          },
          fail: function (res) {
            console.log("获取失败")
          }
        });
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
  // 向百度请求access_token，并将请求结果做缓存
  getAccessToken() {
    wx.request({
      url: 'http://106.52.192.123/get_accesstoken.php',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res.data)
        wx.setStorageSync('accessToken', { time: Date.now(), data: res.data });
      }
    })
  },
  globalData: {
    userInfo: null,
    contactList: null
  }
})