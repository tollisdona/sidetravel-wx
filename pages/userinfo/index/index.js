// pages/UserInfo/index.js
import user from '../../../utils/user.js'
import util from '../../../utils/util.js'
import api from '../../../config/api.js'
var app = getApp()
const header = {
  "Content-Type": "application/json",
  'X-Sidetravel-Token': wx.getStorageSync('token')
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLogin:false,
    userinfo:{},
    funcList:[
      {name:'/images/favorites-fill.svg',txt:'我的动态'},
      {name:'/images/favorites-fill.svg',txt:'我的点赞'},
      {name:'/images/favorites-fill.svg',txt:'我的收藏'},
      {name:'/images/favorites-fill.svg',txt:'我的约伴'}
    ],
    optionList:[
      {title:'历史记录'},
      {title:'修改个人信息'}
    ],
    follow:0,
    follower:0
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
   * 生命周期函数--监听页面显示
   */
  onShow() {
    user.checkLogin().then(res=>{
      app.globalData.hasLogin = true;
      let userInfo = wx.getStorageSync('userInfo');
      this.countFollow(userInfo.id);
      this.setData({
        userinfo:userInfo,
        hasLogin:true,
      })
    }).catch(err =>{
    })
    this.setTabbar();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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
    let that = this;
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function(res) {
        if (!res.confirm) {
          return;
        }
        // 更改用户在线状态
        if(that.checkOnline() === 1){
          util.request(api.OnlineOff,{userId:that.data.userinfo.id},"POST",header).then(res=>{
            console.log("showOff",res)
          })
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
      wx.navigateTo({
        url: '../mymoment/index',
      })
    }else if(id == 1){
      wx.navigateTo({
        url: '../mylike/index',
      })
    }else if(id == 2){
      wx.navigateTo({
        url: '../mylike/index',
      })
    }else if(id == 3){
      wx.navigateTo({
        url: '../mypartner/index',
      })
    }
  },
  clickOption:function(e){
    const id = e.currentTarget.dataset.id;
    if(id == 0){
      wx.navigateTo({
        url: '/pages/userinfo/footprint/index'
      })
    }else if(id == 1){
      let user = encodeURIComponent(JSON.stringify(this.data.userinfo))
      wx.navigateTo({
        url: '/pages/userinfo/changeInfo/index?user=' + user,
      })
    }
  },
  goMeFollow(){
    wx.navigateTo({
      url: '/pages/userinfo/myfollow/index',
    })
  },
  countFollow: function(uid){
    const data = `uid=${encodeURIComponent(uid)}`;
    util.request(api.InteractCount,data,"POST").then(res =>{
      this.setData({
        follow:res.data.followCount,
        follower:res.data.fansCount
      })
    }).catch(err =>{
      wx.showToast({
        title: err,
        icon:'error'
      })
    })
  },
  checkOnline(){
    let that = this;
    util.request(api.OnlineCheck,{userId:that.data.userinfo.id},"POST",header).then(res =>{
      if(res.data === 1){
        return 1
      }else{
        return 0
      }
    }).catch(err=>{
      wx.showToast({
        title: err,
      })
    })
  },
})