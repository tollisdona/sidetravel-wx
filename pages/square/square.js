// pages/square.js
import { installRouteBuilder } from '../list/route'
import { generateGridList, compareVersion } from '../list/utils'

const { screenWidth } = wx.getSystemInfoSync()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tablist:[
      '关注',
      '热门',
      '附近'
    ],
    itemWidth:0,
    windowWidth:0,
    sliderLeft:0,
    sliderOffset:0,
    currentTab:1,
    sliderOffsets:[],
    padding: 4,
    gridList: generateGridList(100, 2),
    cardWidth: (screenWidth - 4 * 2 - 4) / 2, // 减去间距
  },
  setTabbar(){
    if (typeof this.getTabBar === 'function' ) {
      this.getTabBar((tabBar) => {
        tabBar.setData({
          selected: 0
        })
      })
    }
},
  created() {
    const {SDKVersion} = wx.getSystemInfoSync()
    if (compareVersion(SDKVersion, '2.30.1') < 0) {
      wx.showModal({
        content: '基础库版本低于 v2.30.1 可能会有显示问题，建议升级微信体验。',
        showCancel: false
      })
    }
    installRouteBuilder()
  },
  tabTap(event){
    console.log("点击tabs",event.currentTarget.dataset.index)
    const index = event.currentTarget.dataset.index;
    this.setData({
      currentTab:index
    })
    //以下写法无法setdata
    this.data.currentTab = index;
    this.data.offsetLeft = event.currentTarget.offsetLeft;
  },
  clickSearch(){
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },
  clickMessage(){
    wx.navigateTo({
      url: '/pages/message/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.created();
  },

  // 处理点击tab
  onTabClick(e) {
    
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