// pages/UserInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    reg_time:'',
    gender:1,
    medal:'',
    follow:0,
    follower:0,
    funcList:[
      {name:'/images/favorites-fill.svg',txt:'足迹'},
      {name:'/images/favorites-fill.svg',txt:'足迹'},
      {name:'/images/favorites-fill.svg',txt:'足迹'},
      {name:'/images/favorites-fill.svg',txt:'足迹'}
    ],
    optionList:[
      {title:'历史记录'},
      {title:'我的约伴'},
      {title:'反馈与建议'}
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