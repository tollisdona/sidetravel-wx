// pages/square.js
import { installRouteBuilder } from '../list/route'
import {compareVersion, fixGridList } from '../list/utils'
import util from '../../utils/util'
import api from '../../config/api'
import user from '../../utils/user'

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
    gridList0:[],
    gridList1:[],
    gridList2:[],
    cardWidth: (screenWidth - 4 * 2 - 4) / 2, // 减去间距
    // isTriggered:true,
    latitude:0,
    longitude:0
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
      // console.log("得到热门列表,",res)
      this.setData({
        gridList1: fixGridList(res.data.list),
        gridList: fixGridList(res.data.list)
      })
      // console.log("GridlistL",this.data.gridList)
    }).catch(err =>{
      wx.showToast({
        title: err,
        image:"error"
      })
    })
  },
  loadNearRequest(longitude,latitude){
    // 请求附近动态
    const data = `longitude=${encodeURIComponent(longitude)}&latitude=${encodeURIComponent(latitude)}`;
    util.request(
      api.NoteNearList,data,"POST").then(res =>{
      this.setData({
        gridList2: fixGridList(res.data.list),
        gridList: fixGridList(res.data.list)
      })
      console.log('请求成功，服务器返回数据:',res);
    }).catch(err =>{
      console.error('请求失败',err);
    });
  },
  loadFollowRequest(){
    util.request(api.NoteFollowList,{},"POST").then(res =>{
      console.log("关注列表,",res)
      this.setData({
        gridList0: fixGridList(res.data.list),
        gridList: fixGridList(res.data.list)
      })
      console.log("关注gridlist",this.data.gridList)
    }).catch(err =>{
      wx.showToast({
        title: err,
        image:"error"
      })
    })
  },
  // refreshHandler(){
  //   this.setData({
  //     isTriggered:false
  //   })
  // },
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  refreshHandler() {
    console.log("下拉刷新");
    
    // 根据当前选中的 tab 进行相应的请求
    if (this.data.currentTab === 0) {
        this.loadFollowRequest(); // 关注列表
    } else if (this.data.currentTab === 1) {
        this.loadHotRequst(); // 热门列表
    } else if (this.data.currentTab === 2) {
        this.canIhavePosition(); // 附近列表
    }

    // 停止下拉刷新动画
    this.setData({
        isTriggered: false
    });
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
      url: '/pages/searchResults/index'
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
    if(this.data.currentTab === 2){
      //获取用户位置 并处理 loadnear request请求
      this.canIhavePosition();
    }else if(this.data.currentTab === 1){
      this.setData({gridList:this.data.gridList1})
    }else if(this.data.currentTab === 0){
      this.checkLogin();
    }
  },
  checkLogin:function(){
    let that = this;
    user.checkLogin().then(res =>{
      that.loadFollowRequest();
    }).catch(err =>{
      wx.showToast({
        title: '请先登录！',
        icon:"error"
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/userinfo/index/index',
        })
      }, 500); 
    })
  },
  canIhavePosition:function(){
  wx.getSetting({
    success: (res) => {
      // 如果用户已经授权地理位置权限
      if (res.authSetting['scope.userLocation'] === true) {
        // 直接获取用户位置信息
        this.getLocation();
      } else if (res.authSetting['scope.userLocation'] === false) {
        // 如果用户已拒绝授权地理位置权限，则显示提示信息，引导用户打开设置页面手动授权
        wx.showModal({
          title: '提示',
          content: '请允许使用地理位置信息',
          confirmText: '去设置',
          success: (res) => {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                  // 用户在设置页面完成授权操作后，再次获取用户位置信息
                  if (res.authSetting['scope.userLocation'] === true) {
                    this.getLocation();
                  }
                }
              });
            }
          }
        });
      } else {
        // 如果用户尚未授权地理位置权限，则直接请求地理位置权限
        this.getLocation();
      }
    }
  });
  },
  getLocation: function () {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
      console.log('SQUARE NEAR获取用户位置信息成功', res);
      const latitude = res.latitude;
      const longitude = res.longitude;
      that.setData({
        latitude:latitude,
        longitude:longitude
      })
      // 在这里可以根据获取到的用户位置信息进行后续操作
      that.loadNearRequest(longitude,latitude)
    },
    fail: (res) => {
      console.log('获取用户位置信息失败', res);
    }
  });
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
  // onPullDownRefresh() {
  //   wx.showNavigationBarLoading() //在标题栏中显示加载
  //   // 请求首页动态list
  //   console.log("下拉")
  //   util.request(api.NoteHotList,{},"POST").then(res =>{
  //     console.log("得到热门列表,",res.data.list)
  //     this.setData({
  //       gridList: fixGridList(res.data.list)
  //     })
  //     console.log("Gridlist",this.data.gridList)
  //   })
  //   wx.hideNavigationBarLoading() //完成停止加载
  //   wx.stopPullDownRefresh()
  // },

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