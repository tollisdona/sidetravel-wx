// pages/moment-edit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileListt:[],
    fileList:[
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
// 选择图片并上传
  chooseMedia() {
  wx.chooseMedia({
    count: 9 - this.data.fileList.length, // 最多可选择的图片数量
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: (res) => {
      // 逐个上传选择的图片
      res.tempFilePaths.forEach(filePath => {
        this.uploadImage(filePath);
      });
    },
  });
  },

// 上传图片
  uploadMedia(filePath) {
  wx.uploadFile({
    url: 'https://oocquin.online/upload', // 上传接口地址
    filePath: filePath,
    name: 'file', // 文件对应的key？
    success: (res) => {
      // 上传成功后处理服务器返回的数据
      const data = JSON.parse(res.data);
      const fileList = this.data.fileList.concat(data.url); // 假设服务器返回的数据中有一个url字段表示图片地址
      this.setData({ fileList });
    },
    fail: (err) => {
      // 上传失败处理
      wx.showToast({
        title: '上传失败',
        icon: 'none'
      });
    }
  });
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