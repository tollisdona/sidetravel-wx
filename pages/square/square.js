// pages/square.js
import { installRouteBuilder } from '../list/route'
import { generateGridList,mygenerateGridList, compareVersion, fixGridList } from '../list/utils'
import util from '../../utils/util'
import api from '../../config/api'

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
    safeHeight:0,
    itemWidth:0,
    windowWidth:0,
    sliderLeft:0,
    sliderOffset:0,
    currentTab:1,
    sliderOffsets:[],
    padding: 4,
    gridList:[],
    cardWidth: (screenWidth - 4 * 2 - 4) / 2, // 减去间距
    isTriggered:true
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
    this.loadHotRequst()
    installRouteBuilder()
  },
  loadHotRequst(){
    // 请求首页动态list
    util.request(api.NoteHotList,{},"POST").then(res =>{
      console.log("得到热门列表,",res)
      this.setData({
        gridList: fixGridList(res.data.list)
      })
      console.log("GridlistL",this.data.gridList)
    })
  },

  refreshHandler(){
    
    this.setData({
      isTriggered:false
    })
  },
  tabTap(event){
    console.log("点击tabs",event.currentTarget.dataset.index)
    const index = event.currentTarget.dataset.index;
    this.setData({
      currentTab:index
    })
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
  onTabChanged(event){
    this.setData({
      currentTab: event.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.created();
    //安全高度
    wx.getSystemInfo({
      success:(res) =>{
        console.log("res",res.screenHeight)
        console.log("resdetail",res.safeArea)
        var windowW = res.windowWidth
        var h = res.safeArea.bottom - res.safeArea.top
        h = h * 750 / windowW
        var sh = h- 120 - 44 - 20
        this.setData({
          safeHeight: sh
        })

      }
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    // 请求首页动态list
    console.log("下拉")
    util.request(api.NoteHotList,{},"POST").then(res =>{
      console.log("得到热门列表,",res.data.list)
      this.setData({
        gridList: fixGridList(res.data.list,2)
      })
      console.log("Gridlist",this.data.gridList)
    })
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh()
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