// app.js
import config from './config/api.js'
import user from './utils/user.js'
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log(this.globalData)
    const baseUrl = this.globalData.baseUrl;
    
    // 登录
    // loginByWeixin();
    // wx.login({
    //   success(res){
    //     if(res.code){
    //       console.log("this is res:")
    //       console.log(res)
    //       wx.request({
    //         url: baseUrl+'/sidetravel/login',
    //         data:{
    //           code:res.code
    //         }
    //       })
    //     }else{
    //       wx.showToast({
    //         title: '登录失败',
    //         icon:'error',
    //         duration:2000
    //       })
    //     }
    //     //如果已经登录 则直接跳转 如果没登陆就显示欢迎页面 然后登陆
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   },
    //   fail(){
    //     console.log("目前是游客模式")
    //   }
    // })
},
  onShow: function(options){
    user.checkLogin().then(res =>{
      console.log("checklogin:",res);
      this.globalData.hasLogin = true;
      wx.navigateTo({
        url: '/pages/square/square',
      })
    }).catch(err =>{
      console.log("err from checklogin",err);
      this.globalData.hasLogin = false;
    })
  },

  globalData: {
    userInfo: null,
    sky_system:{},
    sky_menu:{},
    hasLogin:false
  }
})
