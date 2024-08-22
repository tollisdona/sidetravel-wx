
// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Result:[
      'ferando',
      'lando',
      'charles'
    ]
  },
  handleSearch(event){
    console.log("search调用");
    //接收参数
    //request搜索
    //返回结果，跳转——+————结果如何保存？
  },
  onCancel(event){
    wx.navigateBack({delta:1});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  }
})