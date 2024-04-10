// pages/moment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    safeTop:0,
    focus:false,
    isFull:false,
    mediaList:[
      {
        isPic:'false',
        url:'https://media.w3.org/2010/05/sintel/trailer.mp4'
      }, {
        url:'/images/add-btn-fill.svg'
      },
      {
        url:'/images/add-btn-fill.svg'
      }, {
        url:'/images/add-btn-fill.svg'
      },
      {
        url:'/images/add-btn-fill.svg'
      }, {
        url:'/images/add-btn-fill.svg'
      },
      {
        url:'/images/add-btn-fill.svg'
      }, {
        url:'/images/add-btn-fill.svg'
      },
      
    ]
  },

  setTabbar(){
    if (typeof this.getTabBar === 'function' ) {
      this.getTabBar((tabBar) => {
        tabBar.setData({
          selected: 2
        })
      })
    }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //设置topbar在胶囊按钮下方
  const buttonInfo = wx.getMenuButtonBoundingClientRect();
  this.setData({
    safeTop:buttonInfo.bottom
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