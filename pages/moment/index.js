// pages/moment/index.js
import user from '../../utils/user'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log("ggggggggggggggg")
    user.checkLogin().then(res =>{
      console.log("checklogin:",res);
      wx.navigateTo({
        url: '/pages/moment-edit/index',
      })
    }).catch(err =>{
      wx.showToast({
        title: '请先登录！',
        icon:'error'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/userinfo/index/index',
        })
      }, 500); 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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