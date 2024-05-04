// pages/moment-edit/index.js
import util from '../../utils/util'
import api from '../../config/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList:[
      {
        isPic:'false',
        url:'https://media.w3.org/2010/05/sintel/trailer.mp4'
      }, {
        url:'/images/r.png'
      },{
        url:'/images/r.png'
      },{
        url:'/images/r.png'
      }
    ],
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
// 选择图片并上传
  afterReads() {
    console.log("choosemedia")
  wx.chooseMedia({
    count: 9 - this.data.fileList.length, // 最多可选择的图片数量
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: (res) => {
      // 逐个上传选择的图片
    console.log("res:",res)
      res.tempFiles.forEach(filePath => {
        this.uploadMedia(filePath);
      });
    },
  });
  },

// 上传图片
  afterRead(res) {
  console.log("uploadmedia")
  console.log("file:",res)
  const files = res.detail.file
  files.forEach(file => {
    console.log("grdg,",file)
    this.uploadFile(file);
  });
  },
  uploadFile(file){
    wx.uploadFile({
      url: api.StorageUpload,// 上传接口地址
      filePath: file.url,
      name: 'file', // 文件对应的key？
      success: (res) => {
        // 上传成功后处理服务器返回的数据
        console.log("访问服务器上传res:",res)
        const data = JSON.parse(res.data);
        const fileList = this.data.fileList.concat(data.url); // 假设服务器返回的数据中有一个url字段表示图片地址
        this.setData({ fileList });
      },
      fail: (err) => {
        // 上传失败处理
        console.log("e:",err)
        wx.showToast({
          title: '上传失败',
          icon: 'none'
        });
      }
    });
  this.setData({
    fileList:this.data.fileList.concat(file)
  })
  },

  delete(event) {
    const index = event.detail.index;
    this.data.fileList.splice(index,1);
    this.setData({
      fileList:this.data.fileList
    })
   },
  onTapPosition(){
    var that = this;
    wx.chooseLocation({
    success: function (res) {
        console.log('选择位置成功', res);
        // 获取用户选择的位置信息
        const name = res.name; // 位置名称
        const address = res.address; // 详细地址
        const latitude = res.latitude; // 纬度
        const longitude = res.longitude; // 经度
        // 可以根据需要将位置信息保存到 data 中或者进行其他操作
        that.setData({
          address:name
        })
       },
        fail: function (err) {
          console.error('选择位置失败', err);
          // 如果用户拒绝授权位置权限，则可能会触发 fail 回调函数
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