//index.js
//获取应用实例
const app = getApp()

Page({



  data: {
    contactList: [{
      "name": "标题一",
      "details": "由各种物质组成的矩形球状天梯，叫做星球。",
    }, {
        "name": "标题二",
        "details": "由各种物质组成的矩形球状天梯，叫做星球。",
    }, {
        "name": "标题三",
        "details": "由各种物质组成的矩形球状天梯，叫做星球。",
    }, {
        "name": "标题四",
        "details": "由各种物质组成的矩形球状天梯，叫做星球。",
    }, {
        "name": "标题五",
        "details": "由各种物质组成的矩形球状天梯，叫做星球。",
    }, {
        "name": "标题六",
        "details": "由各种物质组成的矩形球状天梯，叫做星球。",
    }, {
        "name": "标题七",
        "details": "由各种物质组成的矩形球状天梯，叫做星球。",
    }, {
        "name": "标题八",
        "details": "由各种物质组成的矩形球状天梯，叫做星球。",
    }, {
        "name": "标题九",
        "details": "由各种物质组成的矩形球状天梯，叫做星球。",
    }]  ,
    
    imgUrls: [
      '/images/minzu1.jpg',
      '/images/minzu2.jpg',
      '/images/minzu3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    duration: 1000
  },

  //点击切换隐藏和显示
  toggleBtn: function (event) {
    var that = this;
    var toggleBtnVal = that.data.uhide;
    var itemId = event.currentTarget.id;
    if (toggleBtnVal == itemId) {
      that.setData({
        uhide: 0
      })
    } else {
      that.setData({
        uhide: itemId
      })
    }
  },

  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
