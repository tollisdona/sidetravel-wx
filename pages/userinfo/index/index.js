// pages/UserInfo/index.js
import user from '../../../utils/user.js'
import util from '../../../utils/util.js'
import api from '../../../config/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLogin:false,
    userinfo:{},
    funcList:[
      {name:'/images/favorites-fill.svg',txt:'足迹'},
      {name:'/images/favorites-fill.svg',txt:'足迹'},
      {name:'/images/favorites-fill.svg',txt:'足迹'},
      {name:'/images/favorites-fill.svg',txt:'足迹'}
    ],
    optionList:[
      {title:'历史记录'},
      {title:'我的约伴'},
      {title:'反馈与建议'}
    ]

  },
  setTabbar(){
    if (typeof this.getTabBar === 'function' ) {
      this.getTabBar((tabBar) => {
        tabBar.setData({
          selected: 4
        })
      })
    }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if(app.globalData.hasLogin){
      let userInfo = wx.getStorageSync('userInfo');
      this.setData({
        userinfo:userInfo,
        hasLogin:true
      })
      console.log("ddarata info:",this.data.userinfo);
    }
    this.setTabbar();

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },
  dologin(){
    // wx.login({
    //   success: (res) => {
    //     console.log(res.code)
    //   },
    // })
    console.log("dianjidenglu");
    user.loginByWeixin().then(res =>{
      console.log(res);
      app.globalData.hasLogin = true;
      wx.reLaunch({
        url: '/pages/userinfo/index/index'
      });
    }).catch(err =>{
      console.log(err);
    });
  },
  dologout: function() {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function(res) {
        if (!res.confirm) {
          return;
        }
        util.request(api.AuthLogout, {}, 'POST');
        app.globalData.hasLogin = false;
        wx.removeStorageSync('token');
        wx.removeStorageSync('userInfo');
        wx.reLaunch({
          url: '/pages/userinfo/index/index'
        });
      }
    })

  }
})