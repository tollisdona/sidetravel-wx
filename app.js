// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success(res){
        if(res.code){
          console.log(res)
          wx.request({
            url: 'https://oocquin.online/sidetravel/login',
            data:{
              code:res.code
            }
          })
        }else{
          wx.showToast({
            title: '登录失败',
            icon:'error',
            duration:2000
          })
        }
        //如果已经登录 则直接跳转 如果没登陆就显示欢迎页面 然后登陆
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
      fail(){
        console.log("目前是游客模式")
      }
    })

    //启动页面


  },

  globalData: {
    userInfo: null,
    sky_system:{},
    sky_menu:{}
  }
})
