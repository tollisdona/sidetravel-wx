// app.js
import config from './config/api.js';

import GoEasy from './static/lib/goeasy-2.6.4.esm.min';
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log(this.globalData)
},
onShow: function(options){
},
  globalData: {
    userInfo: null,
    sky_system:{},
    sky_menu:{},
    hasLogin:false,
    goEasy: GoEasy.getInstance({
      host:"hangzhou.goeasy.io",//应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
      appkey:"BC-e00d2665abf542dabe4e2ccc3a2b6f3e",// common key
      modules: ['pubsub']
    })
  }
})
