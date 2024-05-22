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
      {name:'/images/favorites-fill.svg',txt:'我的动态'},
      {name:'/images/favorites-fill.svg',txt:'我的游记'},
      {name:'/images/favorites-fill.svg',txt:'我的收藏'},
      {name:'/images/favorites-fill.svg',txt:'我的点赞'}
    ],
    optionList:[
      {title:'历史记录'},
      {title:'我的约伴'},
      {title:'修改个人信息'}
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
    user.checkLogin().then(res=>{
      app.globalData.hasLogin = true;
      let userInfo = wx.getStorageSync('userInfo');
      this.setData({
        userinfo:userInfo,
        hasLogin:true
      })
      console.log("ddarata info:",this.data.userinfo);
    }).catch(err =>{
    })

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
    // console.log("dianjidenglu");
    user.loginByWeixin().then(res =>{
      console.log(res);
      app.globalData.hasLogin = true;
      wx.reLaunch({
        url: '/pages/userinfo/index/index'
      });
    }).catch(err =>{
      wx.showToast({
        title: '登陆失败',
        icon: "none"
      })
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
        util.request(api.AuthLogout, {}, 'POST').then(res =>{
          console.log("退出登录",res);
          wx.showToast({
            icon: 'success',
            duration: 2000
          });
          app.globalData.hasLogin = false;
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.reLaunch({
             url: '/pages/userinfo/index/index'
          });
        }).catch(err =>{
          util.showErrorToast(err.errMsg)
        })
      }
    })

  },
  clickFunction:function(e){
    const id = e.currentTarget.dataset.id;
    if(id == 0){
      console.log(id)
    }else if(id == 1){

    }else if(id == 2){

    }else if(id == 3){

    }
  },
  clickOption:function(e){
    const id = e.currentTarget.dataset.id;
    if(id == 0){
      console.log(id)
    }else if(id == 1){

    }else if(id == 2){
      wx.navigateTo({
        url: '/pages/userinfo/changeInfo/index',
      })
    }
  },
  goMeFollow(){
    wx.navigateTo({
      url: '/pages/userinfo/myfollow/index',
    })
  }
})