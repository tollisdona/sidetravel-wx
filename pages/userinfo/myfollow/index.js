// pages/userinfo/myfollow/index.js
import user from '../../../utils/user.js'
import util from '../../../utils/util.js'
import api from '../../../config/api.js'
var app = getApp()
const userinfo = wx.getStorageSync('userInfo');
const data = `uid=${encodeURIComponent(userinfo.id)}`;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    userList:[],
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
    this.loadData(api.UserFollow,data)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
 
  },
  loadData(url,data){
    util.request(url,data,"POST").then(res =>{
      this.setData({
        userList:res.data
      })
      // console.log(url,"userlist",this.data.userList);
    })
  },
  onChange(event) {
    const url=[
      api.UserFollow,
      api.UserFollower,
      api.UserCommon
    ]
    this.loadData(url[event.detail.index],data);
  },
})