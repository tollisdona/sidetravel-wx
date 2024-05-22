// pages/userinfo/myfollow/index.js
import user from '../../../utils/user.js'
import util from '../../../utils/util.js'
import api from '../../../config/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList:[],
    followers: [
      {
        id: 1,
        nickname: 'zhangsan',
        avatarUrl: 'http://storage.oocquin.online/media/0gmnoqqlsseso68ejsu8.jpeg',
        gender: 0
      },
      {
        id: 2,
        nickname: 'lisi',
        avatarUrl: 'http://storage.oocquin.online/media/1x8zpr98cn49wxipohb6.jpg',
        gender: 1
      }
    ]
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
    this.loadData();
  },
  loadData(){
    const userinfo = wx.getStorageSync('userInfo');
    console.log("usrefid",userinfo.id)
    const data = `uid=${encodeURIComponent(userinfo.id)}`;
    util.request(api.UserFollow,data,"POST").then(res =>{
      console.log("follow",res);
      this.setData({
        userList:res.data.userList
      })
    })
  },
})