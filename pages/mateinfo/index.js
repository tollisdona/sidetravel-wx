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
  },
  onShareAppMessage() {
    return {
      title: '邀请你和我一起旅游~~',
      path: `/pages/mateinfo/index?item=${encodeURIComponent(JSON.stringify(this.data.item))}`
    }
  }
})