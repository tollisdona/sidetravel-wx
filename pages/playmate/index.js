// pages/playmate/index.js
Page({
  data: {
    currentTab: 'post', // 默认显示发布内容
    status:'post',
    date: '', // 默认日期选择器显示的日期
    postList:[
      {
        "date": "05月01日-05月03日",
        "to": "北京",
        "from":"beijing",
        "description": "寻找旅游伴侣",
        "user": {
          "name": "小明",
          "avatar": "/images/user-fill.svg",
          "medal":[],
          "gender":0
      },
        "posttime": "2024-04-15 10:30"
      },
      {
        "date": "06月01日-06月03日",
        "to": "西安",
        "from":"beijing",
        "description": "寻找旅游伴侣，一起探索!",
        "user": {
          "name": "小明",
          "avatar": "/images/user-fill.svg",
          "medal":[],
          "gender":0
      },
        "posttime": "2024-04-15 12:30"
      },
      {
        "date": "7月01日-07月03日",
        "to": "巴黎",
        "from":"beijing",
        "description": "寻找旅游伴侣，一起探索浪漫的巴黎寻找旅游伴侣!",
        "user": {
          "name": "小明",
          "avatar": "/images/user-fill.svg",
          "medal":[],
          "gender":0
      },
        "posttime": "2024-04-15 14:30"
      }
    ],
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