// pages/mateinfo/index.js
Page({
  data: {
    item:{}
  },

  onLoad(options) {
    const item = JSON.parse(decodeURIComponent(options.item))
    
    this.setData({
      item:item
    })
    console.log("infof vvvvvvfffff",this.data.item)
  },
  onReady() {

  },

  onShow() {

  },

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {

  },

  onReachBottom() {

  },

  onShareAppMessage() {

  }
})