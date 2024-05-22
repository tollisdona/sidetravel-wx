// pages/userinfo/mypartner/index.js
import util from '../../utils/util'
import api from '../../config/api'
Page({
  data: {
    currentTab: 'post', // 默认显示发布内容
    status:'post',
    date: '', // 默认日期选择器显示的日期
    postList:[],
    selectList:[]
  },
  tabTapP: function () {
    wx.navigateTo({
      url: '/pages/playpost/index',
    })
  },
  tabTapS: function(e){
    const tab = e.currentTarget.dataset.tab; // 获取当前点击的选项
    this.setData({
      currentTab: tab // 更新 currentTab 的值为当前点击的选项
    });
    wx.navigateTo({
      url: '/pages/playselect/index',
    })
  },

  setTabbar(){
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  onClickPost(){
    wx.navigateTo({
      url: '/pages/playpost/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadAllPartner();

  },

  loadAllPartner:function(){
    util.request(api.PartnerList,{},"GET").then(res =>{
      console.log("返回寻伴数据：",res);
      this.setData({postList: res.data.list})
    })
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})